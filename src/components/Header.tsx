
const Header = () => {


  return (
    <header
      className="w-[90%] mt-4 mx-auto py-6 flex justify-between items-center bg-gray-900 px-4 rounded-md mb-12 border border-gray-800/50 shadow-lg">
      <div className="flex flex-col ml-24 ">

       <span className="text-sm text-white font-semibold">Accounts:<span className="ml-2 text-sm text-amber-400">5368</span> </span>
        <span className="text-sm text-white font-semibold">Online:<span className="ml-2 text-sm text-green-400">1752</span> </span> 
        </div>
        

      <nav className="hidden md:flex space-x-8">
        {['Noticias', 'Expansiones', 'Comunidad', 'Soporte', 'Tienda'].map((item) => (
          <a key={item} href="#" className="text-gray-300 text-xl  hover:text-yellow-400 transition-colors duration-300 font-medium">
            {item}
          </a>
        ))}
      </nav>

      <button className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-md transition-all duration-300 border border-gray-700 shadow-lg">
        JUGAR AHORA
      </button>
    </header>
  );
};

export default Header;