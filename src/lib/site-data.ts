import type { BusinessProfile, FAQ, Project, Service } from '@/types';

export const businessProfile: BusinessProfile = {
  businessName: 'SRI HARI WOOD WORKS',
  phone: '+919347978199',
  secondaryPhone: '+919948519979',
  whatsappPhone: '919347978199',
  email: 'mbhanuvardhan630@gmail.com',
  address: 'Somavarappadu, Eluru, Andhra Pradesh 534450',
  googleBusinessUrl: 'https://share.google/nuxOcu96HdkfuPgMk',
  directionsUrl: 'https://www.google.com/maps/place/SRI+HARI+WOOD+WORKS/@16.75036,81.1116351,17z/data=!3m1!4b1!4m6!3m5!1s0x3a366bb71e153ef3:0xd3496e0b2fd37b8c!8m2!3d16.75036!4d81.11421!16s%2Fg%2F11s84khd_3?entry=ttu&g_ep=EgoyMDI2MTAyNy4wIKXMDSoASAFQAw%3D%3D',
  serviceArea: 'Andhra Pradesh and Telangana',
  ownerName: 'SRI HARI MEDAPALLI',
  coOwnerName: 'BHANU VARDHAN MEDAPALLI',
  experienceYears: 37
};

export const businessHours = [
  { day: 'Monday', hours: '9:30 AM – 6:30 PM' },
  { day: 'Tuesday', hours: '9:30 AM – 6:30 PM' },
  { day: 'Wednesday', hours: '9:30 AM – 6:30 PM' },
  { day: 'Thursday', hours: '9:30 AM – 6:30 PM' },
  { day: 'Friday', hours: '9:30 AM – 6:30 PM' },
  { day: 'Saturday', hours: '9:30 AM – 6:30 PM' },
  { day: 'Sunday', hours: 'Closed' }
];

export const featuredServices: Service[] = [
  {
    slug: 'wardrobes-cupboards',
    title: 'WARDROBES & CUPBOARDS',
    category: 'Storage',
    shortDescription: 'Custom-designed wardrobes and cupboards tailored to your space, storage needs, and preferred finish.',
    description: 'Custom-designed wardrobes and cupboards tailored to your space, storage needs, and preferred finish.',
    coverImage: '/images/wardrobes-cupboards.png',
    imageAlt: 'Warm wooden built-in wardrobes and custom media cabinetry in a contemporary living room.',
    imageCredit: 'Photo supplied by SRI HARI WOOD WORKS',
    imageSourceUrl: '',
    imageLicenseUrl: '',
    imageLicenseLabel: 'Business photo',
    isPublished: true
  },
  {
    slug: 'doors-windows',
    title: 'DOORS & WINDOWS',
    category: 'Doors and windows',
    shortDescription: 'Wooden doors and window woodwork designed to suit your home and project requirements.',
    description: 'Wooden doors and window woodwork designed to suit your home and project requirements.',
    coverImage: '/images/doors-windows.png',
    imageAlt: 'Ornately carved wooden door with decorative floral panels.',
    imageCredit: 'Photo supplied by SRI HARI WOOD WORKS',
    imageSourceUrl: '',
    imageLicenseUrl: '',
    imageLicenseLabel: 'Business photo',
    isPublished: true
  },
  {
    slug: 'modular-kitchens',
    title: 'MODULAR KITCHENS',
    category: 'Kitchens',
    shortDescription: 'Kitchen woodwork planned around your available space, storage needs, and preferred design.',
    description: 'Kitchen woodwork planned around your available space, storage needs, and preferred design.',
    coverImage: '/images/modular-kitchens.png',
    imageAlt: 'Corner modular kitchen with blue and white cabinets, dark countertop, sink, and cooktop.',
    imageCredit: 'Photo supplied by SRI HARI WOOD WORKS',
    imageSourceUrl: '',
    imageLicenseUrl: '',
    imageLicenseLabel: 'Business photo',
    isPublished: true
  },
  {
    slug: 'cots-furniture',
    title: 'COTS & FURNITURE',
    category: 'Furniture',
    shortDescription: 'Custom wooden cots and furniture created to match your preferred size, design, and requirements.',
    description: 'Custom wooden cots and furniture created to match your preferred size, design, and requirements.',
    coverImage: '/images/cots-furniture.png',
    imageAlt: 'Ornately carved wooden cot with a polished finish and decorative headboard.',
    imageCredit: 'Photo supplied by SRI HARI WOOD WORKS',
    imageSourceUrl: '',
    imageLicenseUrl: '',
    imageLicenseLabel: 'Business photo',
    isPublished: true
  },
  {
    slug: 'customized-wood-works',
    title: 'CUSTOMIZED WOOD WORKS',
    category: 'Custom woodwork',
    shortDescription: 'Personalized woodworking solutions designed around your ideas, measurements, and project needs.',
    description: 'Personalized woodworking solutions designed around your ideas, measurements, and project needs.',
    coverImage: '/images/customized-wood-works.png',
    imageAlt: 'Handcrafted dark wood chair with a carved backrest and curved arms.',
    imageCredit: 'Photo supplied by SRI HARI WOOD WORKS',
    imageSourceUrl: '',
    imageLicenseUrl: '',
    imageLicenseLabel: 'Business photo',
    isPublished: true
  }
];

export const featuredProjects: Project[] = [
  {
    slug: 'timber-double-doors',
    title: 'Timber Double Doors',
    category: 'Doors & Windows',
    description: 'A warm wood-framed double door with mesh panels and detailed lower panels.',
    coverImage: '/images/timber-double-doors.webp',
    coverImageWidth: 768,
    coverImageHeight: 1711
  },
  {
    slug: 'corner-modular-kitchen',
    title: 'Corner Modular Kitchen',
    category: 'Kitchens',
    description: 'Corner kitchen cabinetry with contrasting brown and cream doors and wood trim.',
    coverImage: '/images/corner-modular-kitchen.webp',
    coverImageWidth: 768,
    coverImageHeight: 1711
  },
  {
    slug: 'custom-kitchen-storage',
    title: 'Custom Kitchen Storage',
    category: 'Kitchens',
    description: 'Custom kitchen cabinets with mixed finishes and dedicated storage.',
    coverImage: '/images/custom-kitchen-storage.webp',
    coverImageWidth: 1705,
    coverImageHeight: 768
  },
  {
    slug: 'full-wall-kitchen-cabinets',
    title: 'Full-Wall Kitchen Cabinets',
    category: 'Kitchens',
    description: 'Full-width upper cabinets paired with dark framed windows and practical storage.',
    coverImage: '/images/full-wall-kitchen-cabinets.webp',
    coverImageWidth: 2173,
    coverImageHeight: 724
  },
  {
    slug: 'wardrobe-and-entry-doors',
    title: 'Wardrobe and Entry Doors',
    category: 'Wardrobes & Doors',
    description: 'Built-in wardrobe storage alongside a matching dark wood entry door.',
    coverImage: '/images/wardrobe-and-entry-doors.webp',
    coverImageWidth: 1708,
    coverImageHeight: 768
  },
  {
    slug: 'living-room-tv-unit',
    title: 'Living Room TV Unit',
    category: 'Custom Woodwork',
    description: 'A custom TV wall unit with warm wood accents, display shelving, and concealed storage.',
    coverImage: '/images/living-room-tv-unit.webp',
    coverImageWidth: 768,
    coverImageHeight: 840
  },
  {
    slug: 'timber-entry-door',
    title: 'Timber Entry Door',
    category: 'Doors & Windows',
    description: 'A handcrafted timber entrance with coordinating framed side panels.',
    coverImage: '/images/timber-entry-door.webp',
    coverImageWidth: 768,
    coverImageHeight: 1032
  },
  {
    slug: 'wooden-side-table',
    title: 'Wooden Side Table',
    category: 'Furniture',
    description: 'A solid wood side table featuring turned legs and detailed traditional trim.',
    coverImage: '/images/wooden-side-table.webp',
    coverImageWidth: 768,
    coverImageHeight: 890
  },
  {
    slug: 'wooden-cot',
    title: 'Wooden Cot',
    category: 'Cots & Furniture',
    description: 'A durable wooden cot with a polished finish and decorative detailing.',
    coverImage: '/images/wooden-cot.webp',
    coverImageWidth: 1026,
    coverImageHeight: 768
  },
  {
    slug: 'carved-wooden-bench',
    title: 'Carved Wooden Bench',
    category: 'Furniture',
    description: 'A polished wooden bench with carved accents and sturdy traditional construction.',
    coverImage: '/images/carved-wooden-bench.webp',
    coverImageWidth: 1152,
    coverImageHeight: 768
  },
  {
    slug: 'dining-table-set',
    title: 'Dining Table Set',
    category: 'Furniture',
    description: 'A custom wooden dining table paired with coordinating chairs in a natural finish.',
    coverImage: '/images/dining-table-set.webp',
    coverImageWidth: 1774,
    coverImageHeight: 887
  },
  {
    slug: 'dining-table-with-bench',
    title: 'Dining Table with Bench',
    category: 'Furniture',
    description: 'A wooden dining table set with matching chairs and a long dining bench.',
    coverImage: '/images/dining-table-with-bench.webp',
    coverImageWidth: 1774,
    coverImageHeight: 887
  },
  {
    slug: 'bathroom-storage-cabinet',
    title: 'Bathroom Storage Cabinet',
    category: 'Custom Woodwork',
    description: 'Dark wood cabinetry fitted around a window to provide practical bathroom storage.',
    coverImage: '/images/bathroom-storage-cabinet.webp',
    coverImageWidth: 1793,
    coverImageHeight: 877
  },
  {
    slug: 'entertainment-wall-unit',
    title: 'Entertainment Wall Unit',
    category: 'Custom Woodwork',
    description: 'A custom entertainment unit combining display shelves, a media console, and storage.',
    coverImage: '/images/entertainment-wall-unit.webp',
    coverImageWidth: 1424,
    coverImageHeight: 1104
  },
  {
    slug: 'wooden-lounge-chairs',
    title: 'Wooden Lounge Chairs',
    category: 'Furniture',
    description: 'A pair of polished wooden lounge chairs with shaped arms and slatted seats.',
    coverImage: '/images/wooden-lounge-chairs.webp',
    coverImageWidth: 1620,
    coverImageHeight: 971
  },
  {
    slug: 'ornate-wooden-cot',
    title: 'Ornate Wooden Cot',
    category: 'Cots & Furniture',
    description: 'A traditional wooden cot featuring detailed carved panels and turned posts.',
    coverImage: '/images/ornate-wooden-cot.webp',
    coverImageWidth: 1774,
    coverImageHeight: 887
  },
  {
    slug: 'carved-double-entry-door',
    title: 'Carved Double Entry Door',
    category: 'Doors & Windows',
    description: 'A handcrafted double entry door with decorative glass side panels and carved woodwork.',
    coverImage: '/images/carved-double-entry-door.webp',
    coverImageWidth: 768,
    coverImageHeight: 840
  },
  {
    slug: 'wooden-living-room-sideboard',
    title: 'Wooden Living Room Sideboard',
    category: 'Furniture',
    description: 'A custom wooden sideboard with a stone feature wall and detailed cabinet doors.',
    coverImage: '/images/wooden-living-room-sideboard.webp',
    coverImageWidth: 1203,
    coverImageHeight: 768
  },
  {
    slug: 'vented-wood-storage-cabinet',
    title: 'Vented Wood Storage Cabinet',
    category: 'Custom Woodwork',
    description: 'A long wooden storage cabinet with paneled doors and built-in ventilation grilles.',
    coverImage: '/images/vented-wood-storage-cabinet.webp',
    coverImageWidth: 1708,
    coverImageHeight: 768
  },
  {
    slug: 'wall-mounted-kitchen-cabinets',
    title: 'Wall-Mounted Kitchen Cabinets',
    category: 'Kitchens',
    description: 'Full-width wall-mounted kitchen cabinets with matching wood trim and paneled doors.',
    coverImage: '/images/wall-mounted-kitchen-cabinets.webp',
    coverImageWidth: 1708,
    coverImageHeight: 768
  },
  {
    slug: 'wooden-modular-kitchen',
    title: 'Wooden Modular Kitchen',
    category: 'Kitchens',
    description: 'A modular corner kitchen with polished wooden cabinetry, dark counters, and integrated storage.',
    coverImage: '/images/wooden-modular-kitchen.webp',
    coverImageWidth: 1708,
    coverImageHeight: 768
  }
];

export const faqs: FAQ[] = [
  {
    question: 'What woodworking services do you offer?',
    answer: 'We offer wardrobes and cupboards, doors and windows, modular kitchens, cots and furniture, and customized wood works. The project scope is discussed before an estimate.'
  },
  {
    question: 'How are estimates and travel handled?',
    answer: 'Project feasibility, estimate arrangements, and any travel charges are discussed with you based on your project location before work is confirmed.'
  },
  {
    question: 'Do you provide site visits?',
    answer: 'A site visit may be needed to review measurements, materials, and project requirements. Availability and any travel charges are discussed during the estimate process.'
  },
  {
    question: 'What areas do you serve?',
    answer: 'Serving customers across Andhra Pradesh and Telangana. Project feasibility and any travel charges are discussed during the estimate process.'
  },
  {
    question: 'What are your business hours?',
    answer: 'Monday through Saturday, 9:30 AM to 6:30 PM. We are closed on Sundays and applicable festival holidays.'
  }
];

export const reviews = [];

export const whatsappUrl = (message?: string, phone = businessProfile.whatsappPhone) =>
  `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

export function formatPhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, '');
  const isIndianNumber = digits.length === 12 && digits.startsWith('91');
  const localNumber = isIndianNumber ? digits.slice(2) : digits;
  if (localNumber.length !== 10) {
    return phone;
  }
  return `${isIndianNumber ? '+91 ' : ''}${localNumber.slice(0, 5)} ${localNumber.slice(5)}`;
}
