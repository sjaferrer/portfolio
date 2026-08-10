"use client";

import { useEffect, useRef, useState } from "react";

type Module = "home" | "about" | "experience" | "projects" | "skills";

type HeaderProps = {
  activeModule?: string;
  onMenuClick?: () => void;
  onNavigate?: (module: Module, query?: string) => void;
};

const searchableModules: {
  id: Module;
  label: string;
  description: string;
  keywords: string[];
}[] = [
  {
    id: "home",
    label: "Home",
    description: "Introduction",
    keywords: [
      "home",
      "introduction",
      "stephen",
      "software developer",
      "system analyst",
      "programmer",
      "enterprise applications",
      "erp",
      "hris",
      "davao",
      "philippines",
    ],
  },
  {
    id: "about",
    label: "About",
    description: "Professional profile",
    keywords: [
      "about",
      "profile",
      "software developer",
      "system analyst",
      "programmer",
      "enterprise applications",
      "erp",
      "hris",
      "database",
      "business process automation",
      "workflow automation",
      "reporting",
      "analytics",
      "dashboard",
      "access control",
      "audit logging",
    ],
  },
  {
    id: "experience",
    label: "Experience",
    description: "Work history",
    keywords: [
      "experience",
      "software developer",
      "system analyst",
      "programmer",
      "supervisor",
      "millennium specialty coco products",
      "lapanday foods corporation",
      "erp",
      "hris",
      "procure-to-pay",
      "p2p",
      "inventory",
      "asset management",
      "employee records",
      "attendance",
      "timekeeping",
      "leave management",
      "travel orders",
      "recruitment",
      "applicant tracking",
      "ssrs",
      "reporting",
      "analytics",
      "database",
      "workflow",
      "access control",
      "audit logging",
      "sdcl",
      "system optimization",
    ],
  },
  {
    id: "projects",
    label: "Projects",
    description: "Selected work",
    keywords: [
      "projects",
      "erp",
      "enterprise resource planning",
      "procure-to-pay",
      "p2p",
      "inventory",
      "warehouse",
      "asset management",
      "asset",
      "dashboard",
      "hris",
      "human resource",
      "employee",
      "attendance",
      "leave",
      "recruitment",
      "applicant tracking",
      "travel",
      "scheduling",
      "reporting",
      "analytics",
      "workflow",
      "automation",
      "centralized data",
    ],
  },
  {
    id: "skills",
    label: "Skills",
    description: "Technologies & expertise",
    keywords: [
      "skills",
      "technologies",
      "c#",
      ".net",
      ".net core",
      "asp.net",
      "asp.net core",
      "sql server",
      "javascript",
      "typescript",
      "html",
      "css",
      "next.js",
      "node.js",
      "tailwind css",
      "bootstrap",
      "jquery",
      "rest api",
      "rest apis",
      "ssrs",
      "reporting",
      "database design",
      "database architecture",
      "erp",
      "hris",
      "system analysis",
      "enterprise applications",
      "workflow automation",
      "dashboard development",
      "git",
      "github",
      "visual studio",
      "vs code",
    ],
  },
];

export default function Header({
  activeModule = "Home",
  onMenuClick,
  onNavigate,
}: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Separate refs for desktop and mobile inputs
  const desktopSearchInputRef = useRef<HTMLInputElement | null>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement | null>(null);

  const normalizedQuery = query.trim().toLowerCase();

  const results = normalizedQuery
    ? searchableModules.filter((module) => {
        const searchableText = [
          module.label,
          module.description,
          ...module.keywords,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
    : [];

  /* ============================================================
     KEYBOARD SHORTCUT
  ============================================================ */

  useEffect(() => {
    function handleKeyboard(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        const isDesktop = window.matchMedia("(min-width: 768px)").matches;

        if (isDesktop) {
          desktopSearchInputRef.current?.focus();
        } else {
          setSearchOpen(true);
        }
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setQuery("");

        desktopSearchInputRef.current?.blur();
        mobileSearchInputRef.current?.blur();
      }
    }

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  /* ============================================================
     MOBILE SEARCH AUTO FOCUS
  ============================================================ */

  useEffect(() => {
    if (!searchOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      mobileSearchInputRef.current?.focus();
    }, 100);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  function openSearch() {
    setSearchOpen(true);
  }

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");

    mobileSearchInputRef.current?.blur();
    desktopSearchInputRef.current?.blur();
  }

  function navigateTo(module: Module) {
    const searchTerm = query.trim();

    onNavigate?.(module, searchTerm);

    closeSearch();
  }

  function handleSearchSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (results.length > 0) {
      navigateTo(results[0].id);
    }
  }

  return (
    <header
      className="
        fixed
        top-0
        right-0
        left-0
        lg:left-72
        z-40

        h-16

        bg-white

        border-b
        border-[#e5e5e5]
      "
    >
      <div
        className="
          h-full

          px-4
          sm:px-8
          lg:px-10
          xl:px-12

          flex
          items-center
          gap-2
          sm:gap-4
        "
      >
        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        {!searchOpen && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="
              lg:hidden

              shrink-0

              w-10
              h-10

              flex
              items-center
              justify-center

              text-[#737373]

              hover:text-[#171717]

              active:scale-95

              transition
            "
          >
            <MenuIcon />
          </button>
        )}

        {/* =====================================================
            CURRENT PAGE
        ===================================================== */}

        {!searchOpen && (
          <div className="min-w-0 flex-1 lg:flex-none">
            <div
              className="
                text-sm
                font-semibold
                text-[#171717]
                truncate
              "
            >
              {activeModule}
            </div>

            <div
              className="
                hidden
                sm:block

                mt-0.5

                text-[10px]
                uppercase
                tracking-[0.16em]

                text-[#a3a3a3]
              "
            >
              Stephen J. / Portfolio
            </div>
          </div>
        )}

        {/* =====================================================
            DESKTOP SEARCH
        ===================================================== */}

        <div
          className="
            hidden
            md:block

            relative

            ml-auto

            w-full
            max-w-md
          "
        >
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <SearchIcon />

            <input
              ref={desktopSearchInputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search portfolio..."
              aria-label="Search portfolio"
              autoComplete="off"
              className="
                w-full

                h-9

                pl-9
                pr-12

                bg-[#fafafa]

                border
                border-[#e5e5e5]

                rounded-none

                text-sm
                text-[#262626]

                placeholder:text-[#a3a3a3]

                focus:outline-none
                focus:border-[#bdbdbd]

                transition-colors
              "
            />

            {!query && (
              <span
                className="
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2

                  hidden
                  lg:flex

                  items-center
                  justify-center

                  h-5
                  px-1.5

                  border
                  border-[#e5e5e5]

                  text-[9px]
                  text-[#a3a3a3]
                "
              >
                ⌘ K
              </span>
            )}

            {/* Desktop results */}

            {query.trim() && (
              <SearchResults
                results={results}
                onNavigate={navigateTo}
                desktop
              />
            )}
          </form>
        </div>

        {/* =====================================================
            MOBILE SEARCH BUTTON
        ===================================================== */}

        {!searchOpen && (
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search"
              className="
                w-10
                h-10

                flex
                items-center
                justify-center

                text-[#737373]

                hover:text-[#171717]

                active:scale-95

                transition
              "
            >
              <SearchIconInline />
            </button>
          </div>
        )}
      </div>

      {/* =======================================================
          MOBILE SEARCH OVERLAY

          This is completely separate from desktop search.
      ======================================================= */}

      {searchOpen && (
        <div
          className="
            fixed
            inset-0
            z-[60]

            bg-white

            flex
            flex-col

            md:hidden
          "
        >
          {/* Mobile search header */}

          <div
            className="
              h-16
              shrink-0

              px-4

              flex
              items-center
              gap-3

              border-b
              border-[#e5e5e5]

              bg-white
            "
          >
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <SearchIcon />

              <input
                ref={mobileSearchInputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search portfolio..."
                aria-label="Search portfolio"
                autoComplete="off"
                autoFocus
                className="
                  w-full

                  h-10

                  pl-10
                  pr-3

                  bg-[#fafafa]

                  border
                  border-[#e5e5e5]

                  rounded-none

                  text-sm
                  text-[#262626]

                  placeholder:text-[#a3a3a3]

                  focus:outline-none
                  focus:border-[#bdbdbd]
                "
              />
            </form>

            <button
              type="button"
              onClick={closeSearch}
              aria-label="Close search"
              className="
                shrink-0

                w-10
                h-10

                flex
                items-center
                justify-center

                text-xl
                leading-none

                text-[#737373]

                hover:text-[#171717]

                active:scale-95

                transition
              "
            >
              ×
            </button>
          </div>

          {/* Mobile results */}

          {query.trim() && (
            <SearchResults results={results} onNavigate={navigateTo} />
          )}
        </div>
      )}
    </header>
  );
}

/* ============================================================
   SEARCH RESULTS
============================================================ */

function SearchResults({
  results,
  onNavigate,
  desktop = false,
}: {
  results: {
    id: Module;
    label: string;
    description: string;
    keywords: string[];
  }[];
  onNavigate: (module: Module) => void;
  desktop?: boolean;
}) {
  return (
    <div
      className={`
        bg-white

        ${
          desktop
            ? `
              absolute
              top-full
              left-0
              right-0
              mt-2

              border
              border-[#e5e5e5]

              shadow-[0_8px_24px_rgba(0,0,0,0.06)]

              z-50
            `
            : `
              flex-1
              overflow-y-auto
            `
        }
      `}
    >
      {results.length > 0 ? (
        <div className="py-2">
          <div
            className="
              px-5
              md:px-4
              py-3

              text-[10px]
              uppercase
              tracking-[0.16em]

              text-[#a3a3a3]
            "
          >
            Results
          </div>

          {results.map((result) => (
            <button
              key={result.id}
              type="button"
              onClick={() => onNavigate(result.id)}
              className="
                w-full

                flex
                items-center
                justify-between

                px-5
                md:px-4

                py-4
                md:py-3

                text-left

                border-b
                md:border-b-0

                border-[#f0f0f0]

                hover:bg-[#fafafa]

                active:bg-[#f5f5f5]

                transition-colors
              "
            >
              <div className="min-w-0">
                <div
                  className="
                    text-sm
                    font-medium
                    text-[#171717]
                  "
                >
                  {result.label}
                </div>

                <div
                  className="
                    mt-1

                    text-xs

                    text-[#a3a3a3]

                    truncate
                  "
                >
                  {result.description}
                </div>
              </div>

              <span
                className="
                  ml-4
                  shrink-0

                  text-[#a3a3a3]
                  text-base
                "
              >
                →
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="px-5 py-8 md:px-4 md:py-5">
          <div
            className="
              text-sm
              font-medium
              text-[#404040]
            "
          >
            No results found
          </div>

          <div
            className="
              mt-2

              text-xs
              leading-relaxed

              text-[#a3a3a3]
            "
          >
            Try projects, skills, experience, HRIS, JavaScript, or about.
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   MENU ICON
============================================================ */

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

/* ============================================================
   SEARCH ICON
============================================================ */

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="
        absolute
        left-3
        top-1/2
        -translate-y-1/2

        w-4
        h-4

        text-[#a3a3a3]

        pointer-events-none
      "
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
      />
    </svg>
  );
}

/* ============================================================
   INLINE SEARCH ICON
============================================================ */

function SearchIconInline() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
      />
    </svg>
  );
}
