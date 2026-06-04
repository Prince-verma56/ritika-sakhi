
'use client';

import React, {
  createContext, useContext, useRef, useState,
  useCallback, useEffect, useLayoutEffect,
} from 'react';

// /sounds/ArzKiyaHaiFull.mp3

// const MUSIC_SRC = '';
const MUSIC_SRC = '/sounds/ArzKiyaHaiFull.mp3';
const FADE_IN_DURATION = 1.2;   // seconds
const FADE_OUT_DURATION = 1.2;
const AUTOPLAY_DELAY_MS = 300;   // ms after gesture before music starts

// ─── Context ──────────────────────────────────────────────────────────────────
interface MusicCtx {
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

const MusicContext = createContext<MusicCtx | null>(null);

export function useMusicStore() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusicStore must be used inside MusicProvider');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const unlockedRef = useRef(false);   // survived route changes
  const hasAutoplayedRef = useRef(false);   // don't re-autoplay if user paused
  const pendingPlayRef = useRef(false);   // waiting for gesture

  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [unlocked, setUnlocked] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  // Create audio element once on client, never recreate
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  // ── Smooth fade helper ───────────────────────────────────────────────────
  const fadeTo = useCallback((target: number, dur: number, cb?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) clearInterval(fadeRef.current);
    const start = audio.volume;
    const steps = 40;
    const ms = (dur * 1000) / steps;
    let i = 0;
    fadeRef.current = setInterval(() => {
      i++;
      const t = 1 - Math.pow(1 - i / steps, 3); // easeOutCubic
      audio.volume = Math.max(0, Math.min(1, start + (target - start) * t));
      if (i >= steps) {
        clearInterval(fadeRef.current!);
        audio.volume = target;
        cb?.();
      }
    }, ms);
  }, []);

  // ── Core play ────────────────────────────────────────────────────────────
  const play = useCallback((vol: number): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve(false);
    if (!audio.paused) { fadeTo(vol, FADE_IN_DURATION); return Promise.resolve(true); }
    audio.volume = 0;
    return audio.play()
      .then(() => {
        unlockedRef.current = true;
        hasAutoplayedRef.current = true;
        pendingPlayRef.current = false;
        setPlaying(true);
        setUnlocked(true);
        setNeedsGesture(false);
        fadeTo(vol, FADE_IN_DURATION);
        return true;
      })
      .catch(() => false);
  }, [fadeTo]);

  // ── Core pause ───────────────────────────────────────────────────────────
  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;
    fadeTo(0, FADE_OUT_DURATION, () => { audio.pause(); setPlaying(false); });
  }, [fadeTo]);

  // ── Public toggle ────────────────────────────────────────────────────────
  const toggle = useCallback(() => {
    unlockedRef.current = true;
    setUnlocked(true);
    pendingPlayRef.current = false;
    setNeedsGesture(false);
    if (playing) pause();
    else play(volume);
  }, [playing, volume, play, pause]);

  // ── Public setVolume ─────────────────────────────────────────────────────
  const setVolume = useCallback((v: number) => {
    unlockedRef.current = true;
    setVolumeState(v);
    const audio = audioRef.current;
    if (audio) { if (fadeRef.current) clearInterval(fadeRef.current); audio.volume = v; }
  }, []);

  // ── Nudge dismiss — user tapped the prompt ───────────────────────────────
  const dismissNudge = useCallback(() => {
    unlockedRef.current = true;
    pendingPlayRef.current = false;
    setUnlocked(true);
    setNeedsGesture(false);
    if (!hasAutoplayedRef.current && !playing) {
      setTimeout(() => play(volume), AUTOPLAY_DELAY_MS);
    }
  }, [playing, volume, play]);

  // ─────────────────────────────────────────────────────────────────────────
  //  AUTOPLAY ENGINE — runs once on mount
  //
  //  Layered strategy for Chrome's MEI policy:
  //  1. Try silent play at volume 0 immediately
  //     ✓ Works on: Firefox, Safari, Chrome (returning user w/ MEI > 0)
  //  2. If blocked → show nudge + listen for ANY gesture on window
  //     The moment user does ANYTHING (move mouse, scroll, tap) → play
  //     This is the only reliable Chrome workaround — requires 1 gesture
  //  3. Gesture ref persists in memory → SPA navigation never re-blocks
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (hasAutoplayedRef.current) return; // already playing, don't re-trigger
    const audio = audioRef.current;
    if (!audio) return;

    let delayTimer: ReturnType<typeof setTimeout>;

    const doPlay = () => {
      clearTimeout(delayTimer);
      delayTimer = setTimeout(() => play(volume), AUTOPLAY_DELAY_MS);
    };

    // If already unlocked (e.g. hot reload), play immediately
    if (unlockedRef.current) { doPlay(); return; }

    // Attempt silent autoplay
    audio.volume = 0;
    audio.play()
      .then(() => {
        unlockedRef.current = true;
        hasAutoplayedRef.current = true;
        setUnlocked(true);
        setPlaying(true);
        setNeedsGesture(false);
        delayTimer = setTimeout(() => fadeTo(volume, FADE_IN_DURATION), AUTOPLAY_DELAY_MS);
      })
      .catch(() => {
        // Chrome blocked — set up gesture capture
        audio.pause();
        pendingPlayRef.current = true;

        // Show nudge after a short delay so page loads first
        const nudgeTimer = setTimeout(() => {
          if (pendingPlayRef.current) setNeedsGesture(true);
        }, 1200);

        const unlock = () => {
          if (!pendingPlayRef.current) return;
          unlockedRef.current = true;
          pendingPlayRef.current = false;
          setUnlocked(true);
          setNeedsGesture(false);
          clearTimeout(nudgeTimer);
          cleanup();
          doPlay();
        };

        const cleanup = () => {
          (['click', 'touchstart', 'keydown', 'scroll', 'mousemove', 'pointerdown'] as const)
            .forEach(ev => window.removeEventListener(ev, unlock, true));
        };

        // Capture phase = fires before React handlers = most reliable
        (['click', 'touchstart', 'keydown', 'scroll', 'mousemove', 'pointerdown'] as const)
          .forEach(ev => window.addEventListener(ev, unlock, { once: true, capture: true, passive: true }));
      });

    return () => { clearTimeout(delayTimer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount — audio element never remounts

  const ctx: MusicCtx = {
    playing,
    volume,
    unlocked,
    needsGesture,
    preloaderFinished,
    toggle,
    setVolume,
    dismissNudge,
    setPreloaderFinished
  };

  return (
    <MusicContext.Provider value={ctx}>
      {children}
    </MusicContext.Provider>
  );
}
