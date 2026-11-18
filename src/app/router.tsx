import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layout';
import { AppReadyProvider } from './AppReadyContext';
import { LenisProvider } from '../hooks/useLenis';
import { LightboxProvider } from '../components/ui/Lightbox';

const HomePage = lazy(() => import('../pages/home/HomePage'));
const ServicesOverviewPage = lazy(() => import('../pages/services/ServicesOverviewPage'));
const ServiceDetailPage = lazy(() => import('../pages/services/ServiceDetailPage'));
const GalleryPage = lazy(() => import('../pages/gallery/GalleryPage'));
const AboutPage = lazy(() => import('../pages/about/AboutPage'));
const TestimonialsPage = lazy(() => import('../pages/testimonials/TestimonialsPage'));
const FaqPage = lazy(() => import('../pages/faq/FaqPage'));
const GardenTipsListPage = lazy(() => import('../pages/garden-tips/GardenTipsListPage'));
const GardenTipDetailPage = lazy(() => import('../pages/garden-tips/GardenTipDetailPage'));
const ServiceAreaPage = lazy(() => import('../pages/service-area/ServiceAreaPage'));
const ContactPage = lazy(() => import('../pages/contact/ContactPage'));
const NotFoundPage = lazy(() => import('../pages/not-found/NotFoundPage'));

const MinimalFallback: React.FC = () => (
  <div style={{ minHeight: '75vh', backgroundColor: 'var(--black)' }} aria-hidden="true" />
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AppReadyProvider>
        <LenisProvider>
          <LightboxProvider>
            <Suspense fallback={<MinimalFallback />}>
              <Routes>
                <Route element={<RootLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="/services" element={<ServicesOverviewPage />} />
                  <Route path="/services/:slug" element={<ServiceDetailPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/testimonials" element={<TestimonialsPage />} />
                  <Route path="/faq" element={<FaqPage />} />
                  <Route path="/garden-tips" element={<GardenTipsListPage />} />
                  <Route path="/garden-tips/:slug" element={<GardenTipDetailPage />} />
                  <Route path="/service-area" element={<ServiceAreaPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </LightboxProvider>
        </LenisProvider>
      </AppReadyProvider>
    </BrowserRouter>
  );
};
