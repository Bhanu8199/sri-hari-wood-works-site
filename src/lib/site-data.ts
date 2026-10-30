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

export const featuredProjects: Project[] = [];

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
