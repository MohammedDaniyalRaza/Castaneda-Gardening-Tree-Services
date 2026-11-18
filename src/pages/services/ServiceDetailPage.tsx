import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Expand } from 'lucide-react';
import { getServiceBySlug, SERVICES } from '../../data/services';
import { IMAGES } from '../../data/images';
import { GALLERY_ITEMS, getGalleryImage } from '../../data/gallery';
import { TESTIMONIALS } from '../../data/testimonials';
import { BUSINESS } from '../../data/business';
import { PageHero } from '../../components/sections/PageHero';
import { CtaBand } from '../../components/sections/CtaBand';
import { Accordion } from '../../components/ui/Accordion';
import { SmartImage } from '../../components/ui/SmartImage';
import { BannerRibbon } from '../../components/svg/BannerRibbon';
import { LinkButton } from '../../components/ui/Button';
import { useLightbox } from '../../components/ui/Lightbox';
import { usePageSeo } from '../../lib/seo';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);
  const { open } = useLightbox();

  usePageSeo({
    title: service ? `${service.title} | ${BUSINESS.shortName}` : 'Service Not Found',
    description: service
      ? `${service.shortBlurb} Free estimates across San Jose & Silicon Valley. Call ${BUSINESS.phones.primary.display}.`
      : 'Gardening and hardscape services in San Jose & Silicon Valley.',
    path: service ? `/services/${service.slug}` : '/services',
    schema: service
      ? {
          '@type': 'Service',
          name: service.title,
          serviceType: service.category,
          description: service.shortBlurb,
          provider: {
            '@type': 'LocalBusiness',
            name: BUSINESS.name,
            telephone: BUSINESS.phones.primary.raw,
          },
          areaServed: 'San Jose and Silicon Valley, CA',
        }
      : undefined,
  });

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const heroImage = IMAGES[service.heroImageKey] || IMAGES.heroOasis;
  const relatedServices = service.relatedSlugs
    .map((s) => SERVICES.find((item) => item.slug === s))
    .filter(Boolean);

  const matchingGallery = GALLERY_ITEMS.filter(
    (g) => g.serviceSlug === service.slug || g.category === service.category
  ).slice(0, 4);

  const lightboxItems = matchingGallery.map((item) => {
    const img = getGalleryImage(item);
    return {
      id: item.id,
      url: img.url,
      alt: img.alt,
      title: item.title,
      caption: item.caption,
      city: item.city,
    };
  });

  const matchingReviews = TESTIMONIALS.filter(
    (t) => t.serviceSlug === service.slug
  );
  const displayReviews =
    matchingReviews.length > 0 ? matchingReviews : TESTIMONIALS.slice(0, 2);

  return (
    <>
      <PageHero
        imageKey={service.heroImageKey}
        title={service.title}
        subtitle={service.shortBlurb}
        ribbonText={`${service.category.toUpperCase()} · FREE ESTIMATE`}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.title },
        ]}
        bottomFill="var(--paper)"
      >
        <LinkButton
          to="/contact"
          variant="primary"
        >
          <span>Request Free {service.shortTitle} Estimate</span>
          <ArrowRight size={17} aria-hidden="true" />
        </LinkButton>
        <LinkButton href={BUSINESS.phones.primary.tel} variant="light">
          Call {BUSINESS.phones.primary.display}
        </LinkButton>
      </PageHero>

      {/* Overview & Photo */}
      <section className="surface-paper section-pad">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.95fr] items-start">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <BannerRibbon light>WHAT IS INVOLVED</BannerRibbon>
              <h2 className="display-lg" style={{ margin: 0, color: 'var(--black)' }}>
                Built right from the{' '}
                <span className="editorial-accent" style={{ color: 'var(--forest)' }}>
                  ground up.
                </span>
              </h2>
              {service.longDescription.map((para, i) => (
                <p key={i} className="body-copy" style={{ margin: 0, color: 'var(--gray-dark)' }}>
                  {para}
                </p>
              ))}

              <div
                className="grid gap-4 sm:grid-cols-2"
                style={{ marginTop: '8px' }}
              >
                <div
                  style={{
                    backgroundColor: 'var(--white)',
                    border: '1px solid var(--border-light-strong)',
                    borderRadius: '14px',
                    padding: '18px',
                  }}
                >
                  <span className="font-mono-label" style={{ color: 'var(--forest)', fontWeight: 700 }}>
                    Who It Is For
                  </span>
                  <p style={{ margin: '6px 0 0', fontSize: '0.94rem', color: 'var(--black)', lineHeight: 1.55 }}>
                    {service.whoItIsFor}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--white)',
                    border: '1px solid var(--border-light-strong)',
                    borderRadius: '14px',
                    padding: '18px',
                  }}
                >
                  <span className="font-mono-label" style={{ color: 'var(--forest)', fontWeight: 700 }}>
                    Care Afterward
                  </span>
                  <p style={{ margin: '6px 0 0', fontSize: '0.94rem', color: 'var(--black)', lineHeight: 1.55 }}>
                    {service.afterCare}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="gazebo-arch-mask" style={{ border: '2px solid var(--black)' }}>
                <SmartImage
                  src={heroImage.url}
                  alt={heroImage.alt}
                  aspectRatio="4 / 3"
                  focalPoint={heroImage.focalPoint}
                />
              </div>

              <div
                style={{
                  backgroundColor: 'var(--black)',
                  color: 'var(--white)',
                  borderRadius: '18px',
                  padding: '24px',
                }}
              >
                <p className="font-mono-label" style={{ color: 'var(--yellow)', margin: '0 0 12px' }}>
                  What&apos;s Included
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {service.whatsIncluded.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '0.94rem',
                        color: 'rgba(255,255,255,0.88)',
                      }}
                    >
                      <CheckCircle2
                        size={18}
                        style={{ color: 'var(--yellow)', flexShrink: 0, marginTop: '2px' }}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typical Projects & Process */}
      <section className="surface-soot section-pad">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.25fr] items-start">
            <div>
              <span className="font-mono-label" style={{ color: 'var(--yellow)' }}>
                Common Applications
              </span>
              <h2 className="display-md" style={{ margin: '8px 0 18px', color: 'var(--white)' }}>
                Typical {service.shortTitle} Projects
              </h2>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {service.typicalProjects.map((proj) => (
                  <li
                    key={proj}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--black)',
                      border: '1px solid var(--border-dark-strong)',
                      fontWeight: 600,
                      color: 'var(--white)',
                    }}
                  >
                    {proj}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-mono-label" style={{ color: 'var(--light-leaf)' }}>
                Step-by-Step Workflow
              </span>
              <h2 className="display-md" style={{ margin: '8px 0 18px', color: 'var(--white)' }}>
                How we handle your job
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {service.processSteps.map((step, idx) => (
                  <div
                    key={step.title}
                    style={{
                      backgroundColor: 'var(--black)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: '14px',
                      padding: '20px',
                    }}
                  >
                    <span
                      className="editorial-numeral"
                      style={{ fontSize: '2rem', color: 'var(--yellow)', display: 'block', marginBottom: '6px' }}
                    >
                      0{idx + 1}
                    </span>
                    <h3 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 700, color: 'var(--white)' }}>
                      {step.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.92rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.55 }}>
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Strip (opens Lightbox) */}
      {matchingGallery.length > 0 && (
        <section className="surface-paper section-pad">
          <div className="container">
            <div style={{ marginBottom: '24px' }}>
              <span className="font-mono-label" style={{ color: 'var(--forest)', fontWeight: 700 }}>
                Sample Imagery
              </span>
              <h2 className="display-md" style={{ margin: '6px 0 0', color: 'var(--black)' }}>
                Related Project Views
              </h2>
            </div>

            <div className="gallery-grid">
              {matchingGallery.map((item, idx) => {
                const img = getGalleryImage(item);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => open(lightboxItems, idx)}
                    style={{
                      padding: 0,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid var(--border-light-strong)',
                      backgroundColor: 'var(--black)',
                      color: 'var(--white)',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <SmartImage
                        src={img.url}
                        alt={img.alt}
                        aspectRatio="4 / 3"
                        focalPoint={img.focalPoint}
                        thumb
                      />
                      <span
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          width: '34px',
                          height: '34px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(10,12,10,0.82)',
                          color: 'var(--yellow)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Expand size={15} />
                      </span>
                    </div>
                    <div style={{ padding: '14px 16px' }}>
                      <span className="font-mono-label" style={{ color: 'var(--light-leaf)' }}>
                        {item.city}
                      </span>
                      <p style={{ margin: '4px 0 0', fontWeight: 700 }}>{item.title}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Service FAQs + Sample Reviews */}
      <section className="surface-black section-pad">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-start">
            <div>
              <span className="font-mono-label" style={{ color: 'var(--yellow)' }}>
                Service Questions
              </span>
              <h2 className="display-md" style={{ margin: '8px 0 20px', color: 'var(--white)' }}>
                {service.shortTitle} FAQs
              </h2>
              <Accordion
                darkSurface
                defaultOpenFirst
                items={service.faqs.map((f, idx) => ({
                  id: `${service.slug}-faq-${idx}`,
                  question: f.q,
                  answer: f.a,
                }))}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span className="font-mono-label" style={{ color: 'var(--light-leaf)' }}>
                Sample Homeowner Notes
              </span>
              {displayReviews.map((rev) => (
                <div
                  key={rev.id}
                  style={{
                    backgroundColor: 'var(--soot)',
                    border: '1px solid var(--border-dark-strong)',
                    borderRadius: '16px',
                    padding: '22px',
                  }}
                >
                  <p className="font-mono-label" style={{ color: 'var(--yellow)', margin: '0 0 8px' }}>
                    {rev.service} · {rev.city}
                  </p>
                  <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.86)', lineHeight: 1.6 }}>
                    “{rev.quote}”
                  </p>
                  <strong style={{ color: 'var(--white)' }}>{rev.name}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="surface-paper section-pad-sm">
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            <h2 className="display-sm" style={{ margin: 0, color: 'var(--black)' }}>
              Often paired with {service.shortTitle}
            </h2>
            <Link to="/services" className="c-btn c-btn--outline-on-light c-btn--sm">
              All 9 Services
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {relatedServices.map((rel) =>
              rel ? (
                <Link
                  key={rel.slug}
                  to={`/services/${rel.slug}`}
                  style={{
                    backgroundColor: 'var(--white)',
                    border: '1px solid var(--border-light-strong)',
                    borderRadius: '14px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                >
                  <div>
                    <span className="font-mono-label" style={{ color: 'var(--forest)', fontWeight: 700 }}>
                      {rel.category}
                    </span>
                    <h3 style={{ margin: '6px 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--black)' }}>
                      {rel.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--gray-dark)' }}>
                      {rel.shortBlurb}
                    </p>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--forest)' }}>
                    <span>View details</span>
                    <ArrowRight size={15} />
                  </span>
                </Link>
              ) : null
            )}
          </div>
        </div>
      </section>

      <CtaBand
        heading={`Need ${service.shortTitle.toLowerCase()} help in Silicon Valley?`}
        subcopy="Schedule a free on-site walkthrough with Castaneda Gardening & Tree Services."
      />
    </>
  );
};

export default ServiceDetailPage;
