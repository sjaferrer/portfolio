'use client';

import { Racing_Sans_One } from 'next/font/google';

const racingSansOne = Racing_Sans_One({
  subsets: ['latin'],
  weight: '400',
});

type ProjectsPageProps = {
  darkMode: boolean;
};

export default function ProjectsPage({ darkMode }: ProjectsPageProps) {
  const sectionPadding = 'py-32 px-6 md:px-0';

  const heading =
    'text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent';


  const projects = [
    {
      category: "ERP SYSTEM",
      title: "Enterprise Resource Planning (ERP)",
      description:
        "Enterprise business platform designed to streamline procurement, inventory, asset management, and operational workflows through centralized data management.",

      modules: [
        "Procure-to-Pay (P2P)",
        "Warehouse Inventory",
        "Asset Management",
        "Master Data Management",
        "User Management"
      ],

      technical: [
        "RBAC",
        "Approval Workflow",
        "Reports",
        "Analytics Dashboard",
        "Database Optimization"
      ],

      impact:
        "Improved operational efficiency by reducing manual processes, strengthening data governance, and providing real-time business insights."
    },


    {
      category: "HR PLATFORM",
      title:
        "Human Resource Information System (HRIS) - Millennium Specialty Coco Products, Inc.",

      description:
        "Comprehensive HR solution designed to automate workforce management, employee records, attendance monitoring, and HR operational processes.",

      modules: [
        "Employee Records",
        "Attendance Tracking",
        "Overtime / Undertime",
        "Job Orders",
        "Travel Orders",
        "Scheduling Calendar",
        "Service Provider Management"
      ],

      technical: [
        "Workflow Automation",
        "HR Analytics",
        "Reports",
        "Security Controls",
        "Master Data Management"
      ],

      impact:
        "Improved HR workflow efficiency through automation, centralized information management, and better workforce visibility."
    },


    {
      category: "HR DIGITAL TRANSFORMATION",

      title:
        "Human Resource Information System (HRIS) - Lapanday Foods Corporation",

      description:
        "Enterprise HR platform supporting employee lifecycle management, recruitment operations, workforce administration, and HR reporting.",

      modules: [
        "Employee Records",
        "Personal Data Sheet (PDS)",
        "Attendance / Timesheet",
        "Leave Management",
        "Travel Orders",
        "Recruitment",
        "Applicant Tracking"
      ],

      technical: [
        "Applicant Portal",
        "Recruitment Dashboard",
        "Approval Workflow",
        "Master Data Architecture",
        "SDLC Implementation"
      ],

      impact:
        "Enhanced recruitment visibility, workforce planning, and HR decision-making through centralized systems and analytics."
    },


    {
      category: "BUSINESS INTELLIGENCE",

      title:
        "IT & Asset Management Dashboard",

      description:
        "Centralized dashboard solution for monitoring IT assets, inventory status, ownership, and availability.",

      modules: [
        "Asset Tracking",
        "Inventory Monitoring",
        "Ownership Management",
        "Location Tracking",
        "Asset Lifecycle"
      ],

      technical: [
        "Real-Time Monitoring",
        "Dashboard Reporting",
        "Data Visualization",
        "Inventory Control"
      ],

      impact:
        "Improved asset visibility, accountability, and management through centralized monitoring and reporting."
    }
  ];


  return (
    <section
      id="projects"
      className={`relative z-10 container mx-auto ${sectionPadding}`}
    >
      {/* Background Glow */}
      <div
        className={`absolute w-[500px] h-[500px] blur-[160px] rounded-full -top-16 -left-16 pointer-events-none
        ${darkMode ? 'bg-blue-500/20' : 'bg-blue-200/30'}`}
      />

      <div
        className={`absolute w-[400px] h-[400px] blur-[140px] rounded-full -bottom-16 -right-16 pointer-events-none
        ${darkMode ? 'bg-purple-500/20' : 'bg-purple-300/30'}`}
      />


      {/* Heading */}
      <h2 className={heading}>
        Projects
      </h2>


      {/* Project Cards */}
      <div className="grid lg:grid-cols-2 gap-10">

        {projects.map((project, index) => (

          <div
            key={index}
            className={`
              group relative p-8 rounded-2xl border
              backdrop-blur-xl transition-all duration-500
              hover:-translate-y-3 hover:shadow-2xl
              ${
                darkMode
                ? `
                bg-white/5
                border-white/10
                hover:border-blue-400/50
                hover:shadow-blue-500/20
                `
                :
                `
                bg-white/70
                border-gray-200
                hover:border-blue-400
                hover:shadow-blue-200
                `
              }
            `}
          >


            {/* Category */}
            <div className="mb-5">

              <span
                className="
                inline-flex px-4 py-1 rounded-full
                text-xs font-semibold
                bg-gradient-to-r
                from-blue-400/20
                via-cyan-300/20
                to-purple-400/20
                text-blue-400
                border border-blue-400/20
                "
              >
                {project.category}
              </span>

            </div>



            {/* Title */}
            <h3
              className={`
              text-xl md:text-2xl
              font-bold mb-4
              ${
                darkMode
                ? 'text-gray-200'
                : 'text-gray-900'
              }
              `}
            >
              {project.title}
            </h3>



            {/* Description */}
            <p
              className={`
              text-sm leading-relaxed mb-8
              ${
                darkMode
                ? 'text-gray-400'
                : 'text-gray-700'
              }
              `}
            >
              {project.description}
            </p>



            {/* Modules */}
            <div className="mb-7">

              <h4
                className={`
                text-sm font-semibold mb-3
                ${
                  darkMode
                  ? 'text-gray-200'
                  : 'text-gray-800'
                }
                `}
              >
                Key Modules
              </h4>


              <div className="flex flex-wrap gap-2">

                {project.modules.map((item, i)=>(
                  <span
                    key={i}
                    className={`
                    px-3 py-1 rounded-lg
                    text-xs
                    border
                    ${
                      darkMode
                      ?
                      `
                      bg-white/5
                      border-white/10
                      text-gray-400
                      `
                      :
                      `
                      bg-gray-100
                      border-gray-200
                      text-gray-700
                      `
                    }
                    `}
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>





            {/* Technical */}
            <div className="mb-7">

              <h4
                className={`
                text-sm font-semibold mb-3
                ${
                  darkMode
                  ? 'text-gray-200'
                  : 'text-gray-800'
                }
                `}
              >
                Technical Highlights
              </h4>



              <div className="flex flex-wrap gap-2">

                {project.technical.map((item,i)=>(

                  <span
                    key={i}
                    className="
                    px-3 py-1 rounded-lg
                    text-xs
                    bg-purple-400/10
                    text-purple-300
                    border border-purple-400/20
                    "
                  >
                    {item}
                  </span>

                ))}

              </div>

            </div>





            {/* Impact */}
            <div
              className={`
              pt-5 border-t
              ${
                darkMode
                ?
                'border-white/10'
                :
                'border-gray-200'
              }
              `}
            >

              <h4
                className={`
                text-sm font-semibold mb-2
                ${
                  darkMode
                  ? 'text-gray-200'
                  : 'text-gray-800'
                }
                `}
              >
                Business Impact
              </h4>


              <p
                className={`
                text-sm leading-relaxed
                ${
                  darkMode
                  ? 'text-gray-400'
                  : 'text-gray-700'
                }
                `}
              >
                {project.impact}
              </p>


            </div>



            {/* Hover Gradient */}
            <div
              className="
              absolute inset-0 rounded-2xl
              bg-gradient-to-r
              from-blue-400/0
              via-cyan-300/0
              to-purple-400/0
              group-hover:from-blue-400/5
              group-hover:via-cyan-300/5
              group-hover:to-purple-400/5
              transition duration-500
              pointer-events-none
              "
            />


          </div>

                ))}

      </div>
    </section>
  );
}