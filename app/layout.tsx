import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stephen J. - Full Stack Developer",
  description: "I'm Stephen from the PH",
};

/* ============================================================
   THEME INITIALIZATION
   ------------------------------------------------------------
   This runs before React hydrates and before the page paints.

   This is what prevents:

   DARK MODE
   white flash -> black

   Instead:

   DARK MODE
   black immediately
============================================================ */

const themeScript = `
(function () {
  try {
    var root = document.documentElement;
    var savedTheme = localStorage.getItem("theme");

    var isDark =
      savedTheme === "dark" ||
      (
        savedTheme !== "light" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );

    root.classList.toggle("dark", isDark);

    /*
     * Store the current theme as a data attribute too.
     * This is useful for the preloader and CSS.
     */
    root.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  } catch (error) {
    /*
     * Safe fallback.
     */
    document.documentElement.classList.remove("dark");
    document.documentElement.setAttribute(
      "data-theme",
      "light"
    );
  }
})();
`;

/* ============================================================
   ROOT LAYOUT
============================================================ */

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ====================================================
            THEME INITIALIZATION

            IMPORTANT:
            Keep this before the page content.
        ==================================================== */}

        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />

        {/* ====================================================
            DEVICON
        ==================================================== */}

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>

      <body
        className={[
          geistSans.variable,
          geistMono.variable,

          "antialiased",

          /*
           * LIGHT
           */
          "bg-[#f8f8f6]",
          "text-[#171717]",

          /*
           * DARK
           */
          "dark:bg-[#111111]",
          "dark:text-white",

          /*
           * Normal theme changes.
           */
          "transition-colors",
          "duration-300",
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
