'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(Observer);

interface ScrollItem {
  content: React.ReactNode;
}

interface InfiniteScrollProps {
  width?: string;
  maxHeight?: string;
  negativeMargin?: string;
  items?: ScrollItem[];
  itemMinHeight?: number;
  isTilted?: boolean;
  tiltDirection?: 'left' | 'right';
  autoplay?: boolean;
  autoplaySpeed?: number;
  autoplayDirection?: 'up' | 'down';
  pauseOnHover?: boolean;
}

export default function InfiniteScroll({
  width = '30rem',
  maxHeight = '100%',
  negativeMargin = '-0.5em',
  items = [],
  itemMinHeight = 150,
  isTilted = false,
  tiltDirection = 'left',
  autoplay = false,
  autoplaySpeed = 0.2,
  autoplayDirection = 'down',
  pauseOnHover = false,
}: InfiniteScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getTiltTransform = (): string => {
    if (!isTilted) return 'none';
    return tiltDirection === 'left'
      ? 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)'
      : 'rotateX(20deg) rotateZ(20deg) skewX(-20deg)';
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.Spring-flowers2', { x: -10, opacity: 0, duration: 1.5, delay: 0.1, scrub: 3, ease: 'expo.inOut' });
    tl.from('.list-elems', { y: 10, opacity: 0, duration: 1, scrub: 3, ease: 'expo.inOut' });
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) return;
    const divItems = gsap.utils.toArray<HTMLElement>(container.children);
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);
    const itemHeight = firstItem.offsetHeight;
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
    const totalItemHeight = itemHeight + itemMarginTop;
    const totalHeight = itemHeight * items.length + itemMarginTop * (items.length - 1);
    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

    divItems.forEach((child, i) => gsap.set(child, { y: i * totalItemHeight }));

    const observer = Observer.create({
      target: container,
      type: 'wheel,touch,pointer',
      preventDefault: true,
      onPress: ({ target }) => { (target as HTMLElement).style.cursor = 'grabbing'; },
      onRelease: ({ target }) => { (target as HTMLElement).style.cursor = 'grab'; },
      onChange: ({ deltaY, isDragging, event }: { deltaY: number; isDragging: boolean; event: Event }) => {
        const d = (event as WheelEvent).type === 'wheel' ? -deltaY : deltaY;
        const distance = isDragging ? d * 5 : d * 10;
        divItems.forEach((child) => {
          gsap.to(child, { duration: 0.5, ease: 'expo.out', y: `+=${distance}`, modifiers: { y: gsap.utils.unitize(wrapFn) } });
        });
      },
    });

    let rafId: number | undefined;
    if (autoplay) {
      const directionFactor = autoplayDirection === 'down' ? 1 : -1;
      const speedPerFrame = autoplaySpeed * directionFactor;
      const tick = () => {
        divItems.forEach((child) => gsap.set(child, { y: `+=${speedPerFrame}`, modifiers: { y: gsap.utils.unitize(wrapFn) } }));
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
      if (pauseOnHover) {
        const stopTicker = () => rafId && cancelAnimationFrame(rafId);
        const startTicker = () => { rafId = requestAnimationFrame(tick); };
        container.addEventListener('mouseenter', stopTicker);
        container.addEventListener('mouseleave', startTicker);
        return () => { observer.kill(); stopTicker(); container.removeEventListener('mouseenter', stopTicker); container.removeEventListener('mouseleave', startTicker); };
      }
      return () => { observer.kill(); if (rafId) cancelAnimationFrame(rafId); };
    }
    return () => { observer.kill(); if (rafId) cancelAnimationFrame(rafId); };
  }, [items, autoplay, autoplaySpeed, autoplayDirection, pauseOnHover, isTilted, tiltDirection, negativeMargin]);

  return (
    <div
      className="relative flex items-center justify-center w-full overflow-hidden overscroll-none border-t-2 border-b-2 border-transparent bg-gradient-to-tr from-pink-200 via-orange-200 to-[#fefae0]"
      ref={wrapperRef}
      style={{ maxHeight }}
    >
      <div className="Spring-flowers2 absolute left-0 top-[-25%] w-[50%] h-100 bg-cover bg-center" style={{ backgroundImage: "url('/Videos/AnimationFl.gif')" }} />
      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-pink-100 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/4 z-10 shadow-lg pointer-events-none" />
      <div
        className="flex flex-col overscroll-contain px-4 cursor-grab origin-center list-elems"
        ref={containerRef}
        style={{ width, transform: getTiltTransform() }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-center p-4 text-xl font-semibold text-center border-2 border-zinc-700 rounded-[15px] select-none box-border relative"
            style={{ height: `${itemMinHeight}px`, marginTop: negativeMargin }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
