import React, { useRef } from 'react';
import { Phone, ArrowRight, MessageSquare } from 'lucide-react';
import { BUSINESS } from '../../data/business';
import { IMAGES, getFull } from '../../data/images';
import { BannerRibbon } from '../svg/BannerRibbon';
import { GrassEdge } from '../svg/GrassEdge';
import { LinkButton } from '../ui/Button';
import { gsap } from '../../lib/gsap';
import { useAppReady } from '../../app/AppReadyContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useGsapContext } from '../../hooks/useGsapContext';

export const HomeHero: React.FC = () => {
  const { isReady } = useAppReady();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useGsapContext(
    sectionRef,
    () => {
      if (reducedMotion || !sectionRef.current) return;

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 12,
          scale: 1.09,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (!isReady) return;

      const targets = sectionRef.current.querySelectorAll('.hero-reveal');
      if (targets.length) {
        gsap.from(targets, {
          y: 26,
          opacity: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        });
      }
    },
    [isReady, reducedMotion]
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: 'clamp(640px, 92svh, 920px)',
        paddingTop: 'calc(var(--nav-height) + clamp(40px, 6vw, 72px))',
        paddingBottom: 'clamp(74px, 9vw, 118px)',
        backgroundColor: 'var(--black)',
        color: 'var(--white)',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Full-bleed hero image */}
      <img
        ref={bgRef}
        src={getFull(IMAGES.heroOasis.url)}
        alt={IMAGES.heroOasis.alt}
        loading="eager"
        decoding="sync"
        referrerPolicy="no-referrer"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: IMAGES.heroOasis.focalPoint,
          transform: 'scale(1.03)',
          pointerEvents: 'none',
        }}
      />

      {/* Directional contrast scrim */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(100deg, rgba(10,12,10,0.92) 0%, rgba(10,12,10,0.72) 48%, rgba(15,61,28,0.45) 100%), linear-gradient(180deg, rgba(10,12,10,0.5) 0%, rgba(10,12,10,0.2) 45%, rgba(10,12,10,0.88) 100%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.85fr] items-end">
          {/* Left Focal Block */}
          <div>
            <div
              className="hero-reveal"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '20px',
              }}
            >
              <BannerRibbon>FREE ESTIMATE</BannerRibbon>
              <span className="font-mono-label" style={{ color: 'var(--light-leaf)' }}>
                Silicon Valley · San Jose
              </span>
            </div>

            <h1
              className="display-xl hero-reveal"
              style={{ margin: '0 0 20px', color: 'var(--white)', maxWidth: '13ch' }}
            >
              YOUR YARD,{' '}
              <span className="display-outline-white">FULLY</span>{' '}
              <span className="editorial-accent" style={{ color: 'var(--yellow)' }}>
                grown.
              </span>
            </h1>

            <p
              className="lead-copy hero-reveal"
              style={{ margin: '0 0 28px', color: 'rgba(255,255,255,0.9)' }}
            >
              Concrete patios, interlocking pavers, fresh sod, mulch, water-wise irrigation,
              fencing, and careful tree care — handled by one hardworking local crew across
              San Jose and Silicon Valley.
            </p>

            <div
              className="hero-reveal"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <LinkButton to="/contact" variant="primary" size="lg">
                <span>Get a Free Estimate</span>
                <ArrowRight size={18} aria-hidden="true" />
              </LinkButton>

              <LinkButton href={BUSINESS.phones.primary.tel} variant="light" size="lg">
                <Phone size={18} aria-hidden="true" />
                <span>Call {BUSINESS.phones.primary.display}</span>
              </LinkButton>

              <LinkButton href={BUSINESS.phones.primary.sms} variant="outline-on-dark" size="lg">
                <MessageSquare size={18} aria-hidden="true" />
                <span>Text Us</span>
              </LinkButton>
            </div>
          </div>

          {/* Right Editorial Callout */}
          <div
            className="hero-reveal"
            style={{
              backgroundColor: 'rgba(18, 21, 18, 0.88)',
              border: '1px solid rgba(245, 197, 24, 0.35)',
              borderRadius: '18px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <p className="font-mono-label" style={{ color: 'var(--yellow)', margin: 0 }}>
              Direct Local Crew Lines
            </p>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.84)', fontSize: '0.96rem' }}>
              Talk straight to the crew walking your yard. Call or text either number to schedule
              your free on-site walkthrough.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href={BUSINESS.phones.primary.tel}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--deep-forest)',
                  border: '1px solid var(--leaf)',
                  color: 'var(--white)',
                  fontWeight: 700,
                }}
              >
                <span>{BUSINESS.phones.primary.display}</span>
                <span className="font-mono-label" style={{ color: 'var(--yellow)' }}>
                  Primary
                </span>
              </a>
              <a
                href={BUSINESS.phones.secondary.tel}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--black)',
                  border: '1px solid var(--border-dark-strong)',
                  color: 'var(--white)',
                  fontWeight: 700,
                }}
              >
                <span>{BUSINESS.phones.secondary.display}</span>
                <span className="font-mono-label" style={{ color: 'var(--light-leaf)' }}>
                  Line 2
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Grass divider into warm paper */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3 }}>
        <GrassEdge fill="var(--paper)" accent="var(--leaf)" />
      </div>
    </section>
  );
};
