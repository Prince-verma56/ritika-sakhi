'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';

// ─── STATIC CONFIGURATION (Moved outside component to save memory) ───────────
const PETALS_DATA = [
  { delay: 0, left: '55%', size: 16 },
  { delay: 1.5, left: '65%', size: 13 },
  { delay: 2.8, left: '75%', size: 18 },
  { delay: 0.7, left: '82%', size: 14 },
  { delay: 3.5, left: '90%', size: 12 },
];

// ─── Optimized Floating Petal Component ───────────────────────────────────────
function Petal({ delay, left, size }: { delay: number; left: string; size: number }) {
  return (
    <motion.div
      className="absolute top-0 pointer-events-none select-none"
      style={{ 
        left, 
        fontSize: size, 
        zIndex: 5,
        willChange: 'transform, opacity' // Promotes petals to their own GPU layer
      }}
      initial={{ y: -40, opacity: 0, rotate: 0 }}
      animate={{
        y: ['0vh', '110vh'],
        opacity: [0, 0.7, 0.7, 0],
        rotate: [0, 180, 360],
        x: [0, 28, -18, 8],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      🌸
    </motion.div>
  );
}

// ─── Optimized Birthday Title Component ───────────────────────────────────────
function BirthdayTitle() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="relative flex flex-col items-center z-10 pt-8 pb-6">
      <motion.div
        className="h-px bg-[#847B1A] mb-4"
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: '100px', opacity: 0.45 } : {}}
        transition={{ duration: 0.7 }}
      />

      <div className="flex gap-[0.1em] overflow-hidden">
        {'HAPPY'.split('').map((char, i) => (
          <motion.span
            key={i}
            className="font-serif leading-none text-[#5a6e1a] tracking-widest"
            style={{ 
              fontSize: 'clamp(3rem,7vw,6.5rem)',
              willChange: 'transform, opacity' // Prevents layout recalculation drops
            }}
            initial={{ y: 70, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      <div className="flex gap-[0.06em] overflow-hidden -mt-1">
        {'BIRTHDAY'.split('').map((char, i) => (
          <motion.span
            key={i}
            className="font-serif leading-none text-[#847B1A] tracking-[0.07em]"
            style={{ 
              fontSize: 'clamp(3.5rem,9vw,8rem)',
              willChange: 'transform, opacity'
            }}
            initial={{ y: -70, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.28 + 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="h-[1px] bg-[#847B1A] mt-4"
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: '100px', opacity: 0.45 } : {}}
        transition={{ duration: 0.7, delay: 0.55 }}
      />
    </div>
  );
}

// ─── Optimized Typewriter Message Component ──────────────────────────────────
function EndMessage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const text = 'All of This — Just for You Buddy ..';

  return (
    <div ref={ref} className="flex justify-center flex-wrap px-4">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="font-mono font-semibold text-white/90"
          style={{ 
            fontSize: 'clamp(0.85rem,2vw,1.3rem)',
            willChange: 'transform, opacity'
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.03, delay: 0.4 + i * 0.042, ease: 'easeOut' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FinalSection() {
  const MEDIA_TYPE: string = 'video'; 
  const IMAGE_SRC = 'https://res.cloudinary.com/dtslaveid/image/upload/v1780519359/ChatGPT_Image_Jun_4_2026_02_12_14_AM_jabxdm.png';
  const VIDEO_SRC = 'https://res.cloudinary.com/dtslaveid/video/upload/v1780591185/Start_exactly_from_the_origina_yxqixr.mp4'; 

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const isMediaInView = useInView(containerRef, { amount: 0.3 }); // Lowered slightly for smoother entrance timing

  useEffect(() => {
    if (MEDIA_TYPE === 'video' && videoRef.current) {
      if (isMediaInView) {
        videoRef.current.play().catch((err) => console.log('Autoplay prevented:', err));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isMediaInView, MEDIA_TYPE]);

  return (
    <>
      <div style={{ width: '100%', height: 6, background: 'rgba(253,235,220,0.9)', marginBottom: -1 }} />

      <div
        className="page5 w-full relative overflow-hidden"
        style={{
          backgroundImage: "url('/backgrounds/Bg2.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'translateZ(0)', // Locks background to canvas
        }}
      >
        {PETALS_DATA.map((p, i) => <Petal key={i} {...p} />)}

        <div className="relative z-10 flex flex-col items-center">
          <BirthdayTitle />

          <div className="w-full flex flex-row items-start gap-0 pb-14">
            {/* Left Column: GIF Container */}
            <div className="shrink-0 flex items-end self-end" style={{ width: 'clamp(120px, 16vw, 260px)' }}>
              <div
                className='absolute top-[-3vw] left-[-20vw] scale-60'
                style={{
                  width: '100%',
                  height: 'clamp(200px, 26vw, 340px)',
                  backgroundImage: "url('/Videos/AnimationFl.gif')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  willChange: 'transform' // Prevents layout shifts from the absolute layout
                }}
              />
            </div>

            {/* Centre: Main Frame */}
            <div className="flex-1 flex justify-center items-start px-4">
              <motion.div
                ref={containerRef}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  width: 'clamp(450px, 68vw, 1000px)',
                  height: 'clamp(420px, 60vh, 660px)',
                  border: '2px solid rgba(255,255,255,0.65)',
                  boxShadow: '0 28px 70px rgba(80,55,25,0.22)',
                  willChange: 'transform, opacity', // CRITICAL: Promotes frame scaling to GPU layer
                  transform: 'translateZ(0)', // Forces distinct rendering composition context
                  position: 'relative'
                }}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} // Snappier, high-performance curve
              >
                {MEDIA_TYPE === 'image' ? (
                  <Image
                    src={IMAGE_SRC}
                    alt="Ritika"
                    fill
                    priority
                    sizes="(max-width: 868px) 100vw, 70vw"
                    className="object-cover object-top"
                    style={{ zIndex: 0 }}
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={VIDEO_SRC}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{ zIndex: 0, transform: 'translateZ(0)' }}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                )}

                {/* Vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    zIndex: 1,
                    background: 'radial-gradient(ellipse at center, transparent 45%, rgba(60,35,15,0.18) 100%)',
                  }}
                />

                {/* Bottom Overlay Info */}
                <div
                  className="absolute bottom-0 left-0 right-0 pb-7 pt-16 flex flex-col items-center gap-2"
                  style={{
                    zIndex: 2,
                    background: 'linear-gradient(to top, rgba(15,10,5,0.62) 0%, transparent 100%)',
                  }}
                >
                  <EndMessage />
                  <motion.div
                    className="h-px bg-white/35 mt-1"
                    initial={{ width: 0 }}
                    whileInView={{ width: 72 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Spacer */}
            <div className="shrink-0" style={{ width: 'clamp(120px, 16vw, 260px)' }} />
          </div>
        </div>
      </div>
    </>
  );
}