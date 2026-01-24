import newsItems from "../../data/news.json";

const LastUpdate = () => {
  return (
    <section id="last-updates" className="relative scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-balance text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Últimas noticias y actualizaciones
            </h2>
            <p className="mt-2 text-sm text-gray-300 sm:text-base">
              Enterate de cambios, eventos y anuncios del servidor.
            </p>
          </div>

          <button className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-blue-700 bg-gradient-to-r from-blue-800/70 to-blue-900/70 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-blue-700/70 hover:to-blue-800/70 sm:w-auto">
            VER TODAS LAS NOTICIAS
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="group h-full overflow-hidden rounded-xl border border-gray-800/70 bg-gradient-to-b from-gray-900/80 to-gray-950/90 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-purple-700/70"
            >
              {/* Media */}
              <div
                className="relative h-44 w-full overflow-hidden sm:h-48"
                style={{
                  backgroundImage: `url('${item.img}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/10" />
                {item.isNew && (
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-md bg-black/70 px-3 py-1 text-xs font-semibold text-amber-400 ring-1 ring-white/10">
                      NUEVO
                    </span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="flex h-full flex-col p-5">
                <p className="text-xs font-medium text-amber-400 sm:text-sm">
                  {item.date}
                </p>

                <h3 className="mt-2 line-clamp-2 text-base font-bold text-white transition-colors duration-300 group-hover:text-yellow-300 sm:text-lg">
                  {item.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm text-gray-300">
                  {item.excerpt}
                </p>

                {/* Spacer para empujar CTA abajo */}
                <div className="flex-1" />

                <div className="mt-4 border-t border-gray-800/50 pt-4">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                  >
                    Leer más
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LastUpdate;
