// SocialFloating.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faFacebook, faInstagram, faYoutube, faTelegram } from '@fortawesome/free-brands-svg-icons';

const SocialFloating = () => {
  return (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-3 z-50">
      <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faDiscord} className="text-white text-xl" />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faFacebook} className="text-white  text-xl" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faInstagram} className="text-white text-xl" />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faYoutube} className="text-white text-xl" />
      </a>
      <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faTelegram} className="text-white text-xl" />
      </a>
    </div>
  );
};

export default SocialFloating;
