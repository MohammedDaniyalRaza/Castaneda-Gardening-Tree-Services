import React from 'react';
import { IMAGES } from '../../data/images';
import { SmartImage } from '../ui/SmartImage';
import { BannerRibbon } from '../svg/BannerRibbon';
import { LinkButton } from '../ui/Button';
import { TreeGlyph, ConeShrubGlyph, GazeboGlyph } from '../svg/BrandGlyphs';

const REASONS = [
  {
    icon: 'gazebo' as const,
    title: 'One crew from concrete to canopy',
    copy: 'No juggling separate tree cutters, concrete finishers, and lawn crews. We coordinate tree clearing, base prep, hardscape, sprinklers, and fresh plantings in the right order.',
  },
  {
    icon: 'shrub' as const,
    title: 'Straightforward estimates, zero pressure',
    copy: 'We show up, measure carefully, point out drainage or root details you should know about, and hand you an honest scope before a shovel hits the dirt.',
  },
  {
    icon: 'tree' as const,
    title: 'Built for Silicon Valley soil & sun',
    copy: 'Heavy valley clay, dry summer heat, and mature neighborhood shade trees all call for specific grading, aeration, mulch depth, and drip irrigation habits.',
  },
];

export const WhyUsSection: React.FC = () => {
  return (
    <section className="surface-soot section-pad">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.15fr] items-center">
          {/* Gazebo-arch framed photo */}
          <div style={{ position: 'relative' }}>
            <div className="gazebo-arch-mask" style={{ border: '2px solid var(--yellow)' }}>
              <SmartImage
                src={IMAGES.maintenance.url}
                alt={IMAGES.maintenance.alt}
                aspectRatio="4 / 3"
                focalPoint={IMAGES.maintenance.focalPoint}
              />
            </div>
            <div
              style={{
                marginTop: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span className="font-mono-label" style={{ color: 'var(--light-leaf)' }}>
                San Jose &amp; Surrounding Cities
              </span>
              <span className="font-mono-label" style={{ color: 'var(--yellow)' }}>
                Free On-Site Estimates
              </span>
            </div>
          </div>

          {/* Editorial copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
            <BannerRibbon>WHY CASTANEDA</BannerRibbon>
            <h2 className="display-lg" style={{ margin: 0, color: 'var(--white)' }}>
              Show up. Do it right.{' '}
              <span className="editorial-accent" style={{ color: 'var(--yellow)' }}>
                Leave it clean.
              </span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '100%' }}>
              {REASONS.map((reason) => (
                <div
                  key={reason.title}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    padding: '18px',
                    borderRadius: '14px',
                    backgroundColor: 'var(--black)',
                    border: '1px solid var(--border-dark)',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--deep-forest)',
                      color: 'var(--yellow)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {reason.icon === 'gazebo' ? (
                      <GazeboGlyph size={24} />
                    ) : reason.icon === 'shrub' ? (
                      <ConeShrubGlyph size={24} />
                    ) : (
                      <TreeGlyph size={24} />
                    )}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '1.08rem', fontWeight: 700 }}>
                      {reason.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.94rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.55 }}>
                      {reason.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <LinkButton to="/about" variant="outline-on-dark">
              Read More About Our Crew
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
};
