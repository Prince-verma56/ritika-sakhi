import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useMusicStore } from '@/components/MusicProvider';

gsap.registerPlugin(ScrollTrigger);

export function useHomeAnimations() {
  const { preloaderFinished } = useMusicStore();

  useGSAP(() => {
    if (!preloaderFinished) {
      // Hard initialize target states to 0 opacity immediately on mount
      gsap.set(['.layer-2', '.layer-1', '.top-circle-text', '.main-title'], { opacity: 0 });
      return;
    }

    // PAGE 1 — Hero entrance timeline
    // Runs only after preloaderFinished is true.
    const tl = gsap.timeline();
    tl.fromTo('.layer-2', 
        { y: -30, scaleY: 0.5, rotateX: 45, opacity: 0 },
        { y: 0, scaleY: 1, rotateX: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.inOut' }, 
        'start'
      )
      .fromTo('.layer-1', 
        { y: 30, scaleY: 0.8, rotateX: 45, opacity: 0 },
        { y: 0, scaleY: 1, rotateX: 0, opacity: 1, duration: 0.7, ease: 'power3.inOut' },
        '-=0.3' // start slightly overlapping for a smoother cascade
      )
      .fromTo('.top-circle-text', 
        { y: 30, scaleY: 0.2, rotateX: 90, rotateY: 90, opacity: 0 },
        { y: 0, scaleY: 1, rotateX: 0, rotateY: 0, opacity: 1, duration: 1, ease: 'power3.inOut' },
        '-=0.4'
      )
      .fromTo('.main-title', 
        { y: 40, x: -50, scaleY: 0.3, rotateX: 90, opacity: 0 },
        { y: 0, x: 0, scaleY: 1, rotateX: 0, opacity: 1, duration: 1, ease: 'power3.inOut' },
        '-=0.5'
      );

    // Pages 2–5 entrance animations are now handled by Framer Motion
    // directly inside AboutSection, GallerySection, VibesSection, and FinalSection.
  }, [preloaderFinished]);
}

