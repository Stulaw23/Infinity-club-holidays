export type DestinationCategory =
  | 'all'
  | 'egypt'
  | 'contiki'
  | 'costsaver'
  | 'trafalgar'
  | 'insight'
  | 'local'
  | 'international'
  | 'island'
  | 'cruise'
  | 'adventure';

export interface HolidayPackage {
  id: string;
  title: string;
  subtitle: string;
  category: DestinationCategory;
  operator?: 'Contiki' | 'Costsaver' | 'Trafalgar' | 'Insight Vacations' | 'Norwegian Cruise Line' | string;
  brand?: 'contiki' | 'costsaver' | 'trafalgar' | 'insight' | 'ncl' | string;
  destination: string;
  duration: string;
  priceZAR: number;
  priceUSD?: number;
  currency?: string;
  priceDisplay?: string;
  priceNote?: string;
  callToAction?: string;
  badge?: string;
  imageUrl: string;
  photoUrl?: string;
  galleryImages?: string[];
  hotelStars?: number;
  resortName?: string;
  mealUpgradeOption?: string;
  userJpg?: string;
  featured?: boolean;
  description: string;
  inclusions: string[];
  terms?: string;
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

export interface ReviewData {
  id: string;
  fullName: string;
  holidayType: string;
  destination: string;
  rating: number;
  feedback: string;
  date: string;
  createdAt?: any;
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

export type ReplayEventType = 
  | 'click' 
  | 'rage_click' 
  | 'scroll' 
  | 'input' 
  | 'navigation' 
  | 'modal_open' 
  | 'modal_close' 
  | 'error' 
  | 'console_error';

export interface ReplayEvent {
  id: string;
  timestamp: number; // ms since session start
  type: ReplayEventType;
  target?: {
    tag: string;
    id?: string;
    className?: string;
    text?: string;
    role?: string;
    selector?: string;
  };
  coords?: { x: number; y: number };
  viewport?: { width: number; height: number };
  scrollPos?: { x: number; y: number };
  data?: Record<string, any>;
  message?: string;
}

export interface TrackedError {
  id: string;
  timestamp: number;
  errorCode: string; // e.g. ERR_RUNTIME_EX, ERR_PROMISE_REJ, ERR_DOM_UNRESPONSIVE
  errorClassification: 'CRITICAL_SCRIPT_EXCEPTION' | 'UNHANDLED_ASYNC_REJECTION' | 'CONSOLE_LOGGED_ERROR' | 'NETWORK_DISRUPTION' | 'IMAGE_LOAD_FAILURE';
  message: string;
  source?: string;
  lineno?: number;
  colno?: number;
  stack?: string;
  type: 'runtime' | 'unhandled_rejection' | 'console_error' | 'network';
  associatedReplayEventsCount: number;
  sessionSnapshotId?: string;
}

export interface RageClickIncident {
  id: string;
  timestamp: number;
  errorCode: string; // e.g. ERR_RC_850
  clickCount: number;
  timeWindowMs: number;
  coords: { x: number; y: number };
  targetTag: string;
  targetText?: string;
  targetSelector?: string;
  flaggedAsUXFailure: boolean;
}

export interface DeveloperDossier {
  ticketId: string;
  timestamp: string;
  stealthCode: string; // Compact harmless-looking code visible to client, e.g. "ICH-E850-R4"
  primaryErrorCode: string;
  allErrorCodes: string[];
  travelerName?: string;
  travelerContact?: string;
  travelerComplaint: string;
  developerRecipient: string; // stuartlawrence176@gmail.com
  systemDiagnostics: {
    device: string;
    viewport: string;
    online: boolean;
    sessionDurationSec: number;
    language: string;
  };
  rageClickCount: number;
  rageClickTargets: string[];
  errors: Array<{
    code: string;
    type: string;
    message: string;
    source?: string;
    stack?: string;
  }>;
  replayBreadcrumbs: Array<{
    timeSec: number;
    action: string;
    target?: string;
  }>;
}

export interface BugReport {
  id: string;
  createdAt: string;
  stealthCode: string; // Safe code for client/Cathy, e.g. "ICH-E850-40"
  primaryErrorCode: string;
  allErrorCodes: string[];
  userEmail?: string;
  userName?: string;
  description: string;
  issueCategory: 'broken_button' | 'form_error' | 'display_bug' | 'slow_performance' | 'other';
  deviceInfo: {
    userAgent: string;
    viewport: { width: number; height: number };
    platform: string;
    language: string;
    online: boolean;
  };
  sessionDurationSec: number;
  rageClicks: RageClickIncident[];
  errors: TrackedError[];
  events: ReplayEvent[];
  status: 'open' | 'investigating' | 'resolved';
}

