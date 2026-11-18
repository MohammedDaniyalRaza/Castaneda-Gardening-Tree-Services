import React from 'react';
import { IMAGES } from '../../data/images';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';
import { BannerRibbon } from '../svg/BannerRibbon';
import { LinkButton } from '../ui/Button';

export const BeforeAfterSection: React.FC = () => {
  return (
    <section className="surface-forest section-pad">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.35fr] items-center">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'flex-start' }}>
            <BannerRibbon>YARD RESET &amp; RENOVATION</BannerRibbon>
            <h2 className="display-lg" style={{ margin: 0, color: 'var(--white)' }}>
              From overgrown{' '}
              <span className="editorial-accent" style={{ color: 'var(--yellow)' }}>
                to lived-in.
              </span>
            </h2>
            <p className="body-copy" style={{ margin: 0, color: 'rgba(255,255,255,0.86)' }}>
              Drag across to compare a tired, weed-covered yard against a clean reset with
              interlocking pavers, fresh sod, trimmed border shrubs, and deep bark mulch.
            </p>
            <p
              className="font-mono-label"
              style={{ margin: 0, color: 'var(--light-leaf)' }}
            >
              Sample visual · Drag handle or use arrow keys
            </p>
            <LinkButton to="/gallery" variant="light">
              View Project Gallery
            </LinkButton>
          </div>

          <BeforeAfterSlider
            beforeUrl={IMAGES.beforeYard.url}
            beforeAlt={IMAGES.beforeYard.alt}
            afterUrl={IMAGES.afterYard.url}
            afterAlt={IMAGES.afterYard.alt}
          />
        </div>
      </div>
    </section>
  );
};
