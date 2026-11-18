import React from 'react';
import { TESTIMONIALS } from '../../data/testimonials';
import { BannerRibbon } from '../svg/BannerRibbon';
import { LinkButton } from '../ui/Button';

export const TestimonialsSection: React.FC = () => {
  const featured = TESTIMONIALS.slice(0, 4);

  return (
    <section className="surface-black section-pad">
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '20px',
            marginBottom: 'clamp(28px, 4vw, 44px)',
          }}
        >
          <div>
            <div style={{ marginBottom: '14px' }}>
              <BannerRibbon>NEIGHBOR STORIES</BannerRibbon>
            </div>
            <h2 className="display-lg" style={{ margin: '0 0 8px', color: 'var(--white)' }}>
              Built for{' '}
              <span className="editorial-accent" style={{ color: 'var(--yellow)' }}>
                Bay Area
              </span>{' '}
              homeowners.
            </h2>
            <p className="font-mono-label" style={{ margin: 0, color: 'var(--gray)' }}>
              Sample reviews · Real client reviews added prior to launch
            </p>
          </div>

          <LinkButton to="/testimonials" variant="outline-on-dark">
            Read All Reviews
          </LinkButton>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((rev, idx) => (
            <article
              key={rev.id}
              style={{
                backgroundColor: idx === 0 ? 'var(--deep-forest)' : 'var(--soot)',
                border: idx === 0 ? '2px solid var(--yellow)' : '1px solid var(--border-dark-strong)',
                borderRadius: '18px',
                padding: 'clamp(22px, 3vw, 30px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '18px',
              }}
            >
              <div>
                <p
                  className="font-mono-label"
                  style={{ color: 'var(--yellow)', margin: '0 0 10px' }}
                >
                  {rev.service} · {rev.city}
                </p>
                <h3
                  className="font-editorial"
                  style={{
                    margin: '0 0 12px',
                    fontSize: 'clamp(1.25rem, 1.8vw, 1.55rem)',
                    color: 'var(--white)',
                  }}
                >
                  “{rev.highlight}”
                </h3>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.84)', lineHeight: 1.6 }}>
                  {rev.quote}
                </p>
              </div>

              <div
                style={{
                  paddingTop: '14px',
                  borderTop: '1px solid var(--border-dark)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <strong style={{ color: 'var(--white)' }}>{rev.name}</strong>
                <span className="font-mono-label" style={{ color: 'var(--light-leaf)' }}>
                  {rev.city}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
