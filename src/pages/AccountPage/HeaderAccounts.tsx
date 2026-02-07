import { TabKey } from "../../types";

export function HeaderAccounts(props: {
  login: string;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  onRefresh: () => void;
  onLogout: () => void;
}) {
  const btnBase =
    "rounded-md border border-gray-700/80 bg-gradient-to-r from-gray-800/70 to-gray-900/70 px-5 py-3 text-sm font-semibold text-white transition-all hover:from-gray-700/70 hover:to-gray-800/70";
  const btnActive =
    "rounded-md border border-amber-500/70 bg-gradient-to-r from-yellow-600 to-amber-700 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-yellow-900/30 hover:from-yellow-500 hover:to-amber-600";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <img src="/logo_pro.webp" alt="logo" className="h-14 w-14" />
        <div>
          <h1 className="text-2xl font-extrabold text-white">Mi cuenta</h1>
          <p className="text-sm text-white/70">Cuenta: {props.login}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button className={btnBase} onClick={props.onRefresh}>
          Refresh
        </button>

        <button
          className={props.activeTab === "donate" ? btnActive : btnBase}
          onClick={() => props.onTabChange("donate")}
        >
          Donar
        </button>

        <button
          className={props.activeTab === "recruit" ? btnActive : btnBase}
          onClick={() => props.onTabChange("recruit")}
        >
          Reclutar
        </button>



        <button
          className={props.activeTab === "rewards" ? btnActive : btnBase}
          onClick={() => props.onTabChange("rewards")}
        >
          Reclamar
        </button>

        <button className={btnBase} onClick={props.onLogout}>
          Cerrar sesión
        </button>

      </div>
    </div>
  );
}
