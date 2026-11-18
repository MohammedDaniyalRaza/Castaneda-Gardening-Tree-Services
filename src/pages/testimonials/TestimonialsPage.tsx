import React, { useState, useMemo } from 'react';
import { TESTIMONIALS } from '../../data/testimonials';
import { SERVICES } from '../../data/services';
import { PageHero } from '../../components/sections/PageHero';
import { CtaBand } from '../../components/sections/CtaBand';
import { Chip } from '../../components/ui/Chip';
import { LinkButton } from '../../components/ui/Button';
import { usePageSeo } from '../../lib/seo';

export const TestimonialsPage: React.FC = () => {
  const [selectedSlug, setSelectedSlug] = useState<string>('all');

  usePageSeo({
    title: 'Client Reviews | Castaneda Gardening & Tree Services',
    description:
      'Sample homeowner feedback across San Jose, Cupertino, Sunnyvale, Campbell, and Silicon Valley for pavers, concrete, sod, and tree care.',
    path: '/testimonials',
  });

  const filterChips = [
    { slug: 'all', label: 'All Services' },
    ...SERVICES.map((s) => ({ slug: s.slug, label: s.shortTitle })),
  ];

  const filtered = useMemo(() => {
    if (selectedSlug === 'all') return TESTIMONIALS;
    return TESTIMONIALS.filter((t) => t.serviceSlug === selectedSlug);
  }, [selectedSlug]);

  return (
    <>
      <PageHero
        imageKey="afterYard"
        title="Homeowner"
        accentWord="Stories"
        subtitle="How local yards across San Jose and Silicon Valley go from overgrown or worn out to solid outdoor living spaces."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Testimonials' }]}
        bottomFill="var(--paper)"
      >
        <LinkButton to="/contact" variant="primary">
          Request Your Free Estimate
        </LinkButton>
      </PageHero>

      <section className="surface-paper section-pad">
        <div className="container">
          <div style={{ marginBottom: '28px' }}>
            <p className="font-mono-label" style={{ color: 'var(--forest)', fontWeight: 700, margin: '0 0 10px' }}>
              Sample reviews · Replace with verified client reviews prior to launch
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {filterChips.map((chip) => (
                <Chip
                  key={chip.slug}
                  label={chip.label}
                  active={selectedSlug === chip.slug}
                  onClick={() => setSelectedSlug(chip.slug)}
                />
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div
              style={{
                backgroundColor: 'var(--white)',
                borderRadius: '18px',
                padding: '32px',
                border: '1px solid var(--border-light-strong)',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: '0 0 14px', fontWeight: 700 }}>
                No sample notes under this single filter yet — showing all services works anytime.
              </p>
              <button
                type="button"
                className="c-btn c-btn--dark c-btn--sm"
                onClick={() => setSelectedSlug('all')}
              >
                Show All Reviews
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((rev, idx) => (
                <article
                  key={rev.id}
                  style={{
                    backgroundColor: idx % 4 === 0 ? 'var(--black)' : 'var(--white)',
                    color: idx % 4 === 0 ? 'var(--white)' : 'var(--black)',
                    border:
                      idx % 4 === 0
                        ? '2px solid var(--yellow)'
                        : '1px solid var(--border-light-strong)',
                    borderRadius: '18px',
                    padding: '26px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px',
                    transform: idx % 2 === 1 ? 'translateY(8px)' : 'none',
                  }}
                >
                  <div>
                    <span
                      className="font-mono-label"
                      style={{
                        color: idx % 4 === 0 ? 'var(--yellow)' : 'var(--forest)',
                        fontWeight: 700,
                      }}
                    >
                      {rev.service} · {rev.city}
                    </span>
                    <h2
                      className="font-editorial"
                      style={{
                        margin: '10px 0 12px',
                        fontSize: '1.35rem',
                      }}
                    >
                      “{rev.highlight}”
                    </h2>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.95rem',
                        lineHeight: 1.62,
                        color: idx % 4 === 0 ? 'rgba(255,255,255,0.84)' : 'var(--gray-dark)',
                      }}
                    >
                      {rev.quote}
                    </p>
                  </div>

                  <div
                    style={{
                      paddingTop: '12px',
                      borderTop:
                        idx % 4 === 0
                          ? '1px solid var(--border-dark)'
                          : '1px solid var(--border-light)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <strong>{rev.name}</strong>
                    <span
                      className="font-mono-label"
                      style={{
                        color: idx % 4 === 0 ? 'var(--light-leaf)' : 'var(--gray-dark)',
                      }}
                    >
                      {rev.city}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default TestimonialsPage;
