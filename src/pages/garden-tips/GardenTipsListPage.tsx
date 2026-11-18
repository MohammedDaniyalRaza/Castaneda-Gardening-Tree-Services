import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GARDEN_TIPS } from '../../data/gardenTips';
import { IMAGES } from '../../data/images';
import { PageHero } from '../../components/sections/PageHero';
import { CtaBand } from '../../components/sections/CtaBand';
import { SmartImage } from '../../components/ui/SmartImage';
import { LinkButton } from '../../components/ui/Button';
import { usePageSeo } from '../../lib/seo';

export const GardenTipsListPage: React.FC = () => {
  usePageSeo({
    title: 'Garden Tips & Silicon Valley Yard Guides | Castaneda',
    description:
      'Practical Bay Area advice on tree trimming timing, pavers vs concrete, laying sod, water-wise drip irrigation, artificial lawn, and lawn aeration.',
    path: '/garden-tips',
  });

  return (
    <>
      <PageHero
        imageKey="treeCare"
        title="Silicon Valley"
        accentWord="Garden Tips"
        subtitle="Practical notes for Bay Area clay soil, dry summers, mature tree canopies, and choosing the right surfaces for your yard."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Garden Tips' }]}
        bottomFill="var(--paper)"
      >
        <LinkButton to="/contact" variant="primary">
          Request Free Estimate
        </LinkButton>
      </PageHero>

      <section className="surface-paper section-pad">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GARDEN_TIPS.map((article) => {
              const img = IMAGES[article.imageKey] || IMAGES.heroOasis;
              return (
                <article
                  key={article.slug}
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
                      <p
                        className="font-mono-label"
                        style={{ color: 'var(--forest)', fontWeight: 700, margin: '0 0 8px' }}
                      >
                        {article.category} · {article.readTime}
                      </p>
                      <h2 className="display-sm" style={{ margin: '0 0 10px', color: 'var(--black)' }}>
                        {article.title}
                      </h2>
                      <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--gray-dark)', lineHeight: 1.58 }}>
                        {article.excerpt}
                      </p>
                    </div>

                    <Link
                      to={`/garden-tips/${article.slug}`}
                      className="c-btn c-btn--dark c-btn--sm"
                      style={{ alignSelf: 'flex-start' }}
                    >
                      <span>Read Guide</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default GardenTipsListPage;
