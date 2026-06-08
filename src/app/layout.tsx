import type { Metadata } from "next";
import "./globals.css";
import { MusicProvider } from "@/components/MusicProvider";
import { MusicNudge } from "@/components/MusicNudge";
import PreloaderWrapper from "@/components/PreloaderWrapper";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Ritika Sakhi ",
  description:
    "A beautiful tribute website dedicated to Diksha Mam — memories, gratitude, gallery, and more.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js-loading');`
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html.js-loading,
              html.js-loading body {
                background-color: #FCFAF2 !important;
                overflow: hidden !important;
              }
              html.js-loading .hide-until-preloader {
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
              }
            `
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <MusicProvider>
          {/*
           * PreloaderWrapper handles:
           *   • Dynamic import of Preloader (ssr: false) — no hydration mismatch
           *   • sessionStorage gate — only plays on the very first visit per tab
           *   • Scroll lock — body overflow:hidden while preloader is active
           *
           * Placed inside MusicProvider so future preloader ↔ music
           * coordination (e.g. start music after preloader) is trivial.
           */}
          <PreloaderWrapper />
          <SmoothScroll>
            <div className="hide-until-preloader">
              <Navbar />
              <MusicNudge />
              {children}
            </div>
          </SmoothScroll>
        </MusicProvider>
      </body>
    </html>
  );
}
