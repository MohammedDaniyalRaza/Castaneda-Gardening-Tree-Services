import React from 'react';

interface GlyphProps {
  size?: number;
  className?: string;
}

export const TreeGlyph: React.FC<GlyphProps> = ({ size = 28, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M18 4C12.2 4 8.2 7.9 8.2 12.8C6 14 4.8 16.3 5 18.9C5.3 22.4 8.4 25 12 25H24C27.6 25 30.7 22.4 31 18.9C31.2 16.3 30 14 27.8 12.8C27.8 7.9 23.8 4 18 4Z"
      fill="var(--leaf)"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M16.4 24.5V32M19.6 24.5V32M18 16L13.5 19.5M18 19L22.5 16"
      stroke="var(--bark)"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

export const ConeShrubGlyph: React.FC<GlyphProps> = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M16 3C13 9 9.2 17 8.5 23.5C8.3 25 9.5 26 11 26H21C22.5 26 23.7 25 23.5 23.5C22.8 17 19 9 16 3Z"
      fill="var(--forest)"
      stroke="var(--light-leaf)"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M16 26V30"
      stroke="var(--bark)"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

export const GazeboGlyph: React.FC<GlyphProps> = ({ size = 28, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M18 5L4 14.5H32L18 5Z"
      fill="var(--bark)"
      stroke="var(--yellow)"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 14.5V29M27.5 14.5V29M14.5 14.5V29M21.5 14.5V29M5 29H31"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M8.5 19L14.5 14.5M27.5 19L21.5 14.5" stroke="var(--yellow)" strokeWidth="1.4" />
  </svg>
);

export const LeafGlyph: React.FC<GlyphProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M19.5 4.5C12.5 4.5 6 8.5 5 16.5C12.5 17.5 19.5 12.5 19.5 4.5Z"
      fill="var(--leaf)"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M4.5 19.5L14 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
