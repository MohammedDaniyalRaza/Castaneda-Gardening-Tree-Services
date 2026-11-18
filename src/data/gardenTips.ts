export interface GardenTipArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  imageKey: string;
  relatedServiceSlug: string;
  sections: { heading: string; body: string[] }[];
  takeaways: string[];
}

export const GARDEN_TIPS: GardenTipArticle[] = [
  {
    slug: 'when-to-trim-trees-in-silicon-valley',
    title: 'When to Trim Trees in Silicon Valley',
    category: 'Tree Care',
    readTime: '4 min read',
    excerpt:
      'Understanding dormancy windows, summer shade safety, and why avoiding harsh topping cuts keeps Bay Area trees strong.',
    imageKey: 'treeCare',
    relatedServiceSlug: 'tree-trimming-removal',
    sections: [
      {
        heading: 'Late Fall & Winter: Ideal for Structural Pruning',
        body: [
          'For most deciduous shade and fruit trees around San Jose, late fall through winter dormancy is the clearest window for structural pruning. Without leaves hiding the branch architecture, it is easier to spot crossing limbs, weak narrow crotches, and branches heading toward your roofline.',
          'Cool winter weather also lowers stress on the tree while cuts heal cleanly as spring sap rises.',
        ],
      },
      {
        heading: 'Safety & Clearance Cuts Any Time of Year',
        body: [
          'Deadwood, broken storm limbs, or heavy branches scraping shingles or utility drops should not wait for winter. Selective clearance and dead-limb removal can be performed carefully throughout the year to protect roofs, fences, and walkways.',
        ],
      },
      {
        heading: 'Why "Topping" Hurts Long-Term Health',
        body: [
          'Chopping the top off a mature tree forces dozens of weak, fast-growing water sprouts that snap easily in winter winds. Thoughtful crown thinning and reduction back to proper lateral branches keeps the tree balanced and far safer.',
        ],
      },
    ],
    takeaways: [
      'Prune deciduous trees structurally during winter dormancy when possible.',
      'Clear deadwood or roof-scraping limbs promptly in any season.',
      'Check local city tree ordinances before planning a large tree removal.',
    ],
  },
  {
    slug: 'pavers-vs-concrete-for-california-patios',
    title: 'Pavers vs. Concrete for California Patios',
    category: 'Hardscape',
    readTime: '5 min read',
    excerpt:
      'How soil movement, tree roots, drainage, and outdoor furniture use help decide between interlocking pavers and poured concrete.',
    imageKey: 'pavers',
    relatedServiceSlug: 'pavers',
    sections: [
      {
        heading: 'How Bay Area Clay Soil Treats Both Materials',
        body: [
          'Santa Clara Valley clay expands in wet winters and shrinks in dry August heat. A poured concrete slab resists movement as one reinforced unit with planned control joints, while interlocking pavers flex slightly across individual stone joints.',
          'Both depend heavily on proper excavation and compacted crushed rock underneath—skimping on base prep is the #1 reason patios sink or tilt.',
        ],
      },
      {
        heading: 'Repairability Near Mature Tree Roots',
        body: [
          'If your patio sits near an established oak, redwood, or magnolia, interlocking pavers have a clear practical edge: individual stones can be lifted, roots addressed, base re-leveled, and the exact same pavers put right back.',
        ],
      },
      {
        heading: 'Clean Steps, Driveways & Sweeping',
        body: [
          'For crisp porch steps, smooth basketball or rolling bin zones, and minimalist modern lines, broom-finished concrete is hard to beat. Pavers shine when you want warm stone color variation, curved garden edges, and zero wait time after compaction.',
        ],
      },
    ],
    takeaways: [
      'Base preparation matters more than surface style for long-term flatness.',
      'Choose pavers near active tree roots or when you want warm stone texture.',
      'Choose concrete for wide steps, seamless edges, and easy rolling access.',
    ],
  },
  {
    slug: 'how-to-install-sod-and-keep-it-alive',
    title: 'How to Lay Sod and Keep It Alive Through Summer',
    category: 'Lawn & Garden',
    readTime: '4 min read',
    excerpt:
      'Soil prep, irrigation checks, and the simple first-two-week watering routine that helps new sod knit deep roots.',
    imageKey: 'sodMulch',
    relatedServiceSlug: 'sod-and-mulch',
    sections: [
      {
        heading: 'Prep the Soil and Test Sprinklers First',
        body: [
          'Healthy sod starts before the pallets arrive. Stripping old weeds, tilling compacted clay with organic compost, and grading out low spots prevents standing water and uneven mowing.',
          'Run every sprinkler station before laying the first roll so clogged nozzles or crooked pop-ups get fixed while the soil is still bare.',
        ],
      },
      {
        heading: 'The First 14 Days: Keep Seams Damp',
        body: [
          'Fresh sod has shallow cut roots that dry fast in Silicon Valley sun. Short, frequent watering cycles—often morning and early afternoon for the first week or two—keep the root zone evenly moist without creating runoff.',
        ],
      },
      {
        heading: 'Transition to Deeper, Less Frequent Watering',
        body: [
          'Once a gentle tug shows the sod has knitted into the soil underneath, gradually reduce watering frequency while running cycles slightly longer so roots chase moisture downward.',
        ],
      },
    ],
    takeaways: [
      'Always adjust and test sprinklers before laying sod.',
      'Stagger sod seams like brickwork and roll flat for full soil contact.',
      'Shift from frequent light misting to deeper watering once roots anchor.',
    ],
  },
  {
    slug: 'water-wise-irrigation-basics-for-dry-summers',
    title: 'Water-Wise Irrigation Basics for Dry Summers',
    category: 'Irrigation',
    readTime: '4 min read',
    excerpt:
      'Practical ways to cut runoff, separate lawn and shrub zones, and make every gallon count during long dry California months.',
    imageKey: 'irrigationFences',
    relatedServiceSlug: 'irrigation-fences',
    sections: [
      {
        heading: 'Stop Watering Shrubs and Lawns on the Same Valve',
        body: [
          'Lawns and established California shrubs have completely different thirst levels. Separating planting beds onto dedicated low-flow drip zones keeps trees and perennials healthy without flooding your grass or wasting spray onto sidewalks.',
        ],
      },
      {
        heading: 'Cycle and Soak on Clay Soil',
        body: [
          'Running sprinklers for 15 straight minutes on clay soil usually sends half the water down the gutter after minute six. Splitting watering into two shorter back-to-back cycles lets water soak in before restarting.',
        ],
      },
      {
        heading: 'Pair Drip Lines With 3 Inches of Bark Mulch',
        body: [
          'Running drip emitters underneath a thick layer of shredded bark mulch shields moisture from direct afternoon sun and lowers evaporation significantly.',
        ],
      },
    ],
    takeaways: [
      'Separate grass spray zones from shrub and tree drip zones.',
      'Water early in the morning when wind and evaporation are lowest.',
      'Use bark mulch over drip lines to keep root zones cool.',
    ],
  },
  {
    slug: 'artificial-lawn-vs-natural-grass',
    title: 'Artificial Lawn vs. Natural Grass: An Honest Look',
    category: 'Lawn & Garden',
    readTime: '5 min read',
    excerpt:
      'Weighing heat, pet use, shade, mowing upkeep, and water use so you pick the surface that fits your household.',
    imageKey: 'artificialLawn',
    relatedServiceSlug: 'artificial-lawn',
    sections: [
      {
        heading: 'Where Natural Sod Still Wins',
        body: [
          'Real grass stays noticeably cooler underfoot on 95-degree afternoons, softens ambient heat around a patio, and gives that classic living garden feel. If your yard has decent sunlight and working sprinklers, natural sod is tough to beat.',
        ],
      },
      {
        heading: 'Where Synthetic Turf Makes Total Sense',
        body: [
          'In narrow shaded side yards where grass turns patchy, front yards where homeowners want crisp curb appeal with minimal water, or backyards with active dogs that dig through mud every January, artificial turf solves real headaches.',
        ],
      },
      {
        heading: 'Blending Both With Pavers & Plantings',
        body: [
          'Many Silicon Valley yards skip an all-or-nothing choice: pairing a clean synthetic turf play lawn with generous bark mulch borders, drought-hardy shrubs, and real shade trees keeps the yard feeling alive and balanced.',
        ],
      },
    ],
    takeaways: [
      'Natural sod feels cooler in direct sun; synthetic turf thrives in shade and high-traffic pet zones.',
      'Proper compacted rock base prevents turf ripples and holds drainage.',
      'Surround turf with real trees and shrubs so the yard stays vibrant.',
    ],
  },
  {
    slug: 'when-and-why-to-aerate-your-lawn',
    title: 'When and Why to Aerate a Bay Area Lawn',
    category: 'Lawn & Garden',
    readTime: '3 min read',
    excerpt:
      'Spotting soil compaction early and why pulling soil cores once a year revives tired turf.',
    imageKey: 'maintenance',
    relatedServiceSlug: 'lawn-aeration',
    sections: [
      {
        heading: 'Signs Your Lawn Soil Is Compacted',
        body: [
          'If you try pushing a screwdriver into moist soil and it stops after an inch, or if sprinklers puddle on top of the grass before running onto the sidewalk, compaction is starving the roots of air and water.',
        ],
      },
      {
        heading: 'Core Aeration vs. Spike Tools',
        body: [
          'Simple spike rollers actually press soil tighter around each hole. True hollow-tine core aeration physically lifts soil plugs out of the ground, creating real breathing room for roots to expand.',
        ],
      },
      {
        heading: 'Best Timing in San Jose',
        body: [
          'Early spring or early fall—when daytime temperatures are mild and grass is actively growing—gives aerated turf the fastest recovery, especially if paired with overseeding.',
        ],
      },
    ],
    takeaways: [
      'Water a day or two before aerating so tines pull deep cores.',
      'Leave pulled cores on the turf to break down naturally.',
      'Pair aeration with overseeding for patchy or thinning lawns.',
    ],
  },
];

export function getGardenTipBySlug(slug: string | undefined): GardenTipArticle | undefined {
  return GARDEN_TIPS.find((tip) => tip.slug === slug);
}
