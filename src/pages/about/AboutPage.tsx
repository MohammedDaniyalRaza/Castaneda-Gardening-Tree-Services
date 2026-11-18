import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BUSINESS } from '../../data/business';
import { SERVICE_CATEGORIES, getServicesByCategory } from '../../data/services';
import { IMAGES } from '../../data/images';
import { PageHero } from '../../components/sections/PageHero';
import { CtaBand } from '../../components/sections/CtaBand';
import { SmartImage } from '../../components/ui/SmartImage';
import { BannerRibbon } from '../../components/svg/BannerRibbon';
import { LinkButton } from '../../components/ui/Button';
import { usePageSeo } from '../../lib/seo';

const VALUES = [
  {
    num: '01',
    title: 'Show up',
    copy: 'When we book an estimate walkthrough or schedule a work day in your neighborhood, we show up ready to listen and get moving.',
  },
  {
    num: '02',
    title: 'Do it right',
    copy: 'Compact the paver base properly, pitch the concrete away from the house, set fence posts plumb, and prune trees cleanly instead of taking shortcuts.',
  },
  {
    num: '03',
    title: 'Leave it clean',
    copy: 'Haul away green waste and old debris, keep tools tidy, and sweep or blow patios and driveways before packing up.',
  },
];

export const AboutPage: React.FC = () => {
  const hasLicenses = Boolean(BUSINESS.contractorLicense || BUSINESS.treeServiceLicense);

  usePageSeo({
    title: 'About Us | Castaneda Gardening & Tree Services',
    description:
      'Local Silicon Valley gardening, hardscape, and tree care crew serving San Jose and nearby communities with free estimates.',
    path: '/about',
  });

  return (
    <>
      <PageHero
        imageKey="maintenance"
        title="Local Hands."
        accentWord="Honest Work."
        subtitle="Serving San Jose and Silicon Valley yards with practical hardscape, lawn & garden care, and thoughtful tree work."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        bottomFill="var(--paper)"
      >
        <LinkButton to="/contact" variant="primary">
          Schedule a Free Estimate
        </LinkButton>
      </PageHero>

      <section className="surface-paper section-pad">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <BannerRibbon light>SILICON VALLEY ROOTED</BannerRibbon>
              <h2 className="display-lg" style={{ margin: 0, color: 'var(--black)' }}>
                One practical crew for your{' '}
                <span className="editorial-accent" style={{ color: 'var(--forest)' }}>
                  entire property.
                </span>
              </h2>
              <p className="body-copy" style={{ margin: 0, color: 'var(--gray-dark)' }}>
                Most yards in San Jose and neighboring valley cities need more than just a quick
                mow. Tree roots lift old walks, heavy summer sun dries out tired turf, sprinklers
                leak at the valve, and overgrown fence lines crowd out patio space.
              </p>
              <p className="body-copy" style={{ margin: 0, color: 'var(--gray-dark)' }}>
                Castaneda Gardening &amp; Tree Services brings concrete, pavers, fencing,
                irrigation, sod, mulch, aeration, artificial lawn, and tree trimming together under
                one hard-working local team—so each step supports the next.
              </p>

              {hasLicenses && (
                <div
                  style={{
                    backgroundColor: 'var(--deep-forest)',
                    color: 'var(--yellow)',
                    padding: '12px 18px',
                    borderRadius: '10px',
                    alignSelf: 'flex-start',
                  }}
                >
                  <span className="font-mono-label">
                    {[BUSINESS.contractorLicense, BUSINESS.treeServiceLicense]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '6px' }}>
                <LinkButton to="/services" variant="dark">
                  View All 9 Services
                </LinkButton>
                <LinkButton href={BUSINESS.phones.primary.tel} variant="outline-on-light">
                  Call {BUSINESS.phones.primary.display}
                </LinkButton>
              </div>
            </div>

            <div className="gazebo-arch-mask" style={{ border: '2px solid var(--black)' }}>
              <SmartImage
                src={IMAGES.heroOasis.url}
                alt={IMAGES.heroOasis.alt}
                aspectRatio="4 / 3"
                focalPoint={IMAGES.heroOasis.focalPoint}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="surface-black section-pad">
        <div className="container">
          <div style={{ marginBottom: '32px' }}>
            <BannerRibbon>HOW WE WORK</BannerRibbon>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: 'var(--white)' }}>
              Three simple habits on every yard.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {VALUES.map((val) => (
              <div
                key={val.num}
                style={{
                  backgroundColor: 'var(--soot)',
                  border: '1px solid var(--border-dark-strong)',
                  borderRadius: '18px',
                  padding: '28px',
                }}
              >
                <span className="editorial-numeral" style={{ fontSize: '2.8rem', color: 'var(--yellow)' }}>
                  {val.num}
                </span>
                <h3 className="display-sm" style={{ margin: '10px 0 10px', color: 'var(--white)' }}>
                  {val.title}
                </h3>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                  {val.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Service Groups */}
      <section className="surface-paper section-pad">
        <div className="container">
          <h2 className="display-md" style={{ margin: '0 0 28px', color: 'var(--black)' }}>
            What our crew handles
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {SERVICE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                style={{
                  backgroundColor: 'var(--white)',
                  border: '1px solid var(--border-light-strong)',
                  borderRadius: '18px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <h3 className="display-sm" style={{ margin: 0, color: 'var(--forest)' }}>
                  {cat.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--gray-dark)' }}>
                  {cat.subtitle}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {getServicesByCategory(cat.id).map((svc) => (
                    <Link
                      key={svc.slug}
                      to={`/services/${svc.slug}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 0',
                        borderBottom: '1px solid var(--border-light)',
                        fontWeight: 700,
                        color: 'var(--black)',
                      }}
                    >
                      <span>{svc.title}</span>
                      <ArrowRight size={15} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default AboutPage;
