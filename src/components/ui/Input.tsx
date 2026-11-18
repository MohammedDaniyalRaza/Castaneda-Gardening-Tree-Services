import React from 'react';
import { cn } from '../../lib/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  error,
  className,
  ...rest
}) => {
  const inputId = id || `field-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  return (
    <div className="c-field">
      <label htmlFor={inputId} className="c-field__label">
        {label}
      </label>
      <input
        id={inputId}
        className={cn('c-input', error && 'c-input--error', className)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-err` : undefined}
        {...rest}
      />
      {error && (
        <span id={`${inputId}-err`} className="c-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  id,
  error,
  className,
  rows = 4,
  ...rest
}) => {
  const inputId = id || `field-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  return (
    <div className="c-field">
      <label htmlFor={inputId} className="c-field__label">
        {label}
      </label>
      <textarea
        id={inputId}
        rows={rows}
        className={cn('c-textarea', error && 'c-textarea--error', className)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-err` : undefined}
        {...rest}
      />
      {error && (
        <span id={`${inputId}-err`} className="c-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
