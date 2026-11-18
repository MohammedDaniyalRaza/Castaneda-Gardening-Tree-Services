import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { IMAGES, getFull } from '../../data/images';
import { BannerRibbon } from '../svg/BannerRibbon';
import { GrassEdge } from '../svg/GrassEdge';
import { gsap } from '../../lib/gsap';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageHeroProps {
  imageKey: string;
  title: string;
  accentWord?: string;
  subtitle: string;
  ribbonText?: string;
  breadcrumbs: BreadcrumbItem[];
  children?: React.ReactNode;
  bottomFill?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  imageKey,
  title,
  accentWord,
  subtitle,
  ribbonText = 'FREE ESTIMATES',
  breadcrumbs,
  children,
  bottomFill = 'var(--paper)',
}) => {
  const image = IMAGES[imageKey] || IMAGES.heroOasis;
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(
    heroRef,
    () => {
      if (reducedMotion || !bgRef.current || !heroRef.current) return;
      gsap.to(bgRef.current, {
        yPercent: 10,
        scale: 1.07,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    [reducedMotion]
  );

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: 'clamp(420px, 54vh, 580px)',
        paddingTop: 'calc(var(--nav-height) + clamp(36px, 5vw, 64px))',
        paddingBottom: 'clamp(58px, 7vw, 88px)',
        backgroundColor: 'var(--black)',
        color: 'var(--white)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Full-bleed background image */}
      <img
        ref={bgRef}
        src={getFull(image.url)}
        alt={image.alt}
        loading="eager"
        decoding="sync"
        referrerPolicy="no-referrer"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: image.focalPoint,
          transform: 'scale(1.03)',
          pointerEvents: 'none',
        }}
      />

      {/* Contrast Scrim */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(10,12,10,0.72) 0%, rgba(15,61,28,0.68) 48%, rgba(10,12,10,0.94) 100%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '18px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.78)',
          }}
        >
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label}>
              {idx > 0 && <ChevronRight size={14} aria-hidden="true" />}
              {crumb.to ? (
                <Link to={crumb.to} style={{ color: 'var(--light-leaf)' }}>
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" style={{ color: 'var(--yellow)' }}>
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div style={{ marginBottom: '16px' }}>
          <BannerRibbon>{ribbonText}</BannerRibbon>
        </div>

        <h1 className="display-lg" style={{ margin: '0 0 16px', maxWidth: '18ch', color: 'var(--white)' }}>
          {title}{' '}
          {accentWord && (
            <span className="editorial-accent" style={{ color: 'var(--yellow)' }}>
              {accentWord}
            </span>
          )}
        </h1>

        <p className="lead-copy" style={{ margin: '0 0 24px', color: 'rgba(255,255,255,0.88)' }}>
          {subtitle}
        </p>

        {children && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {children}
          </div>
        )}
      </div>

      {/* Grass edge bottom cut */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3 }}>
        <GrassEdge fill={bottomFill} accent="var(--leaf)" />
      </div>
    </section>
  );
};
