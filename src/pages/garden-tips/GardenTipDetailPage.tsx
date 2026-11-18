import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getGardenTipBySlug, GARDEN_TIPS } from '../../data/gardenTips';
import { getServiceBySlug } from '../../data/services';
import { BUSINESS } from '../../data/business';
import { PageHero } from '../../components/sections/PageHero';
import { CtaBand } from '../../components/sections/CtaBand';
import { LinkButton } from '../../components/ui/Button';
import { usePageSeo } from '../../lib/seo';

export const GardenTipDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getGardenTipBySlug(slug);

  usePageSeo({
    title: article ? `${article.title} | Garden Tips` : 'Garden Tips',
    description: article
      ? article.excerpt
      : 'Practical Silicon Valley gardening, hardscape, and tree care guides.',
    path: article ? `/garden-tips/${article.slug}` : '/garden-tips',
    schema: article
      ? {
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          publisher: {
            '@type': 'Organization',
            name: BUSINESS.name,
          },
        }
      : undefined,
  });

  if (!article) {
    return <Navigate to="/garden-tips" replace />;
  }

  const relatedService = getServiceBySlug(article.relatedServiceSlug);
  const otherTips = GARDEN_TIPS.filter((t) => t.slug !== article.slug).slice(0, 3);

  return (
    <>
      <PageHero
        imageKey={article.imageKey}
        title={article.title}
        subtitle={`${article.category} · ${article.readTime}`}
        ribbonText="GARDEN TIPS"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Garden Tips', to: '/garden-tips' },
          { label: article.title },
        ]}
        bottomFill="var(--paper)"
      />

      <section className="surface-paper section-pad">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-start">
            <article style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <p className="lead-copy" style={{ margin: 0, color: 'var(--black)', fontWeight: 600 }}>
                {article.excerpt}
              </p>

              {article.sections.map((sec) => (
                <div key={sec.heading} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h2 className="display-sm" style={{ margin: 0, color: 'var(--forest)' }}>
                    {sec.heading}
                  </h2>
                  {sec.body.map((p, idx) => (
                    <p key={idx} className="body-copy" style={{ margin: 0, color: 'var(--gray-dark)' }}>
                      {p}
                    </p>
                  ))}
                </div>
              ))}

              <div style={{ paddingTop: '12px' }}>
                <LinkButton to="/garden-tips" variant="outline-on-light">
                  <ArrowLeft size={16} aria-hidden="true" />
                  <span>Back to All Garden Tips</span>
                </LinkButton>
              </div>
            </article>

            {/* Sidebar */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  backgroundColor: 'var(--black)',
                  color: 'var(--white)',
                  borderRadius: '18px',
                  border: '2px solid var(--yellow)',
                  padding: '24px',
                }}
              >
                <p className="font-mono-label" style={{ color: 'var(--yellow)', margin: '0 0 12px' }}>
                  Key Takeaways
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
                  {article.takeaways.map((t) => (
                    <li
                      key={t}
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
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {relatedService && (
                <div
                  style={{
                    backgroundColor: 'var(--white)',
                    border: '1px solid var(--border-light-strong)',
                    borderRadius: '18px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <span className="font-mono-label" style={{ color: 'var(--forest)', fontWeight: 700 }}>
                    Related Service
                  </span>
                  <h3 className="display-sm" style={{ margin: 0, color: 'var(--black)' }}>
                    {relatedService.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--gray-dark)' }}>
                    {relatedService.shortBlurb}
                  </p>
                  <LinkButton to={`/services/${relatedService.slug}`} variant="dark" size="sm">
                    <span>Explore {relatedService.shortTitle}</span>
                    <ArrowRight size={15} />
                  </LinkButton>
                </div>
              )}

              <div
                style={{
                  backgroundColor: 'var(--white)',
                  border: '1px solid var(--border-light-strong)',
                  borderRadius: '18px',
                  padding: '24px',
                }}
              >
                <p className="font-mono-label" style={{ color: 'var(--forest)', fontWeight: 700, margin: '0 0 10px' }}>
                  More Guides
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {otherTips.map((other) => (
                    <Link
                      key={other.slug}
                      to={`/garden-tips/${other.slug}`}
                      style={{
                        padding: '8px 0',
                        borderBottom: '1px solid var(--border-light)',
                        fontWeight: 700,
                        fontSize: '0.94rem',
                        color: 'var(--black)',
                      }}
                    >
                      {other.title}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default GardenTipDetailPage;
