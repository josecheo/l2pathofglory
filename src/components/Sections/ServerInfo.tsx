const ServerInfo = () => {


  return (
        <div
          className="relative w-full bg-gray-800 text-white h-[500px] flex items-center justify-start bg-cover bg-center border"
          style={{
            backgroundImage: `url('/wallpaper24.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top 35%',
          }}
        >
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black/100 to-transparent"></div>
          <div className="relative z-10 ml-64">
            <p className="text-md mb-2">DISFRUTA DE LA MEJOR EXPERIENCIA</p>
            <h2 className="text-white font-bold text-3xl mb-6">
              Características del Servidor
            </h2>
            <ul className="space-y-1">
              <li className="font-bold text-lg text-yellow-300 transition-colors duration-300">
                EXP: <span className="text-gray-300 font-normal">x10</span>
              </li>
              <li className="font-bold text-lg text-yellow-300 transition-colors duration-300">
                SP: <span className="text-gray-300 font-normal">x10</span>
              </li>
              <li className="font-bold text-lg text-yellow-300 transition-colors duration-300">
                Drop: <span className="text-gray-300 font-normal">x5</span>
              </li>
              <li className="font-bold text-lg text-yellow-300 transition-colors duration-300">
                Adena: <span className="text-gray-300 font-normal">x3</span>
              </li>
              <li className="font-bold text-lg text-yellow-300 transition-colors duration-300">
                Safe Enchant: <span className="text-gray-300 font-normal">+3</span>
              </li>
              <li className="font-bold text-lg text-yellow-300 transition-colors duration-300">
                Max Enchant: <span className="text-gray-300 font-normal">+16</span>
              </li>
            </ul>
          </div>
        </div>
  );
};

export default ServerInfo;