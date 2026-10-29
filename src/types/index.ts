export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  category: string;
  isPublished: boolean;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  completedAt?: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type BusinessProfile = {
  businessName: string;
  phone: string;
  whatsappPhone: string;
  address: string;
  googleBusinessUrl: string;
  experienceYears: number;
};
