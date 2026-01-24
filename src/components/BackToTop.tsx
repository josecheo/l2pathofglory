import { useEffect, useState } from "react";

type BackToTopProps = {
  showAfterPx?: number;
};

export default function BackToTop({ showAfterPx = 500 }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > showAfterPx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterPx]);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Volver arriba"
      className={[
        "fixed bottom-6 right-6 z-[60]",
        "rounded-full border border-white/10 backdrop-blur",
        "bg-black/35 hover:bg-black/55",
        "shadow-2xl shadow-black/40",
        "w-12 h-12 flex items-center justify-center",
        "transition-all duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none",
      ].join(" ")}
    >
      <span className="text-white text-2xl leading-none select-none">↑</span>
    </button>
  );
}
