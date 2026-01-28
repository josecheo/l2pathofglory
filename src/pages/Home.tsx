import { useNavigate } from "react-router";
import Header from "../components/Header";
import SocialFloating from "../components/SocialFloating";
import VoteFloting from "../components/VoteFloting";
import HeroSlider from "../components/HeroSlider";
import BackToTop from "../components/BackToTop";
import LastUpdate from "../components/LastUpdate/LastUpdates";
import ServerInfo from "../components/Sections/ServerInfo";
import InviteFriends from "../components/Sections/InviteFriends";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 h-screen max-h-screen overflow-hidden">
        <HeroSlider
          slides={[
            { src: "/NWeg5L.jpg", alt: "Background 1" },
            { src: "/friendInvite.webp", alt: "Background 2" },
            { src: "/new.jpg", alt: "Background 3" },
          ]}
        />
        {/* opcional: overlay para legibilidad */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <SocialFloating />
      <VoteFloting />

      <main className="relative z-10 flex flex-col">
        {/* HERO */}
        <section className="min-h-screen flex flex-col">
          <Header />

          <div className="flex flex-1 items-center">
            <div className="container mx-auto w-full px-4 sm:px-8 lg:px-24">
              <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
                <img
                  src="/logo_pro.webp"
                  alt="pathofglorylogo"
                  className="h-auto w-[clamp(220px,55vw,520px)] drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
                />

                <div className="mt-6 max-w-3xl">
                  <p className="text-base leading-relaxed text-gray-200 sm:text-lg lg:text-xl">
                    Sé el primero en reclamar los secretos de la Ciudadela
                    Abisal.{" "}
                    <strong>
                      ¿Tienes el valor para recorrer el camino de la gloria?
                    </strong>
                    <br className="hidden sm:block" />
                    Tu historia en Aden comienza ahora.
                  </p>
                </div>

                <div className="mt-8 flex w-full flex-col items-stretch gap-4 sm:mt-10 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
                  <button
                    onClick={() => navigate("/register")}
                    className="w-full rounded-lg border border-amber-500 bg-gradient-to-r from-yellow-600 to-amber-700 px-6 py-4 text-lg font-bold text-white shadow-2xl shadow-yellow-900/50 transition-all duration-300 hover:from-yellow-500 hover:to-amber-600 sm:w-auto sm:px-10 sm:text-xl"
                  >
                    CREAR CUENTA
                  </button>

                  <button
                    onClick={() => navigate("/downloads")}
                    className="w-full rounded-lg border border-gray-700 bg-gradient-to-r from-gray-800/80 to-gray-900/80 px-6 py-4 text-lg font-bold text-white transition-all duration-300 hover:from-gray-700/80 hover:to-gray-800/80 sm:w-auto sm:px-10 sm:text-xl"
                  >
                    DESCARGAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BackToTop />
        <LastUpdate />
        <ServerInfo />
        <InviteFriends />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
