'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import SnowflakeCursor from '@/components/AllCursors/SnowFlakeCursor';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from 'motion/react';
import { useMusicStore } from '@/context/MusicContext';

gsap.registerPlugin(ScrollTrigger);

const C = {
  gold: '#847B1A',
  goldDeep: '#5a5010',
  goldLight: 'rgba(132,123,26,0.18)',
  goldMid: 'rgba(132,123,26,0.38)',
  goldSoft: 'rgba(132,123,26,0.55)',
  goldText: '#4e4a0e',
  bg: '#fefae0',
  bgAlt: 'rgba(248, 240, 200, 0.4)', // Made slightly transparent to show background animations
  card: 'rgba(255,254,242,0.9)',
};

const MEET_US_IMAGES = [
  'https://res.cloudinary.com/dtslaveid/image/upload/v1780515383/ChatGPT_Image_Jun_3_2026_05_42_51_PM_zd154a.png',
  'https://res.cloudinary.com/dtslaveid/image/upload/v1780515073/ChatGPT_Image_Jun_4_2026_12_39_54_AM_cfreb3.png',
  'https://res.cloudinary.com/dtslaveid/image/upload/v1780515483/ChatGPT_Image_Jun_4_2026_12_35_41_AM_f2lrps.png',
];

// ─── Diamond ──────────────────────────────────────────────────────────────────
function Diamond({ size = 6, opacity = 0.55, color = C.gold }: { size?: number; opacity?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" style={{ opacity, flexShrink: 0 }}>
      <polygon points="5,0 10,5 5,10 0,5" fill={color} />
    </svg>
  );
}

// ─── Left fixed scroll timeline ───────────────────────────────────────────────
function ScrollTimeline() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const fillHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const dotY = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  const steps = [
    { label: '01', title: 'First Time', pct: 0.12 },
    { label: '02', title: 'Same Energy', pct: 0.5 },
    { label: '03', title: 'Still Going', pct: 0.88 },
  ];

  return (
    <div
      className="fixed top-0 left-0 h-full hidden lg:flex flex-col items-center justify-center pointer-events-none"
      style={{ width: 72, zIndex: 100, paddingTop: 80 }}
    >
      <div className="relative flex flex-col items-center" style={{ height: '70vh' }}>
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{ top: 0, bottom: 0, width: 1.5, background: 'rgba(132,123,26,0.14)' }}
        />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-full origin-top"
          style={{
            top: 0, width: 2,
            height: fillHeight,
            background: `linear-gradient(to bottom, ${C.gold}, rgba(200,185,60,0.9))`,
          }}
        />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: dotY, translateY: '-50%', translateX: '-50%' }}
        >
          <div
            className="rounded-full"
            style={{ width: 8, height: 8, background: C.gold, boxShadow: `0 0 12px 4px rgba(132,123,26,0.45)` }}
          />
        </motion.div>
        {steps.map(({ label, title, pct }) => (
          <div
            key={label}
            className="absolute left-1/2 flex items-center gap-2"
            style={{ top: `${pct * 100}%`, transform: 'translateY(-50%)' }}
          >
            <div style={{ width: 8, height: 1.5, background: C.goldMid, marginLeft: -4 }} />
            <div className="flex flex-col" style={{ marginLeft: 8 }}>
              <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.35em', color: C.goldSoft, textTransform: 'uppercase' }}>{label}</span>
              <span style={{ fontFamily: 'monospace', fontSize: 7, letterSpacing: '0.2em', color: 'rgba(132,123,26,0.38)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Animated Background (Weather / Clouds / Words) ───────────────────────────
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0, backgroundColor: C.bg }}>
      {/* Subtle Ambient Blobs */}
      <div className="absolute top-0 right-0 w-[55vw] h-[55vw] rounded-full blur-[90px]"
        style={{ background: 'radial-gradient(circle,rgba(210,190,60,0.08) 0%,transparent 70%)', transform: 'translate(20%,-20%)' }} />
      <div className="absolute bottom-0 left-0 w-[45vw] h-[45vw] rounded-full blur-[80px]"
        style={{ background: 'radial-gradient(circle,rgba(232,160,80,0.07) 0%,transparent 70%)', transform: 'translate(-20%,20%)' }} />

      {/* Animated SVG Clouds */}
      <motion.svg
        viewBox="0 0 1000 300"
        className="absolute top-[10%] left-[-10%] w-[120vw] opacity-[0.04]"
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M150 200 Q 200 130 280 180 Q 350 120 420 180 Q 500 150 550 200 Z" fill={C.goldDeep} />
        <path d="M650 220 Q 700 160 780 200 Q 850 150 920 200 Z" fill={C.goldDeep} />
      </motion.svg>

      <motion.svg
        viewBox="0 0 1000 300"
        className="absolute bottom-[10%] right-[-10%] w-[120vw] opacity-[0.03]"
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M100 250 Q 180 180 260 250 Q 320 200 400 250 Z" fill={C.goldDeep} />
        <path d="M500 250 Q 580 180 660 250 Q 750 170 820 250 Z" fill={C.goldDeep} />
      </motion.svg>

      {/* Floating Words for Contrast and Relatability */}
      <motion.div
        className="absolute font-serif italic font-bold opacity-[0.03] select-none"
        style={{ color: C.goldDeep, fontSize: '8vw', top: '15%', left: '5%' }}
        animate={{ y: [0, 20, 0], opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        Khushi
      </motion.div>
      <motion.div
        className="absolute font-serif italic font-bold opacity-[0.03] select-none"
        style={{ color: C.goldDeep, fontSize: '10vw', top: '50%', right: '5%' }}
        animate={{ y: [0, -25, 0], opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      >
        Vibe
      </motion.div>
      <motion.div
        className="absolute font-serif italic font-bold opacity-[0.03] select-none"
        style={{ color: C.goldDeep, fontSize: '6vw', bottom: '15%', left: '20%' }}
        animate={{ y: [0, 15, 0], opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      >
        Moments
      </motion.div>
    </div>
  );
}

// ─── Section decorative SVG per section ───────────────────────────────────────
function SectionSVGDeco({ section }: { section: 1 | 2 | 3 }) {
  if (section === 1) return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" className="absolute top-6 right-8 pointer-events-none opacity-[0.12]">
      <circle cx="40" cy="40" r="35" stroke={C.gold} strokeWidth="1.5" />
      <circle cx="80" cy="40" r="35" stroke={C.gold} strokeWidth="1.5" />
      <path d="M60 10 Q80 40 60 70" stroke={C.gold} strokeWidth="1" fill="none" opacity="0.6" />
    </svg>
  );
  if (section === 2) return (
    <svg width="130" height="60" viewBox="0 0 130 60" fill="none" className="absolute top-4 right-6 pointer-events-none opacity-[0.12]">
      <path d="M10 30 C25 5, 55 5, 65 30 C75 55, 105 55, 120 30" stroke={C.gold} strokeWidth="1.5" fill="none" />
      <path d="M10 30 C25 55, 55 55, 65 30 C75 5, 105 5, 120 30" stroke={C.gold} strokeWidth="1.5" fill="none" />
    </svg>
  );
  return (
    <svg width="110" height="70" viewBox="0 0 110 70" fill="none" className="absolute top-6 right-6 pointer-events-none opacity-[0.12]">
      <path d="M5 35 C30 10, 50 60, 75 35 C95 15, 105 50, 105 35" stroke={C.gold} strokeWidth="1.5" fill="none" />
      <circle cx="5" cy="35" r="3" fill={C.gold} opacity="0.5" />
      <circle cx="105" cy="35" r="3" fill={C.gold} opacity="0.5" />
    </svg>
  );
}

// ─── Message card ─────────────────────────────────────────────────────────────
function MessageCard({
  heading, quote, body, tags, inView, delay = 0, bypass = false,
}: {
  heading: string; quote: string; body: string;
  tags?: { label: string; value: string }[];
  inView: boolean; delay?: number; bypass?: boolean;
}) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden "
      style={{
        background: C.card,
        backdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(132,123,26,0.22)',
        boxShadow: '0 20px 60px rgba(78,74,14,0.1), 0 4px 12px rgba(132,123,26,0.06), inset 0 1px 2px rgba(255,255,255,0.95)',
      }}
      initial={bypass ? false : { opacity: 0, y: 48 }}
      animate={bypass ? false : (inView ? { opacity: 1, y: 0 } : {})}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        style={{ height: 3, background: `linear-gradient(to right,rgba(132,123,26,0.3),${C.gold},rgba(132,123,26,0.3))`, transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        animate={(bypass || inView) ? { scaleX: 1 } : {}}
        transition={{ duration: 1.0, delay: bypass ? 0.3 : delay + 0.1 }}
      />

      <div className="p-8 lg:p-10 relative">
        {([['top-3 left-3', 'M0 22 L0 0 L22 0'], ['top-3 right-3', 'M22 22 L22 0 L0 0'],
        ['bottom-3 left-3', 'M0 0 L0 22 L22 22'], ['bottom-3 right-3', 'M22 0 L22 22 L0 22']] as [string, string][])
          .map(([pos, d]) => (
            <div key={pos} className={`absolute ${pos} pointer-events-none font-ohmynotes`} style={{ opacity: 0.22 }}>
              <svg width="22" height="22" viewBox="0 0 22 22">
                <path d={d} fill="none" stroke={C.gold} strokeWidth="1.4" />
              </svg>
            </div>
          ))}

        <SectionSVGDeco section={heading.includes('First') ? 1 : heading.includes('Course') ? 2 : 3} />

        <motion.div
          className="flex items-start gap-3 mb-6 pb-5"
          style={{ borderBottom: '1.5px dashed rgba(132,123,26,0.16)' }}
          initial={bypass ? false : { opacity: 0, x: -14 }}
          animate={bypass ? false : (inView ? { opacity: 1, x: 0 } : {})}
          transition={{ duration: 0.6, delay: bypass ? 0.4 : delay + 0.2 }}
        >
          <div style={{ width: 3, minHeight: 42, borderRadius: 3, background: `linear-gradient(to bottom,${C.gold},rgba(132,123,26,0.1))`, flexShrink: 0 }} />
          <p style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(0.92rem,1.4vw,1.1rem)', fontStyle: 'italic', color: C.goldText, lineHeight: 1.72 }}>
            &ldquo;{quote}&rdquo;
          </p>
        </motion.div>

        <motion.h2
          className='font-lirrier'
          style={{ fontSize: 'clamp(1.7rem,3vw,2.4rem)', fontWeight: 400, color: C.goldText, lineHeight: 1.2, marginBottom: 18 }}
          initial={bypass ? false : { y: 22, opacity: 0 }}
          animate={bypass ? false : (inView ? { y: 0, opacity: 1 } : {})}
          transition={{ duration: 0.7, delay: bypass ? 0.5 : delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {heading}
        </motion.h2>

        <motion.p
          className='font-ohmynotes  text-xl'
          style={{ color: 'rgba(48,44,18,0.82)', lineHeight: 2.15 }}
          initial={bypass ? false : { opacity: 0 }}
          animate={bypass ? false : (inView ? { opacity: 1 } : {})}
          transition={{ duration: 0.7, delay: bypass ? 0.6 : delay + 0.44 }}
        >
          {body}
        </motion.p>

        {tags && (
          <motion.div
            className="flex flex-wrap gap-3 mt-7 pt-6"
            style={{ borderTop: '1.5px solid rgba(132,123,26,0.13)' }}
            initial={bypass ? false : { opacity: 0, y: 10 }}
            animate={bypass ? false : (inView ? { opacity: 1, y: 0 } : {})}
            transition={{ duration: 0.55, delay: bypass ? 0.7 : delay + 0.55 }}
          >
            {tags.map(({ label, value }) => (
              <div key={label}
                className="px-4 py-2 rounded-xl"
                style={{ background: 'rgba(132,123,26,0.05)', border: '1px solid rgba(132,123,26,0.14)' }}
              >
                <p style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.goldSoft, marginBottom: 2 }}>{label}</p>
                <p style={{ fontFamily: 'Georgia,serif', fontSize: '0.88rem', color: C.goldText, fontWeight: 600 }}>{value}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <motion.div
        style={{ height: 1, background: 'linear-gradient(to right,transparent,rgba(132,123,26,0.18),transparent)', transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        animate={(bypass || inView) ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: bypass ? 0.8 : delay + 0.5 }}
      />
    </motion.div>
  );
}

// ─── Image frame with parallax ────────────────────────────────────────────────
function ImageFrame({
  inView, delay = 0, flowerSide = 'right', sectionNum, imageSrc, bypass = false,
}: {
  inView: boolean; delay?: number; flowerSide?: 'left' | 'right';
  sectionNum: 1 | 2 | 3; imageSrc: string; bypass?: boolean;
}) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ['start end', 'end start'],
  });
  const smoothY = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
  const imgY = useTransform(smoothY, [0, 1], ['8%', '-8%']);

  return (
    <motion.div
      className="relative w-full flex justify-center py-8"
      initial={bypass ? false : { opacity: 0, scale: 0.93 }}
      animate={bypass ? false : (inView ? { opacity: 1, scale: 1 } : {})}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute pointer-events-none" style={{
        inset: -4,
        borderRadius: 26,
        border: '1.5px solid rgba(132,123,26,0.28)',
        zIndex: 0,
        boxShadow: '0 0 0 1px rgba(132,123,26,0.06)',
      }} />
      <div className="absolute pointer-events-none" style={{
        inset: -14,
        borderRadius: 32,
        border: '1px dashed rgba(132,123,26,0.16)',
        zIndex: 0,
      }} />

      <motion.div
        ref={parallaxRef}
        className="relative overflow-hidden group"
        style={{
          width: '100%',
          maxWidth: 430,
          aspectRatio: '4/5',
          borderRadius: 22,
          border: '2.5px solid rgba(132,123,26,0.45)',
          boxShadow: '0 32px 72px rgba(60,50,10,0.28), 0 8px 24px rgba(132,123,26,0.18), inset 0 1px 2px rgba(255,255,255,0.2)',
          zIndex: 1,
          background: '#f0e4a0',
        }}
        whileHover={{ scale: 1.025, boxShadow: '0 40px 90px rgba(60,50,10,0.34)' }}
        transition={{ duration: 0.45 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: imgY, scale: 1.12 }}
        >
          <Image
            src={imageSrc}
            fill
            sizes="(max-width: 768px) 100vw, 430px"
            className="object-cover object-top"
            alt={`Section ${sectionNum}`}
            priority={sectionNum === 1}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 2 }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />

        <div className="absolute inset-0 pointer-events-none" style={{
          zIndex: 3,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          backgroundSize: '200px',
          opacity: 0.35,
        }} />

        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4, background: 'linear-gradient(148deg,rgba(255,255,255,0.18) 0%,transparent 45%)' }} />

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
          zIndex: 5,
          background: 'linear-gradient(to top,rgba(40,35,8,0.72) 0%,transparent 100%)',
          padding: '48px 20px 18px',
        }}>
          <p className='font-bold text-lg' style={{ fontFamily: 'monospace', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,248,190,0.7)', marginBottom: 3 }}>
            {['NATURE GIRL', 'HER ENERGY', 'STILL GOING'][sectionNum - 1]}
          </p>
          <p className='font-bold text-lg' style={{ fontFamily: 'Georgia,serif', color: 'rgba(255,252,215,0.95)', fontWeight: 400 }}>Ritika (Khushi)</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10px',
          [flowerSide === 'right' ? 'right' : 'left']: '-16px',
          zIndex: 12,
        }}
        initial={{ opacity: 0, scale: 0.6, rotate: flowerSide === 'right' ? 18 : -18 }}
        animate={(bypass || inView) ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.9, delay: bypass ? 0.7 : delay + 0.7, type: 'spring', stiffness: 120 }}
      >
        <div
          className="w-36 h-36 bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage: `url('/flowers/${flowerSide === 'right' ? 'simple1' : 'simple2'}.png')`,
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.14))',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Section background blob ──────────────────────────────────────────────────
function SectionBlob({ section }: { section: 1 | 2 | 3 }) {
  const configs = [
    { top: '-12%', right: '-8%', w: 480, color: 'rgba(210,190,60,0.07)' },
    { top: '20%', left: '-6%', w: 420, color: 'rgba(232,160,80,0.065)' },
    { top: '-10%', right: '-5%', w: 460, color: 'rgba(200,185,60,0.07)' },
  ];
  const c = configs[section - 1];
  return (
    <div className="absolute pointer-events-none" style={{
      ...c, width: c.w, height: c.w, borderRadius: '50%',
      background: `radial-gradient(circle,${c.color} 0%,transparent 70%)`,
      filter: 'blur(56px)', zIndex: 0,
    }} />
  );
}

// ─── Wave separator ───────────────────────────────────────────────────────────
function WaveSep({ flip = false }: { flip?: boolean }) {
  // Translucent background to let the animated words & clouds show through
  const topBg = flip ? C.bgAlt : 'transparent';
  const btmBg = flip ? 'transparent' : C.bgAlt;

  return (
    <div
      className="w-full pointer-events-none relative"
      style={{ height: 90, marginTop: -2, marginBottom: -2, zIndex: 5 }}
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1440" height="90" fill={topBg} />
        <path
          d="M0,90 L0,60 C180,60 300,4 720,4 C1140,4 1260,60 1440,60 L1440,90 Z"
          fill={btmBg}
        />
        <path
          d="M0,60 C180,60 300,4 720,4 C1140,4 1260,60 1440,60"
          stroke="rgba(132,123,26,0.13)"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
    </div>
  );
}

// ─── Section index ────────────────────────────────────────────────────────────
function SectionIndex({ num, label, inView, bypass = false }: { num: string; label: string; inView: boolean; bypass?: boolean }) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-6"
      initial={bypass ? false : { opacity: 0, x: -10 }}
      animate={bypass ? false : (inView ? { opacity: 1, x: 0 } : {})}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Diamond size={7} opacity={0.45} />
      <span style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.6em', color: C.goldText, textTransform: 'uppercase', fontWeight: 600 }}>
        {num} / {label}
      </span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,rgba(132,123,26,0.2),transparent)` }} />
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
export default function MeetUs() {
  const { preloaderFinished } = useMusicStore();

  const s1Ref = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const s3Ref = useRef<HTMLDivElement>(null);

  const s1InView = useInView(s1Ref, { once: true, amount: 0.15 });
  const s2InView = useInView(s2Ref, { once: true, amount: 0.15 });
  const s3InView = useInView(s3Ref, { once: true, amount: 0.15 });

  useGSAP(() => {
    if (!preloaderFinished) return;
    const tl = gsap.timeline({ delay: 0.5 });
    tl.from('.s1-idx', { x: -28, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from('.s1-card', { y: 50, opacity: 0, duration: 1.0, ease: 'power4.out' }, '-=0.5')
      .from('.s1-frame', { scale: 0.94, y: 30, opacity: 0, duration: 1.0, ease: 'power4.out' }, '-=0.7');
  }, { scope: s1Ref, dependencies: [preloaderFinished] });

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden">
      {/* Newly Added Animated Background replacing the static one */}
      <AnimatedBackground />

      <SnowflakeCursor />
      <ScrollTimeline />

      <div className="relative" style={{ zIndex: 10, paddingTop: 100 }}>

        {/* ══ SECTION 1 ══════════════════════════════════════ */}
        <section
          ref={s1Ref}
          className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-transparent"
        >
          <SectionBlob section={1} />
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle,rgba(132,123,26,0.045) 1px,transparent 1px)`,
            backgroundSize: '32px 32px', opacity: 0.6,
          }} />

          <div className="relative z-10 w-full flex flex-col lg:flex-row items-center gap-14 px-20 xl:px-32 py-16">
            <div className="w-full lg:w-[54%] s1-card">
              <div className="s1-idx"><SectionIndex num="01" label="The First Time" inView={s1InView} bypass /></div>
              <MessageCard
                heading="The First Time"
                quote="One Google Meet was all it took — this person is genuinely one of mine."
                body="Honestly, it started as just a college project — a task, a group, nothing more. Then came a Google Meet where we talked about actual things — our college journeys, the pressure of placements, what life after graduation even looks like. That was the first moment it felt like, oh, this person actually listens. No trying to impress anyone, no scripted replies — just two people on a screen having a real conversation that neither of us planned for. That day was genuinely good."
                tags={[{ label: 'Moment', value: 'Google Meet' }, { label: 'Feeling', value: 'Comfortable' }, { label: 'Vibe', value: 'Real · Open' }]}
                inView={s1InView} bypass
              />
            </div>
            <div className="w-full lg:w-[46%] s1-frame">
              <ImageFrame inView={s1InView} flowerSide="right" sectionNum={1} imageSrc={MEET_US_IMAGES[0]} bypass />
            </div>
          </div>
        </section>

        <WaveSep />

        {/* ══ SECTION 2 ══════════════════════════════════════ */}
        <section
          ref={s2Ref}
          className="relative w-full min-h-[90vh] flex items-center overflow-hidden"
          style={{ background: C.bgAlt }}
        >
          <SectionBlob section={2} />
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(132,123,26,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(132,123,26,0.04) 1px,transparent 1px)`,
            backgroundSize: '40px 40px', opacity: 0.5,
          }} />

          <div className="relative z-10 w-full flex flex-col lg:flex-row-reverse items-center gap-14 px-20 xl:px-32 py-16">
            <div className="w-full lg:w-[54%]">
              <SectionIndex num="02" label="Different Course" inView={s2InView} />
              <MessageCard
                heading="Different Course, Same Energy"
                quote="She never once made the BCA vs B.Tech difference feel like a thing."
                body="She is in B.Tech, I am in BCA — on paper, our circles were never supposed to overlap. But she never made that feel like a gap. Whenever I shared something I built or worked on, her appreciation was real — not the polite kind where someone nods and moves on. She actually engages, asks questions, stays interested. She does not just validate you, she genuinely listens. And that one thing matters more than most people realize."
                tags={[{ label: 'Course', value: 'B.Tech' }, { label: 'Connection', value: 'Genuine · Deep' }, { label: 'Energy', value: 'Warm · Bright' }]}
                inView={s2InView} delay={0.15}
              />
            </div>
            <div className="w-full lg:w-[46%]">
              <ImageFrame inView={s2InView} delay={0.3} flowerSide="left" sectionNum={2} imageSrc={MEET_US_IMAGES[1]} />
            </div>
          </div>
        </section>

        <WaveSep flip />

        {/* ══ SECTION 3 ══════════════════════════════════════ */}
        <section
          ref={s3Ref}
          className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-transparent"
        >
          <SectionBlob section={3} />
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle,rgba(132,123,26,0.045) 1px,transparent 1px)`,
            backgroundSize: '32px 32px', opacity: 0.6,
          }} />

          <div className="relative z-10 w-full flex flex-col lg:flex-row items-center gap-14 px-20 xl:px-32 py-16">
            <div className="w-full lg:w-[54%]">
              <SectionIndex num="03" label="Still Going" inView={s3InView} />
              <MessageCard
                heading="And It's Still Going.."
                quote="The deal stands — whoever gets there first brings the other along."
                body="We do not talk every day — but when we do, those conversations actually count. College updates, placement news, the occasional random thought sent out of nowhere — and that deal we made, that whoever gets into a company first will help the other one get in too. That was not a grand gesture. It was just a simple, honest agreement. That kind of friendship is rare — no drama attached, just a quiet understanding that says, I am here. And that is enough."
                tags={[{ label: 'Bond', value: 'Real · Rare' }, { label: 'Promise', value: 'Placement Deal' }, { label: 'Status', value: 'Still Going' }]}
                inView={s3InView} delay={0.15}
              />
            </div>
            <div className="w-full lg:w-[46%]">
              <ImageFrame inView={s3InView} delay={0.3} flowerSide="right" sectionNum={3} imageSrc={MEET_US_IMAGES[2]} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full flex flex-col items-center py-14 gap-4 bg-transparent">
          <div className="flex items-center gap-3">
            {[4, 5, 7, 5, 4].map((s, i) => <Diamond key={i} size={s} opacity={i === 2 ? 0.6 : 0.3} />)}
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.6em', textTransform: 'uppercase', color: C.goldText, opacity: 0.45 }}>
            A friendship worth keeping
          </p>
        </footer>
      </div>
    </div>
  );
}