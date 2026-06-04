'use client';

/**
 * PreloaderWrapper.tsx
 *
 * Responsibilities:
 *  1. Always-on    — shows the preloader on every hard page load / refresh.
 *                    Soft SPA navigation between routes does NOT remount the
 *                    root layout, so the preloader never double-fires.
 *  2. Scroll lock  — sets overflow:hidden on <body> while the preloader is
 *                    active and restores it once the onComplete callback fires.
 *  3. Dynamic load — the actual <Preloader> is imported with { ssr: false }
 *                    because it uses Framer Motion + browser timers. This
 *                    avoids all server-side / hydration mismatches.
 *
 * ─── To adjust the autoplay delay, set AUTOPLAY_DELAY_MS in MusicProvider.tsx
 */

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useMusicStore } from './MusicProvider';

// ── Lazy-load the heavy Preloader — no SSR ────────────────────────────────────
const Preloader = dynamic(() => import('./Preloader'), { ssr: false });

export default function PreloaderWrapper() {
  const { setPreloaderFinished } = useMusicStore();
  // Start as null to avoid a hydration mismatch (server renders nothing,
  // client decides on first effect whether to show the preloader).
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    // Always show on mount — this runs only in the browser, never on the server.
    // Because Next.js root layouts remount on every hard refresh/navigation,
    // this naturally plays on every page load without any storage logic.
    setShow(true);

    // Scroll lock: prevent body scroll while preloader is active
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      // Safety restore if component unmounts before onComplete fires
      document.body.style.overflow = prev;
    };
  }, []);

  const handleComplete = () => {
    document.body.style.overflow = '';
    setShow(false);
    setPreloaderFinished(true);
  };

  // null = SSR / not mounted yet → render nothing (no flash)
  if (!show) return null;

  return <Preloader onComplete={handleComplete} />;
}
