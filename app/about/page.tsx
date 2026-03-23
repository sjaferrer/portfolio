'use client';

export default function About() {
  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            About
            </h2>
          {/* <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Passionate about building transformative solutions that create real impact
          </p> */}
        </div>


        {/* Journey & How I Work */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

         {/* My Journey */}
        <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-white">Career Highlights</h3>
        <div className="space-y-4 text-gray-400 leading-relaxed">
            <p className="text-sm md:text-base">
             Full-Stack .NET Developer with a strong foundation in system analysis and a passion for building efficient, scalable, and user-friendly software solutions. My experience spans object-oriented programming, API development, database design, and modern web technologies, combined with the ability to analyze system requirements and troubleshoot complex applications.
            </p>
            <p className="text-sm md:text-base">
            Over the past few years, I have contributed to both enterprise and medium-scale projects, collaborating closely with teams to ensure successful delivery. From designing Human Resource Information Systems (HRIS) and Enterprise Resource Planning (ERP) modules to developing robust web applications with ASP.NET, C#, JavaScript, and HTML, I have focused on creating solutions that improve workflows and drive efficiency.
            </p>
            <p className="text-sm md:text-base">
            Beyond coding, I am dedicated to understanding the full software lifecycle — documenting processes, performing system testing, and analyzing performance to deliver reliable, high-quality applications. I thrive on turning complex challenges into streamlined, practical solutions that users and organizations can rely on.
            </p>
        </div>
        </div>
         {/* How I Work */}
            <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white">How I Work</h3>
            <div className="grid sm:grid-cols-2 gap-6">

                {/* Card 1 */}
                <div className="glass-card p-6 rounded-xl group bg-white/5 backdrop-blur-sm border border-white/10 shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg iconic mr-4 flex items-center justify-center flex-shrink-0 bg-white/10 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="url(#grad4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                        <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60A5FA" />   {/* blue-400 */}
                        <stop offset="50%" stopColor="#22D3EE" />  {/* cyan-300 */}
                        <stop offset="100%" stopColor="#A78BFA" /> {/* purple-400 */}
                        </linearGradient>
                    </defs>
                    <path d="m18 16 4-4-4-4"></path>
                    <path d="m6 8-4 4 4 4"></path>
                    <path d="m14.5 4-5 16"></path>
                    </svg>
                    </div>
                    <h4 className="font-semibold text-white">Clean Code</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Crafting clean, structured code that is easy to maintain, extend, and scale.
                </p>
                </div>

                {/* Card 2 */}
                <div className="glass-card p-6 rounded-xl group bg-white/5 backdrop-blur-sm border border-white/10 shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg iconic mr-4 flex items-center justify-center flex-shrink-0 bg-white/10 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="url(#grad3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60A5FA" />   {/* blue-400 */}
                        <stop offset="50%" stopColor="#22D3EE" />  {/* cyan-300 */}
                        <stop offset="100%" stopColor="#A78BFA" /> {/* purple-400 */}
                        </linearGradient>
                    </defs>
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                    <path d="M9 18h6"></path>
                    <path d="M10 22h4"></path>
                    </svg>
                    </div>
                    <h4 className="font-semibold text-white">Innovation</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                    I write code that’s easy to understand, easy to fix, and easy to build on.
                </p>
                </div>

                {/* Card 3 */}
                <div className="glass-card p-6 rounded-xl group bg-white/5 backdrop-blur-sm border border-white/10 shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg iconic mr-4 flex items-center justify-center flex-shrink-0 bg-white/10 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="url(#grad2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60A5FA" />   {/* blue-400 */}
                        <stop offset="50%" stopColor="#22D3EE" />  {/* cyan-300 */}
                        <stop offset="100%" stopColor="#A78BFA" /> {/* purple-400 */}
                        </linearGradient>
                    </defs>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    </div>
                    <h4 className="font-semibold text-white">Collaboration</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Partnering with diverse teams to achieve high-quality, impactful results.
                </p>
                </div>

                {/* Card 4 */}
                <div className="glass-card p-6 rounded-xl group bg-white/5 backdrop-blur-sm border border-white/10 shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg iconic mr-4 flex items-center justify-center flex-shrink-0 bg-white/10 group-hover:scale-110 transition-transform duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60A5FA" />   {/* blue-400 */}
                        <stop offset="50%" stopColor="#22D3EE" />  {/* cyan-300 */}
                        <stop offset="100%" stopColor="#A78BFA" /> {/* purple-400 */}
                        </linearGradient>
                    </defs>
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                    </svg>
                    </div>
                    <h4 className="font-semibold text-white">Performance</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Ensuring applications are fast, responsive, and deliver a seamless user experience.
                </p>
                </div>

            </div>
            </div>
        </div>

        {/* Stats */}
       <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">

  {/* Major Systems Built */}
  <div className="text-center glass-card p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform">
    <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-2">4+</div>
    <div className="text-gray-400 font-medium">Major Systems Built</div>
  </div>

  {/* Years of Experience */}
  <div className="text-center glass-card p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform">
    <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-2">2+</div>
    <div className="text-gray-400 font-medium">Years Experience</div>
  </div>

  {/* Technologies & Tools */}
  <div className="text-center glass-card p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform">
    <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-2">18+</div>
    <div className="text-gray-400 font-medium">Technologies & Tools Used</div>
  </div>

</div>

      </div>
    </section>
  );
}