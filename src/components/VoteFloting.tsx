type VoteButtonProps = {
  href: string;
  children: React.ReactNode;
};

const VoteFloting = () => {
  return (
    <div
      className="
        fixed z-50
        flex gap-3

        /* Mobile → abajo, pero más arriba que Social */
        bottom-20 left-1/2 -translate-x-1/2 flex-row

        /* Desktop → izquierda centrado */
        md:top-1/2 md:left-4 md:bottom-auto md:right-auto
        md:-translate-y-1/2 md:translate-x-0
        md:flex-col
      "
    >
      <VoteButton href="https://l2top.co/vote/server/Pathofglory">
        <img
          src="https://l2top.co/img/banners/l2topco_mini2.png"
          alt="Vote L2Top"
          className="w-6 h-6"
        />
      </VoteButton>

      <VoteButton href="https://l2.hopzone.net/site/vote/107131/1">
        <img src="/imagevote.png" alt="HopZone" className="w-6 h-6" />
      </VoteButton>

      <VoteButton href="https://l2network.eu/index.php?a=in&u=wodotaken">
        <img
          src="https://l2network.eu/images/tlsidebanner.png"
          alt="L2Network"
          className="w-6 h-6"
        />
      </VoteButton>

      <VoteButton href="https://top.l2jbrasil.com/index.php?a=in&u=wodotagagex">
        <img
          src="https://top.l2jbrasil.com/button_new.php?u=wodotagagex"
          alt="L2JBrasil"
          className="w-6 h-6"
        />
      </VoteButton>
    </div>
  );
};


const VoteButton = ({ href, children }: VoteButtonProps) => (
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
    {children}
  </a>
);

export default VoteFloting;
