import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomDatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const formatDisplay = (iso: string) => {
    if (!iso) return 'Flexible / Pick preferred date';
    const [y, m, d] = iso.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="c-field" ref={wrapRef}>
      <span className="c-field__label">{label}</span>
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          className="c-select__trigger"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span style={{ color: value ? 'var(--black)' : 'var(--gray-dark)' }}>
            {formatDisplay(value)}
          </span>
          <Calendar size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
        </button>

        {open && (
          <div
            role="dialog"
            aria-label="Choose preferred walkthrough date"
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              width: 'min(320px, 92vw)',
              backgroundColor: 'var(--white)',
              color: 'var(--black)',
              border: '2px solid var(--black)',
              borderRadius: '14px',
              padding: '14px',
              boxShadow: 'var(--shadow-elevated)',
              zIndex: 65,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <button
                type="button"
                onClick={prevMonth}
                aria-label="Previous month"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)',
                  backgroundColor: 'var(--paper)',
                  color: 'var(--black)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <strong style={{ fontSize: '0.95rem' }}>
                {MONTHS[viewMonth]} {viewYear}
              </strong>
              <button
                type="button"
                onClick={nextMonth}
                aria-label="Next month"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)',
                  backgroundColor: 'var(--paper)',
                  color: 'var(--black)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
                textAlign: 'center',
                marginBottom: '6px',
              }}
            >
              {WEEKDAYS.map((w) => (
                <span
                  key={w}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--gray-dark)',
                  }}
                >
                  {w}
                </span>
              ))}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
              }}
            >
              {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
                <span key={`pad-${idx}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const day = idx + 1;
                const candidate = new Date(viewYear, viewMonth, day);
                const disabled = candidate < today;
                const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const selected = value === iso;
                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      onChange(iso);
                      setOpen(false);
                    }}
                    style={{
                      height: '36px',
                      borderRadius: '8px',
                      border: selected ? '2px solid var(--yellow)' : '1px solid transparent',
                      backgroundColor: selected
                        ? 'var(--deep-forest)'
                        : disabled
                        ? 'transparent'
                        : 'var(--paper)',
                      color: selected
                        ? 'var(--yellow)'
                        : disabled
                        ? 'rgba(10,12,10,0.28)'
                        : 'var(--black)',
                      fontWeight: selected ? 700 : 500,
                      fontSize: '0.88rem',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setOpen(false);
                }}
                style={{
                  marginTop: '10px',
                  width: '100%',
                  padding: '8px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)',
                  backgroundColor: 'transparent',
                  color: 'var(--black)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Clear date (keep flexible)
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
