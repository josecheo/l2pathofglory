/// <reference types="vite/client" />
import { useEffect, useMemo, useState } from "react";
import { tokenStorage } from "../../auth/tokenStorage";

type HopzoneCheckResponse = {
  ip: string;
  voted: boolean;
  raw?: {
    apiver?: string;
    voted?: boolean;
    voteTime?: string; // "2026-02-07 23:15:42" o "n/a"
    hopzoneServerTime?: string; // "2026-02-08 00:11:51"
    status_code?: number;
  };
};

type ClaimResponse = { message?: string };

function parseHopzoneDate(s?: string) {
  const v = String(s || "").trim();
  if (!v || v.toLowerCase() === "n/a") return null;

  // "YYYY-MM-DD HH:mm:ss" -> Date (local)
  const m = v.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/);
  if (!m) return null;

  const [, yy, mm, dd, hh, mi, ss] = m;
  const d = new Date(
    Number(yy),
    Number(mm) - 1,
    Number(dd),
    Number(hh),
    Number(mi),
    Number(ss)
  );
  return Number.isNaN(d.getTime()) ? null : d;
}

function buildHopzoneClaimUrl(API: string) {
  const useDevIp = String(import.meta.env.VITE_HOPZONE_USE_DEV_IP) === "true";
  const devIp = String(import.meta.env.VITE_HOPZONE_DEV_IP || "").trim();

  const url = new URL(`${API}/api/hopzone/vote/claim`);
  if (import.meta.env.DEV && useDevIp && devIp) url.searchParams.set("ip", devIp);
  return url.toString();
}

function formatDateTime(d: Date | null) {
  if (!d) return "—";
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatCountdown(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function buildHopzoneCheckUrl(API: string) {
  const useDevIp = String(import.meta.env.VITE_HOPZONE_USE_DEV_IP) === "true";
  const devIp = String(import.meta.env.VITE_HOPZONE_DEV_IP || "").trim();

  const url = new URL(`${API}/api/hopzone/vote/check`);
  if (import.meta.env.DEV && useDevIp && devIp) url.searchParams.set("ip", devIp);
  return url.toString();
}

export function HopzoneRewardsSection(props: {
  characters: Array<{ name: string; online: number | boolean }>;
}) {
  const token = tokenStorage.get();
  const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

  // check
  const [checking, setChecking] = useState(false);
  const [check, setCheck] = useState<HopzoneCheckResponse | null>(null);
  const [msg, setMsg] = useState("");

  // claim
  const [claiming, setClaiming] = useState(false);

  // server-time sync
  const [serverOffsetMs, setServerOffsetMs] = useState(0); // hopzoneNow - localNow
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  // characters
  const offlineCharacters = useMemo(
    () =>
      (props.characters ?? [])
        .filter((c) => Number(c.online) === 0)
        .map((c) => c.name)
        .filter(Boolean)
        .slice()
        .sort(),
    [props.characters]
  );

  const onlineCharacters = useMemo(
    () => (props.characters ?? []).filter((c) => Number(c.online) === 1).map((c) => c.name),
    [props.characters]
  );

  const [selectedChar, setSelectedChar] = useState("");

  useEffect(() => {
    if (selectedChar && !offlineCharacters.includes(selectedChar)) setSelectedChar("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offlineCharacters.join("|")]);

  const hopzoneVoteUrl = "https://l2.hopzone.net/es/lineage2/details/107160/l2pathofglorycom";

  async function runCheck() {
    setChecking(true);
    setMsg("");

    try {
      const url = buildHopzoneCheckUrl(API);
      const r = await fetch(url);
      const data = await r.json().catch(() => ({}));

      if (!r.ok) {
        setCheck(null);
        setServerOffsetMs(0);
        setSecondsLeft(0);
        setMsg(data?.message || "No se pudo verificar el voto.");
        return;
      }

      const parsed = data as HopzoneCheckResponse;
      setCheck(parsed);

      if (parsed.voted) setMsg("✅ Voto verificado. Puedes reclamar tu reward.");
      else setMsg("Aún no aparece tu voto en Hopzone. Vota y vuelve a verificar.");

      // Sync con hopzone server time para countdown coherente
      const voteAt = parseHopzoneDate(parsed?.raw?.voteTime);
      const hopzoneNow = parseHopzoneDate(parsed?.raw?.hopzoneServerTime);

      if (hopzoneNow) setServerOffsetMs(hopzoneNow.getTime() - Date.now());
      else setServerOffsetMs(0);

      if (voteAt && hopzoneNow) {
        const next = new Date(voteAt.getTime() + 12 * 60 * 60 * 1000);
        const diff = Math.floor((next.getTime() - hopzoneNow.getTime()) / 1000);
        setSecondsLeft(Math.max(0, diff));
      } else {
        setSecondsLeft(0);
      }
    } catch {
      setCheck(null);
      setServerOffsetMs(0);
      setSecondsLeft(0);
      setMsg("Error de red verificando voto.");
    } finally {
      setChecking(false);
    }
  }

  async function claim() {
    if (!token) {
      setMsg("Necesitas iniciar sesión para reclamar.");
      return;
    }
    if (!check?.voted) {
      setMsg("Primero debes votar y verificar.");
      return;
    }
    if (!selectedChar) {
      setMsg("Selecciona un personaje offline para recibir el item.");
      return;
    }

    setClaiming(true);
    setMsg("");

    try {
      const r = await fetch(buildHopzoneClaimUrl(API), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ characterName: selectedChar }),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        setMsg(data?.message || "No se pudo reclamar.");
        return;
      }

      setMsg(`✅ ${(data as ClaimResponse)?.message || "Reward reclamado."}`);
      await runCheck();
    } catch {
      setMsg("Error de red reclamando reward.");
    } finally {
      setClaiming(false);
    }
  }

  // auto-check on mount
  useEffect(() => {
    runCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tick basado en reloj de Hopzone (localNow + offset)
  useEffect(() => {
    const voteAt = parseHopzoneDate(check?.raw?.voteTime);
    if (!voteAt) return;

    const nextMs = voteAt.getTime() + 12 * 60 * 60 * 1000;

    const t = setInterval(() => {
      const hopzoneNowMs = Date.now() + serverOffsetMs;
      const diff = Math.floor((nextMs - hopzoneNowMs) / 1000);
      setSecondsLeft(Math.max(0, diff));
    }, 1000);

    return () => clearInterval(t);
  }, [check?.raw?.voteTime, serverOffsetMs]);

  const voted = !!check?.voted;

  const voteAt = parseHopzoneDate(check?.raw?.voteTime);
  const hopzoneAt = parseHopzoneDate(check?.raw?.hopzoneServerTime);
  const nextVoteAt = voteAt ? new Date(voteAt.getTime() + 12 * 60 * 60 * 1000) : null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white">Rewards • Hopzone</h2>
          <p className="text-sm text-white/60">Verifica tu voto y reclama tu recompensa.</p>
        </div>

        <span
          className={[
            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
            voted
              ? "border border-emerald-600/40 bg-emerald-900/20 text-emerald-200"
              : "border border-amber-600/40 bg-amber-900/20 text-amber-200",
          ].join(" ")}
        >
          <span className={["h-2 w-2 rounded-full", voted ? "bg-emerald-400" : "bg-amber-400"].join(" ")} />
          {voted ? "Voto verificado" : "No verificado"}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-black/20 p-5">
          <p className="text-xs uppercase tracking-widest text-white/40">Estado</p>

          <div className="mt-3 rounded-lg border border-white/10 bg-[#0f1623] p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <div>
                <p className="text-xs text-white/50">IP</p>
                <p className="mt-1 text-sm font-bold text-white">{check?.ip || "—"}</p>
              </div>

              <div>
                <p className="text-xs text-white/50">Voto</p>
                <p className="mt-1 text-sm font-bold text-white">{check ? (voted ? "Sí" : "No") : "—"}</p>
              </div>

              <div>
                <p className="text-xs text-white/50">Hora voto</p>
                <p className="mt-1 text-sm font-bold text-white">{formatDateTime(voteAt)}</p>
              </div>

              <div>
                <p className="text-xs text-white/50">Próximo voto</p>
                <p className="mt-1 text-sm font-bold text-white">{formatDateTime(nextVoteAt)}</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
               <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                <span className="text-xs text-white/50">Tiempo para volver a votar</span>
                <span className="text-sm font-extrabold text-white">
                  {secondsLeft > 0 ? formatCountdown(secondsLeft) : "00:00:00"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href={hopzoneVoteUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-md px-5 py-3 text-sm font-extrabold transition-all text-center border border-amber-500/70 bg-gradient-to-r from-yellow-600 to-amber-700 text-white hover:from-yellow-500 hover:to-amber-600 shadow-lg shadow-yellow-900/30"
            >
              VOTAR EN HOPZONE
            </a>

            <button
              onClick={runCheck}
              disabled={checking}
              className={[
                "rounded-md px-5 py-3 text-sm font-bold transition-all",
                !checking
                  ? "border border-sky-500/50 bg-sky-900/20 text-sky-200 hover:bg-sky-900/30"
                  : "cursor-not-allowed border border-white/10 bg-white/5 text-white/40",
              ].join(" ")}
            >
              {checking ? "VERIFICANDO..." : "VERIFICAR"}
            </button>
          </div>

          {msg && (
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/70">
              {msg}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-5">
          <p className="text-xs uppercase tracking-widest text-white/40">Tip</p>
          <h3 className="mt-2 text-sm font-extrabold text-white">Si no aparece tu voto</h3>
          <ul className="mt-2 space-y-2 text-xs text-white/60">
            <li>1) Vota en Hopzone</li>
            <li>2) Espera 1–2 minutos</li>
            <li>3) Presiona “Verificar”</li>
          </ul>

          <div className="mt-5 rounded-lg border border-white/10 bg-[#0f1623] p-4">
            <p className="text-xs text-white/50">Personajes</p>
            <p className="mt-1 text-sm font-bold text-white">
              Online: {onlineCharacters.length} • Offline: {offlineCharacters.length}
            </p>
          </div>
        </div>
      </div>

      {/* CLAIM CARD (OCULTO hasta voted=true) */}
      {voted && (
        <div className="mt-8 rounded-xl border border-white/10 bg-black/20 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white">Reclamar reward</h3>
              <p className="text-xs text-white/60">
                Entrega a un personaje{" "}
                <span className="text-white/80 font-semibold">offline</span>.
              </p>
            </div>

            <button
              onClick={claim}
              disabled={!token || !selectedChar || claiming}
              className={[
                "rounded-md px-5 py-2 text-sm font-extrabold transition-all",
                token && selectedChar && !claiming
                  ? "border border-emerald-500/50 bg-emerald-900/20 text-emerald-200 hover:bg-emerald-900/30"
                  : "cursor-not-allowed border border-white/10 bg-white/5 text-white/40",
              ].join(" ")}
            >
              {claiming ? "RECLAMANDO..." : "RECLAMAR"}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="text-xs text-white/50">Personaje</label>
              <select
                value={selectedChar}
                onChange={(e) => setSelectedChar(e.target.value)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#0f1623] px-4 py-3 text-sm text-white outline-none focus:border-sky-500/60"
              >
                <option value="">Selecciona un personaje offline</option>
                {offlineCharacters.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              {offlineCharacters.length === 0 && (
                <p className="mt-2 text-xs text-amber-200">
                  No tienes personajes offline. Desconéctate del juego para reclamar.
                </p>
              )}
            </div>

            <div className="rounded-lg border border-white/10 bg-[#0f1623] p-4">
              <p className="text-xs text-white/50">Destino</p>
              <p className="mt-1 text-sm font-bold text-white">{selectedChar || "—"}</p>
              <p className="mt-1 text-xs text-white/50">
                {selectedChar ? "Listo para recibir." : "Selecciona un personaje."}
              </p>
            </div>
          </div>

          {!token && (
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/70">
              Inicia sesión para poder reclamar rewards.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
