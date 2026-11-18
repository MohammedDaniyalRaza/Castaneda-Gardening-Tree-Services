import React, { useRef } from 'react';
import { VineLine } from '../svg/VineLine';
import { BannerRibbon } from '../svg/BannerRibbon';
import { gsap } from '../../lib/gsap';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Call or Text Us',
    detail:
      'Reach us at (408) 914-8265 or (408) 284-9558, or send your project notes online. Tell us which city you are in and what your yard needs.',
  },
  {
    num: '02',
    title: 'Free On-Site Estimate',
    detail:
      'We walk the property with you, check access, slope, soil, and trees, and talk through practical material options in person.',
  },
  {
    num: '03',
    title: 'Clear Plan & Schedule',
    detail:
      'You get a straightforward written scope with zero pressure. Once you are ready, we lock in dates that fit your household.',
  },
  {
    num: '04',
    title: 'Craft & Clean Sweep',
    detail:
      'Our crew handles the build, trims or clears cleanly, hauls away green waste and debris, and sweeps walkways spotless before leaving.',
  },
];

export const ProcessTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(
    sectionRef,
    () => {
      if (reducedMotion || !sectionRef.current) return;
      const cards = sectionRef.current.querySelectorAll('.process-card');
      if (!cards.length) return;
      gsap.from(cards, {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });
    },
    [reducedMotion]
  );

  return (
    <section ref={sectionRef} className="surface-paper section-pad">
      <div className="container">
        <div style={{ marginBottom: '28px' }}>
          <div style={{ marginBottom: '14px' }}>
            <BannerRibbon light>HOW IT WORKS</BannerRibbon>
          </div>
          <h2 className="display-lg" style={{ margin: 0, color: 'var(--black)', maxWidth: '18ch' }}>
            From first call to{' '}
            <span className="editorial-accent" style={{ color: 'var(--forest)' }}>
              clean finish.
            </span>
          </h2>
        </div>

        <VineLine className="hidden lg:block" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: '24px' }}>
          {PROCESS_STEPS.map((step) => (
            <article
              key={step.num}
              className="process-card"
              style={{
                backgroundColor: 'var(--white)',
                border: '1px solid var(--border-light-strong)',
                borderRadius: '18px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <span
                className="editorial-numeral"
                style={{
                  fontSize: '3.1rem',
                  color: 'var(--forest)',
                }}
              >
                {step.num}
              </span>
              <h3 className="display-sm" style={{ margin: 0, color: 'var(--black)' }}>
                {step.title}
              </h3>
              <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--gray-dark)', lineHeight: 1.6 }}>
                {step.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
