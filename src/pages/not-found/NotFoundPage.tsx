import React from 'react';
import { PageHero } from '../../components/sections/PageHero';
import { LinkButton } from '../../components/ui/Button';
import { BUSINESS } from '../../data/business';
import { usePageSeo } from '../../lib/seo';

export const NotFoundPage: React.FC = () => {
  usePageSeo({
    title: 'Page Not Found | Castaneda Gardening & Tree Services',
    description: 'This page could not be found. Explore our Silicon Valley gardening, hardscape, and tree care services.',
    path: '/404',
  });

  return (
    <>
      <PageHero
        imageKey="treeCare"
        title="This path needs a little"
        accentWord="trimming."
        subtitle="The page you were looking for may have moved or does not exist. Let us point you back to solid ground."
        ribbonText="404 · PAGE NOT FOUND"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: '404' }]}
        bottomFill="var(--black)"
      >
        <LinkButton to="/" variant="primary" size="lg">
          Back to Home
        </LinkButton>
        <LinkButton to="/services" variant="light" size="lg">
          View All 9 Services
        </LinkButton>
        <LinkButton href={BUSINESS.phones.primary.tel} variant="outline-on-dark" size="lg">
          Call {BUSINESS.phones.primary.display}
        </LinkButton>
      </PageHero>
    </>
  );
};

export default NotFoundPage;
