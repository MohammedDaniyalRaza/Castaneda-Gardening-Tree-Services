import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MobileBar } from '../components/layout/MobileBar';
import { PageTransition } from '../components/layout/PageTransition';
import { Preloader } from '../components/layout/Preloader';
import { CustomCursor } from '../components/ui/CustomCursor';
import { useLenis } from '../hooks/useLenis';

export const RootLayout: React.FC = () => {
  const location = useLocation();
  const { scrollToElement } = useLenis();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash;
      const timer = window.setTimeout(() => {
        scrollToElement(targetId);
      }, 120);
      return () => window.clearTimeout(timer);
    }
  }, [location.pathname, location.hash, scrollToElement]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Preloader />
      <CustomCursor />
      <Navbar />
      <main id="main-content" style={{ minHeight: '80vh' }}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <MobileBar />
    </>
  );
};
