import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useReducedMotion } from './useReducedMotion';

interface LenisContextValue {
  stopScroll: () => void;
  startScroll: () => void;
  scrollToTop: () => void;
  scrollToElement: (target: string | HTMLElement) => void;
}

const LenisContext = createContext<LenisContextValue>({
  stopScroll: () => {},
  startScroll: () => {},
  scrollToTop: () => {},
  scrollToElement: () => {},
});

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const stopScroll = useCallback(() => {
    lenisRef.current?.stop();
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }, []);

  const startScroll = useCallback(() => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    lenisRef.current?.start();
  }, []);

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, []);

  const scrollToElement = useCallback((target: string | HTMLElement) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -84 });
    } else if (typeof target === 'string') {
      document.querySelector(target)?.scrollIntoView({ behavior: 'auto' });
    } else {
      target.scrollIntoView({ behavior: 'auto' });
    }
  }, []);

  return React.createElement(
    LenisContext.Provider,
    { value: { stopScroll, startScroll, scrollToTop, scrollToElement } },
    children
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
