import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '../../lib/helpers';

export type ButtonVariant =
  | 'primary'
  | 'green'
  | 'dark'
  | 'light'
  | 'outline-on-dark'
  | 'outline-on-light'
  | 'ghost-dark'
  | 'ghost-light';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

export interface ButtonProps
  extends SharedProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={cn(
        'c-btn',
        `c-btn--${variant}`,
        size !== 'md' && `c-btn--${size}`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export interface LinkButtonProps extends SharedProps {
  to?: LinkProps['to'];
  href?: string;
  ariaLabel?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  to,
  href,
  ariaLabel,
  style,
  onClick,
}) => {
  const classes = cn(
    'c-btn',
    `c-btn--${variant}`,
    size !== 'md' && `c-btn--${size}`,
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} style={style} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} aria-label={ariaLabel} style={style} onClick={onClick}>
      {children}
    </a>
  );
};
