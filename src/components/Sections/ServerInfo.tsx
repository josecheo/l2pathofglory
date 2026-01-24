const ServerInfo = () => {


  return (
<section id="server-info" className="scroll-mt-24  sm:py-18">
  {/* BLOQUE FULL WIDTH */}
  <div
    className="
      relative w-full overflow-hidden
      min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]
      flex items-center
      
    "
    style={{
      backgroundImage: `url('/wallpaper24.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center top 35%",
  
    }}
  >
    {/* overlays */}
    <div className="absolute inset-0 bg-black/35" />

    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:bg-gradient-to-l sm:from-black/95 sm:via-black/40 sm:to-transparent" />

    {/* CONTENEDOR CENTRADO */}
    <div className="relative z-10 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            ml-0 py-10
            sm:ml-auto sm:w-[62%]
            lg:w-1/2
          "
        >
          <p className="text-xs font-semibold tracking-widest text-gray-200/90 sm:text-sm">
            DISFRUTA DE LA MEJOR EXPERIENCIA
          </p>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Características del Servidor
          </h2>

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { label: "EXP", value: "x10" },
              { label: "SP", value: "x10" },
              { label: "Drop", value: "x5" },
              { label: "Adena", value: "x3" },
              { label: "Safe Enchant", value: "+3" },
              { label: "Max Enchant", value: "+16" },
            ].map((it) => (
              <li
                key={it.label}
                className="
                  rounded-lg border border-white/10 bg-black/30
                  px-4 py-3 backdrop-blur-sm
                  transition-transform duration-300 hover:-translate-y-0.5
                "
              >
                <span className="text-sm font-bold text-yellow-300">
                  {it.label}:
                </span>{" "}
                <span className="text-sm font-medium text-gray-200">
                  {it.value}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button className="w-full rounded-md border border-amber-500 bg-gradient-to-r from-yellow-600 to-amber-700 px-5 py-3 text-sm font-bold text-white transition-all hover:from-yellow-500 hover:to-amber-600 sm:w-auto">
              VER DETALLES
            </button>
            <button className="w-full rounded-md border border-white/15 bg-black/30 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-black/40 sm:w-auto">
              REGLAS DEL SERVIDOR
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


  );
};

export default ServerInfo;