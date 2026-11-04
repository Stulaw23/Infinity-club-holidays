import { HolidayPackage, TravelService, DestinationSpotlight, Testimonial } from '../types';

export const BUSINESS_INFO = {
  name: "Infinity Club Holidays",
  tagline: "Endless Travel Possibilities",
  subTagline: "For all your leisure and corporate business needs",
  agentName: "Cathy Lawrence",
  agentRole: "Travel Agent & Founder",
  experienceYears: 21,
  phone: "0845626444",
  phoneTel: "+27845626444",
  phoneFormatted: "+27 84 562 6444",
  whatsappNumber: "27845626444",
  email: "Infinityholidays1@gmail.com",
  address: {
    street: "25 Edison street",
    suburb: "Longlands",
    city: "Strand",
    postalCode: "7140",
    province: "Western Cape",
    country: "South Africa"
  },
  openingHours: {
    weekdays: "Monday - Friday: 08:00 - 18:00",
    saturday: "Saturday: 09:00 - 12:00",
    sunday: "Sundays & Public Holidays: Closed"
  },
  social: {
    facebook: "https://www.facebook.com/share/1BeAB4CRPn/",
    instagram: "https://www.instagram.com/infinityclubholidays/"
  }
};

import travelSpecialsRaw from './travelSpecials.json';

export const PACKAGES_DATA: HolidayPackage[] = (travelSpecialsRaw as any[]).map((pkg) => ({
  ...pkg,
  priceZAR: pkg.currency === 'USD' ? 0 : (pkg.price ?? pkg.priceZAR ?? 0),
  priceUSD: pkg.currency === 'USD' ? (pkg.price || 1218) : undefined,
  priceDisplay: pkg.priceDisplay || (pkg.price ? `From R${Number(pkg.price).toLocaleString()} pp` : 'Enquire for Price'),
}));


export const SERVICES_DATA: TravelService[] = [
  {
    id: "serv-packages",
    title: "Complete Holiday Packages",
    description: "Stress-free bundled travel. We bundle your flights, stays, airport transfers, meals and activities into one transparent, cost-effective package.",
    iconName: "Luggage",
    features: ["All-inclusive resort stays", "Flights + transfers + hotel", "Zero hidden fees"],
    popularFor: "Mauritius, Zanzibar, Thailand, Europe"
  },
  {
    id: "serv-flights",
    title: "Domestic & International Flights",
    description: "Competitive airfares across all major global and domestic airlines. We find the best routing, convenient layovers, and manage seat selections.",
    iconName: "Plane",
    features: ["Domestic South African flights", "International long-haul routes", "Schedule change support"],
    popularFor: "Every journey begins with smooth flights"
  },
  {
    id: "serv-accommodation",
    title: "Accommodation & Luxury Resorts",
    description: "From secluded bush lodges and beachfront villas to boutique city hotels and family-friendly self-catering suites.",
    iconName: "Hotel",
    features: ["Vetted quality properties", "Exclusive room upgrades where available", "Flexible cancellation options"],
    popularFor: "Hotels, Lodges, Beach Resorts, B&Bs"
  },
  {
    id: "serv-local",
    title: "Local South African Holidays",
    description: "Fall in love with our own backyard. Explore Big 5 game reserves, the Drakensberg mountains, the Garden Route, or sunny Durban coastlines.",
    iconName: "Compass",
    features: ["Kruger National Park", "Cape Town & Winelands", "Wild Coast & Drakensberg"],
    popularFor: "Weekend breaks & family school holidays"
  },
  {
    id: "serv-international",
    title: "International Holidays",
    description: "Broaden your horizons. Explore iconic European capitals, Asian cultural wonders, American road trips, and exotic Middle Eastern marvels.",
    iconName: "Globe",
    features: ["Visa guidance & documentation", "Currency & destination tips", "Multi-city itineraries"],
    popularFor: "Europe, UK, USA, Asia, Middle East"
  },
  {
    id: "serv-cruises",
    title: "Ocean & River Cruises",
    description: "The ultimate hassle-free journey. Sail the Mediterranean, Caribbean, Norwegian Fjords, or local Southern African waters on luxury liners.",
    iconName: "Ship",
    features: ["MSC local South African cruises", "Mediterranean & Caribbean", "All meals & entertainment included"],
    popularFor: "Couples, multi-gen families, celebrations"
  },
  {
    id: "serv-tailormade",
    title: "Tailor-Made Holidays",
    description: "No two travelers are alike. We design personalized, custom itineraries created specifically around your travel dream, timeline, and exact budget.",
    iconName: "Sparkles",
    features: ["100% customized day-by-day plans", "Private drivers or self-drive", "Unique off-the-beaten-path experiences"],
    popularFor: "Milestone anniversaries & bespoke journeys"
  },
  {
    id: "serv-honeymoons",
    title: "Honeymoons & Romantic Getaways",
    description: "Celebrate the start of your marriage with intimacy and luxury. Overwater bungalows, private candlelit dinners, and special honeymoon perks.",
    iconName: "Heart",
    features: ["Complimentary honeymoon surprises", "Secluded beach & mountain retreats", "Honeymoon gift registry advice"],
    popularFor: "Maldives, Mauritius, Bali, Paris"
  },
  {
    id: "serv-family",
    title: "Family Holidays",
    description: "Kid-approved adventures that give parents real rest. Interconnected family suites, kids clubs, safe beaches, and family safari lodges.",
    iconName: "Users",
    features: ["Kids stay & eat free specials", "Family-friendly airlines & resorts", "Age-appropriate excursions"],
    popularFor: "School holidays & multi-generation trips"
  },
  {
    id: "serv-group-corporate",
    title: "Group Travel & Corporate",
    description: "Organizing logistics for 10 or 100 people takes finesse. We coordinate group flights, conferences, sports tours, and incentive corporate travel.",
    iconName: "Briefcase",
    features: ["Group airline block bookings", "Event & conference accommodation", "Dedicated single point of contact"],
    popularFor: "Corporate retreats, clubs & friend getaways"
  },
  {
    id: "serv-ski",
    title: "Ski & Snowboard Holidays",
    description: "Experience the magic of winter wonderlands. We arrange ski passes, equipment hire, snow chalets, and beginner ski schools.",
    iconName: "Mountain",
    features: ["Ski-in / ski-out chalets", "Ski passes & gear pre-booked", "French, Austrian & Italian Alps"],
    popularFor: "Winter sports enthusiasts & families"
  },
  {
    id: "serv-car-tours",
    title: "Car Rental & Guided Tours",
    description: "Complete ground freedom. Hire reliable vehicles with zero hidden excess traps, and book verified local guides and landmark excursions.",
    iconName: "Car",
    features: ["Top tier rental partners (Avis, Hertz, Europcar)", "Airport collection & drop-off", "Skip-the-line attraction tickets"],
    popularFor: "Road trips & sightseeing days"
  }
];

export const DESTINATIONS_SPOTLIGHT: DestinationSpotlight[] = [
  {
    id: "dest-kruger",
    name: "Kruger National Park & Safari",
    region: "Mpumalanga / Limpopo, South Africa",
    category: "local",
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
    tagline: "The pulse of wild Africa and the legendary Big 5",
    bestTimeToVisit: "May to October (Dry winter season)",
    highlights: ["Open 4x4 game drives", "Luxury private lodges", "Bush sunsets & boma fires"]
  },
  {
    id: "dest-capetown",
    name: "Cape Town & The Winelands",
    region: "Western Cape, South Africa",
    category: "local",
    imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
    tagline: "Dramatic oceans, iconic Table Mountain & historic vineyards",
    bestTimeToVisit: "November to April (Summer sunshine)",
    highlights: ["Table Mountain cableway", "Cape Point scenic drive", "Franschhoek wine tram"]
  },
  {
    id: "dest-mauritius",
    name: "Mauritius Island",
    region: "Indian Ocean",
    category: "international",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    tagline: "Direct 4-hour flight from SA to tropical bliss",
    bestTimeToVisit: "April to December",
    highlights: ["All-inclusive beachfront luxury", "Undersea walks & coral reefs", "Warm island hospitality"]
  },
  {
    id: "dest-zanzibar",
    name: "Zanzibar Spice Island",
    region: "Tanzania, East Africa",
    category: "international",
    imageUrl: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
    tagline: "Powder white sands and historic Stone Town alleys",
    bestTimeToVisit: "June to October & December to February",
    highlights: ["Nungwi crystal waters", "Spice tours", "Traditional dhow sunset sailing"]
  },
  {
    id: "dest-europe",
    name: "Europe & Mediterranean",
    region: "Italy, Greece, France, Spain",
    category: "international",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    tagline: "Ancient wonders, cobblestone romance, and world-class cuisine",
    bestTimeToVisit: "May to October",
    highlights: ["Santorini sunsets", "Colosseum & Venice canals", "Scenic European rail tours"]
  },
  {
    id: "dest-thailand-bali",
    name: "Thailand & Bali Exotic Asia",
    region: "Southeast Asia",
    category: "international",
    imageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
    tagline: "Incredible value, sacred temples, and lush tropical islands",
    bestTimeToVisit: "November to April (Thailand) / April to October (Bali)",
    highlights: ["Private pool villas", "Street food & floating markets", "Limestone island hopping"]
  },
  {
    id: "dest-egypt",
    name: "Egypt & The Nile River",
    region: "Cairo, Giza, Luxor & Nile Cruise",
    category: "international",
    imageUrl: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80",
    tagline: "Great Pyramids of Giza, ancient temples & iconic Nile cruises",
    bestTimeToVisit: "October to April (Pleasant sunny weather)",
    highlights: ["Pyramids & Sphinx", "Nile River guided cruises", "Valley of the Kings in Luxor"]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [];

export const WHY_CHOOSE_US_POINTS = [
  {
    title: "21 Years of Industry Excellence",
    description: "Two decades of hands-on travel knowledge means you travel with total confidence. We know the right airlines, the best seasons, and the hidden gems.",
    icon: "Award"
  },
  {
    title: "Zero One-Size-Fits-All Approach",
    description: "We listen to what you want, respect your budget, and handcraft every itinerary to match your personal tastes and travel style.",
    icon: "HeartHandshake"
  },
  {
    title: "Stress-Free, Start-to-Finish Booking",
    description: "From comparing flights and securing vetted hotels to airport transfers, excursions, and travel advice, we take care of all the complex logistics.",
    icon: "ShieldCheck"
  },
  {
    title: "Real Personal Advocate (Not a Call Center)",
    description: "Deal directly with Cathy Lawrence. If flight schedules change or you need urgent assistance while traveling, you have a direct WhatsApp line.",
    icon: "PhoneCall"
  },
  {
    title: "Best Value & Trusted Partner Network",
    description: "Our long-standing industry partnerships with airlines, hotel chains, and tour operators give you exclusive rates and added-value inclusions.",
    icon: "Sparkles"
  }
];
