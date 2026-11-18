import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../../data/services';
import { LeafGlyph } from '../svg/BrandGlyphs';

const TRUST_POINTS = [
  {
    title: 'Free On-Site Estimates',
    detail: 'We walk your yard in person and spell out the scope clearly before any work starts.',
  },
  {
    title: 'Hardscape, Lawn & Trees',
    detail: 'One coordinated local crew from tree clearing and concrete to sod and irrigation.',
  },
  {
    title: 'Silicon Valley Based',
    detail: 'Centered on San Jose — built for Bay Area clay soil, dry summers, and residential lots.',
  },
  {
    title: 'Call or Text Anytime',
    detail: 'Reach us directly at (408) 914-8265 or (408) 284-9558 to set up a walkthrough.',
  },
];

export const TrustStrip: React.FC = () => {
  const marqueeList = [...SERVICES, ...SERVICES];

  return (
    <section className="surface-paper" style={{ paddingTop: 'clamp(36px, 5vw, 56px)' }}>
      <div className="container">
        <div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            paddingBottom: 'clamp(32px, 4vw, 48px)',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          {TRUST_POINTS.map((point, idx) => (
            <div key={point.title} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span
                className="font-mono-label tabular-nums"
                style={{ color: 'var(--forest)', fontWeight: 700 }}
              >
                0{idx + 1}
              </span>
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.08rem',
                  fontWeight: 700,
                  color: 'var(--black)',
                }}
              >
                {point.title}
              </h2>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--gray-dark)', lineHeight: 1.5 }}>
                {point.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee of all 9 services */}
      <div
        className="marquee-viewport"
        style={{
          backgroundColor: 'var(--deep-forest)',
          color: 'var(--white)',
          paddingBlock: '14px',
          marginTop: 'clamp(28px, 4vw, 44px)',
          borderTop: '2px solid var(--yellow)',
          borderBottom: '2px solid var(--yellow)',
        }}
      >
        <div className="marquee-track">
          {marqueeList.map((svc, idx) => (
            <Link
              key={`${svc.slug}-${idx}`}
              to={`/services/${svc.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                letterSpacing: '0.02em',
                color: idx % 2 === 0 ? 'var(--yellow)' : 'var(--white)',
                whiteSpace: 'nowrap',
              }}
            >
              <LeafGlyph size={16} />
              <span>{svc.title.toUpperCase()}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
