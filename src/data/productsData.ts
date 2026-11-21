import { ProductItem, ProductCategory } from '../types';

// Mutable config object: the admin backend updates `pdfUrl` at runtime after the
// catalog payload is fetched in main.tsx. Keep this as an object (not a string) so
// every consumer sees the current value through the live ES module binding.
export const CATALOGUE_CONFIG = {
  pdfUrl: '/assets/aistudio/CassetteX-Original-File_changes_1802_9cdfe06b.pdf',
};

export const CENTRONIC_IMAGES = {
  hero: '/images/WhatsApp Image 2026-09-22 at 1.14.00 PM.jpeg',
  centrifuge: '/images/WhatsApp Image 2026-09-22 at 1.12.40 PM.jpeg',
  histology: '/images/WhatsApp Image 2026-09-22 at 1.12.40 PM (1).jpeg',
  cassette102: '/images/WhatsApp Image 2026-09-22 at 1.12.40 PM (2).jpeg',
  cassette104: '/images/WhatsApp Image 2026-09-22 at 1.12.41 PM.jpeg',
  cassette106: '/images/WhatsApp Image 2026-09-22 at 1.12.41 PM (1).jpeg',
  cassette122: '/images/WhatsApp Image 2026-09-22 at 1.14.00 PM.jpeg',
  cassette104Biopsy: '/images/WhatsApp Image 2026-09-22 at 1.12.40 PM.jpeg',
  cassetteOr310: '/images/WhatsApp Image 2026-09-22 at 1.12.40 PM (1).jpeg',
  cassetteSsMoulds: '/images/WhatsApp Image 2026-09-22 at 1.12.41 PM.jpeg',
  cytology: '/images/WhatsApp Image 2026-09-22 at 1.12.40 PM (2).jpeg',
  cleanroom: '/images/WhatsApp Image 2026-09-22 at 1.14.00 PM.jpeg',
  qualityLab: '/images/WhatsApp Image 2026-09-22 at 1.12.41 PM (1).jpeg',
};

export const PRODUCTS: ProductItem[] = [
  // 01 - Centrifuges
  {
    id: 'centrifuge-benchtop-low-speed',
    name: 'Benchtop Low Speed Centrifuge',
    series: 'CMI-CLS Series',
    category: 'centrifuges',
    categoryLabel: 'Laboratory Centrifuges',
    shortDesc: 'Compact laboratory centrifugation solution for routine clinical and diagnostic applications.',
    fullDesc: 'Designed for daily routine laboratory workflows requiring smooth, stable, and quiet operation. Ideal for clinical chemistry, blood separation, and standard diagnostic protocols. Built with robust motor damping, digital timing control, and intuitive parameter programming.',
    features: [
      'Compact benchtop footprint optimizing limited lab counter space',
      'Smooth acceleration and deceleration profiles minimizing sample disruption',
      'Digital interface for timer and speed monitoring',
      'Electronic safety lid lock preventing opening during rotation',
      'Quiet, low-vibration brushless motor architecture'
    ],
    specs: [
      { label: 'Category', value: 'Benchtop Low Speed' },
      { label: 'Rotor Options', value: 'Swing-out & Angle Rotors available' },
      { label: 'Drive Mechanism', value: 'Maintenance-free Brushless Drive' },
      { label: 'Safety Interlocks', value: 'Automatic Lid Lock & Imbalance Detection' },
      { label: 'Status', value: 'Standard Production' }
    ],
    packaging: 'Individual heavy-duty laboratory crate with custom foam inserts',
    image: CENTRONIC_IMAGES.centrifuge,
    applications: ['Clinical Chemistry', 'Routine Urinalysis', 'Serum/Plasma Separation', 'Pathology Labs']
  },
  {
    id: 'centrifuge-benchtop-high-speed',
    name: 'Benchtop High Speed Centrifuge',
    series: 'CMI-CHS Series',
    category: 'centrifuges',
    categoryLabel: 'Laboratory Centrifuges',
    shortDesc: 'Designed for laboratory workflows requiring higher-speed centrifugation and precision pelleting.',
    fullDesc: 'Engineered for medical colleges, pathology centers, and molecular diagnostics facilities requiring rapid sedimentation, DNA/RNA extraction protocols, and high RCF performance within a space-saving benchtop envelope.',
    features: [
      'Precision speed regulation for repeatable pelleting',
      'High RCF capability for specialized clinical & research separations',
      'Dynamic airflow cooling design to mitigate sample temperature rise',
      'Reinforced stainless steel rotor chamber for enhanced safety',
      'Intuitive digital touch panel with memory presets'
    ],
    specs: [
      { label: 'Category', value: 'Benchtop High Speed' },
      { label: 'Chamber Material', value: 'Heavy-gauge Stainless Steel' },
      { label: 'Display', value: 'Microprocessor Digital Control' },
      { label: 'Braking System', value: 'Multi-stage Electronic Braking' },
      { label: 'Status', value: 'Standard Production' }
    ],
    packaging: 'Reinforced transit casing with shock-absorption buffers',
    image: CENTRONIC_IMAGES.centrifuge,
    applications: ['Molecular Diagnostics', 'Microbiology', 'Cell Pelleting', 'Research Institutes']
  },
  {
    id: 'centrifuge-floor-model',
    name: 'Floor Model Low / High Speed Centrifuge',
    series: 'CMI-FLS Series',
    category: 'centrifuges',
    categoryLabel: 'Laboratory Centrifuges',
    shortDesc: 'A heavy-duty floor-standing centrifugation solution for high-throughput diagnostic and hospital workflows.',
    fullDesc: 'Developed for high-volume hospitals, central diagnostic laboratories, and medical colleges. Features heavy castor wheels for ergonomic positioning, high batch capacity, and heavy-duty structural steel housing designed for continuous duty cycles.',
    features: [
      'Floor-standing ergonomic height with lockable industrial castors',
      'High sample throughput accommodating high-capacity rotors',
      'Advanced acoustic isolation reducing ambient laboratory noise',
      'Dual emergency lid release mechanism for safety and power contingencies',
      'Continuous duty-cycle rated industrial motor'
    ],
    specs: [
      { label: 'Category', value: 'Floor Standing Low/High Speed' },
      { label: 'Enclosure', value: 'Electrostatic Powder-Coated Steel' },
      { label: 'Mobility', value: 'Heavy-duty 360° Castors with Locking Brakes' },
      { label: 'Safety Class', value: 'Comprehensive Diagnostic Equipment Grade' },
      { label: 'Status', value: 'Standard Production' }
    ],
    packaging: 'Wooden export-grade pallet packaging',
    image: CENTRONIC_IMAGES.centrifuge,
    applications: ['High-Volume Diagnostic Centers', 'Hospital Central Labs', 'Blood Processing', 'Bio-Research']
  },
  {
    id: 'centrifuge-blood-bank',
    name: 'Blood Bank Centrifuge (Upcoming)',
    series: 'CMI-BBC Series',
    category: 'centrifuges',
    categoryLabel: 'Laboratory Centrifuges',
    shortDesc: 'An upcoming specialized addition to the Centronic Medical portfolio engineered specifically for blood component separation.',
    fullDesc: 'In active development at our Faridabad manufacturing plant. Tailored for certified blood transfusion centers, donor blood fractionation, and multi-bag component processing with ultra-smooth acceleration/braking curves to protect red blood cells and platelets.',
    features: [
      'Specially calibrated deceleration curves to protect delicate buffy coats',
      'Accommodates standard multi-bag blood collection systems',
      'Advanced thermal regulation maintaining strict temperature preservation',
      'Bio-containment sealed buckets and aerosol-tight rotor configurations'
    ],
    specs: [
      { label: 'Category', value: 'Specialized Blood Bank' },
      { label: 'Status', value: 'Upcoming / In Development' },
      { label: 'Intended Target', value: 'Blood Transfusion Centers & Hospital Blood Banks' },
      { label: 'Release Note', value: 'Detailed specifications to be announced upon formal catalogue release' }
    ],
    packaging: 'Export-grade bio-equipment crate',
    image: CENTRONIC_IMAGES.centrifuge,
    isUpcoming: true,
    applications: ['Blood Component Separation', 'PRP Fractionation', 'Transfusion Medicine']
  },

  // 02 - Cassettes, Biopsy, Consumables & Moulds
  {
    id: 'cassette-102',
    name: 'CASSETTEX-102 Tissue Embedding Cassette',
    series: 'CassetteX-102',
    category: 'cassettes',
    categoryLabel: 'Tissue Processing & Embedding Cassettes',
    shortDesc: 'Embedding cassette with 45° angle marking area, removable lid & stripe holes, histology, P.O.M. material, white.',
    fullDesc: 'One-piece & snap-latch design allows convenient one-hand operations, and helps relock the lid firmly during the processing. 100% resistant to chemical action of histological solvents. With rectangle holes in dimensions of 5.0 mm × 1.0 mm. With two large labelling areas on the cassette sides and one slanted front writing surface.',
    features: [
      'Embedding cassette with 45° angle marking area',
      'Removable lid with secure snap-latch design for one-hand operation',
      'Stripe rectangular flow holes in dimensions of 5.0 mm × 1.0 mm',
      '100% resistant to chemical action of histological solvents',
      'Two large labelling areas on the cassette sides and one slanted front writing surface',
      'Available in 6 distinct laboratory identification colors: White, Blue, Pink, Yellow, Green, Orange'
    ],
    specs: [
      { label: 'Product Name', value: 'CassetteX-102 Embedding Cassette' },
      { label: 'Marking Area', value: '45° Angle Slanted Front Writing Surface' },
      { label: 'Lid & Design', value: 'One-Piece Removable Snap-Latch Lid' },
      { label: 'Perforation Type', value: 'Stripe Rectangle Holes (5.0 mm × 1.0 mm)' },
      { label: 'Material', value: '100% Solvent-Resistant P.O.M. Polymer' },
      { label: 'Labelling Areas', value: 'Two Large Side Panels & Slanted Front' },
      { label: 'Packaging', value: '500 pcs/disp.bag | 5,000 pcs/carton' },
      { label: 'Color Options', value: 'White, Blue, Pink, Yellow, Green, Orange' }
    ],
    packaging: '500 pcs/disp.bag | 5,000 pcs/carton',
    image: CENTRONIC_IMAGES.cassette102,
    formats: ['500 pcs Dispenser Bag', '5,000 pcs Master Export Carton'],
    applications: ['Routine Histopathology', 'Surgical Specimen Embedding', 'Automated Tissue Processing']
  },
  {
    id: 'cassette-104',
    name: 'CASSETTEX-104 Tissue Embedding Cassette',
    series: 'CassetteX-104',
    category: 'cassettes',
    categoryLabel: 'Tissue Processing & Embedding Cassettes',
    shortDesc: 'Embedding cassette with 45° angle marking area, removable lid & fine square holes, biopsy, P.O.M. material.',
    fullDesc: 'One-piece & snap-latch design allows convenient one-hand operations, and helps relock the lid securely without danger of specimen loss. 100% resistant to chemical action of histological solvents. With square holes in dimensions of 0.9 mm × 0.9 mm with two large labelling areas on the cassette sides and an improved slanted front specially designed for the thermal transfer printing system.',
    features: [
      'Embedding cassette with 45° angle marking area',
      'Removable lid with one-piece snap-latch design',
      'Fine square holes in dimensions of 0.9 mm × 0.9 mm',
      '100% resistant to chemical action of histological solvents',
      'Two large labelling areas on cassette sides and improved slanted front for thermal transfer printers',
      'Available in White, Blue, Pink, Yellow, Green, Orange'
    ],
    specs: [
      { label: 'Product Name', value: 'CassetteX-104 Embedding Cassette' },
      { label: 'Marking Area', value: '45° Angle Slanted Front Writing Surface' },
      { label: 'Lid & Design', value: 'Removable Snap-Latch Lid' },
      { label: 'Perforation Type', value: 'Fine Square Holes (0.9 mm × 0.9 mm)' },
      { label: 'Material', value: '100% Solvent-Resistant P.O.M. Polymer' },
      { label: 'Printer Support', value: 'Optimized for Thermal Transfer Printers' },
      { label: 'Packaging', value: '500 pcs/disp.bag | 5,000 pcs/carton' },
      { label: 'Color Options', value: 'White, Blue, Pink, Yellow, Green, Orange' }
    ],
    packaging: '500 pcs/disp.bag | 5,000 pcs/carton',
    image: CENTRONIC_IMAGES.cassette104,
    formats: ['500 pcs Dispenser Bag', '5,000 pcs Master Export Carton'],
    applications: ['Biopsy Processing', 'Thermal Transfer Barcoding', 'Routine Histology']
  },
  {
    id: 'cassette-106',
    name: 'CASSETTEX-106 Tissue Embedding Cassette',
    series: 'CassetteX-106',
    category: 'cassettes',
    categoryLabel: 'Tissue Processing & Embedding Cassettes',
    shortDesc: 'Embedding cassette with 45° angle marking area, detachable lid & stripe holes, P.O.M. material, separately packed lid.',
    fullDesc: 'Two-piece design provides simple inserting and fixing to lock the lid into the cassette securely, allows more frequent opening & closing of the lid, and easy & safe removal and inserting of lid from and into the cassette without any danger of specimen loss. Cassette & lid separately packed.',
    features: [
      'Embedding cassette with 45° angle marking area',
      'Detachable lid with stripe holes, cassette & lid separately packed',
      'Two-piece design for simple inserting and secure locking',
      'Allows frequent opening & closing without specimen loss',
      '100% resistant to histological solvents',
      'Available in White, Blue, Pink, Yellow, Green, Orange'
    ],
    specs: [
      { label: 'Product Name', value: 'CassetteX-106 Embedding Cassette' },
      { label: 'Marking Area', value: '45° Angle Slanted Front Writing Surface' },
      { label: 'Lid Design', value: 'Detachable Lid (Separately Packed)' },
      { label: 'Perforation Type', value: 'Stripe Flow Holes' },
      { label: 'Material', value: '100% Solvent-Resistant P.O.M. Polymer' },
      { label: 'Packaging', value: '500 pcs/disp.bag | 5,000 pcs/carton' },
      { label: 'Color Options', value: 'White, Blue, Pink, Yellow, Green, Orange' }
    ],
    packaging: '500 pcs/disp.bag | 5,000 pcs/carton',
    image: CENTRONIC_IMAGES.cassette106,
    formats: ['500 pcs Dispenser Bag', '5,000 pcs Master Export Carton'],
    applications: ['Histology Processing', 'Multi-step Infiltration Protocols']
  },
  {
    id: 'cassette-122',
    name: 'CASSETTEX-122 Biopsy Embedding Cassette',
    series: 'CassetteX-122',
    category: 'biopsy',
    categoryLabel: 'Biopsy Cassettes',
    shortDesc: 'Embedding cassette with 45° angle marking area, removable lid, square holes & internal circular divider for needle biopsies.',
    fullDesc: 'Biopsy cassettes are designed with internal Ring for needle biopsies and small tissues. The pore in dim. 0.5 x 0.5 mm secures small tissues during processing. The internal ring with sloped walls creates a basket for small tissue management, preventing specimens getting stocking in a corner.',
    features: [
      'Embedding cassette with 45° angle marking area and removable lid',
      'Square holes with internal circular divider basket for needle biopsies & small tissues',
      'Fine pore size: 0.5 mm × 0.5 mm',
      'Internal ring with sloped walls prevents specimens from getting stuck in a corner',
      'P.O.M. material, 100% resistant to histological solvents',
      'Available in White, Blue, Pink, Yellow, Green, Orange'
    ],
    specs: [
      { label: 'Product Name', value: 'CassetteX-122 Biopsy Cassette' },
      { label: 'Marking Area', value: '45° Angle Slanted Front Writing Surface' },
      { label: 'Internal Structure', value: 'Circular Divider / Basket for Small Tissues' },
      { label: 'Pore Size', value: '0.5 mm × 0.5 mm Square Holes' },
      { label: 'Material', value: '100% Solvent-Resistant P.O.M.' },
      { label: 'Packaging', value: '500 pcs/disp.bag | 5,000 pcs/carton' },
      { label: 'Color Options', value: 'White, Blue, Pink, Yellow, Green, Orange' }
    ],
    packaging: '500 pcs/disp.bag | 5,000 pcs/carton',
    image: CENTRONIC_IMAGES.cassette122,
    formats: ['500 pcs Dispenser Bag', '5,000 pcs Master Export Carton'],
    applications: ['Needle Biopsies', 'Micro-tissue Specimen Management', 'Urology & Dermatology Biopsies']
  },
  {
    id: 'cassette-104-biopsy',
    name: 'CASSETTEX-104 Biopsy Version Cassette',
    series: 'CassetteX-104 Biopsy',
    category: 'biopsy',
    categoryLabel: 'Biopsy Cassettes',
    shortDesc: 'Biopsy embedding cassette with 45° angle marking area, removable lid & micro square holes 0.6 x 0.6 mm.',
    fullDesc: 'Biopsy cassettes are designed for small tissues and biopsy specimens processing. Their unique pore in dim. 0.6 x 0.6 mm secures small tissues during processing. The lateral vents allow maximum reagent exchange from all 4 sides, to guarantee less incidence of unfixed or under-processed tissues. The sloped wall design creates a basket for small tissue management, preventing them from getting stuck in a corner.',
    features: [
      'Embedding cassette with 45° angle marking area and removable lid',
      'Micro square holes in dimensions of 0.6 mm × 0.6 mm',
      'Lateral vents allow maximum reagent exchange from all 4 sides',
      'Sloped wall design creates a basket for small tissue management, preventing specimens getting stuck in a corner',
      'P.O.M. material, 100% resistant to histological solvents',
      'Available in White, Blue, Pink, Yellow, Green, Orange'
    ],
    specs: [
      { label: 'Product Name', value: 'CassetteX-104 Biopsy Cassette' },
      { label: 'Marking Area', value: '45° Angle Slanted Front Writing Surface' },
      { label: 'Pore Size', value: '0.6 mm × 0.6 mm Micro Square Holes' },
      { label: 'Fluid Exchange', value: 'Lateral Vents on All 4 Sides' },
      { label: 'Material', value: '100% Solvent-Resistant P.O.M.' },
      { label: 'Packaging', value: '500 pcs/disp.bag | 5,000 pcs/carton' },
      { label: 'Color Options', value: 'White, Blue, Pink, Yellow, Green, Orange' }
    ],
    packaging: '500 pcs/disp.bag | 5,000 pcs/carton',
    image: CENTRONIC_IMAGES.cassette104Biopsy,
    formats: ['500 pcs Dispenser Bag', '5,000 pcs Master Export Carton'],
    applications: ['Small Biopsy Specimen Processing', 'Multi-directional Reagent Exchange']
  },
  {
    id: 'cassette-or310',
    name: 'CASSETTEX-OR310 Disposable Embedding O-Rings',
    series: 'CassetteX-OR310',
    category: 'consumables',
    categoryLabel: 'Histology Consumables',
    shortDesc: 'Disposable embedding O-rings made of ABS material, white, designed for holding tissue samples in microtome chuck adapters.',
    fullDesc: 'Designed for holding the tissue sample in the microtome chuck adapter for sectioning and then identifies the sample while in storage. Molded from durable ABS material with corner diagonal supports.',
    features: [
      'Disposable embedding O-rings / base rings',
      'Molded from durable ABS material',
      'Designed for holding tissue samples securely in microtome chuck adapters during sectioning',
      'Aids in sample identification and organization during storage',
      'Available in White, Blue, Pink, Yellow, Green, Orange'
    ],
    specs: [
      { label: 'Product Name', value: 'CassetteX-OR310 Embedding O-Rings' },
      { label: 'Material', value: 'Durable ABS Polymer' },
      { label: 'Application', value: 'Microtome Chuck Adapter & Sample Storage' },
      { label: 'Packaging', value: '500 pcs/disp.bag | 5,000 pcs/carton' },
      { label: 'Color Options', value: 'White, Blue, Pink, Yellow, Green, Orange' }
    ],
    packaging: '500 pcs/disp.bag | 5,000 pcs/carton',
    image: CENTRONIC_IMAGES.cassetteOr310,
    formats: ['500 pcs Dispenser Bag', '5,000 pcs Master Export Carton'],
    applications: ['Microtome Sectioning', 'Chuck Adapter Mounting', 'Block Archiving']
  },
  {
    id: 'cassette-ss-moulds',
    name: 'CASSETTEX-SS Reusable Embedding Moulds',
    series: 'CassetteX-SS Moulds',
    category: 'moulds',
    categoryLabel: 'Embedding Moulds',
    shortDesc: 'Reusable stainless steel embedding moulds with fine polished surface and well-grounded corners. Multiple sizes available.',
    fullDesc: 'Product Description: With fine polished surface and well-grounded corners. External dimensions: 52 x 35 x 11 mm. Available in 5 net well dimension sizes (7x7, 15x15, 24x24, 37x24, 30x24 mm).',
    features: [
      'Reusable embedding moulds crafted from high-grade stainless steel',
      'Fine polished surface and well-grounded corners for easy block release',
      'Standard External Dimensions: 52 mm × 35 mm × 11 mm',
      'Available Net Well Dimensions (L × W): 7×7, 15×15, 24×24, 37×24, 30×24 mm',
      'Packaging: 10 pcs/pack, 200 pcs/inner box, 2,000 pcs/carton'
    ],
    specs: [
      { label: 'Product Name', value: 'CassetteX-SS Reusable Embedding Moulds' },
      { label: 'Material', value: 'High-Grade Polished Stainless Steel' },
      { label: 'External Dimensions', value: '52 × 35 × 11 mm' },
      { label: 'Net Well Sizes (L×W)', value: '7×7, 15×15, 24×24, 37×24, 30×24 mm' },
      { label: 'Surface Finish', value: 'Fine Polished with Well-Grounded Corners' },
      { label: 'Packaging', value: '10 pcs/pack | 200 pcs/inner box | 2,000 pcs/carton' }
    ],
    packaging: '10 pcs/pack | 200 pcs/inner box | 2,000 pcs/carton',
    image: CENTRONIC_IMAGES.cassetteSsMoulds,
    formats: ['100-pack box', '2,000-pcs carton'],
    applications: ['Paraffin Embedding Stations', 'Histology Block Casting']
  },

  // 04 - Microtome Blades
  {
    id: 'blade-high-profile',
    name: 'Histology Microtome Blades — High Profile',
    series: 'CMI-MB-HP',
    category: 'blades',
    categoryLabel: 'Histology Microtome Blades',
    shortDesc: 'High-profile disposable microtome blades engineered for harder, fibrous, and denser tissue specimens.',
    fullDesc: 'Crafted from refined high-carbon surgical stainless steel and treated with specialized PTFE/fluoropolymer anti-stick coating. Provides exceptional blade rigidity and chatter-free sectioning across dense uterine, fibrous, cartilage, and bone samples.',
    features: [
      'Refined razor-sharp edge angle for ribbons without compression',
      'Specialized PTFE edge coating preventing ribbon curling or adherence',
      'Enhanced blade height (high profile) offering superior bending resistance',
      'Dispenser box equipped with integrated used-blade safe disposal compartment',
      'Consistent edge geometry from blade 1 through blade 50'
    ],
    specs: [
      { label: 'Profile Type', value: 'High Profile (80 × 14 mm approx.)' },
      { label: 'Edge Angle', value: 'Optimized 35° Cutting Facet' },
      { label: 'Surface Coating', value: 'PTFE Polymer Tribological Coating' },
      { label: 'Target Specimens', value: 'Hard, Fibrous, Embedded Cartilage & Routine Tissues' }
    ],
    packaging: '50 blades per safety dispenser pack with integrated used blade collector',
    image: CENTRONIC_IMAGES.histology,
    applications: ['Rotary Microtomy', 'Cryostat Frozen Sectioning', 'Hard Tissue Histology']
  },
  {
    id: 'blade-low-profile',
    name: 'Histology Microtome Blades — Low Profile',
    series: 'CMI-MB-LP',
    category: 'blades',
    categoryLabel: 'Histology Microtome Blades',
    shortDesc: 'Low-profile disposable microtome blades for precision ultra-thin sectioning of soft and biopsy tissues.',
    fullDesc: 'Engineered for ultra-thin 2-4 micron sectioning of delicate biopsies, lymph nodes, and kidney tissues. Delivers silky ribbon formation with zero chatter marks and minimal tissue distortion.',
    features: [
      'Ultra-honed cutting facet ensuring pristine ribbons down to 2 microns',
      'Low profile design compatible with all modern microtome blade holders',
      'Friction-reducing fluororesin coating for smooth glide through paraffin',
      'Hygienic push-out dispenser box ensuring operator finger safety'
    ],
    specs: [
      { label: 'Profile Type', value: 'Low Profile (80 × 8 mm approx.)' },
      { label: 'Cutting Facet', value: 'Double Bevel Precision Ground Edge' },
      { label: 'Coating', value: 'Fluoropolymer Anti-Sticking Treatment' },
      { label: 'Target Specimens', value: 'Soft Tissues, Biopsy Samples, Lymph Nodes' }
    ],
    packaging: '50 blades per safety dispenser pack with waste disposal slider',
    image: CENTRONIC_IMAGES.histology,
    applications: ['Routine Microtomy', 'Biopsy Ribboning', 'Research Histopathology']
  },

  // 05 - Tissue Processing Materials
  {
    id: 'material-paraffin-wax',
    name: 'Tissue Embedding Paraffin Wax',
    series: 'CMI-PW-HISTO',
    category: 'processing-materials',
    categoryLabel: 'Tissue Processing Materials',
    shortDesc: 'Purified histological-grade paraffin wax with plastic polymers for optimal infiltration and smooth sectioning.',
    fullDesc: 'Formulated specifically for diagnostic histopathology laboratories. Centronic Medical paraffin wax features highly purified hydrocarbon waxes integrated with precision micro-polymers to deliver elasticity, uniform infiltration, and clean serial ribboning on rotary microtomes without crumbling.',
    features: [
      'Optimal melting point (56°C – 58°C) preventing tissue thermal damage',
      'Polymer-enriched formulation minimizing compression during microtome cutting',
      'Translucent solid block clarity for easy specimen visualization',
      'Rapid melting and solidification characteristics on embedding centers',
      'Free of DMSO, impurities, and particulates'
    ],
    specs: [
      { label: 'Melting Range', value: '56°C – 58°C (Custom formulations available)' },
      { label: 'Form', value: 'Free-flowing white pastilles / pellets' },
      { label: 'Composition', value: 'Ultra-pure paraffin wax with polymer additives' },
      { label: 'Odor', value: 'Odorless at working temperatures' }
    ],
    packaging: '1 kg sealed moisture-barrier bags | 10 kg / 20 kg bulk carton packs',
    image: CENTRONIC_IMAGES.histology,
    applications: ['Automated Tissue Processors', 'Manual Tissue Processing', 'Paraffin Embedding Consoles']
  },
  {
    id: 'material-oct-medium',
    name: 'Tissue Freezing Medium / OCT Compound',
    series: 'CMI-OCT-500',
    category: 'processing-materials',
    categoryLabel: 'Tissue Processing Materials',
    shortDesc: 'Optimal Cutting Temperature (OCT) compound for cryostat frozen sectioning and instant embedding.',
    fullDesc: 'A water-soluble blend of glycols and resins specifically created to provide a stable specimen matrix for rapid freezing in cryostats at temperatures of -10°C to -30°C. Leaves zero residue on the glass slide during staining protocols.',
    features: [
      'Rapid freezing matrix creating solid support without ice-crystal artifacts',
      'Water-soluble formulation washing cleanly away during routine staining',
      'Optimized viscosity at room temperature for easy dispensing without bubbles',
      'Convenient squeeze bottle with directional nozzle tip',
      'Maintains elasticity at typical cryostat temperatures (-20°C)'
    ],
    specs: [
      { label: 'Composition', value: 'Water-Soluble Polyethylene Glycol & Polyvinyl Alcohol Matrix' },
      { label: 'Freezing Range', value: '-10°C to -30°C' },
      { label: 'Staining Interaction', value: 'Leaves no background residue or autofluorescence' },
      { label: 'Container', value: 'Ergonomic squeeze bottle with applicator nozzle' }
    ],
    packaging: '118 ml (4 oz) squeeze bottle | Multi-pack of 4 or 12 bottles',
    image: CENTRONIC_IMAGES.histology,
    applications: ['Intraoperative Frozen Sections', 'Cryostat Microtomy', 'Immunofluorescence Research']
  },

  // 06 - Cytology Solutions
  {
    id: 'cytology-gynaecological',
    name: 'Gynaecological Cytology Preservation Solution',
    series: 'CMI-CYTO-GYN',
    category: 'cytology',
    categoryLabel: 'Cytology Solutions',
    shortDesc: 'Formulated for cervical cytology screening, preserving cellular morphology for Pap smear and LBC workflows.',
    fullDesc: 'Specially developed liquid preservative buffer designed to maintain the integrity of cervical and vaginal epithelial cells. Lyces non-diagnostic red blood cells and mucus while maintaining intact nuclear detail and cellular architecture for liquid-based cytology and HPV co-testing.',
    features: [
      'Superior cellular preservation maintaining clear nuclear detail for Pap stain',
      'Effective mucolysis and red blood cell lysis providing cleaner diagnostic fields',
      'Compatible with automated thin-layer cytology preparation systems',
      'Extended shelf life and ambient temperature sample stability',
      'Standardized screw-cap leak-proof collection vials'
    ],
    specs: [
      { label: 'Volume', value: '20 ml prefilled collection vial' },
      { label: 'Target Specimen', value: 'Cervical / Endocervical exfoliated cells' },
      { label: 'Sample Stability', value: 'Up to 30 days at ambient temperature (15–30°C)' },
      { label: 'Preservation Chemistry', value: 'Buffered alcohol-based cell preservative' }
    ],
    packaging: 'Box of 50 or 100 prefilled preservative vials (with optional cervical broom brushes)',
    image: CENTRONIC_IMAGES.cytology,
    applications: ['Cervical Cancer Screening', 'Liquid Based Cytology (LBC)', 'Pap Smear Analysis']
  },
  {
    id: 'cytology-non-gynaecological',
    name: 'Non-Gynaecological Cytology Solution',
    series: 'CMI-CYTO-NGYN',
    category: 'cytology',
    categoryLabel: 'Cytology Solutions',
    shortDesc: 'Designed for non-gyn cytology including fine needle aspirates (FNA), sputum, urine, and body fluids.',
    fullDesc: 'Engineered for optimal cell preservation across diverse non-gynaecological diagnostic specimens. Stabilizes cells in effusion fluids, pleural aspirates, cyst fluids, synovial fluids, and FNAs without cellular distortion or air-drying artifacts.',
    features: [
      'Multi-fluid versatility (FNA, urine, sputum, effusion, bronchial washings)',
      'Prevents cell autolysis and bacterial contamination during transit',
      'Maintains cellular integrity for immunocytochemistry and special stains',
      'Convenient ready-to-use formulation minimizing laboratory preparation time'
    ],
    specs: [
      { label: 'Specimen Types', value: 'FNA Aspirates, Urine, Sputum, Body Fluids, Pleural Effusions' },
      { label: 'Solution Format', value: 'Ready-to-use buffered cell stabilizing medium' },
      { label: 'Temperature Tolerance', value: 'Stable at room temperature transit' }
    ],
    packaging: 'Available in 30 ml, 50 ml, and 1000 ml laboratory bottles',
    image: CENTRONIC_IMAGES.cytology,
    applications: ['Fine Needle Aspiration (FNA)', 'Fluid Cytology', 'Urine Cytopathology', 'Cytocentrifuge Preparations']
  },
  {
    id: 'cytology-lbc-kits',
    name: 'Liquid Based Cytology (LBC) Collection Kits',
    series: 'CMI-LBC-KIT',
    category: 'cytology',
    categoryLabel: 'Cytology Solutions',
    shortDesc: 'Comprehensive Liquid Based Cytology (LBC) collection kits including preservative vials and collection brushes.',
    fullDesc: 'Complete all-in-one diagnostic collection kit for healthcare providers, gynecologists, and screening camps. Each kit includes a prefilled cytology preservation vial, detachable cervical broom sampler brush, and specimen transport biohazard pouch with barcoding.',
    features: [
      'All-in-one collection system ensuring standardized sampling technique',
      'Detachable brush head drops directly into the preservative vial',
      'Leak-proof threaded cap with tamper-evident seal indicator',
      'High diagnostic sensitivity yielding monolayer thin-prep smear quality'
    ],
    specs: [
      { label: 'Kit Components', value: 'Preservative Vial + Cervical Broom Collector + Specimen Bag' },
      { label: 'Vial Volume', value: '20 ml Buffered Preservative' },
      { label: 'Compliance', value: 'Diagnostic Sampling Standards' }
    ],
    packaging: 'Kit of 50 individual test packs per dispenser carton',
    image: CENTRONIC_IMAGES.cytology,
    applications: ['Mass Health Screening Camps', 'Hospital Gynaecology OPDs', 'Diagnostic Pathology Networks']
  }
];

export const CATEGORY_INFO: Record<ProductCategory, { title: string; count: number; description: string }> = {
  centrifuges: {
    title: 'Laboratory Centrifuges',
    count: 4,
    description: 'Reliable centrifugation solutions designed for modern clinical, blood bank, and research workflows.'
  },
  cassettes: {
    title: 'Tissue Processing & Embedding Cassettes',
    count: 3,
    description: 'Precision-molded P.O.M. cassettes featuring CassetteX-102, 104, and 106 designs.'
  },
  biopsy: {
    title: 'Biopsy Cassettes',
    count: 2,
    description: 'Specialized biopsy cassettes with 0.5mm and 0.6mm micropores and internal retention baskets.'
  },
  moulds: {
    title: 'Stainless Steel Embedding Moulds',
    count: 5,
    description: 'High-polish surgical stainless steel moulds in 7×7, 15×15, 24×24, 30×24, and 37×24 mm sizes.'
  },
  consumables: {
    title: 'Histology Consumables',
    count: 1,
    description: 'Disposable embedding O-rings and microtome accessories.'
  },
  blades: {
    title: 'Histology Microtome Blades',
    count: 2,
    description: 'High-profile and low-profile PTFE coated microtome blades for vibration-free microtomy.'
  },
  'processing-materials': {
    title: 'Tissue Processing Materials',
    count: 2,
    description: 'Histological grade embedding paraffin wax pastilles and cryostat OCT freezing medium.'
  },
  cytology: {
    title: 'Cytology Solutions',
    count: 3,
    description: 'Gynaecological, non-gynaecological solutions and all-in-one Liquid Based Cytology (LBC) kits.'
  }
};
