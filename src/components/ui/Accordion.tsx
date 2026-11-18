import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export interface AccordionEntry {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionEntry[];
  darkSurface?: boolean;
  defaultOpenFirst?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  darkSurface = false,
  defaultOpenFirst = false,
}) => {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenFirst && items[0] ? items[0].id : null
  );

  const borderColor = darkSurface ? 'var(--border-dark)' : 'var(--border-light)';
  const textColor = darkSurface ? 'var(--white)' : 'var(--black)';
  const mutedColor = darkSurface ? 'rgba(255,255,255,0.78)' : 'var(--gray-dark)';

  return (
    <div style={{ borderTop: `1px solid ${borderColor}` }}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            style={{
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`acc-panel-${item.id}`}
              id={`acc-btn-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              style={{
                width: '100%',
                minHeight: '60px',
                paddingBlock: '18px',
                paddingInline: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                color: textColor,
                cursor: 'pointer',
                fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                fontWeight: 700,
                lineHeight: 1.35,
              }}
            >
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isOpen ? 'var(--yellow)' : darkSurface ? 'var(--soot)' : 'var(--paper-warm)',
                  color: isOpen ? 'var(--black)' : textColor,
                  transition: 'background-color 180ms ease, color 180ms ease',
                }}
              >
                {isOpen ? <Minus size={17} /> : <Plus size={17} />}
              </span>
            </button>
            {isOpen && (
              <div
                id={`acc-panel-${item.id}`}
                role="region"
                aria-labelledby={`acc-btn-${item.id}`}
                style={{
                  paddingBottom: '20px',
                  paddingRight: '44px',
                  paddingLeft: '4px',
                  color: mutedColor,
                  fontSize: '0.98rem',
                  lineHeight: 1.65,
                }}
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
