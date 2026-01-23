import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWebLogin } from "../hooks/useWebLogin";

type Step = "identifier" | "password";

export default function LoginPage() {
  const navigate = useNavigate();
  const { submit, loading, error, setError } = useWebLogin();

  const [step, setStep] = useState<Step>("identifier");
  const [identifier, setIdentifier] = useState(""); // email (o usuario, pero acá lo trataremos como email)
  const [password, setPassword] = useState("");

  const canContinue = useMemo(() => identifier.trim().length > 0, [identifier]);
  const canLogin = useMemo(
    () => identifier.trim().length > 0 && password.length > 0,
    [identifier, password],
  );

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    if (!canContinue) return;

    setError(null);
    setStep("password");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!canLogin) return;

    const r = await submit(identifier, password);
    if (r.ok) {
      // Cambia la ruta a donde quieras mandar al usuario logueado
      navigate("/");
    }
  }

  function goBack() {
    setStep("identifier");
    setPassword("");
    setError(null);
  }

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Header / Logo */}
          <div className="flex flex-col items-center gap-4">
            <img
              src="/logo_pro.png"
              alt="pathofglorylogo"
              className="h-[180px] w-auto"
            />
            <h1 className="text-3xl font-semibold tracking-tight">
              Iniciar sesión
            </h1>

            <p className="text-sm text-white/70">
              ¿Es tu primera vez aquí?{" "}
              <span
                onClick={() => navigate("/register")}
                className="cursor-pointer text-sky-400 hover:text-sky-300"
              >
                Registrarse
              </span>
            </p>
          </div>

          {/* Card */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur">
            {step === "identifier" ? (
              <form onSubmit={handleContinue} className="space-y-4">
                <div>
                  <input
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Correo electrónico o usuario"
                    className="w-full rounded-lg border border-white/15 bg-[#0f1623] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20"
                    autoComplete="username"
                  />
                </div>

                <a
                  href="#"
                  className="block text-sm text-sky-400 hover:text-sky-300"
                >
                  ¿Has olvidado tu correo electrónico?
                </a>

                <button
                  disabled={!canContinue || loading}
                  className="w-full px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-md transition-all duration-300 border border-gray-700 shadow-lg disabled:opacity-60"
                >
                  Continuar
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full px-6 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 text-white font-bold  rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-700"
                >
                  {" "}
                  Volver{" "}
                </button>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs uppercase tracking-widest text-white/40">
                    o
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/70">
                    Continuar como{" "}
                    <span className="text-white font-semibold">
                      {identifier}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={goBack}
                    className="text-sm text-sky-400 hover:text-sky-300"
                  >
                    Cambiar
                  </button>
                </div>

                <div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    type="password"
                    className="w-full rounded-lg border border-white/15 bg-[#0f1623] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20"
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <div className="rounded-lg border border-red-900 bg-red-950/40 p-3 text-red-200 text-sm">
                    {error === "Invalid credentials"
                      ? "Credenciales inválidas"
                      : error}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <a
                    href="#"
                    className="block text-sm text-sky-400 hover:text-sky-300"
                  >
                    ¿Has olvidado tu contraseña?
                  </a>

                  <button
                    type="button"
                    onClick={goBack}
                    className="text-sm text-white/60 hover:text-white"
                  >
                    Volver
                  </button>
                </div>

                <button
                  disabled={!canLogin || loading}
                  className="w-full px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-md transition-all duration-300 border border-gray-700 shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                      Iniciando...
                    </>
                  ) : (
                    "Iniciar sesión"
                  )}
                </button>

                <p className="text-xs text-white/35">
                  * El juego seguirá pidiendo usuario y contraseña, esto es solo
                  para tu web.
                </p>
              </form>
            )}
          </div>

          {/* Footer mini */}
          <div className="mt-6 text-center text-xs text-white/35">
            © {new Date().getFullYear()} Path of Glory — Interlude l2 private
            server
          </div>
        </div>
      </div>
    </div>
  );
}
