'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Navbar() {
  const pathname = usePathname();
  const navbarRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    pathname === href ? 'active-link' : '';

  // Initial navbar animation
  useGSAP(() => {
    if (pathname === '/') {
      gsap.from('.navbar', {
        y: -30,
        scaleY: 0.5,
        rotateX: 45,
        duration: 1.2, // Slightly slower entrance for elegance
        opacity: 0,
        delay: 0.2,
        ease: 'power3.out',
      });
    }
  }, [pathname]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isHidden = false; // Prevents redundant GSAP calls

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!navbarRef.current) return;

      // 1. Always show gracefully when near the very top
      if (currentScrollY < 50) {
        if (isHidden) {
          gsap.to(navbarRef.current, {
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            overwrite: true,
          });
          isHidden = false;
        }
        lastScrollY = currentScrollY;
        return;
      }

      // 2. Ignore tiny micro-scrolls (increased to 30px for stability)
      if (Math.abs(currentScrollY - lastScrollY) < 30) return;

      // 3. Scroll Down -> Hide
      if (currentScrollY > lastScrollY && !isHidden) {
        gsap.to(navbarRef.current, {
          y: -130, // Just enough to hide h-30 (120px) + shadow
          duration: 0.85,
          ease: 'power3.inOut', // Smooth acceleration and deceleration
          overwrite: true,      // Cancels any ongoing animations
        });
        isHidden = true;
      }
      // 4. Scroll Up -> Reveal
      else if (currentScrollY < lastScrollY && isHidden) {
        gsap.to(navbarRef.current, {
          y: 0,
          duration: 0.85,
          ease: 'power3.out', // Snaps out smoothly
          overwrite: true,
        });
        isHidden = false;
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Fixed Navbar */}
      <div
        ref={navbarRef}
        className="navbar fixed top-0 left-0 w-full h-30 flex justify-center items-center py-2 z-999 backdrop-blur-[0.09rem] rounded-3xl"
      >
        <nav className="w-[95%] lg:w-3/4 h-full flex items-center relative justify-center">
          {/* Left Navigation */}
          <div className="nav-left hidden md:flex h-full w-1/2 items-center justify-center gap-6 lg:gap-10">
            <Link href="/" className={isActive('/')}>
              <h1 className="text-lg lg:text-2xl text-[#847B1A] transition-colors hover:text-[#5a5412]">
                Home
              </h1>
            </Link>

            <Link href="/meet-us" className={isActive('/meet-us')}>
              <h1 className="text-lg lg:text-2xl text-[#847B1A] cursor-pointer transition-colors hover:text-[#5a5412]">
                Meet us
              </h1>
            </Link>

            <Link href="/gallery" className={isActive('/gallery')}>
              <h1 className="text-lg lg:text-2xl text-[#847B1A] cursor-pointer transition-colors hover:text-[#5a5412]">
                Gallery
              </h1>
            </Link>
          </div>

          {/* Logo */}
          <div className="logo h-28 w-28 md:h-36 md:w-36 lg:h-42 lg:w-45 relative shrink-0">
            <Image
              src="https://res.cloudinary.com/dtslaveid/image/upload/v1780527053/R_letter_logo_zl3z0d.png"
              alt="Ritika Logo"
              fill
              priority
              sizes="(max-width: 768px) 112px, (max-width: 1024px) 144px, 180px"
              className="object-contain"
            />
          </div>

          {/* Right Navigation */}
          <div className="nav-right hidden md:flex h-full w-1/2 items-center justify-center gap-6 lg:gap-10">
            <Link href="/gratitude" className={isActive('/gratitude')}>
              <h1 className="text-lg lg:text-2xl text-[#847B1A] cursor-pointer transition-colors hover:text-[#5a5412]">
                Gratitude
              </h1>
            </Link>

            <Link href="/memories" className={isActive('/memories')}>
              <h1 className="text-lg lg:text-2xl text-[#847B1A] cursor-pointer transition-colors hover:text-[#5a5412]">
                Memories
              </h1>
            </Link>

            <Link href="/about" className={isActive('/about')}>
              <h1 className="text-lg lg:text-2xl text-[#847B1A] cursor-pointer transition-colors hover:text-[#5a5412]">
                About Ritika
              </h1>
            </Link>
          </div>
        </nav>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-30" />

      {/* Bottom Line */}
      <div className="line bg-[#847B1A] w-[90%] lg:w-[75%] h-[1px] m-auto opacity-70" />
    </>
  );
}