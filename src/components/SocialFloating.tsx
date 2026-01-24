// SocialFloating.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faFacebook,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

interface SocialButtonProps {
  href: string;
  icon: any;
}

const SocialFloating = () => {
  return (
    <div
      className="
        fixed z-50
        flex gap-3

        /* Mobile */
        bottom-4 left-1/2 -translate-x-1/2 flex-row

        /* Desktop */
        md:top-1/2 md:right-4 md:bottom-auto md:left-auto
        md:-translate-y-1/2 md:translate-x-0
        md:flex-col
      "
    >
      <SocialButton href="https://discord.gg/nKfe5j77" icon={faDiscord} />
      <SocialButton
        href="https://www.facebook.com/share/1BUhyCGtmn/?mibextid=wwXIfr"
        icon={faFacebook}
      />
      <SocialButton
        href="https://www.youtube.com/@l2pathofglory?si=k1DJjT7nqQ8hROHw"
        icon={faYoutube}
      />
      <SocialButton
        href="https://www.tiktok.com/@l2.path.of.glory"
        icon={faTiktok}
      />
    </div>
  );
};

const SocialButton = ({ href, icon }: SocialButtonProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="
      w-10 h-10
      rounded-full
      flex items-center justify-center
      bg-gradient-to-r from-yellow-600 to-amber-700
      hover:from-yellow-500 hover:to-amber-600
    "
  >
    <FontAwesomeIcon icon={icon} className="text-white text-xl" />
  </a>
);

export default SocialFloating;
