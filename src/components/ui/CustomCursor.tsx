import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export const CustomCursor: React.FC = () => {
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reducedMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (!finePointer || reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const target = e.target as HTMLElement | null;
      const isControl = Boolean(
        target?.closest('a, button, input, textarea, [role="button"], [role="slider"]')
      );
      setInteractive(isControl);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [finePointer, reducedMotion]);

  if (!finePointer || reducedMotion || !visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`custom-cursor ${interactive ? 'custom-cursor--interactive' : ''}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
      }}
    />
  );
};
