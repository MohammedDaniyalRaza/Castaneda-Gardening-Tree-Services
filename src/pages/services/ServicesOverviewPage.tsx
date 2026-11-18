import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  SERVICES,
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from '../../data/services';
import { IMAGES } from '../../data/images';
import { PageHero } from '../../components/sections/PageHero';
import { CtaBand } from '../../components/sections/CtaBand';
import { SmartImage } from '../../components/ui/SmartImage';
import { Chip } from '../../components/ui/Chip';
import { BannerRibbon } from '../../components/svg/BannerRibbon';
import { LinkButton } from '../../components/ui/Button';
import { usePageSeo } from '../../lib/seo';

const COST_FACTORS = [
  {
    title: 'Area & Footprint',
    detail: 'Square footage of patios, walkways, sod turf, or total linear feet of fencing.',
  },
  {
    title: 'Material Selection',
    detail: 'Natural stone pavers vs. brushed concrete, redwood vs. cedar, or synthetic turf style.',
  },
  {
    title: 'Yard Access',
    detail: 'Gate width and path distance from the street curb for wheelbarrows, concrete, or equipment.',
  },
  {
    title: 'Slope & Grading',
    detail: 'Flat level lots vs. sloped yards needing extra excavation, steps, or surface drainage.',
  },
  {
    title: 'Tree Size & Clearance',
    detail: 'Canopy height, branch thickness, and proximity to roofs, sheds, or overhead drops.',
  },
  {
    title: 'Demolition & Haul-Off',
    detail: 'Breaking out old cracked concrete, pulling dead turf, or hauling heavy green waste.',
  },
];

const COMPARISON_ROWS = [
  {
    surface: 'Interlocking Pavers',
    bestFor: 'Patios, curved walks, driveways & yards near tree roots',
    feel: 'Warm stone texture, modular units',
    waterUse: 'Permeable joint gaps',
    upkeep: 'Sweep leaves & refresh joint sand occasionally',
  },
  {
    surface: 'Poured Concrete',
    bestFor: 'Clean modern patios, steps, side paths & utility slabs',
    feel: 'Seamless, smooth or broom-textured',
    waterUse: 'Solid runoff pitched to drains',
    upkeep: 'Simple rinse & seasonal blow-off',
  },
  {
    surface: 'Fresh Natural Sod',
    bestFor: 'Play lawns, cooler summer yards & classic curb appeal',
    feel: 'Soft living grass cool underfoot',
    waterUse: 'Regular scheduled irrigation',
    upkeep: 'Weekly mowing, edging & annual aeration',
  },
  {
    surface: 'Artificial Lawn',
    bestFor: 'Pet runs, shaded yards & water-wise low-upkeep lawns',
    feel: 'Cushioned multi-tone synthetic blades',
    waterUse: 'Rinse only as needed',
    upkeep: 'Occasional leaf blow-off & light brushing',
  },
];

export const ServicesOverviewPage: React.FC = () => {
  const [filter, setFilter] = useState<'All' | ServiceCategory>('All');

  usePageSeo({
    title: 'Services | Castaneda Gardening & Tree Services',
    description:
      'Explore all 9 gardening, hardscape, concrete, pavers, sod, mulch, irrigation, fencing, and tree services in San Jose & Silicon Valley. Free estimates.',
    path: '/services',
  });

  const filteredServices =
    filter === 'All'
      ? SERVICES
      : SERVICES.filter(
          (s) => s.category === filter || s.secondaryCategory === filter
        );

  return (
    <>
      <PageHero
        imageKey="pavers"
        title="Full-Yard"
        accentWord="Services"
        subtitle="Nine specialized trades under one Silicon Valley crew — from poured concrete and stone pavers to fresh sod, drip irrigation, fencing, and tree care."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        bottomFill="var(--paper)"
      >
        <LinkButton to="/contact" variant="primary">
          Get a Free Estimate
        </LinkButton>
        <LinkButton to="/#yard-planner" variant="light">
          Try the Yard Planner
        </LinkButton>
      </PageHero>

      {/* Filter & Service Cards */}
      <section className="surface-paper section-pad">
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <div>
              <span className="font-mono-label" style={{ color: 'var(--forest)', fontWeight: 700 }}>
                Filter by category
              </span>
              <h2 className="display-md" style={{ margin: '6px 0 0', color: 'var(--black)' }}>
                {filteredServices.length} Services Available
              </h2>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <Chip
                label="All Services"
                active={filter === 'All'}
                onClick={() => setFilter('All')}
              />
              {SERVICE_CATEGORIES.map((cat) => (
                <Chip
                  key={cat.id}
                  label={cat.title}
                  active={filter === cat.id}
                  onClick={() => setFilter(cat.id)}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((svc) => {
              const img = IMAGES[svc.heroImageKey] || IMAGES.heroOasis;
              return (
                <article
                  key={svc.slug}
                  style={{
                    backgroundColor: 'var(--white)',
                    border: '1px solid var(--border-light-strong)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <SmartImage
                    src={img.url}
                    alt={img.alt}
                    aspectRatio="4 / 3"
                    focalPoint={img.focalPoint}
                    thumb
                  />
                  <div
                    style={{
                      padding: '22px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '16px',
                      flex: 1,
                    }}
                  >
                    <div>
                      <span
                        className="font-mono-label"
                        style={{ color: 'var(--forest)', fontWeight: 700 }}
                      >
                        {svc.category}
                        {svc.secondaryCategory ? ` / ${svc.secondaryCategory}` : ''}
                      </span>
                      <h3 className="display-sm" style={{ margin: '6px 0 10px', color: 'var(--black)' }}>
                        {svc.title}
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          color: 'var(--gray-dark)',
                          fontSize: '0.95rem',
                          lineHeight: 1.58,
                        }}
                      >
                        {svc.shortBlurb}
                      </p>
                    </div>

                    <Link
                      to={`/services/${svc.slug}`}
                      className="c-btn c-btn--dark c-btn--sm"
                      style={{ alignSelf: 'flex-start' }}
                    >
                      <span>Explore {svc.shortTitle}</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Not sure what you need banner */}
      <section className="surface-forest section-pad-sm">
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div>
              <p className="font-mono-label" style={{ color: 'var(--yellow)', margin: '0 0 6px' }}>
                Not sure what combination fits?
              </p>
              <h2 className="display-md" style={{ margin: 0, color: 'var(--white)' }}>
                Use our interactive Yard Planner to build your project scope.
              </h2>
            </div>
            <LinkButton to="/#yard-planner" variant="primary" size="lg">
              <span>Launch Yard Planner</span>
              <ArrowRight size={18} aria-hidden="true" />
            </LinkButton>
          </div>
        </div>
      </section>

      {/* What affects the cost */}
      <section className="surface-black section-pad">
        <div className="container">
          <div style={{ maxWidth: '680px', marginBottom: '36px' }}>
            <div style={{ marginBottom: '14px' }}>
              <BannerRibbon>HONEST SCOPE EXPLAINER</BannerRibbon>
            </div>
            <h2 className="display-lg" style={{ margin: '0 0 12px', color: 'var(--white)' }}>
              What affects your{' '}
              <span className="editorial-accent" style={{ color: 'var(--yellow)' }}>
                estimate?
              </span>
            </h2>
            <p className="body-copy" style={{ margin: 0, color: 'rgba(255,255,255,0.8)' }}>
              Every Silicon Valley property is different. Instead of throwing out misleading flat
              ballpark numbers online, we inspect six real-world factors during your Free Estimate:
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COST_FACTORS.map((factor, idx) => (
              <div
                key={factor.title}
                style={{
                  backgroundColor: 'var(--soot)',
                  border: '1px solid var(--border-dark-strong)',
                  borderRadius: '16px',
                  padding: '24px',
                }}
              >
                <span
                  className="editorial-numeral"
                  style={{ fontSize: '2rem', color: 'var(--yellow)', display: 'block', marginBottom: '8px' }}
                >
                  0{idx + 1}
                </span>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: 700, color: 'var(--white)' }}>
                  {factor.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.94rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.55 }}>
                  {factor.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualitative Comparison Table */}
      <section className="surface-paper section-pad">
        <div className="container">
          <div style={{ marginBottom: '28px' }}>
            <div style={{ marginBottom: '12px' }}>
              <BannerRibbon light>SIDE-BY-SIDE GUIDE</BannerRibbon>
            </div>
            <h2 className="display-lg" style={{ margin: 0, color: 'var(--black)' }}>
              Pavers vs. Concrete vs.{' '}
              <span className="editorial-accent" style={{ color: 'var(--forest)' }}>
                Lawn Surfaces
              </span>
            </h2>
          </div>

          <div
            style={{
              overflowX: 'auto',
              borderRadius: '16px',
              border: '1px solid var(--border-light-strong)',
              backgroundColor: 'var(--white)',
            }}
          >
            <table
              style={{
                width: '100%',
                minWidth: '680px',
                borderCollapse: 'collapse',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: 'var(--black)', color: 'var(--yellow)' }}>
                  <th style={{ padding: '16px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Surface
                  </th>
                  <th style={{ padding: '16px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Best Fit
                  </th>
                  <th style={{ padding: '16px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Look &amp; Feel
                  </th>
                  <th style={{ padding: '16px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Water Behavior
                  </th>
                  <th style={{ padding: '16px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Ongoing Care
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={row.surface}
                    style={{
                      borderTop: '1px solid var(--border-light)',
                      backgroundColor: idx % 2 === 1 ? 'var(--paper)' : 'var(--white)',
                    }}
                  >
                    <td style={{ padding: '16px 18px', fontWeight: 700, color: 'var(--black)' }}>
                      {row.surface}
                    </td>
                    <td style={{ padding: '16px 18px', color: 'var(--gray-dark)', fontSize: '0.94rem' }}>
                      {row.bestFor}
                    </td>
                    <td style={{ padding: '16px 18px', color: 'var(--gray-dark)', fontSize: '0.94rem' }}>
                      {row.feel}
                    </td>
                    <td style={{ padding: '16px 18px', color: 'var(--gray-dark)', fontSize: '0.94rem' }}>
                      {row.waterUse}
                    </td>
                    <td style={{ padding: '16px 18px', color: 'var(--gray-dark)', fontSize: '0.94rem' }}>
                      {row.upkeep}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default ServicesOverviewPage;
