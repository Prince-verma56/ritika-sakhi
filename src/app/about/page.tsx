'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import InfiniteScroll from '@/components/InfiniteScroll/InfiniteScroll';

const items = [
  { content: "(1). Where Do I Start.." },
  { content: <p key="1">"Ritika has this energy that is genuinely rare — playful in one breath, grounded in the next, and completely real in both. That combination does not come along often."</p> },
  { content: "(2). And Then There Is This.." },
  { content: <p key="2">"She actually listens — not to respond, but to understand. Most people do not do that. She does, and that difference is bigger than it sounds."</p> },
  { content: "(3). Worth Saying Out Loud.." },
  { content: <p key="3">"B.Tech vs BCA never felt like a gap with her. She looked at the work, appreciated it on its own terms, and never once slipped in a comparison. That takes a certain kind of character."</p> },
  { content: "(4). The Honest Part.." },
  { content: <p key="4">"You can say anything around her — serious, silly, the kind of things you would normally filter. And it all lands just fine. Conversations like that are hard to find."</p> },
  { content: "(5). Remember That Deal?.." },
  { content: <p key="5">"Whoever gets placed first helps the other one get there too — it was said casually, but it was meant. Real commitments are rare in college. That one felt real."</p> },
  { content: "(6). The Child-Person Energy.." },
  { content: <p key="6">"Completely unbothered and playful in one moment, unexpectedly mature and grounded in the next. Both versions are equally her, and both are equally worth knowing."</p> },
  { content: "(7). The Last One. The True One.." },
  { content: <p key="7">"After college, most connections quietly fade. But some people leave a mark that stays regardless of distance or time. Ritika is one of those people — and that says everything."</p> },
];

export default function About() {
  return (
    <>
      <div className="w-full h-auto bg-[#fefae0]">
        <Navbar />
        <div className="h-[85vh] w-full mt-[2px] relative">
          <div
            className="flower-area w-full h-50 absolute z-[77] top-0"
            style={{
              backgroundImage: `url('/flowers/Flowere_FLip.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <InfiniteScroll
            items={items}
            isTilted={true}
            tiltDirection="left"
            autoplay={true}
            autoplaySpeed={0.1}
            autoplayDirection="down"
            pauseOnHover={true}
          />
        </div>
      </div>
    </>
  );
}
