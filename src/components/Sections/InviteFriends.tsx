const InviteFriends = () => {


  return (
    <div
      className="relative w-full bg-gray-800 text-white h-[600px] flex items-center justify-end bg-cover bg-center border"
      style={{
        backgroundImage: `url('/invite2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top 35%',
      }}
    >
      <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-black/100 to-transparent"></div>
      <div className="relative z-10 mr-64">
        <p className="text-lg text-yellow-400 mb-2">NUEVAS RECOMPENSAS ÚNICAS</p>
        <h2 className="text-white font-bold text-5xl mb-6">
          Recluta a un amigo
        </h2>
        <p className="max-w-[400px] text-lg">
          Traed a vuestros amigos a Ciudadela Abisal y embarcaos juntos en una aventura para conseguir recompensas épicas.
          Con el nuevo programa, podréis ganar beneficios y ventajas cuando vuestros amigos se sumen a la batalla.
          </p>
      <button className="mt-4 px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-md transition-all duration-300 border border-gray-700 shadow-lg">
       MÁS INFORMACIÓN
      </button>
      </div>

    </div>
  );
};

export default InviteFriends;