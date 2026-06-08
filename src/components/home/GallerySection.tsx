'use client';

import React, { useRef } from 'react';
import CircularGallery from '@/components/CircularGallery/CircularGallery';
import { motion, useInView } from 'motion/react';

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Each element watches itself
  const headingRef = useRef<HTMLDivElement>(null);
  const flowersRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const flowersInView = useInView(flowersRef, { once: true, amount: 0.3 });
  const galleryInView = useInView(galleryRef, { once: true, amount: 0.15 });

  return (
    <div
      ref={sectionRef}
      className="page3 w-full h-screen py-5 relative overflow-hidden"
      style={{ background: '#fefae0' }}
    >

      {/* ── 1. Flowers GIF — slides in from left ── */}
      <motion.div
        ref={flowersRef}
        className="spring-flowers1 w-[50%] h-100 bg-cover bg-center absolute left-0 top-0 pointer-events-none"
        style={{
          backgroundImage: "url('/Videos/AnimationFl.gif')",
          zIndex: 10,
        }}
        initial={{ x: -120, opacity: 0 }}
        animate={flowersInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── 2. Heading — first to appear, fades + slides down ── */}
      <motion.div
        ref={headingRef}
        className="relative flex flex-col items-center gap-3 mt-10"
        style={{ zIndex: 20 }}
        initial={{ opacity: 0, y: -30 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          className="text-8xl font-awesome uppercase text-center tracking-widest"
          style={{ color: '#847B1A' }}
        >
          Gallery
        </h1>

        {/* Animated underline — draws itself after heading appears */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={headingInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        >
          <div style={{ width: 60, height: 1, background: 'linear-gradient(to right, transparent, #847B1A)' }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#847B1A', opacity: 0.7 }} />
          <div style={{ width: 120, height: 1, background: '#847B1A', opacity: 0.5 }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#847B1A', opacity: 0.7 }} />
          <div style={{ width: 60, height: 1, background: 'linear-gradient(to left, transparent, #847B1A)' }} />
        </motion.div>
      </motion.div>

      {/* ── 3. Gallery cards — scale up from 0.92, fade in ── */}
      <motion.div
        ref={galleryRef}
        className="w-full h-[85%]"
        style={{ background: '#fefae0' }}
        initial={{ opacity: 0, scale: 0.94, y: 40 }}
        animate={galleryInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <CircularGallery />
      </motion.div>

      {/* ── Bottom wave connector into VibesSection ── */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{ zIndex: 5, height: 90, marginBottom: -1 }}
      >
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,45 C360,90 720,10 1080,55 C1260,75 1380,30 1440,45 L1440,90 L0,90 Z" fill="rgba(255,210,190,0.35)" />
          <path d="M0,60 C240,20 600,85 900,50 C1100,28 1300,70 1440,60 L1440,90 L0,90 Z" fill="rgba(255,200,180,0.45)" />
          <path d="M0,72 C200,50 500,90 780,68 C1000,50 1260,82 1440,72 L1440,90 L0,90 Z" fill="rgba(253,228,210,0.75)" />
        </svg>
      </div>
    </div>
  );
}