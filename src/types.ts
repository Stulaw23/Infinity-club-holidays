export type DestinationCategory = 'all' | 'local' | 'international' | 'island' | 'cruise' | 'adventure';

export interface HolidayPackage {
  id: string;
  title: string;
  subtitle: string;
  category: DestinationCategory;
  destination: string;
  duration: string;
  priceZAR: number;
  priceNote?: string;
  badge?: string;
  imageUrl: string;
  featured?: boolean;
  description: string;
  inclusions: string[];
  exclusions?: string[];
  itinerarySummary?: string[];
  idealFor: string;
}

export interface TravelService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  popularFor: string;
}

export interface DestinationSpotlight {
  id: string;
  name: string;
  region: string;
  category: 'local' | 'international';
  imageUrl: string;
  tagline: string;
  bestTimeToVisit: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  tripType: string;
  destination: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
  verified?: boolean;
}

export interface QuoteRequest {
  fullName: string;
  phone: string;
  email: string;
  preferredContact: 'whatsapp' | 'call' | 'email';
  destinationType: 'local-sa' | 'island' | 'international' | 'cruise' | 'ski' | 'unsure';
  destinationDetail: string;
  departureCity: string;
  travelDates: string;
  flexibleDates: boolean;
  durationNights: string;
  adults: number;
  children: number;
  childrenAges?: string;
  budgetPerPerson: string;
  tripStyle: string[];
  additionalNotes: string;
  selectedPackageTitle?: string;
}
