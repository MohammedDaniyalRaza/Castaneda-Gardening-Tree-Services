import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import { BUSINESS } from '../../data/business';
import { SERVICES } from '../../data/services';
import { FOOTER_QUICK_LINKS } from '../../data/nav';
import { GrassEdge } from '../svg/GrassEdge';
import { BannerRibbon } from '../svg/BannerRibbon';
import { LinkButton } from '../ui/Button';

export const Footer: React.FC = () => {
  const hasLicenses = Boolean(BUSINESS.contractorLicense || BUSINESS.treeServiceLicense);
  const socialEntries = Object.entries(BUSINESS.socialLinks).filter(([, val]) => Boolean(val));

  return (
    <footer className="main-footer surface-black" style={{ position: 'relative' }}>
      <GrassEdge fill="var(--black)" accent="var(--leaf)" />

      <div className="container" style={{ paddingTop: 'clamp(44px, 6vw, 72px)', paddingBottom: '36px' }}>
        {/* Top Row: Brand + Free Estimate */}
        <div
          className="grid gap-8 lg:grid-cols-[1.2fr_1fr]"
          style={{
            paddingBottom: '40px',
            borderBottom: '1px solid var(--border-dark)',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <Link to="/" className="logo-plate" style={{ height: '64px', padding: '6px 14px' }}>
              <img src={BUSINESS.logoPath} alt={BUSINESS.name} />
            </Link>
            <p className="lead-copy" style={{ color: 'rgba(255,255,255,0.82)', margin: 0 }}>
              Hardscape, lawns, irrigation, fencing, and tree care across{' '}
              <strong style={{ color: 'var(--white)' }}>{BUSINESS.region}</strong>.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <BannerRibbon>FREE ESTIMATES</BannerRibbon>
              {hasLicenses && (
                <span className="font-mono-label" style={{ color: 'var(--light-leaf)' }}>
                  {[BUSINESS.contractorLicense, BUSINESS.treeServiceLicense].filter(Boolean).join(' · ')}
                </span>
              )}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--soot)',
              border: '1px solid var(--border-dark-strong)',
              borderRadius: '18px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <p className="font-mono-label" style={{ color: 'var(--yellow)', margin: 0 }}>
              Call or Text for a Free On-Site Estimate
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <a href={BUSINESS.phones.primary.tel} className="c-btn c-btn--primary" style={{ width: '100%' }}>
                  <Phone size={16} aria-hidden="true" />
                  <span>{BUSINESS.phones.primary.display}</span>
                </a>
                <a
                  href={BUSINESS.phones.primary.sms}
                  className="c-btn c-btn--outline-on-dark c-btn--sm"
                  style={{ width: '100%' }}
                >
                  <MessageSquare size={14} aria-hidden="true" />
                  <span>Text Primary Line</span>
                </a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <a href={BUSINESS.phones.secondary.tel} className="c-btn c-btn--light" style={{ width: '100%' }}>
                  <Phone size={16} aria-hidden="true" />
                  <span>{BUSINESS.phones.secondary.display}</span>
                </a>
                <a
                  href={BUSINESS.phones.secondary.sms}
                  className="c-btn c-btn--outline-on-dark c-btn--sm"
                  style={{ width: '100%' }}
                >
                  <MessageSquare size={14} aria-hidden="true" />
                  <span>Text Secondary Line</span>
                </a>
              </div>
            </div>
            <LinkButton to="/contact" variant="green" style={{ width: '100%' }}>
              Request Estimate Online
            </LinkButton>
          </div>
        </div>

        {/* Columns */}
        <div
          className="grid gap-10 md:grid-cols-3"
          style={{ paddingBlock: '40px', borderBottom: '1px solid var(--border-dark)' }}
        >
          {/* Services */}
          <div>
            <h2 className="font-mono-label" style={{ color: 'var(--yellow)', margin: '0 0 16px' }}>
              Services
            </h2>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '8px',
              }}
            >
              {SERVICES.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    to={`/services/${svc.slug}`}
                    style={{
                      color: 'rgba(255,255,255,0.82)',
                      fontSize: '0.94rem',
                      display: 'inline-block',
                      paddingBlock: '2px',
                    }}
                  >
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-mono-label" style={{ color: 'var(--yellow)', margin: '0 0 16px' }}>
              Explore
            </h2>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      color: 'rgba(255,255,255,0.82)',
                      fontSize: '0.94rem',
                      display: 'inline-block',
                      paddingBlock: '2px',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Area & Provided Info */}
          <div>
            <h2 className="font-mono-label" style={{ color: 'var(--yellow)', margin: '0 0 16px' }}>
              Service Area
            </h2>
            <p
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                color: 'rgba(255,255,255,0.86)',
                margin: '0 0 12px',
                fontSize: '0.95rem',
              }}
            >
              <MapPin size={18} style={{ color: 'var(--yellow)', flexShrink: 0, marginTop: '3px' }} />
              <span>{BUSINESS.region}</span>
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: '0 0 16px' }}>
              San Jose, Santa Clara, Sunnyvale, Cupertino, Mountain View, Los Altos, Palo Alto, Campbell, Los Gatos, Saratoga, Milpitas, Morgan Hill, Gilroy.
            </p>
            <Link to="/service-area" className="c-btn c-btn--outline-on-dark c-btn--sm">
              View Area Map
            </Link>

            {BUSINESS.email && (
              <p style={{ margin: '14px 0 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              </p>
            )}
            {BUSINESS.streetAddress && (
              <p style={{ margin: '6px 0 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                {BUSINESS.streetAddress}
              </p>
            )}
            {BUSINESS.hours && (
              <p style={{ margin: '6px 0 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                Hours: {BUSINESS.hours}
              </p>
            )}
            {socialEntries.length > 0 && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
                {socialEntries.map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-label"
                    style={{ color: 'var(--light-leaf)' }}
                  >
                    {name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            paddingTop: '22px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.86rem',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          <span>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</span>
          <span>Silicon Valley · San Jose · Free Estimates</span>
        </div>
      </div>
    </footer>
  );
};
