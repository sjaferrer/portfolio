'use client';

import { Racing_Sans_One } from 'next/font/google';

const racingSansOne = Racing_Sans_One({
  subsets: ['latin'],
  weight: '400',
});

const skillGroups = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', desc: 'Full-stack, React, Node.js' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', desc: 'Enterprise React/Next.js' },
      { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', desc: 'Markup language for web' },
      { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', desc: 'Styling web pages' },
      { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', desc: 'Desktop & Web apps' },
      { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg', desc: 'Android development' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    skills: [
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', desc: 'Server-side React framework' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', desc: 'Backend runtime' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', desc: 'Utility-first CSS framework' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg', desc: 'CSS framework' },
      { name: 'jQuery', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-plain.svg', desc: 'Legacy frontend library' },
      { name: 'ASP.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg', desc: 'Web applications' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MS SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg', desc: 'Database design & queries' },
      { name: 'SQL Server Management Studio', icon: '', desc: 'Database management tool' },
      { name: 'SSRS', icon: '', desc: 'Reporting services' },
      { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-plain.svg', desc: 'Open-source backend with PostgreSQL, APIs, auth, and storage' },
    ],
  },
  {
    category: 'Version Control & Tools',
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg', desc: 'Version control' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', desc: 'Code hosting & collaboration' },
      { name: 'Android Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg', desc: 'Mobile development IDE' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', desc: 'Code editor & IDE' },
      { name: 'Visual Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg', desc: 'Full-featured IDE' },
    ],
  },
];

export default function SkillsPage() {
  const sectionPadding = 'py-32 px-4 sm:px-6 md:px-0';

  return (
    <section
      id="skills"
      className={`relative z-10 container mx-auto ${sectionPadding} flex flex-col gap-16`}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
        Skills
      </h2>

      <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-center items-stretch">
        {skillGroups.map((group, idx) => (
          <div
            key={idx}
            className="glass-card p-6 rounded-2xl w-full sm:w-[45%] md:w-[30%] lg:w-[22%] flex-shrink-0 flex flex-col"
          >
            <h3 className="md:text-lg font-semibold text-foreground mb-4">{group.category}</h3>
            <div className="space-y-2">
              {group.skills.map((skill, sidx) => (
                <div
                  key={sidx}
                  className="flex items-center justify-between py-1.5 px-2 rounded-md bg-secondary/30 hover:bg-primary/10 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {skill.icon ? (
                      <img
                        alt={`${skill.name} icon`}
                        src={skill.icon}
                        width={30}
                        height={30}
                        className="flex-shrink-0 p-1 bg-amber-50 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-500 rounded-full text-xs font-semibold">
                        {skill.name[0]}
                      </div>
                    )}
                    <div className="flex flex-col truncate">
                      <span className="font-medium text-foreground text-sm">{skill.name}</span>
                      <span className="text-xs text-muted-foreground truncate">{skill.desc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}