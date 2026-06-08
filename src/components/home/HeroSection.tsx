'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import CircularText from '@/components/CircularText/CircularText';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef(null);

  useGSAP(() => {
    // Set the final (fancy) clip-path and border-radius
    gsap.set(heroRef.current, {
      clipPath: 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)',
      borderRadius: '0% 0% 40% 50%',
    });

    // Animate from a full rectangle to the final shape on scroll
    gsap.from(heroRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0% 0% 0% 0%',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    });
  }, { scope: heroRef });

  return (
    <div
      ref={heroRef}
      id="hero-frame"
      className="page1 w-full h-screen relative flex flex-col"
    >
      <div className="h-20 w-full flex-shrink-0" />
      <div className="hero1 w-full flex-1">
        <div className="flowers-area w-full h-full relative">
          <div className="mam-name h-full w-full absolute z-[1]">
            <div className="cont w-3/4 h-3/4">
              <div className="top-circle-text flex justify-center w-1/4 h-1/2 relative left-[54%]">
                <CircularText
                  text="Happy*Birthday*Dear*"
                  onHover="speedUp"
                  spinDuration={20}
                  className="custom-class uppercase text-[#847B1A]"
                />
              </div>
              <div className="main-title w-[80%] h-[50%] flex absolute left-[18%] bottom-20">
                <h1 className="text-[#847B1A] text-5xl md:text-15xl lg:text-20xl xl:text-20xl font-awesome uppercase text-[12em] text-center">
                  Ritika Buddy
                </h1>
              </div>
            </div>
          </div>

          <div className="layer-1 w-full h-[60%] absolute bottom-[-10%] z-10 flex justify-between">
            <div className="left-flower">
              <Image
                src="/flowers/Left_flower.png"
                width={600}
                height={520}
                priority
                alt="Left flower"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <div className="left-flower">
              <Image
                src="/flowers/Left_flower.png"
                width={594}
                height={420}
                priority
                alt="Right flower"
                className="rotate-y-180"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>

          <div className="layer-2 w-full h-[88%] flex justify-center top-[11.9%] absolute bottom-[-5%] left-0 z-[10]">
            <Image
              src="/flowers/Spring2.png"
              className="h-full w-full z-20 absolute bottom-0 left-[0%]"
              width={594}
              height={255}
              priority
              alt="Spring flowers"
            />
          </div>
        </div>
      </div>
    </div>
  );
}