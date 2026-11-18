import React, { useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const VineLine: React.FC<{ className?: string }> = ({ className = '' }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(
    wrapRef,
    () => {
      if (reducedMotion || !wrapRef.current) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const path = wrapRef.current?.querySelector('.vine-stem') as SVGPathElement | null;
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        });
      });
      return () => mm.revert();
    },
    [reducedMotion]
  );

  return (
    <div ref={wrapRef} className={className} aria-hidden="true" style={{ overflow: 'hidden' }}>
      <svg
        viewBox="0 0 1200 44"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '32px', display: 'block' }}
      >
        <path
          className="vine-stem"
          d="M0 22 C160 6, 300 38, 480 22 C650 6, 820 38, 1020 20 C1100 12, 1160 22, 1200 22"
          fill="none"
          stroke="var(--leaf)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="240" cy="22" r="4" fill="var(--yellow)" />
        <circle cx="600" cy="22" r="4" fill="var(--yellow)" />
        <circle cx="960" cy="22" r="4" fill="var(--yellow)" />
      </svg>
    </div>
  );
};
