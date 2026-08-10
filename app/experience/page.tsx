'use client';

type ExperiencePageProps = {
  darkMode: boolean;
};

export default function ExperiencePage({ darkMode }: ExperiencePageProps) {
  const sectionPadding = 'py-32 px-4 sm:px-6 lg:px-8';
  const glassCard =
    'glass-card p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-md hover:shadow-2xl hover:-translate-y-1 hover:border-blue-400/50 transform relative';

  return (
    <section
      id="experience"
      className={`relative min-h-screen ${sectionPadding} flex flex-col justify-center items-center`}
    >
      {/* Background Blur Circles */}
      <div className="absolute w-[650px] h-[650px] bg-blue-500/20 blur-[160px] rounded-full -top-20 -left-20 pointer-events-none"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full bottom-0 right-0 pointer-events-none"></div>

      {/* Content */}
      <div className="relative max-w-5xl w-full mx-auto space-y-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
          Experience
        </h2>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute hidden sm:block left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-cyan-300 to-purple-400 opacity-40"></div>

          <div className="space-y-8 sm:space-y-16 flex flex-col items-center sm:items-start">
            {/* Experience Card 1 */}
            <div className={`${glassCard} sm:ml-16 w-full sm:w-auto`}>
              <div className="absolute -left-4 top-12 w-8 h-0.5 bg-gradient-to-r from-blue-400/50 to-transparent hidden sm:block"></div>

              <h3 className={`text-lg md:text-xl font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                Software Developer
              </h3>
              <h4 className={`text-base md:text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                Millennium Specialty Coco Products, Inc.
              </h4>

              <p className={`text-sm md:text-base mb-4 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Developed and maintained HR systems covering employee records, attendance tracking, overtime/undertime computation, job orders, travel orders, scheduling/calendar, service providers, and HR master data management.
              </p>

              <h5 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                Key Achievements
              </h5>
              <ul className={`list-disc list-inside space-y-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Built ERP business modules including Procure-to-Pay (P2P), warehouse inventory management, asset management, and centralized master data architecture.</li>
                <li>Designed and implemented user management, role-based access control (RBAC), and approval workflows.</li>
                <li>Created custom reports, dashboards, and analytics using database queries to support HR and business decisions.</li>
                <li>Optimized backend logic, database structures, and system configurations for better performance, scalability, and reliability.</li>
              </ul>
            </div>

            {/* Experience Card 2 */}
            <div className={`${glassCard} sm:ml-16 w-full sm:w-auto`}>
              <div className="absolute -left-4 top-12 w-8 h-0.5 bg-gradient-to-r from-blue-400/50 to-transparent hidden sm:block"></div>

              <h3 className={`text-lg md:text-xl font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                System Analyst / Programmer, Supervisor
              </h3>
              <h4 className={`text-base md:text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                Lapanday Foods Corporation
              </h4>

              <p className={`text-sm md:text-base mb-4 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Led the development of the Human Resource Information System (HRIS) supporting employee records, Personal Data Sheet (PDS), workforce administration, employee lifecycle management, leave, travel orders, attendance/timesheet tracking, and HR scheduling workflows.
              </p>

              <h5 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                Key Achievements
              </h5>
              <ul className={`list-disc list-inside space-y-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Developed talent acquisition solutions including applicant tracking, applicant portal kiosk, recruitment workflow automation, and monitoring dashboards.</li>
                <li>Built dashboards for applicant monitoring, position tracking, department reporting, and recruitment stage visualization.</li>
                <li>Designed centralized HR master data structures and documented system design, source code, and functionality for future enhancements.</li>
                <li>Participated in all phases of the Software Development Life Cycle (SDLC), including development, testing, quality assurance, debugging, issue resolution, performance monitoring, and system optimization.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}