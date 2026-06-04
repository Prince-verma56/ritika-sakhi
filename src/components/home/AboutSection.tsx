'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';

// ─── Floating gold orb — decorative background detail ────────────────────────
function GoldOrb({ size, top, left, opacity }: { size: number; top: string; left: string; opacity: number }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        top, left, opacity,
        background: 'radial-gradient(circle, rgba(200,180,50,0.35) 0%, transparent 70%)',
        filter: 'blur(28px)',
      }}
    />
  );
}

// ─── Inline quote mark SVG ────────────────────────────────────────────────────
function QuoteMark() {
  return (
    <svg width="48" height="36" viewBox="0 0 48 36" fill="none" className="mb-3 opacity-30">
      <path d="M0 36V22.5C0 10.074 7.2 2.7 21.6 0l2.4 4.5C16.2 6.3 12 10.8 12 18H21.6V36H0ZM26.4 36V22.5C26.4 10.074 33.6 2.7 48 0l2.4 4.5C42.6 6.3 38.4 10.8 38.4 18H48V36H26.4Z"
        fill="#847B1A" />
    </svg>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  const leftInView = useInView(leftRef, { once: true, amount: 0.25 });
  const rightInView = useInView(rightRef, { once: true, amount: 0.25 });
  const taglineInView = useInView(taglineRef, { once: true, amount: 0.5 });

  return (
    <>
      <div
        ref={sectionRef}
        className="page2 w-full relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #fefae0 0%, #fdf3d0 60%, #fef6e4 100%)', minHeight: '100vh' }}
      >
        {/* ── Decorative ambient orbs ── */}
        <GoldOrb size={380} top="-80px" left="-100px" opacity={0.6} />
        <GoldOrb size={260} top="40%" left="85%" opacity={0.45} />
        <GoldOrb size={200} top="70%" left="10%" opacity={0.3} />

        {/* ── Thin top accent line ── */}
        <motion.div
          className="w-full h-[2px] absolute top-0 left-0"
          style={{ background: 'linear-gradient(to right, transparent, rgba(132,123,26,0.4), transparent)' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />

        {/* ── Main content ── */}
        <div className="w-full min-h-screen flex flex-col lg:flex-row items-center px-8 lg:px-20 py-16 gap-12 relative z-10">

          {/* ────────────────── LEFT — Text card ────────────────── */}
          <motion.div
            ref={leftRef}
            className="w-full lg:w-[52%] relative"
            initial={{ opacity: 0, x: -60 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Card with refined border */}
            <div
              className="relative rounded-3xl p-8 lg:p-12"
              style={{
                background: 'rgba(255,252,235,0.75)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(132,123,26,0.18)',
                boxShadow: '0 8px 48px rgba(132,123,26,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
              }}
            >
              {/* Corner accent — top left */}
              <div className="absolute top-4 left-4 pointer-events-none" style={{ opacity: 0.25 }}>
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <path d="M0 32 L0 0 L32 0" fill="none" stroke="#847B1A" strokeWidth="1.5" />
                </svg>
              </div>
              {/* Corner accent — bottom right */}
              <div className="absolute bottom-4 right-4 pointer-events-none" style={{ opacity: 0.25 }}>
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <path d="M32 0 L32 32 L0 32" fill="none" stroke="#847B1A" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Eyebrow */}
              <motion.p
                className="text-[10px] uppercase tracking-[0.5em] mb-4"
                style={{ color: 'rgba(132,123,26,0.55)', fontFamily: 'monospace' }}
                initial={{ opacity: 0, y: -10 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                ✦ a birthday tribute
              </motion.p>

              {/* Name — staggered letters */}
              <div className="overflow-hidden mb-6">
                <motion.h1
                  className="font-serif font-bold"
                  style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: '#847B1A', lineHeight: 1.1 }}
                  initial={{ y: 60, opacity: 0 }}
                  animate={leftInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  Ritika Madam
                </motion.h1>
              </div>

              {/* Thin gold rule */}
              <motion.div
                style={{ height: 1, background: 'linear-gradient(to right, #847B1A, transparent)', marginBottom: 24, opacity: 0.35 }}
                initial={{ scaleX: 0 }}
                animate={leftInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
              />

              {/* Quote mark */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={leftInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.55 }}
              >
                <QuoteMark />
              </motion.div>

              {/* Paragraph — fades in as a block */}
              <motion.p
                className="font-mono leading-relaxed"
                style={{ fontSize: 'clamp(0.82rem,1.4vw,1rem)', color: '#3a3520', lineHeight: 1.85 }}
                initial={{ opacity: 0, y: 20 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
              >
                Some people show up only for the work — once the project ends, so does the
                connection.{' '}
                <span style={{ color: '#847B1A', fontWeight: 600 }}>Ritika was different.</span>{' '}
                One Google Meet was all it took to feel like, okay, this person is genuinely one
                of mine. No performance, no small talk — just honest, easy conversation.
                <br /><br />
                She is bubbly and fun, but also the kind of person you can say anything real to
                without worrying. She never once made the BCA vs B.Tech difference feel like a
                thing —{' '}
                <span style={{ color: '#847B1A', fontStyle: 'italic' }}>
                  and that, more than anything, is what makes her genuinely special.
                </span>
              </motion.p>

              {/* CTA button */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 16 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.85, ease: 'easeOut' }}
              >
                <Link href="/about">
                  <button
                    className="group relative overflow-hidden px-8 py-3 rounded-full font-mono text-sm font-semibold transition-all duration-300"
                    style={{
                      border: '1.5px solid rgba(132,123,26,0.6)',
                      color: '#847B1A',
                      background: 'transparent',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#847B1A';
                      (e.currentTarget as HTMLButtonElement).style.color = '#fefae0';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color = '#847B1A';
                    }}
                  >
                    <span className="relative z-10 tracking-widest uppercase text-xs">About her ✦</span>
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Floating badge — overlaps card corner */}
            <motion.div
              className="absolute -top-5 -right-5 w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #fefae0, #f5e68c)',
                border: '1.5px solid rgba(132,123,26,0.3)',
                boxShadow: '0 4px 20px rgba(132,123,26,0.18)',
                fontSize: 26,
              }}
              initial={{ scale: 0, rotate: -30 }}
              animate={leftInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0, type: 'spring', stiffness: 200 }}
            >
              🌸
            </motion.div>
          </motion.div>

          {/* ────────────────── RIGHT — Portrait ────────────────── */}
          <motion.div
            ref={rightRef}
            className="w-full lg:w-[48%] flex items-center justify-center relative"
            initial={{ opacity: 0, x: 60 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Soft glow ring behind image */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '80%', height: '80%',
                background: 'radial-gradient(circle, rgba(255,220,120,0.22) 0%, transparent 70%)',
                filter: 'blur(32px)',
                zIndex: 0,
              }}
            />

            {/* Portrait container — arch top shape */}
            <motion.div
              className="group relative overflow-hidden"
              style={{
                scale: 1.1,
                width: 'clamp(260px,38vw,420px)',
                aspectRatio: '3/4',
                borderRadius: '90% 90% 24px 24px / 44% 44% 24px 24px',
                border: '2px solid rgba(132,123,26,0.22)',
                boxShadow: '0 24px 64px rgba(100,80,20,0.18)',
                zIndex: 1,
              }}
              whileHover={{
                boxShadow: '0 35px 90px rgba(100,80,20,0.28)',
                y: -6,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Background Wash */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(160deg, #fce4e4 0%, #fff8e7 100%)',
                  zIndex: 0,
                }}
              />

              {/* Image Zoom Layer */}
              <motion.div
                className="absolute inset-0"
                whileHover={{
                  scale: 1.12,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Image
                  src="https://res.cloudinary.com/dtslaveid/image/upload/v1780515074/ChatGPT_Image_Jun_4_2026_12_52_12_AM_v4aad3.png"
                  fill
                  className="object-cover"
                  alt="Ritika Mam"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 38vw"
                />
              </motion.div>

              {/* Cinematic Gradient */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{
                  opacity: 0.5,
                }}
                whileHover={{
                  opacity: 0.9,
                }}
                transition={{
                  duration: 0.5,
                }}
                style={{
                  zIndex: 2,
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.20) 0%, transparent 35%, rgba(0,0,0,0.08) 100%)',
                }}
              />

              {/* Soft Shine */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{
                  x: '-120%',
                }}
                whileHover={{
                  x: '120%',
                }}
                transition={{
                  duration: 1.4,
                  ease: 'easeInOut',
                }}
                style={{
                  zIndex: 3,
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
                }}
              />
            </motion.div>

            {/* Floating mini card — personality stat */}
            <motion.div
              className="absolute bottom-6 -left-4 lg:-left-8 rounded-2xl px-5 py-3"
              style={{
                background: 'rgba(255,252,235,0.92)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(132,123,26,0.2)',
                boxShadow: '0 8px 24px rgba(132,123,26,0.12)',
                zIndex: 10,
              }}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={rightInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.9, type: 'spring', stiffness: 180 }}
            >
              <p className="text-[10px] uppercase tracking-widest font-mono" style={{ color: 'rgba(132,123,26,0.5)' }}>vibes</p>
              <p className="font-serif text-lg font-semibold" style={{ color: '#847B1A' }}>Genuine ✦ Warm</p>
            </motion.div>

            {/* Floating mini card — top right */}
            <motion.div
              className="absolute top-6 -right-2 lg:-right-6 rounded-2xl px-4 py-2"
              style={{
                background: 'rgba(255,252,235,0.92)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(132,123,26,0.2)',
                boxShadow: '0 8px 24px rgba(132,123,26,0.12)',
                zIndex: 10,
              }}
              initial={{ opacity: 0, y: -16, scale: 0.9 }}
              animate={rightInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: 1.05, type: 'spring', stiffness: 180 }}
            >
              <p className="font-mono text-xs font-semibold" style={{ color: '#847B1A' }}>🎂 Birthday Girl</p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Tagline strip — full width, bottom of section ── */}
        <motion.div
          ref={taglineRef}
          className="w-full py-5 flex items-center justify-center gap-8 relative z-10 overflow-hidden"
          style={{
            borderTop: '1px solid rgba(132,123,26,0.1)',
            background: 'rgba(255,250,224,0.5)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={taglineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {['Bubbly', '✦', 'Honest', '✦', 'Genuine', '✦', 'Unforgettable', '✦', 'One of a Kind'].map((word, i) => (
            <span
              key={i}
              className="font-mono text-xs uppercase tracking-widest whitespace-nowrap"
              style={{ color: i % 2 === 1 ? 'rgba(132,123,26,0.3)' : 'rgba(132,123,26,0.6)' }}
            >
              {word}
            </span>
          ))}
        </motion.div>

        {/* ── Bottom connector — organic curve into GallerySection ── */}
        <div className="w-full pointer-events-none" style={{ height: 80, marginBottom: -1 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
            {/* Bleeds from #fefae0 into the gallery's #fefae0 — seamless */}
            <path
              d="M0,0 C200,60 500,80 720,40 C940,0 1200,70 1440,30 L1440,80 L0,80 Z"
              fill="rgba(200,190,100,0.08)"
            />
            <path
              d="M0,30 C300,80 700,20 1000,55 C1200,78 1380,35 1440,50 L1440,80 L0,80 Z"
              fill="rgba(254,250,224,0.95)"
            />
          </svg>
        </div>
      </div>
    </>
  );
}