const InviteFriends = () => {
  return (
<section id="community" className="scroll-mt-24 sm:py-18 ">

  <div
    className="
      relative w-full overflow-hidden
      min-h-[440px] sm:min-h-[500px] lg:min-h-[560px]
      flex items-center
    "
    style={{
      backgroundImage: `url('/invite2.webp')`,
      backgroundSize: "cover",
      backgroundPosition: "center top 35%",
    }}
  >
    {/* overlay base */}
    <div className="absolute inset-0 bg-black/30" />

    {/* gradiente adaptativo */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent sm:bg-gradient-to-l sm:from-black/95 sm:via-black/40 sm:to-transparent" />

    {/* CONTENIDO */}
    <div className="relative z-10 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            ml-0 py-10
            sm:ml-auto sm:w-[62%]
            lg:w-1/2
          "
        >
          <p className="text-xs font-extrabold tracking-widest text-yellow-400 sm:text-sm">
            NUEVAS RECOMPENSAS ÚNICAS
          </p>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Recluta a un amigo
          </h2>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-200 sm:text-base lg:text-lg">
            Traed a vuestros amigos a Ciudadela Abisal y embarcaos juntos en una
            aventura para conseguir recompensas épicas. Con el nuevo programa,
            podréis ganar beneficios y ventajas cuando vuestros amigos se sumen
            a la batalla.
          </p>

          <button className="mt-6 inline-flex items-center rounded-md border border-amber-500 bg-gradient-to-r from-yellow-600 to-amber-700 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:from-yellow-500 hover:to-amber-600 shadow-lg shadow-yellow-900/30">
            MÁS INFORMACIÓN
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default InviteFriends;
