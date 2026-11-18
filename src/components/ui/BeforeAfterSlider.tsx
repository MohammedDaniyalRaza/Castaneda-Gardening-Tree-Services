import React, { useState, useRef, useCallback } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { clamp } from '../../lib/helpers';
import { getFull } from '../../data/images';

interface BeforeAfterSliderProps {
  beforeUrl: string;
  beforeAlt: string;
  afterUrl: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeUrl,
  beforeAlt,
  afterUrl,
  afterAlt,
  beforeLabel = 'Before',
  afterLabel = 'After',
}) => {
  const [position, setPosition] = useState(52);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (!rect.width) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clamp(pct, 4, 96));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((p) => clamp(p - 4, 4, 96));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((p) => clamp(p + 4, 4, 96));
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        minHeight: '280px',
        maxHeight: '560px',
        borderRadius: '18px',
        overflow: 'hidden',
        border: '2px solid rgba(255,255,255,0.18)',
        cursor: 'ew-resize',
        touchAction: 'pan-y',
        backgroundColor: 'var(--soot)',
        userSelect: 'none',
      }}
    >
      {/* After Image (Full layer) */}
      <img
        src={getFull(afterUrl)}
        alt={afterAlt}
        referrerPolicy="no-referrer"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />

      {/* Before Image (Clipped) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          pointerEvents: 'none',
        }}
      >
        <img
          src={getFull(beforeUrl)}
          alt={beforeAlt}
          referrerPolicy="no-referrer"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Labels */}
      <div
        style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          backgroundColor: 'rgba(10, 12, 10, 0.85)',
          color: 'var(--white)',
          padding: '5px 12px',
          borderRadius: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.74rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}
      >
        {beforeLabel}
      </div>
      <div
        style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          backgroundColor: 'var(--deep-forest)',
          color: 'var(--yellow)',
          border: '1px solid var(--yellow)',
          padding: '5px 12px',
          borderRadius: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.74rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}
      >
        {afterLabel}
      </div>

      {/* Grass-Edge Divider Line & Handle */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${position}%`,
          transform: 'translateX(-50%)',
          width: '4px',
          backgroundColor: 'var(--yellow)',
          boxShadow: '0 0 18px rgba(10, 12, 10, 0.65)',
          pointerEvents: 'none',
        }}
      />

      <button
        type="button"
        role="slider"
        aria-label="Drag or use arrow keys to compare before and after yard"
        aria-valuemin={4}
        aria-valuemax={96}
        aria-valuenow={Math.round(position)}
        onKeyDown={onKeyDown}
        style={{
          position: 'absolute',
          top: '50%',
          left: `${position}%`,
          transform: 'translate(-50%, -50%)',
          width: '50px',
          height: '50px',
          borderRadius: '999px',
          backgroundColor: 'var(--yellow)',
          color: 'var(--black)',
          border: '3px solid var(--black)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(0,0,0,0.45)',
          cursor: 'ew-resize',
        }}
      >
        <MoveHorizontal size={20} aria-hidden="true" />
      </button>
    </div>
  );
};
