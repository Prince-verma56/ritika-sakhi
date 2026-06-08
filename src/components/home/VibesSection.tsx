'use client';

import React, { RefObject, useRef, useState, useEffect, useMemo } from 'react';
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

// ─── Seamless Top & Bottom SVG Waves with Shadows & Blending ──────────────────
const SECTION_BG_COLOR = '#fefae0';

function TopWave() {
  return (
    <div className="absolute top-0 left-0 w-full pointer-events-none" style={{ height: '9vw', minHeight: 90, zIndex: 30, transform: 'translateY(-1px)' }}>
      {/* Added a drop-shadow to create depth and connection with the background below */}
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full block" style={{ filter: 'drop-shadow(0px 12px 18px rgba(132,123,26,0.18))' }}>
        {/* Soft, semi-transparent transition wave */}
        <path d="M0,0 L1440,0 L1440,80 C1260,80 1140,24 720,24 C300,24 180,80 0,80 Z" fill="rgba(254, 250, 224, 0.45)" />
        {/* Solid background wave */}
        <path d="M0,0 L1440,0 L1440,60 C1260,60 1140,4 720,4 C300,4 180,60 0,60 Z" fill={SECTION_BG_COLOR} />
        {/* Subtle gold stroke */}
        <path d="M0,60 C180,60 300,4 720,4 C1140,4 1260,60 1440,60" stroke="rgba(132,123,26,0.2)" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

function BottomWave() {
  return (
    <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ height: '9vw', minHeight: 90, zIndex: 30, transform: 'translateY(1px)' }}>
      {/* Reverse drop shadow for the bottom layer */}
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full block transform rotate-180" style={{ filter: 'drop-shadow(0px -12px 18px rgba(132,123,26,0.18))' }}>
        {/* Soft, semi-transparent transition wave */}
        <path d="M0,0 L1440,0 L1440,80 C1260,80 1140,24 720,24 C300,24 180,80 0,80 Z" fill="rgba(254, 250, 224, 0.45)" />
        {/* Solid background wave */}
        <path d="M0,0 L1440,0 L1440,60 C1260,60 1140,4 720,4 C300,4 180,60 0,60 Z" fill={SECTION_BG_COLOR} />
        {/* Subtle gold stroke */}
        <path d="M0,60 C180,60 300,4 720,4 C1140,4 1260,60 1440,60" stroke="rgba(132,123,26,0.2)" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

// ─── Interactive Cards ────────────────────────────────────────────────────────
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

  useEffect(() => {
    if (!sectionInView || hasAnimated || !tiltRef.current) return;
    setHasAnimated(true);

    gsap.fromTo(
      tiltRef.current,
      { opacity: 0, y: 100, scale: 0.8, rotate: img.initialRotate * 2 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: img.initialRotate,
        duration: 1.2,
        delay: 0.15 * index,
        ease: 'back.out(1.4)',
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
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      rotate: img.initialRotate,
      duration: 0.7,
      ease: 'elastic.out(1, 0.55)',
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
          gsap.to(tiltRef.current, {
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            rotate: img.initialRotate,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
          });
        }
      }}
      style={{ zIndex: isDragging ? 50 : 20, position: 'relative' }}
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
          opacity: sectionInView ? undefined : 0,
        }}
      >
        <div
          className="w-full h-full rounded-2xl overflow-hidden relative"
          style={{ border: '2.5px solid rgba(255,255,255,0.7)', position: 'relative' }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="300px"
            priority={img.priority}
            className="object-cover"
            draggable={false}
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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function VibesSection({ boxRef }: VibesSectionProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sentinelRef, { once: true, amount: 0.2 });

  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsContainerRef, { once: true, margin: "-20% 0px" });

  const highlightedWords = useMemo(() => ["Ritika 💫", "Sakhi 🦋", "Birthday 🎂", "Happy 😊", "Genuine 💕", "Warm 🔥", "Bubbly 💖"], []);

  return (
    <div className="page4 w-full relative bg-no-repeat bg-cover overflow-hidden" style={{ minHeight: '100vh', position: 'relative' }}>

      {/* Shadows and translucent overlapping layers for seamless blending */}
      <TopWave />
      <BottomWave />

      <div ref={sentinelRef} className="absolute top-0 left-0 w-full h-1 pointer-events-none" style={{ zIndex: -1 }} />

      <Image
        src="https://images.unsplash.com/photo-1602615576820-ea14cf3e476a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        loading="lazy"
        alt="Flower background"
        fill
        sizes="100vw"
        className="object-cover"
        style={{ zIndex: 0 }}
      />

      {/* FallingText Layer */}
      <div className="falling-text absolute left-0 top-0 h-full w-full" style={{ zIndex: 10, pointerEvents: 'auto' }}>
        <FallingText
          text="Happy 😊 Birthday 🎂 Ritika 💫 Sakhi 🦋 Bubbly 💖 Genuine 💕 Warm 🔥  Sweet 🍬 Cute 🥰 Smart 🧠 Kind 🤝  🌈 Joyful 🎉 Lively ⚡ Gentle 🕊️ Heartfelt 💝"
          highlightWords={highlightedWords}
          highlightClass="text-[#847B1A] font-serif font-bold border border-[#847B1A]/25 bg-white/75 px-4 py-2.5 rounded-full shadow-md backdrop-blur-md transition-transform duration-200"
          wordClass="text-[#a39732] font-mono font-semibold opacity-90 border border-[#a39732]/15 bg-white/45 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm transition-transform duration-200"
          fontSize="clamp(1rem, 2.2vw, 1.8rem)"
          trigger="scroll"
        />
      </div>

      {/* Header Container */}
      <div className="relative flex flex-col items-center pt-32 pb-4" style={{ zIndex: 10 }}>
        <motion.div
          className="flex items-center gap-4 mb-3"
          initial={{ opacity: 0, y: -12 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div style={{ width: 50, height: 1, background: 'linear-gradient(to right, transparent, rgba(132,123,26,0.5))' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.45em', color: 'rgba(132,123,26,0.8)', textTransform: 'uppercase' }}>
            her world
          </span>
          <div style={{ width: 50, height: 1, background: 'linear-gradient(to left, transparent, rgba(132,123,26,0.5))' }} />
        </motion.div>

        <motion.h1
          className="font-awesome uppercase select-none"
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
            delay: 0.1,
            ease: 'easeOut',
            scale: { times: [0, 0.65, 1], ease: ['easeOut', 'easeInOut'] },
          }}
        >
          Vibes
        </motion.h1>
      </div>

      {/* 4-Set Responsive Grid Block */}
      <div
        ref={boxRef}
        className="layout-area w-full flex flex-col justify-center items-center pt-16 pb-36 px-4"
        style={{ position: 'relative', zIndex: 20, perspective: '1000px' }}
      >
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl place-items-center mb-8 p-4"
        >
          {DRAG_IMAGES.map((img, i) => (
            <TiltDragCard
              key={img.src}
              img={img}
              boxRef={boxRef}
              index={i}
              sectionInView={cardsInView}
            />
          ))}
        </div>

        <p
          className="text-[10px] tracking-[0.5em] uppercase select-none pointer-events-none mt-4"
          style={{ color: 'rgba(140,110,60,0.8)', zIndex: 5, fontWeight: 600 }}
        >
          hold &amp; drag the photos
        </p>
      </div>
    </div>
  );
}