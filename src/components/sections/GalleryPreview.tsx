import React from 'react';
import { Expand } from 'lucide-react';
import { GALLERY_ITEMS, getGalleryImage } from '../../data/gallery';
import { SmartImage } from '../ui/SmartImage';
import { useLightbox } from '../ui/Lightbox';
import { BannerRibbon } from '../svg/BannerRibbon';
import { LinkButton } from '../ui/Button';

export const GalleryPreview: React.FC = () => {
  const { open } = useLightbox();
  const previewItems = GALLERY_ITEMS.slice(0, 6);

  const lightboxItems = previewItems.map((item) => {
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
              <BannerRibbon light>PROJECT GALLERY</BannerRibbon>
            </div>
            <h2 className="display-lg" style={{ margin: '0 0 8px', color: 'var(--black)' }}>
              Recent yard{' '}
              <span className="editorial-accent" style={{ color: 'var(--forest)' }}>
                work.
              </span>
            </h2>
            <p className="font-mono-label" style={{ margin: 0, color: 'var(--gray-dark)' }}>
              Sample imagery · Click any photo to inspect full screen
            </p>
          </div>

          <LinkButton to="/gallery" variant="dark">
            Explore Full Gallery
          </LinkButton>
        </div>

        <div className="gallery-grid">
          {previewItems.map((item, idx) => {
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
                  borderRadius: idx % 3 === 0 ? '48px 16px 16px 16px' : '16px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--black)',
                  color: 'var(--white)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  position: 'relative',
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
                      backgroundColor: 'rgba(10, 12, 10, 0.82)',
                      color: 'var(--yellow)',
                      border: '1px solid rgba(255,255,255,0.2)',
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
                  <h3 style={{ margin: '4px 0 0', fontSize: '1.04rem', fontWeight: 700, color: 'var(--white)' }}>
                    {item.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
