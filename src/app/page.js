export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/coming-soon-bg.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold">
          Terrenos en El Salvador
        </h1>
        <p className="text-lg md:text-xl mt-4">
          Próximamente: Compra terrenos a buen precio
        </p>

        {/* Countdown Timer Placeholder (optional) */}
        <div className="mt-6 text-2xl font-semibold">
          <span>🚧 Sitio en construcción...</span>
        </div>

        {/* Notify Me Button */}
        <a
          href="mailto:info@terrenosenelsalvador.com"
          className="mt-8 inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg transition"
        >
          Notificarme
        </a>
      </div>
    </main>
  );
}
