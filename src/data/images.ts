export interface ImageEntry {
  key: string;
  url: string;
  alt: string;
  focalPoint: string;
  orientation: 'landscape' | 'portrait' | 'square';
}

export const IMAGES: Record<string, ImageEntry> = {
  heroOasis: {
    key: 'heroOasis',
    url: '/src/assets/images/hero_backyard_oasis_1795041168723.jpg',
    alt: 'Lush Silicon Valley residential backyard with manicured green lawn, stone paver patio, redwood gazebo, and mature trees at golden hour',
    focalPoint: '50% 55%',
    orientation: 'landscape',
  },
  concrete: {
    key: 'concrete',
    url: '/src/assets/images/service_concrete_patio_1795041169396.jpg',
    alt: 'Modern brushed concrete patio, wide concrete steps, and curved garden walkway framed by dark mulch beds',
    focalPoint: '50% 55%',
    orientation: 'landscape',
  },
  pavers: {
    key: 'pavers',
    url: '/src/assets/images/service_pavers_walkway_1795041168831.jpg',
    alt: 'Custom interlocking stone paver patio and curved walkway beside manicured green lawn in California daylight',
    focalPoint: '50% 60%',
    orientation: 'landscape',
  },
  sodMulch: {
    key: 'sodMulch',
    url: '/src/assets/images/service_sod_mulch_1795041170062.jpg',
    alt: 'Freshly installed green sod lawn bordered by dark shredded bark mulch beds and drought-tolerant California plants',
    focalPoint: '45% 55%',
    orientation: 'landscape',
  },
  treeCare: {
    key: 'treeCare',
    url: '/src/assets/images/service_tree_trimming_1795041170665.jpg',
    alt: 'Arborist pruning a mature residential shade tree canopy with clean balanced limbs above a green lawn',
    focalPoint: '55% 42%',
    orientation: 'landscape',
  },
  irrigationFences: {
    key: 'irrigationFences',
    url: '/src/assets/images/service_irrigation_fences_1795041170603.jpg',
    alt: 'Newly built redwood privacy fence alongside garden beds and lawn sprinklers misting in morning sunlight',
    focalPoint: '50% 50%',
    orientation: 'landscape',
  },
  maintenance: {
    key: 'maintenance',
    url: '/src/assets/images/service_maintenance_cleanup_1795041170887.jpg',
    alt: 'Freshly mowed striped lawn with sculpted cone evergreen shrubs and spotless front yard edging',
    focalPoint: '50% 52%',
    orientation: 'landscape',
  },
  artificialLawn: {
    key: 'artificialLawn',
    url: '/src/assets/images/service_aeration_turf_1795041170574.jpg',
    alt: 'Lush uniform synthetic turf backyard lawn bordered by stone pavers and coastal California garden beds',
    focalPoint: '50% 55%',
    orientation: 'landscape',
  },
  beforeYard: {
    key: 'beforeYard',
    url: '/src/assets/images/before_overgrown_yard_1795041171417.jpg',
    alt: 'Overgrown residential backyard with patchy dry grass, untrimmed shrubs, and fallen leaves before cleanup and renovation',
    focalPoint: '50% 60%',
    orientation: 'landscape',
  },
  afterYard: {
    key: 'afterYard',
    url: '/src/assets/images/after_renovated_yard_1795041172179.jpg',
    alt: 'Renovated Silicon Valley backyard featuring lush green lawn, interlocking paver patio, trimmed hedges, and fresh mulch beds',
    focalPoint: '50% 55%',
    orientation: 'landscape',
  },
};

export function getThumb(url: string): string {
  if (url.startsWith('/src/') || url.startsWith('/')) {
    return url;
  }
  return `${url}${url.includes('?') ? '&' : '?'}auto=format&fit=crop&w=600&q=80`;
}

export function getFull(url: string): string {
  if (url.startsWith('/src/') || url.startsWith('/')) {
    return url;
  }
  return `${url}${url.includes('?') ? '&' : '?'}auto=format&fit=crop&w=1800&q=80`;
}
