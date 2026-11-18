import React, { useState, useMemo } from 'react';
import { FAQS, FAQ_CATEGORIES, type FaqCategory } from '../../data/faqs';
import { BUSINESS } from '../../data/business';
import { PageHero } from '../../components/sections/PageHero';
import { CtaBand } from '../../components/sections/CtaBand';
import { Tabs } from '../../components/ui/Tabs';
import { Accordion } from '../../components/ui/Accordion';
import { LinkButton } from '../../components/ui/Button';
import { usePageSeo } from '../../lib/seo';

export const FaqPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | FaqCategory>('All');

  usePageSeo({
    title: 'FAQ | Castaneda Gardening & Tree Services',
    description:
      'Honest answers about free estimates, pavers vs concrete, sod, artificial lawn, irrigation, tree pruning, and Silicon Valley coverage.',
    path: '/faq',
    schema: {
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    },
  });

  const tabOptions = [
    { id: 'All' as const, label: 'All Topics' },
    ...FAQ_CATEGORIES.map((c) => ({ id: c, label: c })),
  ];

  const visibleFaqs = useMemo(() => {
    if (activeTab === 'All') return FAQS;
    return FAQS.filter((f) => f.category === activeTab);
  }, [activeTab]);

  return (
    <>
      <PageHero
        imageKey="sodMulch"
        title="Frequently Asked"
        accentWord="Questions"
        subtitle="Clear, straightforward answers on free estimates, materials, lawn prep, trees, and where our Silicon Valley crew works."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]}
        bottomFill="var(--paper)"
      >
        <LinkButton to="/contact" variant="primary">
          Ask About Your Yard
        </LinkButton>
        <LinkButton href={BUSINESS.phones.primary.tel} variant="light">
          Call {BUSINESS.phones.primary.display}
        </LinkButton>
      </PageHero>

      <section className="surface-paper section-pad">
        <div className="container">
          <div style={{ marginBottom: '28px' }}>
            <Tabs
              ariaLabel="FAQ Categories"
              tabs={tabOptions}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>

          <div style={{ maxWidth: '920px' }}>
            <Accordion items={visibleFaqs} defaultOpenFirst />
          </div>
        </div>
      </section>

      <CtaBand
        heading="Still have a specific question about your yard?"
        subcopy="Call or text (408) 914-8265 and tell us what you are looking to build, trim, or replace."
      />
    </>
  );
};

export default FaqPage;
