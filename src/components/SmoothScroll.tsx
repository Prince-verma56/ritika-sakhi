'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollContext = createContext<Lenis | null>(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Instantiate Lenis with premium physics configurations
    const lenis = new Lenis({
      duration: 3.2,        // Scroll animation duration in seconds. Lower = faster response; Higher = slower & smoother glide. (Recommended: 1.0 to 1.5)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium exponential deceleration curve used by top Awwwards award sites
      wheelMultiplier: 1.08, // Distance multiplier for mouse wheel. Increase to scroll faster. (Recommended: 1.0 to 1.3)
      touchMultiplier: 1.6,  // Touch sensitivity. Increase to scroll faster on mobile screens. (Recommended: 1.2 to 2.0)
      smoothWheel: true,     // Actively smooths scroll wheel inputs
      infinite: false,
      syncTouch: true,       // Syncs scroll position on touch inputs for fluid parallax performance
    });

    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger so that GSAP triggers are updated correctly
    lenis.on('scroll', ScrollTrigger.update);

    // Integrate with GSAP ticker for frame rate synchronization
    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updatePhysics);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updatePhysics);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Sync scroll triggers on route transitions
  useEffect(() => {
    if (lenisRef.current) {
      // Force scroll to top on path change immediately
      lenisRef.current.scrollTo(0, { immediate: true });

      // Refresh scroll triggers after the new layout mounts
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <SmoothScrollContext.Provider value={lenisRef.current}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
