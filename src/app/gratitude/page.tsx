'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import MagnetLines from '@/components/MagnetLines/MagnetLines';
import SnowflakeCursor from '@/components/AllCursors/SnowFlakeCursor';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Gratitude() {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.layer', { y: 60, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.05 })
      .from('.chars-text', { y: 60, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.05 });

    gsap.from('.page1 .hero-left2', { height: 0, y: 80, scaleY: 0.8, opacity: 0, duration: 1.4, delay: 0.2, ease: 'power4.out', stagger: 0.15, scrollTrigger: { trigger: '.page1', scroller: 'body', start: 'top 70%', end: 'bottom 40%' } });
    gsap.from('.page1 .from-stranger, .Stranger-cont', { y: 60, opacity: 0, duration: 2, delay: 0.7, ease: 'power3.out', stagger: 0.05, scrollTrigger: { trigger: '.page1', scroller: 'body', start: 'top 70%', end: 'bottom 40%' } });
    gsap.from('.para-msg1', { y: 60, x: -19, opacity: 0, duration: 4, ease: 'expo.inOut', stagger: 0.001, scrollTrigger: { trigger: '.page1', scroller: 'body', start: 'top 68%', end: 'bottom 36%' } });
    gsap.from('.page2 .chulbuli', { height: 0, y: 80, scaleY: 0.8, opacity: 0, duration: 1.4, delay: 0.2, ease: 'power4.out', stagger: 0.15, scrollTrigger: { trigger: '.page2', scroller: 'body', start: 'top 70%', end: 'bottom 40%' } });
    gsap.from('.page2 .to-current, .hero2-left', { height: 0, y: 80, scaleY: 0.8, opacity: 0, duration: 1.4, delay: 0.2, ease: 'power4.out', stagger: 0.15, scrollTrigger: { trigger: '.page2', scroller: 'body', start: 'top 70%', end: 'bottom 40%' } });
    gsap.from('.para-msg2, .gold-line1', { y: 60, x: -19, opacity: 0, duration: 1.2, delay: 0.1, ease: 'expo.inOut', stagger: 0.03, scrollTrigger: { trigger: '.page2', scroller: 'body', start: 'top 70%', end: 'bottom 40%' } });
    gsap.from('.page3 .Strong', { height: 0, y: 80, scaleY: 0.8, opacity: 0, duration: 1.4, delay: 0.2, ease: 'power4.out', stagger: 0.15, scrollTrigger: { trigger: '.page3', scroller: 'body', start: 'top 70%', end: 'bottom 40%' } });
    gsap.from('.page3 .Silence', { height: 0, y: 80, scaleY: 0.8, opacity: 0, duration: 1.4, delay: 0.2, ease: 'power4.out', stagger: 0.15, scrollTrigger: { trigger: '.page3', scroller: 'body', start: 'top 65%', end: 'bottom 36%' } });
    gsap.from('.para-msg3, .gold-line2', { y: 60, x: -19, opacity: 0, duration: 1.2, delay: 0.1, ease: 'expo.inOut', stagger: 0.03, scrollTrigger: { trigger: '.page3', scroller: 'body', start: 'top 65%', end: 'bottom 37%' } });
  });

  return (
    <>
      <SnowflakeCursor />
      <div className="h-full w-full bg-[#fefae0] overflow-x-hidden relative px-4">
        <Navbar />

        {/* Magnet Lines Hero */}
        <div className="main h-[82vh] w-full relative">
          <div className="text-area z-[20] w-full">
            <h1 className="text-7xl font-mono absolute z-[20] top-[40%] left-[25%] text-[#847B1A]">
              {'Where Do I Even Begin..'.split('').map((char, idx) => (
                <span key={idx} className="chars-text inline-block">{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </h1>
          </div>
          <div className="layer absolute ml-10 z-[10] w-[90%] h-1/2 m-auto flex gap-70">
            <div className="left w-1/2 h-full"><MagnetLines /></div>
            <div className="left w-1/2 h-full"><MagnetLines /></div>
          </div>
        </div>

        <div className="line bg-[#847B1A] w-[90%] h-[1.5px] m-auto" />

        {/* PAGE 1 */}
        <div className="page1 h-screen w-full mt-10 px-4">
          <div className="hero w-[90%] h-[95%] m-auto flex justify-around px-4">
            <div className="hero-left2 w-1/2 h-full flex items-center justify-center">
              <div className="w-[95%] h-[95%] rounded-xl overflow-hidden border bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('/ScrenShot/BirthdayWish.jpg')" }} />
            </div>
            <div className="hero-right2 w-1/2 h-full">
              <div className="Stranger-cont w-[90%] h-[95%] border rounded-xl px-6 mt-5 ml-10">
                <div className="msg w-full h-full bg-center bg-no-repeat bg-cover relative p-10">
                  <h1 className="from-stranger text-center text-6xl font-bold font-mono text-[#958c23]">It Began With a Project</h1>
                  <p className="leading-[1.9em] good-para text-black font-mono mt-10 flex flex-wrap">
                    {'It all started with a completely ordinary college project — the kind where you expect nothing memorable to come out of it. Then there was a Google Meet, and something shifted 😅. In between the project talk, we shared things — our college journeys, the honest fear around placements, what we were each working toward. That conversation was not forced. It was natural, open, and real in a way that most conversations in college never are 🌱. I did not know then that this small call would end up being the start of a friendship I would actually want to hold on to 🫶.'
                      .split(' ').map((word, idx) => (
                        <span key={idx} className="para-msg1 inline-block mr-1">{word}</span>
                      ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="gold-line1 w-[80%] mx-30 h-20 flex justify-center items-center mt-20">
          <Image src="/Lines/LineCom 2.png" width={1000} height={40} alt="Gold line" style={{ width: 'auto', height: 'auto' }} />
        </div>

        {/* PAGE 2 */}
        <div className="page2 h-screen w-full mt-10 px-4">
          <div className="hero w-[90%] h-[95%] mx-auto flex justify-between items-center gap-6 px-4">
            <div className="hero2-left w-1/2 h-[95%] p-10 border rounded-lg flex justify-center items-center">
              <div className="text-area w-[88%] max-w-[650px] text-center">
                <h1 className="to-current text-6xl font-bold font-mono text-[#958c23] mb-8">And Then There Is This</h1>
                <p className="para-msg2 leading-[1.7em] text-black font-mono flex flex-wrap justify-center gap-[4px]">
                  {'Talking to Ritika never requires measuring your words — she is the kind of person you can be completely unfiltered with, and it still feels comfortable 😂. She has this child-like energy about her — genuinely innocent in one moment, completely unbothered and bold in the next. She will send something funny out of nowhere, share a placement update, or just casually ask how things are going. What stands out is that she does not judge — she listens and then actually says something useful 🌿. When someone makes it that easy to just be yourself, you do not want to let go of that 🫶.'
                    .split(' ').map((word, idx) => (
                      <span key={idx} className="inline-flex">
                        {Array.from(word).map((char, cIdx) => <span key={cIdx} className="para-msg2 inline-block">{char}</span>)}
                      </span>
                    ))}
                </p>
              </div>
            </div>
            <div className="chulbuli hero2-right w-1/2 h-full flex items-center justify-center">
              <div className="w-[95%] h-[100%] rounded-3xl overflow-hidden border flex items-center justify-center bg-center bg-cover">
                <Image src="/ScrenShot/Chulbuli.jpg" alt="Current Screenshot" className="w-full h-full object-cover" width={600} height={800} />
              </div>
            </div>
          </div>
        </div>

        <div className="gold-line2 w-[80%] mx-30 h-20 flex justify-center items-center mt-20">
          <Image src="/Lines/LineCom 2.png" width={1000} height={40} alt="Gold line" style={{ width: 'auto', height: 'auto' }} />
        </div>

        {/* PAGE 3 */}
        <div className="page3 h-screen w-full mt-10 px-4">
          <div className="Strong hero-left3 w-[90%] h-[95%] m-auto flex justify-around px-4">
            <div className="hero3-left w-1/2 h-full flex items-center justify-center">
              <div className="w-[95%] h-[95%] rounded-xl overflow-hidden border bg-center bg-cover">
                <Image src="/ScrenShot/WA_chat.png" alt="WA Chat Screenshot" className="w-full h-full object-cover" width={600} height={800} />
              </div>
            </div>
            <div className="hero-right3 w-1/2 h-full mt-5 flex justify-center items-center">
              <div className="w-[90%] h-[95%] border rounded-xl px-6 flex justify-center items-center">
                <div className="msg w-full h-full bg-center bg-no-repeat bg-cover relative p-10 px-7 max-w-[650px] text-center">
                  <h1 className="Silence text-4xl font-bold font-mono text-[#958c23] leading-tight mb-8">
                    Some People Are Just<br />Built Different
                  </h1>
                  <p className="para-msg3 leading-[2em] good-para text-black font-mono flex flex-wrap justify-center gap-[4px]">
                    {'College takes a lot of friendships away — connections that started strong and then faded without any warning or reason 📉. So when someone shows up who genuinely listens, who actually appreciates your work, who guides you without any expectation in return — that presence carries real weight. This small site is an expression of exactly that feeling — the quiet appreciation for someone who made college feel a little less lonely, and a little more worth it 🌱.'
                      .split(' ').map((word, idx) => (
                        <span key={idx} className="inline-flex">
                          {Array.from(word).map((char, cIdx) => <span key={cIdx} className="para-msg3 inline-block">{char}</span>)}
                        </span>
                      ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
