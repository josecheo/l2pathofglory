import {
  ArrowDownTrayIcon,
  ShieldCheckIcon,
  CloudArrowDownIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function DownloadSection() {
  // 🔧 Cambia estas URLs
  const LAUNCHER_URL = "https://drive.usercontent.google.com/download?id=1r4Mo2pK88kh9Vg5VDHUsl97TxrUKvWCa&export=download&authuser=0";
  const CLIENT_GDRIVE_URL = "https://drive.usercontent.google.com/download?id=1OUsqFm9NIodsypk4pqLy6JXqnbbgJPXq&export=download&authuser=0";

  const navigate = useNavigate();

  return (
    <section id="download" className="scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-8 lg:px-24">
        <div className="mb-6 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">



        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f131a]/85 shadow-2xl backdrop-blur-md">
          {/* Glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative p-6 sm:p-10">
            
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                  Descargas
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
                  Empieza a jugar en minutos
                </h2>
                <p className="mt-2 max-w-2xl text-sm sm:text-base text-white/65">
                  Recomendado: descarga el{" "}
                  <span className="text-white">Launcher</span> para instalar y
                  mantener el juego actualizado automáticamente. Si prefieres,
                  también puedes bajar el cliente completo desde Google Drive.
                </p>
              </div>

              <div className="mt-4 sm:mt-0 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                <ShieldCheckIcon className="h-4 w-4 text-white/60" />
                Descargas oficiales • Path of Glory
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {/* Card: Launcher */}
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/7 transition">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                  <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-500/15 blur-2xl" />
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-blue-500/15 border border-blue-500/20">
                    <ArrowDownTrayIcon className="h-6 w-6 text-blue-200" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">
                      Descargar Launcher
                    </h3>
                    <p className="mt-1 text-sm text-white/65">
                      Instala el cliente comprimido y aplica updates
                      automáticamente. Ideal para la mayoría.
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/50">
                      <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1">
                        Windows
                      </span>
                      <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1">
                        Auto-Update
                      </span>
                      <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1">
                        Recomendado
                      </span>
                    </div>

                    <div className="mt-5 flex flex-col sm:flex-row gap-2">
                      <a
                        href={LAUNCHER_URL}
                        download
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1b6dff] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0f5ef5] active:bg-[#0b52de] transition"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5" />
                        Descargar Launcher
                      </a>

                    </div>

                    <p className="mt-3 text-xs text-white/45">
                      Nota: Windows puede mostrar una advertencia si el archivo
                      no está firmado. Es normal en launchers nuevos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card: Full client */}
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/7 transition">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                  <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-indigo-500/15 blur-2xl" />
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-indigo-500/15 border border-indigo-500/20">
                    <CloudArrowDownIcon className="h-6 w-6 text-indigo-200" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">
                      Cliente Completo (Google Drive)
                    </h3>
                    <p className="mt-1 text-sm text-white/65">
                      Descarga manual del cliente completo. Útil si tienes
                      problemas con el launcher o quieres instalarlo por tu
                      cuenta.
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/50">
                      <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1">
                        Manual
                      </span>
                      <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1">
                        Google Drive
                      </span>
                      <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1">
                        Cliente completo
                      </span>
                    </div>

                    <div className="mt-5 flex flex-col sm:flex-row gap-2">
                      <a
                        href={CLIENT_GDRIVE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition"
                      >
                        <CloudArrowDownIcon className="h-5 w-5 text-white/80" />
                        Ir a Google Drive
                        <ArrowTopRightOnSquareIcon className="h-4 w-4 text-white/60" />
                      </a>


                    </div>

                    <p className="mt-3 text-xs text-white/45">
                      Recomendación: después de instalar manualmente, abre el
                      launcher para aplicar updates y reparar archivos si
                      hiciera falta.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer row */}
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-white/45">
              <p>
                Tip: si el enlace del launcher descarga lento, prueba en otra
                hora o usa el ZIP del launcher (menos bloqueos).
              </p>
              <a
                href="#support"
                className="text-white/70 hover:text-white transition inline-flex items-center gap-2"
              >
                ¿Problemas para descargar? Ver asistencia
                <ArrowTopRightOnSquareIcon className="h-4 w-4 text-white/50" />
              </a>
                        <div className="flex gap-3">
            <button
              onClick={() => navigate("/")}
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/10"
            >
              Volver al Home
            </button>

          </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
