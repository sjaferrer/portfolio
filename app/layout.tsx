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
   First visit:
   - Defaults to LIGHT mode.
   - Does NOT use the system's dark-mode preference.

   Returning visit:
   - Uses the saved "dark" or "light" preference.

   This runs before React hydrates and before the page paints,
   helping prevent a flash of the wrong theme.
============================================================ */

const themeScript = `
(function () {
  try {
    var root = document.documentElement;
    var savedTheme = localStorage.getItem("theme");

    // Default to LIGHT mode.
    // Only use dark mode if the user explicitly saved "dark".
    var isDark = savedTheme === "dark";

    root.classList.toggle("dark", isDark);

    root.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  } catch (error) {
    // Safe fallback: LIGHT mode.
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

            Must run before the page content is rendered.
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

          /* ==================================================
             LIGHT MODE
          ================================================== */

          "bg-[#f8f8f6]",
          "text-[#171717]",

          /* ==================================================
             DARK MODE
          ================================================== */

          "dark:bg-[#111111]",
          "dark:text-white",

          /* ==================================================
             THEME TRANSITION
          ================================================== */

          "transition-colors",
          "duration-300",
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
