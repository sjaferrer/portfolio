'use client';

import { useState, useEffect } from 'react';
import { Racing_Sans_One } from 'next/font/google';

import About from './about/page';
import Experience from './experience/page';
import Skills from './skills/page';
import Projects from './projects/page';

const racingSansOne = Racing_Sans_One({
  subsets: ['latin'],
  weight: '400',
});

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const sectionPadding = 'py-32 px-6 md:px-0';
  const glassCard =
    'bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300';

  // Show scroll-to-top button after scrolling 400px
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="relative bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white font-sans overflow-hidden">

      {/* Global background glows */}
      <div className="fixed w-[600px] h-[600px] bg-blue-500/20 blur-[160px] rounded-full top-20 left-10 animate-pulse pointer-events-none"></div>
      <div className="fixed w-[500px] h-[500px] bg-purple-500/20 blur-[160px] rounded-full bottom-20 right-10 animate-pulse pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center p-5">
          <h1 className={`${racingSansOne.className} text-blue-400 text-2xl tracking-wider`}>
            sj.
          </h1>

          <nav className="hidden md:flex space-x-6 text-gray-300 font-medium">
            {['home','about','experience','skills','projects'].map((id) => (
              <a key={id} href={`#${id}`} className="hover:text-white transition hover:scale-105">
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden px-3 py-2 border border-white/20 rounded-lg text-gray-300 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden backdrop-blur-xl bg-black/40 border-t border-white/10">
            <ul className="flex flex-col p-4 space-y-3">
              {['home','about','experience','skills','projects'].map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-gray-300 hover:text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* 👉 Full Home Content */}
      <section
        id="home"
        className={`relative flex flex-col justify-center items-center text-center min-h-screen ${sectionPadding}`}
      >
        <div className="absolute w-[650px] h-[650px] bg-blue-500/20 blur-[160px] rounded-full -top-20 -left-20 pointer-events-none"></div>
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full bottom-0 right-0 pointer-events-none"></div>

        <div className="relative max-w-5xl px-6 mx-auto text-center md:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="block text-gray-300 mb-2">Hi, I’m</span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Stephen
            </span>
            <span className="block text-gray-300 text-xl md:text-2xl mt-3">
              Full-Stack .NET Developer | Systems Analyst
            </span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Passionate about building efficient and reliable web applications.
          </p>

          <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4 mb-12">
            <a
              href="/#projects"
              className="px-8 py-4 rounded-full bg-blue-500 hover:bg-blue-600 transition shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 flex items-center justify-center sm:justify-start space-x-2"
            >
              <span>View My Work →</span>
            </a>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/stephen-john-ferrer-964557318/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-blue-400/20 hover:bg-blue-400/40 transition flex items-center justify-center sm:justify-start space-x-2"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.3h.1c.67-1.3 2.3-2.7 4.7-2.7 5 0 5.9 3.3 5.9 7.6V24h-5v-7.1c0-1.7-.03-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8V24h-5V8z"/>
                </svg>
                <span className="text-gray-300 font-medium">LinkedIn</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/sjaferrer"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-gray-700/20 hover:bg-gray-700/40 transition flex items-center justify-center sm:justify-start space-x-2"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.234c-3.338.724-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.084 1.838 1.238 1.838 1.238 1.07 1.833 2.807 1.303 3.492.997.108-.774.418-1.304.76-1.604-2.665-.304-5.467-1.334-5.467-5.933 0-1.31.467-2.382 1.235-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.47 11.47 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.653.242 2.873.12 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.625-5.48 5.922.43.372.813 1.104.813 2.227v3.303c0 .32.218.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.373-12-12-12z"/>
                </svg>
                <span className="text-gray-300 font-medium">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <About />
      <Experience />
      <Skills />
      <Projects />

        {/* Footer */}
      <footer className="py-10 text-center text-gray-500 border-t border-white/10">
        © {new Date().getFullYear()} Stephen. All rights reserved.
      </footer>

      
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-6 right-6
            w-12 h-12 sm:w-14 sm:h-14
            bg-white/10 backdrop-blur-md border border-white/20
            rounded-full shadow-lg hover:shadow-blue-400/50
            text-white text-xl sm:text-2xl
            flex items-center justify-center
            transition-all duration-300 hover:-translate-y-1 hover:scale-110 z-50
          "
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}