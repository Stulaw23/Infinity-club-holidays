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

export const PACKAGES_DATA: HolidayPackage[] = [
  {
    id: "pkg-contiki-european-discovery",
    title: "European Discovery",
    subtitle: "The one that gives you a taste of Europe's finest in under 2 weeks, with upgraded accommodation too.",
    category: "contiki",
    operator: "Contiki",
    brand: "contiki",
    destination: "Europe Highlights",
    duration: "Under 2 Weeks",
    priceZAR: 53795,
    priceNote: "NOW FROM R53,795* pp (Excludes flights, selected 2027 dates)",
    badge: "Contiki • Save & Book",
    featured: true,
    imageUrl: "/assets/specials/special-contiki-european-discovery.svg",
    photoUrl: "/assets/specials/photos/contiki-european-discovery.jpg",
    description: "Experience Europe's finest cities in under 2 weeks with Contiki, including upgraded accommodations and social adventures.",
    inclusions: [
      "11 Breakfasts, 1 Lunch, 3 Dinners",
      "9 Included Experiences",
      "Expert Trip Manager & Local Guides",
      "All Internal Transport & Accomodation"
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026.",
    idealFor: "18-35 Travelers, Europe Explorers, Social Adventurers"
  },
  {
    id: "pkg-costsaver-britain-ireland-delight",
    title: "Britain and Ireland Delight",
    subtitle: "10-Day Britain and Ireland Tour to Glasgow, Dublin & Cardiff",
    category: "costsaver",
    operator: "Costsaver",
    brand: "costsaver",
    destination: "Britain & Ireland",
    duration: "10 Days / 9 Nights",
    priceZAR: 35820,
    priceNote: "NOW FROM R35,820* pp (Excludes flights, selected 2027 dates)",
    badge: "Costsaver • Last Chance",
    featured: true,
    imageUrl: "/assets/specials/special-costsaver-britain-ireland-delight.svg",
    photoUrl: "/assets/specials/photos/costsaver-britain-ireland-delight.jpg",
    description: "Explore 5 countries and 18 cities across England, Scotland, Wales, and Ireland with Costsaver guided ease.",
    inclusions: [
      "10 Days, 5 Countries, 18 Cities",
      "9 Nights Accommodation",
      "9 Breakfasts, 2 Dinners"
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026.",
    idealFor: "History & Countryside Lovers, UK & Ireland First-Timers"
  },
  {
    id: "pkg-costsaver-italian-scene",
    title: "Italian Scene",
    subtitle: "10-Day Italy Tour of Rome, Venice, Italian Lakes, Pisa and Florence",
    category: "costsaver",
    operator: "Costsaver",
    brand: "costsaver",
    destination: "Italy Highlights",
    duration: "10 Days / 9 Nights",
    priceZAR: 35145,
    priceNote: "NOW FROM R35,145* pp (Excludes flights, selected 2027 dates)",
    badge: "Costsaver • Italy Best-Seller",
    featured: true,
    imageUrl: "/assets/specials/special-costsaver-italian-scene.svg",
    photoUrl: "/assets/specials/photos/costsaver-italian-scene.jpg",
    description: "From the Colosseum of Rome to the canals of Venice, picturesque Italian Lakes, and Renaissance Florence.",
    inclusions: [
      "10 Days, 2 Countries, 11 Cities",
      "9 Nights Accommodation",
      "9 Breakfasts, 3 Dinners"
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026.",
    idealFor: "Italian Culture, Food Lovers, Iconic Landmarks"
  },
  {
    id: "pkg-contiki-thai-island-hopper-west",
    title: "Thai Island Hopper West",
    subtitle: "Emerald bays. Andaman sunsets. Island hopping Thailand's west through Phuket, Phi Phi and Krabi.",
    category: "contiki",
    operator: "Contiki",
    brand: "contiki",
    destination: "Thailand (Phuket, Phi Phi, Krabi)",
    duration: "8 Days / 7 Nights",
    priceZAR: 13995,
    priceNote: "NOW FROM R13,995 pp (Excludes flights, selected 2027 dates)",
    badge: "Contiki • Island Hopper",
    featured: true,
    imageUrl: "/assets/specials/special-contiki-thai-island-hopper-west.svg",
    photoUrl: "/assets/specials/photos/contiki-thai-island-hopper-west.jpg",
    description: "Hop between Phuket, legendary Koh Phi Phi, and limestone cliffs of Krabi on the Andaman Coast.",
    inclusions: [
      "7 Breakfasts, 2 Dinners",
      "4 Included Experiences",
      "Expert Trip Manager & Local Guides",
      "All Internal Transport & Accomodation"
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026.",
    idealFor: "18-35 Beach Lovers, Snorkeling, Tropical Getaways"
  },
  {
    id: "pkg-contiki-thai-island-hopper-east",
    title: "Thai Island Hopper East",
    subtitle: "Island hopping through the Gulf of Thailand: Koh Samui, Pha Ngan and Koh Tao.",
    category: "contiki",
    operator: "Contiki",
    brand: "contiki",
    destination: "Thailand (Koh Samui, Pha Ngan, Koh Tao)",
    duration: "9 Days / 8 Nights",
    priceZAR: 15500,
    priceNote: "NOW FROM R15,500* pp (Excludes flights, selected 2027 dates)",
    badge: "Contiki • Gulf of Thailand",
    featured: true,
    imageUrl: "/assets/specials/special-contiki-thai-island-hopper-east.svg",
    photoUrl: "/assets/specials/photos/contiki-thai-island-hopper-east.jpg",
    description: "Island hopping through crystal-clear Gulf waters: Koh Samui palm beaches, Pha Ngan, and world-class diving in Koh Tao.",
    inclusions: [
      "8 Breakfasts, 2 Dinners",
      "3 Included Experiences",
      "Expert Trip Manager & Local Guides",
      "All Internal Transport & Accomodation"
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026.",
    idealFor: "Island Life, Diving, Tropical Relaxation & Fun"
  },
  {
    id: "pkg-costsaver-european-accent",
    title: "European Accent",
    subtitle: "15-Day Europe Tour from Amsterdam to Paris via Rome",
    category: "costsaver",
    operator: "Costsaver",
    brand: "costsaver",
    destination: "Europe Grand Tour",
    duration: "15 Days / 14 Nights",
    priceZAR: 54720,
    priceNote: "NOW FROM R54,720* pp (Excludes flights, selected 2027 dates)",
    badge: "Costsaver • 7 Countries",
    featured: true,
    imageUrl: "/assets/specials/special-costsaver-european-accent.svg",
    photoUrl: "/assets/specials/photos/costsaver-european-accent.jpg",
    description: "15 incredible days across 7 countries and 15 cities connecting Amsterdam, Lucerne, Rome, and the Eiffel Tower in Paris.",
    inclusions: [
      "15 Days, 7 Countries, 15 Cities",
      "14 Nights Accommodation",
      "14 Breakfasts, 4 Dinners"
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026.",
    idealFor: "Grand Europe Travelers, Multicountry Sightseeing"
  },
  {
    id: "pkg-costsaver-jewels-of-italy",
    title: "Jewels of Italy",
    subtitle: "One-Week Italy Tour to Rome, Florence and Venice",
    category: "costsaver",
    operator: "Costsaver",
    brand: "costsaver",
    destination: "Italy (Rome, Florence, Venice)",
    duration: "7 Days / 6 Nights",
    priceZAR: 25920,
    priceNote: "NOW FROM R25,920* pp (Excludes flights, selected 2027 dates)",
    badge: "Costsaver • 1-Week Special",
    featured: false,
    imageUrl: "/assets/specials/special-costsaver-jewels-of-italy.svg",
    photoUrl: "/assets/specials/photos/costsaver-jewels-of-italy.jpg",
    description: "A week of pure Italian wonder: Rome's Colosseum, Florence's Renaissance treasures, and the gondolas of Venice.",
    inclusions: [
      "7 Days, 2 Countries, 6 Cities",
      "6 Nights Accommodation",
      "6 Breakfasts, 2 Dinners"
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026.",
    idealFor: "First-Time Italy Visitors, Value Cultural Getaway"
  },
  {
    id: "pkg-trafalgar-imperial-europe",
    title: "Imperial Europe",
    subtitle: "10-Day Europe Tour of Germany, Czech Republic, Hungary and Austria",
    category: "trafalgar",
    operator: "Trafalgar",
    brand: "trafalgar",
    destination: "Central Europe",
    duration: "10 Days / 9 Nights",
    priceZAR: 48690,
    priceNote: "NOW FROM R48,690* pp (Excludes flights, selected 2027 dates)",
    badge: "Trafalgar • First Class",
    featured: false,
    imageUrl: "/assets/specials/special-trafalgar-imperial-europe.svg",
    photoUrl: "/assets/specials/photos/trafalgar-imperial-europe.jpg",
    description: "Discover imperial palaces, grand boulevards, and fairytale cities across Munich, Prague, Vienna, and Budapest.",
    inclusions: [
      "10 Days, 5 Countries, 8 Cities",
      "9 Nights Accommodation",
      "9 Breakfasts, 4 Dinners"
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026.",
    idealFor: "History Buffs, Architecture, Classical Culture"
  },
  {
    id: "pkg-trafalgar-best-of-turkey",
    title: "Best of Turkey",
    subtitle: "14-Day Turkey Tour of Istanbul, Gallipoli, Pamukkale and Cappadocia",
    category: "trafalgar",
    operator: "Trafalgar",
    brand: "trafalgar",
    destination: "Turkey",
    duration: "14 Days / 13 Nights",
    priceZAR: 53550,
    priceNote: "NOW FROM R53,550* pp (Excludes flights, selected 2027 dates)",
    badge: "Trafalgar • Bucket List",
    featured: false,
    imageUrl: "/assets/specials/special-trafalgar-best-of-turkey.svg",
    photoUrl: "/assets/specials/photos/trafalgar-best-of-turkey.jpg",
    description: "14 days of Turkish wonders from Istanbul's Grand Bazaar to the historical fields of Gallipoli, white terraces of Pamukkale, and fairy chimneys of Cappadocia.",
    inclusions: [
      "14 Days, 1 Country, 16 Cities",
      "13 Nights Accommodation",
      "13 Breakfasts, 1 Lunch, 10 Dinners"
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026.",
    idealFor: "Exotic History, Photography, Food & Bazaar Culture"
  },
  {
    id: "pkg-trafalgar-best-of-the-danube",
    title: "Best of the Danube",
    subtitle: "Danube River Cruise Visiting Budapest, Bratislava, Vienna, Linz & Passau",
    category: "trafalgar",
    operator: "Trafalgar",
    brand: "trafalgar",
    destination: "Danube River Cruise",
    duration: "8 Days / 7 Nights",
    priceZAR: 41300,
    priceNote: "NOW FROM R41,300* pp (Excludes flights, selected 2027 dates)",
    badge: "Trafalgar River Cruises",
    featured: false,
    imageUrl: "/assets/specials/special-trafalgar-best-of-the-danube.svg",
    photoUrl: "/assets/specials/photos/trafalgar-best-of-the-danube.jpg",
    description: "Sail gently along Europe's storied river from Budapest through Slovakia and Austria to Germany. Unpack once and wake up in magnificent ports.",
    inclusions: [
      "8 Days, 4 Countries, 6 Cities",
      "7 Breakfasts, 6 Lunches, 7 Dinners"
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026.",
    idealFor: "River Cruisers, Scenic Waterway Lovers, Effortless Travel"
  },
  {
    id: "pkg-insight-vacations-easy-pace-italy",
    title: "Easy Pace Italy",
    subtitle: "From the Vatican to Venice: See the Best of Italy on this 10-Day Guided Tour",
    category: "insight",
    operator: "Insight Vacations",
    brand: "insight",
    destination: "Italy Premium",
    duration: "10 Days / 9 Nights",
    priceZAR: 82260,
    priceNote: "NOW FROM R82,260* pp (Excludes flights, selected 2027 dates)",
    badge: "Insight Vacations • Premium",
    featured: false,
    imageUrl: "/assets/specials/special-insight-vacations-easy-pace-italy.svg",
    photoUrl: "/assets/specials/photos/insight-vacations-easy-pace-italy.jpg",
    description: "Travel with premium comfort, hand-picked dining, and relaxed pacing from Vatican City to the grand canals of Venice with Insight Vacations.",
    inclusions: [
      "10 Days, 2 Countries, 6 Cities",
      "9 Nights Accommodation",
      "9 Breakfasts, 1 Lunch, 4 Dinners"
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026.",
    idealFor: "Luxury Travelers, Relaxed Pace, VIP Group Experience"
  },
  {
    id: "pkg-insight-vacations-highlights-of-poland",
    title: "Highlights of Poland",
    subtitle: "Explore Poland's Rich Heritage, Culinary Delights & Local Traditions on a 10-Day Guided Tour",
    category: "insight",
    operator: "Insight Vacations",
    brand: "insight",
    destination: "Poland",
    duration: "10 Days / 9 Nights",
    priceZAR: 47160,
    priceNote: "NOW FROM R47,160* pp (Excludes flights, selected 2027 dates)",
    badge: "Insight Vacations • Heritage",
    featured: false,
    imageUrl: "/assets/specials/special-insight-vacations-highlights-of-poland.svg",
    photoUrl: "/assets/specials/photos/insight-vacations-highlights-of-poland.jpg",
    description: "Uncover Poland's magnificent castles, poignant heritage, rich folk arts, and hearty culinary traditions on an expertly escorted journey.",
    inclusions: [
      "10 Days, 1 Country, 10 Cities",
      "9 Nights Accommodation",
      "9 Breakfasts, 4 Dinners"
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026.",
    idealFor: "Heritage Explorers, Food & Tradition Enthusiasts"
  }
];

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
