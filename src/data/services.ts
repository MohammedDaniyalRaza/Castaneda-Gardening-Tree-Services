export type ServiceCategory = 'Hardscape' | 'Lawn & Garden' | 'Tree Care';

export interface ServiceItem {
  slug: string;
  category: ServiceCategory;
  secondaryCategory?: ServiceCategory;
  title: string;
  shortTitle: string;
  shortBlurb: string;
  longDescription: string[];
  whoItIsFor: string;
  afterCare: string;
  whatsIncluded: string[];
  typicalProjects: string[];
  processSteps: { title: string; detail: string }[];
  faqs: { q: string; a: string }[];
  heroImageKey: string;
  relatedSlugs: string[];
}

export const SERVICE_CATEGORIES: {
  id: ServiceCategory;
  title: string;
  subtitle: string;
  glyph: 'gazebo' | 'shrub' | 'tree';
}[] = [
  {
    id: 'Hardscape',
    title: 'Hardscape',
    subtitle: 'Concrete, interlocking pavers, steps, driveways, and redwood fencing built for long-term daily use.',
    glyph: 'gazebo',
  },
  {
    id: 'Lawn & Garden',
    title: 'Lawn & Garden',
    subtitle: 'Fresh sod, bark mulch, artificial turf, irrigation, aeration, cleanups, and recurring upkeep.',
    glyph: 'shrub',
  },
  {
    id: 'Tree Care',
    title: 'Tree Care',
    subtitle: 'Thoughtful canopy trimming, deadwood clearing, structural shaping, and safe tree removal.',
    glyph: 'tree',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    slug: 'concrete',
    category: 'Hardscape',
    title: 'Concrete',
    shortTitle: 'Concrete',
    shortBlurb: 'Patios, walkways, driveways, slabs, and steps poured clean and graded to drain.',
    longDescription: [
      'Good residential concrete starts long before the truck arrives. We excavate, set compacted aggregate base, build crisp forms, reinforce the pour, and set proper pitch so rainwater moves away from your house and patio doors.',
      'From broom-finished side yards and utility pads to wide front steps, driveways, and shaded backyard entertaining slabs, concrete creates an even, low-upkeep foundation that handles Silicon Valley sun without shifting.',
    ],
    whoItIsFor:
      'Homeowners replacing cracked old slabs, widening narrow driveways, adding patio seating, or creating solid side-yard access.',
    afterCare:
      'Keep heavy vehicles off new driveways during initial curing, mist lightly if advised in hot summer weather, and rinse soil or leaf tannins periodically to keep the surface bright.',
    whatsIncluded: [
      'Site layout, elevation check, and drainage slope planning',
      'Demolition and haul-off of old cracked concrete when needed',
      'Compacted base rock preparation and formwork',
      'Steel rebar or wire mesh reinforcement tailored to slab load',
      'Clean broom, smooth trowel, or border-tooled finishes and control joints',
    ],
    typicalProjects: [
      'Backyard dining & grill patios',
      'Curved front entry walkways & porch steps',
      'Driveway extensions & RV/side-yard slabs',
      'Shed, hot tub, and pergola foundation pads',
    ],
    processSteps: [
      { title: 'Walkthrough & Layout', detail: 'We measure the footprint, check grade around your foundation, and review finish options during your free estimate.' },
      { title: 'Excavation & Base', detail: 'Old material is cleared, soil is compacted, and a crushed base layer is leveled with forms and reinforcement.' },
      { title: 'Pour & Finish', detail: 'Concrete is placed, screeded, edged, and textured cleanly with deliberate control joints to manage natural movement.' },
      { title: 'Form Strip & Cleanup', detail: 'Forms come off cleanly, surrounding beds are tidied, and we walk you through early curing care.' },
    ],
    faqs: [
      {
        q: 'Can you remove old cracked concrete before pouring new?',
        a: 'Yes. We break up, haul away, and re-grade existing concrete patios, walks, and driveways before prepping the new base.',
      },
      {
        q: 'How do you handle drainage on a patio next to the house?',
        a: 'Every slab is pitched away from structures, and we can tie in channel drains or catch basins when patios meet lawn or planting beds.',
      },
      {
        q: 'Do you pour small pads for sheds or trash enclosures?',
        a: 'Yes, we handle both full backyard patios and practical smaller slabs like side-yard walkways and utility pads.',
      },
    ],
    heroImageKey: 'concrete',
    relatedSlugs: ['pavers', 'irrigation-fences', 'cleanup'],
  },
  {
    slug: 'pavers',
    category: 'Hardscape',
    title: 'Pavers',
    shortTitle: 'Pavers',
    shortBlurb: 'Interlocking stone patios, walkways, driveways, and crisp garden borders.',
    longDescription: [
      'Interlocking pavers bring warmth, texture, and pattern to Silicon Valley backyards and front entries. Unlike monolithic slabs, modular stone units allow slight natural ground movement without ugly random cracking and can be lifted cleanly if you ever need to reach an underground pipe or wire.',
      'We focus heavily on what sits underneath: proper excavation depth, compacted road base, bedding sand screeded dead-flat, sturdy edge restraints, and polymeric joint sand locked tight with a plate compactor.',
    ],
    whoItIsFor:
      'Homeowners wanting warm stone texture for outdoor dining areas, front entryways, curved garden paths, or driveway aprons.',
    afterCare:
      'Sweep leaves before winter rains, blow out loose grit periodically, and top up polymeric sand or rinse moss in shaded corners as seasons change.',
    whatsIncluded: [
      'Pattern and border color coordination with your home exterior',
      'Deep excavation and layered compacted base rock',
      'Precision screeded bedding sand and tight joint spacing',
      'Custom wet-saw cuts along curves, walls, and drains',
      'Edge restraint installation and polymeric sand compaction',
    ],
    typicalProjects: [
      'Multi-tone backyard lounge & fire-pit patios',
      'Curved front walkways framed by mulch beds',
      'Driveway ribbons, borders, and aprons',
      'Stepping-stone paths between lawn and patio',
    ],
    processSteps: [
      { title: 'Measure & Material Selection', detail: 'We review paver shapes, soldier-course borders, and layout flow during your free on-site visit.' },
      { title: 'Sub-Base Compaction', detail: 'We dig to depth and compact crushed aggregate in lifts so the patio stays level for years.' },
      { title: 'Laying & Precision Cuts', detail: 'Stones are laid to string lines, bordered, and cleanly cut to fit curves and edges.' },
      { title: 'Sand Lock & Sweep', detail: 'Joint sand is vibrated deep into every seam and the patio is swept spotless.' },
    ],
    faqs: [
      {
        q: 'Are pavers better than concrete near tree roots?',
        a: 'Often yes. If a tree root lifts a section years later, individual pavers can be lifted, the root area adjusted, and the same stones reset cleanly.',
      },
      {
        q: 'Do weeds grow between pavers?',
        a: 'A properly compacted base and polymeric joint sand lock joints tight so weeds have a hard time taking root from below.',
      },
      {
        q: 'Can you add a paver border along an existing lawn or driveway?',
        a: 'Yes, soldier-course paver borders are a clean way to frame lawns, mulch beds, and concrete driveways.',
      },
    ],
    heroImageKey: 'pavers',
    relatedSlugs: ['concrete', 'artificial-lawn', 'sod-and-mulch'],
  },
  {
    slug: 'sod-and-mulch',
    category: 'Lawn & Garden',
    title: 'Sod & Mulch',
    shortTitle: 'Sod & Mulch',
    shortBlurb: 'Instant fresh green turf paired with deep, weed-suppressing bark mulch beds.',
    longDescription: [
      'Nothing transforms an entire yard faster than pairing clean, fresh sod with rich dark bark mulch in the surrounding beds. We strip dead turf and weeds, rototill and amend compacted Bay Area clay soil, grade smoothly, and check sprinkler coverage before a single roll of sod goes down.',
      'In surrounding beds, a generous layer of shredded bark or wood chip mulch keeps roots cooler through hot San Jose summers, slows evaporation, and cuts down summer weeds naturally.',
    ],
    whoItIsFor:
      'Families wanting a soft real-grass play area, homeowners prepping a property for curb appeal, or anyone refreshing tired beds.',
    afterCare:
      'Water new sod frequently in shallow cycles during the first two weeks while roots knit into the topsoil, avoid heavy foot traffic until anchored, and keep mowers sharp.',
    whatsIncluded: [
      'Removal of dead grass, weeds, and surface debris',
      'Soil grading, tilling, and compost amendment',
      'Pre-install sprinkler check and head height adjustment',
      'Tight-seam staggered sod laying and lawn rolling',
      'Clean trench edging and fresh bark mulch spreading in garden beds',
    ],
    typicalProjects: [
      'Front lawn tear-out and fresh sod installation',
      'Backyard pet & family grass areas',
      'Full-property bark mulch refresh for summer moisture retention',
      'Curved metal, stone, or trench bed borders',
    ],
    processSteps: [
      { title: 'Soil & Shade Check', detail: 'We evaluate sun exposure and irrigation coverage so the right grass blend goes in.' },
      { title: 'Strip, Till & Grade', detail: 'Old turf comes out, topsoil is conditioned and smoothed so water does not puddle.' },
      { title: 'Lay Sod & Roll', detail: 'Fresh rolls are laid tightly in staggered rows, trimmed cleanly around curves, and rolled flat.' },
      { title: 'Mulch Beds & Water Test', detail: 'Bark mulch is spread evenly around shrubs and irrigation is tested end to end.' },
    ],
    faqs: [
      {
        q: 'Should irrigation be checked before laying new sod?',
        a: 'Always. Testing and adjusting sprinkler heads before laying sod prevents dry spots during the critical rooting period.',
      },
      {
        q: 'How thick should bark mulch be applied?',
        a: 'Usually around 2 to 3 inches across planting beds—thick enough to hold moisture and block weeds while keeping mulch pulled slightly back from tree trunks.',
      },
      {
        q: 'Can you install sod in a shaded yard?',
        a: 'Yes. We recommend grass varieties suited to partial shade, or suggest groundcover/mulch pockets where heavy canopy shade prevents grass from thriving.',
      },
    ],
    heroImageKey: 'sodMulch',
    relatedSlugs: ['lawn-aeration', 'irrigation-fences', 'maintenance'],
  },
  {
    slug: 'tree-trimming-removal',
    category: 'Tree Care',
    title: 'Tree Trimming & Removal',
    shortTitle: 'Tree Trimming & Removal',
    shortBlurb: 'Canopy shaping, roof clearance, deadwood pruning, and safe tree removal with full haul-off.',
    longDescription: [
      'Healthy trees bring shade, privacy, and character to Silicon Valley neighborhoods—until overgrown limbs scrape rooftops, crowd power drops, or block winter light. We prune thoughtfully for tree health and clean clearance rather than harsh "lion-tailing" or topping cuts that weaken branches.',
      'When a tree is dead, diseased, crowding a foundation, or dropping limbs dangerously close to structures, we plan controlled sectional removals and haul away every branch and trunk round.',
    ],
    whoItIsFor:
      'Homeowners with overhanging limbs near roofs and driveways, dense unpruned canopies, storm-damaged branches, or unwanted trees.',
    afterCare:
      'Water mature drought-stressed trees deeply and infrequently away from the trunk flare during prolonged dry months, and avoid piling heavy mulch against the bark.',
    whatsIncluded: [
      'Structural canopy thinning and crown raising over roofs and walkways',
      'Dead, crossing, and hazardous limb removal',
      'Controlled sectional takedowns in tight residential yards',
      'Brush chipping, log cutting, and complete green-waste haul-off',
      'Thorough yard rake and blow-down after every job',
    ],
    typicalProjects: [
      'Roofline, chimney, and solar-panel shade clearance',
      'Seasonal fruit tree and ornamental pruning',
      'Storm-broken limb clearing and dead tree removal',
      'Hedge reduction and privacy screen shaping',
    ],
    processSteps: [
      { title: 'On-Site Tree Assessment', detail: 'We inspect tree structure, access gates, roofs, fences, and drop zones during your free estimate.' },
      { title: 'Work Zone Protection', detail: 'Surrounding patios, plantings, and lawns are cleared or protected before cutting begins.' },
      { title: 'Precision Pruning or Removal', detail: 'Limbs are selectively pruned or rigged down cleanly in controlled sections.' },
      { title: 'Chipping & Clean Sweep', detail: 'Brush and wood are hauled off and your driveway and yard are left neat.' },
    ],
    faqs: [
      {
        q: 'Do I need a permit to remove a tree in San Jose or nearby cities?',
        a: 'Many Silicon Valley cities have ordinance rules based on tree species and trunk circumference. We advise checking local city requirements before removing a large or heritage tree.',
      },
      {
        q: 'Do you haul away all the branches and wood?',
        a: 'Yes. Standard trimming and removal includes hauling away brush and debris, or we can stack cut firewood rounds if you prefer to keep them.',
      },
      {
        q: 'When is the best time to trim trees in California?',
        a: 'Structural pruning for many deciduous trees works best in late fall or winter dormancy, while deadwood clearing and safety clearance can be done carefully year-round.',
      },
    ],
    heroImageKey: 'treeCare',
    relatedSlugs: ['cleanup', 'maintenance', 'irrigation-fences'],
  },
  {
    slug: 'irrigation-fences',
    category: 'Lawn & Garden',
    secondaryCategory: 'Hardscape',
    title: 'Irrigation & Fences',
    shortTitle: 'Irrigation & Fences',
    shortBlurb: 'Water-wise drip lines, sprinkler repairs, smart timers, and sturdy wood privacy fencing.',
    longDescription: [
      'Two quiet backbone systems keep every Bay Area yard running smoothly: dependable irrigation that puts water only where plants actually drink, and straight, solid fencing that frames your property with privacy.',
      'We troubleshoot leaking valves, swap wasteful spray heads for high-efficiency rotary nozzles or targeted drip lines, and program seasonal watering schedules. On the fence side, we build classic redwood good-neighbor fences, horizontal slat panels, and sturdy backyard gates.',
    ],
    whoItIsFor:
      'Homeowners fixing broken sprinklers, converting lawn zones to drip, updating timers, or replacing leaning weathered wood fences.',
    afterCare:
      'Run a quick visual sprinkler test every spring to spot clogged nozzles or shifted heads, and adjust timer minutes downward as fall temperatures cool.',
    whatsIncluded: [
      'Sprinkler line leak detection, valve & solenoid replacement',
      'Drip irrigation conversions for shrubs, trees, and vegetable beds',
      'Smart weather-aware controller installation and zone setup',
      'New redwood or cedar fence posts set in concrete footings',
      'Custom-fitted latches, gates, and old fence haul-off',
    ],
    typicalProjects: [
      'Lawn-to-drip zone conversions for drought-wise beds',
      'Multi-zone sprinkler repairs and pressure regulation',
      'Good-neighbor redwood privacy fences and side gates',
      'Horizontal modern slat fencing for backyard patios',
    ],
    processSteps: [
      { title: 'Line & Fence Check', detail: 'We run existing irrigation zones or walk your property line to map posts, slopes, and utilities.' },
      { title: 'Clean Trenching & Post Setting', detail: 'Pipes are trenched neatly or fence posts are plumbed in deep concrete footings.' },
      { title: 'Assembly & Calibration', detail: 'Drip emitters, heads, and boards are fitted straight and tight with stainless or coated fasteners.' },
      { title: 'Zone Test & Walkthrough', detail: 'Every irrigation station and gate latch is tested with you on site.' },
    ],
    faqs: [
      {
        q: 'Can you convert old lawn sprinklers into drip lines for garden beds?',
        a: 'Yes. We cap unused spray heads, add pressure regulation and filtration at the valve or riser, and run dedicated drip tubing directly to shrubs and trees.',
      },
      {
        q: 'What wood do you use for backyard fences?',
        a: 'Redwood and cedar pickets paired with pressure-treated or steel posts are popular across San Jose for durability and natural warmth.',
      },
      {
        q: 'Do you replace just one leaning fence section or gate?',
        a: 'Yes, we handle both full perimeter fence replacements and targeted section or gate rebuilds.',
      },
    ],
    heroImageKey: 'irrigationFences',
    relatedSlugs: ['sod-and-mulch', 'pavers', 'concrete'],
  },
  {
    slug: 'maintenance',
    category: 'Lawn & Garden',
    title: 'Maintenance',
    shortTitle: 'Maintenance',
    shortBlurb: 'Dependable weekly or bi-weekly mowing, edging, pruning, weeding, and blowing.',
    longDescription: [
      'Consistent care is what keeps a great yard looking effortless month after month. Our maintenance crew shows up reliably, mows at the right seasonal height for California turf, trims crisp edges along walks and beds, keeps shrubs shaped naturally, and leaves every patio swept clean.',
      'Whether you need recurring weekly visits during fast spring growth or steady bi-weekly upkeep for low-water beds and courtyards, we tailor a straightforward visit routine to your property.',
    ],
    whoItIsFor:
      'Busy families, property managers, and homeowners who want their front and back yards consistently clean without spending every weekend on yard work.',
    afterCare:
      'Let us know anytime you add new plantings or want irrigation timers tuned as summer heat rises or winter rains arrive.',
    whatsIncluded: [
      'Lawn mowing, string trimming, and crisp concrete-edge trimming',
      'Hand weeding and tidy up of garden beds and gravel paths',
      'Light shrub shaping, deadheading, and sucker removal',
      'Spot check of visible sprinkler heads during visits',
      'Clean blow-off of driveways, walkways, and patios',
    ],
    typicalProjects: [
      'Weekly full-service residential lawn & garden care',
      'Bi-weekly drought-tolerant yard and shrub upkeep',
      'HOA common-area and small commercial frontage maintenance',
      'Seasonal fertilization and bed top-dressing add-ons',
    ],
    processSteps: [
      { title: 'Property Walkthrough', detail: 'We look at lawn area, shrubs, slopes, and gate access during your free estimate.' },
      { title: 'Schedule Fit', detail: 'We agree on weekly or bi-weekly visit cadence and what stays on your checklist.' },
      { title: 'Consistent Crew Visits', detail: 'Our crew trims, edges, clears beds, and hauls green clippings cleanly.' },
      { title: 'Seasonal Adjustments', detail: 'Mowing heights and pruning focus shift naturally with California seasons.' },
    ],
    faqs: [
      {
        q: 'Do I have to sign a long-term contract for maintenance?',
        a: 'No complicated lock-ins. We set a clear recurring schedule that works for your yard and keep earning your trust visit by visit.',
      },
      {
        q: 'Do you offer bi-weekly as well as weekly visits?',
        a: 'Yes. Lush active lawns generally look best with weekly visits in spring and summer, while low-water or artificial-turf yards often fit well on a bi-weekly plan.',
      },
      {
        q: 'Will you tell me if you spot a broken sprinkler?',
        a: 'Yes—keeping eyes on your yard means we flag leaking heads, dry patches, or pest signs early.',
      },
    ],
    heroImageKey: 'maintenance',
    relatedSlugs: ['cleanup', 'lawn-aeration', 'sod-and-mulch'],
  },
  {
    slug: 'cleanup',
    category: 'Lawn & Garden',
    title: 'Cleanup',
    shortTitle: 'Cleanup',
    shortBlurb: 'Overgrowth clearing, seasonal leaf removal, brush haul-off, and full yard resets.',
    longDescription: [
      'Whether a yard has slipped away over a busy year, you just bought a home in San Jose, or autumn leaves and winter weeds took over, a thorough one-time cleanup resets the whole property in a single visit or two.',
      'We cut back tangled brush and tall weeds, edge overgrown walkways, clear dead branches, pull out unwanted volunteers, and haul every load of green waste away so you have a clean slate.',
    ],
    whoItIsFor:
      'New homeowners, landlords between tenants, homes prepping for market or family gatherings, and yards overdue for a reset.',
    afterCare:
      'Following a deep cleanup with fresh bark mulch or a simple maintenance schedule keeps weeds from bouncing back quickly.',
    whatsIncluded: [
      'Tall weed mowing, string trimming, and root pulling in beds',
      'Overgrown shrub cutbacks and dead plant removal',
      'Leaf, palm frond, and fallen branch gathering',
      'Edging back turf that has crept over concrete walks',
      'Complete green-waste haul-off and final patio blow-down',
    ],
    typicalProjects: [
      'Pre-listing / open-house curb appeal cleanups',
      'Move-in overgrown backyard resets',
      'Spring weed clearing & fire-season brush reduction',
      'Autumn leaf clearing and gutter-line debris cleanup',
    ],
    processSteps: [
      { title: 'Walk & Scope', detail: 'We walk front, side, and back yards with you to mark what stays, what gets trimmed back, and what comes out.' },
      { title: 'Cut Back & Clear', detail: 'Weeds, brush, and dead growth are cut down and cleared from fence lines and beds.' },
      { title: 'Detail & Edge', detail: 'Shrubs are shaped, beds raked smooth, and walkways edged clean.' },
      { title: 'Haul-Off & Rinse/Blow', detail: 'All debris is loaded out so your property looks open and cared for.' },
    ],
    faqs: [
      {
        q: 'Can you clear a yard that has waist-high weeds and ivy?',
        a: 'Yes. Heavy overgrowth resets are one of our most requested services across Silicon Valley.',
      },
      {
        q: 'Can a cleanup be combined with fresh bark mulch or sod?',
        a: 'Definitely. Stripping weeds and laying fresh mulch right after a cleanup is the best way to keep beds neat afterward.',
      },
      {
        q: 'Do I need to be home during the cleanup?',
        a: 'Once we agree on scope at your free estimate and have gate access, you do not need to wait at home while our crew works.',
      },
    ],
    heroImageKey: 'beforeYard',
    relatedSlugs: ['maintenance', 'sod-and-mulch', 'tree-trimming-removal'],
  },
  {
    slug: 'lawn-aeration',
    category: 'Lawn & Garden',
    title: 'Lawn Aeration',
    shortTitle: 'Lawn Aeration',
    shortBlurb: 'Core aeration to break up compacted Bay Area clay soil and help grass roots breathe.',
    longDescription: [
      'Much of Santa Clara Valley sits on dense clay soil that packs down hard under foot traffic and summer watering. When soil compacts, water runs off instead of soaking in, roots stay shallow, and lawns thin out or develop stubborn dry spots.',
      'Mechanical core aeration pulls thousands of small soil plugs across the turf, opening direct channels for oxygen, water, and nutrients to reach the root zone—often paired with compost top-dressing or overseeding for thicker grass.',
    ],
    whoItIsFor:
      'Homeowners with hard, compacted lawns, water pooling or running off the grass, heavy thatch buildup, or thinning turf.',
    afterCare:
      'Leave the pulled soil plugs on the lawn—they break down naturally within a week or two after mowing and watering—and keep moisture steady if paired with overseed.',
    whatsIncluded: [
      'Flagging shallow sprinkler heads and valve boxes before aerating',
      'Double-pass mechanical core aeration across the lawn',
      'Optional compost top-dressing or tall fescue overseeding',
      'Spot clean of walks and patios after the pass',
      'Practical watering and mowing guidance afterward',
    ],
    typicalProjects: [
      'Spring and fall core aeration for family lawns',
      'Aeration + overseeding to thicken bare or patchy areas',
      'Clay-soil turf recovery after heavy summer heat',
      'Pre-fertilization root-zone opening',
    ],
    processSteps: [
      { title: 'Moisture & Turf Check', detail: 'Soil should be lightly moist—not bone dry or muddy—so tines pull deep clean plugs.' },
      { title: 'Head Flagging', detail: 'We mark pop-up sprinklers and shallow drip lines to keep every head safe.' },
      { title: 'Core Aeration Passes', detail: 'We aerate evenly across high-traffic and compacted areas in criss-cross passes.' },
      { title: 'Optional Top-Dress & Sweep', detail: 'Walkways are blown clean and we review simple post-aeration watering.' },
    ],
    faqs: [
      {
        q: 'How often should a San Jose lawn be aerated?',
        a: 'Once a year—typically in spring or early fall—keeps heavy valley clay soil open and responsive.',
      },
      {
        q: 'Should I water the lawn before aeration?',
        a: 'Yes, watering well a day or two beforehand softens the clay just enough for the aerator tines to pull deep cores.',
      },
      {
        q: 'Do you rake up the soil plugs afterward?',
        a: 'Usually it is better to leave them on the lawn so they break down and return microbes and topsoil back over the turf.',
      },
    ],
    heroImageKey: 'maintenance',
    relatedSlugs: ['sod-and-mulch', 'maintenance', 'irrigation-fences'],
  },
  {
    slug: 'artificial-lawn',
    category: 'Lawn & Garden',
    title: 'Artificial Lawn',
    shortTitle: 'Artificial Lawn',
    shortBlurb: 'Natural-looking synthetic turf built on compacted permeable base for year-round green.',
    longDescription: [
      'Modern synthetic turf looks far better than the flat carpets of the past. With multi-tone blade shades, soft thatch fibers, and a properly compacted crushed-rock drainage base, artificial lawn stays lush and mud-free through every California dry spell.',
      'The secret to an artificial lawn that never ripples, sinks, or smells for pets lies in base prep: excavating topsoil, capping unused sprinklers, installing weed barrier, compacting drainage aggregate smoothly, seaming tightly, and brushing in clean infill.',
    ],
    whoItIsFor:
      'Homeowners cutting outdoor water use, families with dogs and active kids, shaded yards where real grass fails, and low-upkeep front yards.',
    afterCare:
      'Blow off leaves occasionally, rinse pet zones with water as needed, and lightly cross-brush high-traffic paths to keep blades upright.',
    whatsIncluded: [
      'Existing grass excavation and irrigation capping or rerouting',
      'Compacted permeable decomposed granite / base rock sub-base',
      'Weed-barrier fabric and perimeter bender-board or nailer edging',
      'Invisible glued seams and perimeter stainless-steel securing',
      'Power-brushed silica or pet-friendly infill for blade support',
    ],
    typicalProjects: [
      'Drought-smart front yard grass conversions',
      'Mud-free backyard play & dog runs',
      'Putting greens and patio-adjacent turf strips',
      'Turf & paver geometric stepping-stone layouts',
    ],
    processSteps: [
      { title: 'Site Prep & Turf Samples', detail: 'We bring turf samples to your free estimate and map drainage and edging.' },
      { title: 'Excavation & Base Rock', detail: 'Topsoil is dug out, base aggregate is compacted flat, and sprinkler lines are capped cleanly.' },
      { title: 'Cut, Seam & Anchor', detail: 'Turf is unrolled in one grain direction, seamed invisibly, and anchored along edges.' },
      { title: 'Infill & Power Brush', detail: 'Infill is spread evenly and brushed deep so blades stand tall and natural.' },
    ],
    faqs: [
      {
        q: 'Does artificial lawn drain well during winter storms?',
        a: 'Yes, when installed over a compacted permeable rock base with perforated turf backing, rainwater drains straight through without puddling.',
      },
      {
        q: 'Is synthetic turf safe for dogs?',
        a: 'Yes. We use pet-friendly turf backings and antimicrobial or clean silica infill options that rinse easily with a garden hose.',
      },
      {
        q: 'Can you put artificial grass between paver stepping stones?',
        a: 'Yes—turf strips woven between large pavers or concrete pads are one of the sharpest modern Silicon Valley looks.',
      },
    ],
    heroImageKey: 'artificialLawn',
    relatedSlugs: ['pavers', 'sod-and-mulch', 'irrigation-fences'],
  },
];

export function getServiceBySlug(slug: string | undefined): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): ServiceItem[] {
  return SERVICES.filter(
    (s) => s.category === category || s.secondaryCategory === category
  );
}
