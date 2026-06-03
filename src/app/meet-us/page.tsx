'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SnowflakeCursor from '@/components/AllCursors/SnowFlakeCursor';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function MeetUs() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 22, duration: 3.5 });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    const rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.page1 .hero-right1', { height: 0, y: 80, x: 0, z: -2, scaleY: 0.8, opacity: 0, duration: 1.4, delay: 0.2, ease: 'power4.out', stagger: 0.15 }, 'start')
      .from('.page1 .hero-left', { height: 0, scaleX: 0, y: 80, x: 0, z: -2, scaleY: 0.8, opacity: 0, duration: 1.4, delay: 0.2, ease: 'power4.out', stagger: 0.15 }, 'start')
      .from('.our-meet', { y: 60, opacity: 0, duration: 2, delay: 0.7, ease: 'power3.out', stagger: 0.05 }, 'start')
      .from('.para-msg1', { y: 60, opacity: 0, duration: 0.6, delay: 0.1, ease: 'power3.out', stagger: 0.03 });

    gsap.from('.page2 .hero-left2, .blossom', { height: 0, opacity: 0, duration: 1, ease: 'power.inOut', stagger: 0.001, scrollTrigger: { trigger: '.page2', scroller: 'body', start: 'top 60%', end: 'bottom 30%' } });
    gsap.from('.page2 .hero-right2, .msg-cont3', { height: 0, y: 80, x: 100, z: -2, scaleY: 0.8, opacity: 0, duration: 1.4, delay: 0.2, ease: 'power4.out', stagger: 0.15, scrollTrigger: { trigger: '.page2', scroller: 'body', start: 'top 60%', end: 'bottom 30%' } });
    gsap.from('.para-msg2', { y: 60, x: -19, opacity: 0, duration: 2, delay: 0.6, ease: 'expo.inOut', stagger: 0.001, scrollTrigger: { trigger: '.page2', scroller: 'body', start: 'top 60%', end: 'bottom 30%' } });
    gsap.from('.page3 .hero-right3, .blossom2', { height: 0, y: 80, x: 0, z: -2, scaleY: 0.8, opacity: 0, duration: 1.3, delay: 0.2, ease: 'power3.inOut', stagger: 0.15, scrollTrigger: { trigger: '.page3', scroller: 'body', start: 'top 60%', end: 'bottom 30%' } });
    gsap.from('.page3 .Going-on', { y: 60, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.05, scrollTrigger: { trigger: '.page3', scroller: 'body', start: 'top 60%', end: 'bottom 30%' } });
    gsap.from('.para-msg3', { y: 60, x: -19, opacity: 0, duration: 1.2, delay: 0.1, ease: 'expo.inOut', stagger: 0.03, scrollTrigger: { trigger: '.page3', scroller: 'body', start: 'top 60%', end: 'bottom 30%' } });
  });

  return (
    <>
      <div className="w-full h-auto bg-[#fefae0] px-4">
        <Navbar />
        <SnowflakeCursor />

        {/* PAGE 1 */}
        <div className="page1 w-full h-[82vh] mt-2 flex mb-10">
          <div className="hero-left w-[55%] h-full flex justify-center items-center">
            <div className="w-3/4 h-[95%] border rounded-xl p-5 px-2 flex justify-center items-center">
              <div className="msg w-full h-full bg-center bg-no-repeat bg-cover relative p-10 max-w-[650px] text-center flex flex-col justify-center items-center">
                <h1 className="our-meet text-6xl font-mono font-bold mb-8">
                  {'The First Time'.split('').map((char, idx) => (
                    <span key={idx} className="chars-text inline-block text-[#847B1A]">{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </h1>
                <p className="leading-[2em] good-para text-black font-mono flex flex-wrap justify-center gap-[4px] max-w-[600px]">
                  {`Honestly, it started as just a college project — a task, a group, nothing more. Then came a Google Meet where we talked about actual things — our college journeys, the pressure of placements, what life after graduation even looks like. That was the first moment it felt like, oh, this person actually listens 😅. No trying to impress anyone, no scripted replies — just two people on a screen having a real conversation that neither of us planned for. That day was genuinely good 🌱.`
                    .split(' ').map((word, idx) => (
                      <span key={idx} className="inline-flex">
                        {Array.from(word).map((char, cIdx) => <span key={cIdx} className="para-msg1 inline-block">{char}</span>)}
                      </span>
                    ))}
                </p>
              </div>
            </div>
          </div>
          <div className="hero-right1 w-1/2 h-full flex justify-center items-center">
            <div className="w-3/4 h-[97%] rounded-4xl border bg-cover bg-no-repeat" style={{ background: 'linear-gradient(135deg, #fefae0 0%, #f2e6a0 40%, #e8c97e 100%)' }} />
          </div>
        </div>

        {/* PAGE 2 */}
        <div className="page2 w-full h-screen mt-20 flex relative">
          <div className="hero-left2 w-2/2 h-[95%] flex justify-center items-center">
            <div className="w-3/4 h-[95%] rounded-4xl border bg-cover bg-no-repeat" style={{ background: 'linear-gradient(135deg, #fefae0 0%, #f2e6a0 40%, #e8c97e 100%)' }} />
          </div>
          <div className="hero-right2 w-[50%] h-[90%] flex justify-center items-center">
            <div className="w-full h-full border px-6 rounded-4xl flex justify-center items-center">
              <div className="msg w-full h-full bg-center bg-no-repeat bg-cover relative p-10 max-w-[650px] text-center">
                <h1 className="text-6xl font-bold font-mono text-[#958c23] mb-8">Different Course, Same Energy</h1>
                <p className="leading-[1.7em] good-para text-black font-mono flex flex-wrap justify-center gap-[4px]">
                  {`She is in B.Tech, I am in BCA — on paper, our circles were never supposed to overlap. But she never made that feel like a gap 🤝. Whenever I shared something I built or worked on, her appreciation was real — not the polite kind where someone nods and moves on. She actually engages, asks questions, stays interested. She does not just validate you, she genuinely listens. And that one thing matters more than most people realize ✨.`
                    .split(' ').map((word, idx) => (
                      <span key={idx} className="inline-flex">
                        {Array.from(word).map((char, cIdx) => <span key={cIdx} className="para-msg2 inline-block">{char}</span>)}
                      </span>
                    ))}
                </p>
              </div>
            </div>
          </div>
          <div className="blossom w-60 h-55 absolute bottom-10 left-3 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/flowers/simple2.png')" }} />
        </div>

        {/* PAGE 3 */}
        <div className="page3 bg-[#fefae0] w-full h-[100vh] mt-20 flex relative">
          <div className="hero-left3 w-1/2 h-full flex justify-center items-center">
            <div className="msg-cont3 w-3/4 h-[90%] border rounded-xl px-6">
              <div className="msg w-full h-full bg-center bg-no-repeat bg-cover relative p-10">
                <h1 className="Going-on text-center text-4xl font-bold font-mono text-[#958c23]">And It's Still Going..</h1>
                <p className="leading-[2em] good-para text-black font-mono mt-10 flex flex-wrap justify-center gap-[4px] max-w-[600px]">
                  {`We do not talk every day — but when we do, those conversations actually count 📲. College updates, placement news, the occasional random thought sent out of nowhere — and that deal we made, that whoever gets into a company first will help the other one get in too. That was not a grand gesture. It was just a simple, honest agreement 🤝. That kind of friendship is rare — no drama attached, just a quiet understanding that says, I am here. And that is enough 🌱.`
                    .split(' ').map((word, idx) => (
                      <span key={idx} className="inline-flex">
                        {Array.from(word).map((char, cIdx) => <span key={cIdx} className="para-msg3 inline-block">{char}</span>)}
                      </span>
                    ))}
                </p>
              </div>
            </div>
          </div>
          <div className="hero-right3 w-1/2 h-[100vh] flex justify-center items-center">
            <div className="w-3/4 h-[90%] rounded-4xl border bg-cover bg-no-repeat bg-center" style={{ background: 'linear-gradient(135deg, #fefae0 0%, #f2e6a0 40%, #e8c97e 100%)' }} />
          </div>
          <div className="blossom2 w-60 h-55 absolute bottom-10 right-3 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/flowers/simple1.png')" }} />
        </div>
      </div>
    </>
  );
}
