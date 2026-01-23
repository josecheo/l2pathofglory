// SocialFloating.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faFacebook, faInstagram, faYoutube, faTelegram, faTiktok } from '@fortawesome/free-brands-svg-icons';

const SocialFloating = () => {
  return (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-3 z-50">
      
      <a href="https://discord.gg/nKfe5j77" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faDiscord} className="text-white text-xl" />
      </a>
      <a href="https://www.facebook.com/share/1BUhyCGtmn/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faFacebook} className="text-white  text-xl" />
      </a>

      <a href="https://www.youtube.com/@l2pathofglory?si=k1DJjT7nqQ8hROHw" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faYoutube} className="text-white text-xl" />
      </a>

      <a href="https://www.tiktok.com/@l2.path.of.glory" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faTiktok} className="text-white text-xl" />
      </a>

    </div>
  );
};

export default SocialFloating;
