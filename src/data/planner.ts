export type PlannerGoal =
  | 'patio'
  | 'curb-appeal'
  | 'lawn-plants'
  | 'tree-trouble'
  | 'full-makeover';

export type PlannerSize = 'small' | 'medium' | 'large';

export type PlannerPriority =
  | 'low-maintenance'
  | 'entertaining'
  | 'water-saving'
  | 'safety-privacy';

export interface PlannerOption<T extends string> {
  id: T;
  label: string;
  hint: string;
}

export const PLANNER_GOALS: PlannerOption<PlannerGoal>[] = [
  { id: 'patio', label: 'Backyard Patio & Living', hint: 'Dining space, walkways, stone or concrete' },
  { id: 'curb-appeal', label: 'Front Curb Appeal', hint: 'Clean entry, lawn, mulch & crisp edges' },
  { id: 'lawn-plants', label: 'Lawn & Planting Refresh', hint: 'Green turf, drought-smart beds, watering' },
  { id: 'tree-trouble', label: 'Tree & Overgrowth Care', hint: 'Roof clearance, pruning, or full reset' },
  { id: 'full-makeover', label: 'Full Yard Makeover', hint: 'Hardscape, lawn, irrigation & trees together' },
];

export const PLANNER_SIZES: PlannerOption<PlannerSize>[] = [
  { id: 'small', label: 'Compact Yard / Courtyard', hint: 'Townhome, side yard, or tight city lot' },
  { id: 'medium', label: 'Standard Home Lot', hint: 'Typical San Jose front & backyard' },
  { id: 'large', label: 'Large / Estate Lot', hint: 'Wide lawns, mature trees, multiple zones' },
];

export const PLANNER_PRIORITIES: PlannerOption<PlannerPriority>[] = [
  { id: 'low-maintenance', label: 'Low Maintenance', hint: 'Less weekend mowing & weeding' },
  { id: 'entertaining', label: 'Entertaining Space', hint: 'Room for family meals & seating' },
  { id: 'water-saving', label: 'Water-Saving', hint: 'Drip zones, mulch & drought-wise choices' },
  { id: 'safety-privacy', label: 'Safety & Privacy', hint: 'Solid fences & cleared overhanging limbs' },
];

export interface PlannerRecommendation {
  headline: string;
  summary: string;
  services: { slug: string; title: string; reason: string }[];
}

export function buildYardPlan(
  goal: PlannerGoal,
  size: PlannerSize,
  priority: PlannerPriority
): PlannerRecommendation {
  const services: { slug: string; title: string; reason: string }[] = [];

  if (goal === 'patio') {
    if (priority === 'entertaining' || priority === 'low-maintenance') {
      services.push({
        slug: 'pavers',
        title: 'Pavers',
        reason: 'Creates a warm, durable outdoor dining and seating zone with flexible repairability near garden beds.',
      });
    } else {
      services.push({
        slug: 'concrete',
        title: 'Concrete',
        reason: 'Delivers a clean, level patio slab and smooth walkways graded to move rainwater away from your home.',
      });
    }
    services.push({
      slug: priority === 'water-saving' ? 'artificial-lawn' : 'sod-and-mulch',
      title: priority === 'water-saving' ? 'Artificial Lawn' : 'Sod & Mulch',
      reason:
        priority === 'water-saving'
          ? 'Frames the patio in clean green year-round without extra lawn watering.'
          : 'Softens patio edges with fresh green lawn and cool bark mulch beds.',
    });
    if (priority === 'safety-privacy') {
      services.push({
        slug: 'irrigation-fences',
        title: 'Irrigation & Fences',
        reason: 'Adds backyard privacy fencing and routes drip lines cleanly around the new patio.',
      });
    }
  } else if (goal === 'curb-appeal') {
    services.push({
      slug: priority === 'water-saving' || priority === 'low-maintenance' ? 'artificial-lawn' : 'sod-and-mulch',
      title: priority === 'water-saving' || priority === 'low-maintenance' ? 'Artificial Lawn' : 'Sod & Mulch',
      reason:
        priority === 'water-saving' || priority === 'low-maintenance'
          ? 'Gives an always-trimmed front lawn paired with weed-blocking bark mulch.'
          : 'Instant green curb appeal with deep shredded bark mulch framing your entry walk.',
    });
    services.push({
      slug: 'pavers',
      title: 'Pavers',
      reason: 'Welcoming front walkway and driveway border ribbons that elevate the whole facade.',
    });
    services.push({
      slug: 'maintenance',
      title: 'Maintenance',
      reason: 'Keeps front hedges, edges, and walkways crisp week after week.',
    });
  } else if (goal === 'lawn-plants') {
    if (priority === 'low-maintenance' || priority === 'water-saving') {
      services.push({
        slug: 'artificial-lawn',
        title: 'Artificial Lawn',
        reason: 'Cuts mowing and grass watering while keeping pets and family play areas mud-free.',
      });
      services.push({
        slug: 'irrigation-fences',
        title: 'Irrigation & Fences',
        reason: 'Converts existing shrub sprays into efficient root-level drip lines.',
      });
    } else {
      services.push({
        slug: 'sod-and-mulch',
        title: 'Sod & Mulch',
        reason: 'Replaces tired grass with fresh amended soil, healthy sod, and moisture-holding mulch.',
      });
      services.push({
        slug: 'lawn-aeration',
        title: 'Lawn Aeration',
        reason: 'Opens up compacted Silicon Valley clay so existing turf roots breathe and soak in water.',
      });
    }
    services.push({
      slug: 'cleanup',
      title: 'Cleanup',
      reason: 'Clears stubborn weeds and old debris first so new plantings start on clean ground.',
    });
  } else if (goal === 'tree-trouble') {
    services.push({
      slug: 'tree-trimming-removal',
      title: 'Tree Trimming & Removal',
      reason: 'Clears overhanging limbs off your roofline, opens sunlight, or safely removes problem trees.',
    });
    services.push({
      slug: 'cleanup',
      title: 'Cleanup',
      reason: 'Hauls away fallen leaves, tangled brush, and fence-line overgrowth in one coordinated pass.',
    });
    if (priority === 'safety-privacy') {
      services.push({
        slug: 'irrigation-fences',
        title: 'Irrigation & Fences',
        reason: 'Rebuilds damaged fence sections and protects property boundaries.',
      });
    }
  } else {
    services.push({
      slug: 'cleanup',
      title: 'Cleanup',
      reason: 'Strips old overgrowth and debris first so every crew trade works from a clean slate.',
    });
    services.push({
      slug: priority === 'entertaining' ? 'pavers' : 'concrete',
      title: priority === 'entertaining' ? 'Pavers' : 'Concrete',
      reason: 'Anchors the backyard layout with patios, steps, and clear walkways.',
    });
    services.push({
      slug: priority === 'water-saving' ? 'artificial-lawn' : 'sod-and-mulch',
      title: priority === 'water-saving' ? 'Artificial Lawn' : 'Sod & Mulch',
      reason: 'Finishes living areas with green turf and deep bark mulch beds.',
    });
    services.push({
      slug: 'tree-trimming-removal',
      title: 'Tree Trimming & Removal',
      reason: 'Shapes overhead canopy shade before new grass or patios go in underneath.',
    });
  }

  const sizeLabel =
    size === 'small' ? 'compact lot' : size === 'medium' ? 'standard Silicon Valley lot' : 'larger estate lot';

  const headlineMap: Record<PlannerGoal, string> = {
    patio: 'Outdoor Living & Patio Plan',
    'curb-appeal': 'Front Entry & Curb Appeal Plan',
    'lawn-plants': 'Healthy Turf & Water-Wise Beds Plan',
    'tree-trouble': 'Canopy Safety & Yard Reset Plan',
    'full-makeover': 'Complete Yard Sequence Plan',
  };

  return {
    headline: headlineMap[goal],
    summary: `Tailored sequence for a ${sizeLabel} focused on ${priority.replace('-', ' ')}. Final measurements, material samples, and exact scope are confirmed on site during your Free Estimate.`,
    services,
  };
}
