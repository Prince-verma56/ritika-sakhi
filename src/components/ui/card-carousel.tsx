'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { SparklesIcon } from 'lucide-react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Badge } from '@/components/ui/badge';

interface CarouselImage {
  src: string;
  alt: string;
}

interface CardCarouselProps {
  images: CarouselImage[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

const swiperCss = `
  .swiper { width: 100%; padding-bottom: 50px; }
  .swiper-slide { background-position: center; background-size: cover; width: 300px; }
  .swiper-slide img { display: block; width: 100%; border-radius: 15px; }
  .swiper-3d .swiper-slide-shadow-left { background-image: none; }
  .swiper-3d .swiper-slide-shadow-right { background: none; }
`;

export const CardCarousel: React.FC<CardCarouselProps> = ({
  images,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
}) => {
  const slides = React.useMemo(() => {
    if (!images || images.length === 0) return [];
    let list = [...images];
    // Keep duplicating until there are at least 10 slides to satisfy Swiper loop mode requirements
    while (list.length < 10) {
      list = [...list, ...images];
    }
    return list;
  }, [images]);

  return (
    <section className="w-full space-y-4">
      <style>{swiperCss}</style>
      <div className="mx-auto w-full max-w-6xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-t-[44px]">
        <div className="relative mx-auto flex w-full flex-col rounded-[24px] border border-black/5 bg-neutral-800/5 p-2 shadow-sm md:items-start md:gap-8 md:rounded-b-[20px] md:rounded-t-[40px] md:p-2">
          <Badge
            variant="outline"
            className="absolute left-4 top-6 rounded-[14px] border border-black/10 text-base md:left-6"
          >
            <SparklesIcon className="fill-[#EEBDE0] stroke-1 text-neutral-800" />{' '}
            The Poetry of her Hands
          </Badge>
          <div className="flex flex-col justify-center pb-2 pl-4 pt-14 md:items-center">
            <div className="flex gap-2">
              <div>
                <h3 className="text-4xl opacity-85 font-bold tracking-tight">Feel of sensation</h3>
                <p>You never think about ..</p>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-4">
            <div className="w-full">
              <Swiper
                spaceBetween={50}
                autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView="auto"
                coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5 }}
                pagination={showPagination}
                navigation={showNavigation ? { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } : undefined}
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {slides.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="size-full rounded-3xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.src} alt={image.alt} className="size-full rounded-xl" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
