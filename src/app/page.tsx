'use client';

import React, { useRef } from 'react';
import SnowflakeCursor from '@/components/AllCursors/SnowFlakeCursor';
import { HeroSection, AboutSection, GallerySection, VibesSection, FinalSection } from '@/components/home';
import { useHomeAnimations } from '@/hooks/useHomeAnimations';

export default function Home() {
  const boxRef = useRef<HTMLDivElement>(null);

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
