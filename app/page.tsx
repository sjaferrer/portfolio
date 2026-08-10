"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";

type Module = "home" | "about" | "experience" | "projects" | "skills";

const modules: {
  id: Module;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "home",
    label: "Home",
    description: "Introduction",
    icon: "⌂",
  },
  {
    id: "about",
    label: "About",
    description: "Professional profile",
    icon: "◎",
  },
  {
    id: "experience",
    label: "Experience",
    description: "Work history",
    icon: "▣",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Selected work",
    icon: "◫",
  },
  {
    id: "skills",
    label: "Skills",
    description: "Technologies",
    icon: "◆",
  },
];
const skills = {
  Languages: [
    ["csharp", "C#"],
    ["javascript", "JavaScript"],
    ["typescript", "TypeScript"],
    ["html5", "HTML"],
    ["css3", "CSS"],
  ],

  Frameworks: [
    ["dot-net-plain-wordmark", "ASP.NET"],
    ["bootstrap", "Bootstrap"],
    ["tailwindcss", "Tailwind CSS"],
    ["jquery", "jQuery"],
    ["nextjs", "Next.js"],
    ["nodejs", "Node.js"],
  ],

  Database: [
    ["microsoftsqlserver", "MS SQL Server"],
    // ["supabase", "Supabase"],
  ],

  Tools: [
    ["git", "Git"],
    ["github", "GitHub"],
    ["vscode", "VS Code"],
    ["visualstudio", "Visual Studio"],
    // ["msreportserver", "MS Report Server"],
    // ["sqlmanagementstudio", "SQL Management Studio"],
    // ["dbforge", "dbForge"],
    ["postman", "Postman"],
  ],
};

export default function HomePage() {
  const [activeModule, setActiveModule] = useState<Module>("home");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  function navigate(module: Module, query = "") {
    setActiveModule(module);
    setSearchQuery(query);
    setSidebarOpen(false);
  }

  function navigateFromSidebar(module: Module) {
    setActiveModule(module);
    setSearchQuery("");
    setSidebarOpen(false);
  }

  const activeModuleData = modules.find((module) => module.id === activeModule);

  return (
    <div className="min-h-screen bg-white text-[#171717]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header
        activeModule={activeModuleData?.label || "Home"}
        onMenuClick={() => setSidebarOpen(true)}
        onNavigate={navigate}
      />

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/20
            lg:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50

          w-[280px]
          sm:w-72

          bg-white

          border-r
          border-[#e5e5e5]

          flex
          flex-col

          transition-transform
          duration-200

          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Sidebar Header */}

        <div
          className="
            h-20
            px-6

            flex
            items-center

            border-b
            border-[#e5e5e5]
          "
        >
          <div>
            <div
              className="
                text-[22px]
                font-extrabold
                tracking-[-0.055em]
                leading-none
                text-[#171717]
                select-none
            "
            >
              Stephen<span className="text-[#737373]"> J.</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="
              lg:hidden

              ml-auto

              text-2xl
              leading-none

              text-[#737373]

              hover:text-[#171717]
            "
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Navigation */}

        <div
          className="
            flex-1

            px-4
            py-8

            overflow-y-auto
          "
        >
          <div
            className="
              px-2
              mb-3

              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]

              text-[#a3a3a3]
            "
          >
            Navigation
          </div>

          <nav className="space-y-1">
            {modules.map((module) => {
              const isActive = activeModule === module.id;

              return (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => navigateFromSidebar(module.id)}
                  className={`
                    w-full

                    flex
                    items-center
                    gap-3

                    px-3
                    py-3

                    text-left

                    border-l-2
                    
                    cursor-pointer    
                    transition-colors

                    ${
                      isActive
                        ? "border-[#171717] bg-[#f5f5f5] text-[#171717]"
                        : "border-transparent text-[#737373] hover:text-[#171717] hover:bg-[#fafafa]"
                    }
                  `}
                >
                  <span
                    className={`
                      w-6
                      text-sm

                      ${isActive ? "text-[#171717]" : "text-[#a3a3a3]"}
                    `}
                  >
                    {module.icon}
                  </span>

                  <div className="min-w-0">
                    <div className="text-sm font-medium">{module.label}</div>

                    <div
                      className="
                        text-[11px]
                        text-[#a3a3a3]
                        mt-0.5
                        truncate
                      "
                    >
                      {module.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* =====================================================
    CONNECT
===================================================== */}

          <div className="mt-12">
            <div
              className="
      px-2
      mb-3

      text-[10px]
      font-semibold
      uppercase
      tracking-[0.18em]

      text-[#a3a3a3]
    "
            >
              Connect
            </div>

            <div className="space-y-1">
              {/* Email */}

              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                aria-label="Email"
                className="
        flex
        items-center
        gap-3

        px-3
        py-2.5

        text-sm
        text-[#737373]

        hover:text-[#171717]

        transition-colors
      "
              >
                <EmailIcon />

                <span>Email</span>
              </a>
              {/* GitHub */}

              <a
                href={process.env.NEXT_PUBLIC_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
        flex
        items-center
        gap-3

        px-3
        py-2.5

        text-sm
        text-[#737373]

        hover:text-[#171717]

        transition-colors
      "
              >
                <GitHubIcon />

                <span>GitHub</span>
              </a>

              {/* LinkedIn */}

              <a
                href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
        flex
        items-center
        gap-3

        px-3
        py-2.5

        text-sm
        text-[#737373]

        hover:text-[#171717]

        transition-colors
      "
              >
                <LinkedInIcon />

                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}

        <div
          className="
            p-6

            border-t
            border-[#e5e5e5]
          "
        >
          <div className="text-xs text-[#a3a3a3]">
            © 2026 Stephen J. — Designed and developed with care. All rights
            reserved.
          </div>
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="lg:ml-72 pt-16 min-h-screen">
        <div
          className="
            w-full
            max-w-6xl
            mx-auto

            px-5
            sm:px-8
            md:px-10
            lg:px-12
            xl:px-16

            py-10
            sm:py-12
            md:py-16
            lg:py-20
          "
        >
          {activeModule === "home" && (
            <HomeModule navigate={navigate} searchQuery={searchQuery} />
          )}

          {activeModule === "about" && (
            <AboutModule searchQuery={searchQuery} />
          )}

          {activeModule === "experience" && (
            <ExperienceModule searchQuery={searchQuery} />
          )}

          {activeModule === "projects" && (
            <ProjectsModule searchQuery={searchQuery} />
          )}

          {activeModule === "skills" && (
            <SkillsModule searchQuery={searchQuery} />
          )}
        </div>
      </main>
    </div>
  );
}

/* ============================================================
   HOME MODULE
============================================================ */

function HomeModule({
  navigate,
  searchQuery,
}: {
  navigate: (module: Module, query?: string) => void;
  searchQuery: string;
}) {
  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Hero */}

      <section className="max-w-4xl pt-4 sm:pt-6 md:pt-10">
        <div
          className="
            text-sm
            font-medium 
            text-[#b7791f]

            mb-6
          "
        >
          <HighlightText
            text="Full Stack Developer · Systems Analyst"
            query={searchQuery}
          />
        </div>

        <h1
          className="
            text-[42px]
            leading-[0.95]
            tracking-[-0.045em]
            font-bold

            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            xl:text-[80px]
          "
        >
          I build software
          <br />
          <span className="text-[#737373]">that solves real problems.</span>
        </h1>

        <p
          className="
            mt-6
            sm:mt-8

            max-w-2xl

            text-base
            sm:text-lg

            leading-7
            sm:leading-8

            text-[#525252]
          "
        >
          <HighlightText
            text="I'm Stephen J., a Full Stack Developer focused on building reliable enterprise applications, HRIS platforms, ERP systems, dashboards, and business process automation tools."
            query={searchQuery}
          />
        </p>

        {/* Hero Buttons */}

        <div
          className="
            flex
            flex-col
            sm:flex-row

            items-stretch
            sm:items-center

            gap-3
            sm:gap-4

            mt-8
          "
        >
          <button
            type="button"
            onClick={() => navigate("projects")}
            className="
              px-5
              py-3

              bg-[#171717]
              text-white

              text-sm
              font-medium
              text-center

              hover:bg-[#333]

              cursor-pointer
              transition-colors
            "
          >
            View my work →
          </button>

          <button
            type="button"
            onClick={() => navigate("about")}
            className="
              px-5
              py-3

              text-sm
              font-medium
              text-[#525252]
              text-center

              hover:text-[#171717]

    cursor-pointer

              transition-colors
            "
          >
            More about me
          </button>
        </div>
      </section>

      {/* Divider */}

      <div className="border-t border-[#e5e5e5]" />

      {/* Basic Information */}

      <section
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3

          gap-x-8
          gap-y-8
          lg:gap-10
        "
      >
        <InfoItem
          label="Based in"
          value="Davao City, Philippines"
          searchQuery={searchQuery}
        />

        <InfoItem
          label="Specialization"
          value="Enterprise Applications"
          searchQuery={searchQuery}
        />

        <InfoItem
          label="Currently"
          value="Open to opportunities"
          searchQuery={searchQuery}
        />
      </section>

      {/* Selected Work */}

      <section>
        <SectionHeading
          eyebrow="Selected work"
          title="Things I've worked on"
          description="A selection of enterprise applications and systems I have developed."
          searchQuery={searchQuery}
        />

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2

            gap-x-8
            lg:gap-x-12

            gap-y-12
            lg:gap-y-16

            mt-8
            sm:mt-10
          "
        >
          <SimpleProject
            number="01"
            title="Enterprise Resource Planning (ERP)"
            description="An enterprise platform for procurement, inventory, asset management, approval workflows, user access, audit trails, reporting, and operational analytics."
            tags={["ERP", "Process Automation", "Inventory", "Reporting"]}
            searchQuery={searchQuery}
          />

          <SimpleProject
            number="02"
            title="HRIS — Millennium Specialty Coco Products, Inc."
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
          className="
            mt-8

            text-sm
            font-medium
            text-[#171717]

            hover:text-[#2563eb]

            cursor-pointer
            transition-colors
          "
        >
          View all projects →
        </button>
      </section>

      {/* Technical Stack */}

      <section
        className="
          border-t
          border-[#e5e5e5]

          pt-16
        "
      >
        <SectionHeading
          eyebrow="Technical stack"
          title="Tools I work with"
          description="A practical stack focused on building maintainable business applications."
          searchQuery={searchQuery}
        />

        <div
          className="
            flex
            flex-wrap

            gap-x-6
            sm:gap-x-8

            gap-y-4
            sm:gap-y-5

            mt-8
          "
        >
          {[
            "JavaScript",
            "TypeScript",
            "C#",
            "Next.js",
            "Node.js",
            ".NET",
            "SQL Server",
            "Supabase",
            "Tailwind CSS",
            "Git",
          ].map((skill) => (
            <span
              key={skill}
              className="
                text-sm
                sm:text-base

                font-medium

                text-[#404040]
              "
            >
              <HighlightText text={skill} query={searchQuery} />
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate("skills")}
          className="
            mt-8

            text-sm
            font-medium
            text-[#171717]

            hover:text-[#2563eb]

            cursor-pointer
            transition-colors
          "
        >
          Explore my skills →
        </button>
      </section>

      {/* Contact */}

      <section
        className="
          border-t
          border-[#e5e5e5]

          pt-14
          sm:pt-16

          pb-6
          sm:pb-10
        "
      >
        <div className="max-w-3xl">
          <div
            className="
              text-xs
              uppercase
              tracking-[0.18em]
              text-[#a3a3a3]
            "
          >
            Let's connect
          </div>

          <h2
            className="
              mt-4

              text-3xl
              sm:text-4xl

              font-bold
              tracking-tight
            "
          >
            Have a project or opportunity in mind?
          </h2>

          <p
            className="
              mt-4

              text-sm
              sm:text-base

              text-[#737373]

              leading-7
            "
          >
            <HighlightText
              text="I'm interested in working on software products, enterprise systems, and projects where technology can improve how people work."
              query={searchQuery}
            />
          </p>

          <div
            className="
    flex
    flex-wrap
    gap-x-6
    gap-y-4
    mt-7
  "
          >
            {/* Email */}
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
              className="
      flex
      items-center
      gap-2
      text-sm
      font-medium
      underline
      underline-offset-4
      hover:text-[#2563eb]
    "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email
            </a>

            {/* GitHub */}
            <a
              href={process.env.NEXT_PUBLIC_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
      flex
      items-center
      gap-2
      text-sm
      font-medium
      underline
      underline-offset-4
      hover:text-[#2563eb]
    "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.25c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
              </svg>
              GitHub
            </a>

            {/* LinkedIn */}
            <a
              href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
      flex
      items-center
      gap-2
      text-sm
      font-medium
      underline
      underline-offset-4
      hover:text-[#2563eb]
    "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.59c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94V21h-4V9Z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   ABOUT MODULE
============================================================ */

function AboutModule({ searchQuery }: { searchQuery: string }) {
  return (
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-3

        gap-10
        lg:gap-16
      "
    >
      <div className="lg:col-span-2">
        <SectionHeading
          eyebrow="Profile"
          title="Professional Summary"
          searchQuery={searchQuery}
        />

        <div
          className="
            mt-8

            space-y-6

            text-sm
            sm:text-base

            leading-7
            sm:leading-8

            text-[#525252]
          "
        >
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
        </div>
      </div>

      {/* Profile Information */}

      <div
        className="
          border-t
          lg:border-t-0
          lg:border-l

          border-[#e5e5e5]

          pt-8
          lg:pt-0

          lg:pl-8
        "
      >
        <div
          className="
            text-xs
            uppercase
            tracking-[0.18em]
            text-[#a3a3a3]
          "
        >
          Profile
        </div>

        <div className="mt-6 space-y-6">
          <InfoItem label="Name" value="Stephen J." searchQuery={searchQuery} />

          <InfoItem
            label="Position"
            value="Full Stack Developer"
            searchQuery={searchQuery}
          />

          <InfoItem
            label="Location"
            value="Davao, Philippines"
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
  );
}

/* ============================================================
   EXPERIENCE MODULE
============================================================ */

function ExperienceModule({ searchQuery }: { searchQuery: string }) {
  const experiences = [
    {
      position: "Software Developer",
      company: "Millennium Specialty Coco Products, Inc.",
      description:
        "Developed and maintained ERP and HRIS solutions for procurement, inventory, assets, workforce management, and business operations.",
      responsibilities: [
        "Developed ERP and HRIS modules for procurement, inventory, assets, attendance, leave, travel, and scheduling.",
        "Implemented access control, approval workflows, audit logging, and centralized master data.",
        "Built SSRS reports, dashboards, and analytics for business reporting and decision-making.",
        "Optimized backend logic, databases, and system configurations for performance and reliability.",
      ],
    },
    {
      position: "System Analyst / Programmer, Supervisor",
      company: "Lapanday Foods Corporation",
      description:
        "Led HRIS development covering workforce administration, employee lifecycle, recruitment, and HR reporting.",
      responsibilities: [
        "Developed HRIS modules for employee records, PDS, attendance, travel, scheduling, and workforce management.",
        "Built applicant tracking, recruitment automation, kiosks, and recruitment dashboards.",
        "Designed centralized HR master data and database structures.",
        "Collaborated on requirements, process analysis, documentation, testing, and system optimization.",
      ],
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {experiences.map((experience, index) => (
        <article
          key={index}
          className="
            grid
            grid-cols-1

            md:grid-cols-[140px_1fr]
            lg:grid-cols-[180px_1fr]

            gap-5
            md:gap-8
          "
        >
          <div>
            <div className="text-xs text-[#a3a3a3]">
              Experience {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          <div
            className="
              border-b
              border-[#e5e5e5]

              pb-12
            "
          >
            <h2
              className="
                text-2xl
                sm:text-3xl

                font-bold
                tracking-tight
              "
            >
              <HighlightText text={experience.position} query={searchQuery} />
            </h2>

            <div
              className="
                mt-2

                text-sm
                font-medium

                text-[#b7791f]
              "
            >
              <HighlightText text={experience.company} query={searchQuery} />
            </div>

            <p
              className="
                mt-6
                max-w-3xl

                text-sm
                sm:text-base

                leading-7

                text-[#525252]
              "
            >
              <HighlightText
                text={experience.description}
                query={searchQuery}
              />
            </p>

            <div className="mt-7">
              <div
                className="
                  text-xs
                  uppercase
                  tracking-[0.18em]

                  text-[#a3a3a3]

                  mb-4
                "
              >
                Responsibilities
              </div>

              <div className="space-y-3">
                {experience.responsibilities.map(
                  (responsibility, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="
                        flex
                        gap-3

                        text-sm
                        text-[#525252]
                      "
                    >
                      <span className="text-[#b7791f]">—</span>

                      <span>
                        <HighlightText
                          text={responsibility}
                          query={searchQuery}
                        />
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ============================================================
   PROJECTS MODULE
============================================================ */

function ProjectsModule({ searchQuery }: { searchQuery: string }) {
  return (
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-2

        gap-x-8
        lg:gap-x-12

        gap-y-12
        lg:gap-y-16
      "
    >
      <ProjectCard
        number="01"
        title="Enterprise Resource Planning (ERP)"
        description="Enterprise ERP solution designed to streamline procurement, inventory, asset management, approval workflows, and operational reporting through a centralized business platform."
        modules={[
          "Procure-to-Pay",
          "Inventory Management",
          "Asset Management",
          "Approval Workflows",
          "User Access Management",
          "Audit Trail",
        ]}
        highlights={[
          "Process Automation",
          "Real-Time Monitoring",
          "Permission-Based Access",
          "Approval Workflows",
          "Analytics & Reporting",
        ]}
        impact="Improved operational efficiency, data accuracy, process control, and system governance while providing real-time business visibility for better decision-making."
        searchQuery={searchQuery}
      />

      <ProjectCard
        number="02"
        title="HRIS — Millennium Specialty Coco Products, Inc."
        description="Human Resource Information System designed to centralize employee records and automate workforce administration, attendance, leave, scheduling, and HR service processes."
        modules={[
          "Employee Records",
          "Attendance Monitoring",
          "Leave Management",
          "Overtime & Undertime",
          "Travel Requests",
          "Calendar Management",
          "Service Provider Management",
        ]}
        highlights={[
          "Workflow Automation",
          "Workforce Management",
          "Centralized HR Data",
          "HR Analytics",
          "Reporting",
        ]}
        impact="Improved workforce management efficiency by automating HR processes, centralizing employee information, and providing structured data for workforce planning and reporting."
        searchQuery={searchQuery}
      />

      <ProjectCard
        number="03"
        title="IT & Asset Management Dashboard"
        description="Centralized dashboard solution for monitoring IT assets and inventory, providing real-time visibility into asset status, ownership, location, availability, and lifecycle."
        modules={[
          "Asset Tracking",
          "Inventory Monitoring",
          "Ownership Management",
          "Location Tracking",
          "Asset Lifecycle",
        ]}
        highlights={[
          "Real-Time Monitoring",
          "Dashboard Reporting",
          "Data Visualization",
          "Inventory Control",
        ]}
        impact="Improved asset visibility, accountability, and management through centralized monitoring, inventory control, and real-time reporting."
        searchQuery={searchQuery}
      />

      <ProjectCard
        number="04"
        title="HRIS — Lapanday Foods Corporation"
        description="Enterprise HRIS solution supporting workforce administration, employee lifecycle management, attendance tracking, recruitment operations, scheduling, and centralized HR data management."
        modules={[
          "Employee Management",
          "Employee Records",
          "Personal Data Sheet",
          "Attendance & Timesheets",
          "Travel Orders",
          "Recruitment",
          "Applicant Tracking",
          "HR Scheduling",
        ]}
        highlights={[
          "Recruitment Automation",
          "Applicant Tracking",
          "Approval Workflows",
          "HR Analytics",
          "Centralized Master Data",
          "Recruitment Dashboards",
        ]}
        impact="Improved HR operational efficiency and workforce visibility through centralized employee data, automated recruitment workflows, applicant monitoring, scheduling, approvals, and reporting."
        searchQuery={searchQuery}
      />
    </div>
  );
}

/* ============================================================
   SKILLS MODULE
============================================================ */

function SkillsModule({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="space-y-12">
      <div
        className="
          grid

          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4

          gap-x-8
          lg:gap-x-10

          gap-y-12
        "
      >
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <div
              className="
                  pb-4

                  border-b
                  border-[#e5e5e5]
                "
            >
              <h2 className="text-base font-bold">
                <HighlightText text={category} query={searchQuery} />
              </h2>

              <p
                className="
                    text-xs
                    text-[#a3a3a3]
                    mt-1
                  "
              >
                {items.length} technologies
              </p>
            </div>

            <div className="mt-4">
              {items.map(([icon, name]) => (
                <div
                  key={name}
                  className="
                      flex
                      items-center
                      gap-3

                      py-3

                      border-b
                      border-[#f0f0f0]
                    "
                >
                  {icon === "dot-net-plain-wordmark" ? (
                    <i
                      className="devicon-dot-net-plain-wordmark text-xl shrink-0"
                      aria-hidden="true"
                    />
                  ) : icon === "nodejs" ? (
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg"
                      className="w-5 h-5 shrink-0"
                      alt={name}
                    />
                  ) : (
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`}
                      className="w-5 h-5 shrink-0"
                      alt={name}
                    />
                  )}

                  <span className="text-sm text-[#404040]">
                    <HighlightText text={name} query={searchQuery} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Technical Focus */}

      <section
        className="
          border-t
          border-[#e5e5e5]

          pt-12
        "
      >
        <SectionHeading
          eyebrow="Technical focus"
          title="What I specialize in"
          searchQuery={searchQuery}
        />

        <div
          className="
            flex
            flex-wrap

            gap-x-6
            sm:gap-x-8

            gap-y-4

            mt-8
          "
        >
          {[
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
          ].map((skill) => (
            <span key={skill} className="text-sm text-[#525252]">
              <HighlightText text={skill} query={searchQuery} />
            </span>
          ))}
        </div>
      </section>
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
    <div>
      <div
        className="
          text-[11px]
          sm:text-xs

          uppercase
          tracking-[0.2em]

          font-semibold

          text-[#b7791f]
        "
      >
        <HighlightText text={eyebrow} query={searchQuery} />
      </div>

      <h2
        className="
          mt-3

          text-2xl
          sm:text-3xl

          font-bold
          tracking-tight
        "
      >
        <HighlightText text={title} query={searchQuery} />
      </h2>

      {description && (
        <p
          className="
            mt-3
            max-w-2xl

            text-sm
            leading-6

            text-[#737373]
          "
        >
          <HighlightText text={description} query={searchQuery} />
        </p>
      )}
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
    <div>
      <div
        className="
          text-xs

          uppercase
          tracking-[0.18em]

          text-[#a3a3a3]
        "
      >
        <HighlightText text={label} query={searchQuery} />
      </div>

      <div
        className="
          mt-3

          text-base
          font-medium
        "
      >
        <HighlightText text={value} query={searchQuery} />
      </div>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 shrink-0"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.37 4.28 5.45v6.29ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.54 20.45h3.56V9H3.54v11.45Z" />
    </svg>
  );
}

/* ============================================================
   GITHUB ICON
============================================================ */

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 shrink-0"
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

/* ============================================================
   EMAIL ICON
============================================================ */

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="w-5 h-5 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="1" />

      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
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
    <article className="group">
      <div
        className="
          flex
          items-start
          justify-between
        "
      >
        <div>
          <div className="text-xs text-[#a3a3a3]">{number}</div>

          <h3
            className="
              mt-4

              text-xl
              sm:text-2xl

              font-bold
              tracking-tight


              transition-colors
            "
          >
            <HighlightText text={title} query={searchQuery} />
          </h3>
        </div>

        {/* <span
          className="
            text-[#a3a3a3]

            group-hover:text-[#2563eb]

            transition-colors
          "
        >
          ↗
        </span> */}
      </div>

      <p
        className="
          mt-5

          text-sm
          leading-6

          text-[#737373]
        "
      >
        <HighlightText text={description} query={searchQuery} />
      </p>

      <div
        className="
          flex
          flex-wrap

          gap-x-4
          sm:gap-x-5

          gap-y-2

          mt-5
        "
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="
              text-xs
              text-[#525252]
            "
          >
            #
            <HighlightText text={tag.replace(/\s+/g, "")} query={searchQuery} />
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
  title,
  description,
  modules,
  highlights,
  impact,
  searchQuery,
}: {
  number: string;
  title: string;
  description: string;
  modules: string[];
  highlights: string[];
  impact: string;
  searchQuery: string;
}) {
  return (
    <article
      className="
        border-t-2
        border-[#171717]

        pt-6
      "
    >
      {/* Header */}

      <div
        className="
          flex
          flex-col
          sm:flex-row

          sm:items-start
          sm:justify-between

          gap-4
        "
      >
        <div>
          <div className="text-xs text-[#a3a3a3]">{number}</div>

          <h2
            className="
              mt-3

              text-xl
              sm:text-2xl

              font-bold
              tracking-tight
            "
          >
            <HighlightText text={title} query={searchQuery} />
          </h2>

          <div
            className="
              mt-2

              text-sm

              text-[#b7791f]
            "
          >
            Enterprise Application
          </div>
        </div>

        <div className="text-xl text-[#a3a3a3]"></div>
      </div>

      {/* Description */}

      <p
        className="
          mt-6

          text-sm
          sm:text-base

          leading-7

          text-[#525252]
        "
      >
        <HighlightText text={description} query={searchQuery} />
      </p>

      {/* Modules */}

      <div className="mt-8">
        <div
          className="
            text-xs

            uppercase
            tracking-[0.18em]

            text-[#a3a3a3]
          "
        >
          Key Modules
        </div>

        <div
          className="
            flex
            flex-wrap

            gap-x-5
            gap-y-3

            mt-4
          "
        >
          {modules.map((module) => (
            <span key={module} className="text-sm text-[#525252]">
              <HighlightText text={module} query={searchQuery} />
            </span>
          ))}
        </div>
      </div>

      {/* Technical Highlights */}

      <div className="mt-8">
        <div
          className="
            text-xs

            uppercase
            tracking-[0.18em]

            text-[#a3a3a3]
          "
        >
          Technical Highlights
        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2

            gap-3

            mt-4
          "
        >
          {highlights.map((highlight) => (
            <div
              key={highlight}
              className="
                text-sm
                text-[#525252]
              "
            >
              <span className="text-[#b7791f] mr-2">+</span>

              <HighlightText text={highlight} query={searchQuery} />
            </div>
          ))}
        </div>
      </div>

      {/* Business Impact */}

      <div
        className="
          mt-8
          pt-6

          border-t
          border-[#e5e5e5]
        "
      >
        <div
          className="
            text-xs

            uppercase
            tracking-[0.18em]

            text-[#a3a3a3]
          "
        >
          Business Impact
        </div>

        <p
          className="
            mt-3

            text-sm
            leading-6

            text-[#737373]
          "
        >
          <HighlightText text={impact} query={searchQuery} />
        </p>
      </div>
    </article>
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
              key={index}
              className="
                bg-[#dbeafe]
                text-[#171717]

                px-1
                py-0.5

                rounded-sm

                box-decoration-clone
              "
            >
              {part}
            </mark>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
