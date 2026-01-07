import Footer from '../components/Footer';
import Header from '../components/Header';
import LastUpdate from '../components/LastUpdate/LastUpdates';
import InviteFriends from '../components/Sections/InviteFriends';
import News from '../components/Sections/News';
import ServerInfo from '../components/Sections/ServerInfo';
import SocialFloating from '../components/SocialFloating';

import videoL2 from '/l2videointerlude.mp4';

const Home = () => {


  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 font-sans">
      <SocialFloating />
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="relative w-full h-screen overflow-hidden">

          <video
            src={videoL2}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", height: "auto", objectFit: "cover", marginTop: "-60px" }}
          />

          <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 transition-opacity duration-1000 opacity-100`}></div>
        </div>


      </div>

      <main className="relative z-10 w-full  min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col justify-center px-24 mb-24">

          <p>
            <a href="https://l2top.co/vote/server/Pathofglory" target="_blank">
              <img src="https://l2top.co/img/banners/l2topco_mini2.png" alt="Vote for Pathofglory in L2Top.CO" />
            </a>
          </p>

          <div className="w-[600px] flex flex-col items-center text-center mb-20">
            <img src="/l2logo.png" alt="pathofglorylogo" className="h-[250px] w-auto" />
            <div className="max-w-3xl text-center mb-12">
              <p className="text-xl text-gray-200 leading-relaxed">
                Sé el primero en reclamar los secretos de la Ciudadela Abisal. <strong>¿Tienes el valor para recorrer el camino de la gloria? </strong><br />Tu historia en Aden comienza ahora.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-16">
              <button className="px-10 py-4 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 text-white font-bold text-xl rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-yellow-900/50 border border-amber-500">
                CREAR CUENTA
              </button>
              <button onClick={() => window.open("https://drive.usercontent.google.com/download?id=1rmdjA0cp0HRdChp8CI3W1wYr_gvoqYCQ&export=download", "_blank")} className="px-10 py-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 text-white font-bold text-xl rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-700" > DESCARGAR </button>
            </div>
          </div>
          <LastUpdate />
        </div>

        <ServerInfo />
        <News />
        <InviteFriends />

        <Footer />
      </main>

    </div>
  );
};

export default Home;