import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown, Phone, MessageSquare } from 'lucide-react';
import { BUSINESS } from '../../data/business';
import { PRIMARY_NAV } from '../../data/nav';
import { SERVICE_CATEGORIES, getServicesByCategory } from '../../data/services';
import { useLenis } from '../../hooks/useLenis';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  returnFocusTo?: React.RefObject<HTMLButtonElement | null>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  open,
  onClose,
  returnFocusTo,
}) => {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { stopScroll, startScroll } = useLenis();

  useEffect(() => {
    if (open) {
      stopScroll();
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      startScroll();
    }
    return () => {
      startScroll();
    };
  }, [open, stopScroll, startScroll]);

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        returnFocusTo?.current?.focus();
      } else if (e.key === 'Tab' && containerRef.current) {
        const focusables = containerRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, returnFocusTo]);

  if (!open) return null;

  return (
    <div
      ref={containerRef}
      className="mobile-menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      data-lenis-prevent
    >
      {/* Top row matching mobile navbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
          paddingInline:
            'max(clamp(16px, 4vw, 24px), env(safe-area-inset-left, 0px)) max(clamp(16px, 4vw, 24px), env(safe-area-inset-right, 0px))',
          borderBottom: '1px solid var(--border-dark)',
          flexShrink: 0,
        }}
      >
        <Link to="/" onClick={onClose} className="logo-plate" style={{ height: '42px' }}>
          <img src={BUSINESS.logoPath} alt={BUSINESS.name} />
        </Link>
        <button
          ref={closeBtnRef}
          type="button"
          onClick={() => {
            onClose();
            returnFocusTo?.current?.focus();
          }}
          aria-label="Close navigation menu"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            border: '1px solid var(--yellow)',
            backgroundColor: 'var(--yellow)',
            color: 'var(--black)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={22} />
        </button>
      </div>

      {/* Links */}
      <nav
        aria-label="Mobile links"
        style={{
          padding: '24px clamp(16px, 5vw, 28px) 36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          flex: 1,
        }}
      >
        {PRIMARY_NAV.map((item) => {
          if (item.hasMegaMenu) {
            return (
              <div
                key={item.to}
                style={{
                  borderBottom: '1px solid var(--border-dark)',
                  paddingBottom: '6px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Link
                    to="/services"
                    onClick={onClose}
                    className="display-sm"
                    style={{
                      paddingBlock: '12px',
                      color: 'var(--white)',
                      flex: 1,
                    }}
                  >
                    Services
                  </Link>
                  <button
                    type="button"
                    aria-expanded={servicesExpanded}
                    aria-label="Expand services list"
                    onClick={() => setServicesExpanded((s) => !s)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--soot)',
                      border: '1px solid var(--border-dark-strong)',
                      color: 'var(--yellow)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <ChevronDown
                      size={20}
                      style={{
                        transform: servicesExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 180ms ease',
                      }}
                    />
                  </button>
                </div>

                {servicesExpanded && (
                  <div
                    style={{
                      padding: '8px 0 12px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                    }}
                  >
                    {SERVICE_CATEGORIES.map((cat) => (
                      <div key={cat.id}>
                        <p
                          className="font-mono-label"
                          style={{ color: 'var(--light-leaf)', margin: '0 0 6px' }}
                        >
                          {cat.title}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {getServicesByCategory(cat.id).map((svc) => (
                            <Link
                              key={`${cat.id}-${svc.slug}`}
                              to={`/services/${svc.slug}`}
                              onClick={onClose}
                              style={{
                                padding: '8px 10px',
                                borderRadius: '8px',
                                backgroundColor: 'var(--soot)',
                                color: 'var(--white)',
                                fontSize: '0.96rem',
                                fontWeight: 600,
                              }}
                            >
                              {svc.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className="display-sm"
              style={{
                paddingBlock: '12px',
                borderBottom: '1px solid var(--border-dark)',
                color: 'var(--white)',
              }}
            >
              {item.label}
            </Link>
          );
        })}

        {/* Both phones + Free Estimate CTA */}
        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <Link to="/contact" onClick={onClose} className="c-btn c-btn--primary c-btn--lg">
            Get a Free Estimate
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <a href={BUSINESS.phones.primary.tel} className="c-btn c-btn--green">
              <Phone size={16} aria-hidden="true" />
              <span>{BUSINESS.phones.primary.display}</span>
            </a>
            <a href={BUSINESS.phones.primary.sms} className="c-btn c-btn--outline-on-dark">
              <MessageSquare size={16} aria-hidden="true" />
              <span>Text Primary</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a href={BUSINESS.phones.secondary.tel} className="c-btn c-btn--outline-on-dark">
              <Phone size={16} aria-hidden="true" />
              <span>{BUSINESS.phones.secondary.display}</span>
            </a>
            <a href={BUSINESS.phones.secondary.sms} className="c-btn c-btn--outline-on-dark">
              <MessageSquare size={16} aria-hidden="true" />
              <span>Text Line 2</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};
