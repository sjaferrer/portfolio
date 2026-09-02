"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

type Module = "home" | "about" | "experience" | "projects" | "skills";

type HeaderProps = {
  activeModule?: string;
  onMenuClick: () => void;
  onNavigate: (module: Module, query?: string) => void;
  desktopSidebarCollapsed: boolean;
};

/* ============================================================
   VIEW TRANSITION TYPES
============================================================ */

type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition: () => void;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (
    callback: () => void | Promise<void>,
  ) => ViewTransition;
};

export default function Header({
  activeModule = "Home",
  onMenuClick,
  onNavigate,
  desktopSidebarCollapsed,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const themeTransitionRunning = useRef(false);

  /* ============================================================
     THEME SYNCHRONIZATION
  ============================================================ */

  useLayoutEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");

    setDarkMode(isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  }, []);

  /* ============================================================
     SCROLL STATE
  ============================================================ */

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        ticking = false;
      });
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ============================================================
     THEME TRANSITION
  ============================================================ */

  function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
    if (themeTransitionRunning.current) return;

    themeTransitionRunning.current = true;

    const root = document.documentElement;
    const nextDarkMode = !darkMode;

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-radius", `${radius}px`);

    let themeChanged = false;

    const changeTheme = () => {
      if (themeChanged) return;

      themeChanged = true;

      root.classList.toggle("dark", nextDarkMode);
      root.style.colorScheme = nextDarkMode ? "dark" : "light";

      localStorage.setItem("theme", nextDarkMode ? "dark" : "light");

      setDarkMode(nextDarkMode);
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const transitionDocument = document as ViewTransitionDocument;

    const startViewTransition = transitionDocument.startViewTransition;

    if (!startViewTransition || prefersReducedMotion) {
      changeTheme();

      window.setTimeout(
        () => {
          themeTransitionRunning.current = false;
        },
        prefersReducedMotion ? 0 : 500,
      );

      return;
    }

    try {
      const transition = startViewTransition.call(
        transitionDocument,
        changeTheme,
      );

      transition.finished
        .catch(() => {
          changeTheme();
        })
        .finally(() => {
          window.setTimeout(() => {
            themeTransitionRunning.current = false;
          }, 150);
        });
    } catch {
      changeTheme();

      window.setTimeout(() => {
        themeTransitionRunning.current = false;
      }, 500);
    }
  }

  /* ============================================================
     NAVIGATION
  ============================================================ */

  const normalizedModule = String(activeModule || "home")
    .trim()
    .toLowerCase() as Module;

  const displayModule =
    normalizedModule.charAt(0).toUpperCase() + normalizedModule.slice(1);

  function handleNavigate(module: Module) {
    onNavigate(module);
  }

  /* ============================================================
     HEADER
  ============================================================ */

  return (
    <header
      className={[
        "fixed top-0 right-0 z-40",

        /*
         * MOBILE + TABLET
         * Sidebar is an overlay, so header occupies the
         * entire viewport.
         */
        "left-0",

        /*
         * DESKTOP
         * Sidebar becomes part of the page layout.
         */
        desktopSidebarCollapsed ? "lg:left-[88px]" : "lg:left-[224px]",

        /*
         * Must match sidebar header height.
         */
        "h-[72px]",

        "border-b",

        "transition-[left,background-color,border-color,box-shadow]",
        "duration-300",
        "ease-[cubic-bezier(0.22,1,0.36,1)]",

        scrolled
          ? [
              "border-[#e5e5e2]",
              "dark:border-[#292929]",

              "bg-[#fafaf8]/95",
              "dark:bg-[#151515]/95",

              "shadow-[0_8px_30px_rgba(0,0,0,0.035)]",
              "dark:shadow-[0_8px_30px_rgba(0,0,0,0.18)]",

              "backdrop-blur-xl",
            ].join(" ")
          : [
              "border-[#e5e5e2]",
              "dark:border-[#292929]",

              "bg-[#fafaf8]/90",
              "dark:bg-[#151515]/90",

              "backdrop-blur-md",
            ].join(" "),
      ].join(" ")}
    >
      <div
        className={[
          "flex h-full w-full items-center justify-between",

          /*
           * Responsive horizontal padding.
           *
           * Mobile: 16px
           * Small: 20px
           * Tablet: 24px
           * Desktop: 32px
           */
          "px-4 sm:px-5 md:px-6 lg:px-8",
        ].join(" ")}
      >
        {/* ==================================================
          LEFT
      ================================================== */}

        <div className="flex min-w-0 items-center">
          {/* ==================================================
            MOBILE / TABLET MENU
        ================================================== */}

          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            aria-controls="primary-navigation"
            className={[
              "group mr-3 flex h-9 w-9 shrink-0",
              "items-center justify-center",
              "rounded-lg",

              "border border-[#dfdfda]",
              "dark:border-[#2c2c2c]",

              "bg-white/80",
              "dark:bg-[#181818]/80",

              "text-[#343432]",
              "dark:text-[#ddddda]",

              "transition-all duration-300",
              "ease-[cubic-bezier(0.22,1,0.36,1)]",

              "hover:border-[#cfcfca]",
              "dark:hover:border-[#404040]",

              "hover:bg-white",
              "dark:hover:bg-[#202020]",

              "active:scale-95",

              "focus:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-[#171717]/10",
              "dark:focus-visible:ring-white/10",

              /*
               * Menu is needed while sidebar is an overlay.
               */
              "lg:hidden",
            ].join(" ")}
          >
            <MenuIcon />
          </button>

          <button
            type="button"
            onClick={() => handleNavigate(normalizedModule)}
            aria-label={`Current section: ${displayModule}`}
            className={[
              "group relative flex min-w-0 items-center",
              "rounded-lg",
              "text-left",

              "transition-colors duration-200",

              "focus:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-[#171717]",
              "dark:focus-visible:ring-white",
            ].join(" ")}
          >
            {/* ACTIVE INDICATOR — matches sidebar */}
            <span
              className={[
                "mr-3 h-4 w-0.5 shrink-0",
                "rounded-full",
                "bg-[#171717] dark:bg-white",

                "transition-transform duration-200",
                "group-hover:scale-y-125",
              ].join(" ")}
            />

            {/* CURRENT SECTION */}
            <span
              className={[
                "truncate",

                "font-sans",
                "text-[14px]",
                "font-bold",
                "leading-none",
                "tracking-[-0.015em]",

                "text-[#171717]",
                "dark:text-white",

                "transition-transform duration-200",
                "group-hover:translate-x-[2px]",

                "max-w-[130px]",
                "sm:max-w-[180px]",
                "md:max-w-[240px]",
                "lg:max-w-[280px]",
              ].join(" ")}
            >
              {displayModule}
            </span>
          </button>
        </div>

        {/* ==================================================
          RIGHT
      ================================================== */}

        <div className="flex shrink-0 items-center">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            aria-pressed={darkMode}
            className={[
              "relative flex",
              "h-[30px] w-[56px]",
              "sm:h-[32px] sm:w-[60px]",
              "items-center",
              "rounded-full",
              "border",

              "transition-all duration-500",
              "ease-[cubic-bezier(0.22,1,0.36,1)]",

              "hover:scale-[1.025]",
              "active:scale-[0.97]",

              "focus:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-[#171717]/10",
              "dark:focus-visible:ring-white/10",

              darkMode
                ? [
                    "border-[#343434]",
                    "bg-[#1b1b1b]",
                    "shadow-inner shadow-black/20",
                  ].join(" ")
                : [
                    "border-[#deded9]",
                    "bg-white",
                    "shadow-inner shadow-black/[0.025]",
                  ].join(" "),
            ].join(" ")}
          >
            {/* SUN */}
            <span
              className={[
                "absolute",
                "left-[7px]",
                "transition-all duration-300",
                darkMode ? "scale-75 opacity-30" : "scale-100 opacity-100",
              ].join(" ")}
            >
              <SunIcon
                className={darkMode ? "text-[#888]" : "text-[#292927]"}
              />
            </span>

            {/* MOON */}
            <span
              className={[
                "absolute",
                "right-[7px]",
                "transition-all duration-300",
                darkMode ? "scale-100 opacity-100" : "scale-75 opacity-30",
              ].join(" ")}
            >
              <MoonIcon
                className={darkMode ? "text-[#e9e9e6]" : "text-[#888]"}
              />
            </span>

            {/* KNOB */}
            <span
              className={[
                "absolute top-1/2",
                "-translate-y-1/2",

                "flex",
                "h-6 w-6",

                "items-center justify-center",
                "rounded-full",

                "transition-[left,background-color,box-shadow]",
                "duration-500",
                "ease-[cubic-bezier(0.22,1,0.36,1)]",

                darkMode
                  ? [
                      "left-[calc(100%-28px)]",
                      "sm:left-[calc(100%-28px)]",
                      "bg-[#303030]",
                      "shadow-[0_2px_6px_rgba(0,0,0,0.35)]",
                    ].join(" ")
                  : [
                      "left-[3px]",
                      "bg-[#f1f1ee]",
                      "shadow-[0_2px_6px_rgba(0,0,0,0.08)]",
                    ].join(" "),
              ].join(" ")}
            >
              {darkMode ? (
                <MoonIcon className="text-white" />
              ) : (
                <SunIcon className="text-[#222220]" />
              )}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   ICONS
============================================================ */

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path strokeLinecap="round" d="M4 7.5h16M4 12h16M4 16.5h16" />
    </svg>
  );
}

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={`h-[15px] w-[15px] ${className}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3.5" />

      <path
        strokeLinecap="round"
        d="
          M12 2.5v2
          M12 19.5v2
          M4.58 4.58l1.42 1.42
          M18 18l1.42 1.42
          M2.5 12h2
          M19.5 12h2
          M4.58 19.42L6 18
          M18 6l1.42-1.42
        "
      />
    </svg>
  );
}

function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={`h-[15px] w-[15px] ${className}`}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="
          M20 15.5
          A8.5 8.5 0 0 1 8.5 4
          A8.5 8.5 0 1 0 20 15.5Z
        "
      />
    </svg>
  );
}
//asddd
