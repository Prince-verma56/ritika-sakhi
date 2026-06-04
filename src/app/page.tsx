'use client';

import React, { useRef } from 'react';
import SnowflakeCursor from '@/components/AllCursors/SnowFlakeCursor';
import { HeroSection, AboutSection, GallerySection, VibesSection, FinalSection } from '@/components/home';
import { useLenis } from '@/hooks/useLenis';
import { useHomeAnimations } from '@/hooks/useHomeAnimations';

export default function Home() {
  const boxRef = useRef<HTMLDivElement>(null);

  useLenis();
  useHomeAnimations();

  return (
    <>
      <SnowflakeCursor />
      <div className="h-full w-full bg-[#fefae0]">
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <VibesSection boxRef={boxRef} />
        <FinalSection />
      </div>
    </>
  );
}
