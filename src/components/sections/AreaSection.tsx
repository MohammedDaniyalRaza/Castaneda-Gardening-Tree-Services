import React from 'react';
import { AREA_FALLBACK_NOTE, SERVICE_AREA_HEADLINE } from '../../data/areas';
import { SiliconValleyMap } from '../svg/SiliconValleyMap';
import { BannerRibbon } from '../svg/BannerRibbon';
import { LinkButton } from '../ui/Button';

export const AreaSection: React.FC = () => {
  return (
    <section className="surface-soot section-pad">
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '20px',
            marginBottom: 'clamp(28px, 4vw, 40px)',
          }}
        >
          <div>
            <div style={{ marginBottom: '14px' }}>
              <BannerRibbon>LOCAL COVERAGE</BannerRibbon>
            </div>
            <h2 className="display-lg" style={{ margin: '0 0 10px', color: 'var(--white)' }}>
              {SERVICE_AREA_HEADLINE.split(',')[0]},{' '}
              <span className="editorial-accent" style={{ color: 'var(--yellow)' }}>
                centered on San Jose.
              </span>
            </h2>
            <p className="body-copy" style={{ margin: 0, color: 'rgba(255,255,255,0.78)' }}>
              {AREA_FALLBACK_NOTE}
            </p>
          </div>

          <LinkButton to="/service-area" variant="primary">
            Explore Service Area
          </LinkButton>
        </div>

        <SiliconValleyMap />
      </div>
    </section>
  );
};
