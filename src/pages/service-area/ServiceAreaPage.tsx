import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import {
  SERVICE_AREA_HEADLINE,
  SERVICE_CITIES,
  AREA_FALLBACK_NOTE,
} from '../../data/areas';
import { BUSINESS } from '../../data/business';
import { PageHero } from '../../components/sections/PageHero';
import { CtaBand } from '../../components/sections/CtaBand';
import { SiliconValleyMap } from '../../components/svg/SiliconValleyMap';
import { LinkButton } from '../../components/ui/Button';
import { usePageSeo } from '../../lib/seo';

export const ServiceAreaPage: React.FC = () => {
  usePageSeo({
    title: 'Service Area | San Jose & Silicon Valley | Castaneda',
    description:
      'Serving Silicon Valley, centered on San Jose — including Santa Clara, Sunnyvale, Cupertino, Mountain View, Los Altos, Palo Alto, Campbell, Los Gatos, Saratoga, Milpitas, Morgan Hill, and Gilroy.',
    path: '/service-area',
  });

  return (
    <>
      <PageHero
        imageKey="irrigationFences"
        title="Silicon Valley,"
        accentWord="centered on San Jose."
        subtitle="Local gardening, hardscape, fencing, irrigation, and tree care across Santa Clara Valley neighborhoods."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Service Area' }]}
        bottomFill="var(--soot)"
      >
        <LinkButton to="/contact" variant="primary">
          Request a Free Estimate
        </LinkButton>
      </PageHero>

      <section className="surface-soot section-pad">
        <div className="container">
          <div style={{ marginBottom: '28px' }}>
            <span className="font-mono-label" style={{ color: 'var(--yellow)' }}>
              Interactive Coverage Map
            </span>
            <h2 className="display-lg" style={{ margin: '8px 0 8px', color: 'var(--white)' }}>
              {SERVICE_AREA_HEADLINE}
            </h2>
            <p className="body-copy" style={{ margin: 0, color: 'rgba(255,255,255,0.78)' }}>
              Click any city pin or pill below to see what we commonly handle in that neighborhood.
            </p>
          </div>

          <SiliconValleyMap />
        </div>
      </section>

      <section className="surface-paper section-pad">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CITIES.map((city) => (
              <div
                key={city.slug}
                style={{
                  backgroundColor: city.primary ? 'var(--black)' : 'var(--white)',
                  color: city.primary ? 'var(--white)' : 'var(--black)',
                  border: city.primary
                    ? '2px solid var(--yellow)'
                    : '1px solid var(--border-light-strong)',
                  borderRadius: '16px',
                  padding: '22px',
                }}
              >
                <span
                  className="font-mono-label"
                  style={{
                    color: city.primary ? 'var(--yellow)' : 'var(--forest)',
                    fontWeight: 700,
                  }}
                >
                  {city.primary ? 'Central Hub' : 'Nearby Service Area'}
                </span>
                <h3 className="display-sm" style={{ margin: '6px 0 8px' }}>
                  {city.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.94rem',
                    lineHeight: 1.55,
                    color: city.primary ? 'rgba(255,255,255,0.84)' : 'var(--gray-dark)',
                  }}
                >
                  {city.note}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '32px',
              backgroundColor: 'var(--deep-forest)',
              color: 'var(--white)',
              borderRadius: '18px',
              padding: '28px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '18px',
            }}
          >
            <div>
              <h2 className="display-sm" style={{ margin: '0 0 6px', color: 'var(--yellow)' }}>
                {AREA_FALLBACK_NOTE}
              </h2>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.86)' }}>
                Reach our crew directly to confirm availability in your neighborhood.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <LinkButton href={BUSINESS.phones.primary.tel} variant="primary">
                <Phone size={16} />
                <span>{BUSINESS.phones.primary.display}</span>
              </LinkButton>
              <LinkButton href={BUSINESS.phones.primary.sms} variant="light">
                <MessageSquare size={16} />
                <span>Text Us</span>
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default ServiceAreaPage;
