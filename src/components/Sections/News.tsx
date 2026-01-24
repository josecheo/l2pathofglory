const News = () => {


  return (
    <div
      className="relative w-full bg-gray-800 text-white h-[343px] flex items-center justify-start bg-cover bg-center border"
      style={{
        backgroundImage: `url('/new.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top 35%',
      }}
    >
      <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-black/100 to-transparent"></div>
      <div className="relative z-10 ml-64">
        <p className="text-lg text-yellow-400 mb-2">19 de diciembre 2025</p>
        <h2 className="text-white font-bold text-5xl mb-6">
          Esta semana en POG
        </h2>
        <p className="max-w-[400px] text-lg">
         ¡Ponte al día con las últimas novedades de Path Of Glory de la semana pasada!
          </p>
      <button className="mt-4 px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-md transition-all duration-300 border border-gray-700 shadow-lg">
       MÁS INFORMACIÓN
      </button>
      </div>

    </div>
  );
};

export default News;