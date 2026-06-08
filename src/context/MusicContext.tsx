'use client';

import { createContext, useContext } from 'react';

export interface MusicCtx {
  playing: boolean;
  volume: number;
  unlocked: boolean;   // true = browser allowed audio (gesture done)
  needsGesture: boolean;   // true = show the "tap to play" nudge
  preloaderFinished: boolean; // coordinates entrance animations when preloader is done
  toggle: () => void;
  setVolume: (v: number) => void;
  dismissNudge: () => void; // user tapped nudge → unlock + play
  setPreloaderFinished: (finished: boolean) => void;
}

export const MusicContext = createContext<MusicCtx | null>(null);

export function useMusicStore() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusicStore must be used inside MusicProvider');
  return ctx;
}
