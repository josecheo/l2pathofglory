import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useDonationDraft } from "../hooks/useDonationDraft";
import { useAccount } from "../hooks/useAccount";

type PaymentMethod = "binancepay" | "paypal" | "visa";


type CharacterOption = {
  name: string;
  level: number;
  classId: number;
  online: number;
};

export function DonationCalculator() {
  const MIN_JC = 1;
  const MAX_JC = 10000;
  const JC_PER_USD = 10;

  const LOCAL_CURRENCY = "ARG";
  const LOCAL_PER_USD = 1000;

  const BONUS_RULES: Array<{
    minJc: number;
    label: string;
    percentBonus?: number;
    flatBonus?: number;
  }> = [
    { minJc: 10, label: "+1 Bonus", flatBonus: 1 },
    { minJc: 100, label: "+5% Bonus", percentBonus: 5 },
    { minJc: 500, label: "+10% Bonus", percentBonus: 10 },
    { minJc: 1000, label: "+15% Bonus", percentBonus: 15 },
  ];

  const [characterName, setCharacterName] = useState("");
  const [jc, setJc] = useState<number>(10);
  const [method, setMethod] = useState<PaymentMethod>("paypal");
  const navigate = useNavigate();
    const { token, data, refresh } = useAccount();
  const { draft, loading, error, createDraft } = useDonationDraft();
  const [characters, setCharacters] = useState<CharacterOption[]>([]);
 

  useEffect(() => {
    console.log("DATA", data);
    if(data) {
      const characterOptions = data.characters
      .map((c) => ({
        name: c.name,
        level: c.level,
        classId: c.classId,
        online: c.online,
      }))
      .filter((c) => Boolean(c.name))
      .sort((a, b) => a.name.localeCompare(b.name))

    setCharacters(characterOptions);
    }
    

  }, [data]);

   
  const activeBonus = useMemo(() => {
    const sorted = [...BONUS_RULES].sort((a, b) => a.minJc - b.minJc);
    let chosen: (typeof BONUS_RULES)[number] | null = null;
    for (const r of sorted) {
      if (jc >= r.minJc) chosen = r;
    }
    return chosen;
  }, [jc]);

  const bonusJc = useMemo(() => {
    if (!activeBonus) return 0;
    const percent = activeBonus.percentBonus
      ? (jc * activeBonus.percentBonus) / 100
      : 0;
    const flat = activeBonus.flatBonus ?? 0;
    return Math.floor(percent + flat);
  }, [jc, activeBonus]);

  const totalJc = jc + bonusJc;

  const usd = useMemo(() => jc / JC_PER_USD, [jc]);
  const local = useMemo(() => usd * LOCAL_PER_USD, [usd]);

  const bonusBadgeText = activeBonus ? activeBonus.label : "Sin bonus";
  const bonusBadgeTone = activeBonus
    ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-200"
    : "border-white/10 bg-white/5 text-white/70";

  function clampJc(v: number) {
    if (Number.isNaN(v)) return MIN_JC;
    return Math.max(MIN_JC, Math.min(MAX_JC, v));
  }

  function onJcInputChange(raw: string) {
    const next = clampJc(parseInt(raw || "0", 10));
    setJc(next);
  }


  const selectedMethodLabel: Record<PaymentMethod, string> = {
    binancepay: "Binance Pay",
    paypal: "PayPal",
    visa: "VISA / MasterCard",
  };

  async function handleDonate() {
    const draft = await createDraft({ charName: characterName, amountUsd: usd });
    if (!draft) return;
    console.log("Draft created:", draft);

    createOrderByMethod(draft);

  }

  const createOrderByMethod = (draft: any) => {
    if (method === "paypal") {
      navigate("/account/donate/paypal", {
        state: {
          characterName,
          jc,
          bonusJc,
          totalJc,
          usd,
          localCurrency: LOCAL_CURRENCY,
          local,
          method,
          draft
        },
      });
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Donaciones</h2>
          <p className="text-sm text-white/60">
            Apoya el servidor y recibe recompensas.
          </p>
        </div>

        <div
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${bonusBadgeTone}`}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          {bonusBadgeText}
        </div>
      </div>

      {/* Form */}
      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        {/* Character */}
        <div className="lg:col-span-6">
          <label className="text-sm text-white/75">Nombre del personaje</label>
          <div className="mt-2">
            {characters.length > 0 ? (
              <select
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0b0f17]/60 px-4 py-3 text-white outline-none ring-0 focus:border-emerald-500/40"
              >
                <option value="" className="bg-[#0b0f17]">
                  Selecciona…
                </option>
                {characters.map((n) => (
                  <option key={n.name} value={n.name} className="bg-[#0b0f17]" disabled={n.online === 1}>
                    {n.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Nombre"
                className="w-full rounded-xl border border-white/10 bg-[#0b0f17]/60 px-4 py-3 text-white outline-none focus:border-emerald-500/40"
              />
            )}
          </div>
          <p className="mt-2 text-xs text-orange-400">
            El personaje debe estar desconectado para recibir la donación.
          </p>
        </div>

        {/* Amount */}
        <div className="lg:col-span-6">
          <label className="text-sm text-white/75">Cantidad</label>

          <div className="mt-2 flex overflow-hidden rounded-xl border border-white/10 bg-[#0b0f17]/60">
            <div className="flex items-center gap-2 px-4 text-sm text-white/70">
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs">
                GC
              </span>
            </div>

            <input
              value={jc}
              onChange={(e) => onJcInputChange(e.target.value)}
              inputMode="numeric"
              className="w-full bg-transparent px-2 py-3 text-white outline-none"
            />

            <div className="flex items-center border-l border-white/10 px-3">
              <span className="text-xs text-white/50">Total:</span>
              <span className=" text-nowrap ml-2 text-sm font-semibold text-emerald-200">
                {totalJc} GC
              </span>
            </div>
          </div>

          {/* Slider */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-white/45">
              <span>{MIN_JC}</span>
              <span>{MAX_JC}</span>
            </div>

            <div className="mt-2">
              <input
                type="range"
                min={MIN_JC}
                max={MAX_JC}
                value={jc}
                onChange={(e) => setJc(clampJc(parseInt(e.target.value, 10)))}
                className="w-full accent-emerald-400"
              />

              <div className="mt-2 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                  {jc} GC
                </span>

                <span className="text-xs text-white/45">
                  Bonus: <span className="text-white/80">{bonusJc} GC</span>
                </span>
              </div>
            </div>
          </div>

          {/* Conversion */}
          <div className="flex mt-4 gap-3 justify-end">
            <div className="w-[50%] flex flex-col p-4 rounded-xl border border-white/10 bg-white/5">
              <p className="text-xs uppercase tracking-widest text-white/45">
                USD
              </p>
              <p className="mt-2 text-2xl font-bold">${usd.toFixed(2)}</p>
              <p className="mt-1 text-xs text-white/45">
                Tasa: {JC_PER_USD} GC = 1 USD
              </p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Methods */}
      <div className="mt-6">
        <p className="text-sm text-white/75">
          Selecciona método de pago <span className="text-amber-300">*</span>
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MethodCard
            title="Binance Pay"
            subtitle="Internacional"
            selected={method === "binancepay"}
            onClick={() => setMethod("binancepay")}
          />
          <MethodCard
            title="PayPal"
            subtitle="Internacional"
            selected={method === "paypal"}
            onClick={() => {
              setMethod("paypal");
              // setShowPayPal(true);
            }}
          />
          <MethodCard
            title="VISA / MasterCard"
            subtitle="Internacional"
            selected={method === "visa"}
            onClick={() => setMethod("visa")}
          />
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-white/40">
            Método:{" "}
            <span className="text-white/70">{selectedMethodLabel[method]}</span>{" "}
            • Se acreditará a:{" "}
            <span className="text-white/70">{characterName || "—"}</span>
          </div>
          <div className="flex gap-2">
            <button
              disabled={!characterName || jc < MIN_JC}
              className={[
                "rounded-md px-5 py-2 text-sm font-bold shadow-lg transition-all duration-300 border",
                !characterName
                  ? "cursor-not-allowed border-white/10 bg-white/5 text-white/40"
                  : "border-gray-700 bg-gradient-to-r from-yellow-600 to-amber-700 text-white hover:from-yellow-500 hover:to-amber-600",
              ].join(" ")}
              onClick={() => {
                handleDonate();
                // createOrderByMethod();
              }}
            >
              Donar ahora
            </button>
            <button
              onClick={() => navigate("/account")}
              className="px-6 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 text-white font-bold  rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-700"
            >
              Volver
            </button>
          </div>
        </div>

        {/* {showPayPal && <Checkout />} */}
      </div>
    </div>
  );
}

function MethodCard({
  title,
  subtitle,
  badge,
  selected,
  onClick,
}: {
  title: string;
  subtitle: string;
  badge?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group relative overflow-hidden rounded-2xl border p-4 text-left transition-all",
        selected
          ? "border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_0_1px_rgba(16,185,129,0.20)]"
          : "border-white/10 bg-white/5 hover:bg-white/10",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-xs text-white/50">{subtitle}</p>
        </div>

        {selected && (
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
        )}
      </div>

      {badge && (
        <div className="mt-3 inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
          {badge}
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.10),transparent_55%)]" />
      </div>
    </button>
  );
}
