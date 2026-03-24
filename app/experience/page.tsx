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
                Developed full-stack applications. Optimized internal processes, integrated biometric systems, and designed scalable databases.
              </p>

              <h5 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                Key Achievements
              </h5>
              <ul className={`list-disc list-inside space-y-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Reduced internal process time by 20% through web application automation</li>
                <li>Optimized front-end and back-end performance for better responsiveness</li>
                <li>Integrated biometric attendance systems</li>
              </ul>
            </div>

            {/* Experience Card 2 */}
            <div className={`${glassCard} sm:ml-16 w-full sm:w-auto`}>
              <div className="absolute -left-4 top-12 w-8 h-0.5 bg-gradient-to-r from-blue-400/50 to-transparent hidden sm:block"></div>

              <h3 className={`text-lg md:text-xl font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                System Analyst / Programmer
              </h3>
              <h4 className={`text-base md:text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                Lapanday Foods Corporation
              </h4>

              <p className={`text-sm md:text-base mb-4 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Developed and maintained the HRIS system, documenting processes and participating in the full SDLC to deliver full-stack solutions for business operations.
              </p>

              <h5 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                Key Achievements
              </h5>
              <ul className={`list-disc list-inside space-y-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Delivered efficient full-stack HRIS solutions</li>
                <li>Documented system designs and maintained technical specifications</li>
                <li>Participated in testing, debugging, and process improvement initiatives</li>
                <li>Engaged in all phases of SDLC to enhance workflows</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}