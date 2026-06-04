'use client';

import React, { RefObject, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import FallingText from '@/components/FallingText/FallingText';
import { motion, useInView } from 'motion/react';
import gsap from 'gsap';

interface VibesSectionProps {
  boxRef: RefObject<HTMLDivElement | null>;
}

const DRAG_IMAGES = [
  {
    src: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780512376/ChatGPT_Image_Jun_3_2026_06_30_18_PM_t7qqnp.png',
    alt: 'Image 1',
    priority: true,
    initialRotate: -4,
  },
  {
    src: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780515073/ChatGPT_Image_Jun_4_2026_12_39_54_AM_cfreb3.png',
    alt: 'Image 2',
    initialRotate: 3,
  },
  {
    src: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780515074/ChatGPT_Image_Jun_4_2026_12_38_44_AM_zakuji.png',
    alt: 'Image 3',
    initialRotate: -2,
  },
  {
    src: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780515077/ChatGPT_Image_Jun_4_2026_12_29_45_AM_rp7ljf.png',
    alt: 'Image 4',
    initialRotate: 5,
  },
];

// ─── 3D Tilt + Drag Card ──────────────────────────────────────────────────────
function TiltDragCard({
  img,
  boxRef,
  index,
  sectionInView,
}: {
  img: (typeof DRAG_IMAGES)[0];
  boxRef: RefObject<HTMLDivElement | null>;
  index: number;
  sectionInView: boolean;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Timeline: run entrance only once, after sectionInView turns true
  useEffect(() => {
    if (!sectionInView || hasAnimated || !tiltRef.current) return;
    setHasAnimated(true);

    // Stagger: each card waits a bit longer than the previous
    // Yoyo: scale overshoots then settles — back.out gives the bounce
    gsap.fromTo(
      tiltRef.current,
      { opacity: 0, y: 70, scale: 0.82, rotate: img.initialRotate * 2 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 1,
        delay: 0.6 + 0.48 * index,   // heading=0, eyebrow=0.2, cards start at 0.6
        ease: 'back.out(1.6)',         // yoyo-style overshoot
      }
    );
  }, [sectionInView, hasAnimated, index, img.initialRotate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || !tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const xOffset = e.clientX - (rect.left + rect.width / 2);
    const yOffset = e.clientY - (rect.top + rect.height / 2);
    gsap.to(tiltRef.current, {
      rotationY: xOffset / 8,
      rotationX: -yOffset / 8,
      transformPerspective: 700,
      scale: 1.06,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (!tiltRef.current) return;
    gsap.to(tiltRef.current, {
      rotationY: 0, rotationX: 0, scale: 1,
      duration: 0.7, ease: 'elastic.out(1, 0.55)',
    });
  };

  return (
    <motion.div
      drag
      dragConstraints={boxRef}
      dragElastic={0.12}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        if (tiltRef.current) {
          gsap.to(tiltRef.current, { rotationY: 0, rotationX: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        }
      }}
      style={{ rotate: img.initialRotate, zIndex: isDragging ? 50 : 20, position: 'relative' }}
      whileDrag={{ scale: 1.08 }}
    >
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          cursor: isDragging ? 'grabbing' : 'grab',
          width: 280,
          height: 320,
          filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.22))',
          // Start hidden until GSAP triggers
          opacity: sectionInView ? undefined : 0,
        }}
      >
        <div
          className="w-full h-full rounded-2xl overflow-hidden relative"
          style={{ border: '2.5px solid rgba(255,255,255,0.7)' }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="300px"
            priority={img.priority}
            className="object-cover"
            draggable={false}
            style={{ zIndex: 0 }}
          />
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              zIndex: 1,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 55%)',
              opacity: isHovering ? 1 : 0,
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 px-3 py-2 transition-opacity duration-300"
            style={{
              zIndex: 2,
              background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
              opacity: isHovering ? 1 : 0,
            }}
          >
            <p className="text-white text-[10px] font-light tracking-[0.3em] uppercase">drag me ✦</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Wave separator ───────────────────────────────────────────────────────────
function WaveSeparator() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 110, zIndex: 8, pointerEvents: 'none' }}>
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <path d="M0,55 C240,100 480,10 720,55 C960,100 1200,15 1440,55 L1440,110 L0,110 Z" fill="rgba(255,220,200,0.4)" />
      </svg>
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <path d="M0,70 C360,20 720,95 1080,48 C1260,28 1380,78 1440,70 L1440,110 L0,110 Z" fill="rgba(255,200,170,0.5)" />
      </svg>
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <path d="M0,86 C180,60 360,110 540,80 C720,48 900,102 1080,78 C1260,55 1380,94 1440,86 L1440,110 L0,110 Z" fill="rgba(253,235,220,0.9)" />
      </svg>
      {[
        { left: '12%', delay: '0s', size: 5 },
        { left: '33%', delay: '0.5s', size: 4 },
        { left: '50%', delay: '0.9s', size: 6 },
        { left: '68%', delay: '0.3s', size: 4 },
        { left: '88%', delay: '0.7s', size: 5 },
      ].map((dot, i) => (
        <div key={i} className="absolute rounded-full animate-ping" style={{
          left: dot.left, top: '42%', width: dot.size, height: dot.size,
          background: 'rgba(200,120,80,0.5)', animationDelay: dot.delay, animationDuration: '2.4s',
        }} />
      ))}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
        <span className="text-[10px] tracking-[0.5em] uppercase font-light select-none"
          style={{ color: 'rgba(160,100,60,0.6)' }}>
          ✦ &nbsp; memories ahead &nbsp; ✦
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function VibesSection({ boxRef }: VibesSectionProps) {
  // Single sentinel — when the section top enters viewport, kick off the timeline
  const sentinelRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sentinelRef, { once: true, amount: 0.2 });

  return (
    <div className="page4 w-full relative bg-no-repeat bg-cover">

      {/* Invisible sentinel at the very top of section */}
      <div ref={sentinelRef} className="absolute top-0 left-0 w-full h-1 pointer-events-none" style={{ zIndex: -1 }} />

      {/* Background — z-index 0 */}
      <Image
        src="/flowers/Flower_bg.jpg"
        loading="lazy"
        alt="Flower background"
        fill
        sizes="100vw"
        className="object-cover"
        style={{ zIndex: 0 }}
      />

      {/* FallingText — z-index 2, pointer-events auto */}
      <div className="falling-text absolute left-0 top-0 h-full w-full" style={{ zIndex: 2, pointerEvents: 'auto' }}>
        <FallingText
          text="Happy 😊 Birthday 🎂 Ritika 💫 Sakhi 🦋 Bubbly 💖 Genuine 💕 Warm 🔥   One-of-a-kind 🌟 Sweet 🍬 Cute 🥰 Smart 🧠 Kind 🤝  🌈 Joyful 🎉 Lively ⚡ Gentle 🕊️ Heartfelt 💝"
          highlightWords={["Ritika 💫", "Sakhi 🦋", "Birthday 🎂", "Happy 😊", "Genuine 💕", "Warm 🔥", "Bubbly 💖"]}
          highlightClass="text-[#847B1A] font-serif font-bold border border-[#847B1A]/25 bg-white/75 px-4 py-2.5 rounded-full shadow-md backdrop-blur-md transition-transform duration-200"
          wordClass="text-[#a39732] font-mono font-semibold opacity-90 border border-[#a39732]/15 bg-white/45 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm transition-transform duration-200"
          fontSize="clamp(1.1rem, 2.5vw, 2rem)"
          trigger="scroll"
        />
      </div>

      {/*
        ── TIMELINE ORDER ──
        1. Eyebrow label  (delay 0,    duration 0.5)
        2. "VIBES" word   (delay 0.2,  duration 0.65)  ← yoyo: scale 0.7 → 1.04 → 1
        3. Bottom rule    (delay 0.45, duration 0.5)
        4. Cards          (delay 0.6–1.1, staggered, back.out bounce)
        All triggered once sectionInView = true.
      */}
      <div className="relative flex flex-col items-center pt-10 pb-4" style={{ zIndex: 10 }}>

        {/* 1. Eyebrow */}
        <motion.div
          className="flex items-center gap-4 mb-3"
          initial={{ opacity: 0, y: -12 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0, ease: 'easeOut' }}
        >
          <div style={{ width: 50, height: 1, background: 'linear-gradient(to right, transparent, rgba(132,123,26,0.5))' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.45em', color: 'rgba(132,123,26,0.6)', textTransform: 'uppercase' }}>
            her world
          </span>
          <div style={{ width: 50, height: 1, background: 'linear-gradient(to left, transparent, rgba(132,123,26,0.5))' }} />
        </motion.div>

        {/* 2. VIBES — yoyo scale overshoot */}
        <motion.h1
          className="font-serif uppercase select-none"
          style={{
            fontSize: 'clamp(4.5rem, 10vw, 9rem)',
            color: '#847B1A',
            textShadow: '0 2px 32px rgba(255,220,160,0.55), 0 1px 0 rgba(255,255,255,0.4)',
            lineHeight: 1,
            letterSpacing: '0.18em',
          }}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={sectionInView ? { opacity: 1, scale: [0.7, 1.06, 1], y: 0 } : {}}
          transition={{
            duration: 0.75,
            delay: 0.2,
            ease: 'easeOut',
            scale: { times: [0, 0.65, 1], ease: ['easeOut', 'easeInOut'] },
          }}
        >
          Vibes
        </motion.h1>

        {/* 3. Diamond rule — draws from centre outward */}
        <motion.div
          className="flex items-center gap-3 mt-3"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={sectionInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        >
          <div style={{ width: 60, height: 1, background: 'linear-gradient(to right, transparent, rgba(132,123,26,0.45))' }} />
          <svg width="10" height="10" viewBox="0 0 10 10">
            <polygon points="5,0 10,5 5,10 0,5" fill="rgba(132,123,26,0.55)" />
          </svg>
          <div style={{ width: 60, height: 1, background: 'linear-gradient(to left, transparent, rgba(132,123,26,0.45))' }} />
        </motion.div>
      </div>

      {/* 4. Cards — each staggered via GSAP inside TiltDragCard */}
      <div
        ref={boxRef}
        className="layout-area w-full flex justify-center items-center py-10 px-4"
        style={{ position: 'relative', zIndex: 20, perspective: '1000px' }}
      >
        <div className="grid grid-cols-2 gap-8 p-8">
          {DRAG_IMAGES.map((img, i) => (
            <TiltDragCard
              key={img.src}
              img={img}
              boxRef={boxRef}
              index={i}
              sectionInView={sectionInView}
            />
          ))}
        </div>

        <p
          className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] uppercase select-none pointer-events-none"
          style={{ color: 'rgba(140,110,60,0.45)', zIndex: 5 }}
        >
          hold &amp; drag the photos
        </p>
      </div>

      <WaveSeparator />
    </div>
  );
}