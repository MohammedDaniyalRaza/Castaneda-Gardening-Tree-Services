import React from 'react';
import { Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { BUSINESS } from '../../data/business';
import { IMAGES, getFull } from '../../data/images';
import { BannerRibbon } from '../svg/BannerRibbon';
import { LinkButton } from '../ui/Button';

interface CtaBandProps {
  heading?: string;
  subcopy?: string;
}

export const CtaBand: React.FC<CtaBandProps> = ({
  heading = 'Ready to walk your yard?',
  subcopy = 'Call, text, or request your free on-site estimate anywhere across San Jose and Silicon Valley.',
}) => {
  return (
    <section
      style={{
        position: 'relative',
        paddingBlock: 'clamp(64px, 9vw, 112px)',
        backgroundColor: 'var(--deep-forest)',
        color: 'var(--white)',
        overflow: 'hidden',
      }}
    >
      <img
        src={getFull(IMAGES.afterYard.url)}
        alt={IMAGES.afterYard.alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: IMAGES.afterYard.focalPoint,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(120deg, rgba(10,12,10,0.92) 0%, rgba(15,61,28,0.86) 55%, rgba(10,12,10,0.9) 100%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
          <BannerRibbon>FREE ESTIMATE</BannerRibbon>
          <h2 className="display-lg" style={{ margin: 0, color: 'var(--white)' }}>
            {heading}
          </h2>
          <p className="lead-copy" style={{ margin: 0, color: 'rgba(255,255,255,0.88)' }}>
            {subcopy}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '6px' }}>
            <LinkButton to="/contact" variant="primary" size="lg">
              <span>Request Free Estimate</span>
              <ArrowRight size={18} aria-hidden="true" />
            </LinkButton>
            <LinkButton href={BUSINESS.phones.primary.tel} variant="light" size="lg">
              <Phone size={18} aria-hidden="true" />
              <span>{BUSINESS.phones.primary.display}</span>
            </LinkButton>
            <LinkButton href={BUSINESS.phones.secondary.tel} variant="outline-on-dark" size="lg">
              <Phone size={18} aria-hidden="true" />
              <span>{BUSINESS.phones.secondary.display}</span>
            </LinkButton>
            <LinkButton href={BUSINESS.phones.primary.sms} variant="outline-on-dark" size="lg">
              <MessageSquare size={18} aria-hidden="true" />
              <span>Text Us</span>
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
};
