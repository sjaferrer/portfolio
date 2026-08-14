"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Header from "@/components/Header";

type Module = "home" | "about" | "experience" | "projects" | "skills";

type Skill = {
  name: string;
  icon: string;
};
const modules: {
  id: Module;
  label: string;
  description: string;
  number: string;
  icon: string;
}[] = [
  {
    id: "home",
    label: "Home",
    description: "Introduction",
    number: "01",
    icon: "⌂",
  },
  {
    id: "about",
    label: "About",
    description: "Professional profile",
    number: "02",
    icon: "◎",
  },
  {
    id: "experience",
    label: "Experience",
    description: "Work history",
    number: "03",
    icon: "▣",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Selected work",
    number: "04",
    icon: "◫",
  },
  {
    id: "skills",
    label: "Skills",
    description: "Technologies & tools",
    number: "05",
    icon: "◆",
  },
];
const skills: Record<string, Skill[]> = {
  Languages: [
    { name: "C#", icon: "devicon-csharp-plain colored" },
    { name: "JavaScript", icon: "devicon-javascript-plain colored" },
    { name: "TypeScript", icon: "devicon-typescript-plain colored" },
    { name: "HTML", icon: "devicon-html5-plain colored" },
    { name: "CSS", icon: "devicon-css3-plain colored" },
  ],

  Frameworks: [
    { name: "ASP.NET", icon: "devicon-dot-net-plain-wordmark" },
    { name: "Next.js", icon: "devicon-nextjs-plain" },
    { name: "Node.js", icon: "devicon-nodejs-plain-wordmark colored" },
    { name: "Bootstrap", icon: "devicon-bootstrap-plain colored" },
    { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored" },
    { name: "jQuery", icon: "devicon-jquery-plain colored" },
  ],

  Database: [
    { name: "MS SQL Server", icon: "devicon-microsoftsqlserver-plain colored" },
  ],

  Tools: [
    { name: "Git", icon: "devicon-git-plain colored" },
    { name: "GitHub", icon: "devicon-github-original colored" },
    { name: "VS Code", icon: "devicon-vscode-plain colored" },
    { name: "Visual Studio", icon: "devicon-visualstudio-plain colored" },
    { name: "Postman", icon: "devicon-postman-plain colored" },
  ],
};
const focusAreas = [
  "Enterprise Application Development",
  "System Analysis",
  "Database Design",
  "ERP",
  "HRIS",
  "Business Process Automation",
  "Workflow Automation",
  "Reporting & Analytics",
  "Dashboard Development",
  "System Optimization",
];

const experiences = [
  {
    position: "System Analyst / Programmer, Supervisor",
    company: "Lapanday Foods Corporation",
    description:
      "Led HRIS development covering workforce administration, employee lifecycle, recruitment, and HR reporting while contributing to requirements analysis and system optimization.",
    responsibilities: [
      "Developed HRIS modules for employee records, PDS, attendance, travel, scheduling, and workforce management.",
      "Built applicant tracking, recruitment automation, kiosks, and recruitment dashboards.",
      "Designed centralized HR master data and database structures.",
      "Collaborated on requirements, process analysis, documentation, testing, and system optimization.",
    ],
    tags: [
      "HRIS",
      "Recruitment",
      "System Analysis",
      "Automation",
      "Dashboards",
    ],
  },
  {
    position: "Software Developer",
    company: "Millennium Specialty Coco Products, Inc.",
    description:
      "Developed and maintained ERP and HRIS solutions supporting procurement, inventory, assets, workforce management, reporting, and day-to-day business operations.",
    responsibilities: [
      "Developed ERP and HRIS modules for procurement, inventory, assets, attendance, leave, travel, and scheduling.",
      "Implemented access control, approval workflows, audit logging, and centralized master data.",
      "Built SSRS reports, dashboards, and analytics for business reporting and decision-making.",
      "Optimized backend logic, databases, and system configurations for performance and reliability.",
    ],
    tags: ["ERP", "HRIS", "SQL Server", "Reporting", "Automation"],
  },
];

const projects = [
  {
    number: "01",
    category: "ERP",
    title: "Enterprise Resource Planning",
    description:
      "Enterprise ERP solution designed to streamline procurement, inventory, asset management, approval workflows, and operational reporting through a centralized business platform.",
    modules: [
      "Procure-to-Pay",
      "Inventory Management",
      "Asset Management",
      "Approval Workflows",
      "User Access Management",
      "Audit Trail",
    ],
    highlights: [
      "Process Automation",
      "Real-Time Monitoring",
      "Permission-Based Access",
      "Approval Workflows",
      "Analytics & Reporting",
    ],
    impact:
      "Improved operational efficiency, data accuracy, process control, and system governance while providing real-time business visibility for better decision-making.",
  },
  {
    number: "02",
    category: "HRIS",
    title: "HRIS — Millennium Specialty Coco Products, Inc.",
    description:
      "Human Resource Information System designed to centralize employee records and automate workforce administration, attendance, leave, scheduling, and HR service processes.",
    modules: [
      "Employee Records",
      "Attendance Monitoring",
      "Leave Management",
      "Overtime & Undertime",
      "Travel Requests",
      "Calendar Management",
      "Service Provider Management",
    ],
    highlights: [
      "Workflow Automation",
      "Workforce Management",
      "Centralized HR Data",
      "HR Analytics",
      "Reporting",
    ],
    impact:
      "Improved workforce management efficiency by automating HR processes, centralizing employee information, and providing structured data for workforce planning and reporting.",
  },
  {
    number: "03",
    category: "Dashboard",
    title: "IT & Asset Management Dashboard",
    description:
      "Centralized dashboard solution for monitoring IT assets and inventory, providing visibility into asset status, ownership, location, availability, and lifecycle.",
    modules: [
      "Asset Tracking",
      "Inventory Monitoring",
      "Ownership Management",
      "Location Tracking",
      "Asset Lifecycle",
    ],
    highlights: [
      "Real-Time Monitoring",
      "Dashboard Reporting",
      "Data Visualization",
      "Inventory Control",
    ],
    impact:
      "Improved asset visibility, accountability, and management through centralized monitoring, inventory control, and real-time reporting.",
  },
  {
    number: "04",
    category: "HRIS",
    title: "HRIS — Lapanday Foods Corporation",
    description:
      "Enterprise HRIS solution supporting workforce administration, employee lifecycle management, attendance tracking, recruitment operations, scheduling, and centralized HR data management.",
    modules: [
      "Employee Management",
      "Employee Records",
      "Personal Data Sheet",
      "Attendance & Timesheets",
      "Travel Orders",
      "Recruitment",
      "Applicant Tracking",
      "HR Scheduling",
    ],
    highlights: [
      "Recruitment Automation",
      "Applicant Tracking",
      "Approval Workflows",
      "HR Analytics",
      "Centralized Master Data",
      "Recruitment Dashboards",
    ],
    impact:
      "Improved HR operational efficiency and workforce visibility through centralized employee data, automated recruitment workflows, applicant monitoring, scheduling, approvals, and reporting.",
  },
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<Module>("home");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  // const [showTopButton, setShowTopButton] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const isSidebarCollapsed = isDesktop && desktopSidebarCollapsed;

  const sectionRefs = useRef<Record<Module, HTMLElement | null>>({
    home: null,
    about: null,
    experience: null,
    projects: null,
    skills: null,
  });

  const activeModuleData = useMemo(
    () => modules.find((module) => module.id === activeModule),
    [activeModule],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => {
      setIsDesktop(mediaQuery.matches);
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 600);
    };

    const footer = document.getElementById("mobile-footer");

    const observer = footer
      ? new IntersectionObserver(
          ([entry]) => {
            setFooterVisible(entry.isIntersecting);
          },
          { threshold: 0.1 },
        )
      : null;

    window.addEventListener("scroll", handleScroll, { passive: true });

    if (footer && observer) {
      observer.observe(footer);
    }

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer?.disconnect();
    };
  }, []);

  /* ============================================================
   INITIAL PRELOADER
============================================================ */

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 75);

    return () => clearTimeout(timer);
  }, []);

  /* ============================================================
   RESET PAGE POSITION ON LOAD / REFRESH
============================================================ */

  useEffect(() => {
    // Prevent the browser from restoring the previous scroll position.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Always start at the top / Home section.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    setActiveModule("home");
    setSearchQuery("");

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);
  /* ============================================================
     ESC = COLLAPSE / EXPAND SIDEBAR
  ============================================================ */

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      if (isDesktop) {
        setDesktopSidebarCollapsed((current) => !current);
      } else {
        setMobileSidebarOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ============================================================
     PREVENT BODY SCROLL WHEN MOBILE SIDEBAR IS OPEN
  ============================================================ */

  useEffect(() => {
    if (!mobileSidebarOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen]);

  /* ============================================================
     ACTIVE SECTION TRACKING
  ============================================================ */

  useEffect(() => {
    const sections = modules
      .map((module) => sectionRefs.current[module.id])
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );

        if (visibleEntries.length > 0) {
          const currentId = visibleEntries[0].target.getAttribute(
            "data-section",
          ) as Module | null;

          if (currentId) {
            setActiveModule(currentId);
          }
        }
      },
      {
        root: null,
        rootMargin: "-18% 0px -60% 0px",
        threshold: [0, 0.15, 0.3, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  /* ============================================================
     SHOW RETURN-TO-TOP BUTTON
  ============================================================ */

  useEffect(() => {
    function handleScroll() {
      setShowTopButton(window.scrollY > 600);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ============================================================
     NAVIGATION
  ============================================================ */

  function navigate(module: Module, query = "") {
    setActiveModule(module);
    setSearchQuery(query);
    setMobileSidebarOpen(false);

    const section = sectionRefs.current[module];

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setActiveModule("home");
  }

  function setSectionRef(module: Module, element: HTMLElement | null) {
    sectionRefs.current[module] = element;
  }

  return (
    <>
      {/* ========================================================
    PRELOADER
======================================================== */}

      <div
        aria-hidden={!isLoading}
        className={[
          "fixed inset-0 z-[9999]",
          "flex items-center justify-center",
          "bg-[#f8f8f6] dark:bg-[#111111]",
          "transition-opacity duration-75",
          isLoading
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <div className="flex flex-col items-center justify-center">
          <div
            className={[
              "flex h-16 w-16 items-center justify-center",
              "rounded-2xl",
              "bg-[#171717] dark:bg-white",
            ].join(" ")}
          >
            <img src="/icon.svg" alt="" className="h-8 w-8 object-contain" />
          </div>

          <div className="mt-5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#171717] dark:bg-white" />

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#999995] dark:text-[#666]">
              Loading
            </span>
          </div>
        </div>
      </div>
      {/* ========================================================
          PAGE
      ======================================================== */}

      <div className="min-h-screen overflow-anchor-none bg-[#f8f8f6] text-[#171717] selection:bg-[#171717] selection:text-white dark:bg-[#111111] dark:text-[#f5f5f5] dark:selection:bg-white dark:selection:text-[#111111]">
        {" "}
        <SkipLink />
        <Header
          activeModule={activeModuleData?.label || "Home"}
          onMenuClick={() => setMobileSidebarOpen(true)}
          onNavigate={navigate}
          desktopSidebarCollapsed={desktopSidebarCollapsed}
        />
        {/* BACKGROUND GRID */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 opacity-[0.025] dark:opacity-[0.04] [--grid-color:#171717] dark:[--grid-color:#ffffff]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* MOBILE OVERLAY */}
        {mobileSidebarOpen && (
          <button
            type="button"
            aria-label="Close navigation overlay"
            className="fixed inset-0 z-40 cursor-default bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
        {/* ======================================================
            SIDEBAR
        ====================================================== */}
        <aside
          aria-label="Primary navigation"
          className={[
            "fixed inset-y-0 left-0 z-50 flex w-full flex-col",
            "border-r border-[#e3e3e0] dark:border-[#292929]",
            "bg-[#fbfbfa]/95 dark:bg-[#151515]/95",
            "backdrop-blur-xl",
            "transition-[width,transform] duration-300 ease-out",
            "shadow-2xl shadow-black/[0.08] lg:shadow-none",
            "lg:translate-x-0",
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",

            // Phone: fullscreen
            // Tablet / iPad: 300px
            // Desktop: 88px collapsed / 300px expanded
            isSidebarCollapsed
              ? "md:w-[300px] lg:w-[88px]"
              : "md:w-[300px] lg:w-[300px]",
          ].join(" ")}
        >
          {/* SIDEBAR HEADER */}

          <header
            className={[
              "flex h-[76px] shrink-0 items-center border-b border-[#e5e5e2] dark:border-[#292929]",
              isSidebarCollapsed ? "justify-center px-3" : "px-5",
            ].join(" ")}
          >
            {isSidebarCollapsed ? (
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => navigate("home")}
                  aria-label="Go to homepage"
                  className={[
                    "group flex h-11 w-11 cursor-pointer items-center justify-center",
                    "rounded-xl bg-[#171717] text-white dark:bg-white dark:text-[#111111]",
                    "transition-all duration-200",
                    "hover:bg-[#292929] dark:hover:bg-[#e5e5e5]",
                    "hover:shadow-lg hover:shadow-black/10",
                    "focus:outline-none",
                  ].join(" ")}
                >
                  <img
                    src="/icon.svg"
                    alt="STEPHEN J."
                    className="h-6 w-6 object-contain"
                  />
                </button>
              </div>
            ) : (
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate("home")}
                  aria-label="Go to homepage"
                  className={[
                    "flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center",
                    "rounded-xl bg-[#171717] text-white dark:bg-white dark:text-[#111111]",
                    "transition-all duration-200",
                    "hover:bg-[#292929] dark:hover:bg-[#e5e5e5]",
                    "hover:shadow-lg hover:shadow-black/10",
                    "focus:outline-none",
                  ].join(" ")}
                >
                  <img
                    src="/icon.svg"
                    alt=""
                    className="h-6 w-6 object-contain"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("home")}
                  aria-label="Go to homepage"
                  className="min-w-0 cursor-pointer text-left focus:outline-none"
                >
                  <div className="truncate text-[15px] font-black leading-none tracking-[-0.04em] text-[#171717] dark:text-[#f5f5f5]">
                    STEPHEN J.
                  </div>

                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#999] dark:text-[#666]">
                      Portfolio
                    </span>
                  </div>
                </button>
              </div>
            )}

            {!isSidebarCollapsed ? (
              <button
                type="button"
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.innerWidth >= 1024
                  ) {
                    setDesktopSidebarCollapsed(true);
                  } else {
                    setMobileSidebarOpen(false);
                  }
                }}
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
                className={[
                  "ml-auto flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center",
                  "rounded-lg text-[#999] dark:text-[#777]",
                  "transition-all duration-200",
                  "hover:bg-[#f0f0ee] hover:text-[#171717]",
                  "dark:hover:bg-[#252525] dark:hover:text-white",
                  "focus:outline-none",
                ].join(" ")}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    d="M12.5 4.5L7 10l5.5 5.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setDesktopSidebarCollapsed(false)}
                aria-label="Expand sidebar"
                title="Expand sidebar"
                className={[
                  "absolute right-[-14px] top-[21px] hidden h-7 w-7",
                  "items-center justify-center rounded-lg",
                  "border border-[#dededb] bg-white text-[#888]",
                  "dark:border-[#333] dark:bg-[#1d1d1d] dark:text-[#777]",
                  "shadow-sm shadow-black/[0.06]",
                  "transition-all duration-200",
                  "hover:border-[#cfcfcb] hover:bg-[#f8f8f7] hover:text-[#171717]",
                  "dark:hover:border-[#444] dark:hover:bg-[#252525] dark:hover:text-white",
                  "focus:outline-none",
                  "lg:flex",
                ].join(" ")}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path
                    d="M7.5 4.5L13 10l-5.5-5.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </header>

          {/* SIDEBAR CONTENT */}

          <div className="flex-1 overflow-y-auto px-4 py-7">
            {!isSidebarCollapsed && (
              <div className="mb-3 flex items-center justify-between px-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a0a09d] dark:text-[#666]">
                  Navigation
                </span>

                <kbd className="hidden rounded-md border border-[#dededb] bg-white px-1.5 py-0.5 text-[9px] font-medium text-[#999] dark:border-[#333] dark:bg-[#202020] dark:text-[#777] sm:block">
                  ESC
                </kbd>
              </div>
            )}

            <nav className="space-y-1.5">
              {modules.map((module) => {
                const isActive = activeModule === module.id;

                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => navigate(module.id)}
                    aria-current={isActive ? "page" : undefined}
                    title={
                      isSidebarCollapsed
                        ? `${module.label} — ${module.description}`
                        : undefined
                    }
                    className={[
                      "group relative flex w-full cursor-pointer items-center",
                      "rounded-2xl text-left outline-none",
                      "transition-all duration-200",
                      "focus:outline-none focus:ring-0",
                      isSidebarCollapsed
                        ? "justify-center px-2 py-3"
                        : "gap-3 px-3 py-3.5",
                      isActive
                        ? [
                            "bg-white text-[#171717]",
                            "dark:bg-[#242424] dark:text-white",
                            "shadow-md shadow-black/[0.055]",
                            "dark:shadow-black/20",
                            "ring-1 ring-[#e5e5e2] dark:ring-[#333]",
                          ].join(" ")
                        : [
                            "text-[#737373] dark:text-[#858585]",
                            "hover:bg-white hover:text-[#171717]",
                            "dark:hover:bg-[#1f1f1f] dark:hover:text-white",
                          ].join(" "),
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex shrink-0 items-center justify-center rounded-xl",
                        "transition-colors duration-200",
                        isSidebarCollapsed ? "h-11 w-11" : "h-10 w-10",
                        isActive
                          ? "bg-[#f0f0ee] text-[#171717] dark:bg-[#303030] dark:text-white"
                          : [
                              "bg-[#f0f0ee] text-[#8c8c88]",
                              "group-hover:bg-[#e9e9e7] group-hover:text-[#171717]",
                              "dark:bg-[#252525] dark:text-[#777]",
                              "dark:group-hover:bg-[#303030] dark:group-hover:text-white",
                            ].join(" "),
                      ].join(" ")}
                    >
                      {module.icon}
                    </span>

                    {!isSidebarCollapsed && (
                      <>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={[
                                "text-sm font-bold",
                                isActive
                                  ? "text-[#171717] dark:text-white"
                                  : "text-[#737373] dark:text-[#858585]",
                              ].join(" ")}
                            >
                              {module.label}
                            </span>

                            <span
                              className={[
                                "text-[9px] font-medium",
                                isActive
                                  ? "text-[#aaa] dark:text-[#777]"
                                  : "text-[#c0c0bd] dark:text-[#555]",
                              ].join(" ")}
                            >
                              {module.number}
                            </span>
                          </div>

                          <div
                            className={[
                              "mt-0.5 truncate text-[11px]",
                              isActive
                                ? "text-[#8f8f8b] dark:text-[#999]"
                                : "text-[#a3a3a0] dark:text-[#666]",
                            ].join(" ")}
                          >
                            {module.description}
                          </div>
                        </div>

                        <span
                          className={[
                            "text-sm transition-transform duration-200",
                            "group-hover:translate-x-0.5",
                            isActive
                              ? "text-[#737373] dark:text-[#aaa]"
                              : "text-[#b5b5b0] dark:text-[#555]",
                          ].join(" ")}
                        >
                          →
                        </span>
                      </>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* CONNECT */}

            <div className="mt-12">
              {!isSidebarCollapsed && (
                <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a0a09d] dark:text-[#666]">
                  Connect
                </div>
              )}

              {isSidebarCollapsed ? (
                <div className="mt-4 space-y-1.5">
                  <a
                    href="mailto:sjaferrer1@gmail.com"
                    title="Email"
                    aria-label="Email"
                    className="group flex h-[56px] w-full items-center justify-center rounded-2xl text-[#737373] outline-none transition-colors duration-200 hover:bg-white hover:text-[#171717] dark:text-[#858585] dark:hover:bg-[#1f1f1f] dark:hover:text-white focus:outline-none"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f0ee] text-[#8c8c88] transition-colors duration-200 group-hover:bg-[#e9e9e7] group-hover:text-[#171717] dark:bg-[#252525] dark:text-[#777] dark:group-hover:bg-[#303030] dark:group-hover:text-white">
                      <EmailIcon />
                    </span>
                  </a>

                  <a
                    href="https://github.com/sjaferrer"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    aria-label="GitHub"
                    className="group flex h-[56px] w-full items-center justify-center rounded-2xl text-[#737373] outline-none transition-colors duration-200 hover:bg-white hover:text-[#171717] dark:text-[#858585] dark:hover:bg-[#1f1f1f] dark:hover:text-white focus:outline-none"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f0ee] text-[#8c8c88] transition-colors duration-200 group-hover:bg-[#e9e9e7] group-hover:text-[#171717] dark:bg-[#252525] dark:text-[#777] dark:group-hover:bg-[#303030] dark:group-hover:text-white">
                      <GitHubIcon />
                    </span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/stephen-john-f-964557318/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    aria-label="LinkedIn"
                    className="group flex h-[56px] w-full items-center justify-center rounded-2xl text-[#737373] outline-none transition-colors duration-200 hover:bg-white hover:text-[#171717] dark:text-[#858585] dark:hover:bg-[#1f1f1f] dark:hover:text-white focus:outline-none"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f0ee] text-[#8c8c88] transition-colors duration-200 group-hover:bg-[#e9e9e7] group-hover:text-[#171717] dark:bg-[#252525] dark:text-[#777] dark:group-hover:bg-[#303030] dark:hover:text-white">
                      <LinkedInIcon />
                    </span>
                  </a>
                </div>
              ) : (
                <div className="space-y-1">
                  <SocialLink
                    href="mailto:sjaferrer1@gmail.com"
                    icon={<EmailIcon />}
                    label="Email"
                  />

                  <SocialLink
                    href="https://github.com/sjaferrer"
                    icon={<GitHubIcon />}
                    label="GitHub"
                    external
                  />

                  <SocialLink
                    href="https://www.linkedin.com/in/stephen-john-f-964557318/"
                    icon={<LinkedInIcon />}
                    label="LinkedIn"
                    external
                  />
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR FOOTER */}

          {isSidebarCollapsed ? (
            <div className="border-t border-[#e5e5e2] p-4 dark:border-[#292929]">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-[#c1c1be] dark:text-[#555]">
                  © {new Date().getFullYear()} SJ
                </span>
              </div>
            </div>
          ) : (
            <div className="border-t border-[#e5e5e2] p-6 dark:border-[#292929]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#737373] dark:text-[#858585]">
                    © {new Date().getFullYear()} STEPHEN J.
                  </div>

                  <div className="mt-1 text-[10px] text-[#aaa] dark:text-[#666]">
                    Full Stack Developer · Systems Analyst
                  </div>
                </div>

                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d4d4cf] text-[10px] font-bold text-[#aaa] dark:border-[#303030] dark:text-[#555]">
                  SJ
                </span>
              </div>
            </div>
          )}
        </aside>
        {/* ========================================================
            MAIN CONTENT
        ======================================================== */}
        <main
          id="main-content"
          className={[
            "min-h-screen pt-16 transition-[margin] duration-300 ease-out",
            desktopSidebarCollapsed ? "lg:ml-[88px]" : "lg:ml-[300px]",
          ].join(" ")}
        >
          <SectionShell
            id="home"
            sectionRef={(element) => setSectionRef("home", element)}
            background="gray"
          >
            <HomeModule navigate={navigate} searchQuery={searchQuery} />
          </SectionShell>

          <SectionShell
            id="about"
            sectionRef={(element) => setSectionRef("about", element)}
            background="white"
          >
            <AboutModule searchQuery={searchQuery} />
          </SectionShell>

          <SectionShell
            id="experience"
            sectionRef={(element) => setSectionRef("experience", element)}
            background="gray"
          >
            <ExperienceModule searchQuery={searchQuery} />
          </SectionShell>

          <SectionShell
            id="projects"
            sectionRef={(element) => setSectionRef("projects", element)}
            background="white"
          >
            <ProjectsModule searchQuery={searchQuery} />
          </SectionShell>

          <SectionShell
            id="skills"
            sectionRef={(element) => setSectionRef("skills", element)}
            background="gray"
          >
            <SkillsModule searchQuery={searchQuery} />
          </SectionShell>

          {/* MOBILE FOOTER */}
          <footer
            id="mobile-footer"
            className="border-t border-[#deded9] bg-[#f1f1ed] px-5 py-12 dark:border-[#292929] dark:bg-[#151515] lg:hidden"
          >
            <div className="mx-auto w-full max-w-[1180px]">
              {/* CONNECT */}
              <div>
                <div className="px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#999995] dark:text-[#666]">
                  Connect
                </div>

                <div className="mt-4 space-y-1.5">
                  <a
                    href="mailto:sjaferrer1@gmail.com"
                    className="group flex min-h-12 items-center justify-between rounded-xl border border-[#deded9] bg-white px-4 text-sm font-bold text-[#40403d] transition-all duration-200 hover:border-[#d2d2cd] hover:bg-[#fafaf8] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#ddd] dark:hover:border-[#404040] dark:hover:bg-[#222]"
                  >
                    <span className="flex items-center gap-3">
                      <EmailIcon />
                      Email
                    </span>

                    <span className="text-[#aaa] transition-transform duration-200 group-hover:translate-x-0.5 dark:text-[#666]">
                      ↗
                    </span>
                  </a>

                  <a
                    href="https://github.com/sjaferrer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-12 items-center justify-between rounded-xl border border-[#deded9] bg-white px-4 text-sm font-bold text-[#40403d] transition-all duration-200 hover:border-[#d2d2cd] hover:bg-[#fafaf8] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#ddd] dark:hover:border-[#404040] dark:hover:bg-[#222]"
                  >
                    <span className="flex items-center gap-3">
                      <GitHubIcon />
                      GitHub
                    </span>

                    <span className="text-[#aaa] transition-transform duration-200 group-hover:translate-x-0.5 dark:text-[#666]">
                      ↗
                    </span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/stephen-john-f-964557318/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-12 items-center justify-between rounded-xl border border-[#deded9] bg-white px-4 text-sm font-bold text-[#40403d] transition-all duration-200 hover:border-[#d2d2cd] hover:bg-[#fafaf8] dark:border-[#303030] dark:bg-[#1d1d1d] dark:text-[#ddd] dark:hover:border-[#404040] dark:hover:bg-[#222]"
                  >
                    <span className="flex items-center gap-3">
                      <LinkedInIcon />
                      LinkedIn
                    </span>

                    <span className="text-[#aaa] transition-transform duration-200 group-hover:translate-x-0.5 dark:text-[#666]">
                      ↗
                    </span>
                  </a>
                </div>
              </div>

              {/* FOOTER INFO */}
              <div className="mt-8 border-t border-[#dcdcd7] pt-6 dark:border-[#292929]">
                <div className="flex items-center justify-between">
                  {/* Copyright */}
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-[#737373] dark:text-[#858585]">
                      © {new Date().getFullYear()} STEPHEN J.
                    </div>

                    <div className="mt-1 text-[10px] text-[#aaa] dark:text-[#666]">
                      Full Stack Developer · Systems Analyst
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        })
                      }
                      className="group flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#858580] transition-colors duration-200 hover:text-[#40403d] dark:text-[#666] dark:hover:text-[#ddd]"
                    >
                      Top
                      <span className="transition-transform duration-200 group-hover:-translate-y-0.5">
                        ↑
                      </span>
                    </button>

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d4d4cf] text-[10px] font-bold text-[#aaa] dark:border-[#303030] dark:text-[#555]">
                      SJ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
        {/* RETURN TO TOP */}
        <button
          type="button"
          aria-label="Return to top"
          onClick={scrollToTop}
          className={[
            "fixed bottom-5 right-5 z-30",
            "flex h-11 w-11 cursor-pointer items-center justify-center",
            "rounded-xl border border-[#dcdcd7] bg-white text-[#171717]",
            "dark:border-[#333] dark:bg-[#1d1d1d] dark:text-white",
            "shadow-lg shadow-black/[0.08]",
            "transition-[opacity,transform,background-color,box-shadow] duration-200",
            "hover:bg-[#171717] hover:text-white hover:shadow-xl",
            "dark:hover:bg-white dark:hover:text-[#111]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2",
            "dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#111111]",
            showTopButton && !footerVisible
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-3 opacity-0",
          ].join(" ")}
        >
          <span className="text-lg leading-none">↑</span>
        </button>
      </div>
    </>
  );
}

/* ============================================================
   SECTION SHELL
============================================================ */

function SectionShell({
  id,
  background,
  children,
  sectionRef,
}: {
  id: Module;
  background: "gray" | "white";
  children: ReactNode;
  sectionRef: (element: HTMLElement | null) => void;
}) {
  return (
    <section
      id={`section-${id}`}
      data-section={id}
      ref={sectionRef}
      className={[
        "scroll-mt-20 border-b",
        "border-black/[0.035] dark:border-white/[0.06]",
        "transition-colors duration-500",
        background === "gray"
          ? "bg-[#f8f8f6] dark:bg-[#111111]"
          : "bg-white dark:bg-[#151515]",
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24 lg:px-12 xl:px-16">
        {children}
      </div>
    </section>
  );
}

/* ============================================================
   HOME
============================================================ */

function HomeModule({
  navigate,
  searchQuery,
}: {
  navigate: (module: Module, query?: string) => void;
  searchQuery: string;
}) {
  return (
    <div className="space-y-20 sm:space-y-24">
      <section className="relative overflow-hidden pt-2 sm:pt-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-gradient-to-br from-[#e9e7de] via-[#f2f1ec] to-transparent blur-3xl dark:from-[#292929] dark:via-[#202020] dark:to-transparent sm:h-[440px] sm:w-[440px]"
        />

        <div className="relative">
          <div className="mb-8 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a16207] dark:bg-[#d6a54a]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#73736f] dark:text-[#999]">
              Ready for what’s next
            </span>
          </div>

          <div className="mb-5 flex items-center gap-3 text-sm font-bold text-[#a16207] dark:text-[#d6a54a]">
            <span className="h-px w-8 bg-[#a16207] dark:bg-[#d6a54a]" />

            <HighlightText
              text="Full Stack Developer · Systems Analyst"
              query={searchQuery}
            />
          </div>

          <h1 className="max-w-5xl text-[44px] font-black leading-[0.92] tracking-[-0.065em] sm:text-6xl md:text-7xl lg:text-[82px] xl:text-[92px]">
            I build software
            <br />
            <span className="text-[#969692] dark:text-[#777]">
              that solves real problems.
            </span>
          </h1>

          <div className="mt-8 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[1fr_250px] lg:items-end">
            <p className="max-w-3xl text-base leading-7 text-[#5f5f5c] dark:text-[#aaa] sm:text-lg sm:leading-8">
              <HighlightText
                text="I'm Stephen J., a Full Stack Developer focused on building reliable enterprise applications, HRIS platforms, ERP systems, dashboards, and business process automation tools."
                query={searchQuery}
              />
            </p>

            <div className="hidden border-l border-[#deded9] pl-6 dark:border-[#333] lg:block">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a0a09c] dark:text-[#777]">
                Primary focus
              </div>

              <div className="mt-2 text-sm font-bold leading-6 text-[#30302e] dark:text-[#ddd]">
                Enterprise systems
                <br />& business automation
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("projects")}
              className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#171717] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#292929] hover:shadow-xl dark:bg-white dark:text-[#111] dark:hover:bg-[#e5e5e5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2 dark:focus-visible:ring-white"
            >
              View my work
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate("about")}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-[#dcdcd7] bg-white px-6 py-3.5 text-sm font-bold text-[#40403d] transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[#bcbcb6] hover:bg-[#f5f5f2] dark:border-[#333] dark:bg-[#1c1c1c] dark:text-[#ddd] dark:hover:border-[#444] dark:hover:bg-[#252525] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2 dark:focus-visible:ring-white"
            >
              More about me
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#deded9] pt-6 text-[11px] font-bold uppercase tracking-[0.08em] text-[#999995] dark:border-[#333] dark:text-[#666] sm:mt-14">
            <span>ERP</span>
            <span className="h-1 w-1 rounded-full bg-[#c5c5c0] dark:bg-[#555]" />
            <span>HRIS</span>
            <span className="h-1 w-1 rounded-full bg-[#c5c5c0] dark:bg-[#555]" />
            <span>Business Automation</span>
            <span className="h-1 w-1 rounded-full bg-[#c5c5c0] dark:bg-[#555]" />
            <span>Dashboards</span>
            <span className="h-1 w-1 rounded-full bg-[#c5c5c0] dark:bg-[#555]" />
            <span>Enterprise Systems</span>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-[#e2e2de] bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-[#303030] dark:bg-[#1b1b1b]">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <QuickInfo
            label="Based in"
            value="Davao City, Philippines"
            searchQuery={searchQuery}
          />

          <QuickInfo
            label="Specialization"
            value="Enterprise Applications"
            searchQuery={searchQuery}
          />

          <QuickInfo
            label="Currently"
            value="Open to opportunities"
            searchQuery={searchQuery}
          />
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Selected work"
          title="Things I've worked on."
          description="Enterprise applications and business systems designed around real operational needs."
          searchQuery={searchQuery}
        />

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <SimpleProject
            number="01"
            title="Enterprise Resource Planning"
            description="A centralized ERP platform covering procurement, inventory, asset management, approval workflows, user access, audit trails, reporting, and operational analytics."
            tags={["ERP", "Process Automation", "Inventory", "Reporting"]}
            searchQuery={searchQuery}
          />

          <SimpleProject
            number="02"
            title="Human Resource Information System"
            description="A centralized HR platform for employee records, attendance, leave management, overtime and undertime, travel requests, scheduling, HR workflows, and workforce reporting."
            tags={[
              "HRIS",
              "HR Automation",
              "Workforce Management",
              "Analytics",
            ]}
            searchQuery={searchQuery}
          />
        </div>

        <button
          type="button"
          onClick={() => navigate("projects")}
          className="group mt-7 inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-[#171717] transition-colors duration-200 hover:text-[#a16207] dark:text-white dark:hover:text-[#d6a54a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-4 dark:focus-visible:ring-white"
        >
          View all projects
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </button>
      </section>

      <section className="border-t border-[#deded9] pt-16 dark:border-[#333]">
        <SectionHeading
          eyebrow="Technical stack"
          title="Tools I work with."
          description="A practical stack focused on building maintainable and scalable business applications."
          searchQuery={searchQuery}
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {[
            "JavaScript",
            "TypeScript",
            "C#",
            "ASP.NET",
            "SQL Server",
            "Next.js",
            "Node.js",
            "Tailwind CSS",
            "Git",
          ].map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[#dfdfda] bg-white px-3.5 py-2 text-sm font-semibold text-[#40403d] shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-[#c8c8c2] hover:shadow-md dark:border-[#333] dark:bg-[#1b1b1b] dark:text-[#ddd] dark:hover:border-[#444]"
            >
              <HighlightText text={skill} query={searchQuery} />
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate("skills")}
          className="group mt-7 inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-[#171717] transition-colors duration-200 hover:text-[#a16207] dark:text-white dark:hover:text-[#d6a54a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-4 dark:focus-visible:ring-white"
        >
          Explore my skills
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </button>
      </section>

      <section className="relative overflow-hidden rounded-[28px] bg-[#171717] px-6 py-12 text-white shadow-xl shadow-black/10 dark:bg-[#1b1b1b] sm:px-10 sm:py-16 lg:px-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10"
        />

        <div className="relative max-w-3xl">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Let's connect
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            Have a project or opportunity in mind?
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            I'm interested in software products, enterprise systems, and
            projects where technology can improve how people work.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:sjaferrer1@gmail.com"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#171717] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#f0f0ee] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
            >
              <EmailIcon />
              Get in touch
            </a>

            <a
              href="https://github.com/sjaferrer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white transition-[background-color,border-color] duration-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <GitHubIcon />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/stephen-john-f-964557318/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white transition-[background-color,border-color] duration-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   ABOUT
============================================================ */

function AboutModule({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="space-y-20 sm:space-y-24">
      <section className="pt-2 sm:pt-4">
        <PageIntro
          eyebrow="About"
          title="Professional profile."
          description="A developer focused on turning complex business processes into practical software systems."
          searchQuery={searchQuery}
        />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="max-w-3xl space-y-6 text-sm leading-7 text-[#5f5f5c] dark:text-[#aaa] sm:text-base sm:leading-8">
            <p>
              <HighlightText
                text="I'm a Full Stack Developer specializing in enterprise application development with experience in Human Resource Information Systems (HRIS), Enterprise Resource Planning (ERP), and business process automation."
                query={searchQuery}
              />
            </p>

            <p>
              <HighlightText
                text="My work involves translating business requirements into practical software solutions. I work across frontend interfaces, backend services, database architecture, APIs, reporting, and system workflows."
                query={searchQuery}
              />
            </p>

            <p>
              <HighlightText
                text="I enjoy understanding how a business operates and then designing software that makes those processes simpler, faster, and more reliable."
                query={searchQuery}
              />
            </p>

            <div className="border-l-2 border-[#a16207] pl-5 pt-2 text-base font-semibold leading-7 text-[#30302e] dark:border-[#d6a54a] dark:text-[#ddd]">
              I believe good software starts with understanding the people,
              process, and problem behind the requirement.
            </div>
          </div>

          <div className="rounded-3xl border border-[#e2e2de] bg-[#f8f8f6] p-6 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-[#303030] dark:bg-[#1b1b1b] sm:p-7">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999995] dark:text-[#666]">
                Basic information
              </div>

              {/* <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                Available
              </span> */}
            </div>

            <div className="mt-7 space-y-6">
              <InfoItem
                label="Name"
                value="Stephen J."
                searchQuery={searchQuery}
              />

              <InfoItem
                label="Position"
                value="Full Stack Developer"
                searchQuery={searchQuery}
              />

              <InfoItem
                label="Location"
                value="Davao City, Philippines"
                searchQuery={searchQuery}
              />

              <InfoItem
                label="Focus"
                value="Enterprise Applications"
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#deded9] pt-14 dark:border-[#333]">
        <SectionHeading
          eyebrow="What drives my work"
          title="Software should improve the process, not complicate it."
          description="My approach combines technical implementation with an understanding of how people actually use business systems."
          searchQuery={searchQuery}
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Principle
            number="01"
            title="Understand"
            description="Start with the actual business process, constraints, users, and problems."
          />

          <Principle
            number="02"
            title="Simplify"
            description="Turn complicated workflows into clear interfaces, automation, and reliable system logic."
          />

          <Principle
            number="03"
            title="Improve"
            description="Build systems that are maintainable, measurable, and capable of evolving with the business."
          />
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   EXPERIENCE
============================================================ */

function ExperienceModule({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="space-y-16 sm:space-y-20">
      <PageIntro
        eyebrow="Experience"
        title="Building systems around real business needs."
        description="My experience spans software development, system analysis, enterprise applications, HR technology, and process automation."
        searchQuery={searchQuery}
      />

      <div className="relative">
        <div className="absolute bottom-10 left-[17px] top-10 hidden w-px bg-gradient-to-b from-[#171717] via-[#deded9] to-transparent dark:from-white dark:via-[#333] md:block" />

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <article
              key={experience.company}
              className="relative grid grid-cols-1 gap-5 md:grid-cols-[36px_150px_1fr] md:gap-6"
            >
              <div className="relative z-10 hidden md:block">
                <span className="mt-1 block h-9 w-9 rounded-full border-[5px] border-[#f8f8f6] bg-[#171717] shadow-md dark:border-[#111111] dark:bg-white" />
              </div>

              <div className="pt-2">
                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a3a39f] dark:text-[#777]">
                  Experience
                </div>

                <div className="mt-1 text-xl font-black tracking-[-0.04em] text-[#d0d0cb] dark:text-[#555]">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="rounded-3xl border border-[#e1e1dc] bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-[#d7d7d1] hover:shadow-md dark:border-[#303030] dark:bg-[#1b1b1b] dark:hover:border-[#404040] sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black tracking-[-0.035em] sm:text-3xl">
                      <HighlightText
                        text={experience.position}
                        query={searchQuery}
                      />
                    </h2>

                    <div className="mt-2 text-sm font-bold text-[#a16207] dark:text-[#d6a54a]">
                      <HighlightText
                        text={experience.company}
                        query={searchQuery}
                      />
                    </div>
                  </div>

                  <span className="rounded-full bg-[#f5f5f2] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#777773] dark:bg-[#292929] dark:text-[#aaa]">
                    Enterprise
                  </span>
                </div>

                <p className="mt-6 max-w-3xl text-sm leading-7 text-[#5f5f5c] dark:text-[#999] sm:text-base">
                  <HighlightText
                    text={experience.description}
                    query={searchQuery}
                  />
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#e3e3de] bg-[#fafaf8] px-2.5 py-1.5 text-[10px] font-bold text-[#686864] dark:border-[#333] dark:bg-[#222] dark:text-[#aaa]"
                    >
                      <HighlightText text={tag} query={searchQuery} />
                    </span>
                  ))}
                </div>

                <div className="mt-8 border-t border-[#edede8] pt-7 dark:border-[#303030]">
                  <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#999995] dark:text-[#666]">
                    Key responsibilities
                  </div>

                  <div className="space-y-3">
                    {experience.responsibilities.map((responsibility) => (
                      <div
                        key={responsibility}
                        className="flex gap-3 text-sm leading-6 text-[#52524e] dark:text-[#aaa]"
                      >
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#a16207] dark:bg-[#d6a54a]" />

                        <HighlightText
                          text={responsibility}
                          query={searchQuery}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PROJECTS
============================================================ */

function ProjectsModule({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="space-y-14 sm:space-y-16">
      <PageIntro
        eyebrow="Projects"
        title="Selected enterprise work."
        description="A closer look at the systems, workflows, and business problems I've worked on."
        searchQuery={searchQuery}
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.number}
            {...project}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SKILLS
============================================================ */

function SkillsModule({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="space-y-16">
      <PageIntro
        eyebrow="Skills"
        title="Technologies & tools."
        description="A practical toolkit built around enterprise applications, APIs, databases, automation, and modern web development."
        searchQuery={searchQuery}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(skills).map(([category, items]) => (
          <SkillCategory
            key={category}
            category={category}
            items={items}
            searchQuery={searchQuery}
          />
        ))}
      </div>

      <section className="border-t border-[#deded9] pt-14 dark:border-[#333]">
        <SectionHeading
          eyebrow="Technical focus"
          title="Where technology meets business outcomes."
          description="The areas where my technical skills connect most closely with business outcomes."
          searchQuery={searchQuery}
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {focusAreas.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[#dfdfda] bg-white px-3.5 py-2 text-sm font-semibold text-[#40403d] shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-[#c8c8c2] hover:shadow-md dark:border-[#333] dark:bg-[#1b1b1b] dark:text-[#ddd] dark:hover:border-[#444]"
            >
              <HighlightText text={skill} query={searchQuery} />
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   SKIP LINK
============================================================ */

function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-lg bg-[#171717] px-4 py-2 text-sm font-bold text-white transition-transform focus:translate-y-0 dark:bg-white dark:text-[#111]"
    >
      Skip to content
    </a>
  );
}

/* ============================================================
   PAGE INTRO
============================================================ */

function PageIntro({
  eyebrow,
  title,
  description,
  searchQuery,
}: {
  eyebrow: string;
  title: string;
  description: string;
  searchQuery: string;
}) {
  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a16207] dark:text-[#d6a54a] sm:text-xs">
        <span className="h-px w-7 bg-[#a16207] dark:bg-[#d6a54a]" />

        <HighlightText text={eyebrow} query={searchQuery} />
      </div>

      <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-7xl">
        <HighlightText text={title} query={searchQuery} />
      </h1>

      <p className="mt-5 max-w-2xl text-sm leading-7 text-[#73736f] dark:text-[#999] sm:text-base sm:leading-8">
        <HighlightText text={description} query={searchQuery} />
      </p>
    </div>
  );
}

/* ============================================================
   SECTION HEADING
============================================================ */

function SectionHeading({
  eyebrow,
  title,
  description,
  searchQuery,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  searchQuery: string;
}) {
  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a16207] dark:text-[#d6a54a] sm:text-xs">
        <span className="h-px w-7 bg-[#a16207] dark:bg-[#d6a54a]" />

        <HighlightText text={eyebrow} query={searchQuery} />
      </div>

      <h2 className="mt-4 text-2xl font-black tracking-[-0.045em] sm:text-3xl lg:text-5xl">
        <HighlightText text={title} query={searchQuery} />
      </h2>

      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#73736f] dark:text-[#999] sm:text-base">
          <HighlightText text={description} query={searchQuery} />
        </p>
      )}
    </div>
  );
}

/* ============================================================
   QUICK INFO
============================================================ */

function QuickInfo({
  label,
  value,
  searchQuery,
}: {
  label: string;
  value: string;
  searchQuery: string;
}) {
  return (
    <div className="border-b border-[#e5e5e1] p-6 last:border-b-0 dark:border-[#303030] sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#999995] dark:text-[#666]">
        <HighlightText text={label} query={searchQuery} />
      </div>

      <div className="mt-3 text-sm font-bold text-[#30302d] dark:text-[#ddd] sm:text-base">
        <HighlightText text={value} query={searchQuery} />
      </div>
    </div>
  );
}

/* ============================================================
   INFO ITEM
============================================================ */

function InfoItem({
  label,
  value,
  searchQuery,
}: {
  label: string;
  value: string;
  searchQuery: string;
}) {
  return (
    <div className="border-b border-[#eeeeea] pb-5 last:border-0 last:pb-0 dark:border-[#303030]">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#999995] dark:text-[#666]">
        <HighlightText text={label} query={searchQuery} />
      </div>

      <div className="mt-2 text-sm font-bold text-[#30302d] dark:text-[#ddd]">
        <HighlightText text={value} query={searchQuery} />
      </div>
    </div>
  );
}

/* ============================================================
   PRINCIPLE
============================================================ */

function Principle({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-[#e2e2de] bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-[#d5d5cf] hover:shadow-md dark:border-[#303030] dark:bg-[#1b1b1b] dark:hover:border-[#404040] sm:p-7">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black tracking-[0.15em] text-[#a3a39f] dark:text-[#777]">
          {number}
        </span>

        <span className="text-[#d0d0cb] dark:text-[#555]">+</span>
      </div>

      <h3 className="mt-10 text-xl font-black tracking-tight">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-[#73736f] dark:text-[#999]">
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   SKILL CATEGORY
============================================================ */

function SkillCategory({
  category,
  items,
  searchQuery,
}: {
  category: string;
  items: Skill[];
  searchQuery: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#e2e2de] bg-white shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-[#d5d5cf] hover:shadow-md dark:border-[#303030] dark:bg-[#1b1b1b] dark:hover:border-[#404040]">
      <div className="border-b border-[#e5e5e1] bg-[#fcfcfa] px-5 py-5 dark:border-[#303030] dark:bg-[#202020]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-black">
              <HighlightText text={category} query={searchQuery} />
            </h2>

            <p className="mt-1 text-[11px] text-[#999995] dark:text-[#666]">
              {items.length}{" "}
              {items.length === 1 ? "technology" : "technologies"}
            </p>
          </div>

          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#171717] text-[9px] font-bold text-white dark:bg-white dark:text-[#111]">
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div>
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 border-b border-[#f0f0ec] px-5 py-4 transition-colors duration-200 hover:bg-[#fafaf8] dark:border-[#292929] dark:hover:bg-[#222]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f1f1ee] dark:bg-[#2a2a2a]">
              <i className={`${item.icon} text-xl`} aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-[#40403d] dark:text-[#ddd]">
                <HighlightText text={item.name} query={searchQuery} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SOCIAL LINK
============================================================ */

function SocialLink({
  href,
  icon,
  label,
  external = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm font-semibold text-[#73736f] transition-colors duration-200 hover:bg-white hover:text-[#171717] dark:text-[#858585] dark:hover:bg-[#1f1f1f] dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
    >
      <span className="text-[#999995] transition-colors duration-200 group-hover:text-[#171717] dark:text-[#666] dark:group-hover:text-white">
        {icon}
      </span>

      <span>{label}</span>

      {external && (
        <span className="ml-auto text-xs text-[#b5b5b0] transition-colors duration-200 group-hover:text-[#171717] dark:text-[#555] dark:group-hover:text-white" />
      )}
    </a>
  );
}

/* ============================================================
   SIMPLE PROJECT
============================================================ */

function SimpleProject({
  number,
  title,
  description,
  tags,
  searchQuery,
}: {
  number: string;
  title: string;
  description: string;
  tags: string[];
  searchQuery: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e2e2de] bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-[#d5d5cf] hover:shadow-md dark:border-[#303030] dark:bg-[#1b1b1b] dark:hover:border-[#404040] sm:p-7">
      <div className="flex items-start justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f1f1ee] text-[10px] font-black text-[#777772] dark:bg-[#292929] dark:text-[#aaa]">
          {number}
        </span>

        <span className="text-[#c0c0bb] dark:text-[#555]" />
      </div>

      <h3 className="mt-7 text-xl font-black tracking-[-0.03em] sm:text-2xl">
        <HighlightText text={title} query={searchQuery} />
      </h3>

      <p className="mt-4 text-sm leading-6 text-[#73736f] dark:text-[#999]">
        <HighlightText text={description} query={searchQuery} />
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#f5f5f2] px-2.5 py-1.5 text-[10px] font-bold text-[#5f5f5b] dark:bg-[#292929] dark:text-[#aaa]"
          >
            <HighlightText text={tag} query={searchQuery} />
          </span>
        ))}
      </div>
    </article>
  );
}

/* ============================================================
   PROJECT CARD
============================================================ */

function ProjectCard({
  number,
  category,
  title,
  description,
  modules,
  highlights,
  impact,
  searchQuery,
}: {
  number: string;
  category: string;
  title: string;
  description: string;
  modules: string[];
  highlights: string[];
  impact: string;
  searchQuery: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-[28px] border border-[#e1e1dc] bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-[#d5d5cf] hover:shadow-md dark:border-[#303030] dark:bg-[#1b1b1b] dark:hover:border-[#404040] sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-[#f5f4ef] blur-3xl dark:bg-[#292929]"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#171717] text-[10px] font-bold text-white dark:bg-white dark:text-[#111]">
              {number}
            </span>

            <span className="rounded-full bg-[#f4f4f1] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#777773] dark:bg-[#292929] dark:text-[#aaa]">
              {category}
            </span>
          </div>

          <span className="text-lg text-[#c0c0bb] dark:text-[#555]" />
        </div>

        <h2 className="mt-7 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
          <HighlightText text={title} query={searchQuery} />
        </h2>

        <p className="mt-5 text-sm leading-7 text-[#5f5f5b] dark:text-[#999] sm:text-base">
          <HighlightText text={description} query={searchQuery} />
        </p>

        <div className="mt-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999995] dark:text-[#666]">
            Key modules
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {modules.map((module) => (
              <span
                key={module}
                className="rounded-lg border border-[#e8e8e3] bg-[#fafaf8] px-3 py-2 text-xs font-semibold text-[#52524e] dark:border-[#333] dark:bg-[#222] dark:text-[#bbb]"
              >
                <HighlightText text={module} query={searchQuery} />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999995] dark:text-[#666]">
            Technical highlights
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-center gap-2 text-sm text-[#52524e] dark:text-[#aaa]"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f1f1ee] text-[10px] font-bold text-[#73736f] dark:bg-[#292929] dark:text-[#999]">
                  +
                </span>

                <HighlightText text={highlight} query={searchQuery} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#e9e9e5] bg-[#f8f8f5] p-5 dark:border-[#333] dark:bg-[#202020]">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#999995] dark:text-[#666]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a16207] dark:bg-[#d6a54a]" />
            Business impact
          </div>

          <p className="mt-3 text-sm leading-6 text-[#5f5f5b] dark:text-[#999]">
            <HighlightText text={impact} query={searchQuery} />
          </p>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   ICONS
============================================================ */

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.37 4.28 5.45v6.29ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.54 20.45h3.56V9H3.54v11.45Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}

/* ============================================================
   SEARCH HIGHLIGHT
============================================================ */

function HighlightText({ text, query }: { text: string; query: string }) {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    return <>{text}</>;
  }

  const escapedQuery = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const parts = text.split(new RegExp(`(${escapedQuery})`, "gi"));

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = part.toLowerCase() === cleanQuery.toLowerCase();

        if (isMatch) {
          return (
            <mark
              key={`${part}-${index}`}
              className="rounded-md bg-[#fef08a] px-1 py-0.5 text-[#171717] shadow-sm dark:bg-[#d6a54a] dark:text-[#111]"
            >
              {part}
            </mark>
          );
        }

        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}
//asssdd
//asddee
