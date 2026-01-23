import { useNavigate } from "react-router-dom";
import { usePublicMetrics } from "../hooks/usePublicMetrics";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
const { data, loading, error, refresh } = usePublicMetrics();
const navigate = useNavigate();
const { isAuthenticated } = useAuth();

  console.log({ data, loading, error });
  return (
    <header
      className="w-[90%] mt-4 mx-auto py-6 flex justify-between items-center bg-gray-900 px-4 rounded-md mb-12 border border-gray-800/50 shadow-lg">
      {loading ? (
        <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin ml-24 rounded-full border-4 border-zinc-300 border-t-transparent"></div>
        </div>
          ): (
        <div className="flex flex-col ml-24 ">
          <span className="text-sm text-white font-semibold">Accounts:<span className="ml-2 text-sm text-amber-400">{data?.totalAccounts}</span> </span>
          <span className="text-sm text-white font-semibold">Player Online:<span className="ml-2 text-sm text-green-400">{data?.onlinePlayers}</span> </span> 
        </div>
      )}
      
      <nav className="hidden md:flex space-x-8">
        {['Noticias', 'Expansiones', 'Comunidad', 'Soporte', 'Tienda'].map((item) => (
          <a key={item} href="#" className="text-gray-300 text-xl  hover:text-yellow-400 transition-colors duration-300 font-medium">
            {item}
          </a>
        ))}
      </nav>

<button
  onClick={() => navigate(isAuthenticated ? "/account" : "/login")}
  className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-md transition-all duration-300 border border-gray-700 shadow-lg"
>
  {isAuthenticated ? "MI CUENTA" : "INICIAR SESIÓN"}
</button>
    </header>
  );
};

export default Header;