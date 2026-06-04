'use client';

import React, { useEffect, useRef } from 'react';
import SnowflakeCursor from '@/components/AllCursors/SnowFlakeCursor';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

// ─── Enhanced Color Tokens ──────────────────────────────────────────────────
const C = {
  gold: '#847B1A',
  goldLight: 'rgba(132,123,26,0.18)',
  goldMid: 'rgba(132,123,26,0.35)',
  goldSoft: 'rgba(132,123,26,0.55)',
  goldText: '#4e4a0e',
  bg: '#fefae0',
  bgSecondary: '#fdf4cc',
  cardBg: 'rgba(255,254,242,0.88)',
  pinkFloral: '#e8a0b0',
};

const MEET_US_IMAGES = [
  'https://res.cloudinary.com/dtslaveid/image/upload/v1780515383/ChatGPT_Image_Jun_3_2026_05_42_51_PM_zd154a.png',
  'https://res.cloudinary.com/dtslaveid/image/upload/v1780515073/ChatGPT_Image_Jun_4_2026_12_39_54_AM_cfreb3.png',
  'https://res.cloudinary.com/dtslaveid/image/upload/v1780515483/ChatGPT_Image_Jun_4_2026_12_35_41_AM_f2lrps.png',
];

// ─── Diamond Ornament ────────────────────────────────────────────────────────
function Diamond({ size = 6, opacity = 0.55 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" style={{ opacity, flexShrink: 0 }}>
      <polygon points="5,0 10,5 5,10 0,5" fill={C.gold} />
    </svg>
  );
}

// ─── Seamless Wavy / Cloudy Separator ────────────────────────────────────────
function WavySeparator({ flip = false, fillBg = C.bg }) {
  return (
    <div className={`w-full relative z-20 pointer-events-none ${flip ? '-mt-1' : '-mb-1'}`} style={{ transform: flip ? 'rotate(180deg)' : 'none' }}>
      <svg viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
        <path
          d="M0,0 C240,40 480,74 720,74 C960,74 1200,40 1440,0 L1440,74 L0,74 Z"
          fill={fillBg}
        />
        <path
          d="M0,0 C240,40 480,74 720,74 C960,74 1200,40 1440,0"
          stroke="rgba(132,123,26,0.15)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

// ─── Section Index Label ──────────────────────────────────────────────────────
function SectionIndex({ num, label, inView, bypassAnimation = false }: { num: string; label: string; inView: boolean; bypassAnimation?: boolean }) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-6 s1-anim-index"
      initial={bypassAnimation ? false : { opacity: 0, x: -10 }}
      animate={bypassAnimation ? false : (inView ? { opacity: 1, x: 0 } : {})}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Diamond size={6} opacity={0.4} />
      <span style={{
        fontSize: 11,
        fontFamily: 'monospace',
        letterSpacing: '0.6em',
        color: C.goldText,
        textTransform: 'uppercase',
        fontWeight: 600
      }}>
        {num} / {label}
      </span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${C.goldLight}, transparent)` }} />
    </motion.div>
  );
}

// ─── Creative Modern Message Card ────────────────────────────────────────────
function MessageCard({
  heading, quote, body, tags, inView, delay = 0, bypassAnimation = false,
}: {
  heading: string;
  quote: string;
  body: string;
  tags?: { label: string; value: string }[];
  inView: boolean;
  delay?: number;
  bypassAnimation?: boolean;
}) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden s1-anim-card"
      style={{
        background: C.cardBg,
        backdropFilter: 'blur(24px)',
        border: `1.5px solid rgba(132,123,26,0.24)`,
        boxShadow: `0 30px 70px rgba(78,74,14,0.07), inset 0 1px 2px rgba(255,255,255,0.95)`,
      }}
      initial={bypassAnimation ? false : { opacity: 0, y: 50 }}
      animate={bypassAnimation ? false : (inView ? { opacity: 1, y: 0 } : {})}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        style={{
          height: 3,
          background: `linear-gradient(to right, rgba(132,123,26,0.2), ${C.gold}, rgba(132,123,26,0.2))`,
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 0 }}
        animate={(bypassAnimation || inView) ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: bypassAnimation ? 0.4 : delay + 0.1 }}
      />

      <div className="p-8 lg:p-12 relative">
        {/* Corner Brackets */}
        {([
          ['top-4 left-4', 'M0 24 L0 0 L24 0'],
          ['top-4 right-4', 'M24 24 L24 0 L0 0'],
          ['bottom-4 left-4', 'M0 0 L0 24 L24 24'],
          ['bottom-4 right-4', 'M24 0 L24 24 L0 24'],
        ] as [string, string][]).map(([pos, d]) => (
          <div key={pos} className={`absolute ${pos} pointer-events-none`} style={{ opacity: 0.25 }}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d={d} fill="none" stroke={C.gold} strokeWidth="1.5" />
            </svg>
          </div>
        ))}

        {/* Quote Block with Higher Definition */}
        <motion.div
          className="flex items-start gap-4 mb-6 pb-6"
          style={{ borderBottom: `1.5px dashed rgba(132,123,26,0.18)` }}
          initial={bypassAnimation ? false : { opacity: 0, x: -15 }}
          animate={bypassAnimation ? false : (inView ? { opacity: 1, x: 0 } : {})}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
        >
          <div style={{ width: 3, minHeight: 44, borderRadius: 3, background: `linear-gradient(to bottom, ${C.gold}, rgba(132,123,26,0.1))`, flexShrink: 0 }} />
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
            fontStyle: 'italic',
            color: C.goldText,
            lineHeight: 1.7,
          }}>
            &ldquo;{quote}&rdquo;
          </p>
        </motion.div>

        {/* Heading */}
        <motion.h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
            fontWeight: 400,
            color: C.goldText,
            lineHeight: 1.2,
            marginBottom: 20,
          }}
          initial={bypassAnimation ? false : { y: 20, opacity: 0 }}
          animate={bypassAnimation ? false : (inView ? { y: 0, opacity: 1 } : {})}
          transition={{ duration: 0.7, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {heading}
        </motion.h2>

        {/* Body Typography */}
        <motion.p
          style={{
            fontFamily: 'monospace',
            fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)',
            color: 'rgba(48,44,18,0.85)',
            lineHeight: 2.2,
          }}
          initial={bypassAnimation ? false : { opacity: 0 }}
          animate={bypassAnimation ? false : (inView ? { opacity: 1 } : {})}
          transition={{ duration: 0.7, delay: delay + 0.45 }}
        >
          {body}
        </motion.p>

        {/* Connected Metric Tags */}
        {tags && (
          <motion.div
            className="flex flex-wrap items-center gap-6 mt-8 pt-6"
            style={{ borderTop: `1.5px solid rgba(132,123,26,0.15)` }}
            initial={bypassAnimation ? false : { opacity: 0, y: 10 }}
            animate={bypassAnimation ? false : (inView ? { opacity: 1, y: 0 } : {})}
            transition={{ duration: 0.6, delay: delay + 0.55 }}
          >
            {tags.map(({ label, value }) => (
              <div key={label} className="bg-[rgba(132,123,26,0.04)] px-4 py-2 rounded-xl border border-[rgba(132,123,26,0.1)]">
                <p style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.goldSoft, marginBottom: 2 }}>
                  {label}
                </p>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', color: C.goldText, fontWeight: 600 }}>
                  {value}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Premium Framed Image with Integrated Angle Flowers ──────────────────────
function ImageFrame({
  inView,
  delay = 0,
  flowerSide = 'right',
  sectionNum,
  imageSrc,
  bypassAnimation = false,
}: {
  inView: boolean;
  delay?: number;
  flowerSide?: 'left' | 'right';
  sectionNum: 1 | 2 | 3;
  imageSrc?: string;
  bypassAnimation?: boolean;
}) {
  const gradients = [
    'linear-gradient(148deg,#fefae0 0%,#f5e8a0 38%,#e8c97e 100%)',
    'linear-gradient(135deg,#fdf6d8 0%,#f0dfa0 40%,#dfc86a 100%)',
    'linear-gradient(160deg,#fdf4d0 0%,#eee0a8 45%,#d8b86e 100%)',
  ];

  return (
    <motion.div
      className="relative w-full flex justify-center py-6 s1-anim-frame"
      initial={bypassAnimation ? false : { opacity: 0, scale: 0.95 }}
      animate={bypassAnimation ? false : (inView ? { opacity: 1, scale: 1 } : {})}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Structural Framing Grids */}
      <div className="absolute pointer-events-none" style={{ inset: 0, borderRadius: 24, border: `1.5px dashed rgba(132,123,26,0.22)`, zIndex: 0 }} />
      <div className="absolute pointer-events-none" style={{ inset: 8, borderRadius: 20, border: `1px solid rgba(132,123,26,0.15)`, zIndex: 0 }} />

      {/* Main Container */}
      <motion.div
        className="relative overflow-hidden w-full group"
        style={{
          maxWidth: 440,
          aspectRatio: '4/5',
          borderRadius: 20,
          border: `2px solid rgba(132,123,26,0.32)`,
          boxShadow: `0 35px 75px rgba(80,65,15,0.22), 0 10px 25px rgba(132,123,26,0.12)`,
          background: gradients[sectionNum - 1],
          zIndex: 1,
        }}
        whileHover={{ scale: 1.02, boxShadow: `0 40px 90px rgba(80,65,15,0.28)` }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div className="absolute inset-0" whileHover={{ scale: 1.06 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
          <div className="absolute inset-0" style={{ background: gradients[sectionNum - 1], zIndex: 1 }} />
          {imageSrc && (
            <Image
              src={imageSrc}
              fill
              sizes="(max-width: 768px) 100vw, 440px"
              className="object-cover object-top mix-blend-normal"
              style={{ zIndex: 2 }}
              alt={`Ritika Visual Entry ${sectionNum}`}
              priority={sectionNum === 1}
            />
          )}
        </motion.div>

        {/* Ambient Overlay Enhancements */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3, backgroundImage: `radial-gradient(circle, rgba(132,123,26,0.08) 1.2px, transparent 1.2px)`, backgroundSize: '18px 18px' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4, background: 'linear-gradient(140deg, rgba(255,255,255,0.35) 0%, transparent 50%)' }} />

        {/* Meta Text Bottom Ribbon */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10 bg-gradient-to-top from-[rgba(40,38,10,0.75)] to-transparent pointer-events-none">
          <p style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#fefae0', opacity: 0.8, marginBottom: 2 }}>
            {['FIRST MEETING', 'HER ENERGY', 'STILL GOING'][sectionNum - 1]}
          </p>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#ffffff' }}>
            Ritika
          </p>
        </div>
      </motion.div>

      {/* ── Down-Angled Flower Enhancements ── */}
      <motion.div
        className="absolute pointer-events-none s1-anim-flower"
        style={{
          bottom: '-25px',
          [flowerSide === 'right' ? 'right' : 'left']: '-20px',
          zIndex: 12,
        }}
        initial={bypassAnimation ? { opacity: 0, scale: 0.7, rotate: flowerSide === 'right' ? 15 : -15 } : { opacity: 0, scale: 0.7, rotate: flowerSide === 'right' ? 15 : -15 }}
        animate={(bypassAnimation || inView) ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.85, delay: bypassAnimation ? 0.7 : delay + 0.65, type: 'spring' }}
      >
        <div
          className="w-40 h-40 bg-contain bg-no-repeat bg-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
          style={{ backgroundImage: `url('/flowers/${flowerSide === 'right' ? 'simple1' : 'simple2'}.png')` }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Floating Petal Background Element ────────────────────────────────────────
function FloatingPetal({ x, y, size, delay, duration }: { x: number; y: number; size: number; delay: number; duration: number }) {
  return (
    <motion.div className="absolute pointer-events-none" style={{ left: `${x}%`, top: `${y}%`, zIndex: 1 }}
      animate={{
        y: [0, -25, 0, 15, 0],
        x: [0, 10, -5, 12, 0],
        rotate: [0, 25, -15, 30, 0],
        opacity: [0.3, 0.6, 0.35, 0.55, 0.3],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <path d="M10 2 C12 5, 16 6, 16 10 C16 14, 12 16, 10 18 C8 16, 4 14, 4 10 C4 6, 8 5, 10 2Z" fill="rgba(232,160,176,0.45)" />
      </svg>
    </motion.div>
  );
}

// ─── Main Interface Entry Point ──────────────────────────────────────────────
export default function MeetUs() {
  // ==========================================
  //   MANAGE SECTION 1 TIMELINE CONFIG HERE
  // ==========================================
  const S1_TIMELINE_CONFIG = {
    initialDelay: 0.6,       // Seconds before the entrance sequence triggers
    elementDuration: 1.2,    // Animation run speed for core layout pieces
    staggerGap: 0.25,        // Delay stagger spacing between consecutive layers
    ySlideOffset: 45,        // Vertical slide entry tracking distance (pixels)
  };

  const s1Ref = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const s3Ref = useRef<HTMLDivElement>(null);

  const s1InView = useInView(s1Ref, { once: true, amount: 0.15 });
  const s2InView = useInView(s2Ref, { once: true, amount: 0.15 });
  const s3InView = useInView(s3Ref, { once: true, amount: 0.15 });

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.06, duration: 1.2 });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    const rafId = requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  // GSAP Entrance Timeline Strategy for Section 1
  useGSAP(() => {
    const tl = gsap.timeline({
      delay: S1_TIMELINE_CONFIG.initialDelay,
    });

    tl.from('.s1-anim-index', {
      x: -25,
      opacity: 0,
      duration: S1_TIMELINE_CONFIG.elementDuration * 0.7,
      ease: 'power3.out'
    })
    .from('.s1-anim-card', {
      y: S1_TIMELINE_CONFIG.ySlideOffset,
      opacity: 0,
      duration: S1_TIMELINE_CONFIG.elementDuration,
      ease: 'power4.out'
    }, `-=${S1_TIMELINE_CONFIG.elementDuration * 0.5}`)
    .from('.s1-anim-frame', {
      scale: 0.95,
      y: S1_TIMELINE_CONFIG.ySlideOffset * 0.6,
      opacity: 0,
      duration: S1_TIMELINE_CONFIG.elementDuration,
      ease: 'power4.out'
    }, `-=${S1_TIMELINE_CONFIG.elementDuration - S1_TIMELINE_CONFIG.staggerGap}`);
  }, { scope: s1Ref });

  const petals = [
    { x: 6, y: 14, size: 14, delay: 0, duration: 7 },
    { x: 86, y: 10, size: 11, delay: 1.5, duration: 8 },
    { x: 12, y: 52, size: 13, delay: 2.2, duration: 9 },
    { x: 90, y: 48, size: 15, delay: 0.7, duration: 7.5 },
    { x: 8, y: 78, size: 12, delay: 1.8, duration: 8.5 },
  ];

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden" style={{ background: C.bg }}>
      <SnowflakeCursor />

      {/* Decorative Structural Canvas Layers */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[80px]" style={{ background: 'radial-gradient(circle, rgba(132,123,26,0.09) 0%, transparent 75%)' }} />
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[70px]" style={{ background: 'radial-gradient(circle, rgba(232,160,176,0.07) 0%, transparent 75%)' }} />
        <div className="absolute bottom-[5%] right-[2%] w-[450px] h-[450px] rounded-full blur-[60px]" style={{ background: 'radial-gradient(circle, rgba(132,123,26,0.08) 0%, transparent 75%)' }} />
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {petals.map((p, i) => <FloatingPetal key={i} {...p} />)}
      </div>

      {/* ── MAIN CONTENT ACCORDION FLOW ── */}
      <div className="relative w-full space-y-0" style={{ zIndex: 10, paddingTop: '100px' }}>

        {/* SECTION 1: Powered cleanly via GSAP Timelines layout control */}
        <section ref={s1Ref} className="w-full min-h-[85vh] flex items-center px-6 lg:px-16 xl:px-32 pb-20">
          <div className="w-full flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-[54%]">
              <SectionIndex num="01" label="The First Time" inView={s1InView} bypassAnimation={true} />
              <MessageCard
                heading="The First Time"
                quote="One Google Meet was all it took — this person is genuinely one of mine."
                body="Honestly, it started as just a college project — a task, a group, nothing more. Then came a Google Meet where we talked about actual things — our college journeys, the pressure of placements, what life after graduation even looks like. That was the first moment it felt like, oh, this person actually listens. No trying to impress anyone, no scripted replies — just two people on a screen having a real conversation that neither of us planned for. That day was genuinely good."
                tags={[
                  { label: 'Moment', value: 'Google Meet' },
                  { label: 'Feeling', value: 'Comfortable' },
                  { label: 'Vibe', value: 'Real · Open' },
                ]}
                inView={s1InView}
                bypassAnimation={true}
              />
            </div>
            <div className="w-full lg:w-[46%]">
              <ImageFrame inView={s1InView} flowerSide="right" sectionNum={1} imageSrc={MEET_US_IMAGES[0]} bypassAnimation={true} />
            </div>
          </div>
        </section>

        {/* Connected Cloudy Connector to Section 2 */}
        <WavySeparator fillBg={C.bgSecondary} />

        {/* SECTION 2: Alternating Color Depth Canvas */}
        <section ref={s2Ref} className="w-full min-h-[90vh] flex items-center px-6 lg:px-16 xl:px-32 py-20" style={{ background: C.bgSecondary }}>
          <div className="w-full flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="w-full lg:w-[54%]">
              <SectionIndex num="02" label="Different Course" inView={s2InView} />
              <MessageCard
                heading="Different Course, Same Energy"
                quote="She never once made the BCA vs B.Tech difference feel like a thing."
                body="She is in B.Tech, I am in BCA — on paper, our circles were never supposed to overlap. But she never made that feel like a gap. Whenever I shared something I built or worked on, her appreciation was real — not the polite kind where someone nods and moves on. She actually engages, asks questions, stays interested. She does not just validate you, she genuinely listens. And that one thing matters more than most people realize."
                tags={[
                  { label: 'Course', value: 'B.Tech' },
                  { label: 'Connection', value: 'Genuine · Deep' },
                  { label: 'Energy', value: 'Warm · Bright' },
                ]}
                inView={s2InView}
                delay={0.15}
              />
            </div>
            <div className="w-full lg:w-[46%]">
              <ImageFrame inView={s2InView} delay={0.3} flowerSide="left" sectionNum={2} imageSrc={MEET_US_IMAGES[1]} />
            </div>
          </div>
        </section>

        {/* Connected Cloudy Connector to Section 3 */}
        <WavySeparator flip={true} fillBg={C.bgSecondary} />

        {/* SECTION 3: Standard Base Flow Canvas */}
        <section ref={s3Ref} className="w-full min-h-[85vh] flex items-center px-6 lg:px-16 xl:px-32 py-20">
          <div className="w-full flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-[54%]">
              <SectionIndex num="03" label="Still Going" inView={s3InView} />
              <MessageCard
                heading="And It's Still Going.."
                quote="The deal stands — whoever gets there first brings the other along."
                body="We do not talk every day — but when we do, those conversations actually count. College updates, placement news, the occasional random thought sent out of nowhere — and that deal we made, that whoever gets into a company first will help the other one get in too. That was not a grand gesture. It was just a simple, honest agreement. That kind of friendship is rare — no drama attached, just a quiet understanding that says, I am here. And that is enough."
                tags={[
                  { label: 'Bond', value: 'Real · Rare' },
                  { label: 'Promise', value: 'Placement Deal' },
                  { label: 'Status', value: 'Still Going' },
                ]}
                inView={s3InView}
                delay={0.15}
              />
            </div>
            <div className="w-full lg:w-[46%]">
              <ImageFrame inView={s3InView} delay={0.3} flowerSide="right" sectionNum={3} imageSrc={MEET_US_IMAGES[2]} />
            </div>
          </div>
        </section>

        {/* Premium Structural Page Footer Block */}
        <footer className="w-full flex flex-col items-center py-16 gap-4">
          <div className="flex items-center gap-4">
            <div style={{ width: 100, height: 1, background: `linear-gradient(to right, transparent, ${C.goldMid})` }} />
            <Diamond size={5} opacity={0.4} />
            <Diamond size={7} opacity={0.6} />
            <Diamond size={5} opacity={0.4} />
            <div style={{ width: 100, height: 1, background: `linear-gradient(to left, transparent, ${C.goldMid})` }} />
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.6em', textTransform: 'uppercase', color: C.goldText, opacity: 0.5 }}>
            A friendship worth keeping
          </p>
        </footer>
      </div>
    </div>
  );
}