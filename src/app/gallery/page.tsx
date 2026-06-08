'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Image from 'next/image';
import Stack from '@/components/Stack';
import DomeGallery from '@/components/DomeGallery';
import Folder from '@/components/Folder';
import SnowflakeCursor from '@/components/AllCursors/SnowFlakeCursor';

gsap.registerPlugin(ScrollTrigger);

// ─── Color palette ─────────────────────────────────────────────────────────────
const C = {
  bg: '#fefae0',
  gold: '#847B1A',
  goldDark: '#4e4a0e',
  goldLine: 'rgba(132,123,26,0.18)',
  goldSoft: 'rgba(132,123,26,0.4)',
  goldMid: 'rgba(132,123,26,0.22)',
  petal: 'rgba(220,140,160,0.55)',
  s1: '#fefae0',
  s2: '#faf6d4',
  s3: '#fdf8e2',
};

// ─── Background Images Configuration ──────────────────────────────────────────
const BG_IMAGES = {
  hero: { src: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780924533/premium_photo-1676376284604-c171164b6886_wrgpsu.avif', opacity: 0.75 },
  s1: { src: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780924261/premium_photo-1723726924915-003cac6743dc_mvjgmn.avif', opacity: 0.75 },
  s2: { src: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780924646/premium_photo-1680507425822-f9066024f13b_c73nxp.avif', opacity: 0.55 },
  s3: { src: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780924646/premium_photo-1680507425822-f9066024f13b_c73nxp.avif', opacity: 0.7 },
};


// ─── Diamond ───────────────────────────────────────────────────────────────────
function Diamond({ size = 6, opacity = 0.45 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" style={{ opacity, flexShrink: 0 }}>
      <polygon points="5,0 10,5 5,10 0,5" fill={C.gold} />
    </svg>
  );
}

// ─── Scroll progress line ───────────────────────────────────────────────────────
function ScrollLine() {
  const { scrollYProgress } = useScroll();
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return (
    <div className="fixed left-6 top-0 w-[1px] pointer-events-none hidden lg:block"
      style={{ height: '100vh', zIndex: 100, background: 'rgba(132,123,26,0.1)' }}>
      <motion.div className="w-full" style={{ height: h, background: 'linear-gradient(to bottom,rgba(132,123,26,0.6),rgba(200,185,60,0.85))', transformOrigin: 'top' }} />
      <motion.div className="absolute left-1/2 -translate-x-1/2" style={{ top: h }}>
        <svg width="8" height="8" viewBox="0 0 10 10" style={{ transform: 'translateY(-4px)' }}>
          <polygon points="5,0 10,5 5,10 0,5" fill="rgba(132,123,26,0.75)" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Chapter Navigation ─────────────────────────────────────────────────────────
function ChapterNav({ activeChapter }: { activeChapter: number }) {
  const chapters = [
    { num: '01', label: 'The Beginning' },
    { num: '02', label: 'Her Energy' },
    { num: '03', label: 'Moments That Stayed' },
  ];

  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 pointer-events-none"
      style={{ zIndex: 200 }}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1.2 }}
    >
      {chapters.map((ch, i) => {
        const isActive = activeChapter === i;
        return (
          <div key={i} className="flex items-center gap-3">
            <motion.div
              style={{
                width: isActive ? 32 : 16,
                height: 1,
                background: isActive ? C.gold : C.goldLine,
                transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
            <motion.div className="flex flex-col gap-0.5"
              animate={{ opacity: isActive ? 1 : 0.3 }}
              transition={{ duration: 0.5 }}>
              <span style={{
                fontFamily: 'monospace',
                fontSize: 9,
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                color: C.goldSoft,
              }}>{ch.num}</span>
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 8,
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: C.goldDark,
                    }}
                  >
                    {ch.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
            {isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Diamond size={5} opacity={0.5} />
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}

// ─── Wave SVG Separator ─────────────────────────────────────────────────────────
function WaveSeparator({ flip = false, fromColor, toColor }: { flip?: boolean; fromColor: string; toColor: string }) {
  return (
    <div style={{ position: 'relative', zIndex: 5, marginTop: -2, marginBottom: -2, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 90, transform: flip ? 'scaleX(-1)' : 'none' }}>
        <rect width="1440" height="90" fill={fromColor} />
        <path d="M0,0 C180,90 360,0 540,45 C720,90 900,0 1080,50 C1260,90 1350,20 1440,40 L1440,90 L0,90 Z" fill={toColor} />
        <path d="M0,0 C180,90 360,0 540,45 C720,90 900,0 1080,50 C1260,90 1350,20 1440,40"
          fill="none" stroke={C.gold} strokeWidth="1.2" strokeOpacity="0.28" />
        {[[540, 45], [900, 5], [1260, 75]].map(([cx, cy], i) => (
          <polygon key={i} points={`${cx},${cy - 6} ${cx + 5},${cy} ${cx},${cy + 6} ${cx - 5},${cy}`}
            fill={C.gold} opacity="0.22" />
        ))}
      </svg>
    </div>
  );
}

// ─── Animated SVG Botanical (hand-drawn style) ─────────────────────────────────
function BotanicalLeft({ inView }: { inView: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  useEffect(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength?.() || 800;
    pathRef.current.style.strokeDasharray = String(len);
    pathRef.current.style.strokeDashoffset = String(len);
    if (inView) {
      gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 2.8, ease: 'power2.inOut', delay: 0.4 });
    }
  }, [inView]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: -20, top: '10%', zIndex: 2, opacity: 0.5 }}
      initial={{ x: -80, rotate: -8, opacity: 0 }}
      animate={inView ? { x: 0, rotate: 0, opacity: 0.5 } : {}}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <svg width="220" height="420" viewBox="0 0 220 420" fill="none">
        {/* Main stem */}
        <path ref={pathRef}
          d="M60,400 C55,360 70,320 50,280 C30,240 80,200 60,160 C40,120 90,85 70,50 C60,30 80,15 100,10"
          stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
        {/* Leaf clusters */}
        <path d="M60,340 C40,320 20,300 30,275 C50,280 65,310 60,340Z" fill={C.gold} opacity="0.12" />
        <path d="M60,340 C80,318 100,298 88,273 C68,280 57,312 60,340Z" fill={C.gold} opacity="0.1" />
        <path d="M52,270 C32,252 15,230 28,208 C48,215 60,248 52,270Z" fill={C.gold} opacity="0.11" />
        <path d="M52,270 C72,250 92,228 78,206 C58,215 50,248 52,270Z" fill={C.gold} opacity="0.09" />
        <path d="M62,195 C44,178 30,155 44,132 C62,140 68,172 62,195Z" fill={C.gold} opacity="0.1" />
        <path d="M62,195 C80,176 95,153 80,130 C62,140 60,172 62,195Z" fill={C.gold} opacity="0.09" />
        <path d="M68,130 C50,115 40,92 55,72 C72,82 75,112 68,130Z" fill={C.gold} opacity="0.1" />
        <path d="M68,130 C86,113 96,90 80,70 C64,82 65,112 68,130Z" fill={C.gold} opacity="0.08" />
        {/* Tiny blossom dots */}
        {[[45, 290], [35, 220], [48, 165], [70, 95]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="rgba(220,140,160,0.45)" />
        ))}
      </svg>
    </motion.div>
  );
}

function BotanicalRight({ inView }: { inView: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  useEffect(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength?.() || 800;
    pathRef.current.style.strokeDasharray = String(len);
    pathRef.current.style.strokeDashoffset = String(len);
    if (inView) {
      gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 2.8, ease: 'power2.inOut', delay: 0.6 });
    }
  }, [inView]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ right: -20, top: '10%', zIndex: 2, opacity: 0.5 }}
      initial={{ x: 80, rotate: 8, opacity: 0 }}
      animate={inView ? { x: 0, rotate: 0, opacity: 0.5 } : {}}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      <svg width="220" height="420" viewBox="0 0 220 420" fill="none" style={{ transform: 'scaleX(-1)' }}>
        <path ref={pathRef}
          d="M60,400 C55,360 70,320 50,280 C30,240 80,200 60,160 C40,120 90,85 70,50 C60,30 80,15 100,10"
          stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M60,340 C40,320 20,300 30,275 C50,280 65,310 60,340Z" fill={C.gold} opacity="0.12" />
        <path d="M60,340 C80,318 100,298 88,273 C68,280 57,312 60,340Z" fill={C.gold} opacity="0.1" />
        <path d="M52,270 C32,252 15,230 28,208 C48,215 60,248 52,270Z" fill={C.gold} opacity="0.11" />
        <path d="M52,270 C72,250 92,228 78,206 C58,215 50,248 52,270Z" fill={C.gold} opacity="0.09" />
        <path d="M62,195 C44,178 30,155 44,132 C62,140 68,172 62,195Z" fill={C.gold} opacity="0.1" />
        <path d="M62,195 C80,176 95,153 80,130 C62,140 60,172 62,195Z" fill={C.gold} opacity="0.09" />
        <path d="M68,130 C50,115 40,92 55,72 C72,82 75,112 68,130Z" fill={C.gold} opacity="0.1" />
        <path d="M68,130 C86,113 96,90 80,70 C64,82 65,112 68,130Z" fill={C.gold} opacity="0.08" />
        {[[45, 290], [35, 220], [48, 165], [70, 95]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="rgba(220,140,160,0.45)" />
        ))}
      </svg>
    </motion.div>
  );
}

// ─── Circular Floral Frame (section 1 background) ──────────────────────────────
function FloralFrame({ inView }: { inView: boolean }) {
  return (
    <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 1 }}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}>
      <svg width="520" height="520" viewBox="0 0 520 520" fill="none" opacity="0.07">
        <circle cx="260" cy="260" r="220" stroke={C.gold} strokeWidth="1" strokeDasharray="8 6" />
        <circle cx="260" cy="260" r="190" stroke={C.gold} strokeWidth="0.5" />
        <circle cx="260" cy="260" r="250" stroke={C.gold} strokeWidth="0.5" strokeDasharray="3 8" />
        {/* Petal ring */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30) * (Math.PI / 180);
          const x = (260 + 220 * Math.cos(angle)).toFixed(4);
          const y = (260 + 220 * Math.sin(angle)).toFixed(4);
          return (
            <g key={i} transform={`translate(${x},${y}) rotate(${i * 30})`}>
              <polygon points="0,-7 4,0 0,7 -4,0" fill={C.gold} opacity="0.8" />
            </g>
          );
        })}
        {/* Botanical cross lines */}
        <line x1="260" y1="40" x2="260" y2="480" stroke={C.gold} strokeWidth="0.4" strokeDasharray="2 12" />
        <line x1="40" y1="260" x2="480" y2="260" stroke={C.gold} strokeWidth="0.4" strokeDasharray="2 12" />
      </svg>
    </motion.div>
  );
}

// ─── Orbital ring for Section 2 ─────────────────────────────────────────────────
function OrbitalRings({ inView }: { inView: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 1 }}>
      {/* Slow rotating outer ring */}
      <motion.div
        style={{ position: 'absolute' }}
        animate={inView ? { rotate: 360 } : {}}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}>
        <svg width="680" height="680" viewBox="0 0 680 680" fill="none">
          <circle cx="340" cy="340" r="300" stroke={C.gold} strokeWidth="0.8" strokeOpacity="0.07" strokeDasharray="6 14" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const cxVal = 340 + 300 * Math.cos(angle);
            const cyVal = 340 + 300 * Math.sin(angle);
            const p1 = `${cxVal.toFixed(4)},${(cyVal - 5).toFixed(4)}`;
            const p2 = `${(cxVal + 4).toFixed(4)},${cyVal.toFixed(4)}`;
            const p3 = `${cxVal.toFixed(4)},${(cyVal + 5).toFixed(4)}`;
            const p4 = `${(cxVal - 4).toFixed(4)},${cyVal.toFixed(4)}`;
            return <polygon key={i} points={`${p1} ${p2} ${p3} ${p4}`} fill={C.gold} opacity="0.18" />;
          })}
        </svg>
      </motion.div>
      {/* Counter-rotating middle */}
      <motion.div
        style={{ position: 'absolute' }}
        animate={inView ? { rotate: -360 } : {}}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
        <svg width="580" height="580" viewBox="0 0 580 580" fill="none">
          <circle cx="290" cy="290" r="250" stroke={C.gold} strokeWidth="0.5" strokeOpacity="0.05" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) * (Math.PI / 180);
            const x = (290 + 250 * Math.cos(angle)).toFixed(4);
            const y = (290 + 250 * Math.sin(angle)).toFixed(4);
            return <circle key={i} cx={x} cy={y} r="2" fill={C.gold} opacity="0.15" />;
          })}
        </svg>
      </motion.div>
      {/* Inner pulse ring */}
      <motion.div style={{ position: 'absolute' }}
        animate={inView ? { scale: [1, 1.04, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="460" height="460" viewBox="0 0 460 460" fill="none">
          <circle cx="230" cy="230" r="200" stroke={C.gold} strokeWidth="1" strokeOpacity="0.06" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Floral Mandala (section 3 background) ─────────────────────────────────────
function FloralMandala({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 1 }}
      initial={{ opacity: 0, scale: 0.9, rotate: -15 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}>
      <motion.div animate={inView ? { rotate: 360 } : {}} transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}>
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" opacity="0.06">
          {/* Petal layers */}
          {[6, 8, 12].map((count, layer) =>
            Array.from({ length: count }).map((_, i) => {
              const r = 80 + layer * 70;
              const angle = (i * (360 / count)) * (Math.PI / 180);
              const x = (300 + r * Math.cos(angle)).toFixed(4);
              const y = (300 + r * Math.sin(angle)).toFixed(4);
              const rotate = (i * (360 / count));
              return (
                <ellipse key={`${layer}-${i}`} cx={x} cy={y} rx="18" ry="32"
                  transform={`rotate(${rotate + 90},${x},${y})`}
                  fill={C.gold} opacity="0.8" />
              );
            })
          )}
          <circle cx="300" cy="300" r="30" stroke={C.gold} strokeWidth="1" fill="none" />
          <circle cx="300" cy="300" r="15" fill={C.gold} opacity="0.3" />
          {/* Rings */}
          {[110, 180, 250, 300].map((r, i) => (
            <circle key={i} cx="300" cy="300" r={r} stroke={C.gold} strokeWidth="0.5" fill="none" strokeDasharray={i % 2 === 0 ? "4 8" : "1 6"} />
          ))}
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ─── Hand-drawn SVG sketch for Section 3 ───────────────────────────────────────
function HandDrawnFloral({ inView }: { inView: boolean }) {
  const paths = [
    "M300,450 C290,420 270,400 260,370 C250,340 265,310 255,285 C245,260 220,245 215,220 C210,195 225,175 240,160",
    "M260,370 C235,355 210,345 195,325 C180,305 185,278 170,260",
    "M255,285 C275,270 290,250 285,225 C280,200 260,190 260,168",
    "M240,160 C255,145 268,125 260,105 C252,85 235,75 240,55",
    "M215,220 C195,210 175,198 168,178 C161,158 172,138 165,118",
  ];
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    if (!inView) return;
    pathRefs.current.forEach((el, i) => {
      if (!el) return;
      const len = el.getTotalLength?.() || 300;
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = String(len);
      gsap.to(el, { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut', delay: 0.5 + i * 0.35 });
    });
  }, [inView]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
      <svg width="600" height="500" viewBox="0 0 600 500" fill="none">
        {paths.map((d, i) => (
          <path key={i} ref={el => { pathRefs.current[i] = el; }}
            d={d} stroke={C.gold} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.35" />
        ))}
        {/* Blossom heads */}
        {[[215, 220], [255, 285], [170, 260], [240, 160], [165, 118]].map(([x, y], i) => (
          <g key={i}>
            {[0, 72, 144, 216, 288].map(a => {
              const rad = a * Math.PI / 180;
              const cxVal = (x + 10 * Math.cos(rad)).toFixed(4);
              const cyVal = (y + 10 * Math.sin(rad)).toFixed(4);
              return <ellipse key={a} cx={cxVal} cy={cyVal} rx="4" ry="7"
                transform={`rotate(${a},${cxVal},${cyVal})`}
                fill="rgba(220,140,160,0.3)" />;
            })}
            <circle cx={x} cy={y} r="3" fill="rgba(132,123,26,0.25)" />
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── Continuous connecting SVG path ────────────────────────────────────────────
function ConnectingPath() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength?.() || 2000;
    pathRef.current.style.strokeDasharray = String(len);
    pathRef.current.style.strokeDashoffset = String(len);

    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        if (pathRef.current) {
          pathRef.current.style.strokeDashoffset = String(len * (1 - self.progress));
        }
      },
    });
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
      <svg className="w-full h-full" viewBox="0 0 100 3000" preserveAspectRatio="none" fill="none">
        <path ref={pathRef}
          d="M50,0 C30,150 70,300 45,500 C20,700 65,850 50,1000 C35,1150 75,1280 55,1450 C35,1620 68,1750 50,1900 C32,2050 72,2200 50,2400 C28,2600 60,2750 50,3000"
          stroke={C.gold} strokeWidth="0.3" strokeLinecap="round" opacity="0.25" />
      </svg>
    </div>
  );
}

// ─── Floating particles ─────────────────────────────────────────────────────────
function FloatingParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const particles = Array.from({ length: 18 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 6 + Math.random() * 10,
    delay: Math.random() * 4,
    dur: 5 + Math.random() * 6,
    type: i % 3, // 0=petal, 1=leaf, 2=diamond
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -20, 5, -12, 0],
            x: [0, 8, -4, 10, 0],
            rotate: [0, 15, -10, 20, 0],
            opacity: [0.2, 0.4, 0.22, 0.38, 0.2],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}>
          {p.type === 0 && (
            <svg width={p.size} height={p.size} viewBox="0 0 20 20" fill="none">
              <path d="M10 2 C12 5,16 6,16 10 C16 14,12 16,10 18 C8 16,4 14,4 10 C4 6,8 5,10 2Z" fill="rgba(220,140,160,0.5)" />
            </svg>
          )}
          {p.type === 1 && (
            <svg width={p.size} height={p.size * 1.4} viewBox="0 0 14 20" fill="none">
              <path d="M7,0 C10,4 12,8 10,12 C8,16 5,18 7,20 C9,18 14,14 12,8 C10,4 7,0 7,0Z" fill="rgba(132,123,26,0.18)" />
            </svg>
          )}
          {p.type === 2 && (
            <svg width={p.size * 0.7} height={p.size * 0.7} viewBox="0 0 10 10">
              <polygon points="5,0 10,5 5,10 0,5" fill="rgba(132,123,26,0.22)" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Parallax wrapper ───────────────────────────────────────────────────────────
function ParallaxLayer({ children, speed = 0.3, className = '' }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const smoothY = useSpring(y, { stiffness: 60, damping: 20 });

  return (
    <motion.div ref={ref} className={className} style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
}

// ─── Section Label ──────────────────────────────────────────────────────────────
function SectionLabel({ num, label, inView }: { num: string; label: string; inView: boolean }) {
  return (
    <motion.div className="flex items-center gap-3"
      initial={{ opacity: 0, y: -10 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: 0.6, delay: 0.4 }}>
      <Diamond size={5} opacity={0.3} />
      <span style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.55em', color: C.goldSoft, textTransform: 'uppercase' }}>
        {num} / {label}
      </span>
      <div style={{ flex: 1, height: 1, background: C.goldLine }} />
    </motion.div>
  );
}

// ─── Decorative quote/caption ───────────────────────────────────────────────────
function ElegantCaption({ text, inView, delay = 0 }: { text: string; inView: boolean; delay?: number }) {
  return (
    <motion.div className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.7, delay }}>
      <div className="flex items-center gap-3">
        <div style={{ width: 30, height: 1, background: `linear-gradient(to right, transparent, ${C.goldMid})` }} />
        <Diamond size={3} opacity={0.2} />
        <div style={{ width: 30, height: 1, background: `linear-gradient(to left, transparent, ${C.goldMid})` }} />
      </div>
      <p style={{
        fontFamily: 'Georgia, serif',
        fontSize: '0.72rem',
        fontStyle: 'italic',
        letterSpacing: '0.08em',
        color: 'rgba(78,74,14,0.45)',
        textAlign: 'center',
      }}>{text}</p>
    </motion.div>
  );
}

// ─── Section 1: The Beginning ───────────────────────────────────────────────────
function Section1({ onEnter }: { onEnter: (index: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const inViewTrack = useInView(ref, { amount: 0.5 });

  useEffect(() => { if (inViewTrack) onEnter(0); }, [inViewTrack]);

  // Scroll parallax for premium floating labels
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 40]), { stiffness: 60, damping: 20 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [35, -35]), { stiffness: 60, damping: 20 });
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [-25, 25]), { stiffness: 60, damping: 20 });
  const y4 = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), { stiffness: 60, damping: 20 });

  return (
    <section ref={ref} style={{ minHeight: '100vh', background: C.s1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Background Image using Next.js Image component */}
      {BG_IMAGES.s1.src && (
        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: BG_IMAGES.s1.opacity } : { opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          style={{ position: 'absolute' }}
        >
          <Image
            src={BG_IMAGES.s1.src}
            alt="Section 1 Background"
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${C.s1} 0%, transparent 15%, transparent 85%, ${C.s1} 100%)`
            }}
          />
        </motion.div>
      )}

      {/* Background frame */}
      <FloralFrame inView={inView} />

      {/* Botanical flanks */}
      <BotanicalLeft inView={inView} />
      <BotanicalRight inView={inView} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 1,
        backgroundImage: `radial-gradient(circle, rgba(132,123,26,0.055) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }} />

      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{
        zIndex: 1, top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(200,185,60,0.07) 0%,transparent 70%)', filter: 'blur(70px)',
      }} />

      {/* Section label */}
      <div className="px-6 lg:px-16 xl:px-24 pt-10 pb-4" style={{ position: 'relative', zIndex: 4 }}>
        <SectionLabel num="01" label="First Meeting" inView={inView} />
      </div>

      {/* Watermark */}
      <motion.span
        className="absolute"
        style={{
          fontFamily: 'Georgia,serif', fontSize: 'clamp(8rem,18vw,16rem)', fontWeight: 700,
          color: 'rgba(132,123,26,0.035)', letterSpacing: '-0.05em', lineHeight: 1,
          userSelect: 'none', zIndex: 1, pointerEvents: 'none', top: '20%', left: '50%', transform: 'translateX(-50%)',
        }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
        transition={{ duration: 1.4, delay: 0.2 }}>
        01
      </motion.span>

      {/* Title area */}
      <div className="flex flex-col items-center pt-4 pb-6 font-awesome text-8xl" style={{ position: 'relative', zIndex: 4 }}>
        <motion.h2
          className='absolute top-30'
          style={{ fontWeight: 400, color: C.goldDark, textAlign: 'center', letterSpacing: '-0.02em', lineHeight: 1.15 }}
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}>
          Open This
        </motion.h2>
        <motion.div className="flex items-center gap-3 mt-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.75 }}>
          <div style={{ width: 48, height: 1, background: C.goldMid }} />
          <Diamond size={4} opacity={0.22} />
          <div style={{ width: 48, height: 1, background: C.goldMid }} />
        </motion.div>
      </div>

      {/* Left Editorial Panel */}
      <motion.div
        className="absolute hidden lg:flex flex-col gap-2 pointer-events-none select-none"
        style={{
          left: '10%',
          top: '45%',
          transform: 'translateY(-50%)',
          zIndex: 4,
          maxWidth: '220px',
        }}
        initial={{ x: -80, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span style={{
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '0.4em',
          color: C.goldSoft,
        }}>01</span>
        <h3 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
          fontWeight: 400,
          color: C.goldDark,
          lineHeight: 1.4,
          letterSpacing: '-0.01em',
          marginTop: '4px',
        }}>
          Some stories<br />
          don't begin<br />
          with intentions.
        </h3>
      </motion.div>

      {/* Right Editorial Panel */}
      <motion.div
        className="absolute hidden lg:flex flex-col gap-2 pointer-events-none select-none text-right items-end"
        style={{
          right: '10%',
          top: '55%',
          transform: 'translateY(-50%)',
          zIndex: 4,
          maxWidth: '220px',
        }}
        initial={{ x: 80, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: 80, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span style={{
          fontFamily: 'monospace',
          fontSize: '10px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: C.goldSoft,
        }}>Open it.</span>
        <h3 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
          fontWeight: 400,
          color: 'rgba(78,74,14,0.65)',
          lineHeight: 1.4,
          letterSpacing: '-0.01em',
          marginTop: '4px',
        }}>
          The first chapter<br />
          is waiting inside.
        </h3>
      </motion.div>

      {/* Floating Memory Cards */}
      <motion.div
        className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full pointer-events-none select-none"
        style={{
          left: '24%',
          top: '38%',
          zIndex: 3,
          background: 'rgba(255, 253, 235, 0.25)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(132, 123, 26, 0.15)',
          boxShadow: '0 8px 32px 0 rgba(132, 123, 26, 0.04)',
          y: y1,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 0.7, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
      >
        <Diamond size={3} opacity={0.4} />
        <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: C.goldDark }}>Project</span>
      </motion.div>

      <motion.div
        className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full pointer-events-none select-none"
        style={{
          right: '25%',
          top: '42%',
          zIndex: 3,
          background: 'rgba(255, 253, 235, 0.25)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(132, 123, 26, 0.15)',
          boxShadow: '0 8px 32px 0 rgba(132, 123, 26, 0.04)',
          y: y2,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 0.75, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, delay: 1.0, ease: 'easeOut' }}
      >
        <Diamond size={3} opacity={0.4} />
        <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: C.goldDark }}>First Chapter</span>
      </motion.div>

      <motion.div
        className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full pointer-events-none select-none"
        style={{
          left: '26%',
          bottom: '22%',
          zIndex: 3,
          background: 'rgba(255, 253, 235, 0.25)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(132, 123, 26, 0.15)',
          boxShadow: '0 8px 32px 0 rgba(132, 123, 26, 0.04)',
          y: y3,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 0.7, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, delay: 1.1, ease: 'easeOut' }}
      >
        <Diamond size={3} opacity={0.4} />
        <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: C.goldDark }}>Conversation</span>
      </motion.div>

      <motion.div
        className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full pointer-events-none select-none"
        style={{
          right: '23%',
          bottom: '26%',
          zIndex: 3,
          background: 'rgba(255, 253, 235, 0.25)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(132, 123, 26, 0.15)',
          boxShadow: '0 8px 32px 0 rgba(132, 123, 26, 0.04)',
          y: y4,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 0.75, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
      >
        <Diamond size={3} opacity={0.4} />
        <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: C.goldDark }}>Beginning</span>
      </motion.div>

      {/* Folder — hero */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8" style={{ zIndex: 4, position: 'relative' }}>
        <motion.div
          style={{ filter: 'drop-shadow(0 20px 60px rgba(132,123,26,0.12))' }}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="w-full h-[380px] flex justify-center items-center mt-30">
            <Folder
              size={2.8} spread={1.1} cardWidth="85px" cardHeight="75px"
              images={[
                'https://res.cloudinary.com/dtslaveid/image/upload/v1780515078/ChatGPT_Image_Jun_4_2026_12_40_54_AM_szgivv.png',
                'https://res.cloudinary.com/dtslaveid/image/upload/v1780512277/ChatGPT_Image_Jun_3_2026_06_40_01_PM_clhdnp.png',
                'https://res.cloudinary.com/dtslaveid/image/upload/v1780512369/ChatGPT_Image_Jun_3_2026_05_42_51_PM_nagnxg.png',
              ]}
            />
          </div>
        </motion.div>

        {/* Breathing hint indicator */}
        <motion.div
          className="flex flex-col items-center gap-1.5 cursor-pointer mt-4"
          animate={{
            opacity: [0.35, 1, 0.35],
            y: [0, 8, 0]
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ pointerEvents: 'none' }}
        >
          <span style={{
            fontFamily: 'monospace',
            fontSize: '9px',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: C.goldDark,
            fontWeight: 500,
          }}>
            Open to Begin
          </span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1,1 L5,5 L9,1" stroke={C.gold} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          </svg>
        </motion.div>
      </div>

      {/* Side timeline marks */}
      <motion.div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 hidden lg:flex"
        style={{ zIndex: 4 }}
        initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}>
        {['I', 'II', 'III'].map((n, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div style={{ width: 1, height: i === 0 ? 24 : 14, background: C.goldLine }} />
            <span style={{ fontFamily: 'Georgia,serif', fontSize: 8, color: 'rgba(132,123,26,0.3)', letterSpacing: '0.1em' }}>{n}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Section 2: Her Energy ──────────────────────────────────────────────────────
// ─── Fragments Configuration for Section 2 ─────────────────────────────────────
const SEC2_FRAGMENTS = [
  { src: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780515078/ChatGPT_Image_Jun_4_2026_12_40_54_AM_szgivv.png', size: 90, top: '22%', left: '12%', yOffset: [-80, 80] },
  { src: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780512277/ChatGPT_Image_Jun_3_2026_06_40_01_PM_clhdnp.png', size: 120, top: '25%', right: '15%', yOffset: [60, -60] },
  { src: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780512369/ChatGPT_Image_Jun_3_2026_05_42_51_PM_nagnxg.png', size: 70, bottom: '20%', left: '16%', yOffset: [-100, 100] },
  { src: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780926361/2edf109e-003f-4e5e-8037-bab0a7d9e8b5_rp3uw5.png', size: 100, bottom: '24%', right: '12%', yOffset: [70, -70] },
  { src: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780926842/0c4b8822-2f84-4911-a385-47ba25cb00f6_wvao5x.png', size: 110, top: '15%', left: '32%', yOffset: [-50, 50] }
];

function Section2({ onEnter }: { onEnter: (index: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const inViewTrack = useInView(ref, { amount: 0.4 });
  const sec2BotLeft = useRef<SVGPathElement>(null);
  const sec2BotRight = useRef<SVGPathElement>(null);

  useEffect(() => { if (inViewTrack) onEnter(1); }, [inViewTrack]);

  useEffect(() => {
    if (!inView) return;
    [sec2BotLeft, sec2BotRight].forEach((r, idx) => {
      if (!r.current) return;
      const len = r.current.getTotalLength?.() || 600;
      r.current.style.strokeDasharray = String(len);
      r.current.style.strokeDashoffset = String(len);
      gsap.to(r.current, { strokeDashoffset: 0, duration: 3, ease: 'power2.inOut', delay: 0.8 + idx * 0.3 });
    });
  }, [inView]);

  // Scroll Parallax for Dome camera and atmospheric assets
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const domeScale = useSpring(useTransform(scrollYProgress, [0, 1], [0.92, 1.05]), { stiffness: 60, damping: 20 });
  const domeY = useSpring(useTransform(scrollYProgress, [0, 1], [80, -80]), { stiffness: 60, damping: 20 });
  const domeRotateY = useSpring(useTransform(scrollYProgress, [0, 1], [-8, 8]), { stiffness: 60, damping: 20 });

  const floraY1 = useSpring(useTransform(scrollYProgress, [0, 1], [-50, 50]), { stiffness: 60, damping: 20 });
  const floraY2 = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), { stiffness: 60, damping: 20 });
  const floraY3 = useSpring(useTransform(scrollYProgress, [0, 1], [-60, 60]), { stiffness: 60, damping: 20 });

  const chipY1 = useSpring(useTransform(scrollYProgress, [0, 1], [-60, 60]), { stiffness: 60, damping: 20 });
  const chipY2 = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), { stiffness: 60, damping: 20 });
  const chipY3 = useSpring(useTransform(scrollYProgress, [0, 1], [-30, 30]), { stiffness: 60, damping: 20 });
  const chipY4 = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), { stiffness: 60, damping: 20 });

  return (
    <section ref={ref} style={{ minHeight: '100vh', background: C.s2, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Background Image using Next.js Image component */}
      {BG_IMAGES.s2.src && (
        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: BG_IMAGES.s2.opacity } : { opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          style={{ position: 'absolute' }}
        >
          <Image
            src={BG_IMAGES.s2.src}
            alt="Section 2 Background"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${C.s2} 0%, transparent 15%, transparent 85%, ${C.s2} 100%)`
            }}
          />
        </motion.div>
      )}

      {/* Orbital rings */}
      <OrbitalRings inView={inView} />

      {/* Left botanical sketch */}
      <div className="absolute left-0 top-0 bottom-0 pointer-events-none hidden lg:block" style={{ zIndex: 2, width: 160 }}>
        <svg width="160" height="100%" viewBox="0 0 160 600" preserveAspectRatio="xMidYMid meet" fill="none">
          <path ref={sec2BotLeft}
            d="M80,580 C70,520 100,460 75,400 C50,340 95,280 72,220 C49,160 88,100 80,40"
            stroke={C.gold} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          {[[75, 400], [72, 220], [80, 100]].map(([x, y], i) => (
            <g key={i}>
              <path d={`M${x},${y} C${x - 30},${y - 20} ${x - 50},${y + 10} ${x - 35},${y + 30}Z`} fill={C.gold} opacity="0.08" />
              <path d={`M${x},${y} C${x + 28},${y - 22} ${x + 48},${y + 8} ${x + 33},${y + 28}Z`} fill={C.gold} opacity="0.07" />
              <circle cx={x} cy={y} r="2.5" fill="rgba(220,140,160,0.4)" />
            </g>
          ))}
        </svg>
      </div>

      {/* Right botanical sketch */}
      <div className="absolute right-0 top-0 bottom-0 pointer-events-none hidden lg:block" style={{ zIndex: 2, width: 160 }}>
        <svg width="160" height="100%" viewBox="0 0 160 600" preserveAspectRatio="xMidYMid meet" fill="none" style={{ transform: 'scaleX(-1)' }}>
          <path ref={sec2BotRight}
            d="M80,580 C70,520 100,460 75,400 C50,340 95,280 72,220 C49,160 88,100 80,40"
            stroke={C.gold} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          {[[75, 400], [72, 220], [80, 100]].map(([x, y], i) => (
            <g key={i}>
              <path d={`M${x},${y} C${x - 30},${y - 20} ${x - 50},${y + 10} ${x - 35},${y + 30}Z`} fill={C.gold} opacity="0.08" />
              <path d={`M${x},${y} C${x + 28},${y - 22} ${x + 48},${y + 8} ${x + 33},${y + 28}Z`} fill={C.gold} opacity="0.07" />
              <circle cx={x} cy={y} r="2.5" fill="rgba(220,140,160,0.4)" />
            </g>
          ))}
        </svg>
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: `radial-gradient(circle, rgba(132,123,26,0.045) 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />

      {/* Section label */}
      <div className="px-6 lg:px-16 xl:px-24 pt-10 pb-4" style={{ position: 'relative', zIndex: 5 }}>
        <SectionLabel num="02" label="Her Energy" inView={inView} />
      </div>

      {/* Watermark */}
      <motion.span className="absolute"
        style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(8rem,18vw,16rem)', fontWeight: 700, color: 'rgba(132,123,26,0.03)', letterSpacing: '-0.05em', lineHeight: 1, userSelect: 'none', zIndex: 1, top: '15%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
        transition={{ duration: 1.4, delay: 0.2 }}>
        02
      </motion.span>

      {/* Radial golden glow behind Dome */}
      <div className="absolute pointer-events-none" style={{
        width: '900px',
        height: '900px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(212, 196, 144, 0.16) 0%, transparent 70%)',
        filter: 'blur(120px)',
        zIndex: 1,
        opacity: 0.85,
      }} />

      {/* Flowing SVG Energy Trails */}
      <div className="absolute inset-0 pointer-events-none z-2">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          {/* Energy Trail 1 */}
          <motion.path
            d="M 150 500 Q 300 250 500 250 T 850 500 Q 700 750 500 750 Z"
            fill="none"
            stroke="rgba(132,123,26,0.18)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 0.4, 0.4, 0],
              pathOffset: [0, 0.3, 0.7, 1],
              opacity: [0, 0.6, 0.6, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0
            }}
          />
          {/* Energy Trail 2 */}
          <motion.path
            d="M 200 450 Q 500 150 800 450 T 500 850 Z"
            fill="none"
            stroke="rgba(132,123,26,0.15)"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 0.5, 0.5, 0],
              pathOffset: [0, 0.25, 0.65, 1],
              opacity: [0, 0.5, 0.5, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          {/* Energy Trail 3 */}
          <motion.path
            d="M 300 550 C 400 350, 600 350, 700 550 Q 500 680 300 550"
            fill="none"
            stroke="rgba(220,140,160,0.16)"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 0.35, 0.35, 0],
              pathOffset: [0, 0.35, 0.75, 1],
              opacity: [0, 0.7, 0.7, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </svg>
      </div>

      {/* 3 Large Semi-Transparent Botanical Assets */}
      <motion.div
        className="absolute pointer-events-none hidden lg:block"
        style={{ left: '5%', top: '12%', zIndex: 2, y: floraY1 }}
      >
        <motion.div
          style={{ opacity: 0.12, originX: 0.5, originY: 0.5 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="280" height="500" viewBox="0 0 220 420" fill="none">
            <path d="M60,400 C55,360 70,320 50,280 C30,240 80,200 60,160 C40,120 90,85 70,50 C60,30 80,15 100,10" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M60,340 C40,320 20,300 30,275 C50,280 65,310 60,340Z" fill={C.gold} opacity="0.12" />
            <path d="M60,340 C80,318 100,298 88,273 C68,280 57,312 60,340Z" fill={C.gold} opacity="0.1" />
            <path d="M52,270 C32,252 15,230 28,208 C48,215 60,248 52,270Z" fill={C.gold} opacity="0.11" />
            <path d="M52,270 C72,250 92,228 78,206 C58,215 50,248 52,270Z" fill={C.gold} opacity="0.09" />
            <path d="M62,195 C44,178 30,155 44,132 C62,140 68,172 62,195Z" fill={C.gold} opacity="0.1" />
            <path d="M62,195 C80,176 95,153 80,130 C62,140 60,172 62,195Z" fill={C.gold} opacity="0.09" />
            <path d="M68,130 C50,115 40,92 55,72 C72,82 75,112 68,130Z" fill={C.gold} opacity="0.1" />
            <path d="M68,130 C86,113 96,90 80,70 C64,82 65,112 68,130Z" fill={C.gold} opacity="0.08" />
            {[[45, 290], [35, 220], [48, 165], [70, 95]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="rgba(220,140,160,0.45)" />
            ))}
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute pointer-events-none hidden lg:block"
        style={{ right: '8%', top: '40%', zIndex: 2, y: floraY2 }}
      >
        <motion.div
          style={{ opacity: 0.08, originX: 0.5, originY: 0.5 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="240" height="460" viewBox="0 0 220 420" fill="none" style={{ transform: 'scaleX(-1)' }}>
            <path d="M60,400 C55,360 70,320 50,280 C30,240 80,200 60,160 C40,120 90,85 70,50 C60,30 80,15 100,10" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M60,340 C40,320 20,300 30,275 C50,280 65,310 60,340Z" fill={C.gold} opacity="0.12" />
            <path d="M60,340 C80,318 100,298 88,273 C68,280 57,312 60,340Z" fill={C.gold} opacity="0.1" />
            <path d="M52,270 C32,252 15,230 28,208 C48,215 60,248 52,270Z" fill={C.gold} opacity="0.11" />
            <path d="M52,270 C72,250 92,228 78,206 C58,215 50,248 52,270Z" fill={C.gold} opacity="0.09" />
            <path d="M62,195 C44,178 30,155 44,132 C62,140 68,172 62,195Z" fill={C.gold} opacity="0.1" />
            <path d="M62,195 C80,176 95,153 80,130 C62,140 60,172 62,195Z" fill={C.gold} opacity="0.09" />
            <path d="M68,130 C50,115 40,92 55,72 C72,82 75,112 68,130Z" fill={C.gold} opacity="0.1" />
            <path d="M68,130 C86,113 96,90 80,70 C64,82 65,112 68,130Z" fill={C.gold} opacity="0.08" />
            {[[45, 290], [35, 220], [48, 165], [70, 95]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="rgba(220,140,160,0.45)" />
            ))}
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute pointer-events-none hidden lg:block"
        style={{ right: '12%', bottom: '10%', zIndex: 2, y: floraY3 }}
      >
        <motion.div
          style={{ opacity: 0.12, originX: 0.5, originY: 0.5 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="260" height="480" viewBox="0 0 220 420" fill="none">
            <path d="M60,400 C55,360 70,320 50,280 C30,240 80,200 60,160 C40,120 90,85 70,50 C60,30 80,15 100,10" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M60,340 C40,320 20,300 30,275 C50,280 65,310 60,340Z" fill={C.gold} opacity="0.12" />
            <path d="M60,340 C80,318 100,298 88,273 C68,280 57,312 60,340Z" fill={C.gold} opacity="0.1" />
            <path d="M52,270 C32,252 15,230 28,208 C48,215 60,248 52,270Z" fill={C.gold} opacity="0.11" />
            <path d="M52,270 C72,250 92,228 78,206 C58,215 50,248 52,270Z" fill={C.gold} opacity="0.09" />
            <path d="M62,195 C44,178 30,155 44,132 C62,140 68,172 62,195Z" fill={C.gold} opacity="0.1" />
            <path d="M62,195 C80,176 95,153 80,130 C62,140 60,172 62,195Z" fill={C.gold} opacity="0.09" />
            <path d="M68,130 C50,115 40,92 55,72 C72,82 75,112 68,130Z" fill={C.gold} opacity="0.1" />
            <path d="M68,130 C86,113 96,90 80,70 C64,82 65,112 68,130Z" fill={C.gold} opacity="0.08" />
            {[[45, 290], [35, 220], [48, 165], [70, 95]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="rgba(220,140,160,0.45)" />
            ))}
          </svg>
        </motion.div>
      </motion.div>

      {/* Floating Memory Image Fragments */}
      {SEC2_FRAGMENTS.map((frag, idx) => {
        const yVal = useSpring(useTransform(scrollYProgress, [0, 1], frag.yOffset), { stiffness: 50, damping: 20 });
        return (
          <motion.div
            key={idx}
            className="absolute hidden lg:block pointer-events-none select-none"
            style={{
              width: frag.size,
              height: frag.size,
              top: frag.top,
              left: frag.left,
              right: frag.right,
              bottom: frag.bottom,
              y: yVal,
              zIndex: 2,
            }}
          >
            <motion.div
              className="w-full h-full overflow-hidden"
              style={{
                borderRadius: '12px',
                border: '1px solid rgba(132, 123, 26, 0.15)',
                opacity: 0.25,
                position: 'relative'
              }}
              animate={{
                y: [0, -10, 3, -7, 0],
                rotate: [0, 6, -4, 5, 0]
              }}
              transition={{
                duration: 8 + idx * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src={frag.src}
                alt={`Memory Fragment ${idx}`}
                fill
                className="object-cover"
                sizes="120px"
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Floating Caption Chips */}
      {[
        { text: 'Warm', top: '30%', left: '28%', yVal: chipY1 },
        { text: 'Creative', top: '35%', right: '26%', yVal: chipY2 },
        { text: 'Curious', bottom: '30%', left: '24%', yVal: chipY3 },
        { text: 'Calm', bottom: '26%', right: '28%', yVal: chipY4 }
      ].map((chip, idx) => (
        <motion.div
          key={idx}
          className="absolute hidden lg:block pointer-events-none select-none"
          style={{
            top: chip.top,
            left: chip.left,
            right: chip.right,
            bottom: chip.bottom,
            y: chip.yVal,
            zIndex: 4,
          }}
        >
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(255, 253, 235, 0.25)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(132, 123, 26, 0.15)',
              boxShadow: '0 8px 32px 0 rgba(132, 123, 26, 0.04)',
            }}
            animate={{
              y: [0, -6, 2, -4, 0],
              rotate: [0, 4, -2, 3, 0]
            }}
            transition={{
              duration: 7 + idx * 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Diamond size={3} opacity={0.4} />
            <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: C.goldDark }}>{chip.text}</span>
          </motion.div>
        </motion.div>
      ))}

      {/* DomeGallery — full bleed */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{
          zIndex: 3,
          scale: domeScale,
          y: domeY,
          rotateY: domeRotateY,
          perspective: 1200,
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <DomeGallery fit={0.5} grayscale={false} />
      </motion.div>

      {/* Caption overlay bottom */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none" style={{ zIndex: 6 }}>
        <ElegantCaption text="everything she is — boundless" inView={inView} delay={1} />
      </div>
    </section>
  );
}

// ─── Section 3: Moments That Stayed ────────────────────────────────────────────
function Section3({ onEnter }: { onEnter: (index: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const connectorLineRef = useRef<SVGPathElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const inViewTrack = useInView(ref, { amount: 0.4 });

  useEffect(() => { if (inViewTrack) onEnter(2); }, [inViewTrack]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const vineLeftY = useTransform(scrollYProgress, [0, 1], [-80, 50]);
  const vineRightY = useTransform(scrollYProgress, [0, 1], [80, -50]);

  const leftBlockParallax = useSpring(useTransform(scrollYProgress, [0, 1], [-30, 30]), { stiffness: 60, damping: 20 });
  const rightBlockParallax = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), { stiffness: 60, damping: 20 });

  useGSAP(() => {
    if (!connectorLineRef.current) return;
    const path = connectorLineRef.current;
    const length = path.getTotalLength ? path.getTotalLength() : 1000;

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 60%',
        end: 'bottom 85%',
        scrub: 1,
      }
    });
  }, { scope: ref });

  return (
    <section ref={ref} style={{ minHeight: '100vh', background: C.s3, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Background Image using Next.js Image component */}
      {BG_IMAGES.s3.src && (
        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: BG_IMAGES.s3.opacity } : { opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          style={{ position: 'absolute' }}
        >
          <Image
            src={BG_IMAGES.s3.src}
            alt="Section 3 Background"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${C.s3} 0%, transparent 15%, transparent 85%, ${C.s3} 100%)`
            }}
          />
        </motion.div>
      )}

      {/* Mandala background */}
      <FloralMandala inView={inView} />

      {/* Hand-drawn floral sketch */}
      <HandDrawnFloral inView={inView} />

      {/* Hanging vines — parallax */}
      <motion.div className="absolute top-0 left-0 pointer-events-none hidden lg:block" style={{ zIndex: 2, y: vineLeftY }}>
        <svg width="200" height="300" viewBox="0 0 200 300" fill="none">
          {[0, 1, 2, 3].map(i => (
            <g key={i}>
              <path d={`M${80 + i * 8},${i * 60} C${60 + i * 5},${20 + i * 60} ${50 + i * 4},${35 + i * 60} ${70 + i * 6},${55 + i * 60}`}
                stroke={C.gold} strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
              <path d={`M${80 + i * 8},${i * 60} C${100 + i * 4},${18 + i * 60} ${108 + i * 3},${35 + i * 60} ${88 + i * 5},${53 + i * 60}`}
                fill={C.gold} opacity="0.08" />
            </g>
          ))}
        </svg>
      </motion.div>

      <motion.div className="absolute top-0 right-0 pointer-events-none hidden lg:block" style={{ zIndex: 2, y: vineRightY }}>
        <svg width="200" height="300" viewBox="0 0 200 300" fill="none" style={{ transform: 'scaleX(-1)' }}>
          {[0, 1, 2, 3].map(i => (
            <g key={i}>
              <path d={`M${80 + i * 8},${i * 60} C${60 + i * 5},${20 + i * 60} ${50 + i * 4},${35 + i * 60} ${70 + i * 6},${55 + i * 60}`}
                stroke={C.gold} strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
              <path d={`M${80 + i * 8},${i * 60} C${100 + i * 4},${18 + i * 60} ${108 + i * 3},${35 + i * 60} ${88 + i * 5},${53 + i * 60}`}
                fill={C.gold} opacity="0.08" />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: `radial-gradient(circle, rgba(132,123,26,0.055) 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />

      {/* Section label */}
      <div className="px-6 lg:px-16 xl:px-24 pt-10 pb-4" style={{ position: 'relative', zIndex: 4 }}>
        <SectionLabel num="03" label="Moments That Stayed" inView={inView} />
      </div>

      {/* Watermark */}
      <motion.span className="absolute"
        style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(8rem,18vw,16rem)', fontWeight: 700, color: 'rgba(132,123,26,0.03)', letterSpacing: '-0.05em', lineHeight: 1, userSelect: 'none', zIndex: 1, top: '20%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
        transition={{ duration: 1.4, delay: 0.2 }}>
        03
      </motion.span>

      {/* Thin Gold Connector Line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" viewBox="0 0 1440 900" preserveAspectRatio="none" style={{ zIndex: 2 }}>
        <path
          ref={connectorLineRef}
          d="M 200,432 C 450,432 500,450 720,450 C 940,450 1000,504 1240,504"
          stroke={C.gold}
          strokeWidth="1.2"
          fill="none"
          opacity="0.15"
          strokeLinecap="round"
        />
      </svg>

      {/* Left Content Block */}
      <motion.div
        className="absolute hidden lg:flex flex-col gap-2 pointer-events-none select-none"
        style={{
          left: '10%',
          top: '48%',
          transform: 'translateY(-50%)',
          zIndex: 4,
          maxWidth: '260px',
          y: leftBlockParallax,
        }}
      >
        <motion.div
          className="flex flex-col gap-2"
          initial={{ x: -80, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        >
          <span style={{
            fontFamily: 'monospace',
            fontSize: '9px',
            letterSpacing: '0.4em',
            color: C.goldSoft,
          }}>03 / MEMORY</span>
          <h3 className="font-lirrier text-6xl" style={{

            fontWeight: 400,
            color: C.goldDark,
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
          }}>
            Not every moment asks to be remembered.
          </h3>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '0.75rem',
            fontStyle: 'italic',
            color: 'rgba(78,74,14,0.5)',
            marginTop: '4px',
          }}>
            Some simply stay.
          </p>
        </motion.div>
      </motion.div>

      {/* Right Content Block */}
      <motion.div
        className="absolute hidden lg:flex flex-col gap-2 pointer-events-none select-none text-right items-end"
        style={{
          right: '10%',
          top: '56%',
          transform: 'translateY(-50%)',
          zIndex: 4,
          maxWidth: '260px',
          y: rightBlockParallax,
        }}
      >
        <motion.div
          className="flex flex-col gap-2 items-end font-lirrier "
          initial={{ x: 80, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 80, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
        >
          <span style={{

            letterSpacing: '0.4em',
            color: C.goldSoft,
          }}>ARCHIVE</span>
          <h3
            className='text-8xl'

            style={{


              fontWeight: 400,
              color: C.goldDark,
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
            }}>
            Collected quietly.
          </h3>
          <p style={{

            fontSize: '0.75rem',
            fontStyle: 'italic',
            color: 'rgba(78,74,14,0.5)',
            marginTop: '4px',
            maxWidth: '220px',
          }}>
            No announcements. No milestones. Just moments.
          </p>
        </motion.div>
      </motion.div>

      {/* Stack — enters after decorative reveal */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8" style={{ position: 'relative', zIndex: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.92 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: 'drop-shadow(0 24px 64px rgba(132,123,26,0.1))' }}>
          <div className="h-[500px] w-[350px]">
            <Stack />
          </div>
        </motion.div>

        {/* Breathing loop caption */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <div className="flex items-center gap-3">
            <div style={{ width: 30, height: 1, background: `linear-gradient(to right, transparent, ${C.goldMid})` }} />
            <Diamond size={3} opacity={0.2} />
            <div style={{ width: 30, height: 1, background: `linear-gradient(to left, transparent, ${C.goldMid})` }} />
          </div>
          <motion.p
            animate={{
              opacity: [0.4, 1.0, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              fontFamily: 'monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: C.goldDark,
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            Drag them. Explore them. Keep them.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
export default function GallerySection() {
  const [activeChapter, setActiveChapter] = useState(0);
  const containerRef = useRef(null);



  useGSAP(() => {
    gsap.from('.gallery-title', { y: 60, opacity: 0, duration: 1.2, delay: 0.2, ease: 'power4.out' });
    gsap.from('.gallery-sub', { y: 30, opacity: 0, duration: 0.9, delay: 0.45, ease: 'power3.out' });
    gsap.from('.gallery-rule', { scaleX: 0, duration: 1.1, delay: 0.55, ease: 'power3.inOut', transformOrigin: 'center' });
  });

  return (
    <div ref={containerRef} className="w-full relative overflow-x-hidden" style={{ background: C.bg }}>
      <SnowflakeCursor />
      <ScrollLine />
      <ChapterNav activeChapter={activeChapter} />
      <FloatingParticles />

      {/* Fixed ambient blobs */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-6%', right: '-8%', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle,rgba(210,190,60,0.07) 0%,transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '8%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(230,180,160,0.055) 0%,transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      {/* Connecting path overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <ConnectingPath />
      </div>

      {/* ── Page Hero ── */}
      <div style={{ background: C.s1, position: 'relative', zIndex: 10, overflow: 'hidden', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* Background Image using Next.js Image component */}
        {BG_IMAGES.hero.src && (
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: BG_IMAGES.hero.opacity, position: 'absolute' }}>
            <Image
              src={BG_IMAGES.hero.src}
              alt="Hero Background"
              fill
              priority
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 75%, ${C.s1} 100%)`
              }}
            />
          </div>
        )}

        {/* Hero background rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            <svg width="800" height="300" viewBox="0 0 800 300" fill="none">
              <ellipse cx="400" cy="150" rx="380" ry="120" stroke={C.gold} strokeWidth="0.5" strokeOpacity="0.06" strokeDasharray="8 16" />
            </svg>
          </motion.div>
        </div>

        <div className="w-full flex flex-col items-center gap-4 px-6" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div className="flex items-center gap-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Diamond size={5} opacity={0.25} />
            <span className='' style={{ fontSize: 10, letterSpacing: '0.6em', textTransform: 'uppercase', color: C.goldSoft }}>Gallery</span>
            <Diamond size={5} opacity={0.25} />
          </motion.div>

          <h1 className="gallery-title font-awesome text-[12em] " style={{

            fontWeight: 400, color: C.goldDark,
            letterSpacing: '-0.02em', lineHeight: 1.1, textAlign: 'center',
          }}>
            Gallery Section
          </h1>

          <p className="gallery-sub font-lirrier text-xl" style={{

            color: 'rgba(78,74,14,0.5)', textAlign: 'center', letterSpacing: '0.06em',
            maxWidth: 400, lineHeight: 1.9,
          }}>
            A few frames from a friendship that started with a project and grew into something worth keeping.
          </p>

          <div className="gallery-rule" style={{
            width: '55%', maxWidth: 380, height: 1, marginTop: 4,
            background: `linear-gradient(to right,transparent,${C.goldMid},transparent)`,
          }} />

          {/* Scroll hint */}
          <motion.div className="flex flex-col items-center gap-2 mt-6"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(132,123,26,0.3)' }}>scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
              <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
                <path d="M6,0 L6,12 M2,8 L6,12 L10,8" stroke="rgba(132,123,26,0.35)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ══ SECTION 1 ══ */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Section1 onEnter={setActiveChapter} />
      </div>

      {/* Wave 1→2 */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <WaveSeparator fromColor={C.s1} toColor={C.s2} flip={false} />
      </div>

      {/* ══ SECTION 2 ══ */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Section2 onEnter={setActiveChapter} />
      </div>

      {/* Wave 2→3 */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <WaveSeparator fromColor={C.s2} toColor={C.s3} flip={true} />
      </div>

      {/* ══ SECTION 3 ══ */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Section3 onEnter={setActiveChapter} />
      </div>

      {/* Final tagline */}
      <div style={{ background: C.s3, position: 'relative', zIndex: 10 }}>
        <motion.div className="w-full flex flex-col items-center py-14 gap-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div className="flex items-center gap-4">
            <div style={{ width: 80, height: 1, background: `linear-gradient(to right,transparent,${C.goldMid})` }} />
            <Diamond size={4} opacity={0.22} />
            <div style={{ width: 24, height: 1, background: C.goldLine }} />
            <Diamond size={6} opacity={0.32} />
            <div style={{ width: 24, height: 1, background: C.goldLine }} />
            <Diamond size={4} opacity={0.22} />
            <div style={{ width: 80, height: 1, background: `linear-gradient(to left,transparent,${C.goldMid})` }} />
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.55em', textTransform: 'uppercase', color: 'rgba(132,123,26,0.3)' }}>
            moments worth keeping
          </p>
        </motion.div>
      </div>
    </div>
  );
}