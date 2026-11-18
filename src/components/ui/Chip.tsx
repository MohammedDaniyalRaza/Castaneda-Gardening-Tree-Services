import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/helpers';

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  darkSurface?: boolean;
  showCheck?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  active,
  onClick,
  darkSurface = false,
  showCheck = false,
}) => {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'c-chip',
        darkSurface && 'c-chip--dark',
        active && 'c-chip--active'
      )}
    >
      {showCheck && active && <Check size={15} aria-hidden="true" />}
      <span>{label}</span>
    </button>
  );
};
