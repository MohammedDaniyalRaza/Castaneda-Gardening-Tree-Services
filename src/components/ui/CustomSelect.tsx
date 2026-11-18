import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/helpers';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  error,
}) => {
  const [open, setOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState<number>(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = `listbox-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setOpen(true);
      const currentIdx = Math.max(0, options.findIndex((o) => o.value === value));
      setFocusedIdx(currentIdx);
      return;
    }

    if (!open) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIdx((prev) => (prev + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIdx((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (focusedIdx >= 0 && options[focusedIdx]) {
        onChange(options[focusedIdx].value);
        setOpen(false);
      }
    }
  };

  return (
    <div className="c-field" ref={wrapRef}>
      <span id={`${listId}-label`} className="c-field__label">
        {label}
      </span>
      <div className="c-select">
        <button
          type="button"
          className="c-select__trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${listId}-label`}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={handleKeyDown}
          style={error ? { borderColor: '#b91c1c' } : undefined}
        >
          <span style={{ color: selectedOption ? 'var(--black)' : 'var(--gray-dark)' }}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            size={18}
            aria-hidden="true"
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 180ms ease',
              flexShrink: 0,
            }}
          />
        </button>

        {open && (
          <ul
            role="listbox"
            id={listId}
            aria-labelledby={`${listId}-label`}
            className="c-select__listbox"
            data-lenis-prevent
          >
            {options.map((opt, idx) => {
              const selected = opt.value === value;
              const focused = idx === focusedIdx;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={selected}
                  className={cn(
                    'c-select__option',
                    focused && 'c-select__option--focused',
                    selected && 'c-select__option--selected'
                  )}
                  onMouseEnter={() => setFocusedIdx(idx)}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  <span>{opt.label}</span>
                  {selected && <Check size={16} aria-hidden="true" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {error && (
        <span className="c-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
