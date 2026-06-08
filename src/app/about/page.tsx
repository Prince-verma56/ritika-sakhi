'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  bgImageSrc?: string;
}

export default function AboutSection({
  bgImageSrc = 'https://res.cloudinary.com/dtslaveid/image/upload/v1780924646/premium_photo-1680507425822-f9066024f13b_c73nxp.avif' // <-- Change this path to your preferred background image
}: AboutSectionProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Premium staggered reveal on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%', // Starts animation when the section is 75% from the top of the viewport
        toggleActions: 'play none none reverse',
      }
    });

    tl.from(labelRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
      .from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
      }, '-=0.5') // Overlaps slightly with previous animation for organic flow
      .from(dividerRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        transformOrigin: 'center'
      }, '-=0.6')
      .from(textRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.4');

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* ── Background Image Using Next.js Image Tag ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src={bgImageSrc}
          alt="About Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Premium editorial overlay to balance readability with the image details */}
        <div
          className="absolute inset-0 mix-blend-normal"
          style={{
            background: 'linear-gradient(to bottom, rgba(254,250,224,0.88) 0%, rgba(250,246,212,0.0092) 50%, rgba(254,250,224,0.088) 100%)'
          }}
        />
      </div>

      {/* ── Centered Content Layer ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full mx-auto pointer-events-none">

        {/* Section Label */}
        <p
          ref={labelRef}
          className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4 text-[#847B1A] opacity-80"
        >
          00 · About Her
        </p>

        {/* Large Centered Title */}
        <h2
          ref={titleRef}
          className="font-lirrier text-[#4e4a0e] tracking-tight leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)' }}
        >
          Abhi Mai Janta hi nhi Ullu Tujhe Zyada 👀.
        </h2>

        {/* Elegant Minimalist Line Divider */}
        <div
          ref={dividerRef}
          className="h-[1px] w-24 my-4"
          style={{ background: 'linear-gradient(to right, transparent, #847B1A, transparent)' }}
        />

        {/* Storytelling Subtext */}
        <p
          ref={textRef}
          className="font-mono font-bold text-sm md:text-base tracking-wide whitespace-nowrap text-[#0e0d00]/70 leading-relaxed max-w-2xl mt-4"
        >
          But if in future we wokr more together so i will know and update here also 🫠.
        </p>

      </div>
    </section>
  );
}