export interface AreaCity {
  name: string;
  slug: string;
  note: string;
  coords: { x: number; y: number };
  primary?: boolean;
}

export const SERVICE_AREA_HEADLINE = 'Silicon Valley, centered on San Jose';

// Suggested nearby areas, client must confirm
export const SERVICE_CITIES: AreaCity[] = [
  {
    name: 'San Jose',
    slug: 'san-jose',
    note: 'Central hub across Willow Glen, Almaden, Evergreen, Cambrian, and Rose Garden.',
    coords: { x: 260, y: 205 },
    primary: true,
  },
  {
    name: 'Santa Clara',
    slug: 'santa-clara',
    note: 'Front lawn conversions, concrete driveways, and weekly garden care.',
    coords: { x: 205, y: 170 },
  },
  {
    name: 'Sunnyvale',
    slug: 'sunnyvale',
    note: 'Paver patios, water-wise drip irrigation, and backyard cleanups.',
    coords: { x: 162, y: 145 },
  },
  {
    name: 'Cupertino',
    slug: 'cupertino',
    note: 'Mature shade tree trimming, sod lawns, and custom walkways.',
    coords: { x: 145, y: 185 },
  },
  {
    name: 'Mountain View',
    slug: 'mountain-view',
    note: 'Artificial turf installations, cedar fencing, and ongoing maintenance.',
    coords: { x: 120, y: 120 },
  },
  {
    name: 'Los Altos',
    slug: 'los-altos',
    note: 'Estate tree care, stone borders, and deep bark mulch beds.',
    coords: { x: 96, y: 152 },
  },
  {
    name: 'Palo Alto',
    slug: 'palo-alto',
    note: 'Canopy pruning, lawn aeration, and precision sprinkler upgrades.',
    coords: { x: 82, y: 92 },
  },
  {
    name: 'Campbell',
    slug: 'campbell',
    note: 'Patio hardscapes, yard cleanups, and fresh sod installation.',
    coords: { x: 202, y: 228 },
  },
  {
    name: 'Los Gatos',
    slug: 'los-gatos',
    note: 'Hillside tree thinning, brush clearing, and custom stone patios.',
    coords: { x: 185, y: 270 },
  },
  {
    name: 'Saratoga',
    slug: 'saratoga',
    note: 'Large-lot tree removal, privacy fences, and drought-smart plantings.',
    coords: { x: 138, y: 245 },
  },
  {
    name: 'Milpitas',
    slug: 'milpitas',
    note: 'Driveway concrete, backyard pavers, and dependable maintenance.',
    coords: { x: 282, y: 125 },
  },
  {
    name: 'Morgan Hill',
    slug: 'morgan-hill',
    note: 'Acreage cleanups, perimeter fencing, and large tree work.',
    coords: { x: 332, y: 315 },
  },
  {
    name: 'Gilroy',
    slug: 'gilroy',
    note: 'Full yard cleanups, sod & mulch installs, and tree trimming.',
    coords: { x: 365, y: 368 },
  },
];

export const AREA_FALLBACK_NOTE = "Don't see your city? Call or text us.";
