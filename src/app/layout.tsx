import type { Metadata } from "next";
import "./globals.css";
import { MusicProvider } from "@/components/MusicProvider";
import { MusicNudge } from "@/components/MusicNudge";
import PreloaderWrapper from "@/components/PreloaderWrapper";
import Navbar from "@/components/Navbar";

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
    <html lang="en" suppressHydrationWarning>
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
          <Navbar />
          <MusicNudge />
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}
