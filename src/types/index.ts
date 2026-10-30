export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  coverImage: string | null;
  imageAlt: string;
  imageCredit: string;
  imageSourceUrl: string;
  imageLicenseUrl: string;
  imageLicenseLabel: string;
  category: string;
  isPublished: boolean;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  coverImage: string | null;
  completedAt?: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type BusinessProfile = {
  businessName: string;
  phone: string;
  secondaryPhone: string;
  whatsappPhone: string;
  email: string;
  address: string;
  googleBusinessUrl: string;
  directionsUrl: string;
  serviceArea: string;
  ownerName: string;
  coOwnerName: string;
  experienceYears: number;
};
