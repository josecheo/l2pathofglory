import { useEffect, useMemo, useState } from "react";
import { tokenStorage } from "../../auth/tokenStorage";

type InviteResponse = { token: string; inviteUrl: string };

type Reward = {
  id: number;
  invite_id: number;
  item_id: number;
  item_qty: number;
  status: "PENDING" | "CLAIMED" | "CANCELLED";
  created_at: string;
};

export function RecruitSection(props: {
  characters: Array<{ name: string; online: number | boolean }>;
}) {
  const token = tokenStorage.get();

  // Invite
  const [inviteLoading, setInviteLoading] = useState(false);
  const [invite, setInvite] = useState<InviteResponse | null>(null);
  const [inviteMsg, setInviteMsg] = useState<string>("");

  // Rewards
  const [rewardsLoading, setRewardsLoading] = useState(false);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [rewardsMsg, setRewardsMsg] = useState<string>("");
  const [claimingId, setClaimingId] = useState<number | null>(null);

  // Character selection (like donations)
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

  const [selectedChar, setSelectedChar] = useState<string>("");

  // If selected char disappears from offline list (went online / refresh), reset it
  useEffect(() => {
    if (selectedChar && !offlineCharacters.includes(selectedChar)) {
      setSelectedChar("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offlineCharacters.join("|")]);

  const canGenerateInvite = !!token && !inviteLoading;

  const shareUrl = invite?.inviteUrl ?? "";
  const whatsappShare = shareUrl
    ? `https://wa.me/?text=${encodeURIComponent(
        `¡Únete a Path of Glory con mi invitación! Regístrate aquí: ${shareUrl}`
      )}`
    : "#";

  async function generateInvite() {
    if (!token) {
      setInviteMsg("Necesitas iniciar sesión para generar un link de invitación.");
      return;
    }

    setInviteLoading(true);
    setInviteMsg("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/web/invites`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setInvite(null);
        setInviteMsg(data?.message || "No se pudo generar el link.");
        return;
      }

      setInvite(data as InviteResponse);
      setInviteMsg("✅ Link generado. Compártelo con tu amigo.");
    } catch {
      setInvite(null);
      setInviteMsg("Error de red generando el link.");
    } finally {
      setInviteLoading(false);
    }
  }

  async function copyToClipboard() {
    if (!invite?.inviteUrl) return;
    try {
      await navigator.clipboard.writeText(invite.inviteUrl);
      setInviteMsg("✅ Link copiado al portapapeles.");
    } catch {
      setInviteMsg("No se pudo copiar. Copia manualmente el link.");
    }
  }

  async function loadPendingRewards() {
    if (!token) return;
    setRewardsLoading(true);
    setRewardsMsg("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/web/rewards/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setRewards([]);
        setRewardsMsg(data?.message || "No se pudieron cargar tus rewards.");
        return;
      }

      setRewards((data?.rewards ?? []) as Reward[]);
    } catch {
      setRewards([]);
      setRewardsMsg("Error de red cargando rewards.");
    } finally {
      setRewardsLoading(false);
    }
  }

  async function claimReward(rewardId: number) {
    if (!token) return;

    if (!selectedChar) {
      setRewardsMsg("Selecciona un personaje offline para recibir el item.");
      return;
    }

    setClaimingId(rewardId);
    setRewardsMsg("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/web/rewards/${rewardId}/claim`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ characterName: selectedChar }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setRewardsMsg(data?.message || "No se pudo reclamar.");
        return;
      }

      setRewardsMsg(`✅ ${data?.message || "Recompensa reclamada."}`);
      await loadPendingRewards();
    } catch {
      setRewardsMsg("Error de red reclamando reward.");
    } finally {
      setClaimingId(null);
    }
  }

  useEffect(() => {
    loadPendingRewards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white">Reclutamiento</h2>
          <p className="text-sm text-white/60">
            Genera un link único. Cuando tu amigo se registre con tu link, obtendrás un reward.
          </p>
        </div>

        <span
          className={[
            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
            onlineCharacters.length > 0
              ? "border border-amber-600/40 bg-amber-900/20 text-amber-200"
              : "border border-emerald-600/40 bg-emerald-900/20 text-emerald-200",
          ].join(" ")}
        >
          <span
            className={[
              "h-2 w-2 rounded-full",
              onlineCharacters.length > 0 ? "bg-amber-400" : "bg-emerald-400",
            ].join(" ")}
          />
          {onlineCharacters.length > 0 ? "Online" : "Offline"}
        </span>
      </div>

      {/* LINK CARD */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-black/20 p-5">
          <p className="text-xs uppercase tracking-widest text-white/40">Tu link</p>

          <div className="mt-3 rounded-lg border border-white/10 bg-[#0f1623] p-3">
            <p className="break-all font-mono text-sm text-white/90">
              {invite?.inviteUrl || "Aún no has generado un link."}
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={generateInvite}
              disabled={!canGenerateInvite}
              className={[
                "rounded-md px-5 py-3 text-sm font-extrabold transition-all",
                canGenerateInvite
                  ? "border border-amber-500/70 bg-gradient-to-r from-yellow-600 to-amber-700 text-white hover:from-yellow-500 hover:to-amber-600 shadow-lg shadow-yellow-900/30"
                  : "cursor-not-allowed border border-white/10 bg-white/5 text-white/40",
              ].join(" ")}
            >
              {inviteLoading ? "GENERANDO..." : "GENERAR LINK"}
            </button>

            <button
              onClick={copyToClipboard}
              disabled={!invite?.inviteUrl}
              className={[
                "rounded-md px-5 py-3 text-sm font-bold transition-all",
                invite?.inviteUrl
                  ? "border border-sky-500/50 bg-sky-900/20 text-sky-200 hover:bg-sky-900/30"
                  : "cursor-not-allowed border border-white/10 bg-white/5 text-white/40",
              ].join(" ")}
            >
              COPIAR
            </button>

            <a
              href={whatsappShare}
              target="_blank"
              rel="noreferrer"
              className={[
                "rounded-md px-5 py-3 text-sm font-bold transition-all text-center",
                invite?.inviteUrl
                  ? "border border-emerald-500/50 bg-emerald-900/20 text-emerald-200 hover:bg-emerald-900/30"
                  : "pointer-events-none border border-white/10 bg-white/5 text-white/40",
              ].join(" ")}
            >
              WHATSAPP
            </a>
          </div>

          {inviteMsg && (
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/70">
              {inviteMsg}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-5">
          <p className="text-xs uppercase tracking-widest text-white/40">Tip</p>
          <h3 className="mt-2 text-sm font-extrabold text-white">Cómo funciona</h3>
          <ul className="mt-2 space-y-2 text-xs text-white/60">
            <li>1) Genera el link</li>
            <li>2) Tu amigo se registra con ese link</li>
            <li>3) Aquí aparecerá tu reward pendiente</li>
          </ul>
        </div>
      </div>

      {/* REWARDS */}
      <div className="mt-8 rounded-xl border border-white/10 bg-black/20 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white">Rewards pendientes</h3>
            <p className="text-xs text-white/60">
              Selecciona un personaje <span className="text-white/80 font-semibold">offline</span> para recibir el item.
            </p>
          </div>

          <button
            onClick={loadPendingRewards}
            className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/80 hover:bg-white/10"
          >
            Refrescar
          </button>
        </div>

        {/* Selector PJ offline */}
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
            <p className="text-xs text-white/50">Estado</p>
            <p className="mt-1 text-sm font-bold text-white">
              {selectedChar ? selectedChar : "—"}
            </p>
            <p className="mt-1 text-xs text-white/50">
              {selectedChar ? "Listo para recibir." : "Selecciona un personaje."}
            </p>
          </div>
        </div>

        {rewardsMsg && (
          <div className="mt-3 contando rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/70">
            {rewardsMsg}
          </div>
        )}

        <div className="mt-4">
          {rewardsLoading ? (
            <p className="text-sm text-white/60">Cargando…</p>
          ) : rewards.length === 0 ? (
            <div className="rounded-lg border border-white/10 bg-[#0f1623] p-4 text-sm text-white/60">
              No tienes rewards pendientes.
            </div>
          ) : (
            <div className="space-y-3">
              {rewards.map((r) => {
                const canClaim = !!selectedChar && claimingId !== r.id;

                return (
                  <div
                    key={r.id}
                    className="flex flex-col gap-3 rounded-lg border border-white/10 bg-[#0f1623] p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold text-amber-300">
                        Reward #{r.id} • Invite #{r.invite_id}
                      </p>
                      <p className="mt-1 text-sm font-extrabold text-white">
                        Item {r.item_id} × {r.item_qty}
                      </p>
                      <p className="mt-1 text-xs text-white/50">
                        {new Date(r.created_at).toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => claimReward(r.id)}
                      disabled={!canClaim}
                      className={[
                        "rounded-md px-5 py-2 text-sm font-extrabold transition-all",
                        canClaim
                          ? "border border-emerald-500/50 bg-emerald-900/20 text-emerald-200 hover:bg-emerald-900/30"
                          : "cursor-not-allowed border border-white/10 bg-white/5 text-white/40",
                      ].join(" ")}
                    >
                      {claimingId === r.id ? "RECLAMANDO..." : "RECLAMAR"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
