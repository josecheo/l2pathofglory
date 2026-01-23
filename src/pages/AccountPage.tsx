import { useNavigate } from "react-router-dom";
import { tokenStorage } from "../auth/tokenStorage";
import { useAccount } from "../hooks/useAccount";
import { CLASS_MAP } from "../constants/classMap";


export default function AccountPage() {
  const navigate = useNavigate();
  const { token, data, loading, error, refresh, stats } = useAccount();

  function logout() {
    tokenStorage.clear();
    navigate("/");
  }

  // Si no hay token, manda al login
  if (!token) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      {/* Fondo */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo_pro.png" alt="pathofglorylogo" className="h-16 w-auto" />
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Mi cuenta</h1>
              <p className="text-sm text-white/60">
                {data?.account?.login ? `Cuenta: ${data.account.login}` : "Cargando cuenta..."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              Refresh
            </button>

            <button
              onClick={logout}
              className="rounded-md border border-gray-700 bg-gradient-to-r from-yellow-600 to-amber-700 px-4 py-2 text-sm font-bold text-white shadow-lg hover:from-yellow-500 hover:to-amber-600"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Personajes" value={stats.total} />
          <StatCard label="Online" value={stats.online} />
          <StatCard label="Nivel máximo" value={stats.maxLevel} />
        </div>

        {/* Content card */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Tus personajes</h2>
            <span className="text-xs text-white/50">
              {loading ? "Actualizando..." : data?.characters?.length ? "Actualizado" : "—"}
            </span>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          {loading && (
            <div className="mt-6 flex items-center gap-3 text-white/70">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
              Cargando información...
            </div>
          )}

          {!loading && !error && (data?.characters?.length ?? 0) === 0 && (
            <div className="mt-6 text-sm text-white/60">
              No se encontraron personajes para esta cuenta.
            </div>
          )}

          {!loading && !error && (data?.characters?.length ?? 0) > 0 && (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-xs uppercase tracking-wider text-white/45">
                  <tr className="border-b border-white/10">
                    <th className="py-3">Nombre</th>
                    <th className="py-3">Nivel</th>
                    <th className="py-3">Clase</th>
                    <th className="py-3">Estado</th>
                  </tr>
                </thead>

                <tbody className="text-sm">
                  {data!.characters
                    .slice()
                    .sort((a, b) => b.level - a.level)
                    .map((c) => (
                      <tr key={c.name} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 font-semibold">{c.name}</td>
                        <td className="py-3 text-white/85">{c.level}</td>
                        <td>{CLASS_MAP[c.classId] ?? `Unknown (${c.classId})`}</td>
                        <td className="py-3">
                          {c.online === 1 ? (
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-200">
                              <span className="h-2 w-2 rounded-full bg-emerald-400" />
                              Online
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                              <span className="h-2 w-2 rounded-full bg-white/30" />
                              Offline
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-white/35">
          © {new Date().getFullYear()} Path of Glory — Interlude l2 private server
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur">
      <p className="text-xs uppercase tracking-widest text-white/45">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
