'use client';

import React from 'react';
import Image from 'next/image';
import CircularText from '@/components/CircularText/CircularText';

export default function HeroSection() {
  return (
    <div className="page1 w-full h-screen relative flex flex-col">
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
              <div className="main-title w-[80%] h-[50%] flex absolute left-[15%] bottom-25">
                <h1 className="text-[#847B1A] font-serif uppercase text-[10em] text-center">
                  Ritika Madam
                </h1>
              </div>
            </div>
          </div>

          <div className="layer-1 w-full h-[60%] absolute bottom-[-6%] z-10 flex justify-between">
            <div className="left-flower">
              <Image
                src="/flowers/Left_flower.png"
                width={600}
                height={520}
                loading="lazy"
                alt="Left flower"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <div className="left-flower">
              <Image
                src="/flowers/Left_flower.png"
                width={594}
                height={420}
                loading="lazy"
                alt="Right flower"
                className="rotate-y-180"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>

          <div className="layer-2 w-full h-[88%] flex justify-center top-[11%] absolute bottom-[-5%] left-0 z-[10]">
            <Image
              src="/flowers/Spring2.png"
              className="h-full w-full z-20 absolute bottom-0 left-[0%]"
              width={594}
              height={255}
              loading="lazy"
              alt="Spring flowers"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
