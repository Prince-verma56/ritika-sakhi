'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CircularText from '@/components/CircularText/CircularText';
import CircularGallery from '@/components/CircularGallery/CircularGallery';
import FallingText from '@/components/FallingText/FallingText';
import SnowflakeCursor from '@/components/AllCursors/SnowFlakeCursor';
import { motion } from 'motion/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 11, duration: 3.6 });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    const rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.layer-2', { y: -30, scaleY: 0.5, rotateX: 45, duration: 0.8, opacity: 0, delay: 1.1, ease: 'power3.inOut' }, 'start')
      .from('.layer-1', { y: 30, scaleY: 0.8, rotateX: 45, duration: 0.7, opacity: 0, delay: 0.1, ease: 'power3.inOut' })
      .from('.top-circle-text', { y: 30, scaleY: 0.2, rotateX: 90, rotateY: 90, duration: 1, opacity: 0, delay: 0.2, ease: 'power3.inOut' })
      .from('.main-title', { y: 40, x: -50, scaleY: 0.3, height: 1, rotateX: 90, duration: 1, opacity: 0, delay: 0.2, ease: 'power3.inOut' });

    gsap.from('.hero-left .text-area .name', { y: 30, x: 25, scaleY: 0.3, rotateX: 45, duration: 0.7, opacity: 0, delay: 0.5, ease: 'power.inOut', scrollTrigger: { trigger: '.page2', scroller: 'body', start: 'top 70%', end: 'bottom 40%', toggleActions: 'play none none reverse' } });
    gsap.from('.hero-left .text-area .good-para, .hero-left .text-area .about-us', { y: 30, x: 25, scaleY: 0.3, rotateX: 45, duration: 0.9, opacity: 0, delay: 0.9, ease: 'power.inOut', scrollTrigger: { trigger: '.page2', scroller: 'body', start: 'top 55%', end: 'bottom 30%', toggleActions: 'play none none reverse' } });
    gsap.from('.hero-right .img1-mam', { y: -20, scaleY: 0.5, duration: 0.9, opacity: 0, delay: 1, ease: 'power3.inOut', scrollTrigger: { trigger: '.page2', scroller: 'body', start: 'top 45%', end: 'bottom 20%', toggleActions: 'play none none reverse' } });
    gsap.from('.hr-line', { y: -30, height: 10, scaleX: 0.3, rotateX: 45, duration: 0.9, opacity: 0, delay: 1, ease: 'power.inOut', scrollTrigger: { trigger: '.hr-line', scroller: 'body', start: 'top 85%', end: 'bottom 50%', toggleActions: 'play none none reverse' } });
    gsap.from('.page3 .gallery, .spring-flowers1', { y: -30, height: 10, rotateX: 45, duration: 0.9, opacity: 0, delay: 1, stagger: 0.5, ease: 'power.inOut', scrollTrigger: { trigger: '.gallery', scroller: 'body', start: 'top 70%', end: 'bottom 20%', toggleActions: 'play none none reverse' } });
    gsap.from('.page3 .cards-gallery', { y: -30, rotateY: 45, duration: 0.9, opacity: 0, delay: 0.7, ease: 'power.inOut', scrollTrigger: { trigger: '.page3 .cards-gallery', scroller: 'body', start: 'top 38%', end: 'bottom 20%', toggleActions: 'play none none reverse' } });
    gsap.from('.page4 > img', { opacity: 0, duration: 1.5, delay: 0.5, ease: 'power3.inOut', stagger: 0.1, scrollTrigger: { trigger: '.page4', scroller: 'body', start: 'top 70%', end: 'top 40%', toggleActions: 'play none none reverse' } });
    gsap.from('.page4 .slider-heading', { opacity: 0, scaleX: 0, y: 100, width: 10, duration: 1.5, ease: 'power3.inOut', stagger: 0.1, scrollTrigger: { trigger: '.page4', scroller: 'body', start: 'top 70%', end: 'top 40%', toggleActions: 'play none none reverse' } });
    gsap.from('.page4 .drag-img', { opacity: 0, scaleX: 0, y: 100, width: 10, duration: 1.5, ease: 'power3.inOut', stagger: 0.1, scrollTrigger: { trigger: '.page4', scroller: 'body', start: 'top 45%', end: 'top 30%', toggleActions: 'play none none reverse' } });
    gsap.from('.page5 .slider-heading2, .Spring-flowers2', { opacity: 0, scaleX: 0, y: 100, width: 10, duration: 1.5, ease: 'power3.inOut', stagger: 0.1, scrollTrigger: { trigger: '.page5', scroller: 'body', start: 'top 80%', end: 'top 40%', toggleActions: 'play none none reverse' } });
    gsap.from('.page5', { opacity: 0, duration: 1.5, ease: 'power3.inOut', stagger: 0.1, scrollTrigger: { trigger: '.page5', scroller: 'body', start: 'top 80%', end: 'bottom 50%', toggleActions: 'play none none reverse' } });
    gsap.from('.page5 .image-area', { opacity: 0, scaleY: 0, y: -100, rotateX: 90, duration: 1.5, ease: 'power3.inOut', stagger: 0.1, scrollTrigger: { trigger: '.page5', scroller: 'body', start: 'top 60%', end: 'bottom 35%', toggleActions: 'play none none reverse' } });
    gsap.from('.page5 .end-msg1', { y: 60, opacity: 0, duration: 2, ease: 'power3.out', stagger: 0.05, scrollTrigger: { trigger: '.page5', scroller: 'body', start: 'top 10%', end: 'top 0%', toggleActions: 'play none none reverse' } });
  });

  return (
    <>
      <SnowflakeCursor />
      <div className="h-full w-full bg-[#fefae0]">
        {/* PAGE 1 */}
        <div className="page1 w-full h-screen relative flex flex-col">
          <Navbar />
          <div className="hero1 w-full flex-1">
            <div className="flowers-area w-full h-full relative">
              <div className="mam-name h-full w-full absolute z-[1]">
                <div className="cont w-3/4 h-3/4">
                  <div className="top-circle-text flex justify-center w-1/4 h-1/2 relative left-[54%]">
                    <CircularText text="Happy*Birthday*Ritika*" onHover="speedUp" spinDuration={20} className="custom-class uppercase text-[#847B1A]" />
                  </div>
                  <div className="main-title w-[80%] h-[50%] flex absolute left-[15%] bottom-25">
                    <h1 className="text-[#847B1A] font-serif uppercase text-[10em] text-center">Ritika Madam</h1>
                  </div>
                </div>
              </div>
              <div className="layer-1 w-full h-[60%] absolute bottom-[-6%] z-10 flex justify-between">
                <div className="left-flower">
                  <Image src="/flowers/Left_flower.png" width={600} height={520} loading="lazy" alt="Left flower" style={{ width: 'auto', height: 'auto' }} />
                </div>
                <div className="left-flower">
                  <Image src="/flowers/Left_flower.png" width={594} height={420} loading="lazy" alt="Right flower" className="rotate-y-180" style={{ width: 'auto', height: 'auto' }} />
                </div>
              </div>
              <div className="layer-2 w-full h-[88%] flex justify-center top-[11%] absolute bottom-[-5%] left-0 z-[10]">
                <Image src="/flowers/Spring2.png" className="h-full w-full z-20 absolute bottom-0 left-[0%]" width={594} height={255} loading="lazy" alt="Spring flowers" />
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 2 */}
        <div className="page2 w-full h-auto">
          <div className="hero2 w-full min-h-screen px-20 flex items-center">
            <div className="hero-inner w-full h-full flex flex-col lg:flex-row px-4 lg:px-10">
              <div className="hero-left w-full lg:w-1/2 p-6 border rounded-3xl">
                <div className="text-area w-full h-full p-4">
                  <h1 className="name text-5xl font-mono text-[#958c23] mt-10 font-bold">Ritika Madam</h1>
                  <p className="good-para text-black font-mono mt-10">
                    Some people show up only for the work — once the project ends, so does the connection. Ritika was different. One Google Meet was all it took to feel like, okay, this person is genuinely one of mine. No performance, no small talk — just honest, easy conversation. She is bubbly and fun, but also the kind of person you can say anything real to without worrying. She never once made the BCA vs B.Tech difference feel like a thing — and that, more than anything, is what makes her genuinely special.
                  </p>
                  <button className="about-us text-black font-semibold mt-10 px-10 py-2 rounded-full cursor-pointer border border-[#958c23]">
                    <Link href="/about"><h1 className="text-2xl cursor-pointer">About her</h1></Link>
                  </button>
                </div>
              </div>
              <div className="hero-right w-full lg:w-1/2 flex items-center justify-center">
                <div className="img1-mam w-[70%] h-auto relative rounded-tl-[150px] rounded-tr-[150px] overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <Image src="/madam/Frame 1.png" fill className="object-cover" alt="Ritika Mam" loading="lazy" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 33vw" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="bg-[#8fc317] hr-line w-[80%] h-px m-auto" />

        {/* PAGE 3 */}
        <div className="page3 Illutrations w-full h-screen py-5 relative">
          <div className="spring-flowers1 w-[50%] h-100 bg-cover bg-center absolute z-[10] left-0" style={{ backgroundImage: "url('/Videos/AnimationFl.gif')" }} />
          <div className="heading w-full h-27 py relative flex flex-col gap-5 mt-10">
            <h1 className="gallery text-8xl font-serif uppercase text-center">Gallery</h1>
            <div className="line bg-[#847B1A] w-[60%] h-[1.3px] absolute left-[20%] bottom-[10%]" />
          </div>
          <div className="cards-gallery w-full h-[95%] bg-[#fefae0]">
            <CircularGallery />
          </div>
        </div>

        <div className="gold-line w-[80%] mx-30 h-20 flex justify-center items-center mt-20">
          <Image src="/Lines/LineCom 2.png" width={1000} height={40} alt="Decorative line" loading="lazy" style={{ width: 'auto', height: 'auto' }} />
        </div>

        {/* PAGE 4 */}
        <div className="page4 w-full h-[140vh] mt-20 relative bg-no-repeat bg-cover">
          <Image src="/flowers/Flower_bg.jpg" loading="lazy" className="w-full h-full object-cover absolute top-0 left-0 right-0" fill alt="Flower background" sizes="100vw" />
          <div className="falling-text absolute left-0 top-0 z-[1] h-full w-full">
            <FallingText />
          </div>
          <div className="slider-heading w-full h-30 bg-linear-to-r from-pink-300 via-yellow-300 to-orange-200 mt-10 flex items-center justify-center py-10 tracking-widest">
            <h1 className="text-center text-[#847B1A] uppercase text-8xl font-serif">Vibes</h1>
          </div>
          <div ref={boxRef} className="layout-area w-full h-screen flex justify-center items-center relative">
            <div className="grid grid-cols-2 mt-4 grid-rows-2 gap-5 p-10 z-10">

              <motion.div
                drag
                dragConstraints={boxRef}
                className="drag-img relative w-75 h-75 border rounded-xl overflow-hidden shadow-md cursor-grab"
              >
                <Image
                  src="https://res.cloudinary.com/dtslaveid/image/upload/v1780512376/ChatGPT_Image_Jun_3_2026_06_30_18_PM_t7qqnp.png"
                  alt="Image 1"
                  fill
                  sizes="300px"
                  priority
                  className="object-cover"
                  draggable={false}
                />
              </motion.div>

              <motion.div
                drag
                dragConstraints={boxRef}
                className="drag-img relative w-75 h-75 border rounded-xl overflow-hidden shadow-md cursor-grab"
              >
                <Image
                  src="https://res.cloudinary.com/dtslaveid/image/upload/v1780515073/ChatGPT_Image_Jun_4_2026_12_39_54_AM_cfreb3.png"
                  alt="Image 2"
                  fill
                  sizes="300px"
                  className="object-cover"
                  draggable={false}
                />
              </motion.div>

              <motion.div
                drag
                dragConstraints={boxRef}
                className="drag-img relative w-75 h-75 border rounded-xl overflow-hidden shadow-md cursor-grab"
              >
                <Image
                  src="https://res.cloudinary.com/dtslaveid/image/upload/v1780515074/ChatGPT_Image_Jun_4_2026_12_38_44_AM_zakuji.png"
                  alt="Image 3"
                  fill
                  sizes="300px"
                  className="object-cover"
                  draggable={false}
                />
              </motion.div>

              <motion.div
                drag
                dragConstraints={boxRef}
                className="drag-img relative w-75 h-75 border rounded-xl overflow-hidden shadow-md cursor-grab"
              >
                <Image
                  src="https://res.cloudinary.com/dtslaveid/image/upload/v1780515077/ChatGPT_Image_Jun_4_2026_12_29_45_AM_rp7ljf.png"
                  alt="Image 4"
                  fill
                  sizes="300px"
                  className="object-cover"
                  draggable={false}
                />
              </motion.div>

            </div>
          </div>
        </div>

        <div className="line bg-[#847B1A] w-full h-[1.5px]" />

        {/* PAGE 5 */}
        <div
          className="page5 w-full h-screen bg-[#fefae0] shadow-lg bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: "url('/backgrounds/Bg2.jpg')",
          }}
        >
          <div className="slider-heading2 w-full h-25 bg-linear-to-r from-pink-300 via-yellow-300 to-orange-200 flex items-center justify-center py-10 tracking-widest">
            <h1 className="text-center text-[#847B1A] uppercase text-8xl font-serif">
              Ritika
            </h1>
          </div>

          <div
            className="Spring-flowers2 w-[50%] h-100 bg-cover bg-center"
            style={{
              backgroundImage: "url('/Videos/AnimationFl.gif')",
            }}
          />

          {/*  Image */}
          <div className="image-area w-[70%] h-[65%] rounded-4xl absolute left-[17%] top-[20%] z-[100] overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dtslaveid/image/upload/v1780519359/ChatGPT_Image_Jun_4_2026_02_12_14_AM_jabxdm.png"
              alt="Ritika"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-cover"
            />
          </div>

          <div className="last w-[50%] h-15 absolute bottom-5 left-[25%] flex justify-center items-center end-msg">
            {'All of This — Just for You..'.split('').map((char, idx) => (
              <span
                key={idx}
                className="end-msg1 inline-block text-4xl font-bold text-center font-mono text-[#847B1A]"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
