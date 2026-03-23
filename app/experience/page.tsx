'use client';

export default function ExperiencePage() {
  const sectionPadding = 'py-32 px-4 sm:px-6 lg:px-8';
    const glassCard =
  'glass-card p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-md hover:shadow-2xl hover:-translate-y-1 hover:border-blue-400/50 transform relative';

  return (
    <section
      id="experience"
      className={`relative text-white min-h-screen ${sectionPadding} flex flex-col justify-center items-center`}
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
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-cyan-300 to-purple-400 opacity-40"></div>

          <div className="space-y-16">
            {/* Experience Card 1 */}
            <div className={`relative ${glassCard} ml-16`}>
              <div className="absolute -left-4 top-12 w-8 h-0.5 bg-gradient-to-r from-blue-400/50 to-transparent"></div>

              <h3 className="text-lg md:text-xl font-bold mb-1 ">
                Software Developer
              </h3>
              <h4 className="text-base md:text-lg font-semibold mb-2">
                Millennium Specialty Coco Products, Inc.
              </h4>

              <p className="text-sm md:text-base text-gray-300 mb-4 leading-relaxed">
                Developed full-stack applications. Optimized internal processes, integrated biometric systems, and designed scalable databases.
              </p>

              <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                Key Achievements
              </h5>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Reduced internal process time by 20% through web application automation</li>
                <li>Optimized front-end and back-end performance for better responsiveness</li>
                <li>Integrated biometric attendance systems</li>
              </ul>
            </div>

            {/* Experience Card 2 */}
            <div className={`relative ${glassCard} ml-16`}>
              <div className="absolute -left-4 top-12 w-8 h-0.5 bg-gradient-to-r from-blue-400/50 to-transparent"></div>

              <h3 className="text-lg md:text-xl font-bold mb-1">
                System Analyst / Programmer
              </h3>
              <h4 className="text-base md:text-lg font-semibold mb-2">
                Lapanday Foods Corporation
              </h4>

              <p className="text-sm md:text-base text-gray-300 mb-4 leading-relaxed">
                Developed and maintained the HRIS system, documenting processes and participating in the full SDLC to deliver full-stack solutions for business operations.
              </p>

              <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                Key Achievements
              </h5>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
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
// 'use client';

// import { Racing_Sans_One } from 'next/font/google';

// const racingSansOne = Racing_Sans_One({
//   subsets: ['latin'],
//   weight: '400',
// });

// export default function ExperiencePage() {
//   const sectionPadding = 'py-32 px-6 md:px-0';
//   const glassCard =
//     'bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-2 relative';

//   return (
//     <div className="relative bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white font-sans min-h-screen">

//       <section id="experience" className={`container mx-auto ${sectionPadding}`}>
//         <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
//           Experience
//         </h2>

//         <div className="relative grid md:grid-cols-2 gap-10">

//           {/* Vertical timeline line */}
//           <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-cyan-300 to-purple-400 opacity-30"></div>

//           {/* Software Developer Card */}
//           <div className={`${glassCard} p-6 flex flex-col z-10`}>
//             <div className="flex items-center mb-4 gap-3">
//               <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 via-cyan-300 to-purple-400 flex items-center justify-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M12 2 L12 22 M2 12 L22 12"></path>
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
//                 Software Developer
//               </h3>
//             </div>
//             <p className="text-gray-400 text-sm mb-4">Millennium Specialty Coco Products, Inc.</p>
//             <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
//               <li>Built full-stack web applications reducing internal process time by 20%.</li>
//               <li>Optimized ASP.NET and JavaScript apps for better performance.</li>
//               <li>Designed and maintained scalable database schemas.</li>
//               <li>Integrated biometric systems to streamline authentication.</li>
//             </ul>
//           </div>

//           {/* Systems Analyst / Programmer - Supervisor Card */}
//           <div className={`${glassCard} p-6 flex flex-col z-10`}>
//             <div className="flex items-center mb-4 gap-3">
//               <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 via-cyan-300 to-purple-400 flex items-center justify-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M4 6 L20 6 M4 12 L20 12 M4 18 L20 18"></path>
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
//                 Systems Analyst / Programmer - Supervisor
//               </h3>
//             </div>
//             <p className="text-gray-400 text-sm mb-4">Lapanday Foods Corporation</p>
//             <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
//               <li>Collaborated with development team to deliver efficient solutions.</li>
//               <li>Documented system designs and maintained technical specifications.</li>
//               <li>Participated in software testing and debugging processes.</li>
//               <li>Engaged in all phases of SDLC to improve workflows.</li>
//               <li>Developed full-stack applications supporting business operations.</li>
//             </ul>
//           </div>

//         </div>
//       </section>

//     </div>
//   );
// }