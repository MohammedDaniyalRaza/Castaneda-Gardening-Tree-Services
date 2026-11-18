import React, { useState } from 'react';
import { SERVICE_CITIES, type AreaCity } from '../../data/areas';

interface SiliconValleyMapProps {
  onSelectCity?: (city: AreaCity) => void;
}

export const SiliconValleyMap: React.FC<SiliconValleyMapProps> = ({ onSelectCity }) => {
  const [selectedSlug, setSelectedSlug] = useState<string>('san-jose');
  const activeCity =
    SERVICE_CITIES.find((c) => c.slug === selectedSlug) || SERVICE_CITIES[0];

  const handleSelect = (city: AreaCity) => {
    setSelectedSlug(city.slug);
    onSelectCity?.(city);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr] items-stretch">
      {/* Stylized SVG Valley Map */}
      <div
        style={{
          backgroundColor: 'var(--soot)',
          border: '1px solid var(--border-dark-strong)',
          borderRadius: '18px',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 440 410"
          role="img"
          aria-label="Stylized map of Silicon Valley and San Jose service area"
          style={{ width: '100%', height: 'auto', maxHeight: '420px', display: 'block' }}
        >
          {/* San Francisco Bay South Edge */}
          <path
            d="M0 0 H285 C270 48, 255 82, 215 102 C175 118, 125 96, 80 76 L0 50 Z"
            fill="#0F281A"
            opacity="0.8"
          />
          <text x="150" y="45" fill="var(--light-leaf)" fontSize="11" fontFamily="var(--font-mono)" opacity="0.75">
            SOUTH BAY
          </text>

          {/* Coastal Range Foothills */}
          <path
            d="M0 130 C40 165, 65 225, 115 280 C165 335, 225 368, 285 410 H0 V130 Z"
            fill="#0D1910"
            opacity="0.9"
          />

          {/* Major Valley Corridors (101 / 280 / 85 stylized lines) */}
          <path
            d="M78 75 C135 125, 200 175, 265 208 C312 252, 345 315, 372 375"
            fill="none"
            stroke="rgba(245, 197, 24, 0.25)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
          <path
            d="M65 115 C110 155, 165 205, 255 205 C305 205, 325 145, 295 108"
            fill="none"
            stroke="rgba(124, 203, 122, 0.22)"
            strokeWidth="2"
          />

          {/* San Jose Hub Halo */}
          <circle cx="260" cy="205" r="46" fill="var(--forest)" opacity="0.22" />
          <circle
            cx="260"
            cy="205"
            r="28"
            fill="none"
            stroke="var(--yellow)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.65"
          />

          {/* City Pins */}
          {SERVICE_CITIES.map((city) => {
            const isActive = city.slug === activeCity.slug;
            const isPrimary = city.primary;
            return (
              <g
                key={city.slug}
                transform={`translate(${city.coords.x}, ${city.coords.y})`}
                onClick={() => handleSelect(city)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                aria-label={`Select ${city.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(city);
                  }
                }}
              >
                <circle
                  r={isActive ? 11 : isPrimary ? 9 : 6.5}
                  fill={isActive ? 'var(--yellow)' : isPrimary ? 'var(--leaf)' : 'var(--forest)'}
                  stroke={isActive ? 'var(--black)' : 'var(--white)'}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <text
                  x={city.coords.x > 290 ? -12 : 13}
                  y={4}
                  textAnchor={city.coords.x > 290 ? 'end' : 'start'}
                  fill={isActive ? 'var(--yellow)' : 'rgba(255,255,255,0.88)'}
                  fontSize={isPrimary || isActive ? '12.5' : '10.5'}
                  fontWeight={isPrimary || isActive ? '700' : '500'}
                  fontFamily="var(--font-body)"
                >
                  {city.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected City Detail Card */}
      <div
        style={{
          backgroundColor: 'var(--soot)',
          border: '1px solid var(--border-dark-strong)',
          borderRadius: '18px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        <div>
          <p className="font-mono-label" style={{ color: 'var(--yellow)', margin: '0 0 8px' }}>
            {activeCity.primary ? 'Primary Hub' : 'Valley Service Area'}
          </p>
          <h3 className="display-md" style={{ color: 'var(--white)', margin: '0 0 12px' }}>
            {activeCity.name}
          </h3>
          <p className="body-copy" style={{ color: 'rgba(255,255,255,0.82)', margin: 0 }}>
            {activeCity.note}
          </p>
        </div>

        <div>
          <p className="font-mono-label" style={{ color: 'var(--light-leaf)', margin: '0 0 10px' }}>
            Tap a city to inspect
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {SERVICE_CITIES.map((city) => {
              const active = city.slug === activeCity.slug;
              return (
                <button
                  key={city.slug}
                  type="button"
                  onClick={() => handleSelect(city)}
                  className={`c-chip c-chip--dark ${active ? 'c-chip--active' : ''}`}
                  style={{ minHeight: '36px', padding: '5px 12px', fontSize: '0.82rem' }}
                >
                  {city.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
