import React from 'react';
import { FAQS } from '../../data/faqs';
import { Accordion } from '../ui/Accordion';
import { BannerRibbon } from '../svg/BannerRibbon';
import { LinkButton } from '../ui/Button';

export const FaqPreview: React.FC = () => {
  const previewFaqs = FAQS.slice(0, 5);

  return (
    <section className="surface-paper section-pad">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.25fr] items-start">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'flex-start' }}>
            <BannerRibbon light>COMMON QUESTIONS</BannerRibbon>
            <h2 className="display-lg" style={{ margin: 0, color: 'var(--black)' }}>
              Straight{' '}
              <span className="editorial-accent" style={{ color: 'var(--forest)' }}>
                answers
              </span>{' '}
              before we walk your yard.
            </h2>
            <p className="body-copy" style={{ margin: 0, color: 'var(--gray-dark)' }}>
              Curious how estimates work, whether to pick pavers or concrete, or how tree debris is
              hauled? Here are the questions Silicon Valley homeowners ask most.
            </p>
            <LinkButton to="/faq" variant="dark">
              View All {FAQS.length} FAQs
            </LinkButton>
          </div>

          <Accordion items={previewFaqs} defaultOpenFirst />
        </div>
      </div>
    </section>
  );
};
