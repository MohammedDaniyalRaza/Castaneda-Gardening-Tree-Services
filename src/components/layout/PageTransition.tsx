import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, killAllScrollTriggers, refreshScrollTriggers } from '../../lib/gsap';
import { useLenis } from '../../hooks/useLenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const { scrollToTop } = useLenis();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    scrollToTop();
    killAllScrollTriggers();

    if (!reducedMotion && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0.01, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.36,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        }
      );
    }

    if (!reducedMotion && hairlineRef.current) {
      gsap.fromTo(
        hairlineRef.current,
        { scaleX: 0, opacity: 1 },
        {
          scaleX: 1,
          opacity: 0,
          duration: 0.38,
          ease: 'power2.out',
        }
      );
    }

    const rafId = requestAnimationFrame(() => {
      refreshScrollTriggers();
    });

    return () => cancelAnimationFrame(rafId);
  }, [location.pathname, scrollToTop, reducedMotion]);

  return (
    <>
      <div
        ref={hairlineRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: 'var(--yellow)',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          opacity: 0,
          zIndex: 999,
          pointerEvents: 'none',
        }}
      />
      <div ref={contentRef}>{children}</div>
    </>
  );
};
