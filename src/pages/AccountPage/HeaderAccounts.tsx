import { useNavigate } from "react-router-dom";
import { tokenStorage } from "../../auth/tokenStorage";
import { useAccount } from "../../hooks/useAccount";

export default function HeaderAccount() {
  const navigate = useNavigate();
  const { token, data, refresh } = useAccount();

  function logout() {
    tokenStorage.clear();
    navigate("/");
  }

  if (!token) {
    navigate("/");
    return null;
  }

  return (
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/logo_pro.png"
              alt="pathofglorylogo"
              className="h-16 w-auto"
            />
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Mi cuenta
              </h1>
              <p className="text-sm text-white/60">
                {data?.account?.login
                  ? `Cuenta: ${data.account.login}`
                  : "Cargando cuenta..."}
              </p>
            </div>
          </div>

          <div className="flex w-2/4 items-center gap-3">
            <button
              onClick={refresh}
              className="px-6 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 text-white font-bold  rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-700"
            >
              Refresh
            </button>

            <button
              onClick={()=>navigate("/account/donate")}
              className=" rounded-md border border-gray-700 bg-gradient-to-r from-yellow-600 to-amber-700 px-4 py-2 text-sm font-bold text-white shadow-lg hover:from-yellow-500 hover:to-amber-600"
            >
              Donar
            </button>

            <button
              onClick={logout}
              className="w-full px-6 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 text-white font-bold  rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-700"

            >
              Cerrar sesión
            </button>

          </div>
        </div>
  );
}

