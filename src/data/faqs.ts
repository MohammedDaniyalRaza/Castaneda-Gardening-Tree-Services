export type FaqCategory =
  | 'Estimates & Scheduling'
  | 'Hardscape'
  | 'Lawn & Garden'
  | 'Trees'
  | 'Service Area';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  'Estimates & Scheduling',
  'Hardscape',
  'Lawn & Garden',
  'Trees',
  'Service Area',
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Estimates & Scheduling',
    question: 'Do you really offer free estimates?',
    answer:
      'Yes. We walk your yard in person, discuss what you want to improve, look at access and drainage, and provide a clear written estimate with no obligation.',
  },
  {
    id: 'faq-2',
    category: 'Estimates & Scheduling',
    question: 'What is the fastest way to reach Castaneda?',
    answer:
      'Call or text our primary line at (408) 914-8265 or our secondary line at (408) 284-9558. You can also send your project details through our Free Estimate page.',
  },
  {
    id: 'faq-3',
    category: 'Estimates & Scheduling',
    question: 'Why do you avoid giving exact prices over the phone before seeing the yard?',
    answer:
      'Two yards with the same square footage can need very different prep work—soil slope, old concrete tear-out, narrow side-gate access, tree size, and material choices all affect labor and haul-off. Seeing the space in person keeps your estimate honest.',
  },
  {
    id: 'faq-4',
    category: 'Estimates & Scheduling',
    question: 'Can we bundle hardscape, lawn work, and tree trimming into one project?',
    answer:
      'Yes. Having one local crew handle tree clearing, concrete or pavers, irrigation, and final sod or mulch keeps the sequence smooth and prevents new concrete or grass from being damaged between different contractors.',
  },
  {
    id: 'faq-5',
    category: 'Hardscape',
    question: 'Should I choose interlocking pavers or poured concrete for my patio?',
    answer:
      'Pavers offer stone texture, flexible repair if a tree root shifts underneath, and instant use once compacted. Poured concrete gives a seamless modern surface, crisp steps, and clean sweepability. We can show pros and cons for your specific yard during your estimate.',
  },
  {
    id: 'faq-6',
    category: 'Hardscape',
    question: 'Do you haul away old cracked concrete, broken pavers, or old fencing?',
    answer:
      'Yes. Demolition and haul-off of existing concrete, asphalt, weathered wood fences, and old turf are included when part of your scope.',
  },
  {
    id: 'faq-7',
    category: 'Hardscape',
    question: 'How do you make sure a new patio does not puddle against the house?',
    answer:
      'We set string lines and slope every patio or walkway away from house foundations and walls, and tie in surface drains when terrain slopes back toward the home.',
  },
  {
    id: 'faq-8',
    category: 'Hardscape',
    question: 'What kind of fences do you build?',
    answer:
      'We build standard good-neighbor wood privacy fences, horizontal modern slat fences, and custom side-yard gates with concrete-set posts.',
  },
  {
    id: 'faq-9',
    category: 'Lawn & Garden',
    question: 'What is the difference between artificial lawn and fresh sod?',
    answer:
      'Fresh sod gives you cool, living grass that feels natural underfoot and benefits from regular irrigation and mowing. Artificial lawn eliminates mowing and grass watering once installed on a compacted permeable base—ideal for pets, shaded pockets, or water-wise front yards.',
  },
  {
    id: 'faq-10',
    category: 'Lawn & Garden',
    question: 'Do you fix sprinklers and convert lawn zones to drip irrigation?',
    answer:
      'Yes. We repair leaking valves, swap broken heads, adjust spray coverage before installing sod, and convert planting beds to targeted drip lines.',
  },
  {
    id: 'faq-11',
    category: 'Lawn & Garden',
    question: 'Why does Bay Area clay soil benefit from lawn aeration?',
    answer:
      'Santa Clara Valley clay packs down tightly over summer, causing water to run off instead of soaking into roots. Core aeration pulls small plugs out so oxygen, water, and nutrients reach deep into the root zone.',
  },
  {
    id: 'faq-12',
    category: 'Lawn & Garden',
    question: 'Do you do one-time yard cleanups without requiring ongoing maintenance?',
    answer:
      'Yes. You can book a standalone cleanup for overgrowth, weeds, leaves, and haul-off—or pair it with recurring weekly or bi-weekly maintenance afterward.',
  },
  {
    id: 'faq-13',
    category: 'Trees',
    question: 'Do you trim tall trees near roofs and fences, or only small ornamental trees?',
    answer:
      'We handle both ornamental pruning and larger residential shade tree trimming, crown raising over roofs and driveways, deadwood removal, and controlled removals.',
  },
  {
    id: 'faq-14',
    category: 'Trees',
    question: 'What happens to all the branches and logs after trimming or tree removal?',
    answer:
      'We chip brush and haul away all green waste and wood as part of the cleanup, leaving driveways, patios, and lawns swept clear.',
  },
  {
    id: 'faq-15',
    category: 'Trees',
    question: 'Do I need a city permit to remove a tree?',
    answer:
      'Several Silicon Valley cities regulate removal of trees above certain trunk diameters or protected species. We always recommend checking your local city requirements before scheduling a removal.',
  },
  {
    id: 'faq-16',
    category: 'Service Area',
    question: 'Where are you based and which cities do you serve?',
    answer:
      'We serve Silicon Valley, centered on San Jose—including nearby communities such as Santa Clara, Sunnyvale, Cupertino, Mountain View, Los Altos, Palo Alto, Campbell, Los Gatos, Saratoga, Milpitas, Morgan Hill, and Gilroy.',
  },
  {
    id: 'faq-17',
    category: 'Service Area',
    question: 'My city is right on the edge of Silicon Valley—should I still reach out?',
    answer:
      "Yes! Don't see your city listed? Call or text us at (408) 914-8265 and we will let you know right away if our crew covers your neighborhood.",
  },
];
