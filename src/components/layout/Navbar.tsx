import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone } from 'lucide-react';
import { BUSINESS } from '../../data/business';
import { PRIMARY_NAV } from '../../data/nav';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const megaTimerRef = useRef<number | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setHidden(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      if (mobileOpen || megaOpen) {
        setHidden(false);
        return;
      }
      const currentY = window.scrollY;
      if (currentY > 140 && currentY > lastScrollY.current + 6) {
        setHidden(true);
      } else if (currentY < lastScrollY.current - 6 || currentY <= 90) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen, megaOpen]);

  const openMega = () => {
    if (megaTimerRef.current) window.clearTimeout(megaTimerRef.current);
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    if (megaTimerRef.current) window.clearTimeout(megaTimerRef.current);
    megaTimerRef.current = window.setTimeout(() => setMegaOpen(false), 160);
  };

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  return (
    <>
      <header className={`site-header ${hidden && !mobileOpen && !megaOpen ? 'site-header--hidden' : ''}`}>
        <div className="site-header__inner">
          {/* Logo on black plate */}
          <Link to="/" className="site-header__brand" aria-label={`${BUSINESS.name} Home`}>
            <span className="logo-plate site-header__logo-plate">
              <img src={BUSINESS.logoPath} alt={BUSINESS.name} />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="site-nav" aria-label="Main Navigation">
            {PRIMARY_NAV.map((item) => {
              const active = isActive(item.to);
              if (item.hasMegaMenu) {
                return (
                  <div
                    key={item.to}
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                    style={{ display: 'inline-flex', alignItems: 'center' }}
                  >
                    <Link
                      to={item.to}
                      className={`site-nav__link ${active ? 'site-nav__link--active' : ''}`}
                      aria-expanded={megaOpen}
                      onFocus={openMega}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={14}
                        aria-hidden="true"
                        style={{
                          transform: megaOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 180ms ease',
                        }}
                      />
                      <span className="site-nav__indicator" aria-hidden="true" />
                    </Link>
                  </div>
                );
              }
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`site-nav__link ${active ? 'site-nav__link--active' : ''}`}
                >
                  <span>{item.label}</span>
                  <span className="site-nav__indicator" aria-hidden="true" />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="site-header__actions">
            <a
              href={BUSINESS.phones.primary.tel}
              className="c-btn c-btn--outline-on-dark c-btn--sm site-header__desktop-phone"
            >
              <Phone size={15} aria-hidden="true" />
              <span>{BUSINESS.phones.primary.display}</span>
            </a>

            <Link
              to="/contact"
              className="c-btn c-btn--primary c-btn--sm site-header__cta-compact"
            >
              Free Estimate
            </Link>

            <button
              ref={hamburgerRef}
              type="button"
              className="site-header__mobile-toggle"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MegaMenu
        open={megaOpen}
        onClose={() => setMegaOpen(false)}
        onMouseEnter={openMega}
        onMouseLeave={scheduleCloseMega}
      />

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        returnFocusTo={hamburgerRef}
      />
    </>
  );
};
