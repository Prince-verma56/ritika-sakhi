'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'motion/react';

type HoverBehavior = 'slowDown' | 'speedUp' | 'pause' | 'goBonkers' | string;

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: HoverBehavior;
  className?: string;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  const startSpin = (duration: number, scale = 0.9) => {
    const start = rotation.get();
    controls.start({
      rotate: [start, start + 360],
      scale,
      transition: {
        rotate: { ease: 'linear', duration, repeat: Infinity },
        scale: { type: 'spring', damping: 20, stiffness: 300 },
      },
    });
  };

  useEffect(() => {
    startSpin(spinDuration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinDuration, text]);

  const handleHoverStart = () => {
    switch (onHover) {
      case 'slowDown': startSpin(spinDuration * 2); break;
      case 'speedUp': startSpin(spinDuration / 4); break;
      case 'pause': controls.stop(); break;
      case 'goBonkers': startSpin(spinDuration / 20, 0.8); break;
      default: break;
    }
  };

  const handleHoverEnd = () => startSpin(spinDuration);

  return (
    <motion.div
      className={`circular-text relative ${className}`}
      style={{ rotate: rotation }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;
        return (
          <span
            key={i}
            className="absolute inline-block inset-0 text-2xl transition-all duration-500"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
