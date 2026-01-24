// import { useNavigate } from "react-router-dom";
// import { tokenStorage } from "../../auth/tokenStorage";
// import { useAccount } from "../../hooks/useAccount";

// export default function HeaderAccount() {
//   const navigate = useNavigate();
//   const { token, data, refresh } = useAccount();

//   function logout() {
//     tokenStorage.clear();
//     navigate("/");
//   }

//   if (!token) {
//     navigate("/");
//     return null;
//   }

//   return (
//         <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <img
//               src="/logo_pro.webp"
//               alt="pathofglorylogo"
//               className="h-16 w-auto"
//             />
//             <div>
//               <h1 className="text-2xl font-semibold tracking-tight">
//                 Mi cuenta
//               </h1>
//               <p className="text-sm text-white/60">
//                 {data?.account?.login
//                   ? `Cuenta: ${data.account.login}`
//                   : "Cargando cuenta..."}
//               </p>
//             </div>
//           </div>

//           <div className="flex w-2/4 items-center gap-3">
//             <button
//               onClick={refresh}
//               className="px-6 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 text-white font-bold  rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-700"
//             >
//               Refresh
//             </button>

//             <button
//               onClick={()=>navigate("/account/donate")}
//               className=" rounded-md border border-gray-700 bg-gradient-to-r from-yellow-600 to-amber-700 px-4 py-2 text-sm font-bold text-white shadow-lg hover:from-yellow-500 hover:to-amber-600"
//             >
//               Donar
//             </button>

//             <button
//               onClick={()=>navigate("/account/recruit")}
//               className=" rounded-md border border-gray-700 bg-gradient-to-r from-yellow-600 to-amber-700 px-4 py-2 text-sm font-bold text-white shadow-lg hover:from-yellow-500 hover:to-amber-600"
//             >
//               Reclutar
//             </button>


//             <button
//               onClick={logout}
//               className="w-full px-6 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 text-white font-bold  rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-700"

//             >
//               Cerrar sesión
//             </button>

//           </div>
//         </div>
//   );
// }



import { Link } from "react-router-dom";

type TabKey = "overview" | "donate" | "recruit";

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

        <button className={btnBase} onClick={props.onLogout}>
          Cerrar sesión
        </button>

      </div>
    </div>
  );
}
