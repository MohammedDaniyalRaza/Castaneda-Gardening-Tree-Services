// SAMPLE REVIEWS: replace with real reviews before launch

export interface TestimonialItem {
  id: string;
  name: string;
  city: string;
  service: string;
  serviceSlug: string;
  quote: string;
  highlight: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-1',
    name: 'Elena M.',
    city: 'San Jose',
    service: 'Pavers & Sod',
    serviceSlug: 'pavers',
    highlight: 'Replaced cracked concrete with warm pavers',
    quote:
      'Our old backyard patio had lifted from tree roots and felt unusable. Castaneda tore it out, prepped a solid base, and laid curved pavers plus fresh sod around the border. Everything drains cleanly now and the crew swept the driveway before leaving each day.',
  },
  {
    id: 'rev-2',
    name: 'David K.',
    city: 'Cupertino',
    service: 'Tree Trimming & Removal',
    serviceSlug: 'tree-trimming-removal',
    highlight: 'Cleared heavy branches off our roofline',
    quote:
      'We had two big trees hanging straight over the roof and blocking light into the kitchen. They walked the yard with us for the free estimate, pruned both canopies cleanly without hacking the shape, and hauled every branch away.',
  },
  {
    id: 'rev-3',
    name: 'Sofia R.',
    city: 'Campbell',
    service: 'Yard Cleanup & Mulch',
    serviceSlug: 'cleanup',
    highlight: 'Turned an overgrown side yard around in a day',
    quote:
      'After moving into our house, the back fence line was buried under weeds and dead ivy. Their crew cleared everything down to clean soil, shaped the remaining shrubs, and spread dark bark mulch across every bed. Night-and-day difference.',
  },
  {
    id: 'rev-4',
    name: 'Michael T.',
    city: 'Sunnyvale',
    service: 'Artificial Lawn',
    serviceSlug: 'artificial-lawn',
    highlight: 'No more mud from the dog',
    quote:
      'Real grass kept turning into mud near our back door every winter. Castaneda excavated the clay, compacted a smooth rock base, and installed synthetic turf that drains well and stays clean for our dog year-round.',
  },
  {
    id: 'rev-5',
    name: 'Priya N.',
    city: 'Mountain View',
    service: 'Concrete Patio & Steps',
    serviceSlug: 'concrete',
    highlight: 'Wide steps and clean broom finish',
    quote:
      'We needed new wide concrete steps down to the yard and a level slab for outdoor dining. The crew framed the steps cleanly, kept the grade pitched away from the house, and left zero mess on our lawn.',
  },
  {
    id: 'rev-6',
    name: 'Carlos & Teresa G.',
    city: 'Santa Clara',
    service: 'Irrigation & Fences',
    serviceSlug: 'irrigation-fences',
    highlight: 'Fixed leaking valves and built a straight redwood fence',
    quote:
      'It was huge being able to call one crew for both our leaning back fence and broken sprinkler lines. They replaced the damaged posts in concrete, converted our shrub beds to drip, and showed us how to adjust the timer.',
  },
  {
    id: 'rev-7',
    name: 'Hannah L.',
    city: 'Los Gatos',
    service: 'Maintenance',
    serviceSlug: 'maintenance',
    highlight: 'Consistent, tidy weekly upkeep',
    quote:
      'They show up reliably, edge the front walk crisp, and actually pay attention to how our shrubs grow instead of shearing everything into boxes. Always neat around the patio.',
  },
  {
    id: 'rev-8',
    name: 'Robert W.',
    city: 'Saratoga',
    service: 'Lawn Aeration & Sod',
    serviceSlug: 'lawn-aeration',
    highlight: 'Opened up hard clay soil in the front yard',
    quote:
      'Water used to run right off our front lawn into the street. After core aeration and a fresh top-dress, the grass thickened back up and started soaking water in properly.',
  },
  {
    id: 'rev-9',
    name: 'Angela P.',
    city: 'Palo Alto',
    service: 'Sod & Mulch',
    serviceSlug: 'sod-and-mulch',
    highlight: 'Fresh curb appeal without hassle',
    quote:
      'Quick walk-through for the free estimate, clear scope, and solid follow-through. The new sod and deep bark mulch gave our front yard an instant lift.',
  },
  {
    id: 'rev-10',
    name: 'Kevin H.',
    city: 'Milpitas',
    service: 'Concrete & Cleanup',
    serviceSlug: 'concrete',
    highlight: 'Side-yard walkway finally usable',
    quote:
      'Our side yard was narrow, sloped, and muddy. They cleared the weeds, poured a clean brushed concrete walkway with a neat curb edge, and made hauling bins out effortless.',
  },
];
