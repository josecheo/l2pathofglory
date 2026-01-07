const LastUpdate = () => {


    const newsItems = [
        {
            id: 1,
            title: "Nueva Raid: El Corazón de la Pesadilla",
            date: "Marzo 18, 2024",
            img: "/129985_t.jpg",
            excerpt: "Adéntrate en las profundidades del Bosque de los Susurros para enfrentarte a nuevos desafíos."
        },
        {
            id: 2,
            title: "Clase Nueva: Vigía de las Sombras",
            date: "Marzo 15, 2024",
            img: "/NWeg5L.jpg",
            excerpt: "Domina las artes de la sombra y la sanación con la nueva clase híbrida disponible en Midnight."
        },
        {
            id: 3,
            title: "Evento Prelanzamiento: Invasión de Xafatath",
            date: "Marzo 10, 2024",
            img: "/54611.jpg",
            excerpt: "Participa en el evento mundial que precede al lanzamiento de Midnight."
        },
        {
            id: 4,
            title: "Actualización de Sistemas de Combate",
            date: "Marzo 5, 2024",
            img: "/wp4118338.jpg",
            excerpt: "Mejoras significativas en el sistema de talentos y habilidades para todas las clases."
        }
    ];

    return (
        <div className="max-w-6xl mx-auto w-full">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Últimas noticias y actualizaciones</h2>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-800/70 to-blue-900/70 hover:from-blue-700/70 hover:to-blue-800/70 text-white font-semibold rounded-md transition-all duration-300 border border-blue-700 flex items-center gap-2">
                    VER TODAS LAS NOTICIAS
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Grid de noticias */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newsItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-gradient-to-b from-gray-900/80 to-gray-950/90 border border-gray-800/70 rounded-lg overflow-hidden hover:border-purple-700/70 transition-all duration-300 hover:transform hover:-translate-y-2 group backdrop-blur-sm"
                    >
                        <div className="h-40 bg-gradient-to-r from-purple-900/40 to-blue-900/40 relative overflow-hidden"
                            style={{ backgroundImage: `url('${item.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-4 left-4">
                                <span className="px-3 py-1 bg-black/70 text-amber-400 text-sm font-semibold rounded">NUEVO</span>
                            </div>
                        </div>
                        <div className="p-5">
                            <p className="text-amber-400 text-sm mb-2">{item.date}</p>
                            <h3 className="text-white font-bold text-lg mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                                {item.title}
                            </h3>
                            <p className="text-gray-300 text-sm">{item.excerpt}</p>
                            <div className="mt-4 pt-4 border-t border-gray-800/50">
                                <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-1">
                                    Leer más
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LastUpdate;