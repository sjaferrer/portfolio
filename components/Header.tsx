'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Racing_Sans_One } from 'next/font/google';

const racingSansOne = Racing_Sans_One({
  subsets: ['latin'],
  weight: '400',
});

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center p-5">

        <h1 className={`${racingSansOne.className} text-blue-400 text-2xl tracking-wider`}>
          sj.
        </h1>

        <nav className="hidden md:flex space-x-6 text-gray-300 font-medium">
          {navItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <span className="hover:text-white transition hover:scale-105">
                {item.name}
              </span>
            </Link>
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
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.path}>
                  <span
                    className="text-gray-300 hover:text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}