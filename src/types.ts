export interface CleaningService {
  id: string;
  title: string;
  description: string;
  icon: string;
  basePrice: number; // base price in EGP
  priceMultipliers: {
    room: number;
    bathroom: number;
    sqm: number;
  };
  details: string[];
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatarLetter: string;
}

export interface Region {
  id: string;
  name: string;
  arabicName: string;
  available: boolean;
}

export interface BookingSubmission {
  serviceId: string;
  size: number; // in sqm
  bedrooms: number;
  bathrooms: number;
  addOns: string[]; // ids of addOns
  frequency: "once" | "weekly" | "monthly";
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  region: string;
  totalEstimate: number;
}
