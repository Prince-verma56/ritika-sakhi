'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useHomeAnimations() {
  useGSAP(() => {
    // PAGE 1 — Hero entrance timeline
    // These selectors (.layer-1, .layer-2, .top-circle-text, .main-title)
    // live in HeroSection.tsx and are still valid.
    const tl = gsap.timeline();
    tl.from('.layer-2', { y: -30, scaleY: 0.5, rotateX: 45, duration: 0.8, opacity: 0, delay: 1.1, ease: 'power3.inOut' }, 'start')
      .from('.layer-1', { y: 30, scaleY: 0.8, rotateX: 45, duration: 0.7, opacity: 0, delay: 0.1, ease: 'power3.inOut' })
      .from('.top-circle-text', { y: 30, scaleY: 0.2, rotateX: 90, rotateY: 90, duration: 1, opacity: 0, delay: 0.2, ease: 'power3.inOut' })
      .from('.main-title', { y: 40, x: -50, scaleY: 0.3, height: 1, rotateX: 90, duration: 1, opacity: 0, delay: 0.2, ease: 'power3.inOut' });

    // Pages 2–5 entrance animations are now handled by Framer Motion
    // directly inside AboutSection, GallerySection, VibesSection, and FinalSection.
  });
}

