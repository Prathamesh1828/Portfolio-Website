"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const lenis = new Lenis({
      lerp: isMobile ? 0.1 : 0.05,
      wheelMultiplier: 1,
      touchMultiplier: isMobile ? 1.5 : 2,
      syncTouch: true,
    });
    lenisRef.current = lenis;
    // @ts-expect-error - Expose lenis globally for components like Navbar
    window.__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Intercept anchor links for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href !== '#') {
        e.preventDefault();
        const element = document.querySelector(href) as HTMLElement;
        if (element) {
          lenis.scrollTo(element, { duration: 1.2 });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      // @ts-expect-error
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
