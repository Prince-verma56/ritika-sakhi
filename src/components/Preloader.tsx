'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

const STEPS = [0, 12, 28, 45, 62, 78, 91, 100];
const STEP_MS = 280; 

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [startLift, setStartLift] = useState(false);

  useEffect(() => {
    if (stepIdx < STEPS.length) {
      const timer = setTimeout(() => {
        setProgress(STEPS[stepIdx]);
        setStepIdx((prev) => prev + 1);
      }, STEP_MS);
      return () => clearTimeout(timer);
    } else {
      const fadeOutContentTimer = setTimeout(() => {
        setIsExiting(true);
        
        const liftTimer = setTimeout(() => {
          setStartLift(true);
          if (onComplete) {
            setTimeout(onComplete, 1000); 
          }
        }, 300);
        return () => clearTimeout(liftTimer);
      }, 500);

      return () => clearTimeout(fadeOutContentTimer);
    }
  }, [stepIdx, onComplete]);

  // Pad to ensure consistent string formatting layout tracking
  const progStr = progress.toString().padStart(2, '0');

  return (
    <AnimatePresence>
      {!startLift && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col justify-center items-center overflow-hidden"
          style={{ backgroundColor: '#FCFAF2', fontFamily: 'Georgia, serif' }}
          initial={{ y: 0 }}
          exit={{ 
            y: '-100vh',
            transition: { duration: 1.1, ease: [0.85, 0, 0.15, 1] } 
          }}
        >
          {/* Subtle Fine Grain Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Top Polish Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(132,123,26,0.3), transparent)' }} />

          {/* ── CENTRAL ORBITAL GRAPHIC ── */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[55%] flex flex-col items-center gap-6"
            animate={isExiting ? { opacity: 0, scale: 0.92 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="relative w-[160px] h-[160px]">
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed"
                style={{ borderColor: 'rgba(132,123,26,0.35)' }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 32, ease: 'linear' }}
              />
              <div className="absolute inset-[12px] rounded-full border" style={{ borderColor: 'rgba(132,123,26,0.2)' }} />
              
              <div className="absolute inset-[22px] rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: 'rgba(132,123,26,0.06)' }}>
                <Image
                  src="https://res.cloudinary.com/dtslaveid/image/upload/v1780527053/R_letter_logo_zl3z0d.png"
                  alt="R"
                  width={90}
                  height={90}
                  className="object-contain w-[82%] h-[82%]"
                  priority
                />
              </div>

              <motion.div
                className="absolute top-0 left-1/2 w-[6px] h-[6px] rounded-full"
                style={{
                  backgroundColor: '#847B1A',
                  marginLeft: '-3px',
                  marginTop: '-3px',
                  boxShadow: '0 0 8px 2px rgba(132,123,26,0.4)',
                  transformOrigin: '3px 83px',
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              />
            </div>

            <div className="flex items-center gap-3 mt-1">
              <div className="h-[1px] w-[30px]" style={{ backgroundColor: 'rgba(132,123,26,0.3)' }} />
              <div className="w-[7px] h-[7px] rotate-45 opacity-80" style={{ backgroundColor: '#847B1A' }} />
              <div className="h-[1px] w-[30px]" style={{ backgroundColor: 'rgba(132,123,26,0.3)' }} />
            </div>
            <span className="text-[0.68rem] tracking-[0.32em] uppercase font-medium" style={{ color: 'rgba(132,123,26,0.75)' }}>
              Loading Experience
            </span>
          </motion.div>

          {/* ── MINIMAL TIMELINE PROGRESS BAR ── */}
          <motion.div 
            className="absolute bottom-[110px] left-8 right-8 md:left-16 md:right-16 h-[1px]" 
            style={{ backgroundColor: 'rgba(132,123,26,0.15)' }}
            animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute top-0 left-0 h-full"
              style={{ background: 'linear-gradient(to right, rgba(132,123,26,0.3), #847B1A)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="absolute top-[-2px] w-[5px] h-[5px] rounded-full transform -translate-x-[2px]"
              style={{ backgroundColor: '#847B1A', boxShadow: '0 0 8px 2px rgba(132,123,26,0.4)' }}
              animate={{ left: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          {/* ── MODERN FLOATING BOTTOM INTERFACE ── */}
          <motion.div 
            className="absolute bottom-8 md:bottom-12 left-0 right-0 flex items-end justify-between px-8 md:px-16"
            animate={isExiting ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            {/* Brand Logo Info Section */}
            <div className="flex items-center gap-3 mb-1">
              <div className="w-[38px] h-[38px] rounded-full overflow-hidden border flex items-center justify-center bg-white/40 backdrop-blur-sm" style={{ borderColor: 'rgba(132,123,26,0.3)' }}>
                <Image
                  src="https://res.cloudinary.com/dtslaveid/image/upload/v1780527053/R_letter_logo_zl3z0d.png"
                  alt="Ritika"
                  width={34}
                  height={34}
                  className="object-contain w-full h-full p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.75rem] font-semibold tracking-[0.18em] uppercase" style={{ color: '#847B1A' }}>
                  Ritika
                </span>
                <span className="text-[0.55rem] tracking-[0.1em] uppercase opacity-60" style={{ color: '#847B1A' }}>
                  A Birthday Tribute
                </span>
              </div>
            </div>

            {/* FIXED & STRUCTURED PROGRESS COUNTER CONTAINER */}
            <div 
              className="flex items-end justify-end select-none overflow-hidden h-[4.5rem] md:h-[6rem]" 
              style={{ 
                color: '#847B1A', 
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontVariantNumeric: 'tabular-nums' // Ensures numbers don't dance or shift layout shifts
              }}
            >
              {progStr.split('').map((digit, i) => (
                /* Dynamic fixed spacing width guarantees the block layout can never collapse */
                <div key={i} className="relative w-[34px] md:w-[46px] h-full flex justify-center items-end">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={digit}
                      className="absolute bottom-0 text-[4.2rem] md:text-[5.5rem] font-light leading-none tracking-normal text-center"
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '-100%', opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {digit}
                    </motion.span>
                  </AnimatePresence>
                </div>
              ))}
              
              {/* Isolated Percentage Symbol Block */}
              <span className="text-[1.6rem] md:text-[2rem] font-light ml-1 opacity-70 h-fit mb-1 md:mb-2 inline-block">
                %
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}