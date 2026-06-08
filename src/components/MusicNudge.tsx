// ─── MusicNudge.tsx ───────────────────────────────────────────────────────────
// Beautiful floating pill shown only when Chrome blocks autoplay.
// Disappears the moment the user does anything on the page.
'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useMusicStore } from '@/context/MusicContext';

const GOLD      = '#847B1A';
const GOLD_DARK = '#4e4a0e';
const GOLD_SOFT = 'rgba(132,123,26,0.45)';

export function MusicNudge() {
  const { needsGesture, dismissNudge } = useMusicStore();

  return (
    <AnimatePresence>
      {needsGesture && (
        <motion.div
          key="nudge"
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{    opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onClick={dismissNudge}
          style={{
            position:  'fixed',
            bottom:    36,
            left:      '50%',
            transform: 'translateX(-50%)',
            zIndex:    9999,
            cursor:    'pointer',
            userSelect:'none',
          }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display:       'flex',
              alignItems:    'center',
              gap:           10,
              background:    'rgba(254,250,224,0.95)',
              border:        '1px solid rgba(132,123,26,0.25)',
              borderRadius:  40,
              padding:       '11px 22px 11px 16px',
              backdropFilter:'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow:     '0 8px 40px rgba(132,123,26,0.18), 0 2px 12px rgba(132,123,26,0.10)',
            }}
          >
            {/* Pulsing note */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: GOLD, display: 'flex', alignItems: 'center' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6"  cy="18" r="3" fill={GOLD_SOFT} />
                <circle cx="18" cy="16" r="3" fill={GOLD_SOFT} />
              </svg>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{
                fontFamily:    'Georgia, serif',
                fontSize:      '0.76rem',
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                color:         GOLD_DARK,
                fontWeight:    500,
                whiteSpace:    'nowrap',
              }}>
                Tap anywhere to play music
              </span>
              <span style={{
                fontFamily:    'Georgia, serif',
                fontSize:      '0.66rem',
                letterSpacing: '0.04em',
                color:         'rgba(132,123,26,0.5)',
                whiteSpace:    'nowrap',
              }}>
                A melody for Ritika ♪
              </span>
            </div>

            {/* Dismiss x */}
            <motion.span
              whileHover={{ scale: 1.25, opacity: 1 }}
              onClick={(e) => { e.stopPropagation(); dismissNudge(); }}
              style={{
                opacity:    0.38,
                color:      GOLD,
                fontSize:   '0.72rem',
                marginLeft: 4,
                lineHeight: 1,
                cursor:     'pointer',
              }}
            >
              ✕
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
