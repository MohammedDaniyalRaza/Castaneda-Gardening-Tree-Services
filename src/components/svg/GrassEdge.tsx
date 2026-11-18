import React, { useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface GrassEdgeProps {
  fill?: string;
  accent?: string;
  flip?: boolean;
  className?: string;
}

export const GrassEdge: React.FC<GrassEdgeProps> = ({
  fill = 'var(--black)',
  accent = 'var(--leaf)',
  flip = false,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(
    svgRef,
    () => {
      if (reducedMotion || !svgRef.current) return;
      const blades = svgRef.current.querySelectorAll('.grass-blade-sway');
      if (!blades.length) return;
      gsap.to(blades, {
        skewX: 4,
        duration: 2.6,
        stagger: { each: 0.14, from: 'random' },
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'bottom center',
      });
    },
    [reducedMotion]
  );

  return (
    <div
      className={className}
      style={{
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        transform: flip ? 'scaleY(-1)' : undefined,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1440 44"
        preserveAspectRatio="none"
        style={{ width: '100%', height: 'clamp(22px, 3vw, 38px)', display: 'block' }}
      >
        <path
          d="M0 44V26L22 14L38 28L56 8L74 29L98 16L118 30L142 10L168 27L192 12L214 31L240 16L266 28L292 8L318 29L345 14L370 28L398 10L425 30L452 15L478 28L504 9L530 29L558 14L585 30L612 10L640 27L668 13L695 29L724 8L752 28L780 15L806 30L834 9L860 28L888 14L915 29L944 10L972 28L1000 13L1028 29L1056 9L1084 28L1112 15L1140 30L1168 10L1196 27L1224 14L1252 29L1280 9L1308 28L1336 14L1364 29L1392 10L1418 27L1440 18V44H0Z"
          fill={fill}
        />
        <g className="grass-blade-sway" fill={accent} opacity="0.88">
          <path d="M48 44L56 6L64 44Z" />
          <path d="M184 44L192 10L200 44Z" />
          <path d="M284 44L292 6L300 44Z" />
          <path d="M496 44L504 7L512 44Z" />
          <path d="M716 44L724 6L732 44Z" />
          <path d="M936 44L944 8L952 44Z" />
          <path d="M1160 44L1168 8L1176 44Z" />
          <path d="M1384 44L1392 8L1400 44Z" />
        </g>
      </svg>
    </div>
  );
};
