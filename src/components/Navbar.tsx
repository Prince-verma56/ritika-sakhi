// ─── Navbar.tsx ───────────────────────────────────────────────────────────────
// Audio is fully managed by MusicProvider — Navbar only reads/controls state.
// No audio element here → music never stops on route change.
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import { useMusicStore } from './MusicProvider';

const GOLD      = '#847B1A';
const GOLD_DARK = '#4e4a0e';
const GOLD_SOFT = 'rgba(132,123,26,0.45)';
const GOLD_LINE = 'rgba(132,123,26,0.22)';
const GLASS_BG  = 'rgba(254,250,224,0.72)';
const GLASS_BDR = 'rgba(132,123,26,0.14)';

const LEFT_LINKS = [
  { href: '/',        label: 'Home'         },
  { href: '/meet-us', label: 'Meet us'      },
  { href: '/gallery', label: 'Gallery'      },
];
const RIGHT_LINKS = [
  { href: '/gratitude', label: 'Gratitude'    },
  { href: '/memories',  label: 'Memories'     },
  { href: '/about',     label: 'About Ritika' },
];

// ─── Diamond ─────────────────────────────────────────────────────────────────
function Diamond({ size = 5, opacity = 0.5 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10"
      style={{ opacity, flexShrink: 0, display: 'inline-block' }}>
      <polygon points="5,0 10,5 5,10 0,5" fill={GOLD} />
    </svg>
  );
}

// ─── Wave bars ────────────────────────────────────────────────────────────────
const BAR_CONFIGS = [
  { minH: 3, maxH: 18, dur: 0.55, delay: 0    },
  { minH: 5, maxH: 26, dur: 0.42, delay: 0.08 },
  { minH: 4, maxH: 22, dur: 0.60, delay: 0.04 },
  { minH: 6, maxH: 28, dur: 0.38, delay: 0.12 },
  { minH: 3, maxH: 16, dur: 0.50, delay: 0.06 },
];

function WaveBar({ playing, minH, maxH, dur, delay, volume }: {
  playing: boolean; minH: number; maxH: number;
  dur: number; delay: number; volume: number;
}) {
  const aMin = playing ? Math.max(3, minH * volume) : 3;
  const aMax = playing ? Math.max(3, maxH * volume) : 3;
  return (
    <motion.div
      style={{ width: 3, borderRadius: 2, background: `linear-gradient(to top, ${GOLD_DARK}, ${GOLD})`, transformOrigin: 'bottom', flexShrink: 0 }}
      animate={playing && volume > 0
        ? { height: [aMin, aMax, aMin * 1.4, aMax * 0.7, aMin], opacity: [0.65, 1, 0.75, 1, 0.65] }
        : { height: 3, opacity: 0.3 }}
      transition={playing && volume > 0
        ? { duration: dur, delay, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }
        : { duration: 0.45, delay: delay * 0.5, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

function MusicButton({ playing, onToggle, volume }: {
  playing: boolean; onToggle: () => void; volume: number;
}) {
  return (
    <motion.button onClick={onToggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: 40, outline: 'none' }}
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} transition={{ duration: 0.2 }}
    >
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }} exit={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0.18, 0.38, 0.18], scale: [1, 1.18, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: -4, borderRadius: 40, border: '1px solid rgba(132,123,26,0.55)', pointerEvents: 'none' }}
          />
        )}
      </AnimatePresence>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 40, border: '1px solid rgba(132,123,26,0.18)', pointerEvents: 'none', transition: 'border-color 0.3s ease', borderColor: playing ? 'rgba(132,123,26,0.35)' : 'rgba(132,123,26,0.14)' }} />
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: 30, paddingBottom: 2 }}>
        {BAR_CONFIGS.map((cfg, i) => <WaveBar key={i} playing={playing} volume={volume} {...cfg} />)}
      </div>
    </motion.button>
  );
}

function SpeakerIcon({ volume, onClick }: { volume: number; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', display: 'flex', alignItems: 'center', color: GOLD, outline: 'none' }}
      aria-label={volume === 0 ? 'Unmute' : 'Mute'}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {volume === 0 ? (
          <><path d="M11 5L6 9H2v6h4l5 4V5z" fill={GOLD_SOFT}/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></>
        ) : volume < 0.5 ? (
          <><path d="M11 5L6 9H2v6h4l5 4V5z" fill={GOLD_SOFT}/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></>
        ) : (
          <><path d="M11 5L6 9H2v6h4l5 4V5z" fill={GOLD_SOFT}/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></>
        )}
      </svg>
    </button>
  );
}

function MusicController({ playing, onToggle, volume, onVolumeChange }: {
  playing: boolean; onToggle: () => void; volume: number; onVolumeChange: (v: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [prev, setPrev]         = useState(0.5);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expanded) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setExpanded(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [expanded]);

  const handleSpeaker = () => {
    if (volume > 0) { setPrev(volume); onVolumeChange(0); }
    else onVolumeChange(prev > 0 ? prev : 0.5);
  };

  return (
    <motion.div ref={ref}
      className="flex items-center rounded-full p-[3px] relative"
      style={{ background: 'rgba(254,250,224,0.5)', border: '1px solid rgba(132,123,26,0.12)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', zIndex: 50 }}
      onHoverStart={() => setExpanded(true)} onHoverEnd={() => setExpanded(false)} onTouchStart={() => setExpanded(true)}
    >
      <MusicButton playing={playing} onToggle={onToggle} volume={volume} />
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ width: 0, opacity: 0 }} animate={{ width: 92, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', gap: '2px', paddingRight: '6px' }}
          >
            <SpeakerIcon volume={volume} onClick={handleSpeaker} />
            <input type="range" min="0" max="1" step="0.02" value={volume}
              onChange={e => onVolumeChange(parseFloat(e.target.value))}
              style={{ width: '60px', height: '3px', accentColor: GOLD, background: 'rgba(132,123,26,0.2)', borderRadius: '2px', cursor: 'pointer', outline: 'none' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function NavLink({ href, label, isActive, scrolled }: {
  href: string; label: string; isActive: boolean; scrolled: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={href} style={{ position: 'relative', textDecoration: 'none' }}>
      <motion.div className="relative flex flex-col items-center gap-[3px]"
        onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}>
        <AnimatePresence>
          {isActive && (
            <motion.div initial={{ opacity: 0, y: -4, scale: 0 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} style={{ position: 'absolute', top: -10 }}>
              <Diamond size={5} opacity={0.7} />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.span
          animate={{ letterSpacing: hovered ? '0.12em' : isActive ? '0.06em' : '0.04em', color: hovered || isActive ? GOLD_DARK : GOLD }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: scrolled ? '0.78rem' : '0.88rem', fontWeight: isActive ? 500 : 400, textTransform: 'uppercase', display: 'block', whiteSpace: 'nowrap', transition: 'font-size 0.4s ease' }}
        >
          {label}
        </motion.span>
        <div style={{ position: 'relative', width: '100%', height: 1, overflow: 'hidden' }}>
          <motion.div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${GOLD}, rgba(132,123,26,0.35))`, transformOrigin: 'left' }} animate={{ scaleX: isActive ? 1 : 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
          <motion.div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${GOLD_DARK}, ${GOLD})`, transformOrigin: hovered ? 'left' : 'right' }} animate={{ scaleX: hovered ? 1 : 0 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} />
        </div>
      </motion.div>
    </Link>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
export default function Navbar() {
  const pathname  = usePathname();
  const navbarRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // All music state comes from the persistent provider
  const { playing, volume, toggle, setVolume, preloaderFinished } = useMusicStore();

  const isActive = (href: string) => pathname === href;

  // ── Entrance animation ───────────────────────────────────────────────────
  useGSAP(() => {
    if (!preloaderFinished) {
      // Hide all animated elements on initial load so they are invisible behind the preloader
      gsap.set(['.navbar-shell', '.nav-link-left', '.nav-link-right', '.navbar-logo', '.navbar-rule-fill', '.navbar-music-btn'], { opacity: 0 });
      gsap.set('.navbar-rule-fill', { scaleX: 0 });
      return;
    }

    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo('.navbar-shell',     { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out' });
    tl.fromTo('.nav-link-left',    { x: -22, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, '-=0.6');
    tl.fromTo('.nav-link-right',   { x: 22,  opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, '-=0.75');
    tl.fromTo('.navbar-logo',      { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.4)' }, '-=0.9');
    tl.fromTo('.navbar-rule-fill', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.0, ease: 'power3.inOut' }, '-=0.4');
    tl.fromTo('.navbar-music-btn', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.6)' }, '-=0.5');
  }, [preloaderFinished]);

  // ── Scroll hide/show + glass ─────────────────────────────────────────────
  useEffect(() => {
    let lastY = window.scrollY, hidden = false, rafId = 0, pending = false;
    const onScroll = () => {
      if (pending) return; pending = true;
      rafId = requestAnimationFrame(() => {
        pending = false;
        const y = window.scrollY;
        if (!navbarRef.current) { lastY = y; return; }
        setScrolled(y > 40);
        if (y < 50) {
          if (hidden) { gsap.to(navbarRef.current, { y: 0, duration: 0.75, ease: 'power3.out', overwrite: true }); hidden = false; }
          lastY = y; return;
        }
        const d = y - lastY;
        if (Math.abs(d) < 8) { lastY = y; return; }
        if (d > 0 && !hidden) { gsap.to(navbarRef.current, { y: -120, duration: 0.7, ease: 'power3.inOut', overwrite: true }); hidden = true; }
        else if (d < 0 && hidden) { gsap.to(navbarRef.current, { y: 0, duration: 0.72, ease: 'power3.out', overwrite: true }); hidden = false; }
        lastY = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <>
      {/* No <audio> here — lives in MusicProvider */}
      <div ref={navbarRef} className="navbar-shell fixed top-0 left-0 w-full z-[999]"
        style={{ willChange: 'transform', transition: 'background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease', background: scrolled ? GLASS_BG : 'transparent', borderBottom: scrolled ? `1px solid ${GLASS_BDR}` : '1px solid transparent', boxShadow: scrolled ? '0 4px 32px rgba(132,123,26,0.06)' : 'none', backdropFilter: scrolled ? 'blur(16px) saturate(1.2)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.2)' : 'none' }}
      >
        <nav className="w-[92%] lg:w-[80%] mx-auto flex items-center justify-between relative"
          style={{ height: scrolled ? 64 : 80, transition: 'height 0.4s ease' }}>

          <div className="hidden md:flex items-center gap-7 lg:gap-10 flex-1 justify-end pr-10">
            {LEFT_LINKS.map(({ href, label }) => (
              <div key={href} className="nav-link-left">
                <NavLink href={href} label={label} isActive={isActive(href)} scrolled={scrolled} />
              </div>
            ))}
          </div>

          <div className="navbar-logo flex-shrink-0 relative"
            style={{ width: scrolled ? 72 : 96, height: scrolled ? 72 : 96, transition: 'width 0.4s ease, height 0.4s ease' }}>
            <motion.div className="absolute inset-0 pointer-events-none"
              style={{ border: '1px dashed rgba(132,123,26,0.2)', borderRadius: '50%' }}
              animate={playing ? { rotate: 360 } : { rotate: 0 }}
              transition={playing ? { duration: 12, repeat: Infinity, ease: 'linear' } : { duration: 0.6 }}
            />
            <Image src="https://res.cloudinary.com/dtslaveid/image/upload/v1780527053/R_letter_logo_zl3z0d.png"
              alt="Ritika Logo" fill priority sizes="96px" className="object-contain" style={{ padding: 4 }} />
          </div>

          <div className="hidden md:flex items-center gap-7 lg:gap-10 flex-1 justify-start pl-10">
            {RIGHT_LINKS.map(({ href, label }) => (
              <div key={href} className="nav-link-right">
                <NavLink href={href} label={label} isActive={isActive(href)} scrolled={scrolled} />
              </div>
            ))}
            <div className="navbar-music-btn ml-2">
              <MusicController playing={playing} onToggle={toggle} volume={volume} onVolumeChange={setVolume} />
            </div>
          </div>

          <div className="md:hidden flex items-center gap-3 absolute right-0">
            <div className="navbar-music-btn">
              <MusicController playing={playing} onToggle={toggle} volume={volume} onVolumeChange={setVolume} />
            </div>
            <MobileMenu pathname={pathname} />
          </div>
        </nav>

        <div style={{ height: 1, overflow: 'hidden', opacity: scrolled ? 0 : 1, transition: 'opacity 0.4s ease' }}>
          <div className="navbar-rule-fill"
            style={{ height: '100%', width: '80%', margin: '0 auto', background: `linear-gradient(to right, transparent, ${GOLD_LINE}, ${GOLD_SOFT}, ${GOLD_LINE}, transparent)`, transformOrigin: 'center' }} />
        </div>
      </div>

      {pathname !== '/' && <div style={{ height: 80 }} />}
    </>
  );
}

// ─── Mobile menu ──────────────────────────────────────────────────────────────
function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}
        aria-label="Toggle menu">
        {[0, 1, 2].map(i => (
          <motion.div key={i}
            style={{ width: 22, height: 1, background: GOLD, borderRadius: 1, transformOrigin: 'center' }}
            animate={open ? (i === 0 ? { rotate: 45, y: 6 } : i === 1 ? { opacity: 0, scaleX: 0 } : { rotate: -45, y: -6 }) : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scaleY: 0.9 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -10, scaleY: 0.9 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', top: '100%', right: 0, minWidth: 180, background: 'rgba(254,250,224,0.97)', border: `1px solid ${GLASS_BDR}`, borderRadius: 12, boxShadow: '0 12px 40px rgba(132,123,26,0.12)', backdropFilter: 'blur(14px)', overflow: 'hidden', transformOrigin: 'top right', marginTop: 8, zIndex: 1000 }}
          >
            {ALL_LINKS.map(({ href, label }, i) => (
              <motion.div key={href} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, duration: 0.3 }}>
                <Link href={href} onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: i < ALL_LINKS.length - 1 ? '1px solid rgba(132,123,26,0.08)' : 'none', background: pathname === href ? 'rgba(132,123,26,0.06)' : 'transparent' }}>
                    {pathname === href && <Diamond size={4} opacity={0.6} />}
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: pathname === href ? GOLD_DARK : GOLD, fontWeight: pathname === href ? 500 : 400 }}>
                      {label}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
            <div style={{ padding: '8px 0', display: 'flex', justifyContent: 'center' }}>
              <Diamond size={4} opacity={0.2} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
