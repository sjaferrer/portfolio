import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stephen | Full-Stack .NET Developer",
  description: "Im Stephen from the ph",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white`}
      >
        {/* GLOBAL BACKGROUND GLOW (KEEP DESIGN) */}
        <div className="fixed w-[600px] h-[600px] bg-blue-500/20 blur-[160px] rounded-full top-20 left-10 animate-pulse pointer-events-none"></div>
        <div className="fixed w-[500px] h-[500px] bg-purple-500/20 blur-[160px] rounded-full bottom-20 right-10 animate-pulse pointer-events-none"></div>

        {/* <Header /> */}
        {children}
      </body>
    </html>
  );
}