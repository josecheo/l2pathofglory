import { CLASS_MAP } from "../../constants/classMap";

export function OverviewSection(props: {
  stats: { total: number; online: number; maxLevel: number };
  loading: boolean;
  error: string | null;
  characters: Array<{
    name: string;
    level: number;
    classId: number;
    online: number;
  }>;
}) {
  const { stats, loading, error, characters } = props;

  return (
    <>
      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Personajes" value={stats.total} />
        <StatCard label="Online" value={stats.online} />
        <StatCard label="Nivel máximo" value={stats.maxLevel} />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Tus personajes</h2>
          <span className="text-xs text-white/50">
            {loading
              ? "Actualizando..."
              : characters.length
                ? "Actualizado"
                : "—"}
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

        {!loading && !error && characters.length === 0 && (
          <div className="mt-6 text-sm text-white/60">
            No se encontraron personajes para esta cuenta.
          </div>
        )}

        {!loading && !error && characters.length > 0 && (
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
                {characters
                  .slice()
                  .sort((a, b) => b.level - a.level)
                  .map((c) => (
                    <tr
                      key={c.name}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="py-3 font-semibold">{c.name}</td>
                      <td className="py-3 text-white/85">{c.level}</td>
                      <td className="py-3">
                        {CLASS_MAP[c.classId] ?? `Unknown (${c.classId})`}
                      </td>
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
    </>
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
