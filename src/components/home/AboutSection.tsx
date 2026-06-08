'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';

function Diamond({ size = 6, opacity = 0.5 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" style={{ opacity, flexShrink: 0 }}>
      <polygon points="5,0 10,5 5,10 0,5" fill="#847B1A" />
    </svg>
  );
}

export default function AboutSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const leftInView = useInView(leftRef, { once: true, amount: 0.18 });
  const rightInView = useInView(rightRef, { once: true, amount: 0.18 });
  const bottomInView = useInView(bottomRef, { once: true, amount: 0.4 });

  return (
    <div
      className="page2 w-full relative overflow-hidden"
      style={{ background: 'linear-gradient(168deg,#fefae0 0%,#fdf4cc 55%,#fef8e4 100%)', minHeight: '100vh' }}
    >
      {/* ═══════════════════════════════════
          DECORATIVE BACKGROUND LAYER
      ═══════════════════════════════════ */}

      {/* Large faint mandala-style ring — top right */}
      <div className="absolute pointer-events-none" style={{ top: '-120px', right: '-120px', zIndex: 0 }}>
        <svg width="520" height="520" viewBox="0 0 520 520" fill="none">
          <circle cx="260" cy="260" r="240" stroke="rgba(132,123,26,0.07)" strokeWidth="1" />
          <circle cx="260" cy="260" r="200" stroke="rgba(132,123,26,0.05)" strokeWidth="1" />
          <circle cx="260" cy="260" r="160" stroke="rgba(132,123,26,0.04)" strokeWidth="1" />
          {/* 8 radial spokes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
            const rad = a * Math.PI / 180;
            const x1Val = (260 + 160 * Math.cos(rad)).toFixed(4);
            const y1Val = (260 + 160 * Math.sin(rad)).toFixed(4);
            const x2Val = (260 + 240 * Math.cos(rad)).toFixed(4);
            const y2Val = (260 + 240 * Math.sin(rad)).toFixed(4);
            return (
              <line key={a}
                x1={x1Val}
                y1={y1Val}
                x2={x2Val}
                y2={y2Val}
                stroke="rgba(132,123,26,0.06)" strokeWidth="1"
              />
            );
          })}
        </svg>
      </div>

      {/* Corner ornament — bottom left */}
      <div className="absolute pointer-events-none" style={{ bottom: '80px', left: '0', zIndex: 0 }}>
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
          <path d="M0 220 Q 0 0 220 0" stroke="rgba(132,123,26,0.08)" strokeWidth="1" fill="none" />
          <path d="M0 180 Q 0 40 180 40" stroke="rgba(132,123,26,0.06)" strokeWidth="1" fill="none" />
          <path d="M0 140 Q 0 80 140 80" stroke="rgba(132,123,26,0.05)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Ambient gold glow — centre */}
      <div className="absolute pointer-events-none" style={{
        top: '30%', left: '30%', width: 500, height: 400,
        background: 'radial-gradient(ellipse, rgba(210,190,60,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', zIndex: 0,
      }} />

      {/* Top hairline */}
      <motion.div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ height: 1, background: 'linear-gradient(to right,transparent 0%,rgba(132,123,26,0.3) 25%,rgba(132,123,26,0.3) 75%,transparent 100%)', zIndex: 2 }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ═══════════════════════════════════
          MAIN LAYOUT
      ═══════════════════════════════════ */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center px-8 lg:px-16 xl:px-20 pt-16 pb-4 gap-10 lg:gap-14">

        {/* ──────────── LEFT — Message panel ──────────── */}
        <motion.div
          ref={leftRef}
          className="w-full lg:w-[52%] flex flex-col justify-center"
          initial={{ opacity: 0, x: -48 }}
          animate={leftInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Section index */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0 }} animate={leftInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Diamond size={5} opacity={0.3} />
            <span style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.55em', color: 'rgba(132,123,26,0.45)', textTransform: 'uppercase' }}>
              Profile · 01
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(132,123,26,0.14)' }} />
          </motion.div>

          {/* Name plate */}
          <div className="overflow-hidden mb-1">
            <motion.h1
              className='relative left-1 font-lirrier '
              style={{ fontSize: 'clamp(3rem,6vw,5rem)', fontWeight: 400, color: '#4e4a0e', lineHeight: 1, letterSpacing: '-0.01em' }}
              initial={{ y: 90, opacity: 0 }}
              animate={leftInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Khushi
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-7">
            <motion.h2
              className='font-ohmynotes relative left-4 '
              style={{ fontSize: 'clamp(1rem,2.2vw,1.6rem)', fontWeight: 400, color: '#847B1A', lineHeight: 1, letterSpacing: '0.38em', textTransform: 'uppercase' }}
              initial={{ y: 40, opacity: 0 }}
              animate={leftInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              Jii
            </motion.h2>
          </div>

          {/* ── Royal message box ── */}
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,253,238,0.72)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(132,123,26,0.16)',
              boxShadow: '0 4px 40px rgba(132,123,26,0.07), inset 0 1px 0 rgba(255,255,255,0.7)',
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top border accent — animated gold bar */}
            <motion.div
              style={{ height: 2, background: 'linear-gradient(to right,rgba(132,123,26,0.6),rgba(200,185,60,0.8),rgba(132,123,26,0.6))', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={leftInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.52 }}
            />

            <div className="p-7 lg:p-8">
              {/* Corner SVG ornaments inside box */}
              <div className="absolute top-3 left-3 pointer-events-none" style={{ opacity: 0.18 }}>
                <svg width="22" height="22" viewBox="0 0 22 22"><path d="M0 22 L0 0 L22 0" fill="none" stroke="#847B1A" strokeWidth="1.2" /></svg>
              </div>
              <div className="absolute top-3 right-3 pointer-events-none" style={{ opacity: 0.18 }}>
                <svg width="22" height="22" viewBox="0 0 22 22"><path d="M22 22 L22 0 L0 0" fill="none" stroke="#847B1A" strokeWidth="1.2" /></svg>
              </div>
              <div className="absolute bottom-3 left-3 pointer-events-none" style={{ opacity: 0.18 }}>
                <svg width="22" height="22" viewBox="0 0 22 22"><path d="M0 0 L0 22 L22 22" fill="none" stroke="#847B1A" strokeWidth="1.2" /></svg>
              </div>
              <div className="absolute bottom-3 right-3 pointer-events-none" style={{ opacity: 0.18 }}>
                <svg width="22" height="22" viewBox="0 0 22 22"><path d="M22 0 L22 22 L0 22" fill="none" stroke="#847B1A" strokeWidth="1.2" /></svg>
              </div>

              {/* Pull quote */}
              <motion.p
                className='font-lirrier'
                style={{ fontSize: 'clamp(0.9rem,1.5vw,1.05rem)', fontStyle: 'italic', color: '#6a6210', lineHeight: 1.65, paddingLeft: 14, borderLeft: '2px solid rgba(132,123,26,0.4)', marginBottom: 18 }}
                initial={{ opacity: 0, x: -12 }}
                animate={leftInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                &ldquo;Not Just a Teammate &rdquo;
              </motion.p>

              {/* Divider */}
              <motion.div
                className="flex items-center gap-3 mb-5"
                initial={{ opacity: 0 }} animate={leftInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.68 }}
              >
                <div style={{ flex: 1, height: 1, background: 'rgba(132,123,26,0.12)' }} />
                <Diamond size={4} opacity={0.25} />
                <div style={{ flex: 1, height: 1, background: 'rgba(132,123,26,0.12)' }} />
              </motion.div>

              {/* Body text */}
              <motion.p
                className='font-ohmynotes  text-lg md:text-xl'
                style={{ color: 'rgba(48,44,18,0.72)', lineHeight: 2.0 }}
                initial={{ opacity: 0, y: 14 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.72 }}
              >
                At first glance, Ritika seems innocent and simple, but she's actually quite sharp, clever, and a complete artist in her own way. She says that "Khushi" doesn't really suit her, but honestly, I think it fits perfectly. What started as working together on a project slowly turned into a good friendship, and I'm genuinely glad I got a friend like you.
                and{' '}
                <span style={{ color: '#847B1A', fontStyle: 'italic' }}>that is what makes her genuinely special.</span>
              </motion.p>
            </div>

            {/* Bottom border accent */}
            <motion.div
              style={{ height: 1, background: 'linear-gradient(to right,transparent,rgba(132,123,26,0.2),transparent)', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={leftInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.78 }}
            />
          </motion.div>

          {/* ── Traits row ── */}
          <motion.div
            className="flex items-stretch gap-0 mt-5"
            initial={{ opacity: 0, y: 16 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.88 }}
          >
            {[
              { label: 'Vibe', value: 'Bubbly · Honest' },
              { label: 'Connection', value: 'Genuine · Deep' },
              { label: 'Energy', value: 'Warm · Bright' },
            ].map((item, i) => (
              <React.Fragment key={item.label}>
                {i > 0 && <div style={{ width: 1, background: 'rgba(132,123,26,0.14)', margin: '0 16px' }} />}
                <div className="flex flex-col gap-1">
                  <span style={{ fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(132,123,26,0.4)' }}>{item.label}</span>
                  <span style={{ fontSize: 12, fontFamily: 'Georgia,serif', color: '#6a6210', fontWeight: 600 }}>{item.value}</span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            className="mt-7"
            initial={{ opacity: 0 }}
            animate={leftInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.02 }}
          >
            <Link href="/about">
              <span
                className="inline-flex items-center gap-3"
                style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.48em', textTransform: 'uppercase', color: '#847B1A', cursor: 'pointer' }}
              >
                <span style={{ borderBottom: '1px solid rgba(132,123,26,0.4)', paddingBottom: 2 }}>Read more about her</span>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5h12M8 1l5 4-5 4" stroke="#847B1A" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ──────────── RIGHT — Portrait ──────────── */}
        <motion.div
          ref={rightRef}
          className="w-full lg:w-[48%] flex items-center justify-center relative"
          initial={{ opacity: 0, x: 52 }}
          animate={rightInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient glow */}
          <div className="absolute pointer-events-none" style={{
            width: '80%', height: '80%',
            background: 'radial-gradient(ellipse,rgba(210,190,80,0.13) 0%,transparent 70%)',
            filter: 'blur(44px)', zIndex: 0,
          }} />

          {/* ── Portrait — TRUE clip-path arch ── */}
          <motion.div
            className="relative"
            style={{
              width: 'clamp(280px,34vw,420px)',
              aspectRatio: '3/4',
              zIndex: 2,
            }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative frame ring — sits behind the clipped image */}
            <div
              className="absolute"
              style={{
                inset: -8,
                borderRadius: '50% 50% 18px 18px / 28% 28% 18px 18px',
                border: '1px solid rgba(132,123,26,0.18)',
                zIndex: 0,
              }}
            />
            <div
              className="absolute"
              style={{
                inset: -16,
                borderRadius: '50% 50% 22px 22px / 28% 28% 22px 22px',
                border: '1px dashed rgba(132,123,26,0.1)',
                zIndex: 0,
              }}
            />

            {/* Clipped image container */}
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                borderRadius: '50% 50% 18px 18px / 28% 28% 18px 18px',
                boxShadow: '0 28px 72px rgba(80,65,15,0.22), 0 0 0 1px rgba(132,123,26,0.12)',
                zIndex: 1,
              }}
            >
              {/* Warm bg wash */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(170deg,#fce8e0 0%,#fff5dc 100%)', zIndex: 0 }} />

              {/* Image with zoom on hover */}
              <motion.div
                className="absolute inset-0"
                style={{ zIndex: 1, position: 'absolute' }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="https://res.cloudinary.com/dtslaveid/image/upload/v1780512397/ChatGPT_Image_Jun_3_2026_06_34_59_PM_aztjma.png"
                  fill
                  className="object-cover object-top"
                  alt="Ritika (Khushi)"
                  priority
                  sizes="(max-width: 768px) 100vw, 34vw"
                  style={{ zIndex: 1 }}
                />
              </motion.div>

              {/* Top shine */}
              <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: 'linear-gradient(175deg,rgba(255,255,255,0.16) 0%,transparent 40%)' }} />

              {/* Bottom name overlay */}
              <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
                zIndex: 3,
                background: 'linear-gradient(to top,rgba(55,46,8,0.62) 0%,transparent 100%)',
                padding: '44px 22px 18px',
              }}>
                <p className='font-bold text-lg' style={{ fontFamily: 'monospace', letterSpacing: '0.45em', color: 'rgba(255,248,190,0.55)', textTransform: 'uppercase', marginBottom: 3 }}>birthday girl</p>
                <p className='font-medium text-xl' style={{ color: 'rgba(255,252,215,0.96)' }}>Ritika (Khushi)</p>
              </div>
            </div>

            {/* ── Floating card — bottom left ── */}
            <motion.div
              className="absolute rounded-xl"
              style={{
                bottom: '6%', left: '-14%',
                padding: '10px 16px',
                background: 'rgba(255,253,235,0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(132,123,26,0.14)',
                boxShadow: '0 8px 32px rgba(132,123,26,0.1)',
                zIndex: 10,
              }}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={rightInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.85, type: 'spring', stiffness: 160, damping: 16 }}
            >


            </motion.div>

            {/* ── Vertical label — right side ── */}
            <motion.div
              className="absolute hidden lg:flex flex-col items-center gap-2"
              style={{ right: '-36px', top: '22%', zIndex: 5 }}
              initial={{ opacity: 0 }}
              animate={rightInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.05 }}
            >
              <div style={{ width: 1, height: 44, background: 'rgba(132,123,26,0.18)' }} />
              <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.4em', color: 'rgba(132,123,26,0.35)', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>Portrait</span>
              <div style={{ width: 1, height: 44, background: 'rgba(132,123,26,0.18)' }} />
            </motion.div>

            {/* ── Star ornament — top right of portrait ── */}
            <motion.div
              className="absolute"
              style={{ top: '-18px', right: '-10px', zIndex: 5 }}
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={rightInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1, type: 'spring', stiffness: 200 }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 2 L15.5 12 L26 14 L15.5 16 L14 26 L12.5 16 L2 14 L12.5 12 Z" fill="rgba(132,123,26,0.55)" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════
          BOTTOM TAGLINE STRIP
      ═══════════════════════════════════ */}
      <motion.div
        ref={bottomRef}
        className="relative z-10 w-full flex items-center justify-center py-4 overflow-hidden"
        style={{ borderTop: '1px solid rgba(132,123,26,0.09)' }}
        initial={{ opacity: 0 }}
        animate={bottomInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-5 flex-wrap justify-center">
          {['Bubbly', 'Honest', 'Genuine', 'Unforgettable', 'One of a Kind'].map((word, i, arr) => (
            <React.Fragment key={word}>
              <span style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(132,123,26,0.5)' }}>{word}</span>
              {i < arr.length - 1 && <Diamond size={3} opacity={0.2} />}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════
          SCALLOPED ARCH SEPARATOR
          Echoes the portrait arch motif.
      ═══════════════════════════════════ */}
      <div className="relative w-full pointer-events-none" style={{ height: 70, zIndex: 5, marginBottom: -1 }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="w-full h-full">
          <path
            d={`M0 70 ${Array.from({ length: 9 }, (_, i) => {
              const x1 = i * 160, x2 = (i + 0.5) * 160, x3 = (i + 1) * 160;
              return `C ${x1 + 80} 22, ${x2} 22, ${x3} 70`;
            }).join(' ')} L1440 70 L0 70 Z`}
            fill="rgba(132,123,26,0.055)"
          />
          <path
            d={`M0 70 ${Array.from({ length: 9 }, (_, i) => {
              const x1 = i * 160, x2 = (i + 0.5) * 160, x3 = (i + 1) * 160;
              return `C ${x1 + 80} 32, ${x2} 32, ${x3} 70`;
            }).join(' ')} L1440 70 L0 70 Z`}
            fill="#fefae0"
          />
        </svg>
      </div>
    </div>
  );
}