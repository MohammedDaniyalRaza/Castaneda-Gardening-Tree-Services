import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare } from 'lucide-react';
import { BUSINESS } from '../../data/business';

export const MobileBar: React.FC = () => {
  return (
    <div className="mobile-bottom-bar" role="region" aria-label="Quick Contact Actions">
      <a
        href={BUSINESS.phones.primary.tel}
        className="c-btn c-btn--green c-btn--sm"
        style={{ width: '100%', paddingInline: '8px', minHeight: '42px' }}
      >
        <Phone size={15} aria-hidden="true" />
        <span>Call</span>
      </a>
      <a
        href={BUSINESS.phones.primary.sms}
        className="c-btn c-btn--outline-on-dark c-btn--sm"
        style={{ width: '100%', paddingInline: '8px', minHeight: '42px' }}
      >
        <MessageSquare size={15} aria-hidden="true" />
        <span>Text</span>
      </a>
      <Link
        to="/contact"
        className="c-btn c-btn--primary c-btn--sm"
        style={{ width: '100%', paddingInline: '10px', minHeight: '42px' }}
      >
        <span>Free Estimate</span>
      </Link>
    </div>
  );
};
