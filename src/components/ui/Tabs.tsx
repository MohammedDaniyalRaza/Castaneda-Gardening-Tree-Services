import React from 'react';
import { cn } from '../../lib/helpers';

export interface TabOption<T extends string> {
  id: T;
  label: string;
}

interface TabsProps<T extends string> {
  tabs: TabOption<T>[];
  activeTab: T;
  onChange: (tab: T) => void;
  ariaLabel: string;
  darkSurface?: boolean;
}

export function Tabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  ariaLabel,
  darkSurface = false,
}: TabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
      }}
    >
      {tabs.map((tab) => {
        const selected = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            className={cn(
              'c-chip',
              darkSurface && 'c-chip--dark',
              selected && 'c-chip--active'
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
