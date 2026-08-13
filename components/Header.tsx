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

  /*
   * IMPORTANT:
   *
   * Always start with false.
   *
   * This makes the server-rendered HTML and the first
   * client-rendered HTML identical.
   *
   * The theme script in layout.tsx has already applied
   * .dark to <html> before the page paints.
   */
  const [darkMode, setDarkMode] = useState(false);

  /*
   * Prevent multiple theme transitions from running
   * at the same time.
   */
  const themeTransitionRunning = useRef(false);

  /* ============================================================
     THEME SYNCHRONIZATION
     ------------------------------------------------------------
     The layout theme script runs before paint.
     Here we synchronize React state with <html class="dark">
     after hydration.

     useLayoutEffect is intentional here because it runs before
     the browser paints the updated React state.
  ============================================================ */

  useLayoutEffect(() => {
    const root = document.documentElement;

    const isDark = root.classList.contains("dark");

    setDarkMode(isDark);

    /*
     * Keep the browser's native UI in sync too.
     */
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
        setScrolled(window.scrollY > 12);
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
    /*
     * Don't allow overlapping theme transitions.
     */
    if (themeTransitionRunning.current) {
      return;
    }

    themeTransitionRunning.current = true;

    const root = document.documentElement;

    const nextDarkMode = !darkMode;

    /* ========================================================
       FIND TOGGLE CENTER
    ======================================================== */

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    /* ========================================================
       CALCULATE VIEWPORT RADIUS
    ======================================================== */

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    /* ========================================================
       CSS VARIABLES
    ======================================================== */

    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-radius", `${radius}px`);

    let themeChanged = false;

    /* ========================================================
       ACTUALLY CHANGE THE THEME
    ======================================================== */

    const changeTheme = () => {
      if (themeChanged) {
        return;
      }

      themeChanged = true;

      root.classList.toggle("dark", nextDarkMode);

      root.style.colorScheme = nextDarkMode ? "dark" : "light";

      localStorage.setItem("theme", nextDarkMode ? "dark" : "light");

      setDarkMode(nextDarkMode);
    };

    /* ========================================================
       REDUCED MOTION
    ======================================================== */

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* ========================================================
       VIEW TRANSITION API
    ======================================================== */

    const transitionDocument = document as ViewTransitionDocument;

    const startViewTransition = transitionDocument.startViewTransition;

    /*
     * Normal fallback.
     */
    if (!startViewTransition || prefersReducedMotion) {
      changeTheme();

      themeTransitionRunning.current = false;

      return;
    }

    try {
      const transition = startViewTransition.call(
        transitionDocument,
        changeTheme,
      );

      /*
       * If the transition completes normally.
       */
      transition.finished
        .catch(() => {
          /*
           * Make absolutely sure the theme changes even if
           * the browser aborts the animation.
           */
          changeTheme();
        })
        .finally(() => {
          themeTransitionRunning.current = false;
        });
    } catch {
      /*
       * Browser threw while starting View Transition.
       */
      changeTheme();

      themeTransitionRunning.current = false;
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
        "fixed inset-x-0 top-0 z-40",

        desktopSidebarCollapsed ? "lg:left-[88px]" : "lg:left-[300px]",

        "border-b",

        /*
         * Smooth sidebar/header movement.
         */
        "transition-[left,background-color,border-color,box-shadow]",
        "duration-500",
        "ease-[cubic-bezier(0.22,1,0.36,1)]",

        scrolled
          ? [
              "border-[#e3e3df] dark:border-[#2a2a2a]",
              "bg-[#fbfbfa]/95 dark:bg-[#111111]/95",
              "shadow-sm shadow-black/[0.025]",
              "dark:shadow-black/20",
              "backdrop-blur-xl",
            ].join(" ")
          : [
              "border-transparent",
              "bg-[#fbfbfa]/90 dark:bg-[#111111]/90",
              "backdrop-blur-md",
            ].join(" "),
      ].join(" ")}
    >
      <div
        className={[
          "flex w-full items-center justify-between",
          "px-4 sm:px-5 md:px-6 lg:px-8",
          "h-[64px] md:h-[68px] lg:h-[72px]",
        ].join(" ")}
      >
        {/* ==================================================
            LEFT
        ================================================== */}

        <div className="flex min-w-0 items-center gap-3">
          {/* ==================================================
              MOBILE / TABLET MENU
          ================================================== */}

          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            aria-controls="primary-navigation"
            className={[
              "flex h-10 w-10 shrink-0 cursor-pointer",
              "items-center justify-center rounded-xl",

              "border border-[#e2e2de]",
              "dark:border-[#2d2d2d]",

              "bg-white dark:bg-[#1b1b1b]",

              "text-[#40403d] dark:text-[#e5e5e5]",

              "transition-[background-color,border-color,transform]",
              "duration-300",
              "ease-[cubic-bezier(0.22,1,0.36,1)]",

              "hover:border-[#d5d5d1]",
              "dark:hover:border-[#3a3a3a]",

              "hover:bg-[#f1f1ee]",
              "dark:hover:bg-[#252525]",

              "active:scale-[0.96]",

              "focus:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-[#171717]/10",

              "md:h-10 md:w-10",
              "lg:hidden",
            ].join(" ")}
          >
            <MenuIcon />
          </button>

          {/* ==================================================
              CURRENT SECTION
          ================================================== */}

          <button
            type="button"
            onClick={() => handleNavigate(normalizedModule)}
            aria-label={`Current section: ${displayModule}`}
            className={[
              "group flex min-w-0 cursor-pointer flex-col",
              "rounded-lg px-1 py-1 text-left",

              "focus:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-[#171717]/10",
            ].join(" ")}
          >
            <span
              className={[
                "max-w-[180px] truncate",

                "text-[14px] font-bold leading-tight",
                "tracking-[-0.01em]",

                "text-[#171717] dark:text-[#f5f5f5]",

                "transition-[color,transform]",
                "duration-300",
                "ease-[cubic-bezier(0.22,1,0.36,1)]",

                "group-hover:text-[#40403d]",
                "dark:group-hover:text-white",

                "group-hover:translate-x-[1px]",

                "sm:max-w-[240px]",
                "sm:text-[15px]",
              ].join(" ")}
            >
              {displayModule}
            </span>

            <span
              className={[
                "mt-1 truncate",

                "text-[9px] font-semibold uppercase",
                "tracking-[0.16em]",

                "text-[#a0a09d] dark:text-[#777]",

                "transition-colors duration-300",

                "sm:text-[10px]",
              ].join(" ")}
            >
              Stephen J. / Portfolio
            </span>
          </button>
        </div>

        {/* ==================================================
            RIGHT — THEME TOGGLE
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
              "relative flex h-10 w-[72px] cursor-pointer",
              "items-center rounded-full",
              "border",

              "transition-[background-color,border-color,transform]",
              "duration-300",
              "ease-[cubic-bezier(0.22,1,0.36,1)]",

              "hover:scale-[1.02]",
              "active:scale-[0.97]",

              "focus:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-[#171717]/10",

              "md:h-11 md:w-[78px]",

              darkMode
                ? "border-[#333] bg-[#1c1c1c]"
                : "border-[#e2e2de] bg-white",
            ].join(" ")}
          >
            {/* ==================================================
                SUN ICON
            ================================================== */}

            <span
              className={[
                "absolute left-[9px]",

                "transition-all duration-300",
                "ease-[cubic-bezier(0.22,1,0.36,1)]",

                darkMode ? "scale-90 opacity-40" : "scale-100 opacity-100",
              ].join(" ")}
            >
              <SunIcon
                className={darkMode ? "text-[#888]" : "text-[#171717]"}
              />
            </span>

            {/* ==================================================
                MOON ICON
            ================================================== */}

            <span
              className={[
                "absolute right-[9px]",

                "transition-all duration-300",
                "ease-[cubic-bezier(0.22,1,0.36,1)]",

                darkMode ? "scale-100 opacity-100" : "scale-90 opacity-40",
              ].join(" ")}
            >
              <MoonIcon className={darkMode ? "text-white" : "text-[#888]"} />
            </span>

            {/* ==================================================
                SLIDING KNOB
            ================================================== */}

            <span
              className={[
                "absolute top-1/2",

                "flex h-8 w-8",
                "-translate-y-1/2",

                "items-center justify-center",
                "rounded-full",

                "shadow-sm",

                /*
                 * Smooth physical-style movement.
                 */
                "transition-[left,background-color,box-shadow]",
                "duration-500",
                "ease-[cubic-bezier(0.22,1,0.36,1)]",

                "md:h-9 md:w-9",

                darkMode
                  ? [
                      "left-[calc(100%-36px)]",
                      "bg-[#303030]",
                      "shadow-black/30",
                    ].join(" ")
                  : ["left-1", "bg-[#f1f1ee]", "shadow-black/5"].join(" "),
              ].join(" ")}
            >
              {darkMode ? (
                <MoonIcon className="text-white" />
              ) : (
                <SunIcon className="text-[#171717]" />
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
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
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
      className={`h-4 w-4 ${className}`}
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
      className={`h-4 w-4 ${className}`}
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
