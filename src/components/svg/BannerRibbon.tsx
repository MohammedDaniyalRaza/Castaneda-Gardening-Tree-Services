import React from 'react';
import { cn } from '../../lib/helpers';

interface BannerRibbonProps {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

export const BannerRibbon: React.FC<BannerRibbonProps> = ({
  children,
  light = false,
  className = '',
}) => (
  <span className={cn('banner-ribbon', light && 'banner-ribbon--light', className)}>
    <span className="banner-ribbon__dash" aria-hidden="true" />
    <span>{children}</span>
    <span className="banner-ribbon__dash" aria-hidden="true" />
  </span>
);
