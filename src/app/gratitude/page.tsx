'use client';

import React, { useEffect, useRef } from 'react';
import MagnetLines from '@/components/MagnetLines/MagnetLines';
import SnowflakeCursor from '@/components/AllCursors/SnowFlakeCursor';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion, useInView } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

// ─── Premium Design Tokens ──────────────────────────────────────────────────
const C = {
  gold: '#847B1A',
  goldLight: 'rgba(132,123,26,0.18)',
  goldMid: 'rgba(132,123,26,0.35)',
  goldSoft: 'rgba(132,123,26,0.55)',
  goldText: '#4e4a0e',
  bg: '#fefae0',
  bgSecondary: '#fdf4cc',
  cardBg: 'rgba(255,254,242,0.88)',
};

// ─── Diamond Ornament ────────────────────────────────────────────────────────
function Diamond({ size = 6, opacity = 0.55 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" style={{ opacity, flexShrink: 0 }}>
      <polygon points="5,0 10,5 5,10 0,5" fill={C.gold} />
    </svg>
  );
}

// ─── Seamless Wavy Separator ──────────────────────────────────────────────────
function WavySeparator({ flip = false, fillBg = C.bg }) {
  return (
    <div className={`w-full relative z-20 pointer-events-none ${flip ? '-mt-1' : '-mb-1'}`} style={{ transform: flip ? 'rotate(180deg)' : 'none' }}>
      <svg viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
        <path d="M0,0 C240,40 480,74 720,74 C960,74 1200,40 1440,0 L1440,74 L0,74 Z" fill={fillBg} />
        <path d="M0,0 C240,40 480,74 720,74 C960,74 1200,40 1440,0" stroke="rgba(132,123,26,0.15)" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

// ─── Section Index Label ──────────────────────────────────────────────────────
function SectionIndex({ num, label, inView }: { num: string; label: string; inView: boolean }) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-6"
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
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

// ─── Premium Message Card Container ──────────────────────────────────────────
function MessageCard({
  heading, quote, body, tags, inView, delay = 0,
}: {
  heading: string;
  quote: string;
  body: string;
  tags?: { label: string; value: string }[];
  inView: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden h-full flex flex-col"
      style={{
        background: C.cardBg,
        backdropFilter: 'blur(24px)',
        border: `1.5px solid rgba(132,123,26,0.24)`,
        boxShadow: `0 30px 70px rgba(78,74,14,0.07), inset 0 1px 2px rgba(255,255,255,0.95)`,
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        style={{
          height: 3,
          background: `linear-gradient(to right, rgba(132,123,26,0.2), ${C.gold}, rgba(132,123,26,0.2))`,
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: delay + 0.1 }}
      />

      <div className="p-8 lg:p-12 relative flex-1 flex flex-col justify-between">
        {/* Corner Branding Brackets */}
        {(([
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
        )))}

        <div>
          {/* Quote Block */}
          <motion.div
            className="flex items-start gap-4 mb-6 pb-6"
            style={{ borderBottom: `1.5px dashed rgba(132,123,26,0.18)` }}
            initial={{ opacity: 0, x: -15 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
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
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
            fontWeight: 400,
            color: C.goldText,
            lineHeight: 1.2,
            marginBottom: 20,
          }}>
            {heading}
          </h2>

          {/* Paragraph Body */}
          <p style={{
            fontFamily: 'monospace',
            fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)',
            color: 'rgba(48,44,18,0.85)',
            lineHeight: 2.2,
          }}>
            {body}
          </p>
        </div>

        {/* Metric Tags Layout */}
        {tags && (
          <div className="flex flex-wrap items-center gap-4 mt-8 pt-6" style={{ borderTop: `1.5px solid rgba(132,123,26,0.15)` }}>
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
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── High-End Framed Image Showcase Component ─────────────────────────────────
function ImageFrame({
  inView, delay = 0, flowerSide = 'right', titleLabel, imageSrc,
}: {
  inView: boolean;
  delay?: number;
  flowerSide?: 'left' | 'right';
  titleLabel: string;
  imageSrc: string;
}) {
  return (
    <motion.div
      className="relative w-full flex justify-center py-6 h-full min-h-[420px] lg:min-h-0"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute pointer-events-none" style={{ inset: 0, borderRadius: 24, border: `1.5px dashed rgba(132,123,26,0.22)`, zIndex: 0 }} />
      <div className="absolute pointer-events-none" style={{ inset: 8, borderRadius: 20, border: `1px solid rgba(132,123,26,0.15)`, zIndex: 0 }} />

      <motion.div
        className="relative overflow-hidden w-full h-full group"
        style={{
          borderRadius: 20,
          border: `2px solid rgba(132,123,26,0.32)`,
          boxShadow: `0 35px 75px rgba(80,65,15,0.22), 0 10px 25px rgba(132,123,26,0.12)`,
          background: 'linear-gradient(148deg,#fefae0 0%,#f5e8a0 38%,#e8c97e 100%)',
          zIndex: 1,
        }}
        whileHover={{ scale: 1.02, boxShadow: `0 40px 90px rgba(80,65,15,0.28)` }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div className="absolute inset-0 w-full h-full" whileHover={{ scale: 1.06 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
          <Image
            src={imageSrc}
            fill
            sizes="(max-width: 1024px) 100vw, 500px"
            className="object-cover object-center"
            style={{ zIndex: 2 }}
            alt="Gratitude Snapshot Narrative"
          />
        </motion.div>

        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3, backgroundImage: `radial-gradient(circle, rgba(132,123,26,0.08) 1.2px, transparent 1.2px)`, backgroundSize: '18px 18px' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4, background: 'linear-gradient(140deg, rgba(255,255,255,0.35) 0%, transparent 50%)' }} />

        {/* Ambient Info Strip */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10 bg-gradient-to-t from-[rgba(40,38,10,0.85)] to-transparent pointer-events-none">
          <p style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#fefae0', opacity: 0.8, marginBottom: 2 }}>
            {titleLabel}
          </p>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#ffffff' }}>
            Ritika
          </p>
        </div>
      </motion.div>

      {/* Angle Flower Sprigs */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: '-25px',
          [flowerSide === 'right' ? 'right' : 'left']: '-20px',
          zIndex: 12,
        }}
        initial={{ opacity: 0, scale: 0.7, rotate: flowerSide === 'right' ? 15 : -15 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.85, delay: delay + 0.4, type: 'spring' }}
      >
        <div
          className="w-40 h-40 bg-contain bg-no-repeat bg-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
          style={{ backgroundImage: `url('/flowers/${flowerSide === 'right' ? 'simple1' : 'simple2'}.png')` }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Floating Decorative Canvas Petals ───────────────────────────────────────
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

// ─── Main Interface Container Entry Point ────────────────────────────────────
export default function Gratitude() {
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);

  const page1InView = useInView(page1Ref, { once: true, amount: 0.15 });
  const page2InView = useInView(page2Ref, { once: true, amount: 0.15 });
  const page3InView = useInView(page3Ref, { once: true, amount: 0.15 });

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.06, duration: 1.2 });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    const rafId = requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.layer', { y: 60, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.05 })
      .from('.chars-text', { y: 60, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.05 });
  });

  const backgroundPetals = [
    { x: 6, y: 14, size: 14, delay: 0, duration: 7 },
    { x: 86, y: 10, size: 11, delay: 1.5, duration: 8 },
    { x: 12, y: 52, size: 13, delay: 2.2, duration: 9 },
    { x: 90, y: 48, size: 15, delay: 0.7, duration: 7.5 },
    { x: 8, y: 78, size: 12, delay: 1.8, duration: 8.5 },
  ];

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden" style={{ background: C.bg }}>
      <SnowflakeCursor />

      {/* Background Ambience Shards */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[80px]" style={{ background: 'radial-gradient(circle, rgba(132,123,26,0.09) 0%, transparent 75%)' }} />
        <div className="absolute bottom-[5%] right-[2%] w-[450px] h-[450px] rounded-full blur-[60px]" style={{ background: 'radial-gradient(circle, rgba(132,123,26,0.08) 0%, transparent 75%)' }} />
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {backgroundPetals.map((petal, index) => <FloatingPetal key={index} {...petal} />)}
      </div>

      {/* ── FIRST SECTION: MAGNET LINES HERO (RESTORED EXACTLY) ── */}
      <div className="main h-[82vh] w-full relative flex flex-col justify-center items-center px-4 z-10">
        <div className="text-area z-[20] w-full text-center pointer-events-none select-none">
          <h1 className="text-5xl md:text-7xl font-mono text-[#847B1A] tracking-tight">
            {'Where Do I Even Begin..'.split('').map((char, idx) => (
              <span key={idx} className="chars-text inline-block">{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </h1>
        </div>

        {/* MagnetLines Canvas backdrop wrapper */}
        <div className="layer absolute inset-0 z-[10] w-[90%] max-w-7xl h-1/2 m-auto flex gap-10 md:gap-20 opacity-40 pointer-events-none">
          <div className="left w-1/2 h-full"><MagnetLines /></div>
          <div className="left w-1/2 h-full"><MagnetLines /></div>
        </div>
      </div>

      <div className="line bg-[#847B1A] w-[90%] max-w-7xl h-[1.5px] mx-auto opacity-30" />

      {/* ── ACCORDION FLOW LAYOUT ONWARDS ── */}
      <div className="relative w-full space-y-0 z-10 mt-12">

        {/* PAGE 1 */}
        <section ref={page1Ref} className="w-full min-h-[85vh] flex items-center px-6 lg:px-16 xl:px-24 pb-20">
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-10 xl:gap-14">
            <div className="w-full lg:w-[62%] flex flex-col justify-between">
              <div>
                <SectionIndex num="01" label="The Spark" inView={page1InView} />
                <MessageCard
                  heading="It Began With a Project"
                  quote="In between the project talk, we shared things — our college journeys, the honest fear around placements."
                  body="It all started with a completely ordinary college project — the kind where you expect nothing memorable to come out of it. Then there was a Google Meet, and something shifted 😅. In between the project talk, we shared things — our college journeys, the honest fear around placements, what we were each working toward. That conversation was not forced. It was natural, open, and real in a way that most conversations in college never are 🌱. I did not know then that this small call would end up being the start of a friendship I would actually want to hold on to 🫶."
                  tags={[
                    { label: 'Origin', value: 'College Project' },
                    { label: 'Moment', value: 'Google Meet' },
                    { label: 'Vibe', value: 'Real · Natural' }
                  ]}
                  inView={page1InView}
                />
              </div>
            </div>
            <div className="w-full lg:w-[38%]">
              <ImageFrame inView={page1InView} flowerSide="right" titleLabel="FIRST MILESTONE" imageSrc="/ScrenShot/BirthdayWish.jpg" />
            </div>
          </div>
        </section>

        {/* Wavy Interlocking Separator */}
        <WavySeparator fillBg={C.bgSecondary} />

        {/* PAGE 2 */}
        <section ref={page2Ref} className="w-full min-h-[90vh] flex items-center px-6 lg:px-16 xl:px-24 py-20" style={{ background: C.bgSecondary }}>
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-stretch gap-10 xl:gap-14">
            <div className="w-full lg:w-[62%] flex flex-col justify-between">
              <div>
                <SectionIndex num="02" label="Unfiltered Connection" inView={page2InView} />
                <MessageCard
                  heading="And Then There Is This"
                  quote="She is the kind of person you can be completely unfiltered with, and it still feels comfortable 😂."
                  body="Talking to Ritika never requires measuring your words — she is the kind of person you can be completely unfiltered with, and it still feels comfortable 😂. She has this child-like energy about her — genuinely innocent in one moment, completely unbothered and bold in the next. She will send something funny out of nowhere, share a placement update, or just casually ask how things are going. What stands out is that she does not judge — she listens and then actually says something useful 🌿. When someone makes it that easy to just be yourself, you do not want to let go of that 🫶."
                  tags={[
                    { label: 'Energy', value: 'Bold & Child-like' },
                    { label: 'Traits', value: 'Non-Judgmental' },
                    { label: 'Comfort', value: '100% Unfiltered' }
                  ]}
                  inView={page2InView}
                  delay={0.1}
                />
              </div>
            </div>
            <div className="w-full lg:w-[38%]">
              <ImageFrame inView={page2InView} flowerSide="left" titleLabel="HER ENERGY" imageSrc="/ScrenShot/Chulbuli.jpg" delay={0.2} />
            </div>
          </div>
        </section>

        {/* Inverted Wavy Separator */}
        <WavySeparator flip={true} fillBg={C.bgSecondary} />

        {/* PAGE 3 */}
        <section ref={page3Ref} className="w-full min-h-[85vh] flex items-center px-6 lg:px-16 xl:px-24 py-20">
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-10 xl:gap-14">
            <div className="w-full lg:w-[62%] flex flex-col justify-between">
              <div>
                <SectionIndex num="03" label="Built Different" inView={page3InView} />
                <MessageCard
                  heading="Some People Are Just Built Different"
                  quote="When someone shows up who genuinely listens, guides you without any expectation... that presence carries real weight."
                  body="College takes a lot of friendships away — connections that started strong and then faded without any warning or reason 📉. So when someone shows up who genuinely listens, who actually appreciates your work, who guides you without any expectation in return — that presence carries real weight. This small site is an expression of exactly that feeling — the quiet appreciation for someone who made college feel a little less lonely, and a little more worth it 🌱."
                  tags={[
                    { label: 'Bond', value: 'Rare Consistency' },
                    { label: 'Impact', value: 'Quiet Appreciation' },
                    { label: 'Status', value: 'Still Going Strong' }
                  ]}
                  inView={page3InView}
                  delay={0.1}
                />
              </div>
            </div>
            <div className="w-full lg:w-[38%]">
              <ImageFrame inView={page3InView} flowerSide="right" titleLabel="WHATSAPP ARCHIVE" imageSrc="/ScrenShot/WA_chat.png" delay={0.2} />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}