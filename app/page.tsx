"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Module =
  | "home"
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "chat"
  | "game"
  | "analytics";

type Theme = "light" | "dark";

type Overlay = "chat" | "game" | "analytics" | null;

type AnalyticsEventType =
  | "module_visit"
  | "click"
  | "right_click"
  | "mouse_move"
  | "reload"
  | "game_start"
  | "game_over"
  | "game_win"
  | "snake_food"
  | "snake_move";

type AnalyticsEvent = {
  id: string;
  type: AnalyticsEventType;
  action: string;
  module: string;
  direction?: "up" | "down" | "left" | "right";
  timestamp: number;
  score?: number;
};

type AnalyticsModuleSummary = {
  visits: number;
  firstVisitAt: number | null;
  lastVisitAt: number | null;
  totalTimeMs: number;
  active: boolean;
};

type AnalyticsState = {
  session: {
    startedAt: number;
    lastActivityAt: number;
    currentModule: string | null;
    currentModuleStartedAt: number | null;
  };
  totals: {
    activities: number;
    clicks: number;
    rightClicks: number;
    mouseMoves: number;
    reloads: number;
    moduleVisits: number;
    uniqueModules: number;
  };
  modules: Record<string, AnalyticsModuleSummary>;
  clicksByModule: Record<string, number>;
  snake: {
    score: number;
    highestScore: number;
    gamesPlayed: number;
    wins: number;
    gameOvers: number;
    foodCollected: number;
    movements: number;
    up: number;
    down: number;
    left: number;
    right: number;
    currentGameStartedAt: number | null;
    totalGameTimeMs: number;
  };
  events: AnalyticsEvent[];
};

function createDefaultAnalyticsState(): AnalyticsState {
  const now = Date.now();

  return {
    session: {
      startedAt: now,
      lastActivityAt: now,
      currentModule: null,
      currentModuleStartedAt: null,
    },
    totals: {
      activities: 0,
      clicks: 0,
      rightClicks: 0,
      mouseMoves: 0,
      reloads: 0,
      moduleVisits: 0,
      uniqueModules: 0,
    },
    modules: {},
    clicksByModule: {},
    snake: {
      score: 0,
      highestScore: 0,
      gamesPlayed: 0,
      wins: 0,
      gameOvers: 0,
      foodCollected: 0,
      movements: 0,
      up: 0,
      down: 0,
      left: 0,
      right: 0,
      currentGameStartedAt: null,
      totalGameTimeMs: 0,
    },
    events: [],
  };
}

function formatDuration(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

function formatRelativeTime(timestamp: number, now: number) {
  const diff = Math.max(0, now - timestamp);
  const seconds = Math.floor(diff / 1000);

  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

function getModuleLabel(id: Module | string) {
  if (id === "home") return "Home";
  if (id === "about") return "About";
  if (id === "experience") return "Experience";
  if (id === "projects") return "Projects";
  if (id === "skills") return "Skills";
  if (id === "chat") return "Chat";
  if (id === "game") return "Game";
  if (id === "analytics") return "Analytics";

  return id;
}

type Skill = {
  name: string;
  icon: string;
};

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const modules: {
  id: Module;
  label: string;
  number: string;
  kicker: string;
}[] = [
  { id: "home", label: "Home", number: "01", kicker: "Introduction" },
  { id: "about", label: "About", number: "02", kicker: "Profile" },
  {
    id: "experience",
    label: "Experience",
    number: "03",
    kicker: "Experience",
  },
  {
    id: "projects",
    label: "Projects",
    number: "04",
    kicker: "Selected work",
  },
  { id: "skills", label: "Skills", number: "05", kicker: "Toolkit" },
  { id: "chat", label: "Chat", number: "06", kicker: "Ask about Stephen" },
  {
    id: "game",
    label: "Game",
    number: "07",
    kicker: "Snake",
  },
];
const skills: Record<string, Skill[]> = {
  Languages: [
    {
      name: "C#",
      icon: "devicon-csharp-plain",
    },
    {
      name: "JavaScript",
      icon: "devicon-javascript-plain",
    },
    {
      name: "TypeScript",
      icon: "devicon-typescript-plain",
    },
    {
      name: "HTML",
      icon: "devicon-html5-plain",
    },
    {
      name: "CSS",
      icon: "devicon-css3-plain",
    },
  ],

  Frameworks: [
    {
      name: "ASP.NET",
      icon: "devicon-dotnetcore-plain",
    },
    {
      name: "Next.js",
      icon: "devicon-nextjs-plain",
    },
    {
      name: "Node.js",
      icon: "devicon-nodejs-plain",
    },
    {
      name: "Bootstrap",
      icon: "devicon-bootstrap-plain",
    },
    {
      name: "Tailwind CSS",
      icon: "devicon-tailwindcss-original",
    },
    {
      name: "jQuery",
      icon: "devicon-jquery-plain",
    },
  ],

  Database: [
    {
      name: "MS SQL Server",
      icon: "devicon-microsoftsqlserver-plain",
    },
  ],

  Tools: [
    {
      name: "Git",
      icon: "devicon-git-plain",
    },
    {
      name: "GitHub",
      icon: "devicon-github-original",
    },
    {
      name: "VS Code",
      icon: "devicon-vscode-plain",
    },
    {
      name: "Visual Studio",
      icon: "devicon-visualstudio-plain",
    },
    {
      name: "Postman",
      icon: "devicon-postman-plain",
    },
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
    // year: "CURRENT",
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
    // year: "PREVIOUS",
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
    short:
      "A centralized operational system for procurement, inventory and business control.",
    description:
      "Enterprise ERP solution designed to streamline procurement, inventory, asset management, approval workflows, and operational reporting through a centralized business platform.",
    modules: [
      "Procure-to-Pay",
      "Inventory Management",
      "Asset Management",
      "Approval Workflows",
      "User Access",
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
      "Improved operational efficiency, data accuracy, process control, and system governance while providing real-time business visibility.",
  },
  {
    number: "02",
    category: "HRIS",
    title: "Human Resource Information System",
    short:
      "Workforce administration redesigned as one connected digital workflow.",
    description:
      "Human Resource Information System designed to centralize employee records and automate workforce administration, attendance, leave, scheduling, and HR service processes.",
    modules: [
      "Employee Records",
      "Attendance",
      "Leave Management",
      "Overtime",
      "Travel Requests",
      "Calendar",
      "Service Providers",
    ],
    highlights: [
      "Workflow Automation",
      "Workforce Management",
      "Centralized HR Data",
      "HR Analytics",
      "Reporting",
    ],
    impact:
      "Improved workforce management efficiency by automating HR processes and providing structured data for workforce planning.",
  },
  {
    number: "03",
    category: "DASHBOARD",
    title: "IT & Asset Management",
    short:
      "A visual command center for understanding the organization's physical technology.",
    description:
      "Centralized dashboard solution for monitoring IT assets and inventory, providing visibility into asset status, ownership, location, availability, and lifecycle.",
    modules: [
      "Asset Tracking",
      "Inventory Monitoring",
      "Ownership",
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
      "Improved asset visibility, accountability, and management through centralized monitoring and real-time reporting.",
  },
  {
    number: "04",
    category: "HRIS",
    title: "Lapanday HRIS",
    short:
      "An enterprise HR platform connecting employee lifecycle, recruitment and workforce operations.",
    description:
      "Enterprise HRIS solution supporting workforce administration, employee lifecycle management, attendance tracking, recruitment operations, scheduling, and centralized HR data management.",
    modules: [
      "Employee Management",
      "PDS",
      "Attendance",
      "Travel Orders",
      "Recruitment",
      "Applicant Tracking",
      "Scheduling",
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
      "Improved HR operational efficiency and workforce visibility through centralized employee data and automated recruitment workflows.",
  },
];

const initialChat: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hi! I'm Stephen's assistant. Ask me about his experience, projects, skills, HRIS/ERP work, or how you can get in touch.",
  },
];

const DESKTOP_SIDEBAR_WIDTH = 260;
const COLLAPSED_SIDEBAR_WIDTH = 72;

/* ============================================================
   PAGE
============================================================ */

export default function HomePage() {
  const [activeModule, setActiveModule] = useState<Module>("home");
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [themeTransitioning, setThemeTransitioning] = useState<Theme | null>(null);
  const [themePulse, setThemePulse] = useState(0);

  const [overlay, setOverlay] = useState<Overlay>(null);
  const [analytics, setAnalytics] = useState<AnalyticsState>(() => {
    if (typeof window === "undefined") {
      return createDefaultAnalyticsState();
    }

    const saved = sessionStorage.getItem("stephen-session-analytics");

    if (!saved) return createDefaultAnalyticsState();

    try {
      const parsed = JSON.parse(saved) as AnalyticsState;

      if (parsed?.session?.startedAt) {
        return parsed;
      }
    } catch {
      // Ignore invalid persisted session state.
    }

    return createDefaultAnalyticsState();
  });
  const [dashboardTick, setDashboardTick] = useState(Date.now());

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChat);

  const refs = useRef<Record<Module, HTMLElement | null>>({
    home: null,
    about: null,
    experience: null,
    projects: null,
    skills: null,
    chat: null,
    game: null,
    analytics: null,
  });

  /*
   * The actual desktop sidebar width.
   *
   * 260px = expanded
   * 72px  = collapsed
   * 0px   = closed
   */
  const desktopSidebarWidth = !sidebarOpen
    ? 0
    : sidebarCollapsed
      ? COLLAPSED_SIDEBAR_WIDTH
      : DESKTOP_SIDEBAR_WIDTH;

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "stephen-session-analytics",
        JSON.stringify(analytics),
      );
    }
  }, [analytics]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDashboardTick(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const moduleName =
        target?.closest("[data-analytics-module]")?.getAttribute("data-analytics-module") ??
        activeModule;

      if (event.button === 2) {
        trackActivity({
          type: "right_click",
          action: "Right-clicked interface",
          module: moduleName || "Home",
        });
        return;
      }

      trackActivity({
        type: "click",
        action: "Clicked interface",
        module: moduleName || "Home",
      });
    };

    const handleMouseMove = () => {
      const now = Date.now();
      const lastMove = (handleMouseMove as typeof handleMouseMove & {
        lastMoveAt?: number;
      }).lastMoveAt ?? 0;

      if (now - lastMove < 900) return;
      (handleMouseMove as typeof handleMouseMove & { lastMoveAt?: number }).lastMoveAt = now;

      trackActivity({
        type: "mouse_move",
        action: "Mouse movement",
        module: activeModule || "Home",
      });
    };

    const handleReload = () => {
      trackActivity({
        type: "reload",
        action: "Page reloaded or closed",
        module: activeModule || "Home",
      });
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("contextmenu", handlePointerDown as EventListener);
    window.addEventListener("beforeunload", handleReload);
    window.addEventListener("pagehide", handleReload);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("contextmenu", handlePointerDown as EventListener);
      window.removeEventListener("beforeunload", handleReload);
      window.removeEventListener("pagehide", handleReload);
    };
  }, [activeModule]);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as Theme | null;

    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial =
      saved === "dark" || saved === "light"
        ? saved
        : preferred
          ? "dark"
          : "light";

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setTheme(initial);
    setActiveModule("home");
    document.documentElement.classList.toggle("dark", initial === "dark");

    const timer = setTimeout(() => setLoading(false), 700);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");

    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!themeTransitioning) return;

    const timer = setTimeout(() => setThemeTransitioning(null), 720);

    return () => clearTimeout(timer);
  }, [themeTransitioning]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 700);

      const scrollModules: Module[] = [
        "home",
        "about",
        "experience",
        "projects",
        "skills",
      ];

      let current: Module = "home";
      let smallest = Infinity;

      scrollModules.forEach((id) => {
        const element = refs.current[id];

        if (!element) return;

        const distance = Math.abs(
          element.getBoundingClientRect().top - window.innerHeight * 0.25,
        );

        if (distance < smallest) {
          smallest = distance;
          current = id;
        }
      });

      if (!overlay) {
        setActiveModule(current);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [overlay]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    const elements = document.querySelectorAll(".reveal");

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [loading]);

  /*
   * Lock the page while chat/game is open.
   */
  useEffect(() => {
    const win = window as typeof window & {
      __portfolioScrollY?: number;
    };

    if (!overlay) {
      const root = document.documentElement;
      const body = document.body;

      root.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.left = "";
      body.style.right = "";
      window.scrollTo({ top: win.__portfolioScrollY ?? 0, behavior: "auto" });
      delete win.__portfolioScrollY;
      return;
    }

    const root = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    win.__portfolioScrollY = scrollY;
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      root.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";

      const savedY = win.__portfolioScrollY ?? 0;
      delete win.__portfolioScrollY;
      window.scrollTo({ top: savedY, behavior: "auto" });
    };
  }, [overlay]);

  /*
   * Escape handling.
   */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setMenuOpen(false);

      if (overlay === "chat" || overlay === "game" || overlay === "analytics") {
        closeOverlay();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [overlay]);

  /*
   * When Chat or Game opens on desktop, keep the sidebar visible.
   *
   * We intentionally do NOT uncollapse it. If the user had a
   * collapsed sidebar, Chat/Game will stay beside the 72px sidebar.
   */
  function openSidebarForOverlay() {
    setSidebarOpen(true);
  }

  function trackActivity(input: {
    type: AnalyticsEventType;
    action: string;
    module: string;
    direction?: "up" | "down" | "left" | "right";
    score?: number;
  }) {
    setAnalytics((previous) => {
      const now = Date.now();
      const next: AnalyticsState = {
        session: {
          ...previous.session,
          lastActivityAt: now,
        },
        totals: {
          ...previous.totals,
          activities: previous.totals.activities + 1,
        },
        modules: { ...previous.modules },
        clicksByModule: { ...previous.clicksByModule },
        snake: { ...previous.snake },
        events: [
          {
            id: `${now}-${Math.random().toString(36).slice(2, 10)}`,
            type: input.type,
            action: input.action,
            module: input.module,
            direction: input.direction,
            timestamp: now,
            score: input.score,
          },
          ...previous.events,
        ].slice(0, 12),
      };

      if (input.type === "click") {
        next.totals.clicks += 1;
        next.clicksByModule[input.module] =
          (next.clicksByModule[input.module] ?? 0) + 1;
      }

      if (input.type === "right_click") {
        next.totals.rightClicks += 1;
      }

      if (input.type === "mouse_move") {
        next.totals.mouseMoves += 1;
      }

      if (input.type === "reload") {
        next.totals.reloads += 1;
      }

      if (input.type === "module_visit") {
        const currentModule = input.module;
        const record = next.modules[currentModule] ?? {
          visits: 0,
          firstVisitAt: now,
          lastVisitAt: now,
          totalTimeMs: 0,
          active: true,
        };

        record.visits += 1;
        record.firstVisitAt = record.firstVisitAt ?? now;
        record.lastVisitAt = now;
        record.active = true;
        next.modules[currentModule] = record;
        next.totals.moduleVisits += 1;
      }

      if (input.type === "game_start") {
        next.snake.gamesPlayed += 1;
        next.snake.currentGameStartedAt = now;
      }

      if (input.type === "game_over") {
        next.snake.gameOvers += 1;
        next.snake.currentGameStartedAt = null;
      }

      if (input.type === "game_win") {
        next.snake.wins += 1;
        next.snake.currentGameStartedAt = null;
      }

      if (input.type === "snake_food") {
        next.snake.foodCollected += 1;
      }

      if (input.type === "snake_move") {
        next.snake.movements += 1;

        if (input.direction === "up") next.snake.up += 1;
        if (input.direction === "down") next.snake.down += 1;
        if (input.direction === "left") next.snake.left += 1;
        if (input.direction === "right") next.snake.right += 1;

        if (typeof input.score === "number") {
          next.snake.score = input.score;
          next.snake.highestScore = Math.max(
            next.snake.highestScore,
            input.score,
          );
        }
      }

      if (input.score !== undefined && input.type !== "snake_move") {
        next.snake.score = Math.max(next.snake.score, input.score);
        next.snake.highestScore = Math.max(
          next.snake.highestScore,
          input.score,
        );
      }

      if (next.session.currentModule) {
        const activeEntry = next.modules[next.session.currentModule] ?? {
          visits: 0,
          firstVisitAt: now,
          lastVisitAt: now,
          totalTimeMs: 0,
          active: true,
        };

        activeEntry.active = true;
        next.modules[next.session.currentModule] = activeEntry;
      }

      next.totals.uniqueModules = Object.values(next.modules).filter(
        (module) => module.visits > 0,
      ).length;

      return next;
    });
  }

  function trackModuleVisit(moduleName: string) {
    setAnalytics((previous) => {
      const now = Date.now();
      const previousModule = previous.session.currentModule;
      const nextModules = { ...previous.modules };

      if (previousModule && previousModule !== moduleName) {
        const lastEntry = nextModules[previousModule] ?? {
          visits: 0,
          firstVisitAt: now,
          lastVisitAt: now,
          totalTimeMs: 0,
          active: true,
        };

        const startedAt =
          previous.session.currentModuleStartedAt ?? previous.session.startedAt;

        lastEntry.totalTimeMs += Math.max(0, now - startedAt);
        lastEntry.active = false;
        nextModules[previousModule] = lastEntry;
      }

      const entry = nextModules[moduleName] ?? {
        visits: 0,
        firstVisitAt: now,
        lastVisitAt: now,
        totalTimeMs: 0,
        active: true,
      };

      entry.visits += 1;
      entry.firstVisitAt = entry.firstVisitAt ?? now;
      entry.lastVisitAt = now;
      entry.active = true;
      nextModules[moduleName] = entry;

      const visitEvent: AnalyticsEvent = {
        id: `${now}-${Math.random().toString(36).slice(2, 10)}`,
        type: "module_visit",
        action: `Opened ${moduleName}`,
        module: moduleName,
        timestamp: now,
      };

      const nextState: AnalyticsState = {
        ...previous,
        session: {
          ...previous.session,
          currentModule: moduleName,
          currentModuleStartedAt: now,
          lastActivityAt: now,
        },
        totals: {
          ...previous.totals,
          activities: previous.totals.activities + 1,
          moduleVisits: previous.totals.moduleVisits + 1,
        },
        modules: nextModules,
        events: [visitEvent, ...previous.events].slice(0, 12),
      };

      return nextState;
    });
  }

  function navigate(id: Module) {
    setMenuOpen(false);

    const moduleName = getModuleLabel(id);

    if (id === "analytics") {
      openSidebarForOverlay();
      setActiveModule("analytics");
      setOverlay("analytics");
      trackModuleVisit("Analytics");
      return;
    }

    if (id === "chat") {
      /*
       * IMPORTANT:
       * Chat is fullscreen only inside the content area.
       * The desktop sidebar remains visible.
       */
      openSidebarForOverlay();

      setActiveModule("chat");
      setOverlay("chat");
      trackModuleVisit("Chat");
      return;
    }

    if (id === "game") {
      /*
       * Same behavior for the game.
       */
      openSidebarForOverlay();

      setActiveModule("game");
      setOverlay("game");
      trackModuleVisit("Game");
      return;
    }

    setOverlay(null);
    setActiveModule(id);
    trackModuleVisit(moduleName);

    refs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function closeOverlay() {
    setOverlay(null);

    /*
     * Do NOT force the sidebar to expanded mode.
     *
     * If the user had:
     * - 260px sidebar -> stays 260px
     * - 72px sidebar  -> stays 72px
     * - closed sidebar -> this normally cannot happen because
     *   opening Chat/Game temporarily opens it.
     */
    setSidebarOpen(true);

    window.requestAnimationFrame(() => {
      const scrollModules: Module[] = [
        "home",
        "about",
        "experience",
        "projects",
        "skills",
      ];

      let current: Module = "home";
      let smallest = Infinity;

      scrollModules.forEach((id) => {
        const element = refs.current[id];

        if (!element) return;

        const distance = Math.abs(
          element.getBoundingClientRect().top - window.innerHeight * 0.25,
        );

        if (distance < smallest) {
          smallest = distance;
          current = id;
        }
      });

      setActiveModule(current);
    });
  }

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function toggleTheme() {
    setTheme((current) => {
      const nextTheme = current === "light" ? "dark" : "light";
      setThemeTransitioning(nextTheme);
      setThemePulse((value) => value + 1);
      return nextTheme;
    });

    trackActivity({
      type: "click",
      action: "Toggled theme",
      module: "Home",
    });
  }

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800;900&display=swap");

        :root {
          --bg: #f7f7f8;
          --surface: #ffffff;
          --surface-2: #f0f0f1;
          --surface-3: #e8e8e9;

          --text: #171717;
          --muted: #6b6b6b;
          --muted-2: #9a9a9a;

          --line: #e5e5e5;
          --line-strong: #d4d4d4;

          --sidebar: #f9f9fa;
          --sidebar-hover: #eeeeef;

          --black: #171717;
          --white: #ffffff;

          --sidebar-width: 260px;
          --content-width: 1180px;
        }

        .dark {
          --bg: #212121;
          --surface: #2b2b2b;
          --surface-2: #303030;
          --surface-3: #3a3a3a;

          --text: #f5f5f5;
          --muted: #b4b4b4;
          --muted-2: #777777;

          --line: #414141;
          --line-strong: #4b4b4b;

          --sidebar: #171717;
          --sidebar-hover: #2a2a2a;

          --black: #ffffff;
          --white: #171717;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          background: var(--bg);
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background: var(--bg);
          color: var(--text);
          font-family: "Inter", sans-serif;
        }

        button,
        input,
        textarea {
          font: inherit;
        }

        button,
        a {
          -webkit-tap-highlight-color: transparent;
        }

        ::selection {
          background: #171717;
          color: white;
        }

        .dark ::selection {
          background: white;
          color: #171717;
        }

        .mono {
          font-family: "DM Mono", monospace;
        }

        /*
         * MAIN CONTENT
         *
         * The actual margin is supplied through the inline
         * desktop layout style so 260px / 72px / 0px all work.
         */
        .portfolio-main {
          transition:
            margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            width 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.8s ease,
            filter 0.8s ease;
          min-width: 0;
        }

        .content-container {
          width: 100%;
          max-width: var(--content-width);
          margin: auto;
        }

        /*
         * Full viewport overlays use dynamic left offsets on desktop.
         */
        .desktop-overlay {
          transition:
            left 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .chat-scrollbar::-webkit-scrollbar {
          width: 7px;
        }

        .chat-scrollbar::-webkit-scrollbar-thumb {
          background: var(--line-strong);
          border-radius: 999px;
        }

        .chat-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar-item {
          transition:
            background-color 0.15s ease,
            color 0.15s ease;
        }

        .sidebar-item:hover {
          background: var(--sidebar-hover);
        }

        .sidebar-item.active {
          background: var(--sidebar-hover);
          color: var(--text);
        }

        .sidebar-item.active .sidebar-icon {
          color: var(--text);
        }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.7s ease,
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-1 {
          transition-delay: 0.08s;
        }

        .delay-2 {
          transition-delay: 0.16s;
        }

        .delay-3 {
          transition-delay: 0.24s;
        }

        .portfolio-card {
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .portfolio-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
        }

        .dark .portfolio-card:hover {
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
        }

        .chat-message {
          animation: messageIn 0.25s ease;
        }

        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .typing-dot {
          animation: typing 1.2s infinite ease-in-out;
        }

        .typing-dot:nth-child(2) {
          animation-delay: 0.15s;
        }

        .typing-dot:nth-child(3) {
          animation-delay: 0.3s;
        }

        @keyframes typing {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.35;
          }

          30% {
            transform: translateY(-3px);
            opacity: 1;
          }
        }

        .theme-transition {
          pointer-events: none;
          z-index: 9998;
          transform-origin: center;
          animation: themeDrop 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          backdrop-filter: blur(2px) saturate(1.1);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
        }

        @keyframes themeDrop {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(-24px);
            border-radius: 70% 30% 68% 32% / 56% 40% 60% 44%;
          }

          20% {
            opacity: 1;
          }

          52% {
            opacity: 1;
            transform: scale(1.08) translateY(0);
            border-radius: 50% 50% 52% 48% / 52% 48% 52% 48%;
          }

          100% {
            opacity: 0;
            transform: scale(1.5) translateY(0);
            border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
          }
        }

        .snake-cell {
          transition: background-color 0.05s linear;
        }

        .snake-grid {
          background-image:
            linear-gradient(rgba(127, 127, 127, 0.08) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(127, 127, 127, 0.08) 1px,
              transparent 1px
            );
          background-size: 5% 5%;
        }

        /*
         * TABLET + MOBILE
         *
         * Desktop sidebar is completely removed below lg.
         * The mobile drawer handles these sizes.
         */
        @media (max-width: 1023px) {
          .portfolio-main {
            margin-left: 0 !important;
            width: 100% !important;
          }

          .desktop-overlay {
            left: 0 !important;
            width: 100% !important;
          }
        }

        /*
         * Smaller phones.
         */
        @media (max-width: 639px) {
          .content-container {
            max-width: 100%;
          }

          textarea {
            font-size: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }

          .reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* ============================================================
          LOADER
      ============================================================ */}

      <div
        className={`fixed inset-0 z-[9999] transition-[transform,background-color,opacity] duration-700 ease-out ${
          theme === "dark" ? "bg-[#111111]" : "bg-white"
        } ${loading ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      />

      {themeTransitioning && (
        <div
          key={themePulse}
          className="theme-transition fixed inset-0 z-[9997]"
          style={{
            background:
              themeTransitioning === "dark"
                ? "radial-gradient(circle at center, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.75) 35%, rgba(17,17,17,0) 100%)"
                : "radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.82) 35%, rgba(255,255,255,0) 100%)",
          }}
        />
      )}

      {/* ============================================================
          MOBILE HEADER
      ============================================================ */}

      <header className="fixed left-0 right-0 top-0 z-[150] flex h-14 items-center justify-between border-b border-[var(--line)] bg-[var(--bg)]/95 px-3 backdrop-blur-xl lg:hidden">
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#171717] text-[10px] font-black text-white dark:bg-white dark:text-black">
            SJ
          </span>

          <span className="text-sm font-semibold">Stephen J.</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--surface-2)]"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[var(--surface-2)]"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {/* ============================================================
    DESKTOP SIDEBAR
============================================================ */}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-[120] hidden border-r border-[var(--line)] bg-[var(--sidebar)] transition-all duration-300 lg:block ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarCollapsed ? "w-[72px]" : "w-[260px]"}`}
      >
        <div className="flex h-full flex-col px-2 py-3">
          {/* Header */}

          <div
            className={`flex h-10 items-center ${
              sidebarCollapsed ? "justify-center" : "justify-between px-1"
            }`}
          >
            {sidebarCollapsed ? (
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--sidebar-hover)]"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("home")}
                  className="flex min-w-0 items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-[var(--sidebar-hover)]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#171717] text-[10px] font-black text-white dark:bg-white dark:text-black">
                    SJ
                  </span>

                  <span className="truncate whitespace-nowrap text-sm font-semibold">
                    Stephen J.
                  </span>
                </button>

                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--sidebar-hover)]"
                  title="Collapse sidebar"
                  aria-label="Collapse sidebar"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Main navigation */}

          <nav className="mt-6 space-y-1">
            {modules
              .filter((module) => module.id !== "chat" && module.id !== "game")
              .map((module) => {
                const active = activeModule === module.id;

                return (
                  <button
                    key={module.id}
                    onClick={() => navigate(module.id)}
                    title={sidebarCollapsed ? module.label : undefined}
                    className={`sidebar-item flex h-10 w-full items-center rounded-lg text-left text-sm transition-all ${
                      sidebarCollapsed ? "justify-center px-0" : "gap-3 px-3"
                    } ${active ? "active font-medium" : "text-[var(--muted)]"}`}
                  >
                    <span className="sidebar-icon flex h-5 w-5 shrink-0 items-center justify-center text-[var(--muted)]">
                      <ModuleIcon id={module.id} />
                    </span>

                    {!sidebarCollapsed && (
                      <span className="min-w-0 flex-1 truncate">
                        {module.label}
                      </span>
                    )}
                  </button>
                );
              })}
          </nav>

          <div className="flex-1" />

          {/* Bottom navigation */}

          <div className="border-t border-[var(--line)] pt-3">
            {/* Chat */}

            <button
              onClick={() => navigate("chat")}
              title={sidebarCollapsed ? "Chat" : undefined}
              className={`sidebar-item flex h-10 w-full items-center rounded-lg text-left text-sm ${
                sidebarCollapsed ? "justify-center px-0" : "gap-3 px-3"
              } ${
                activeModule === "chat"
                  ? "active font-medium"
                  : "text-[var(--muted)]"
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <MessageIcon />
              </span>

              {!sidebarCollapsed && (
                <>
                  <span className="min-w-0 flex-1 truncate">Chat</span>

                  <span className="shrink-0 text-[9px] text-[var(--muted-2)]">
                    ASK
                  </span>
                </>
              )}
            </button>

            {/* Game — desktop only */}

            <button
              data-analytics-module="Game"
              onClick={() => navigate("game")}
              title={sidebarCollapsed ? "Game" : undefined}
              className={`sidebar-item flex h-10 w-full items-center rounded-lg text-left text-sm ${
                sidebarCollapsed ? "justify-center px-0" : "gap-3 px-3"
              } ${
                activeModule === "game"
                  ? "active font-medium"
                  : "text-[var(--muted)]"
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <GameIcon />
              </span>

              {!sidebarCollapsed && (
                <>
                  <span className="min-w-0 flex-1 truncate">Game</span>

                  <span className="shrink-0 text-[9px] text-[var(--muted-2)]">
                    SNAKE
                  </span>
                </>
              )}
            </button>

            <button
              data-analytics-module="Analytics"
              onClick={() => navigate("analytics")}
              title={sidebarCollapsed ? "Analytics" : undefined}
              className={`sidebar-item flex h-10 w-full items-center rounded-lg text-left text-sm ${
                sidebarCollapsed ? "justify-center px-0" : "gap-3 px-3"
              } ${
                activeModule === "analytics"
                  ? "active font-medium"
                  : "text-[var(--muted)]"
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <BarChartIcon />
              </span>

              {!sidebarCollapsed && (
                <>
                  <span className="min-w-0 flex-1 truncate">Analytics</span>

                  <span className="shrink-0 text-[9px] text-[var(--muted-2)]">
                    LIVE
                  </span>
                </>
              )}
            </button>

            <div className="my-2 border-t border-[var(--line)]" />

            {/* Theme */}

            <button
              onClick={toggleTheme}
              title={
                sidebarCollapsed
                  ? theme === "light"
                    ? "Dark mode"
                    : "Light mode"
                  : undefined
              }
              className={`sidebar-item flex h-10 w-full items-center rounded-lg text-left text-sm text-[var(--muted)] ${
                sidebarCollapsed ? "justify-center px-0" : "gap-3 px-3"
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                {theme === "light" ? <MoonIcon /> : <SunIcon />}
              </span>

              {!sidebarCollapsed && (
                <span className="truncate">
                  {theme === "light" ? "Dark mode" : "Light mode"}
                </span>
              )}
            </button>

            {/* Email */}

            <a
              href="mailto:sjaferrer1@gmail.com"
              title={sidebarCollapsed ? "Email" : undefined}
              className={`sidebar-item flex h-10 w-full items-center rounded-lg text-sm text-[var(--muted)] ${
                sidebarCollapsed ? "justify-center px-0" : "gap-3 px-3"
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <EmailIcon />
              </span>

              {!sidebarCollapsed && <span className="truncate">Email</span>}
            </a>

            {/* LinkedIn */}

            <a
              href="https://www.linkedin.com/in/stephen-john-f-964557318/"
              target="_blank"
              rel="noopener noreferrer"
              title={sidebarCollapsed ? "LinkedIn" : undefined}
              className={`sidebar-item flex h-10 w-full items-center rounded-lg text-sm text-[var(--muted)] ${
                sidebarCollapsed ? "justify-center px-0" : "gap-3 px-3"
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <LinkedInIcon />
              </span>

              {!sidebarCollapsed && <span className="truncate">LinkedIn</span>}
            </a>
          </div>
        </div>
      </aside>

      {/* ============================================================
    DESKTOP SIDEBAR OPEN BUTTON
============================================================ */}

      <button
        onClick={() => setSidebarOpen(true)}
        className={`fixed left-4 top-4 z-[140] hidden h-9 w-9 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] shadow-sm transition-all duration-300 lg:flex ${
          sidebarOpen
            ? "pointer-events-none -translate-x-2 opacity-0"
            : "translate-x-0 opacity-100"
        }`}
        aria-label="Open sidebar"
      >
        <MenuIcon />
      </button>

      {/* ============================================================
    MOBILE MENU BACKDROP
============================================================ */}

      <div
        className={`fixed inset-0 z-[200] bg-black/50 transition-opacity lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* ============================================================
    MOBILE SIDEBAR
    Game / Snake intentionally removed
============================================================ */}

      <aside
  className={`fixed inset-0 z-[250] w-full touch-pan-y overscroll-contain bg-[var(--sidebar)] shadow-2xl transition-transform duration-300 lg:hidden ${
    menuOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  <div className="flex h-full flex-col overflow-y-auto overscroll-contain px-4 py-3">
    {/* Header */}

    <div className="flex h-10 items-center justify-between px-1">
      <button
        onClick={() => navigate("home")}
        className="flex min-w-0 items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-[var(--sidebar-hover)]"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#171717] text-[10px] font-black text-white dark:bg-white dark:text-black">
          SJ
        </span>

        <span className="truncate whitespace-nowrap text-sm font-semibold">
          Stephen J.
        </span>
      </button>

      <button
        onClick={() => setMenuOpen(false)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--sidebar-hover)]"
        title="Close menu"
        aria-label="Close menu"
      >
        <CloseIcon />
      </button>
    </div>

    {/* Main navigation */}

    <nav className="mt-6 space-y-1">
      {modules
        .filter(
          (module) =>
            module.id !== "chat" &&
            module.id !== "game"
        )
        .map((module) => (
          <button
            key={module.id}
            onClick={() => navigate(module.id)}
            className={`sidebar-item flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm ${
              activeModule === module.id
                ? "active font-medium"
                : "text-[var(--muted)]"
            }`}
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center">
              <ModuleIcon id={module.id} />
            </span>

            <span className="min-w-0 flex-1 truncate">
              {module.label}
            </span>
          </button>
        ))}
    </nav>

    <div className="flex-1" />

    {/* Bottom navigation */}

    <div className="mt-6 border-t border-[var(--line)] pt-3">
      {/* Chat — available on mobile */}

      <button
        onClick={() => navigate("chat")}
        className={`sidebar-item flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm ${
          activeModule === "chat"
            ? "active font-medium"
            : "text-[var(--muted)]"
        }`}
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
          <MessageIcon />
        </span>

        <span className="min-w-0 flex-1 truncate">
          Chat
        </span>

        <span className="shrink-0 text-[9px] text-[var(--muted-2)]">
          ASK
        </span>
      </button>

      {/* Game / Snake removed from mobile */}

      <div className="my-2 border-t border-[var(--line)]" />

      {/* Theme */}

      <button
        onClick={toggleTheme}
        className="sidebar-item flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm text-[var(--muted)]"
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </span>

        <span className="truncate">
          {theme === "light" ? "Dark mode" : "Light mode"}
        </span>
      </button>

      {/* Email */}

      <a
        href="mailto:sjaferrer1@gmail.com"
        className="sidebar-item flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm text-[var(--muted)]"
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
          <EmailIcon />
        </span>

        <span className="truncate">
          Email
        </span>
      </a>

      {/* LinkedIn */}

      <a
        href="https://www.linkedin.com/in/stephen-john-f-964557318/"
        target="_blank"
        rel="noopener noreferrer"
        className="sidebar-item flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm text-[var(--muted)]"
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
          <LinkedInIcon />
        </span>

        <span className="truncate">
          LinkedIn
        </span>
      </a>
    </div>

    {/* Mobile notice */}

    {/* <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--sidebar-hover)] px-3 py-3">
      <div className="flex gap-2.5">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[var(--foreground)] text-[9px] font-bold text-[var(--background)]">
          i
        </span>

        <div className="min-w-0">
          <p className="text-[11px] font-semibold">
            Web version required
          </p>

          <p className="mt-1 text-[10px] leading-relaxed text-[var(--muted)]">
            Some modules are available only in the web version. 
          </p>
        </div>

      </div>
    </div> */}
  </div>
</aside>


      {/* ============================================================
          MAIN CONTENT

          IMPORTANT:
          The inline margin dynamically follows:

          open expanded  = 260px
          open collapsed = 72px
          closed         = 0px
      ============================================================ */}

      <main
        className="portfolio-main"
        style={
          {
            "--desktop-sidebar-width": `${desktopSidebarWidth}px`,
            opacity: loading ? 0 : 1,
            filter: loading ? "blur(8px)" : "blur(0px)",
          } as React.CSSProperties
        }
      >
        <div
          className="lg:transition-[margin-left] lg:duration-300"
          style={{
            marginLeft: 0,
            opacity: loading ? 0 : 1,
            transition: "opacity 0.8s ease, filter 0.8s ease",
            filter: loading ? "blur(10px)" : "blur(0px)",
          }}
        >
          {/* ========================================================
    HOME — WHITE
======================================================== */}

          {/* ========================================================
    HOME — WHITE
======================================================== */}

          <section
            ref={(el) => {
              refs.current.home = el;
            }}
            className="min-h-screen bg-white text-[#171717] transition-colors dark:bg-[#111111] dark:text-white"
          >
            <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 pb-16 pt-28 sm:px-6 sm:pt-16">
              <div className="flex flex-1 flex-col justify-center">
                {/* ==================================================
          INTRO
      ================================================== */}

                <div className="reveal">
                  <span className="block pl-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                    Full Stack Developer · Systems Analyst
                  </span>
                </div>

                {/* ==================================================
          HERO
      ================================================== */}

                <h1 className="reveal delay-1 mt-7 max-w-5xl text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[0.87] tracking-[-0.075em]">
                  <span className="block">I build systems</span>

                  <span className="block text-[var(--muted)]">
                    that make work simpler.
                  </span>
                </h1>

                {/* ==================================================
          DESCRIPTION
      ================================================== */}

                <div className="mt-9 max-w-3xl">
                  <p className="reveal delay-2 text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                    I'm Stephen J., a Full Stack Developer focused on building
                    reliable enterprise applications, HRIS platforms, ERP
                    systems, dashboards, APIs, databases, and business process
                    automation.
                  </p>

                  {/* ==================================================
            ACTIONS
        ================================================== */}

                  <div className="reveal delay-3 mt-8 flex flex-wrap items-center gap-3">
                    {/* PRIMARY — PROJECTS */}
                    <button
                      onClick={() => navigate("projects")}
                      className="group inline-flex items-center gap-2 rounded-xl bg-[#171717] px-5 py-3 text-sm font-medium text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#292929] dark:bg-white dark:text-black dark:hover:bg-[#e5e5e5]"
                    >
                      <span>View projects</span>

                      <svg
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </button>

                    {/* SECONDARY — ABOUT */}
                    <button
                      onClick={() => navigate("about")}
                      className="group inline-flex items-center gap-2 rounded-xl border border-black/[0.1] bg-white px-5 py-3 text-sm font-medium text-[#30302e] transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:bg-[#F5F5F5] dark:border-white/[0.1] dark:bg-[#111111] dark:text-white dark:hover:border-white/20 dark:hover:bg-[#1a1a1a]"
                    >
                      <span>More about me</span>

                      <svg
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </button>

                    {/* TERTIARY — CHAT */}
                    <button
                      onClick={() => navigate("chat")}
                      className="group inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-[var(--muted)] transition-colors duration-200 hover:text-[#171717] dark:hover:text-white"
                    >
                      <svg
                        className="h-4 w-4 transition-transform duration-200 group-hover:scale-105"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                      </svg>

                      <span>Ask Assistant</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ======================================================
        BOTTOM METADATA
    ====================================================== */}

              <div className="reveal mt-16 border-t border-black/[0.08] pt-6 dark:border-white/[0.08]">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="mono text-[9px] uppercase tracking-[0.2em] text-[var(--muted-2)]">
                    Areas of focus
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                    <span>ERP</span>

                    <span className="h-1 w-1 rounded-full bg-black/20 dark:bg-white/20" />

                    <span>HRIS</span>

                    <span className="h-1 w-1 rounded-full bg-black/20 dark:bg-white/20" />

                    <span>APIs</span>

                    <span className="h-1 w-1 rounded-full bg-black/20 dark:bg-white/20" />

                    <span>Dashboards</span>

                    <span className="h-1 w-1 rounded-full bg-black/20 dark:bg-white/20" />

                    <span>Automation</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
        ABOUT — LIGHT GRAY
    ======================================================== */}

          <section
            ref={(el) => {
              refs.current.about = el;
            }}
            className="border-t border-black/[0.08] bg-[#F5F5F5] py-24 text-[#171717] transition-colors dark:border-white/[0.08] dark:bg-[#181818] dark:text-white"
          >
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
              <SectionHeader number="02" title="About" />

              <div className="mt-12 grid gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="reveal max-w-3xl text-[clamp(2.8rem,5vw,5rem)] font-bold leading-[.92] tracking-[-.065em]">
                    Technology should
                    <br />
                    <span className="text-[var(--muted)]">
                      make work simpler.
                    </span>
                  </h2>
                </div>

                <div className="reveal max-w-3xl space-y-5 text-base leading-7 text-[var(--muted)]">
                  <p>
                    I'm a Full Stack Developer specializing in enterprise
                    application development with experience in Human Resource
                    Information Systems, Enterprise Resource Planning, and
                    business process automation.
                  </p>

                  <p>
                    My work moves across frontend interfaces, backend services,
                    database architecture, APIs, reporting, system workflows,
                    and the business requirements underneath them.
                  </p>

                  <p>
                    I enjoy understanding how an organization actually works,
                    then designing software that makes those processes simpler,
                    faster, and more reliable.
                  </p>
                </div>
              </div>

              <div className="reveal mt-14 rounded-3xl bg-[#171717] p-8 text-white sm:p-10 dark:bg-[#0d0d0d]">
                <div className="mono text-[9px] uppercase tracking-[.25em] text-white/40">
                  Working principle
                </div>

                <div className="mt-8 grid gap-8 sm:grid-cols-3">
                  <div>
                    <div className="text-3xl font-bold">01</div>

                    <div className="mt-2 text-lg font-semibold">
                      Understand.
                    </div>

                    <p className="mt-2 text-sm leading-6 text-white/45">
                      Understand the people, process, and problem.
                    </p>
                  </div>

                  <div>
                    <div className="text-3xl font-bold">02</div>

                    <div className="mt-2 text-lg font-semibold">Simplify.</div>

                    <p className="mt-2 text-sm leading-6 text-white/45">
                      Remove unnecessary complexity from the workflow.
                    </p>
                  </div>

                  <div>
                    <div className="text-3xl font-bold">03</div>

                    <div className="mt-2 text-lg font-semibold">Improve.</div>

                    <p className="mt-2 text-sm leading-6 text-white/45">
                      Build software that produces measurable value.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
    EXPERIENCE — WHITE
======================================================== */}

          <section
            ref={(el) => {
              refs.current.experience = el;
            }}
            className="border-t border-black/[0.08] bg-white py-24 text-[#171717] transition-colors dark:border-white/[0.08] dark:bg-[#111111] dark:text-white"
          >
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
              <SectionHeader number="03" title="Experience" />

              {/* Intro */}
              <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
                <h2 className="reveal max-w-3xl text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.88] tracking-[-0.07em]">
                  Built in the
                  <br />
                  <span className="text-[var(--muted)]">real world.</span>
                </h2>

                <p className="reveal max-w-xs text-sm leading-6 text-[var(--muted)]">
                  Experience across enterprise applications, business systems,
                  software development, and process automation.
                </p>
              </div>

              {/* Experience list */}
              <div className="mt-14 space-y-5">
                {experiences.map((experience, index) => (
                  <ExperienceCard
                    key={experience.company}
                    experience={experience}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ========================================================
        PROJECTS — LIGHT GRAY
    ======================================================== */}

          <section
            ref={(el) => {
              refs.current.projects = el;
            }}
            className="border-t border-black/[0.08] bg-[#F5F5F5] py-24 text-[#171717] transition-colors dark:border-white/[0.08] dark:bg-[#181818] dark:text-white"
          >
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
              <SectionHeader number="04" title="Selected work" />

              <div className="reveal mt-12 max-w-3xl">
                <h2 className="text-[clamp(3rem,6vw,6rem)] font-bold leading-[.88] tracking-[-.07em]">
                  Systems behind
                  <br />
                  <span className="text-[var(--muted)]">the work.</span>
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-7 text-[var(--muted)]">
                  Enterprise systems, dashboards, HRIS platforms, automation
                  workflows, and software built around practical business
                  problems.
                </p>
              </div>

              <div className="mt-12 grid gap-5 md:grid-cols-2">
                {projects.map((project) => (
                  <ProjectCard key={project.number} project={project} />
                ))}
              </div>
            </div>
          </section>

          {/* ========================================================
    SKILLS — WHITE
======================================================== */}

          <section
            ref={(el) => {
              refs.current.skills = el;
            }}
            className="border-t border-black/[0.08] bg-white py-24 text-[#171717] transition-colors dark:border-white/[0.08] dark:bg-[#111111] dark:text-white"
          >
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
              <SectionHeader number="05" title="Toolkit" />

              <div className="reveal mt-12 max-w-3xl">
                <h2 className="text-[clamp(3rem,6vw,6rem)] font-bold leading-[.88] tracking-[-.07em]">
                  Tools for turning
                  <br />
                  <span className="text-[var(--muted)]">
                    ideas into systems.
                  </span>
                </h2>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {Object.entries(skills).map(([category, items]) => (
                  <SkillPanel
                    key={category}
                    category={category}
                    items={items}
                  />
                ))}
              </div>

              <div className="reveal mt-5 rounded-3xl border border-black/[0.08] bg-[#F5F5F5] p-6 transition-colors dark:border-white/[0.08] dark:bg-[#181818] sm:p-8">
                <div className="text-xs font-semibold text-[var(--muted)]">
                  Technical focus
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-black/[0.08] bg-white px-3 py-2 text-xs text-[var(--muted)] transition-colors dark:border-white/[0.08] dark:bg-[#111111]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* ========================================================
    RESPONSIVE FOOTER ACTIONS
    Mobile + Tablet: Chat / Email / LinkedIn
    Desktop: Chat / Game
======================================================== */}

              <div className="reveal mt-14 border-t border-black/[0.08] pt-8 dark:border-white/[0.08]">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="mono text-[9px] uppercase tracking-[.2em] text-[var(--muted-2)]">
                      © {new Date().getFullYear()} Stephen J.
                    </div>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                      <span className="lg:hidden">
                        Chat is available in the sidebar.
                      </span>

                      <span className="hidden lg:inline">
                        Chat and Game are available in the sidebar.
                      </span>
                    </p>
                  </div>

                  {/* ======================================================
        MOBILE + TABLET
        Chat + Email + LinkedIn
        Visible below lg
    ====================================================== */}

                  <div className="flex flex-wrap gap-2 lg:hidden">
                    {/* Chat */}

                    <button
                      onClick={() => navigate("chat")}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#171717] px-4 py-2.5 text-xs font-medium text-white dark:bg-white dark:text-black"
                    >
                      <MessageIcon />
                      Chat
                    </button>

                    {/* Email */}

                    <a
                      href="mailto:sjaferrer1@gmail.com"
                      className="inline-flex items-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-xs font-medium hover:bg-[#F5F5F5] dark:border-white/15 dark:bg-[#111111] dark:hover:bg-[#1a1a1a]"
                    >
                      <EmailIcon />
                      Email
                    </a>

                    {/* LinkedIn */}

                    <a
                      href="https://www.linkedin.com/in/stephen-john-f-964557318/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-xs font-medium hover:bg-[#F5F5F5] dark:border-white/15 dark:bg-[#111111] dark:hover:bg-[#1a1a1a]"
                    >
                      <LinkedInIcon />
                      LinkedIn
                    </a>
                  </div>

                  {/* ======================================================
        DESKTOP
        Chat + Game
        Visible at lg and above
    ====================================================== */}

                  <div className="hidden flex-wrap gap-2 lg:flex">
                    {/* Chat */}

                    <button
                      onClick={() => navigate("chat")}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#171717] px-4 py-2.5 text-xs font-medium text-white dark:bg-white dark:text-black"
                    >
                      <MessageIcon />
                      Chat
                    </button>

                    {/* Game */}

                    <button
                      onClick={() => navigate("game")}
                      className="inline-flex items-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-xs font-medium hover:bg-[#F5F5F5] dark:border-white/15 dark:bg-[#111111] dark:hover:bg-[#1a1a1a]"
                    >
                      <GameIcon />
                      Game
                    </button>

                    <button
                      onClick={() => navigate("analytics")}
                      className="inline-flex items-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-xs font-medium hover:bg-[#F5F5F5] dark:border-white/15 dark:bg-[#111111] dark:hover:bg-[#1a1a1a]"
                    >
                      <BarChartIcon />
                      Analytics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
        FOOTER — LIGHT GRAY
    ======================================================== */}

          {/* <footer className="border-t border-black/[0.08] bg-[#F5F5F5] py-12 text-[#171717] transition-colors dark:border-white/[0.08] dark:bg-[#181818] dark:text-white">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#171717] text-xs font-black text-white dark:bg-white dark:text-black">
                SJ
              </span>

              <span className="font-semibold">
                Stephen J.
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--muted)]">
              Full Stack Developer / Systems Analyst focused on
              enterprise applications, automation, HRIS, ERP,
              dashboards, and business systems.
            </p>
          </div>

          <div className="md:text-right">
            <div className="text-xs text-[var(--muted)]">
              Davao, Philippines
            </div>

            <div className="mt-4 flex gap-4 md:justify-end">
              <a
                href="https://www.linkedin.com/in/stephen-john-f-964557318/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:underline"
              >
                LinkedIn
              </a>

              <a
                href="mailto:sjaferrer1@gmail.com"
                className="text-sm font-medium hover:underline"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-black/[0.08] pt-5 dark:border-white/[0.08]">
          <span className="text-xs text-[var(--muted-2)]">
            © {new Date().getFullYear()} Stephen J.
          </span>

          <button
            onClick={scrollTop}
            className="text-xs font-medium text-[var(--muted)] hover:text-[var(--text)]"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer> */}
        </div>
      </main>

      {/* ============================================================
          FLOATING BACK TO TOP
      ============================================================ */}

      <button
        onClick={scrollTop}
        className={`fixed bottom-5 right-5 z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-sm shadow-lg transition-all ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-5 opacity-0"
        }`}
        aria-label="Back to top"
      >
        ↑
      </button>

      {/* ============================================================
          CHAT

          IMPORTANT:
          z-[110] < sidebar z-[120]

          Therefore the desktop sidebar remains visible.

          The left position dynamically follows:
          - 260px expanded sidebar
          - 72px collapsed sidebar
          - 0px mobile/tablet
      ============================================================ */}

      {overlay === "chat" && (
        <div
          className="desktop-overlay fixed bottom-0 right-0 top-0 z-[110] bg-[var(--bg)]"
          style={
            {
              "--overlay-sidebar-width": `${desktopSidebarWidth}px`,
              left: "var(--overlay-sidebar-width)",
            } as React.CSSProperties
          }
        >
          <PortfolioChat
            messages={chatMessages}
            setMessages={setChatMessages}
            onClose={closeOverlay}
          />
        </div>
      )}

      {/* ============================================================
          GAME

          Same responsive sidebar behavior as Chat.
      ============================================================ */}

      {overlay === "game" && (
        <div
          className="desktop-overlay fixed bottom-0 right-0 top-0 z-[110] bg-black/35"
          style={
            {
              "--overlay-sidebar-width": `${desktopSidebarWidth}px`,
              left: "var(--overlay-sidebar-width)",
            } as React.CSSProperties
          }
        >
          <SnakeGame
            onClose={closeOverlay}
            onTrackEvent={trackActivity}
          />
        </div>
      )}

      {overlay === "analytics" && (
        <div
          className="desktop-overlay fixed bottom-0 right-0 top-0 z-[110] bg-[var(--bg)]"
          style={
            {
              "--overlay-sidebar-width": `${desktopSidebarWidth}px`,
              left: "var(--overlay-sidebar-width)",
            } as React.CSSProperties
          }
        >
          <AnalyticsDashboard analytics={analytics} now={dashboardTick} onClose={closeOverlay} />
        </div>
      )}
    </>
  );
}
function AnalyticsDashboard({
  analytics,
  now,
  onClose,
}: {
  analytics: AnalyticsState;
  now: number;
  onClose: () => void;
}) {
  const sessionDuration = formatDuration(now - analytics.session.startedAt);
  const lastActivity = formatRelativeTime(
    analytics.session.lastActivityAt,
    now,
  );

  const moduleEntries = Object.entries(analytics.modules);
  const clickEntries = Object.entries(analytics.clicksByModule);

  const maxModuleVisits = Math.max(
    ...moduleEntries.map(([, item]) => item.visits),
    1,
  );

  const maxClickCount = Math.max(
    ...clickEntries.map(([, count]) => count),
    1,
  );

  const movementMax = Math.max(
    analytics.snake.up,
    analytics.snake.down,
    analytics.snake.left,
    analytics.snake.right,
    1,
  );

  const totalMovements =
    analytics.snake.up +
    analytics.snake.down +
    analytics.snake.left +
    analytics.snake.right;

  const statCards = [
    {
      label: "Activities",
      value: analytics.totals.activities,
      accent: "bg-[var(--muted)]",
    },
    {
      label: "Modules",
      value: analytics.totals.uniqueModules,
      accent: "bg-[var(--muted)]",
    },
    {
      label: "Total clicks",
      value: analytics.totals.clicks + analytics.totals.rightClicks,
      accent: "bg-[var(--muted)]",
    },
    {
      label: "Reloads",
      value: analytics.totals.reloads,
      accent: "bg-[var(--muted)]",
    },
  ];

  const gameStats = [
    {
      label: "Score",
      value: analytics.snake.score,
      icon: "◉",
    },
    {
      label: "High score",
      value: analytics.snake.highestScore,
      icon: "↟",
    },
    {
      label: "Games played",
      value: analytics.snake.gamesPlayed,
      icon: "◫",
    },
    {
      label: "Wins",
      value: analytics.snake.wins,
      icon: "✓",
    },
    {
      label: "Food collected",
      value: analytics.snake.foodCollected,
      icon: "◌",
    },
    {
      label: "Game overs",
      value: analytics.snake.gameOvers,
      icon: "✕",
    },
  ];
const movements = [
  {
    label: "Up",
    value: analytics.snake.up,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 19V5M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Right",
    value: analytics.snake.right,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Down",
    value: analytics.snake.down,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 5v14M18 13l-6 6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Left",
    value: analytics.snake.left,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2.5">
        <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];



  return (
    <div className="flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {/* HEADER */}
      <header className="shrink-0 border-b border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] transition-all hover:bg-[var(--surface-2)] hover:scale-105 active:scale-95"
              aria-label="Close analytics"
            >
              <CloseIcon />
            </button>

            <div className="min-w-0">
              <div className="text-sm font-bold tracking-tight">
                Analytics
              </div>

              <div className="text-[9px] text-[var(--muted)]">
                Game & activity overview
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-gray-300 px-2.5 py-1.5 dark:border-gray-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,.8)]" />

            <span className="text-[8px] font-bold uppercase tracking-[0.18em]">
              Live
            </span>
          </div>

        </div>
      </header>

      {/* CONTENT */}
      <main className="min-h-0 flex-1 overflow-y-auto px-3 py-3 sm:px-4 sm:py-4">
        <div className="mx-auto flex w-full max-w-[920px] flex-col gap-3">

          {/* DASHBOARD HERO */}
          <section className="relative overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_12px_40px_rgba(0,0,0,.04)]">
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl" />

            <div className="relative">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <div className="text-[8px] font-bold uppercase tracking-[0.24em] text-[var(--muted-2)]">
                    Dashboard
                  </div>

                  <h1 className="mt-1 text-xl font-black tracking-[-0.04em] sm:text-2xl">
                    Activity overview
                  </h1>

                  <p className="mt-1 text-[10px] text-[var(--muted)]">
                    Real-time session and game performance
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-[52px] w-[100px] shrink-0 flex-col justify-center rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2">
                    <div className="text-[7px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-2)]">
                      Session
                    </div>

                    <div className="mt-0.5 whitespace-nowrap text-sm font-black tracking-[-0.03em] tabular-nums">
                      {sessionDuration}
                    </div>
                  </div>

                  <div className="flex h-[52px] w-[100px] shrink-0 flex-col justify-center rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2">
                    <div className="text-[7px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-2)]">
                      Started
                    </div>

                    <div className="mt-0.5 whitespace-nowrap text-sm font-bold tabular-nums">
                      {new Date(
                        analytics.session.startedAt,
                      ).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* KPI GRID */}
          <section className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {statCards.map((item) => (
              <div
                key={item.label}
                className="relative overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-3 shadow-[0_8px_24px_rgba(0,0,0,.03)]"
              >
                <div
                  className={`absolute left-0 top-0 h-0.5 w-full ${item.accent}`}
                />

                <div className="text-[7px] font-bold uppercase tracking-[0.18em] text-[var(--muted-2)]">
                  {item.label}
                </div>

                <div className="mt-2 text-2xl font-black tracking-[-0.06em]">
                  {item.value}
                </div>
              </div>
            ))}
          </section>

          {/* SESSION + LAST ACTIVITY */}
          <section className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-3">
              <div className="flex items-center justify-between">
                <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--muted-2)]">
                  Current session
                </div>

                <span className="rounded-full bg-blue-500/10 px-2 py-1 text-[7px] font-bold uppercase tracking-[0.14em] text-blue-600 dark:text-blue-400">
                  Active
                </span>
              </div>

              <div className="mt-4 text-3xl font-black tracking-[-0.07em]">
                {sessionDuration}
              </div>

              <div className="mt-1 text-[9px] text-[var(--muted)]">
                Session duration
              </div>
            </div>

            <div className="rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-3">
              <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--muted-2)]">
                Last activity
              </div>

              <div className="mt-4 text-3xl font-black tracking-[-0.07em]">
                {lastActivity}
              </div>

              <div className="mt-1 text-[9px] text-[var(--muted)]">
                Most recent interaction
              </div>
            </div>
          </section>

          {/* GAME PERFORMANCE */}
          <section className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-3 shadow-[0_10px_30px_rgba(0,0,0,.04)]">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.22em] text-[var(--muted-2)]">
                  Game performance
                </div>

                <div className="mt-1 text-sm font-bold">
                  Snake statistics
                </div>
              </div>

              <div className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-2.5 py-1.5">
                <div className="text-[7px] uppercase tracking-[0.16em] text-[var(--muted-2)]">
                  Total movements
                </div>

                <div className="mt-0.5 text-sm font-black">
                  {analytics.snake.movements}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {gameStats.map((item) => (
                <div
                  key={item.label}
                  className="group rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-3 transition-colors hover:bg-[var(--surface-2)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--muted-2)]">
                      {item.label}
                    </span>

                    <span className="text-[11px] text-[var(--muted-2)] transition-colors group-hover:text-[var(--text)]">
                      {item.icon}
                    </span>
                  </div>

                  <div className="mt-3 text-2xl font-black tracking-[-0.06em]">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TWO COLUMN ANALYTICS */}
          <section className="grid gap-3 lg:grid-cols-2">

            {/* MODULE ACTIVITY */}
            <div className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-3 shadow-[0_10px_30px_rgba(0,0,0,.04)]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[8px] font-bold uppercase tracking-[0.22em] text-[var(--muted-2)]">
                    Module activity
                  </div>

                  <div className="mt-1 text-sm font-bold">
                    Most visited modules
                  </div>
                </div>

                <div className="rounded-full border border-[var(--line)] bg-[var(--bg)] px-2 py-1 text-[7px] font-bold uppercase tracking-[0.14em] text-[var(--muted-2)]">
                  {moduleEntries.length} tracked
                </div>
              </div>

              {moduleEntries.length === 0 ? (
                <div className="flex min-h-[120px] items-center justify-center rounded-2xl border border-dashed border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-[10px] text-[var(--muted)]">
                  No module visits yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {moduleEntries.map(([name, item]) => {
                    const percentage =
                      (item.visits / maxModuleVisits) * 100;

                    return (
                      <div key={name}>
                        <div className="mb-1.5 flex items-center justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2">
                            <span
                              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                item.active
                                  ? "bg-emerald-500"
                                  : "bg-[var(--muted-2)]"
                              }`}
                            />

                            <span className="truncate text-[9px] font-semibold">
                              {name}
                            </span>
                          </div>

                          <span className="shrink-0 text-[8px] font-bold text-[var(--muted)]">
                            {item.visits}
                          </span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg)]">
                          <div
                            className="h-full rounded-full bg-[var(--text)] transition-all duration-500"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>

                        <div className="mt-1 flex justify-between text-[7px] uppercase tracking-[0.14em] text-[var(--muted-2)]">
                          <span>
                            {formatDuration(item.totalTimeMs)}
                          </span>

                          <span>
                            {item.active ? "Active now" : "Seen"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CLICK ACTIVITY */}
            <div className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-3 shadow-[0_10px_30px_rgba(0,0,0,.04)]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[8px] font-bold uppercase tracking-[0.22em] text-[var(--muted-2)]">
                    Click activity
                  </div>

                  <div className="mt-1 text-sm font-bold">
                    Interaction breakdown
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[7px] uppercase tracking-[0.14em] text-[var(--muted-2)]">
                    Total
                  </div>

                  <div className="text-sm font-black">
                    {analytics.totals.clicks +
                      analytics.totals.rightClicks}
                  </div>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-2">
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-2.5">
                  <div className="text-[7px] uppercase tracking-[0.16em] text-[var(--muted-2)]">
                    Left clicks
                  </div>

                  <div className="mt-1 text-xl font-black">
                    {analytics.totals.clicks}
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-2.5">
                  <div className="text-[7px] uppercase tracking-[0.16em] text-[var(--muted-2)]">
                    Right clicks
                  </div>

                  <div className="mt-1 text-xl font-black">
                    {analytics.totals.rightClicks}
                  </div>
                </div>
              </div>

              {clickEntries.length === 0 ? (
                <div className="flex min-h-[90px] items-center justify-center rounded-2xl border border-dashed border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-[10px] text-[var(--muted)]">
                  No meaningful clicks recorded yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {clickEntries.map(([moduleName, count]) => {
                    const percentage =
                      (count / maxClickCount) * 100;

                    return (
                      <div key={moduleName}>
                        <div className="mb-1.5 flex items-center justify-between gap-2">
                          <span className="truncate text-[9px] font-semibold">
                            {moduleName}
                          </span>

                          <span className="text-[8px] font-bold text-[var(--muted)]">
                            {count}
                          </span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg)]">
                          <div
                            className="h-full rounded-full bg-[var(--text)] transition-all duration-500"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* MOVEMENT */}
          <section className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-3 shadow-[0_10px_30px_rgba(0,0,0,.04)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.22em] text-[var(--muted-2)]">
                  Game movement
                </div>

                <div className="mt-1 text-sm font-bold">
                  Direction distribution
                </div>
              </div>

              <div className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-1.5 text-right">
                <div className="text-[7px] uppercase tracking-[0.15em] text-[var(--muted-2)]">
                  Movements
                </div>

                <div className="text-sm font-black">
                  {analytics.snake.movements}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {movements.map((movement) => {
                const percentage =
                  (movement.value / movementMax) * 100;

                return (
                  <div
                    key={movement.label}
                    className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--muted-2)]">
                        {movement.label}
                      </span>

                      <span className="text-lg font-black">
                        {movement.icon}
                      </span>
                    </div>

                    <div className="mt-3 text-xl font-black tracking-[-0.05em]">
                      {movement.value}
                    </div>

                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--surface)]">
                      <div
                        className="h-full rounded-full bg-[var(--text)] transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-3">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--muted-2)]">
                  Total directional input
                </span>

                <span className="text-lg font-black">
                  {totalMovements}
                </span>
              </div>
            </div>
          </section>

          {/* RECENT ACTIVITY */}
          <section className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-3 shadow-[0_10px_30px_rgba(0,0,0,.04)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.22em] text-[var(--muted-2)]">
                  Recent activity
                </div>

                <div className="mt-1 text-sm font-bold">
                  Latest events
                </div>
              </div>

              <div className="rounded-full border border-[var(--line)] bg-[var(--bg)] px-2 py-1 text-[7px] font-bold uppercase tracking-[0.14em] text-[var(--muted-2)]">
                {analytics.events.length} events
              </div>
            </div>

            {analytics.events.length === 0 ? (
              <div className="flex min-h-[100px] items-center justify-center rounded-2xl border border-dashed border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-[10px] text-[var(--muted)]">
                No activity yet.
              </div>
            ) : (
              <div className="relative">
                <div className="absolute bottom-2 left-[7px] top-2 w-px bg-[var(--line)]" />

                <div className="space-y-1">
                  {analytics.events.map((event) => (
                    <div
                      key={event.id}
                      className="relative flex items-start justify-between gap-3 rounded-2xl px-2.5 py-2.5 transition-colors hover:bg-[var(--bg)]"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="relative z-10 mt-1 h-2 w-2 shrink-0 rounded-full border-2 border-[var(--surface)] bg-[var(--text)] shadow-[0_0_0_2px_var(--line)]" />

                        <div className="min-w-0">
                          <div className="truncate text-[10px] font-semibold">
                            {event.action}
                          </div>

                          <div className="mt-0.5 text-[7px] font-semibold uppercase tracking-[0.16em] text-[var(--muted-2)]">
                            {event.module}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 pt-0.5 text-[7px] font-semibold uppercase tracking-[0.14em] text-[var(--muted-2)]">
                        {formatRelativeTime(event.timestamp, now)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* FOOTER SUMMARY */}
          <section className="grid grid-cols-3 gap-2 pb-2">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2.5 text-center">
              <div className="text-[7px] font-bold uppercase tracking-[0.16em] text-[var(--muted-2)]">
                Activities
              </div>

              <div className="mt-1 text-lg font-black">
                {analytics.totals.activities}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2.5 text-center">
              <div className="text-[7px] font-bold uppercase tracking-[0.16em] text-[var(--muted-2)]">
                Modules
              </div>

              <div className="mt-1 text-lg font-black">
                {analytics.totals.uniqueModules}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2.5 text-center">
              <div className="text-[7px] font-bold uppercase tracking-[0.16em] text-[var(--muted-2)]">
                Events
              </div>

              <div className="mt-1 text-lg font-black">
                {analytics.events.length}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}


/* ============================================================
   SMART PORTFOLIO CHAT
   ChatGPT-style local portfolio assistant
============================================================ */

type ChatIntent =
  | "greeting"
  | "help"
  | "about"
  | "experience"
  | "company"
  | "projects"
  | "skills"
  | "strongestSkills"
  | "hris"
  | "erp"
  | "automation"
  | "api"
  | "database"
  | "contact"
  | "hiring"
  | "comparison"
  | "thanks"
  | "confirmation"
  | "goodbye"
  | "unknown";

type PortfolioTopic =
  | "about"
  | "experience"
  | "company"
  | "projects"
  | "skills"
  | "hris"
  | "erp"
  | "automation"
  | "api"
  | "database"
  | "contact"
  | "hiring"
  | "general";

/* ============================================================
   COMPONENT
============================================================ */

function PortfolioChat({
  messages,
  setMessages,
  onClose,
}: {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<PortfolioTopic>("general");

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const topicRef = useRef<PortfolioTopic>("general");

  /*
   * Keeps track of questions already asked so the assistant
   * does not suggest the exact same question again.
   */
  const askedQuestionsRef = useRef<string[]>([]);

  useEffect(() => {
    topicRef.current = currentTopic;
  }, [currentTopic]);

  /* ============================================================
     PORTFOLIO KNOWLEDGE
  ============================================================ */

  const portfolio = {
    name: "Stephen J.",

    fullRole: "Full Stack Developer · Systems Analyst",

    summary:
      "Stephen J. is a Full Stack Developer and Systems Analyst focused on building reliable enterprise applications, business systems, and process-driven software.",

    professionalProfile: [
      "Full Stack Development",
      "Systems Analysis",
      "Enterprise Applications",
      "HRIS",
      "ERP",
      "Business Process Automation",
      "Dashboards and Reporting",
      "APIs",
      "Database Systems",
      "Workflow Optimization",
    ],

    technologies: {
      languages: ["C#", "JavaScript", "TypeScript", "HTML", "CSS"],

      frameworks: [
        "ASP.NET",
        "Next.js",
        "Node.js",
        "Bootstrap",
        "Tailwind CSS",
        "jQuery",
      ],

      database: ["Microsoft SQL Server"],

      tools: ["Git", "GitHub", "VS Code", "Visual Studio", "Postman"],
    },

    experience: [
      {
        company: "Lapanday Foods Corporation",
        position: "System Analyst / Programmer and Supervisor",
        description:
          "Worked on business systems and process improvement involving HRIS, recruitment, workforce management, reporting, system optimization, and operational workflows.",
        areas: [
          "HRIS",
          "Recruitment",
          "Applicant tracking",
          "Workforce management",
          "Attendance",
          "Scheduling",
          "Reporting",
          "System optimization",
          "Business process improvement",
        ],
      },

      {
        company: "Millennium Specialty Coco Products, Inc.",
        position: "Software Developer",
        description:
          "Developed ERP and HRIS solutions involving procurement, inventory, asset management, attendance, workflows, reporting, and SQL Server.",
        areas: [
          "ERP",
          "HRIS",
          "Procurement",
          "Inventory",
          "Asset management",
          "Attendance",
          "Workflow systems",
          "Reporting",
          "SQL Server",
        ],
      },
    ],

    projects: [
      {
        name: "Enterprise Resource Planning",
        description:
          "A business platform covering procurement, inventory, assets, approvals, access control, operational workflows, and reporting.",
      },

      {
        name: "Human Resource Information System",
        description:
          "A workforce platform covering employee records, attendance, leave, travel, scheduling, recruitment, applicant tracking, and HR workflows.",
      },

      {
        name: "IT & Asset Management",
        description:
          "A centralized system for tracking assets, inventory, ownership, locations, and asset lifecycle information.",
      },

      {
        name: "Lapanday HRIS",
        description:
          "An HR platform covering employee management, PDS, attendance, recruitment, applicant tracking, travel orders, scheduling, and workforce processes.",
      },
    ],

    hris: {
      summary: "HRIS is one of Stephen's strongest areas of experience.",

      modules: [
        "Employee records",
        "Personal Data Sheet (PDS)",
        "Attendance",
        "Leave",
        "Overtime",
        "Travel",
        "Scheduling",
        "Recruitment",
        "Applicant tracking",
        "Recruitment automation",
        "Dashboards",
        "Centralized HR master data",
        "Approval workflows",
      ],
    },

    erp: {
      summary:
        "Stephen's ERP experience focuses on practical business operations and centralized enterprise information.",

      modules: [
        "Procurement",
        "Inventory",
        "Asset management",
        "Approval workflows",
        "User access",
        "Audit trails",
        "Reporting",
        "Operational monitoring",
      ],
    },

    automation: {
      summary:
        "Stephen focuses on transforming manual and repetitive business processes into structured digital workflows.",

      examples: [
        "Approval workflows",
        "Recruitment processes",
        "HR workflows",
        "Reporting",
        "Data collection",
        "Operational processes",
        "Workflow monitoring",
        "Centralized information",
      ],
    },

    api: "APIs are part of Stephen's full-stack work, particularly for connecting frontend applications, backend services, databases, and internal or external business processes.",

    database:
      "Stephen primarily works with Microsoft SQL Server for business applications. Database-driven work supports employee records, ERP data, procurement, inventory, assets, reporting, workflows, and other enterprise processes.",

    contact:
      "Stephen can be contacted at sjaferrer1@gmail.com. His LinkedIn profile is also available through the portfolio.",

    hiring:
      "For hiring, freelance, collaboration, or professional opportunities, Stephen can be contacted directly at sjaferrer1@gmail.com or through LinkedIn.",

    philosophy:
      "Stephen's approach combines software development with systems analysis. Rather than simply building screens, he focuses on understanding the business process, the people involved, the data being used, approvals, repetitive work, and opportunities for automation.",
  };

  /* ============================================================
     PREPARED QUESTIONS
  ============================================================ */

  const preparedQuestions = [
    "Who is Stephen?",
    "What's his experience?",
    "What has he built?",
    "What's his tech stack?",
    "Tell me about his HRIS work",
    "Tell me about his ERP experience",
    "What are his strongest skills?",
    "How does he approach automation?",
    "Why hire him?",
    "How can I contact him?",
  ];

  /* ============================================================
     CLEANUP
  ============================================================ */

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  /* ============================================================
     AUTO SCROLL
  ============================================================ */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, typing]);

  /* ============================================================
     FOCUS INPUT
  ============================================================ */

  useEffect(() => {
    if (!typing) {
      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 80);

      return () => window.clearTimeout(timer);
    }
  }, [typing]);

  /* ============================================================
     TEXT NORMALIZATION
  ============================================================ */

  function normalize(value: string) {
    return value
      .toLowerCase()
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/[?!.,;:'"`]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /* ============================================================
     WORD MATCHING
  ============================================================ */

  function hasAny(q: string, words: string[]) {
    return words.some((word) => q.includes(normalize(word)));
  }

  /* ============================================================
     QUESTION TYPE HELPERS
  ============================================================ */

  function isHowQuestion(q: string) {
    return (
      q.startsWith("how ") ||
      q === "how" ||
      q.includes(" how did ") ||
      q.includes(" how does ") ||
      q.includes(" how was ") ||
      q.includes(" how were ")
    );
  }

  function isWhyQuestion(q: string) {
    return q.startsWith("why ") || q === "why" || q.includes(" why ");
  }

  function isWhatQuestion(q: string) {
    return q.startsWith("what ") || q === "what" || q.includes(" what ");
  }

  function isExampleQuestion(q: string) {
    return hasAny(q, [
      "example",
      "examples",
      "give me an example",
      "give me examples",
      "for example",
    ]);
  }

  /* ============================================================
     DETECT TOPIC
  ============================================================ */

  function detectTopic(question: string): PortfolioTopic | null {
    const q = normalize(question);

    if (!q) return null;

    if (
      hasAny(q, [
        "hris",
        "human resource",
        "employee",
        "recruitment",
        "applicant",
        "attendance",
        "leave",
        "overtime",
        "travel order",
        "workforce",
        "pds",
      ])
    ) {
      return "hris";
    }

    if (
      hasAny(q, [
        "erp",
        "enterprise resource",
        "procurement",
        "inventory",
        "asset management",
        "assets",
      ])
    ) {
      return "erp";
    }

    if (
      hasAny(q, [
        "automation",
        "automate",
        "automated",
        "workflow",
        "process improvement",
        "business process",
        "manual process",
        "repetitive",
      ])
    ) {
      return "automation";
    }

    if (
      hasAny(q, [
        "api",
        "apis",
        "integration",
        "backend service",
        "frontend backend",
      ])
    ) {
      return "api";
    }

    if (hasAny(q, ["database", "sql", "sql server", "data architecture"])) {
      return "database";
    }

    if (
      hasAny(q, [
        "skill",
        "technology",
        "technologies",
        "tech stack",
        "stack",
        "language",
        "framework",
        "tools",
        "c#",
        "javascript",
        "typescript",
        "asp net",
        "aspnet",
        "next js",
        "node js",
        "tailwind",
        "bootstrap",
        "jquery",
        "github",
        "git",
        "postman",
        "visual studio",
        "vs code",
      ])
    ) {
      return "skills";
    }

    if (
      hasAny(q, [
        "project",
        "projects",
        "built",
        "build",
        "created",
        "developed",
        "systems",
      ])
    ) {
      return "projects";
    }

    if (
      hasAny(q, [
        "experience",
        "work history",
        "career",
        "worked",
        "company",
        "companies",
        "employer",
        "employment",
        "background",
        "lapanday",
        "millennium",
      ])
    ) {
      return "experience";
    }

    if (
      hasAny(q, ["contact", "email", "linkedin", "reach stephen", "reach him"])
    ) {
      return "contact";
    }

    if (
      hasAny(q, [
        "hire",
        "hiring",
        "recruiter",
        "candidate",
        "job opportunity",
        "employment opportunity",
        "why hire",
      ])
    ) {
      return "hiring";
    }

    if (
      q === "stephen" ||
      q === "about" ||
      q.includes("who is stephen") ||
      q.includes("tell me about stephen") ||
      q.includes("about stephen")
    ) {
      return "about";
    }

    return null;
  }

  /* ============================================================
     INTENT DETECTION
  ============================================================ */

  function detectIntent(
    question: string,
    previousTopic: PortfolioTopic,
  ): ChatIntent {
    const q = normalize(question);

    if (!q) return "unknown";

    /* Greeting */
    if (
      /^(hi|hello|hey|hey there|good morning|good afternoon|good evening|yo|sup)$/.test(
        q,
      )
    ) {
      return "greeting";
    }

    /* Thanks */
    if (
      /^(thanks|thank you|thank u|thx|ty|appreciate it|thanks a lot|thank you so much)$/.test(
        q,
      )
    ) {
      return "thanks";
    }

    /* Goodbye */
    if (/^(bye|goodbye|see you|see ya|talk to you later|gotta go)$/.test(q)) {
      return "goodbye";
    }

    /* Confirmation */
    if (
      /^(yes|yeah|yep|yup|sure|okay|ok|alright|go ahead|continue|please do)$/.test(
        q,
      )
    ) {
      return "confirmation";
    }

    /* Help */
    if (
      q === "help" ||
      hasAny(q, [
        "what can you do",
        "what can i ask",
        "how can you help",
        "what questions can i ask",
      ])
    ) {
      return "help";
    }

    /* Strongest skills before generic skills */
    if (
      hasAny(q, [
        "strongest skills",
        "strongest skill",
        "best skills",
        "main skills",
        "key skills",
        "core skills",
        "top skills",
        "strongest technology",
        "strongest technologies",
        "best technology",
        "best technologies",
      ])
    ) {
      return "strongestSkills";
    }

    /* Hiring */
    if (
      hasAny(q, [
        "hire",
        "hiring",
        "recruiter",
        "candidate",
        "job opportunity",
        "employment opportunity",
        "professional opportunity",
        "why should i hire",
        "good candidate",
        "why hire",
      ])
    ) {
      return "hiring";
    }

    /* Contact */
    if (
      hasAny(q, [
        "contact",
        "email",
        "linkedin",
        "reach stephen",
        "reach him",
        "how do i contact",
      ])
    ) {
      return "contact";
    }

    /* Comparison */
    if (
      hasAny(q, [
        "compare",
        "comparison",
        "difference between",
        "which is stronger",
        "more experience in",
        "hris or erp",
        "erp or hris",
      ])
    ) {
      return "comparison";
    }

    /*
     * Always detect the actual subject first.
     * This is important for questions such as:
     *
     * "How did automation fit in?"
     * "How was automation used?"
     * "What about HR automation?"
     *
     * They should be answered as automation questions,
     * not simply treated as generic "how" follow-ups.
     */
    const directTopic = detectTopic(question);

    if (directTopic) {
      return topicToIntent(directTopic);
    }

    /* Natural follow-up language */
    const followUpPatterns = [
      "tell me more",
      "more details",
      "more detail",
      "more information",
      "go deeper",
      "explain more",
      "can you explain",
      "explain that",
      "explain this",
      "how",
      "why",
      "what about",
      "and the",
      "and what about",
      "what else",
      "anything else",
      "can you elaborate",
      "elaborate",
      "how so",
      "what do you mean",
    ];

    if (previousTopic !== "general" && hasAny(q, followUpPatterns)) {
      return topicToIntent(previousTopic);
    }

    /* Short contextual questions */
    if (
      previousTopic !== "general" &&
      q.split(" ").length <= 5 &&
      hasAny(q, ["more", "details", "why", "how", "how so", "and", "what else"])
    ) {
      return topicToIntent(previousTopic);
    }

    return "unknown";
  }

  /* ============================================================
     TOPIC / INTENT HELPERS
  ============================================================ */

  function topicToIntent(topic: PortfolioTopic): ChatIntent {
    switch (topic) {
      case "about":
        return "about";
      case "experience":
        return "experience";
      case "company":
        return "company";
      case "projects":
        return "projects";
      case "skills":
        return "skills";
      case "hris":
        return "hris";
      case "erp":
        return "erp";
      case "automation":
        return "automation";
      case "api":
        return "api";
      case "database":
        return "database";
      case "contact":
        return "contact";
      case "hiring":
        return "hiring";
      default:
        return "unknown";
    }
  }

  function intentToTopic(intent: ChatIntent): PortfolioTopic {
    switch (intent) {
      case "about":
        return "about";
      case "experience":
        return "experience";
      case "company":
        return "company";
      case "projects":
        return "projects";
      case "skills":
      case "strongestSkills":
        return "skills";
      case "hris":
        return "hris";
      case "erp":
        return "erp";
      case "automation":
        return "automation";
      case "api":
        return "api";
      case "database":
        return "database";
      case "contact":
        return "contact";
      case "hiring":
        return "hiring";
      default:
        return "general";
    }
  }

  /* ============================================================
     QUESTION-SPECIFIC ANSWERS
  ============================================================ */

  function getContextualAnswer(
    question: string,
    topic: PortfolioTopic,
  ): string | null {
    const q = normalize(question);

    /* ==========================================================
       AUTOMATION
    ========================================================== */

    if (topic === "automation") {
      if (
        hasAny(q, [
          "how did automation fit in",
          "how did automation fit",
          "where did automation fit",
          "how was automation used",
          "how was automation applied",
          "how did he use automation",
          "how does he approach automation",
          "how does he automate",
        ])
      ) {
        return `Automation fit into Stephen's work as a way of turning repetitive business activities into structured workflows.

In practice, that meant looking at processes such as approvals, recruitment, HR activities, reporting, data collection, and other operational tasks, then identifying which steps could be handled systematically by the software.

So the approach was not simply "automate everything." It was:

**Understand the process → identify repetitive or inefficient steps → structure the workflow → centralize the information → automate appropriate steps → make the result measurable.**

This is especially useful in HRIS and ERP because those systems involve repeated transactions, approvals, multiple users, and information that needs to remain consistent and traceable.`;
      }

      if (
        isExampleQuestion(q) ||
        hasAny(q, [
          "automation examples",
          "examples of automation",
          "what did he automate",
          "what was automated",
        ])
      ) {
        return `Examples of where automation fits into Stephen's work include:

• Approval workflows — routing requests through the appropriate users.
• Recruitment — structuring applicant and recruitment activities.
• HR workflows — reducing repeated manual HR processing.
• Reporting — organizing information so reports can be produced consistently.
• Data collection — centralizing information instead of relying on scattered manual records.
• Operational workflows — making recurring business processes more structured.
• Workflow monitoring — making process status easier to track.

The common idea is to replace disconnected, repetitive steps with a workflow that the system can control and monitor.`;
      }

      if (isWhyQuestion(q)) {
        return `Stephen approaches automation primarily to improve consistency, visibility, and efficiency.

The goal is not just to remove a manual task. A properly designed workflow also defines who acts, what information is required, what happens next, and what should be recorded.

That makes the process easier to monitor and less dependent on people remembering every step manually.`;
      }

      if (isHowQuestion(q)) {
        return `Stephen approaches automation by first understanding how the business process actually works.

He looks for repetitive or inefficient steps, then structures those steps into a digital workflow. From there, data can be centralized, approvals can be routed, and appropriate tasks can be automated.

The important part is that automation follows the process design rather than being added without understanding the business requirement.`;
      }
    }

    /* ==========================================================
       HRIS
    ========================================================== */

    if (topic === "hris") {
      if (
        hasAny(q, [
          "how did hr",
          "how was hr",
          "how does hr",
          "how did he use hris",
          "how was hris used",
          "how does hris work",
          "how did automation fit",
          "how did automation fit in",
        ])
      ) {
        return `In Stephen's HRIS work, automation fits into the workflow surrounding employee and recruitment information.

For example, recruitment can involve applicants, screening, status changes, approvals, documents, hiring decisions, and eventually onboarding. Instead of treating those as separate manual activities, the system can connect them into a structured workflow.

The same idea applies to attendance, leave, travel, scheduling, and other HR processes.

So his HRIS approach is about connecting **employee data + business rules + approvals + workflow + reporting** into one system.`;
      }

      if (
        hasAny(q, [
          "recruitment",
          "recruitment process",
          "applicant tracking",
          "applicant",
        ])
      ) {
        return `Recruitment is one of the areas covered by Stephen's HRIS experience.

The system can bring applicant information, recruitment status, screening activities, approvals, and related records into a centralized process.

That is important because recruitment often involves several people and repeated status changes. Structuring those activities in the HRIS makes the process easier to follow and reduces reliance on disconnected manual records.`;
      }

      if (isWhatQuestion(q) || isExampleQuestion(q)) {
        return `Stephen's HRIS experience covers a broad set of workforce processes, including:

• Employee records
• Personal Data Sheet (PDS)
• Attendance
• Leave
• Overtime
• Travel
• Scheduling
• Recruitment
• Applicant tracking
• Recruitment automation
• Dashboards
• Centralized HR master data
• Approval workflows

The important part is that these are connected as business processes rather than treated as isolated modules.`;
      }

      if (isWhyQuestion(q)) {
        return `The value of the HRIS work is in bringing employee and workforce processes into one structured system.

Instead of maintaining separate records and manually coordinating every process, information can be centralized while workflows, approvals, attendance, recruitment, scheduling, and reporting operate within the same environment.`;
      }
    }

    /* ==========================================================
       ERP
    ========================================================== */

    if (topic === "erp") {
      if (
        hasAny(q, [
          "how did automation fit",
          "how did automation fit in",
          "how was automation used",
          "how was automation applied",
          "how did he use automation",
        ])
      ) {
        return `In the ERP environment, automation fits into recurring operational workflows such as procurement, approvals, inventory-related processes, asset management, reporting, and monitoring.

Rather than requiring users to manually coordinate every step, the system can define the workflow, identify who needs to act, record the transaction, and make the status visible.

So automation becomes part of the ERP's operational process rather than being a separate feature.`;
      }

      if (isWhatQuestion(q) || isExampleQuestion(q)) {
        return `Stephen's ERP experience covers practical operational areas such as:

• Procurement
• Inventory
• Asset management
• Approval workflows
• User access
• Audit trails
• Reporting
• Operational monitoring

The focus is on centralizing enterprise information and giving users a structured way to complete and monitor business processes.`;
      }

      if (isWhyQuestion(q)) {
        return `The main benefit of the ERP approach is centralization.

Procurement, inventory, assets, approvals, users, and reporting can share the same underlying information instead of being managed through disconnected processes.

That improves visibility and also gives the organization a clearer record of what happened and who was involved.`;
      }

      if (isHowQuestion(q)) {
        return `Stephen approaches ERP development by first understanding the operational process.

He then translates that process into modules, business rules, workflows, permissions, database structures, and reporting.

For example, procurement can involve a request, approval, purchasing activity, records, and reporting. The ERP connects those steps so the process is easier to manage and monitor.`;
      }
    }

    /* ==========================================================
       DATABASE
    ========================================================== */

    if (topic === "database") {
      if (
        hasAny(q, [
          "how did he use sql",
          "how was sql used",
          "how did sql fit",
          "how did the database fit",
          "how was the database used",
          "how does he use sql server",
        ])
      ) {
        return `SQL Server is a core data layer for the business systems Stephen works with.

It supports structured information such as employee records, attendance, procurement, inventory, assets, workflows, and reporting.

Because those systems have relationships between many different types of records, the database is closely tied to the application's business rules and processes rather than being treated as storage alone.`;
      }

      if (isWhyQuestion(q)) {
        return `SQL Server fits well with Stephen's enterprise applications because HRIS and ERP systems depend heavily on structured relational data.

Employee records, attendance, procurement, inventory, assets, approvals, and reporting all have relationships that need to remain consistent.

That makes SQL Server an important part of the overall system architecture.`;
      }
    }

    /* ==========================================================
       API
    ========================================================== */

    if (topic === "api") {
      if (isHowQuestion(q)) {
        return `Stephen uses APIs as the connection between the application's frontend, backend services, and database.

A typical flow is:

**Frontend → API / Backend → Database**

The API layer can handle validation, authentication, business rules, data operations, and communication between different parts of the application.

That makes APIs especially useful for the HRIS and ERP-style systems in his portfolio.`;
      }

      if (isWhyQuestion(q)) {
        return `APIs are useful because they separate the user interface from the application's business logic and data.

For enterprise systems, that makes it easier for different parts of the application to communicate while keeping validation, authentication, business rules, and database operations in a controlled backend layer.`;
      }
    }

    /* ==========================================================
       SKILLS
    ========================================================== */

    if (topic === "skills") {
      if (
        hasAny(q, [
          "how does he use",
          "how does he apply",
          "how are the skills",
          "how does he use those",
        ])
      ) {
        return `Stephen's technical skills are mainly applied to business and enterprise applications.

C# and ASP.NET support backend development, JavaScript and TypeScript support frontend and application logic, and SQL Server supports the data layer.

Those technologies are then combined with APIs, workflows, reporting, authentication, and business rules to build complete systems rather than isolated features.`;
      }

      if (isWhyQuestion(q)) {
        return `The strength of Stephen's technology stack is that it supports the full lifecycle of a business application.

C# and ASP.NET can handle backend services, JavaScript and TypeScript support frontend development, and SQL Server provides the structured data layer.

That combination fits well with HRIS, ERP, workflow, reporting, and other enterprise applications.`;
      }
    }

    /* ==========================================================
       EXPERIENCE
    ========================================================== */

    if (topic === "experience") {
      if (
        hasAny(q, [
          "what did he do at lapanday",
          "what did he do in lapanday",
          "what was his role at lapanday",
        ])
      ) {
        return `At **Lapanday Foods Corporation**, Stephen worked as a **System Analyst / Programmer and Supervisor**.

His work included HRIS, recruitment, applicant tracking, workforce management, attendance, scheduling, reporting, system optimization, and business process improvement.

So his role combined hands-on software development with understanding and improving the business processes behind the systems.`;
      }

      if (
        hasAny(q, [
          "what did he do at millennium",
          "what did he do in millennium",
          "what was his role at millennium",
        ])
      ) {
        return `At **Millennium Specialty Coco Products, Inc.**, Stephen worked as a **Software Developer**.

His work involved ERP and HRIS solutions covering procurement, inventory, asset management, attendance, workflows, reporting, and SQL Server.

This gave him experience with both operational enterprise systems and people-focused HR systems.`;
      }

      if (isHowQuestion(q)) {
        return `Stephen's experience combines software development with systems analysis.

He has worked on HRIS, ERP, recruitment, workforce management, procurement, inventory, asset management, reporting, workflows, and SQL Server.

The common thread is that he works with systems that support real business operations, not just standalone software features.`;
      }
    }

    /* ==========================================================
       PROJECTS
    ========================================================== */

    if (topic === "projects") {
      if (isWhatQuestion(q) || isExampleQuestion(q)) {
        return `Stephen's portfolio includes several enterprise-focused projects:

**Enterprise Resource Planning**
Covers procurement, inventory, assets, approvals, access control, workflows, and reporting.

**Human Resource Information System**
Covers employee records, attendance, leave, travel, scheduling, recruitment, applicant tracking, and HR workflows.

**IT & Asset Management**
Centralizes asset, inventory, ownership, location, and lifecycle information.

**Lapanday HRIS**
Covers employee management, PDS, attendance, recruitment, applicant tracking, travel orders, scheduling, and workforce processes.

The common theme is connecting real business processes with structured software and centralized data.`;
      }

      if (isWhyQuestion(q)) {
        return `The projects are valuable because they solve operational problems rather than focusing only on technical demonstrations.

They bring together workflows, approvals, records, reporting, permissions, and centralized data so organizations can manage recurring business processes more consistently.`;
      }
    }

    /* ==========================================================
       HIRING
    ========================================================== */

    if (topic === "hiring") {
      if (
        isWhyQuestion(q) ||
        hasAny(q, ["why hire him", "why should i hire him"])
      ) {
        return `Stephen is particularly relevant for roles that require someone who can connect **software development with business process understanding**.

His experience covers:

• Full-stack development
• Enterprise applications
• HRIS
• ERP
• SQL Server
• APIs
• Workflow systems
• Business process automation
• Reporting
• Systems analysis

The differentiator is that his work is not limited to writing code. He also analyzes the process, users, data, approvals, and operational requirements behind the software.

For hiring or professional opportunities, he can be reached at **sjaferrer1@gmail.com**.`;
      }
    }

    /* ==========================================================
       GENERAL FOLLOW-UP ANSWERS
    ========================================================== */

    if (
      topic === "hris" &&
      hasAny(q, ["more", "details", "tell me more", "explain"])
    ) {
      return `Sure. Stephen's HRIS experience goes beyond maintaining employee records.

The systems connect employee information with attendance, leave, travel, scheduling, recruitment, applicant tracking, approvals, and reporting.

That means the HRIS acts as a workflow platform for HR operations, with centralized information and structured processes.`;
    }

    if (
      topic === "automation" &&
      hasAny(q, ["more", "details", "tell me more", "explain"])
    ) {
      return `Sure. Stephen's automation work is mainly about taking business processes that are repetitive, manual, or difficult to monitor and turning them into structured digital workflows.

That includes approvals, recruitment, HR processes, reporting, data collection, and operational activities.

The important part is that automation follows an understanding of the process. The goal is to make the workflow more consistent, traceable, and measurable.`;
    }

    if (
      topic === "database" &&
      hasAny(q, ["more", "details", "tell me more", "explain"])
    ) {
      return `Sure. Stephen primarily works with Microsoft SQL Server.

It supports the data behind his HRIS and ERP-related systems, including employee information, attendance, procurement, inventory, assets, workflows, and reporting.

Because these applications are highly data-driven, database design and application logic are closely connected.`;
    }

    return null;
  }

  /* ============================================================
     ANSWER ENGINE
  ============================================================ */

  function getAnswer(
    question: string,
    previousTopic: PortfolioTopic,
  ): {
    content: string;
    topic: PortfolioTopic;
  } {
    const intent = detectIntent(question, previousTopic);

    /*
     * Question-specific/contextual answers always get priority.
     */
    const contextual = getContextualAnswer(
      question,
      intentToTopic(intent) !== "general"
        ? intentToTopic(intent)
        : previousTopic,
    );

    if (contextual) {
      return {
        content: contextual,
        topic:
          intentToTopic(intent) !== "general"
            ? intentToTopic(intent)
            : previousTopic,
      };
    }

    switch (intent) {
      /* ========================================================
         GREETING
      ======================================================== */

      case "greeting":
        return {
          topic: "about",
          content: `Hi! 👋 I'm Stephen's portfolio assistant.

I can help you explore his background, experience, projects, technical skills, HRIS and ERP work, automation, or hiring opportunities.

What would you like to know?`,
        };

      /* ========================================================
         HELP
      ======================================================== */

      case "help":
        return {
          topic: "general",
          content: `Absolutely. You can ask me about Stephen in a conversational way.

You can ask about his experience, projects, HRIS, ERP, technical skills, automation, APIs, databases, or hiring fit.

You don't need to use exact keywords. You can ask questions naturally and follow up on the answer.`,
        };

      /* ========================================================
         CONFIRMATION
      ======================================================== */

      case "confirmation":
        return {
          topic: previousTopic,
          content:
            previousTopic !== "general"
              ? `Sure — continuing with ${previousTopic}, the key point is that Stephen approaches it from both a software-development and business-process perspective.

You can ask about a specific part of it, and I'll answer that directly.`
              : `Sure. What would you like to explore about Stephen's work?`,
        };

      /* ========================================================
         THANKS
      ======================================================== */

      case "thanks":
        return {
          topic: previousTopic,
          content:
            "You're very welcome! 😊 If there's another part of Stephen's work you'd like to understand, just ask.",
        };

      /* ========================================================
         GOODBYE
      ======================================================== */

      case "goodbye":
        return {
          topic: "general",
          content:
            "Thanks for stopping by! 👋 Feel free to come back if you want to explore more of Stephen's work.",
        };

      /* ========================================================
         ABOUT
      ======================================================== */

      case "about":
        return {
          topic: "about",
          content: `${portfolio.name} is a ${portfolio.fullRole} focused on building practical enterprise software and business systems.

His work combines software development with systems analysis. That means he looks not only at the interface or code, but also at the underlying business process, users, data, approvals, and opportunities for improvement.

His main areas include:

• Enterprise applications
• HRIS
• ERP
• Business process automation
• APIs
• SQL Server
• Dashboards and reporting
• Workflow systems
• Systems analysis

The combination of technical development and business-process thinking is one of the strongest themes in his portfolio.`,
        };

      /* ========================================================
         EXPERIENCE
      ======================================================== */

      case "experience":
        return {
          topic: "experience",
          content: `Stephen's professional experience centers on enterprise software, systems analysis, and business process improvement.

At **${portfolio.experience[0].company}**, he worked as a **${portfolio.experience[0].position}**. His work included HRIS, recruitment, applicant tracking, workforce management, attendance, scheduling, reporting, system optimization, and business process improvement.

At **${portfolio.experience[1].company}**, he worked as a **${portfolio.experience[1].position}**. His work included ERP and HRIS solutions involving procurement, inventory, asset management, attendance, workflows, reporting, and SQL Server.

Across both roles, the common thread is building and improving systems that support actual business operations.`,
        };

      /* ========================================================
         COMPANY
      ======================================================== */

      case "company":
        return {
          topic: "company",
          content: `Stephen's portfolio shows experience with two main companies.

**Lapanday Foods Corporation**

He worked as a **${portfolio.experience[0].position}**, with work focused on HRIS, recruitment, workforce management, attendance, scheduling, reporting, and business process improvement.

**Millennium Specialty Coco Products, Inc.**

He worked as a **${portfolio.experience[1].position}**, developing ERP and HRIS solutions covering procurement, inventory, assets, workflows, reporting, and SQL Server.

Together, these roles show experience with both people-focused systems and broader enterprise operational systems.`,
        };

      /* ========================================================
         PROJECTS
      ======================================================== */

      case "projects":
        return {
          topic: "projects",
          content: `Stephen's projects are primarily business and enterprise systems.

**Enterprise Resource Planning**

${portfolio.projects[0].description}

**Human Resource Information System**

${portfolio.projects[1].description}

**IT & Asset Management**

${portfolio.projects[2].description}

**Lapanday HRIS**

${portfolio.projects[3].description}

Across these projects, the recurring themes are business rules, workflows, approvals, reporting, centralized information, and database-driven processes.`,
        };

      /* ========================================================
         STRONGEST SKILLS
      ======================================================== */

      case "strongestSkills":
        return {
          topic: "skills",
          content: `Stephen's strongest area is the combination of **software development and systems analysis**.

His strongest areas include:

• Full-stack development
• Enterprise application development
• HRIS
• ERP
• SQL Server
• Business process automation
• API-driven applications
• Workflow systems
• Reporting and dashboards
• Systems analysis

From the technology side, C#, ASP.NET, JavaScript/TypeScript, and Microsoft SQL Server are particularly relevant.

The bigger strength is how those technologies are applied: understanding the business problem first, then turning the process into a working system.`,
        };

      /* ========================================================
         SKILLS
      ======================================================== */

      case "skills":
        return {
          topic: "skills",
          content: `Stephen's technical stack covers frontend, backend, API, and database development.

**Languages**

• C#
• JavaScript
• TypeScript
• HTML
• CSS

**Frameworks / Libraries**

• ASP.NET
• Next.js
• Node.js
• Bootstrap
• Tailwind CSS
• jQuery

**Database**

• Microsoft SQL Server

**Tools**

• Git
• GitHub
• VS Code
• Visual Studio
• Postman

This stack is particularly suited to enterprise applications, APIs, HRIS, ERP, dashboards, reporting, and workflow-based systems.`,
        };

      /* ========================================================
         HRIS
      ======================================================== */

      case "hris":
        return {
          topic: "hris",
          content: `${portfolio.hris.summary}

Stephen's HRIS experience includes:

${portfolio.hris.modules.map((item) => `• ${item}`).join("\n")}

The important part is that the HRIS work goes beyond employee records. The systems connect employee information with recruitment, attendance, scheduling, approvals, reporting, and other workforce processes.

Recruitment and applicant tracking are also significant areas, including process automation.`,
        };

      /* ========================================================
         ERP
      ======================================================== */

      case "erp":
        return {
          topic: "erp",
          content: `${portfolio.erp.summary}

The ERP-related areas include:

${portfolio.erp.modules.map((item) => `• ${item}`).join("\n")}

The systems centralize operational information while supporting procurement, inventory, assets, approvals, access control, reporting, and operational monitoring.

His ERP work also connects closely with SQL Server, APIs, workflows, and systems analysis.`,
        };

      /* ========================================================
         AUTOMATION
      ======================================================== */

      case "automation":
        return {
          topic: "automation",
          content: `Stephen approaches automation by first understanding the business process rather than simply automating tasks blindly.

He looks for manual, repetitive, or inefficient steps and then structures them into digital workflows.

That has applied to areas such as:

• Approval workflows
• Recruitment processes
• HR workflows
• Reporting
• Data collection
• Operational processes
• Workflow monitoring
• Centralized information

The overall approach is:

**Understand the process → identify repetitive or inefficient steps → structure the workflow → centralize the data → automate appropriate steps → make the result measurable.**

This is particularly relevant to HRIS and ERP because those systems involve multiple users, approvals, records, and repeated operational activities.`,
        };

      /* ========================================================
         API
      ======================================================== */

      case "api":
        return {
          topic: "api",
          content: `${portfolio.api}

A typical architecture is:

**Frontend → API / Backend → Database**

The API layer can handle business rules, authentication, validation, data operations, and communication between application components.

Stephen's broader full-stack background includes C#, ASP.NET, Node.js, JavaScript, TypeScript, and SQL Server.`,
        };

      /* ========================================================
         DATABASE
      ======================================================== */

      case "database":
        return {
          topic: "database",
          content: `${portfolio.database}

SQL Server supports structured business information such as:

• Employee records
• Attendance
• Procurement
• Inventory
• Assets
• Workflows
• Reporting data
• HR information

Because these systems are highly data-driven, the database is closely connected to the application's business rules and workflows.`,
        };

      /* ========================================================
         CONTACT
      ======================================================== */

      case "contact":
        return {
          topic: "contact",
          content: `You can contact Stephen directly at:

**sjaferrer1@gmail.com**

His LinkedIn profile is also available through the portfolio.

For hiring, collaboration, freelance work, or other professional opportunities, email is the most direct option.`,
        };

      /* ========================================================
         HIRING
      ======================================================== */

      case "hiring":
        return {
          topic: "hiring",
          content: `If you're evaluating Stephen for a role, his profile is particularly relevant if you need someone who can bridge **software development and business systems analysis**.

His experience includes:

• Full-stack application development
• Enterprise systems
• HRIS
• ERP
• SQL Server
• APIs
• Business process automation
• Reporting and dashboards
• Workflow systems
• Systems analysis

A notable strength is that his experience centers on business applications, where technical decisions need to support actual operational requirements.

For an opportunity, you can reach him at **sjaferrer1@gmail.com**.`,
        };

      /* ========================================================
         COMPARISON
      ======================================================== */

      case "comparison":
        return {
          topic: "general",
          content: `Stephen has meaningful experience with both HRIS and ERP, but they solve different business problems.

**HRIS** is more people and workforce focused:

• Employee records
• Attendance
• Leave
• Recruitment
• Applicant tracking
• Scheduling
• Travel
• Workforce management

**ERP** is more operationally focused:

• Procurement
• Inventory
• Asset management
• Approvals
• Access control
• Audit trails
• Reporting

Both rely on the same underlying capabilities: databases, APIs, workflows, permissions, reporting, and business-process analysis.

So his HRIS and ERP experience is complementary rather than competing.`,
        };

      /* ========================================================
         UNKNOWN
      ======================================================== */

      default:
        return {
          topic: previousTopic,
          content: `I want to make sure I answer the question you're actually asking.

I can discuss Stephen's background, experience, projects, technical stack, HRIS, ERP, automation, APIs, SQL Server, strongest skills, hiring fit, or contact information.

You can ask in your own words — for example, if you're asking about automation, you can ask **"How did automation fit into his work?"** and I'll explain the role automation played rather than simply repeating the general automation overview.`,
        };
    }
  }

  /* ============================================================
     QUESTION DEDUPLICATION
  ============================================================ */

  function isSimilarQuestion(a: string, b: string) {
    const first = normalize(a);
    const second = normalize(b);

    if (!first || !second) return false;

    if (first === second) return true;

    /*
     * Prevent suggestions such as:
     *
     * User: "How did automation fit in?"
     * Suggestion: "How did automation fit in?"
     *
     * Also catches small punctuation/wording variations.
     */
    const firstWords = new Set(first.split(" "));
    const secondWords = new Set(second.split(" "));

    const sharedWords = [...firstWords].filter((word) =>
      secondWords.has(word),
    ).length;

    const smallerCount = Math.min(firstWords.size, secondWords.size);

    return smallerCount > 0 && sharedWords / smallerCount >= 0.8;
  }

  function wasQuestionAsked(question: string) {
    return askedQuestionsRef.current.some((asked) =>
      isSimilarQuestion(asked, question),
    );
  }

  function rememberQuestion(question: string) {
    if (!question.trim()) return;

    if (!wasQuestionAsked(question)) {
      askedQuestionsRef.current.push(question);

      /*
       * Keep memory small and relevant.
       */
      if (askedQuestionsRef.current.length > 30) {
        askedQuestionsRef.current.shift();
      }
    }
  }

  /* ============================================================
     FOLLOW-UP QUESTIONS
  ============================================================ */

  function getFollowUpQuestions(topic: PortfolioTopic): string[] {
    let suggestions: string[];

    switch (topic) {
      case "about":
        suggestions = [
          "What are his strongest skills?",
          "What has he built?",
          "Where did he work?",
        ];
        break;

      case "experience":
        suggestions = [
          "What did he do at Lapanday?",
          "What did he do at Millennium?",
          "What technologies did he use?",
        ];
        break;

      case "company":
        suggestions = [
          "Tell me about Lapanday",
          "Tell me about Millennium",
          "What systems did he build?",
        ];
        break;

      case "projects":
        suggestions = [
          "Tell me about the HRIS",
          "Tell me about the ERP",
          "What about asset management?",
        ];
        break;

      case "skills":
        suggestions = [
          "What are his strongest skills?",
          "How does he use SQL Server?",
          "Tell me about his API experience",
        ];
        break;

      case "hris":
        suggestions = [
          "What HRIS modules did he work with?",
          "How did recruitment fit into the HRIS?",
          "How were HR workflows structured?",
        ];
        break;

      case "erp":
        suggestions = [
          "What ERP modules did he work with?",
          "How did automation fit into the ERP?",
          "How did SQL Server support the ERP?",
        ];
        break;

      case "automation":
        suggestions = [
          "What processes did he automate?",
          "How was automation used in HR?",
          "How was automation used in ERP?",
        ];
        break;

      case "api":
        suggestions = [
          "What API technologies did he use?",
          "How does the architecture work?",
          "How does the API connect to SQL Server?",
        ];
        break;

      case "database":
        suggestions = [
          "Why SQL Server?",
          "How was SQL Server used in ERP?",
          "How was SQL Server used in HRIS?",
        ];
        break;

      case "hiring":
        suggestions = [
          "What are his strongest skills?",
          "What enterprise systems has he built?",
          "How can I contact him?",
        ];
        break;

      case "contact":
        suggestions = [
          "Is he available for opportunities?",
          "Why should I hire him?",
          "What are his strongest skills?",
        ];
        break;

      default:
        suggestions = [
          "Who is Stephen?",
          "What's his experience?",
          "What has he built?",
          "What's his tech stack?",
          "Tell me about HRIS",
          "Tell me about ERP",
        ];
        break;
    }

    /*
     * Remove questions that have already been asked.
     */
    const filtered = suggestions.filter(
      (suggestion) => !wasQuestionAsked(suggestion),
    );

    /*
     * If everything has already been asked, return a fresh
     * generic set instead of repeating the current question.
     */
    if (filtered.length > 0) {
      return filtered.slice(0, 3);
    }

    return [
      "Tell me more about his experience",
      "What makes his approach different?",
      "What else has he worked on?",
    ].filter((suggestion) => !wasQuestionAsked(suggestion));
  }

  /* ============================================================
     NATURAL RESPONSE DELAY
  ============================================================ */

  function getResponseDelay(question: string) {
    const length = question.trim().length;

    if (length < 20) return 350;
    if (length < 60) return 500;
    if (length < 120) return 650;

    return 750;
  }

  /* ============================================================
     MESSAGE ID
  ============================================================ */

  function createMessageId() {
    return Date.now() + Math.random();
  }

  /* ============================================================
     SEND MESSAGE
  ============================================================ */

  function sendMessage(value = input) {
    const question = value.trim();

    if (!question || typing) {
      return;
    }

    const previousTopic = topicRef.current;

    /*
     * Remember the actual question before generating suggestions.
     */
    rememberQuestion(question);

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: question,
    };

    setMessages((current) => [...current, userMessage]);

    setInput("");
    setTyping(true);

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    const delay = getResponseDelay(question);

    timeoutRef.current = window.setTimeout(() => {
      const result = getAnswer(question, previousTopic);
      const streamTokens = result.content.match(/[^\s]+|\s+/g) ?? [];

      if (!streamTokens.length) {
        topicRef.current = result.topic;
        setCurrentTopic(result.topic);
        setTyping(false);
        timeoutRef.current = null;
        return;
      }

      const assistantId = createMessageId();

      setMessages((current) => [
        ...current,
        {
          id: assistantId,
          role: "assistant",
          content: "",
        },
      ]);

      topicRef.current = result.topic;
      setCurrentTopic(result.topic);

      let index = 0;

      const streamNextWord = () => {
        const nextText = streamTokens.slice(0, index + 1).join("");

        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? { ...message, content: nextText }
              : message,
          ),
        );

        index += 1;

        if (index < streamTokens.length) {
          timeoutRef.current = window.setTimeout(
            streamNextWord,
            20 + (index % 5) * 20,
          );
          return;
        }

        setTyping(false);
        timeoutRef.current = null;
      };

      timeoutRef.current = window.setTimeout(streamNextWord, 90);
    }, delay);
  }

  /* ============================================================
     SUBMIT
  ============================================================ */

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    sendMessage();
  }

  /* ============================================================
     INPUT
  ============================================================ */

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const textarea = event.currentTarget;

    setInput(textarea.value);

    textarea.style.height = "auto";

    const newHeight = Math.min(textarea.scrollHeight, 128);

    textarea.style.height = `${newHeight}px`;
  }

  /* ============================================================
     QUESTIONS
  ============================================================ */

  const showInitialQuestions = messages.length === 0;

  const followUpQuestions =
    messages.length === 0
      ? preparedQuestions
      : getFollowUpQuestions(currentTopic);

  /* ============================================================
     UI
  ============================================================ */

 const [viewportHeight, setViewportHeight] = useState<number | null>(null);

useEffect(() => {
  const viewport = window.visualViewport;

  if (!viewport) return;

  const updateHeight = () => {
    setViewportHeight(viewport.height);
  };

  updateHeight();

  viewport.addEventListener("resize", updateHeight);
  viewport.addEventListener("scroll", updateHeight);

  return () => {
    viewport.removeEventListener("resize", updateHeight);
    viewport.removeEventListener("scroll", updateHeight);
  };
}, []);

return (
  <div
    className="absolute inset-0 flex min-h-0 flex-col overflow-hidden bg-[var(--bg)] text-[var(--text)]"
    style={{
      height: viewportHeight ? `${viewportHeight}px` : "100dvh",
    }}
  >
    {/* ========================================================
        HEADER
    ======================================================== */}

    <header className="z-20 shrink-0 border-b border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] transition-colors hover:bg-[var(--surface-2)]"
            aria-label="Close chat"
          >
            <CloseIcon />
          </button>

          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">
              Stephen's Assistant
            </div>

            <div className="hidden text-[9px] text-[var(--muted)] sm:block">
              Ask only about Stephen
            </div>
          </div>
        </div>

        <div className="hidden rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--muted)] sm:block">
          Stephen's Information Only
        </div>
      </div>
    </header>

    {/* ========================================================
        CHAT BODY
    ======================================================== */}

    <main
      className="chat-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain"
      style={{
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-3 pb-4 pt-5 sm:px-6 sm:pb-8 sm:pt-8">
        <div className="mx-auto w-full max-w-[720px]">

          {/* ==================================================
              EMPTY STATE
          ================================================== */}

          {messages.length === 0 && (
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#171717] text-[10px] font-black text-white dark:bg-white dark:text-black">
                  SJ
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-semibold">
                    Stephen's Assistant
                  </div>

                  <div className="text-[10px] text-[var(--muted)]">
                    Portfolio knowledge assistant
                  </div>
                </div>
              </div>

              <div className="max-w-[680px] text-sm leading-7 text-[var(--text)]">
                Hi! 👋 I'm here to help you learn more about Stephen.
                <br />
                <br />
                Ask me about his experience, projects, HRIS, ERP, technical
                skills, automation, or hiring. You can ask naturally — you
                don't need to use specific keywords.
              </div>
            </div>
          )}

          {/* ==================================================
              MESSAGES
          ================================================== */}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message mb-6 flex gap-2.5 sm:mb-7 sm:gap-3 ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#171717] text-[8px] font-black text-white dark:bg-white dark:text-black">
                  SJ
                </div>
              )}

              <div
                className={`min-w-0 max-w-[90%] text-sm leading-7 sm:max-w-[88%] ${
                  message.role === "user"
                    ? "rounded-3xl bg-[var(--surface-2)] px-4 py-2.5 sm:px-5 sm:py-3"
                    : "pt-0"
                }`}
              >
                <MessageContent content={message.content} />
              </div>
            </div>
          ))}

          {/* ==================================================
              TYPING INDICATOR
          ================================================== */}

          {typing && (
            <div className="mb-6 flex gap-2.5 sm:mb-7 sm:gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#171717] text-[8px] font-black text-white dark:bg-white dark:text-black">
                SJ
              </div>

              <div className="flex items-center gap-1 pt-2">
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
              </div>
            </div>
          )}

          {/* ==================================================
              SUGGESTIONS
          ================================================== */}

          {!typing && followUpQuestions.length > 0 && (
            <div className="mt-6">
              <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--muted-2)]">
                {showInitialQuestions
                  ? "Explore"
                  : "You might also ask"}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {followUpQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    disabled={typing}
                    className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-[11px] font-medium text-[var(--muted)] transition-all hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)] hover:text-[var(--text)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </main>

    {/* ========================================================
        COMPOSER
    ======================================================== */}

    <div className="z-30 shrink-0 border-t border-[var(--line)] bg-[var(--bg)]/95 px-3 pt-2.5 backdrop-blur-xl sm:px-4">
      <div className="mx-auto w-full max-w-5xl sm:px-6">
        <div className="mx-auto max-w-[720px]">

          <form
            onSubmit={handleSubmit}
            className="relative rounded-3xl border border-[var(--line-strong)] bg-[var(--surface)] shadow-[0_8px_30px_rgba(0,0,0,.06)] transition-shadow focus-within:shadow-[0_8px_35px_rgba(0,0,0,.1)]"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();

                  if (!typing && input.trim()) {
                    sendMessage();
                  }
                }
              }}
              rows={1}
              placeholder="Message Stephen's Assistant..."
              className="max-h-32 min-h-[52px] w-full resize-none overflow-y-auto bg-transparent px-4 py-3.5 pr-14 text-[16px] leading-6 outline-none placeholder:text-[var(--muted-2)] sm:px-5 sm:py-4 sm:text-sm"
              disabled={typing}
              aria-label="Message Stephen's Assistant"
              inputMode="text"
              enterKeyHint="send"
            />

            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#171717] text-white transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-white dark:text-black"
              aria-label="Send message"
            >
              <ArrowUp />
            </button>
          </form>

          <div className="mt-1.5 hidden pb-[max(0.5rem,env(safe-area-inset-bottom))] text-center text-[9px] text-[var(--muted-2)] sm:block">
            Answers are limited to information about Stephen.
          </div>

          {/* Mobile safe-area */}
          <div className="h-[max(0.5rem,env(safe-area-inset-bottom))] sm:hidden" />
        </div>
      </div>
    </div>
  </div>
);

}
/* ============================================================
   SNAKE GAME
   SAME LAYOUT AS CHAT / PORTFOLIO
   ONE SCREEN / NO PAGE SCROLL
============================================================ */


type SnakePoint = {
  x: number;
  y: number;
};

const BOARD_SIZE = 10;
const SNAKE_COLS = 20;
const SNAKE_ROWS = 20;

// function CloseIcon() {
//   return (
//     <svg
//       width="14"
//       height="14"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   );
// }

function SnakeGame({
  onClose,
  onTrackEvent,
}: {
  onClose: () => void;
  onTrackEvent: (input: {
    type: AnalyticsEventType;
    action: string;
    module: string;
    direction?: "up" | "down" | "left" | "right";
    score?: number;
  }) => void;
}) {
  const [userPosition, setUserPosition] = useState(0);
  const [computerPosition, setComputerPosition] = useState(0);

  const [currentTurn, setCurrentTurn] = useState<
    "user" | "computer"
  >("user");

  const [diceValue, setDiceValue] = useState<number | null>(
    null,
  );

  const [status, setStatus] = useState(
    "Your turn. Roll the dice.",
  );

  const [winner, setWinner] = useState<
    "user" | "computer" | null
  >(null);

  const [isRolling, setIsRolling] = useState(false);

  /*
   * Used to animate the token when it lands on each box.
   */
  const [userJump, setUserJump] = useState(false);
  const [computerJump, setComputerJump] = useState(false);

  /*
   * Every new animation gets an ID.
   * Reset increments this so old animations stop safely.
   */
  const animationId = useRef(0);

  /* ============================================================
     BOARD DATA
  ============================================================ */

  const ladders = [
    { from: 3, to: 22 },
    { from: 8, to: 30 },
    { from: 18, to: 41 },
    { from: 27, to: 53 },
    { from: 36, to: 44 },
    { from: 48, to: 66 },
    { from: 52, to: 81 },
    { from: 71, to: 92 },
    { from: 89, to: 98 },
  ];

  const snakes = [
    { from: 17, to: 7 },
    { from: 29, to: 9 },
    { from: 38, to: 19 },
    { from: 47, to: 26 },
    { from: 54, to: 34 },
    { from: 63, to: 45 },
    { from: 72, to: 49 },
    { from: 86, to: 62 },
    { from: 94, to: 74 },
    { from: 99, to: 78 },
  ];

  const ladderMap = Object.fromEntries(
    ladders.map((item) => [item.from, item.to]),
  );

  const snakeMap = Object.fromEntries(
    snakes.map((item) => [item.from, item.to]),
  );

  /* ============================================================
     BOARD HELPERS
  ============================================================ */

  function getBoardCoordinates(cellNumber: number) {
    if (cellNumber <= 0) {
      return {
        row: BOARD_SIZE - 1,
        col: 0,
      };
    }

    const zeroIndexed = cellNumber - 1;

    const rowFromBottom = Math.floor(
      zeroIndexed / BOARD_SIZE,
    );

    const colFromLeft = zeroIndexed % BOARD_SIZE;

    const displayRow =
      BOARD_SIZE - 1 - rowFromBottom;

    const displayCol =
      rowFromBottom % 2 === 0
        ? colFromLeft
        : BOARD_SIZE - 1 - colFromLeft;

    return {
      row: displayRow,
      col: displayCol,
    };
  }

  function getBoardCellCenter(cellNumber: number) {
    const { row, col } =
      getBoardCoordinates(cellNumber);

    return {
      x: ((col + 0.5) / BOARD_SIZE) * 100,
      y: ((row + 0.5) / BOARD_SIZE) * 100,
    };
  }

  function getCellNumber(row: number, col: number) {
    const rowFromBottom =
      BOARD_SIZE - 1 - row;

    return rowFromBottom % 2 === 0
      ? rowFromBottom * BOARD_SIZE + col + 1
      : (rowFromBottom + 1) * BOARD_SIZE - col;
  }

  /* ============================================================
     DELAY HELPER
  ============================================================ */

  function wait(ms: number) {
    return new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms);
    });
  }

  /* ============================================================
     MOVE CALCULATION
  ============================================================ */

  function getMoveResult(
    player: "user" | "computer",
    roll: number,
    currentPosition: number,
  ) {
    const nextTarget =
      currentPosition + roll;

    /*
     * Exact 100 is required.
     */
    if (nextTarget > 100) {
      const needed =
        100 - currentPosition;

      const message =
        player === "user"
          ? `You rolled ${roll}, but you need ${needed} to finish.`
          : `Stephen rolled ${roll}, but he needs ${needed} to finish.`;

      return {
        target: currentPosition,
        final: currentPosition,
        action: null as
          | "ladder"
          | "snake"
          | null,
        message,
        winner: null as
          | "user"
          | "computer"
          | null,
      };
    }

    let finalPosition = nextTarget;

    let action:
      | "ladder"
      | "snake"
      | null = null;

    /*
     * Check ladder first.
     */
    if (ladderMap[nextTarget]) {
      finalPosition =
        ladderMap[nextTarget];

      action = "ladder";
    }

    /*
     * Check snake.
     */
    else if (snakeMap[nextTarget]) {
      finalPosition =
        snakeMap[nextTarget];

      action = "snake";
    }

    /*
     * Winner.
     */
    if (finalPosition === 100) {
      const message =
        player === "user"
          ? "You reached 100 and won the game!"
          : "Stephen reached 100 first and wins the match.";

      return {
        target: nextTarget,
        final: finalPosition,
        action,
        message,
        winner: player,
      };
    }

    let message =
      player === "user"
        ? `You rolled ${roll} and moved to ${nextTarget}.`
        : `Stephen rolled ${roll} and moved to ${nextTarget}.`;

    if (action === "ladder") {
      message += ` Ladder! ${nextTarget} → ${finalPosition}.`;
    }

    if (action === "snake") {
      message += ` Snake! ${nextTarget} → ${finalPosition}.`;
    }

    return {
      target: nextTarget,
      final: finalPosition,
      action,
      message,
      winner: null,
    };
  }

  /* ============================================================
     TOKEN JUMP
  ============================================================ */

  async function animateTokenJump(
    player: "user" | "computer",
    from: number,
    to: number,
    animation: number,
  ) {
    const setPosition =
      player === "user"
        ? setUserPosition
        : setComputerPosition;

    const setJump =
      player === "user"
        ? setUserJump
        : setComputerJump;

    /*
     * Move one square at a time.
     */
    for (
      let position = from + 1;
      position <= to;
      position++
    ) {
      if (
        animationId.current !==
        animation
      ) {
        return false;
      }

      setPosition(position);

      /*
       * Trigger jump animation.
       */
      setJump(false);

      await wait(20);

      if (
        animationId.current !==
        animation
      ) {
        return false;
      }

      setJump(true);

      /*
       * Time of one square movement.
       */
      await wait(230);

      setJump(false);
    }

    return true;
  }

  /* ============================================================
     SNAKE / LADDER ANIMATION
  ============================================================ */

  async function animateSpecialMove(
    player: "user" | "computer",
    from: number,
    to: number,
    action: "ladder" | "snake",
    animation: number,
  ) {
    const setPosition =
      player === "user"
        ? setUserPosition
        : setComputerPosition;

    const setJump =
      player === "user"
        ? setUserJump
        : setComputerJump;

    if (
      animationId.current !==
      animation
    ) {
      return false;
    }

    /*
     * Pause on the snake / ladder starting box.
     */
    await wait(250);

    if (
      animationId.current !==
      animation
    ) {
      return false;
    }

    /*
     * LADDER:
     * token jumps upward through the ladder.
     */
    if (action === "ladder") {
      setJump(true);

      /*
       * Small visual jump first.
       */
      await wait(180);

      if (
        animationId.current !==
        animation
      ) {
        return false;
      }

      setPosition(to);

      await wait(520);

      setJump(false);
    }

    /*
     * SNAKE:
     * token slides down.
     */
    else {
      setJump(false);

      await wait(120);

      if (
        animationId.current !==
        animation
      ) {
        return false;
      }

      setPosition(to);

      await wait(600);
    }

    return true;
  }

  /* ============================================================
     COMPLETE PLAYER MOVE
  ============================================================ */

  async function performMove(
    player: "user" | "computer",
    roll: number,
    startingPosition: number,
    animation: number,
  ) {
    const result = getMoveResult(
      player,
      roll,
      startingPosition,
    );

    /*
     * Move through normal squares first.
     *
     * Example:
     *
     * 10 → 11 → 12 → 13 → 14
     */
    const normalMovementFinished =
      await animateTokenJump(
        player,
        startingPosition,
        result.target,
        animation,
      );

    if (!normalMovementFinished) {
      return null;
    }

    /*
     * Snake / ladder.
     *
     * Example:
     *
     * 10 → 11 → 12 → 13 → 14
     *                         ↓
     *                       ladder
     *                         ↓
     *                        44
     */
    if (result.action) {
      const specialMoveFinished =
        await animateSpecialMove(
          player,
          result.target,
          result.final,
          result.action,
          animation,
        );

      if (!specialMoveFinished) {
        return null;
      }
    }

    /*
     * Make sure the final state is correct.
     */
    if (
      animationId.current !==
      animation
    ) {
      return null;
    }

    if (player === "user") {
      setUserPosition(result.final);
    } else {
      setComputerPosition(result.final);
    }

    return result;
  }

  /* ============================================================
     RESET
  ============================================================ */

  function resetGame() {
    /*
     * Cancel all previous movement animations.
     */
    animationId.current += 1;

    setUserPosition(0);
    setComputerPosition(0);

    setCurrentTurn("user");

    setDiceValue(null);

    setStatus(
      "Your turn. Roll the dice.",
    );

    setWinner(null);

    setIsRolling(false);

    setUserJump(false);
    setComputerJump(false);

    onTrackEvent({
      type: "game_start",
      action: "Game started",
      module: "Game",
    });
  }

  /* ============================================================
     COMPUTER TURN
  ============================================================ */

  useEffect(() => {
    if (
      winner ||
      currentTurn !== "computer"
    ) {
      return;
    }

    let cancelled = false;

    setIsRolling(true);

    setStatus(
      "Stephen is rolling...",
    );

    const timer =
      window.setTimeout(async () => {
        if (cancelled) {
          return;
        }

        const roll =
          Math.floor(
            Math.random() * 6,
          ) + 1;

        /*
         * Capture starting position BEFORE animation.
         */
        const startingPosition =
          computerPosition;

        setDiceValue(roll);

        /*
         * Show dice result first.
         */
        setStatus(
          `Stephen rolled ${roll}.`,
        );

        await wait(400);

        if (cancelled) {
          return;
        }

        /*
         * New animation ID.
         */
        const animation =
          ++animationId.current;

        const result =
          await performMove(
            "computer",
            roll,
            startingPosition,
            animation,
          );

        if (
          cancelled ||
          !result
        ) {
          return;
        }

        if (result.winner) {
          setWinner(
            result.winner,
          );

          setStatus(
            result.message,
          );

          setIsRolling(false);

          return;
        }

        setStatus(
          result.message,
        );

        setCurrentTurn("user");

        setIsRolling(false);
      }, 900);

    return () => {
      cancelled = true;

      window.clearTimeout(
        timer,
      );
    };
  }, [
    currentTurn,
    winner,
  ]);

  /* ============================================================
     USER TURN
  ============================================================ */

  async function rollDice() {
    if (
      winner ||
      currentTurn !== "user" ||
      isRolling
    ) {
      return;
    }

    const roll =
      Math.floor(
        Math.random() * 6,
      ) + 1;

    const startingPosition =
      userPosition;

    const animation =
      ++animationId.current;

    setIsRolling(true);

    setDiceValue(roll);

    setStatus(
      `You rolled ${roll}.`,
    );

    /*
     * Give the user a short moment to see
     * the dice before the token starts moving.
     */
    await wait(400);

    if (
      animationId.current !==
      animation
    ) {
      return;
    }

    const result =
      await performMove(
        "user",
        roll,
        startingPosition,
        animation,
      );

    if (
      !result ||
      animationId.current !==
        animation
    ) {
      return;
    }

    if (result.winner) {
      setWinner(
        result.winner,
      );

      setStatus(
        result.message,
      );

      onTrackEvent({
        type: "game_win",
        action: "Game won",
        module: "Game",
        score: result.final,
      });

      setIsRolling(false);

      return;
    }

    if (result.action === "snake") {
      onTrackEvent({
        type: "snake_move",
        action: `You moved ${result.target} → ${result.final}`,
        module: "Game",
        direction: "down",
        score: result.final,
      });
    } else if (result.action === "ladder") {
      onTrackEvent({
        type: "snake_move",
        action: `You moved ${result.target} → ${result.final}`,
        module: "Game",
        direction: "up",
        score: result.final,
      });
    } else {
      onTrackEvent({
        type: "snake_move",
        action: `You moved to ${result.final}`,
        module: "Game",
        direction: "right",
        score: result.final,
      });
    }

    setStatus(
      result.message,
    );

    setCurrentTurn("computer");

    setIsRolling(false);
  }

  /* ============================================================
     TOKEN COMPONENT
  ============================================================ */

  function PlayerToken({
    type,
    position,
    jumping,
  }: {
    type: "user" | "computer";
    position: number;
    jumping: boolean;
  }) {
    if (position <= 0) {
      return null;
    }

    const center =
      getBoardCellCenter(
        position,
      );

    const isUser =
      type === "user";

    return (
      <div
        className="pointer-events-none absolute z-[10]"
        style={{
          left: `${center.x}%`,
          top: `${center.y}%`,
          width: isUser
            ? "6.3%"
            : "5.8%",
          aspectRatio: "1",
          transform:
            "translate(-50%, -50%)",
        }}
      >
        <div
          className={[
            "flex h-full w-full items-center justify-center rounded-full border-2",
            "transition-transform duration-200 ease-out",
            isUser
              ? "border-white bg-white shadow-[0_0_18px_rgba(255,255,255,.8)]"
              : "border-amber-100 bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,.85)]",
            jumping
              ? "animate-[snakeTokenJump_230ms_ease-in-out]"
              : "",
          ].join(" ")}
        >
          <div
            className={[
              "rounded-full",
              isUser
                ? "h-[28%] w-[28%] bg-neutral-400"
                : "h-[30%] w-[30%] bg-amber-100",
            ].join(" ")}
          />
        </div>
      </div>
    );
  }

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {/* ========================================================
          ANIMATIONS
      ======================================================== */}

      <style>{`
        @keyframes snakeTokenJump {
          0% {
            transform: translateY(0) scale(1);
          }

          25% {
            transform: translateY(-28%) scale(1.08);
          }

          50% {
            transform: translateY(-38%) scale(1.04);
          }

          75% {
            transform: translateY(-18%) scale(1.07);
          }

          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes statusPop {
          0% {
            opacity: 0;
            transform: translateY(-8px) scale(.96);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes ladderPulse {
          0%,
          100% {
            opacity: .78;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes snakePulse {
          0%,
          100% {
            opacity: .86;
          }

          50% {
            opacity: 1;
          }
        }
      `}</style>

      {/* ========================================================
          HEADER
      ======================================================== */}

      <header className="shrink-0 border-b border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] transition-colors hover:bg-[var(--surface-2)]"
              aria-label="Close game"
            >
              <CloseIcon />
            </button>

            <div className="min-w-0">
              <div className="text-sm font-semibold">
                Snakes & Ladders
              </div>

              <div className="hidden text-[9px] text-[var(--muted)] sm:block">
                Stephen vs You
              </div>
            </div>
          </div>

          <button
            onClick={resetGame}
            className="rounded-full bg-[#171717] px-3 py-1.5 text-[9px] font-semibold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-black"
          >
            RESET
          </button>
        </div>
      </header>

      {/* ========================================================
          MAIN
      ======================================================== */}

      <main className="min-h-0 flex-1 overflow-hidden">
        <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-center px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex h-full w-full max-w-[920px] flex-col justify-center gap-4">

            {/* ==================================================
                TITLE
            ================================================== */}

            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="mono text-[8px] uppercase tracking-[0.25em] text-[var(--muted-2)]">
                  Classic Board / 01
                </div>

                <h1 className="mt-1 text-3xl font-black tracking-[-0.065em] sm:text-4xl">
                  Snakes & Ladders.
                </h1>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5">
                <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[var(--muted-2)]">
                  Dice
                </span>

                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg bg-[#171717] text-sm font-black text-white dark:bg-white dark:text-black ${
                    isRolling
                      ? "animate-pulse"
                      : ""
                  }`}
                >
                  {diceValue ?? "-"}
                </span>
              </div>
            </div>

            {/* ==================================================
                TURN INDICATOR
            ================================================== */}

            {/* <div className="flex flex-wrap gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2">
              <div
                className={`rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] ${
                  currentTurn === "user" &&
                  !winner
                    ? "border-[var(--line-strong)] bg-[var(--bg)] text-[var(--text)]"
                    : "border-[var(--line)] bg-transparent text-[var(--muted)]"
                }`}
              >
                Your Turn
              </div>

              <div
                className={`rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] ${
                  currentTurn === "computer" &&
                  !winner
                    ? "border-[var(--line-strong)] bg-[var(--bg)] text-[var(--text)]"
                    : "border-[var(--line)] bg-transparent text-[var(--muted)]"
                }`}
              >
                Stephen's Turn
              </div>
            </div> */}

            {/* ==================================================
                GAME AREA
            ================================================== */}

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_290px]">

              {/* ==================================================
                  BOARD
              ================================================== */}

              <div className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-2.5 shadow-[0_20px_60px_rgba(0,0,0,.08)]">
                <div className="relative overflow-hidden rounded-[18px] bg-[#111111] p-2 shadow-inner">

                  {/* ==================================================
                      STATUS POPOVER
                  ================================================== */}

                  <div
                    key={`${status}-${diceValue}-${currentTurn}-${winner}`}
                    className="pointer-events-none absolute left-1/2 top-3 z-[30] -translate-x-1/2"
                  >
                    <div className="animate-[statusPop_220ms_ease-out] whitespace-nowrap rounded-full border border-white/10 bg-black/80 px-4 py-2 text-center text-[9px] font-medium text-white shadow-[0_12px_35px_rgba(0,0,0,.4)] backdrop-blur-xl">
                      <span
                        className={`mr-2 inline-block h-1.5 w-1.5 rounded-full ${
                          winner
                            ? winner ===
                              "user"
                              ? "bg-emerald-400"
                              : "bg-amber-400"
                            : "bg-white/80"
                        }`}
                      />

                      {winner
                        ? winner ===
                          "user"
                          ? "You win!"
                          : "Stephen wins!"
                        : status}
                    </div>
                  </div>

                  {/* ==================================================
                      BOARD CELLS
                  ================================================== */}

                  <div className="relative">
                    <div className="relative z-[1] grid grid-cols-10 gap-[2px]">
                      {Array.from({
                        length:
                          BOARD_SIZE *
                          BOARD_SIZE,
                      }).map(
                        (_, index) => {
                          const row =
                            Math.floor(
                              index /
                                BOARD_SIZE,
                            );

                          const col =
                            index %
                            BOARD_SIZE;

                          const cellNumber =
                            getCellNumber(
                              row,
                              col,
                            );

                          const isStart =
                            cellNumber ===
                            1;

                          const isFinish =
                            cellNumber ===
                            100;

                          const isLadderStart =
                            Boolean(
                              ladderMap[
                                cellNumber
                              ],
                            );

                          const isSnakeStart =
                            Boolean(
                              snakeMap[
                                cellNumber
                              ],
                            );

                          const isSpecial =
                            isStart ||
                            isFinish ||
                            isLadderStart ||
                            isSnakeStart;

                          return (
                            <div
                              key={
                                cellNumber
                              }
                              className={[
                                "relative flex aspect-square items-center justify-center overflow-hidden rounded-[4px]",
                                "border text-[8px] font-semibold",
                                isSpecial
                                  ? "border-white/15"
                                  : "border-white/[0.06]",
                                (row +
                                  col) %
                                  2 ===
                                0
                                  ? "bg-[#242424]"
                                  : "bg-[#1e1e1e]",
                              ].join(
                                " ",
                              )}
                            >
                              {/* CELL NUMBER */}

                              <span
                                className={`absolute left-1 top-1 z-[2] text-[7px] ${
                                  isSpecial
                                    ? "text-white/65"
                                    : "text-white/30"
                                }`}
                              >
                                {
                                  cellNumber
                                }
                              </span>

                              {/* START */}

                              {isStart && (
                                <span className="absolute bottom-1 right-1 rounded bg-emerald-400/15 px-1 text-[6px] font-black text-emerald-300">
                                  START
                                </span>
                              )}

                              {/* FINISH */}

                              {isFinish && (
                                <span className="absolute bottom-1 right-1 rounded bg-yellow-400/15 px-1 text-[6px] font-black text-yellow-300">
                                  FINISH
                                </span>
                              )}
                            </div>
                          );
                        },
                      )}
                    </div>

                    {/* ==================================================
                        SNAKES + LADDERS
                    ================================================== */}

                    <svg
                      viewBox="0 0 100 100"
                      className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
                      preserveAspectRatio="none"
                    >
                      {/* ==================================================
                          LADDERS — GRAY
                      ================================================== */}

                      {ladders.map(
                        (ladder) => {
                          const start =
                            getBoardCellCenter(
                              ladder.from,
                            );

                          const end =
                            getBoardCellCenter(
                              ladder.to,
                            );

                          const dx =
                            end.x -
                            start.x;

                          const dy =
                            end.y -
                            start.y;

                          const length =
                            Math.sqrt(
                              dx * dx +
                                dy * dy,
                            ) || 1;

                          const perpX =
                            (-dy /
                              length) *
                            1.15;

                          const perpY =
                            (dx /
                              length) *
                            1.15;

                          return (
                            <g
                              key={`ladder-${ladder.from}`}
                              style={{
                                animation:
                                  "ladderPulse 2.5s ease-in-out infinite",
                              }}
                            >
                              {/* Left rail */}

                              <line
                                x1={
                                  start.x -
                                  perpX
                                }
                                y1={
                                  start.y -
                                  perpY
                                }
                                x2={
                                  end.x -
                                  perpX
                                }
                                y2={
                                  end.y -
                                  perpY
                                }
                                stroke="#9ca3af"
                                strokeWidth="0.7"
                                strokeLinecap="round"
                              />

                              {/* Right rail */}

                              <line
                                x1={
                                  start.x +
                                  perpX
                                }
                                y1={
                                  start.y +
                                  perpY
                                }
                                x2={
                                  end.x +
                                  perpX
                                }
                                y2={
                                  end.y +
                                  perpY
                                }
                                stroke="#9ca3af"
                                strokeWidth="0.7"
                                strokeLinecap="round"
                              />

                              {/* Rungs */}

                              {Array.from({
                                length: 5,
                              }).map(
                                (
                                  _,
                                  index,
                                ) => {
                                  const t =
                                    (index +
                                      1) /
                                    6;

                                  const rungX =
                                    start.x +
                                    dx * t;

                                  const rungY =
                                    start.y +
                                    dy * t;

                                  return (
                                    <line
                                      key={`${ladder.from}-rung-${index}`}
                                      x1={
                                        rungX -
                                        perpX
                                      }
                                      y1={
                                        rungY -
                                        perpY
                                      }
                                      x2={
                                        rungX +
                                        perpX
                                      }
                                      y2={
                                        rungY +
                                        perpY
                                      }
                                      stroke="#9ca3af"
                                      strokeWidth="0.6"
                                      strokeLinecap="round"
                                    />
                                  );
                                },
                              )}
                            </g>
                          );
                        },
                      )}

                      {/* ==================================================
                          SNAKES — BLACK
                      ================================================== */}

                      {snakes.map(
                        (snake) => {
                          const start =
                            getBoardCellCenter(
                              snake.from,
                            );

                          const end =
                            getBoardCellCenter(
                              snake.to,
                            );

                          const dx =
                            end.x -
                            start.x;

                          const dy =
                            end.y -
                            start.y;

                          const cx1 =
                            start.x +
                            dx * 0.15;

                          const cy1 =
                            start.y +
                            (dy > 0
                              ? 12
                              : -12);

                          const cx2 =
                            start.x +
                            dx * 0.85;

                          const cy2 =
                            end.y +
                            (dy > 0
                              ? -12
                              : 12);

                          const snakePath = `
                            M ${start.x} ${start.y}
                            C ${cx1} ${cy1},
                              ${cx2} ${cy2},
                              ${end.x} ${end.y}
                          `;

                          return (
                            <g
                              key={`snake-${snake.from}`}
                              style={{
                                animation:
                                  "snakePulse 2.8s ease-in-out infinite",
                              }}
                            >
                              {/* Snake shadow */}

                              <path
                                d={
                                  snakePath
                                }
                                fill="none"
                                stroke="#000000"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                opacity="0.4"
                              />

                              {/* Black snake body */}

                              <path
                                d={
                                  snakePath
                                }
                                fill="none"
                                stroke="#050505"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                opacity="1"
                              />

                              {/* Subtle highlight */}

                              <path
                                d={
                                  snakePath
                                }
                                fill="none"
                                stroke="#525252"
                                strokeWidth="0.3"
                                strokeLinecap="round"
                                opacity="0.8"
                              />

                              {/* Snake head */}

                              <circle
                                cx={
                                  start.x
                                }
                                cy={
                                  start.y
                                }
                                r="1.8"
                                fill="#050505"
                                stroke="#6b7280"
                                strokeWidth="0.35"
                              />

                              {/* Eyes */}

                              <circle
                                cx={
                                  start.x -
                                  0.55
                                }
                                cy={
                                  start.y -
                                  0.35
                                }
                                r="0.25"
                                fill="white"
                              />

                              <circle
                                cx={
                                  start.x +
                                  0.55
                                }
                                cy={
                                  start.y -
                                  0.35
                                }
                                r="0.25"
                                fill="white"
                              />

                              {/* Pupils */}

                              <circle
                                cx={
                                  start.x -
                                  0.55
                                }
                                cy={
                                  start.y -
                                  0.35
                                }
                                r="0.1"
                                fill="black"
                              />

                              <circle
                                cx={
                                  start.x +
                                  0.55
                                }
                                cy={
                                  start.y -
                                  0.35
                                }
                                r="0.1"
                                fill="black"
                              />
                            </g>
                          );
                        },
                      )}
                    </svg>

                    {/* ==================================================
                        PLAYER TOKENS
                    ================================================== */}

                    <PlayerToken
                      type="user"
                      position={
                        userPosition
                      }
                      jumping={
                        userJump
                      }
                    />

                    <PlayerToken
                      type="computer"
                      position={
                        computerPosition
                      }
                      jumping={
                        computerJump
                      }
                    />
                  </div>
                </div>
              </div>

              {/* ==================================================
                  SIDE PANEL
              ================================================== */}

              <aside className="flex flex-col gap-3 rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-4">

                {/* TURN */}

                <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-3">
                  <div className="text-[8px] uppercase tracking-[0.2em] text-[var(--muted-2)]">
                    Turn
                  </div>

                  <div className="mt-1 text-lg font-black tracking-[-0.04em]">
                    {winner
                      ? winner ===
                        "user"
                        ? "You win"
                        : "Stephen wins"
                      : currentTurn ===
                          "user"
                        ? "Your move"
                        : "Stephen's move"}
                  </div>

                  {!winner &&
                    currentTurn ===
                      "computer" && (
                      <div className="mt-1 text-[9px] text-[var(--muted)]">
                        Stephen is thinking...
                      </div>
                    )}
                </div>

                {/* SCORE */}

                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted-2)]">
                      You
                    </span>

                    <span className="text-lg font-black tracking-[-0.04em]">
                      {
                        userPosition
                      }
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted-2)]">
                      Stephen
                    </span>

                    <span className="text-lg font-black tracking-[-0.04em]">
                      {
                        computerPosition
                      }
                    </span>
                  </div>
                </div>

                {/* ROLL BUTTON */}

                <button
                  type="button"
                  onClick={
                    rollDice
                  }
                  disabled={
                    winner !==
                      null ||
                    currentTurn !==
                      "user" ||
                    isRolling
                  }
                  className="rounded-2xl bg-[#171717] px-4 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black"
                >
                  {isRolling
                    ? "Rolling..."
                    : currentTurn ===
                        "computer"
                      ? "Stephen is rolling..."
                      : "Roll Dice"}
                </button>

                {/* GUIDE */}

                <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-3 text-[9px] leading-5 text-[var(--muted)]">
  <div className="mb-1 font-semibold uppercase tracking-[0.18em] text-[var(--muted-2)]">
    Guide
  </div>

  <div className="flex items-center gap-2">
    <span className="h-1.5 w-5 rounded-full bg-white" />
    <span>White = You</span>
  </div>

  <div className="flex items-center gap-2">
    <span className="h-1.5 w-5 rounded-full bg-yellow-400" />
    <span>Yellow = Stephen</span>
  </div>

  <div className="flex items-center gap-2">
    <span className="h-1.5 w-5 rounded-full bg-gray-400" />
    <span>Gray = Ladder</span>
  </div>

  <div className="flex items-center gap-2">
    <span className="h-1.5 w-5 rounded-full bg-black ring-1 ring-white/20" />
    <span>Black = Snake</span>
  </div>

  <div className="mt-1">
    Exact 100 wins
  </div>
</div>

              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


/* ============================================================
   MESSAGE CONTENT
============================================================ */

function MessageContent({ content }: { content: string }) {
  const lines = content.split("\n");

  function renderInlineText(text: string) {
    const segments = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

    return segments.map((segment, index) => {
      if (segment.startsWith("**") && segment.endsWith("**")) {
        return <strong key={index}>{segment.slice(2, -2)}</strong>;
      }

      if (segment.startsWith("*") && segment.endsWith("*")) {
        return <em key={index}>{segment.slice(1, -1)}</em>;
      }

      return <>{segment}</>;
    });
  }

  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        if (!line.trim()) {
          return <div key={index} className="h-1" />;
        }

        const numbered = /^\d+\.\s/.test(line);
        const bullet = line.startsWith("• ");

        if (numbered || bullet) {
          return (
            <div key={index} className="flex gap-2">
              <span className="text-[var(--muted)]">
                {numbered ? line.match(/^\d+\./)?.[0] : "•"}
              </span>

              <span>
                {renderInlineText(
                  numbered
                    ? line.replace(/^\d+\.\s/, "")
                    : line.replace(/^•\s/, ""),
                )}
              </span>
            </div>
          );
        }

        return <p key={index}>{renderInlineText(line)}</p>;
      })}
    </div>
  );
}

/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader({
  number,
  title,
  dark = false,
}: {
  number: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`reveal flex items-center gap-3 text-xs font-medium ${
        dark ? "text-white/45" : "text-[var(--muted)]"
      }`}
    >
      <span>{number}</span>

      <span
        className={`h-px w-8 ${
          dark ? "bg-white/20" : "bg-[var(--line-strong)]"
        }`}
      />

      <span>{title}</span>
    </div>
  );
}
/* ============================================================
   EXPERIENCE CARD
============================================================ */

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[number];
  index: number;
}) {
  return (
    <article className="reveal group rounded-3xl border border-black/[0.08] bg-white p-6 transition-colors duration-300 hover:border-black/[0.14] dark:border-white/[0.08] dark:bg-[#181818] dark:hover:border-white/[0.14] sm:p-8">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mono mb-4 text-[9px] uppercase tracking-[0.22em] text-[var(--muted-2)]">
            {String(index + 1).padStart(2, "0")}
          </div>

          <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-[0.95] tracking-[-0.055em] text-[#171717] dark:text-white">
            {experience.position}
          </h3>

          <div className="mt-3 text-sm font-medium text-[var(--muted)]">
            {experience.company}
          </div>
        </div>

        <div className="hidden shrink-0 sm:block">
          {/* <div className="h-10 w-10 rounded-full border border-black/[0.08] bg-[#F5F5F5] transition-colors group-hover:bg-[#171717] dark:border-white/[0.08] dark:bg-[#111111] dark:group-hover:bg-white">
            <div className="flex h-full w-full items-center justify-center text-sm text-[var(--muted)] transition-colors group-hover:text-white dark:group-hover:text-black">
              ↗
            </div>
          </div> */}
        </div>
      </div>

      {/* ======================================================
          DESCRIPTION
      ====================================================== */}

      <div className="mt-8 max-w-3xl">
        <p className="text-sm leading-7 text-[var(--muted)] sm:text-base">
          {experience.description}
        </p>
      </div>

      {/* ======================================================
          TECHNOLOGY / TAGS
      ====================================================== */}

      {experience.tags.length > 0 && (
        <div className="mt-7 flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/[0.08] bg-[#F5F5F5] px-3 py-1.5 text-[10px] font-medium text-[var(--muted)] dark:border-white/[0.08] dark:bg-[#111111]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* ======================================================
          RESPONSIBILITIES
      ====================================================== */}

      <div className="mt-8 border-t border-black/[0.08] pt-6 dark:border-white/[0.08]">
        <div className="mb-5 flex items-center justify-between">
          <span className="mono text-[9px] uppercase tracking-[0.2em] text-[var(--muted-2)]">
            Responsibilities
          </span>

          <span className="mono text-[9px] text-[var(--muted-2)]">
            {String(experience.responsibilities.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
          {experience.responsibilities.map((item, itemIndex) => (
            <div
              key={`${item}-${itemIndex}`}
              className="group/item flex gap-4 border-b border-black/[0.06] py-3 dark:border-white/[0.06]"
            >
              <span className="mono shrink-0 pt-1 text-[9px] text-[var(--muted-2)]">
                {String(itemIndex + 1).padStart(2, "0")}
              </span>

              <span className="text-xs leading-6 text-[var(--muted)] transition-colors group-hover/item:text-[#30302e] dark:group-hover/item:text-[#ddd]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   PROJECT CARD
============================================================ */

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="reveal portfolio-card overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)]">
      <div className="relative overflow-hidden bg-[#171717] p-7 text-white sm:p-8">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="mono text-[9px] uppercase tracking-[.2em] text-white/40">
              Project / {project.number}
            </span>

            <span className="rounded-full border border-white/15 px-3 py-1 text-[9px]">
              {project.category}
            </span>
          </div>

          <div className="mt-16">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-black text-black">
              {project.number}
            </div>

            <h3 className="mt-5 max-w-xl text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[.9] tracking-[-.06em]">
              {project.title}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-7 sm:p-8">
        <p className="text-sm font-semibold leading-6">{project.short}</p>

        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.modules.slice(0, 6).map((module) => (
            <span
              key={module}
              className="rounded-full bg-[var(--surface-2)] px-3 py-1.5 text-[10px] text-[var(--muted)]"
            >
              {module}
            </span>
          ))}
        </div>

        <div className="mt-7 border-t border-[var(--line)] pt-6">
          <div className="text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--muted-2)]">
            Business impact
          </div>

          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {project.impact}
          </p>
        </div>
      </div>
    </article>
  );
}
/* ============================================================
   SKILL PANEL
============================================================ */
/* ============================================================
   SKILL PANEL
============================================================ */

function SkillPanel({ category, items }: { category: string; items: Skill[] }) {
  return (
    <div className="reveal portfolio-card rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted-2)]">
            Stack
          </div>

          <h3 className="mt-2 text-xl font-bold">{category}</h3>
        </div>

        <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#171717] px-2 text-[10px] font-bold text-white dark:bg-white dark:text-black">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      {/* Skills */}
      <div className="mt-6 space-y-2">
        {items.map((item) => (
          <div
            key={item.name}
            className="group flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-3 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-black/15 hover:bg-[#F5F5F5] dark:hover:border-white/15 dark:hover:bg-white/[0.04]"
          >
            {/* Devicon */}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.04] text-[#30302e] transition-[background-color,color,transform] duration-200 group-hover:scale-105 group-hover:bg-black/[0.07] dark:bg-white/[0.06] dark:text-white dark:group-hover:bg-white/[0.1]">
              <i className={`${item.icon} text-[18px]`} aria-hidden="true" />
            </span>

            {/* Skill name */}
            <span className="text-xs font-medium text-[var(--text)]">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
/* ============================================================
   STAT
============================================================ */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
      <div className="text-lg font-bold">{value}</div>

      <div className="mt-1 text-[10px] text-[var(--muted)]">{label}</div>
    </div>
  );
}

/* ============================================================
   MODULE ICON
============================================================ */

function ModuleIcon({ id }: { id: Module }) {
  if (id === "home") return <HomeIcon />;
  if (id === "about") return <UserIcon />;
  if (id === "experience") return <BriefcaseIcon />;
  if (id === "projects") return <FolderIcon />;
  if (id === "skills") return <CodeIcon />;
  if (id === "game") return <GameIcon />;

  return <MessageIcon />;
}

/* ============================================================
   ICONS
============================================================ */

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="m3 10 9-7 9 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 9v11h14V9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <circle cx="12" cy="8" r="3.5" />

      <path d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5" strokeLinecap="round" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />

      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" />

      <path d="M3 12h18" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path
        d="M3 6.5A2.5 2.5 0 0 1 5.5 4H10l2 2h6.5A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path
        d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path
        d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-4-.9L4 20l1.3-3.5A7.3 7.3 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GameIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <rect x="3" y="7" width="18" height="11" rx="3" />

      <path d="M7 12h4M9 10v4" strokeLinecap="round" />

      <circle cx="16" cy="11" r="1" fill="currentColor" />

      <circle cx="18" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="M5 12h13" strokeLinecap="round" />

      <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="M5 19 19 5" strokeLinecap="round" />

      <path d="M9 5h10v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUp() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M12 19V5" strokeLinecap="round" />

      <path d="m6 11 6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path
        d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="3.5" />

      <path
        d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        strokeLinecap="round"
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
      className="h-4 w-4"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />

      <path d="m4 7 8 6 8-6" strokeLinecap="round" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />

      <path
        d="M8 10v6M8 8v.01M12 16v-3.2a2.8 2.8 0 0 1 5.6 0V16M12 10v6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M4 7h16" strokeLinecap="round" />

      <path d="M4 12h16" strokeLinecap="round" />

      <path d="M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="M4 19V7" strokeLinecap="round" />
      <path d="M10 19V4" strokeLinecap="round" />
      <path d="M16 19v-8" strokeLinecap="round" />
      <path d="M22 19v-12" strokeLinecap="round" />
      <path d="M2 19h20" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="m6 6 12 12" strokeLinecap="round" />

      <path d="m18 6-12 12" strokeLinecap="round" />
    </svg>
  );
}

function SidebarCloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="M5 6v12" strokeLinecap="round" />

      <path d="m10 9-3 3 3 3" strokeLinecap="round" strokeLinejoin="round" />

      <path d="M12 12h7" strokeLinecap="round" />
    </svg>
  );
}
