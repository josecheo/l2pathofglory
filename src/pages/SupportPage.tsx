import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

type TicketForm = {
  subject: string;
  category: "Cuenta" | "Donaciones" | "Bug" | "Reportar jugador" | "Otro";
  message: string;
  email: string;
};

const SupportPage = () => {
  const navigate = useNavigate();

  // ✅ Cambia estos datos
  const SUPPORT = useMemo(
    () => ({
      whatsappNumber: "+58 412-5585388", // formato internacional sin +
      whatsappDisplay: "+58 412-5585388",
      discordInviteUrl: "https://discord.gg/TU_INVITE",
      discordServerName: "Path of Glory",
      supportEmail: "support@pathofglory.com",
      ticketUrl: "https://tu-form-o-sistema-de-tickets.com", // opcional
    }),
    [],
  );

  const [form, setForm] = useState<TicketForm>({
    subject: "",
    category: "Cuenta",
    message: "",
    email: "",
  });

  const whatsappLink = `https://wa.me/${SUPPORT.whatsappNumber}?text=${encodeURIComponent(
    "Hola soporte, necesito ayuda con:",
  )}`;

  const mailtoLink = `mailto:${SUPPORT.supportEmail}?subject=${encodeURIComponent(
    `Soporte - ${form.subject || "Consulta"}`,
  )}&body=${encodeURIComponent(form.message || "Hola, necesito ayuda con...")}`;

  function update<K extends keyof TicketForm>(key: K, value: TicketForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function openTicket() {
    // Si ya tienes sistema de tickets, manda ahí
    if (SUPPORT.ticketUrl) {
      window.open(SUPPORT.ticketUrl, "_blank");
      return;
    }

    // Alternativa: abrir mail con el contenido del form
    window.open(
      `mailto:${SUPPORT.supportEmail}?subject=${encodeURIComponent(
        `Ticket: ${form.category} - ${form.subject || "Sin asunto"}`,
      )}&body=${encodeURIComponent(
        `Email de contacto: ${form.email}\n\nDetalle:\n${form.message}`,
      )}`,
      "_blank",
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-white">
      <main className="relative z-10 flex flex-col">
        <section className="min-h-screen flex flex-col">
          <div className="flex flex-1 items-center">
            <div className="container mx-auto w-full px-4 sm:px-8 lg:px-24">
              <div className="mx-auto w-full max-w-5xl">
                {/* Top bar */}
                <div className="mb-6 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                      Soporte
                    </h1>
                    <p className="mt-2 text-sm text-gray-200 sm:text-base">
                      ¿Problemas con tu cuenta, donaciones o bugs? Escríbenos
                      por cualquiera de estos canales.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate("/")}
                      className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/10"
                    >
                      Volver al Home
                    </button>

                    <button
                      onClick={() => navigate("/register")}
                      className="rounded-lg border border-amber-500 bg-gradient-to-r from-yellow-600 to-amber-700 px-4 py-2 text-sm font-bold shadow-2xl shadow-yellow-900/40 transition hover:from-yellow-500 hover:to-amber-600"
                    >
                      Crear cuenta
                    </button>
                  </div>
                </div>

                {/* Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {/* WhatsApp */}
                  <div className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-300">
                          WhatsApp
                        </p>
                        <p className="mt-2 text-lg font-bold">
                          {SUPPORT.whatsappDisplay}
                        </p>
                        <p className="mt-1 text-sm text-gray-200">
                          Respuesta rápida para soporte.
                        </p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                        24/7
                      </span>
                    </div>

                    <button
                      onClick={() => window.open(whatsappLink, "_blank")}
                      className="mt-4 w-full rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-3 text-sm font-bold transition hover:bg-emerald-500/25"
                    >
                      Abrir WhatsApp
                    </button>
                  </div>

                  {/* Discord */}
                  <div className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-300">
                      Discord
                    </p>
                    <p className="mt-2 text-lg font-bold">
                      {SUPPORT.discordServerName}
                    </p>
                    <p className="mt-1 text-sm text-gray-200">
                      Reportes, anuncios y canales por categoría.
                    </p>

                    <button
                      onClick={() =>
                        window.open(SUPPORT.discordInviteUrl, "_blank")
                      }
                      className="mt-4 w-full rounded-xl border border-indigo-400/40 bg-indigo-500/15 px-4 py-3 text-sm font-bold transition hover:bg-indigo-500/25"
                    >
                      Unirme al Discord
                    </button>
                  </div>

                  {/* Email */}
                  <div className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-300">
                      Correo
                    </p>
                    <p className="mt-2 text-lg font-bold">
                      {SUPPORT.supportEmail}
                    </p>
                    <p className="mt-1 text-sm text-gray-200">
                      Ideal para casos con evidencia.
                    </p>

                    <button
                      onClick={() => window.open(mailtoLink, "_blank")}
                      className="mt-4 w-full rounded-xl border border-amber-400/40 bg-amber-500/15 px-4 py-3 text-sm font-bold transition hover:bg-amber-500/25"
                    >
                      Enviar correo
                    </button>
                  </div>
                </div>

                {/* Ticket form */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur sm:mt-10">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold">
                        Crear ticket de soporte
                      </h2>
                      <p className="mt-1 text-sm text-gray-200">
                        Completa esto para que el equipo te atienda más rápido.
                      </p>
                    </div>

                    <div className="text-xs text-gray-300">
                      Tiempo promedio: 10–60 min
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-300">
                        Email de contacto
                      </label>
                      <input
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="tuemail@correo.com"
                        className="w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm outline-none transition focus:border-amber-500/60"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-300">
                        Categoría
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) =>
                          update(
                            "category",
                            e.target.value as TicketForm["category"],
                          )
                        }
                        className="w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm outline-none transition focus:border-amber-500/60"
                      >
                        <option>Cuenta</option>
                        <option>Donaciones</option>
                        <option>Bug</option>
                        <option>Reportar jugador</option>
                        <option>Otro</option>
                      </select>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs font-semibold text-gray-300">
                        Asunto
                      </label>
                      <input
                        value={form.subject}
                        onChange={(e) => update("subject", e.target.value)}
                        placeholder="Ej: No puedo iniciar sesión / Donación no acreditada"
                        className="w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm outline-none transition focus:border-amber-500/60"
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs font-semibold text-gray-300">
                        Detalle
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        rows={5}
                        placeholder="Incluye: nombre de cuenta/char, fecha/hora, servidor, evidencia (si aplica)..."
                        className="w-full resize-none rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm outline-none transition focus:border-amber-500/60"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-300">
                      Tip: Si es “donación no acreditada”, adjunta el ID de
                      transacción.
                    </p>

                    <button
                      onClick={openTicket}
                      disabled={!form.message.trim() || !form.email.trim()}
                      className="rounded-xl border border-amber-500 bg-gradient-to-r from-yellow-600 to-amber-700 px-6 py-3 text-sm font-bold shadow-2xl shadow-yellow-900/40 transition disabled:cursor-not-allowed disabled:opacity-50 hover:from-yellow-500 hover:to-amber-600"
                    >
                      Enviar ticket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mantener estructura como Home */}

        <Footer />
      </main>
    </div>
  );
};

export default SupportPage;
