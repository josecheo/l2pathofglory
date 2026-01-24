import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePublicMetrics } from "../hooks/usePublicMetrics";
import { useAuth } from "../hooks/useAuth";

type MenuAction = "news" | "server" | "community" | "support" | "shop";

type MenuItem = {
  label: string;
  action: MenuAction;
  path?: string;
  sectionId?: string;
};

const Header = () => {
  const { data, loading } = usePublicMetrics();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<MenuAction | null>(null);

  // épico: cambia estilo al scrollear + hide/show
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement | null>(null);

  const menuItems: MenuItem[] = useMemo(
    () => [
      { label: "Noticias", action: "news", sectionId: "last-updates", path: "/" },
      { label: "Servidor", action: "server", sectionId: "server-info", path: "/" },
      { label: "Comunidad", action: "community", sectionId: "community", path: "/" },
      { label: "Soporte", action: "support", path: "/support" },
      { label: "Tienda", action: "shop", path: "/shop" },
    ],
    [],
  );

  useEffect(() => {
    const onScrollTopReset = () => {
      if (location.pathname === "/" && window.scrollY < 60) {
        setActiveAction(null);
      }
    };

    onScrollTopReset();
    window.addEventListener("scroll", onScrollTopReset, { passive: true });
    return () => window.removeEventListener("scroll", onScrollTopReset);
  }, [location.pathname]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleMenuClick = (item: MenuItem) => {
    setMobileOpen(false);

    // Scroll a sección (Home)
    if (item.sectionId) {
      if (location.pathname === "/" || !item.path) {
        scrollToId(item.sectionId);
        return;
      }

      navigate(item.path);
      window.setTimeout(() => scrollToId(item.sectionId!), 90);
      return;
    }

    // Navegación normal
    if (item.path) navigate(item.path);
  };

  // Cerrar menú mobile al cambiar de ruta
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Cerrar mobile con ESC + click afuera
  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    const onClickOutside = (e: MouseEvent) => {
      const headerEl = headerRef.current;
      if (!headerEl) return;
      if (!headerEl.contains(e.target as Node)) setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [mobileOpen]);

  // ÉPICO: hide on scroll down / show on scroll up + background on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      // fondo sólido al bajar un poquito
      setScrolled(y > 40);

      // hide/show (con tolerancia)
      const prev = lastScrollY.current;
      const delta = y - prev;

      // no esconder cerca del top
      if (y < 80) {
        setHidden(false);
        lastScrollY.current = y;
        return;
      }

      // si baja rápido -> esconder, si sube -> mostrar
      if (delta > 12) setHidden(true);
      if (delta < -10) setHidden(false);

      lastScrollY.current = y;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active state por scroll: observa secciones SOLO en Home
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveAction(null);
      return;
    }

    const sections: Array<{ id: string; action: MenuAction }> = [
      { id: "last-updates", action: "news" },
      { id: "server-info", action: "server" },
      { id: "community", action: "community" },
    ];

    const els = sections
      .map((s) => ({ ...s, el: document.getElementById(s.id) }))
      .filter((s) => Boolean(s.el)) as Array<{
      id: string;
      action: MenuAction;
      el: HTMLElement;
    }>;

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!visible) return;

        const found = els.find((x) => x.el === visible.target);
        if (found) setActiveAction(found.action);
      },
      {
        root: null,
        rootMargin: "-120px 0px -55% 0px",
        threshold: [0.15, 0.25, 0.35, 0.5, 0.7],
      },
    );

    els.forEach((s) => observer.observe(s.el));
    return () => observer.disconnect();
  }, [location.pathname]);

  const navButtonClass = (isActive: boolean) =>
    [
      "text-base lg:text-xl font-medium transition-colors duration-300",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
      "whitespace-nowrap",
      isActive ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400",
    ].join(" ");

  const headerClass = [
    "fixed left-1/2 -translate-x-1/2 z-50",
    "top-2 sm:top-4",
    "w-[94%] sm:w-[90%] max-w-6xl",
    "rounded-lg border border-gray-800/50",
    "transition-all duration-300 ease-out",
    "backdrop-blur",
    scrolled
      ? "bg-gray-900/95 shadow-2xl shadow-black/40"
      : "bg-gray-900/65 shadow-lg shadow-black/20",
    hidden ? "-translate-y-24 opacity-0 pointer-events-none" : "translate-y-0 opacity-100",
  ].join(" ");

  return (
    <header
      ref={(el) => {
        headerRef.current = el;
      }}
      className={headerClass}
    >
      {/* Row principal: en mobile => Burger | Metrics (center) | Button */}
      <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-4">
        {/* 1) Burger (solo mobile) */}
        <div className="order-1 md:hidden shrink-0">
          <button
            type="button"
            className="h-10 w-10 grid place-items-center rounded-md border border-gray-700 text-gray-200 hover:text-white hover:border-gray-600 transition
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="text-xl leading-none">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* 2) Métricas (center en mobile, left en desktop) */}
        <div className="order-2 md:order-1 flex-1 md:flex-none min-w-0 text-center md:text-left">
          {loading ? (
            <div className="flex justify-center md:justify-start">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-zinc-300 border-t-transparent" />
            </div>
          ) : (
            <>
              {/* Mobile */}
              <div className="flex md:hidden items-center justify-center gap-4 text-xs font-semibold text-white">
                <span className="whitespace-nowrap">
                  Acc: <span className="text-amber-400">{data?.totalAccounts ?? 0}</span>
                </span>
                <span className="whitespace-nowrap">
                  On: <span className="text-green-400">{data?.onlinePlayers ?? 0}</span>
                </span>
              </div>

              {/* Desktop */}
              <div className="hidden md:flex flex-col">
                <span className="text-sm text-white font-semibold">
                  Accounts:
                  <span className="ml-2 text-sm text-amber-400">{data?.totalAccounts ?? 0}</span>
                </span>
                <span className="text-sm text-white font-semibold">
                  Player Online:
                  <span className="ml-2 text-sm text-green-400">{data?.onlinePlayers ?? 0}</span>
                </span>
              </div>
            </>
          )}
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex order-2 items-center gap-6 lg:gap-8">
          {menuItems.map((item) => {
            const isActive = activeAction === item.action;
            return (
              <button
                key={item.action}
                type="button"
                onClick={() => handleMenuClick(item)}
                className={navButtonClass(isActive)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* 3) Botón (derecha) */}
        <div className="order-3 flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate(isAuthenticated ? "/account" : "/login")}
            className="h-10 px-3 sm:px-5 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600
                       text-white text-sm sm:text-base font-bold rounded-md transition-all duration-300 border border-gray-700 shadow-lg whitespace-nowrap"
          >
            {isAuthenticated ? "MI CUENTA" : "INICIAR SESIÓN"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden px-3 pb-3">
          <div className="w-full bg-gray-900/95 backdrop-blur border border-gray-800/60 rounded-md shadow-xl overflow-hidden">
            <div className="flex flex-col">
              {menuItems.map((item) => {
                const isActive = activeAction === item.action;
                return (
                  <button
                    key={item.action}
                    type="button"
                    onClick={() => handleMenuClick(item)}
                    className={[
                      "text-left px-4 py-4 text-base transition",
                      isActive
                        ? "bg-gray-800/60 text-yellow-400"
                        : "text-gray-200 hover:bg-gray-800/40",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
