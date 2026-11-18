import React, { useState } from 'react';
import { TreeGlyph } from '../svg/BrandGlyphs';
import { getFull, getThumb } from '../../data/images';
import { cn } from '../../lib/helpers';

interface SmartImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  focalPoint?: string;
  eager?: boolean;
  thumb?: boolean;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  aspectRatio = '4 / 3',
  focalPoint = '50% 50%',
  eager = false,
  thumb = false,
  className,
  imgClassName,
  style,
  onLoad,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const resolvedSrc = thumb ? getThumb(src) : getFull(src);

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        aspectRatio,
        backgroundColor: 'var(--soot)',
        ...style,
      }}
    >
      {!loaded && !errored && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, #121512 0%, #0F3D1C 55%, #121512 100%)',
          }}
        />
      )}

      {errored ? (
        <div
          role="img"
          aria-label={alt}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '16px',
            textAlign: 'center',
            background:
              'radial-gradient(circle at 30% 30%, var(--deep-forest), var(--black) 78%)',
            color: 'var(--light-leaf)',
          }}
        >
          <TreeGlyph size={44} />
          <span className="font-mono-label" style={{ color: 'rgba(255,255,255,0.72)' }}>
            Castaneda Gardening &amp; Tree Services
          </span>
        </div>
      ) : (
        <img
          src={resolvedSrc}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          onLoad={() => {
            setLoaded(true);
            onLoad?.();
          }}
          onError={() => setErrored(true)}
          className={imgClassName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: focalPoint,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 320ms ease',
          }}
        />
      )}
    </div>
  );
};
