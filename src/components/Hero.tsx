export default function Hero() {
  return (
    <section className="relative bg-lineage bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="font-serif text-4xl sm:text-5xl text-lineageGold">Lineage II Interlude</h1>
        <p className="mt-4 max-w-2xl text-gray-200">
          Vive la nostalgia con calidad moderna. Rates balanceados, eventos únicos y comunidad activa.
        </p>
        <div className="mt-8 flex gap-4">
          <a href="/download" className="px-6 py-3 bg-lineageGold text-black rounded-md hover:opacity-90">Descargar Cliente</a>
          <a href="/register" className="px-6 py-3 border border-lineageGold text-lineageGold rounded-md hover:bg-lineageGold hover:text-black">
            Crear Cuenta
          </a>
        </div>
      </div>
    </section>
  );
}
