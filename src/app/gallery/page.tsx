'use client';

import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CardCarousel } from '@/components/ui/card-carousel';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: '/hands/snapHand.png', alt: 'Image 1' },
  { src: '/hands/M1.jpg', alt: 'Image 2' },
  { src: '/hands/M2.jpg', alt: 'Image 3' },
  { src: '/hands/M4.jpg', alt: 'Image 4' },
];

export default function Gallery() {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.page1 .cook-title', { y: 40, opacity: 0, duration: 1, skewX: -40, skewY: 5, ease: 'power3.out', stagger: 0.2 })
      .from('.gold-line1', { y: 40, opacity: 0, scaleX: 0, ease: 'power3.out', duration: 1, stagger: 0.2 })
      .from('.page1-main', { opacity: 0 }, '-=0.5')
      .from('.page1-main .hero-right1 .bite-title', { y: 10, opacity: 0, height: 0, ease: 'ease.inOut', duration: 1 })
      .from('.page1-main .her-react', { height: 0, y: 80, scaleY: 0.8, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.15 }, '-=0.5')
      .from('.page1-main .hero-left1', { y: 10, opacity: 0, height: 0, ease: 'ease.inOut', duration: 1.2 });

    gsap.from('.page2', { opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.page2', start: 'top 80%', end: 'bottom 50%', toggleActions: 'play reverse play reverse' } });
    gsap.from('.page2 .image-area', { height: 0, opacity: 0, y: 50, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.page2', start: 'top 50%', end: 'bottom top', toggleActions: 'play reverse play reverse' } });
  }, []);

  return (
    <>
      <div className="w-full h-full bg-[#fefae0] overflow-x-hidden px-4">
        {/* PAGE 1 Title */}
        <div className="page1 w-full h-20 p-10 mb-2 mt-10 flex justify-center items-center">
          <h1 className="cook-title text-6xl font-bold font-[RollingBeat] text-center text-[#f48c06]">
            {'Our Project Days'.split('').map((char, idx) => (
              <span key={idx} className="chars-text inline-block">{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </h1>
        </div>

        <div className="gold-line1 w-[80%] mx-30 h-20 flex justify-center items-center mt-1">
          <Image src="/Lines/LineCom 2.png" width={1000} height={40} alt="Decorative line" loading="lazy" style={{ width: 'auto', height: 'auto' }} />
        </div>

        {/* PAGE 1 Main */}
        <div className="page1-main h-screen w-full mt-2 px-4 bg-center bg-no-repeat bg-cover select-none" style={{ backgroundImage: "url('/backgrounds/Staionary.png')" }}>
          <div className="hero relative w-[90%] h-[95%] m-auto flex justify-around px-10 py-1">
            <div className="hero-left1 w-[45%] h-[95%] flex items-end justify-center -translate-y-20 relative top-4 left-12">
              <div className="shadow-[-12px_10px_46px_0px_#ffba08] w-[80%] h-[95%] rounded-3xl overflow-hidden border-2 border-white bg-center bg-cover flex items-center justify-center absolute top-10 left-20" style={{ backgroundImage: "url('/Dishes/Maal Pua 2.jpg')" }} />
            </div>
            <div className="iso-leave1 absolute w-40 h-40 right-12 pointer-events-none" style={{ backgroundImage: "url('/Dishes/Iso-leaves3.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="hero-right1 w-1/2 h-full relative">
              <div className="Bite-cont w-[80%] h-[95%] border border-zinc-300 rounded-xl px-6 mt-5 ml-10 shadow-lg backdrop-blur-[0.2em] inset-shadow-zinc-200/50 absolute top-10">
                <div className="msg w-full h-full bg-center bg-no-repeat bg-cover relative p-10">
                  <h1 className="font-[Valent] bite-title from-stranger tracking-wide text-center text-6xl font-bold text-[#f48c06] bg-clip-text">
                    That First Real Conversation
                  </h1>
                  <p className="her-react leading-[1.7em] good-para text-black font-mono mt-10 w-full flex flex-wrap">
                    {'It started as a college project — a normal group, a normal task, no expectations 😅. But then there was a Google Meet where the conversation went further than the project. We talked about our college journeys, our plans, the things that were actually on our minds. Her words were simple but they landed. That one conversation was enough to know — this is someone I actually want to keep in my life. Some of the best connections begin exactly like that, with no plan at all 🌱.'
                      .split(' ').map((word, idx) => (
                        <span key={idx} className="para-msg3 inline-block mr-1">{word}</span>
                      ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 2 */}
        <div className="page2 h-screen w-full mt-2 px-4 bg-center bg-no-repeat bg-cover relative" style={{ backgroundImage: "url('/backgrounds/Cook Diary.jpg')" }}>
          <div className="image-area w-[52%] h-[65%] rounded-3xl absolute left-[23%] top-[25%] z-[100] bg-cover bg-center shadow-[10px_13px_46px_0px_#fdca40]" style={{ backgroundImage: "url('/Dishes/Full Thali.png')" }} />
        </div>

        {/* Fixed Title */}
        <div className="scroll-title fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center text-center opacity-0">
          <h2 className="text-7xl font-bold text-[#f48c06] mb-2 font-[Valent]">Moments Worth Keeping</h2>
          <div className="gold-line2 w-full flex justify-center">
            <Image src="/Lines/LineCom 2.png" className="max-w-[80%] h-auto" width={800} height={40} alt="Title line" loading="lazy" style={{ width: 'auto', height: 'auto' }} />
          </div>
        </div>

        {/* PAGE 3 */}
        <div className="page3 h-screen w-full mt-2 px-4 bg-center bg-no-repeat bg-cover relative overflow-hidden flex justify-center items-center" style={{ backgroundImage: "url('/backgrounds/MehndiBg.jpg')" }}>
          <div className="pt-20">
            <CardCarousel images={images} autoplayDelay={2000} showPagination={true} showNavigation={true} />
          </div>
        </div>
      </div>
    </>
  );
}
