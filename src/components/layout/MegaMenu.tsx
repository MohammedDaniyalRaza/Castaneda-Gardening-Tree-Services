import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICE_CATEGORIES, getServicesByCategory } from '../../data/services';
import { GazeboGlyph, ConeShrubGlyph, TreeGlyph } from '../svg/BrandGlyphs';

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  open,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (!open) return null;

  const renderGlyph = (glyph: 'gazebo' | 'shrub' | 'tree') => {
    if (glyph === 'gazebo') return <GazeboGlyph size={24} />;
    if (glyph === 'shrub') return <ConeShrubGlyph size={24} />;
    return <TreeGlyph size={24} />;
  };

  return (
    <div
      className="mega-menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="Services Menu"
    >
      <div className="container">
        <div className="grid gap-8 md:grid-cols-3">
          {SERVICE_CATEGORIES.map((cat) => {
            const items = getServicesByCategory(cat.id);
            return (
              <div
                key={cat.id}
                style={{
                  borderRight: '1px solid var(--border-dark)',
                  paddingRight: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px',
                    color: 'var(--yellow)',
                  }}
                >
                  {renderGlyph(cat.glyph)}
                  <span className="font-mono-label">{cat.title}</span>
                </div>
                <p
                  style={{
                    fontSize: '0.86rem',
                    color: 'rgba(255,255,255,0.68)',
                    margin: '0 0 14px',
                    lineHeight: 1.45,
                  }}
                >
                  {cat.subtitle}
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  {items.map((service) => (
                    <li key={`${cat.id}-${service.slug}`}>
                      <Link
                        to={`/services/${service.slug}`}
                        onClick={onClose}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          color: 'var(--white)',
                          fontWeight: 600,
                          fontSize: '0.94rem',
                          transition: 'background-color 150ms ease, color 150ms ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--deep-forest)';
                          e.currentTarget.style.color = 'var(--yellow)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--white)';
                        }}
                      >
                        <span>{service.title}</span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: '22px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.92rem' }}>
            Every project starts with a complimentary on-site walkthrough in Silicon Valley.
          </span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link
              to="/services"
              onClick={onClose}
              className="c-btn c-btn--outline-on-dark c-btn--sm"
            >
              View All 9 Services
            </Link>
            <Link
              to="/contact"
              onClick={onClose}
              className="c-btn c-btn--primary c-btn--sm"
            >
              Get a Free Estimate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
