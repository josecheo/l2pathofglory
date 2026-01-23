import { useEffect, useState } from "react";
import { useRegister } from "../hooks/useRegister";
import FieldError from "../components/FieldError";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { submit, loading, error, fieldErrors, success } = useRegister();
  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit(form);
  }

  function setField<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  useEffect(() => {
    if (success) {
      setForm({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    }
  },[success])
  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>
      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center gap-4">
            <img
              src="/logo_pro.png"
              alt="pathofglorylogo"
              className="h-[130px] w-auto"
            />
            <h1 className="text-3xl font-semibold tracking-tight">
              Registrate
            </h1>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <input
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="Correo electrónico"
                  className="w-full rounded-lg border border-white/15 bg-[#0f1623] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20"
                />
                <FieldError message={fieldErrors.email} />
                <input
                  value={form.username}
                  onChange={(e) => setField("username", e.target.value)}
                  placeholder="Usuario"
                  className="w-full rounded-lg border border-white/15 bg-[#0f1623] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20"
                />
                <FieldError message={fieldErrors.username} />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setField("password", e.target.value)}
                  placeholder="Contraseña"
                  className="w-full rounded-lg border border-white/15 bg-[#0f1623] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20"
                />
                <FieldError message={fieldErrors.password} />
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setField("confirmPassword", e.target.value)}
                  placeholder="Confirmar Contraseña"
                  className="w-full rounded-lg border border-white/15 bg-[#0f1623] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20"
                />
                <FieldError message={fieldErrors.confirmPassword} />
              </div>
              {error && (
                <div className="rounded-lg border border-red-900 bg-red-950/40 p-3 text-red-200 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-lg border border-emerald-900 bg-emerald-950/40 p-3 text-emerald-200 text-sm">
                  Cuenta creada ✅ Ya puedes <a href="/login" className="text-emerald-200 hover:text-emerald-100 cursor-pointer">iniciar sesión</a>.
                </div>
              )}
              <button
                disabled={loading}
                className="w-full px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-md transition-all duration-300 border border-gray-700 shadow-lg"
              >
                {loading ? "Creando cuenta..." : "Continuar"}
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

              <p className="mt-5 text-center text-xs text-white/35">
                Al continuar, aceptas nuestros{" "}
                <a className="text-white/55 hover:text-white" href="#">
                  Términos
                </a>{" "}
                y{" "}
                <a className="text-white/55 hover:text-white" href="#">
                  Política de privacidad
                </a>
                .
              </p>
            </form>
          </div>
          <div className="mt-6 text-center text-xs text-white/35">
            © {new Date().getFullYear()} Path of Glory — Interlude l2 private
            server
          </div>
        </div>
      </div>
    </div>
  );
}
