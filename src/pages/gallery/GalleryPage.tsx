import React, { useState, useMemo } from 'react';
import { Expand } from 'lucide-react';
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  getGalleryImage,
  type GalleryCategory,
} from '../../data/gallery';
import { IMAGES } from '../../data/images';
import { PageHero } from '../../components/sections/PageHero';
import { CtaBand } from '../../components/sections/CtaBand';
import { SmartImage } from '../../components/ui/SmartImage';
import { Chip } from '../../components/ui/Chip';
import { BeforeAfterSlider } from '../../components/ui/BeforeAfterSlider';
import { useLightbox } from '../../components/ui/Lightbox';
import { LinkButton } from '../../components/ui/Button';
import { usePageSeo } from '../../lib/seo';

export const GalleryPage: React.FC = () => {
  const [category, setCategory] = useState<GalleryCategory>('All');
  const { open } = useLightbox();

  usePageSeo({
    title: 'Project Gallery | Castaneda Gardening & Tree Services',
    description:
      'Browse sample hardscape, paver, concrete, sod, fence, and tree care imagery across San Jose and Silicon Valley.',
    path: '/gallery',
  });

  const filtered = useMemo(() => {
    if (category === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === category);
  }, [category]);

  const lightboxItems = useMemo(
    () =>
      filtered.map((item) => {
        const img = getGalleryImage(item);
        return {
          id: item.id,
          url: img.url,
          alt: img.alt,
          title: item.title,
          caption: item.caption,
          city: item.city,
        };
      }),
    [filtered]
  );

  return (
    <>
      <PageHero
        imageKey="heroOasis"
        title="Project"
        accentWord="Gallery"
        subtitle="Sample landscaping, hardscape, lawn, and tree work visuals across Silicon Valley. Tap any tile to open full screen."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]}
        bottomFill="var(--paper)"
      >
        <LinkButton to="/contact" variant="primary">
          Get a Free Estimate
        </LinkButton>
      </PageHero>

      <section className="surface-paper section-pad">
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            <div>
              <span className="font-mono-label" style={{ color: 'var(--forest)', fontWeight: 700 }}>
                Sample Imagery · Replace with client project photos
              </span>
              <h2 className="display-md" style={{ margin: '6px 0 0', color: 'var(--black)' }}>
                Showing {filtered.length} {category === 'All' ? 'projects' : `${category} views`}
              </h2>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {GALLERY_CATEGORIES.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  active={category === cat}
                  onClick={() => setCategory(cat)}
                />
              ))}
            </div>
          </div>

          <div className="gallery-grid">
            {filtered.map((item, idx) => {
              const img = getGalleryImage(item);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => open(lightboxItems, idx)}
                  aria-label={`Open full view of ${item.title}`}
                  style={{
                    padding: 0,
                    border: '1px solid var(--border-light-strong)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: 'var(--black)',
                    color: 'var(--white)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%' }}>
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
                        top: '12px',
                        right: '12px',
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(10,12,10,0.82)',
                        color: 'var(--yellow)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Expand size={16} />
                    </span>
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    <span className="font-mono-label" style={{ color: 'var(--light-leaf)' }}>
                      {item.category} · {item.city}
                    </span>
                    <h3 style={{ margin: '4px 0 6px', fontSize: '1.05rem', fontWeight: 700, color: 'var(--white)' }}>
                      {item.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(255,255,255,0.72)' }}>
                      {item.caption}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before/After Highlight */}
      <section className="surface-soot section-pad">
        <div className="container">
          <div style={{ maxWidth: '680px', marginBottom: '28px' }}>
            <span className="font-mono-label" style={{ color: 'var(--yellow)' }}>
              Before &amp; After Transformation
            </span>
            <h2 className="display-md" style={{ margin: '8px 0 10px', color: 'var(--white)' }}>
              Full-Yard Cleanup, Pavers &amp; Sod Reset
            </h2>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.78)' }}>
              Drag across to inspect how clearing weeds, re-grading, and pairing pavers with fresh
              turf opens up an entire residential yard.
            </p>
          </div>

          <BeforeAfterSlider
            beforeUrl={IMAGES.beforeYard.url}
            beforeAlt={IMAGES.beforeYard.alt}
            afterUrl={IMAGES.afterYard.url}
            afterAlt={IMAGES.afterYard.alt}
          />
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default GalleryPage;
