// SAMPLE IMAGERY: replace with the client's real project photos
import { IMAGES } from './images';

export type GalleryCategory = 'All' | 'Hardscape' | 'Lawn & Garden' | 'Tree Care';

export interface GalleryItem {
  id: string;
  title: string;
  city: string;
  category: Exclude<GalleryCategory, 'All'>;
  serviceSlug: string;
  caption: string;
  imageKey: string;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'Hardscape',
  'Lawn & Garden',
  'Tree Care',
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Backyard Patio, Gazebo & Lawn',
    city: 'San Jose',
    category: 'Hardscape',
    serviceSlug: 'pavers',
    caption: 'Sample project view — interlocking patio stone curving around fresh turf and planted borders.',
    imageKey: 'heroOasis',
  },
  {
    id: 'gal-2',
    title: 'Brushed Concrete Steps & Path',
    city: 'Cupertino',
    category: 'Hardscape',
    serviceSlug: 'concrete',
    caption: 'Sample project view — architectural concrete patio steps leading to a curved side walkway.',
    imageKey: 'concrete',
  },
  {
    id: 'gal-3',
    title: 'Multi-Tone Paver Courtyard',
    city: 'Los Gatos',
    category: 'Hardscape',
    serviceSlug: 'pavers',
    caption: 'Sample project view — warm charcoal and sandstone pavers with soldier-course edging.',
    imageKey: 'pavers',
  },
  {
    id: 'gal-4',
    title: 'Fresh Sod & Dark Bark Mulch',
    city: 'Sunnyvale',
    category: 'Lawn & Garden',
    serviceSlug: 'sod-and-mulch',
    caption: 'Sample project view — clean metal edging dividing fresh sod from California-friendly mulch beds.',
    imageKey: 'sodMulch',
  },
  {
    id: 'gal-5',
    title: 'Mature Oak Canopy Pruning',
    city: 'Saratoga',
    category: 'Tree Care',
    serviceSlug: 'tree-trimming-removal',
    caption: 'Sample project view — balanced canopy thinning for light penetration and roof clearance.',
    imageKey: 'treeCare',
  },
  {
    id: 'gal-6',
    title: 'Redwood Fence & Sprinkler Line',
    city: 'Campbell',
    category: 'Hardscape',
    serviceSlug: 'irrigation-fences',
    caption: 'Sample project view — warm horizontal wood privacy fence paired with calibrated lawn sprinklers.',
    imageKey: 'irrigationFences',
  },
  {
    id: 'gal-7',
    title: 'Striped Lawn & Cone Shrubs',
    city: 'Willow Glen, San Jose',
    category: 'Lawn & Garden',
    serviceSlug: 'maintenance',
    caption: 'Sample project view — crisp weekly mowing stripes and neatly sheared cone evergreen shrubs.',
    imageKey: 'maintenance',
  },
  {
    id: 'gal-8',
    title: 'Artificial Turf & Stone Pavers',
    city: 'Mountain View',
    category: 'Lawn & Garden',
    serviceSlug: 'artificial-lawn',
    caption: 'Sample project view — low-water synthetic lawn seamlessly bordered against patio pavers.',
    imageKey: 'artificialLawn',
  },
  {
    id: 'gal-9',
    title: 'Full Backyard Transformation',
    city: 'Santa Clara',
    category: 'Lawn & Garden',
    serviceSlug: 'cleanup',
    caption: 'Sample project view — full yard reset combining sod, hedge shaping, and new patio stone.',
    imageKey: 'afterYard',
  },
];

export function getGalleryImage(item: GalleryItem) {
  return IMAGES[item.imageKey] || IMAGES.heroOasis;
}
