'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import VideoShowcase from '@/components/VideoShowcase';
import SnowflakeCursor2 from '@/components/AllCursors/SnowFlakeCursor2';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function Memories() {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.top-heading .chars-text', { height: 0, y: 80, x: 0, z: -2, scaleY: 0.8, opacity: 0, duration: 0.7, delay: 0.2, ease: 'power4.out', stagger: 0.15 });
    tl.from('.main .hr-line1', { height: 0, width: 0, y: 20, scaleX: 0.8, opacity: 0, duration: 1, delay: 0.1, ease: 'power3.out' }, 'start');
    tl.from('.main .hero1', { opacity: 0, duration: 1.3, delay: 0.2, ease: 'power3.inOut' });
    tl.from('.main .hero-left-1', { height: 0, y: 80, x: 0, z: -2, scaleY: 0.8, opacity: 0, duration: 1.3, delay: 0.2, ease: 'power3.inOut' });
    tl.from('.main .hero-right-1', { z: -2, scaleY: 0.8, opacity: 0, duration: 1.4, delay: 0.5, ease: 'power4.out', stagger: 0.15 });
    tl.from('.hero-right-1 .chars-text-h', { y: 60, opacity: 0, duration: 0.6, delay: 0.1, ease: 'power3.out', stagger: 0.03 });
    tl.from('.hero-right-1 .para-msg1', { y: 60, opacity: 0, duration: 1, delay: 0.1, ease: 'power3.out', stagger: 0.03 });
    tl.from('.main .maple1', { height: 0, width: 0, y: 20, scaleX: 0.8, opacity: 0, duration: 1.2, delay: 0.1, ease: 'power4.out' }, '-=0.5');
    tl.from('.main .maple2', { height: 0, width: 0, y: 20, scaleX: 0.8, opacity: 0, duration: 1.2, delay: 0.1, ease: 'power4.out' }, '-=0.5');

    gsap.to('.maple1', { y: 100, duration: 1, ease: 'power3.inOut', scrollTrigger: { trigger: '.hero1', scroller: 'body', start: 'top 20%', end: 'bottom 0%', toggleActions: 'play none none reverse' } });
    gsap.to('.maple2', { y: -100, duration: 1, ease: 'power3.inOut', scrollTrigger: { trigger: '.hero1', scroller: 'body', start: 'top 20%', end: 'bottom 0%', toggleActions: 'play none none reverse' } });
    gsap.from('.video-area', { height: 0, y: 80, scaleY: 0.8, opacity: 0, duration: 1.3, delay: 0.2, ease: 'power3.inOut', scrollTrigger: { trigger: '.hero2', scroller: 'body', start: 'top 70%', end: 'bottom 40%' } });
    gsap.from('.Spring-flowers2', { height: 0, y: 80, scaleY: 0.8, opacity: 0, duration: 1.3, delay: 1, ease: 'power3.inOut', scrollTrigger: { trigger: '.hero2', scroller: 'body', start: 'top 60%', end: 'bottom 30%' } });
    gsap.from('.maple3', { height: 0, y: 80, scaleY: 0.8, opacity: 0, duration: 1.3, delay: 0.7, ease: 'power3.inOut', scrollTrigger: { trigger: '.hero2', scroller: 'body', start: 'top 60%', end: 'bottom 30%' } });
    gsap.from('.text-area1', { height: 0, opacity: 0, duration: 1.3, delay: 0.7, ease: 'power3.inOut', scrollTrigger: { trigger: '.hero3', scroller: 'body', start: 'top 60%', end: 'bottom 30%' } });
    gsap.from('.chars-realise-h', { y: -60, opacity: 0, duration: 2.6, delay: 1, ease: 'power3.out', stagger: 0.03, scrollTrigger: { trigger: '.hero3', scroller: 'body', start: 'top 70%', end: 'bottom 30%' } });
    gsap.from('.para-area-model', { y: -60, opacity: 0, duration: 2.6, delay: 1, ease: 'power3.out', stagger: 0.03, scrollTrigger: { trigger: '.hero3', scroller: 'body', start: 'top 60%', end: 'bottom 30%' } });
    gsap.from('.para-msg-realise', { y: -60, opacity: 0, duration: 2, delay: 0.5, ease: 'power3.out', stagger: 0.03, scrollTrigger: { trigger: '.hero3', scroller: 'body', start: 'top 60%', end: 'bottom 30%' } });
  });

  return (
    <>
      <main className="main w-full h-full bg-[#fefae0] overflow-x-hidden px-4">
        <SnowflakeCursor2 />
        <Navbar />

        <div className="top-heading w-full h-20 p-10 mb-2 mt-10 flex justify-center items-center">
          <h1 className="cook-title text-8xl font-bold font-[Valent] tracking-widest text-center text-[#ff9770]">
            {`Something Left Unsaid..!`.split('').map((char, idx) => (
              <span key={idx} className="chars-text inline-block">{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </h1>
        </div>
        <hr className="bg-[#8fc317] hr-line1 w-[50%] h-[2px] m-auto" />

        {/* Hero 1 */}
        <div className="hero1 w-full h-screen mt-3 relative overflow-hidden bg-[#fefae0] border-2 border-[#c08c48] rounded-3xl flex items-center justify-center px-10 md:py-2 gap-4"
          style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1674674741074-5dd15b6a0496?w=600&auto=format&fit=crop&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div>
            <div className="maple1 absolute -right-25 -top-10 h-80 w-80 z-100 -rotate-120" style={{ backgroundImage: "url('/flowers/maple-leaf1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="maple2 absolute -left-20 -bottom-20 h-80 w-80 z-100" style={{ backgroundImage: "url('/flowers/maple-leaf2.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          </div>
          <div className="hero-left-1 h-[90%] w-[36%] border-2 rounded-3xl bg-cover bg-center" style={{ backgroundImage: "url('/madam/Blender_Art.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="mid-arrow-cont w-20 h-full" />
          <div className="hero-right-1 h-[90%] w-[40%] border-2 rounded-3xl">
            <div className="msg w-full h-full bg-center bg-no-repeat bg-cover relative p-10 backdrop-blur-2xl rounded-3xl">
              <h1 className="urge font-[Valent] border-b bite-title from-stranger tracking-wide text-center text-6xl font-bold text-[#16425b] bg-clip-text">
                {` That Google Meet Day`.split('').map((char, idx) => (
                  <span key={idx} className="chars-text-h inline-block">{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </h1>
              <p className="model-idea leading-[2.3em] good-para text-black font-mono mt-10 w-full flex flex-wrap">
                {'That first Google Meet was not supposed to be anything more than a project call. But it became something else entirely. We talked about our actual lives — where we had been in college, where we were trying to go, what scared us about what came next. It was open and honest in a way that most conversations are not 😅. It felt easy. Comfortable. Like talking to someone you already knew somehow. I did not realize it at the time, but that conversation was where this friendship actually started — quiet, unplanned, and completely real 🌱.'
                  .split(' ').map((word, idx) => (
                    <span key={idx} className="para-msg1 inline-block mr-1">{word}</span>
                  ))}
              </p>
            </div>
          </div>
        </div>

        {/* Hero 2 */}
        <div className="hero2 w-full h-screen mt-3 relative overflow-hidden border-2 border-[#c08c48] rounded-3xl flex items-center justify-center px-10 md:py-2 gap-4"
          style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1674674741074-5dd15b6a0496?w=600&auto=format&fit=crop&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute Spring-flowers2 w-[50%] h-100 bg-cover bg-center z-100 left-0 -top-10" style={{ backgroundImage: "url('/Videos/AnimationFl.gif')" }} />
          <div className="maple3 absolute -right-17 -bottom-10 h-80 w-80 z-70 -rotate-45" style={{ backgroundImage: "url('/flowers/simple1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="video-area w-full h-screen flex items-center justify-center px-4">
            <VideoShowcase />
          </div>
        </div>

        {/* Hero 3 */}
        <div className="hero3 w-full h-screen mt-3 relative overflow-hidden border-2 border-[#c08c48] rounded-3xl flex items-center justify-center px-10 md:py-2 gap-4"
          style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1674674741074-5dd15b6a0496?w=600&auto=format&fit=crop&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="text-area1 w-[80%] h-[90%] border rounded-3xl backdrop-blur-[0.4em] bg-white/20 pointer-events-none p-10 flex-1 items-center justify-center">
            <h1 className="font-[Valent] tracking-widest text-center text-8xl font-bold text-[#16425b] bg-clip-text">
              {` When It Clicked`.split('').map((char, idx) => (
                <span key={idx} className="chars-realise-h inline-block">{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </h1>
            <hr className="bg-[#f2bd40] hr-line w-[50%] h-[2px] m-auto mb-10" />
            <div className="para-area-model m-auto w-[90%] h-[70%] px-13 py-5 flex items-center justify-center border rounded-2xl backdrop-blur-lg bg-black/10">
              <p className="realaise leading-[2.3em] good-para text-black font-mono mt-10 w-full flex flex-wrap">
                {`"College comes with big dreams — the right placement, the right company, building something that matters. But in between all of that, it is the smaller things that end up staying with you the longest. Ritika is one of those smaller things that became a big one. A friend who listens without needing a reason to, who appreciates your work without making it a comparison, who shows up in quiet, consistent ways. We are in different courses, different circles — but when we talk, it is always real. That deal still stands too — whoever gets there first brings the other one along 🤝. This site is just a small way of saying: I see you, I value this, and Happy Birthday Ritika."`
                  .split(' ').map((word, idx) => (
                    <span key={idx} className="para-msg-realise inline-block mr-1">{word}</span>
                  ))}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
