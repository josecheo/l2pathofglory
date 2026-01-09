// SocialFloating.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faFacebook, faInstagram, faYoutube, faTelegram } from '@fortawesome/free-brands-svg-icons';

const VoteFloting = () => {
  return (
    <div className="fixed top-1/2 left-4 transform -translate-y-1/2 flex flex-col gap-3 z-50">
      <a href="https://l2top.co/vote/server/Pathofglory" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 rounded-full flex items-center justify-center">
        <img src="https://l2top.co/img/banners/l2topco_mini2.png" alt="Vote for Pathofglory in L2Top.CO" />
      </a>
      <a href="https://l2.hopzone.net/site/vote/107131/1" target="_blank">
        <img src="imagevote.png" alt="Vot" className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 rounded-full flex items-center justify-center"
        />
      </a>
      <a href="https://l2network.eu/index.php?a=in&u=wodotaken" target="_blank">
        <img src="https://l2network.eu/images/tlsidebanner.png" alt="Vot" className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 rounded-full flex items-center justify-center"
        />
      </a>
       <a href="https://top.l2jbrasil.com/index.php?a=in&u=wodotagagex" target="_blank">
        <img src="https://top.l2jbrasil.com/button_new.php?u=wodotagagex" alt="Vot" className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 rounded-full flex items-center justify-center"
        />
      </a>
    </div>
  );
};

export default VoteFloting;
