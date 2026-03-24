'use client';

import { useState, useEffect } from 'react';
import { Racing_Sans_One } from 'next/font/google';

import About from './about/page';
import Experience from './experience/page';
import Skills from './skills/page';
import Projects from './projects/page';
import FadeInSection from '@/components/FadeInSection';

const racingSansOne = Racing_Sans_One({
  subsets: ['latin'],
  weight: '400',
});

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Dark mode state

  const sectionPadding = 'py-32 px-6 md:px-0';
  const glassCard =
    'rounded-2xl shadow-xl hover:-translate-y-2 transition-all duration-300';

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [darkMode]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div
      className={`relative overflow-hidden font-sans transition-colors duration-300
        ${darkMode
          ? 'bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-gray-300'
          : 'bg-white text-gray-800'
        }`}
    >
      {/* Background Circles */}
      <div
        className={`fixed w-[600px] h-[600px] blur-[160px] rounded-full top-20 left-10 animate-pulse pointer-events-none
          ${darkMode ? 'bg-blue-500/20' : 'bg-blue-200/30'}`}
      />
      <div
        className={`fixed w-[500px] h-[500px] blur-[160px] rounded-full bottom-20 right-10 animate-pulse pointer-events-none
          ${darkMode ? 'bg-purple-500/20' : 'bg-purple-300/30'}`}
      />

      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl transition-colors duration-300
          ${darkMode ? 'bg-black/40 border-b border-white/10' : 'bg-white/40 border-b border-gray-300/20'}
        `}
      >
        <div className="container mx-auto flex justify-between items-center p-5">
          <h1 className={`${racingSansOne.className} text-blue-400 text-2xl tracking-wider`}>sj.</h1>

          <nav className={`hidden md:flex space-x-6 font-medium transition-colors duration-300`}>
            {['home','about','experience','skills','projects'].map(id => (
              <a
                key={id}
                href={`#${id}`}
                className={`transition hover:scale-105
                  ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-gray-900'}`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>

          <button
            className={`md:hidden px-3 py-2 border rounded-lg text-2xl
              ${darkMode ? 'border-white/20 text-gray-300' : 'border-gray-300 text-gray-800'}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <nav
            className={`md:hidden backdrop-blur-xl transition-colors duration-300
              ${darkMode ? 'bg-black/40 border-t border-white/10' : 'bg-white/40 border-t border-gray-300/20'}`}
          >
            <ul className="flex flex-col p-4 space-y-3">
              {['home','about','experience','skills','projects'].map(id => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`transition-colors duration-300
                      ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-gray-900'}`}
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

      {/* Home Section */}
      <FadeInSection>
        <section
          id="home"
          className={`relative flex flex-col justify-center items-center text-center min-h-screen ${sectionPadding}`}
        >
          <div className={`absolute w-[650px] h-[650px] blur-[160px] rounded-full -top-20 -left-20 pointer-events-none
            ${darkMode ? 'bg-blue-500/20' : 'bg-blue-200/30'}`}
          />
          <div className={`absolute w-[500px] h-[500px] blur-[150px] rounded-full bottom-0 right-0 pointer-events-none
            ${darkMode ? 'bg-purple-500/20' : 'bg-purple-300/30'}`}
          />

          <div className="relative max-w-5xl px-6 mx-auto text-center md:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="block mb-2">Hi, I’m</span>
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Stephen
              </span>
              <span className="block text-xl md:text-2xl mt-3">
                Full-Stack .NET Developer | Systems Analyst
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
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
                  className={`px-6 py-3 rounded-full transition flex items-center justify-center sm:justify-start space-x-2
                    ${darkMode ? 'bg-blue-400/20 hover:bg-blue-400/40' : 'bg-blue-200/30 hover:bg-blue-300/50'}`}
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.3h.1c.67-1.3 2.3-2.7 4.7-2.7 5 0 5.9 3.3 5.9 7.6V24h-5v-7.1c0-1.7-.03-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8V24h-5V8z"/>
                  </svg>
                  <span className="font-medium">{darkMode ? 'LinkedIn' : 'LinkedIn'}</span>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/sjaferrer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-full transition flex items-center justify-center sm:justify-start space-x-2
                    ${darkMode ? 'bg-gray-700/20 hover:bg-gray-700/40' : 'bg-gray-200/30 hover:bg-gray-300/50'}`}
                  aria-label="GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.234c-3.338.724-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.084 1.838 1.238 1.838 1.238 1.07 1.833 2.807 1.303 3.492.997.108-.774.418-1.304.76-1.604-2.665-.304-5.467-1.334-5.467-5.933 0-1.31.467-2.382 1.235-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.47 11.47 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.653.242 2.873.12 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.625-5.48 5.922.43.372.813 1.104.813 2.227v3.303c0 .32.218.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.373-12-12-12z"/>
                  </svg>
                  <span className="font-medium">{darkMode ? 'GitHub' : 'GitHub'}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Other Sections */}
      <FadeInSection><About darkMode={darkMode} /></FadeInSection>
      <FadeInSection><Experience darkMode={darkMode}/></FadeInSection>
      <FadeInSection><Skills  darkMode={darkMode}/></FadeInSection>
      <FadeInSection><Projects darkMode={darkMode}/></FadeInSection>

      {/* Footer */}
      {/* Footer */}
<footer className={`relative mt-20 border-t overflow-hidden backdrop-blur-xl transition-colors duration-300
  ${darkMode ? 'bg-black/20 border-white/10' : 'bg-white/40 border-gray-300/20'}`}
>
  {/* Background radial circles */}
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05]"
      style={{
        background: 'radial-gradient(circle, rgba(78,205,196,0.5) 0%, transparent 70%)',
        bottom: '-200px',
        left: '-100px',
      }}
    ></div>
    <div
      className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05]"
      style={{
        background: 'radial-gradient(circle, rgba(216,178,242,0.5) 0%, transparent 70%)',
        bottom: '-150px',
        right: '-100px',
      }}
    ></div>
  </div>

  {/* Footer content */}
  <div className="relative container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:text-left">
    {/* Quick Links */}
    <div className="space-y-3">
      <h3 className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} font-semibold`}>Quick Links</h3>
      <nav className="flex flex-col space-y-2">
        {['home','about','experience','skills','projects'].map(link => (
          <a
            key={link}
            href={`#${link}`}
            className={`transition-all duration-300 hover:translate-x-1
              ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </a>
        ))}
      </nav>
    </div>

    {/* Socials */}
    <div className="space-y-3">
      <h3 className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} font-semibold`}>Connect</h3>
      <div className="flex space-x-3 pt-4 justify-center md:justify-start">
        {/* GitHub */}
        <a
          href="https://github.com/sjaferrer"
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110
            ${darkMode ? 'border-white/10 text-gray-300 hover:text-blue-400' : 'border-gray-300 text-gray-700 hover:text-blue-500'}`}
          aria-label="GitHub"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.234c-3.338.724-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.084 1.838 1.238 1.838 1.238 1.07 1.833 2.807 1.303 3.492.997.108-.774.418-1.304.76-1.604-2.665-.304-5.467-1.334-5.467-5.933 0-1.31.467-2.382 1.235-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.47 11.47 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.653.242 2.873.12 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.625-5.48 5.922.43.372.813 1.104.813 2.227v3.303c0 .32.218.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.373-12-12-12z"/>
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/stephen-john-ferrer-964557318/"
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110
            ${darkMode ? 'border-white/10 text-gray-300 hover:text-blue-400' : 'border-gray-300 text-gray-700 hover:text-blue-500'}`}
          aria-label="LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect width="4" height="12" x="2" y="9"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </a>
      </div>
    </div>
  </div>

  {/* Copyright */}
<div className={`border-t pt-6 pb-6 text-center text-sm transition-colors duration-300
  ${darkMode ? 'border-white/10 text-gray-400' : 'border-gray-300/20 text-gray-700'}`}
>
  © {new Date().getFullYear()} Stephen. All rights reserved.
</div>
</footer>

      {/* Floating Left: Dark/Light Mode */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border transition shadow-lg text-xl sm:text-2xl
            ${darkMode ? 'border-gray-400/30 bg-gray-700/20 hover:bg-gray-600/40 text-white' 
                       : 'border-gray-400/30 bg-white/80 hover:bg-gray-200/50 text-black'}`}
          aria-label="Toggle Dark/Light Mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Floating Right: Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border shadow-lg text-xl sm:text-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 z-50
            ${darkMode
              ? 'border-white/20 bg-white/10 hover:shadow-blue-400/50 text-white'
              : 'border-gray-400/30 bg-gray-200/40 hover:shadow-blue-300/50 text-gray-800'
            }`}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}