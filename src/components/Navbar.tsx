import { Link, NavLink } from "react-router-dom";
import logo from "../assets/react.svg";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${isActive ? "text-lineageGold" : "text-gray-300 hover:text-white"}`;

export default function Navbar() {
  return (
    <nav className="bg-lineageGray border-b border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="L2" className="h-8 w-8" />
          <span className="font-serif text-xl text-lineageGold">L2 Interlude</span>
        </Link>
        <div className="flex items-center gap-2">
          <NavLink to="/news" className={linkClass}>Noticias</NavLink>
          <NavLink to="/server" className={linkClass}>Servidor</NavLink>
          <NavLink to="/download" className={linkClass}>Descarga</NavLink>
          <NavLink to="/donations" className={linkClass}>Donaciones</NavLink>
          <NavLink to="/register" className={linkClass}>Registro</NavLink>
          <NavLink to="/login" className={linkClass}>Inicio</NavLink>
        </div>
      </div>
    </nav>
  );
}
