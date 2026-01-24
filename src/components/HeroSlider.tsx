import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  src: string;
  alt: string;
};

type HeroSliderProps = {
  slides: Slide[];
  intervalMs?: number;
  className?: string; // por si quieres controlar z/position
};

export default function HeroSlider({
  slides,
  intervalMs = 6000,
  className = "",
}: HeroSliderProps) {
  const safeSlides = useMemo(() => slides.filter(Boolean), [slides]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  const goTo = (i: number) => {
    const len = safeSlides.length;
    if (!len) return;
    setIndex(((i % len) + len) % len);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    if (isPaused) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeSlides.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [safeSlides.length, intervalMs, isPaused]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setIsPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    const dx = touchDeltaX.current;
    touchStartX.current = null;

    // umbral swipe
    if (Math.abs(dx) > 45) {
      if (dx < 0) next();
      else prev();
    }

    // reanuda
    window.setTimeout(() => setIsPaused(false), 1200);
  };

  if (!safeSlides.length) return null;

  return (
    <div
      className={`relative w-full h-full max-h-screen ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Hero slider"
    >
      {/* Slides (crossfade) */}
      <div className="absolute inset-0">
        {safeSlides.map((s, i) => (
          <img
            key={s.src + i}
            src={s.src}
            alt={s.alt}
            className={[
              "absolute inset-0 w-full h-full object-cover",
              "transition-opacity duration-1000 ease-in-out",
              i === index ? "opacity-100" : "opacity-0",
            ].join(" ")}
            draggable={false}
            loading={i === index ? "eager" : "lazy"}
          />
        ))}
      </div>
    </div>
  );
}
