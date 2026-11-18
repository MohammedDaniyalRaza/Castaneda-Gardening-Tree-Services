import React from 'react';
import { HomeHero } from '../../components/sections/HomeHero';
import { TrustStrip } from '../../components/sections/TrustStrip';
import { CategoryPanels } from '../../components/sections/CategoryPanels';
import { YardPlanner } from '../../components/sections/YardPlanner';
import { BeforeAfterSection } from '../../components/sections/BeforeAfterSection';
import { ProcessTimeline } from '../../components/sections/ProcessTimeline';
import { WhyUsSection } from '../../components/sections/WhyUsSection';
import { GalleryPreview } from '../../components/sections/GalleryPreview';
import { TestimonialsSection } from '../../components/sections/TestimonialsSection';
import { AreaSection } from '../../components/sections/AreaSection';
import { FaqPreview } from '../../components/sections/FaqPreview';
import { CtaBand } from '../../components/sections/CtaBand';
import { usePageSeo } from '../../lib/seo';

export const HomePage: React.FC = () => {
  usePageSeo({
    title: 'Castaneda Gardening & Tree Services | San Jose & Silicon Valley',
    description:
      'Concrete, pavers, sod, mulch, irrigation, fences, lawn care, and tree trimming across San Jose & Silicon Valley. Call (408) 914-8265 for a Free Estimate.',
    path: '/',
  });

  return (
    <>
      <HomeHero />
      <TrustStrip />
      <CategoryPanels />
      <YardPlanner />
      <BeforeAfterSection />
      <ProcessTimeline />
      <WhyUsSection />
      <GalleryPreview />
      <TestimonialsSection />
      <AreaSection />
      <FaqPreview />
      <CtaBand />
    </>
  );
};

export default HomePage;
