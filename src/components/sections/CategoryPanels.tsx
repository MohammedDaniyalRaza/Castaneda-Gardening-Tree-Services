import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import {
  SERVICE_CATEGORIES,
  getServicesByCategory,
  type ServiceCategory,
} from '../../data/services';
import { IMAGES } from '../../data/images';
import { SmartImage } from '../ui/SmartImage';
import { GazeboGlyph, ConeShrubGlyph, TreeGlyph } from '../svg/BrandGlyphs';
import { BannerRibbon } from '../svg/BannerRibbon';
import { LinkButton } from '../ui/Button';

export const CategoryPanels: React.FC = () => {
  const [activeDesktop, setActiveDesktop] = useState<ServiceCategory>('Hardscape');
  const [openMobile, setOpenMobile] = useState<ServiceCategory>('Hardscape');

  const renderGlyph = (glyph: 'gazebo' | 'shrub' | 'tree') => {
    if (glyph === 'gazebo') return <GazeboGlyph size={30} />;
    if (glyph === 'shrub') return <ConeShrubGlyph size={30} />;
    return <TreeGlyph size={30} />;
  };

  return (
    <section className="surface-paper section-pad">
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
              <BannerRibbon light>9 CORE SERVICES</BannerRibbon>
            </div>
            <h2 className="display-lg" style={{ margin: 0, color: 'var(--black)', maxWidth: '16ch' }}>
              Everything your yard{' '}
              <span className="editorial-accent" style={{ color: 'var(--forest)' }}>
                needs.
              </span>
            </h2>
          </div>

          <LinkButton to="/services" variant="dark">
            <span>Compare All Services</span>
            <ArrowRight size={17} aria-hidden="true" />
          </LinkButton>
        </div>

        {/* Desktop Interactive 3-Panel Showcase (>= 1024px) */}
        <div
          className="hidden lg:grid gap-4"
          style={{
            gridTemplateColumns: SERVICE_CATEGORIES.map((c) =>
              c.id === activeDesktop ? '2.2fr' : '1fr'
            ).join(' '),
            transition: 'grid-template-columns 360ms var(--ease-out)',
            minHeight: '500px',
          }}
        >
          {SERVICE_CATEGORIES.map((cat, idx) => {
            const isOpen = activeDesktop === cat.id;
            const services = getServicesByCategory(cat.id);
            const coverImg =
              cat.id === 'Hardscape'
                ? IMAGES.pavers
                : cat.id === 'Lawn & Garden'
                ? IMAGES.sodMulch
                : IMAGES.treeCare;

            return (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveDesktop(cat.id)}
                style={{
                  backgroundColor: isOpen ? 'var(--black)' : 'var(--paper-warm)',
                  color: isOpen ? 'var(--white)' : 'var(--black)',
                  border: isOpen
                    ? '2px solid var(--yellow)'
                    : '1px solid var(--border-light-strong)',
                  borderRadius: '20px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'background-color 280ms ease, color 280ms ease, border-color 280ms ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    className="editorial-numeral"
                    style={{
                      fontSize: '2.4rem',
                      color: isOpen ? 'var(--yellow)' : 'var(--forest)',
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveDesktop(cat.id)}
                    aria-expanded={isOpen}
                    aria-label={`Inspect ${cat.title} services`}
                    style={{
                      background: isOpen ? 'var(--deep-forest)' : 'var(--white)',
                      color: isOpen ? 'var(--yellow)' : 'var(--black)',
                      border: '1px solid rgba(10,12,10,0.15)',
                      borderRadius: '10px',
                      width: '48px',
                      height: '48px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    {renderGlyph(cat.glyph)}
                  </button>
                </div>

                <div>
                  <h3 className="display-md" style={{ margin: '0 0 10px' }}>
                    {cat.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.96rem',
                      lineHeight: 1.55,
                      color: isOpen ? 'rgba(255,255,255,0.82)' : 'var(--gray-dark)',
                    }}
                  >
                    {cat.subtitle}
                  </p>
                </div>

                {isOpen ? (
                  <div className="grid gap-5 grid-cols-[1.1fr_0.9fr] items-end">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {services.map((svc) => (
                        <Link
                          key={svc.slug}
                          to={`/services/${svc.slug}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            backgroundColor: 'var(--soot)',
                            border: '1px solid var(--border-dark)',
                            color: 'var(--white)',
                            fontWeight: 700,
                            fontSize: '0.94rem',
                          }}
                        >
                          <span>{svc.title}</span>
                          <ArrowRight size={15} style={{ color: 'var(--yellow)' }} />
                        </Link>
                      ))}
                    </div>

                    <div className="gazebo-arch-mask" style={{ border: '2px solid var(--forest)' }}>
                      <SmartImage
                        src={coverImg.url}
                        alt={coverImg.alt}
                        aspectRatio="4 / 3"
                        focalPoint={coverImg.focalPoint}
                        thumb
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span
                      className="font-mono-label"
                      style={{ color: 'var(--forest)', fontWeight: 700 }}
                    >
                      {services.length} Services Included
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveDesktop(cat.id)}
                      className="c-btn c-btn--dark c-btn--sm"
                      style={{ alignSelf: 'flex-start' }}
                    >
                      Explore {cat.title}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Purposeful Stacked Accordion Redesign (< 1024px) */}
        <div className="flex flex-col gap-4 lg:hidden">
          {SERVICE_CATEGORIES.map((cat, idx) => {
            const isOpen = openMobile === cat.id;
            const services = getServicesByCategory(cat.id);
            const coverImg =
              cat.id === 'Hardscape'
                ? IMAGES.pavers
                : cat.id === 'Lawn & Garden'
                ? IMAGES.sodMulch
                : IMAGES.treeCare;

            return (
              <div
                key={cat.id}
                style={{
                  backgroundColor: isOpen ? 'var(--black)' : 'var(--white)',
                  color: isOpen ? 'var(--white)' : 'var(--black)',
                  borderRadius: '16px',
                  border: isOpen
                    ? '2px solid var(--yellow)'
                    : '1px solid var(--border-light-strong)',
                  overflow: 'hidden',
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenMobile(cat.id)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                    background: 'transparent',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span
                      className="editorial-numeral"
                      style={{
                        fontSize: '1.65rem',
                        color: isOpen ? 'var(--yellow)' : 'var(--forest)',
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="display-sm" style={{ margin: 0 }}>
                        {cat.title}
                      </h3>
                      <span
                        className="font-mono-label"
                        style={{
                          color: isOpen ? 'var(--light-leaf)' : 'var(--gray-dark)',
                        }}
                      >
                        {services.length} services
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    size={22}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 200ms ease',
                      color: isOpen ? 'var(--yellow)' : 'var(--black)',
                      flexShrink: 0,
                    }}
                  />
                </button>

                {isOpen && (
                  <div style={{ padding: '0 20px 22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.82)', fontSize: '0.94rem' }}>
                      {cat.subtitle}
                    </p>
                    <div className="garden-frame">
                      <SmartImage
                        src={coverImg.url}
                        alt={coverImg.alt}
                        aspectRatio="16 / 9"
                        focalPoint={coverImg.focalPoint}
                        thumb
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {services.map((svc) => (
                        <Link
                          key={svc.slug}
                          to={`/services/${svc.slug}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            backgroundColor: 'var(--soot)',
                            border: '1px solid var(--border-dark)',
                            color: 'var(--white)',
                            fontWeight: 700,
                          }}
                        >
                          <span>{svc.title}</span>
                          <ArrowRight size={16} style={{ color: 'var(--yellow)' }} />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
