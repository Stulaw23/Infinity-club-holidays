import { HolidayPackage, TravelService, DestinationSpotlight, Testimonial } from '../types';

export const BUSINESS_INFO = {
  name: "Infinity Club Holidays",
  tagline: "Endless Travel Possibilities",
  subTagline: "For all your leisure and corporate business needs",
  agentName: "Cathy Lawrence",
  agentRole: "Travel Agent & Founder",
  experienceYears: 21,
  phone: "0845626444",
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
    instagram: "https://www.instagram.com/infinityclubholidays?stkn=cXVhOGJleTNiOGkx"
  }
};

export const PACKAGES_DATA: HolidayPackage[] = [
  {
    id: "pkg-mauritius-luxury",
    title: "Mauritius Tropical Resort All-Inclusive",
    subtitle: "7 Nights Island Paradise with Direct Flights",
    category: "island",
    destination: "Mauritius",
    duration: "7 Nights / 8 Days",
    priceZAR: 23950,
    priceNote: "per person sharing, includes direct flights from JHB/CPT",
    badge: "Most Popular Island",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    description: "Relax on pristine white-sand beaches with turquoise lagoons. Enjoy complimentary water sports, gourmet dining, and sunsets over the Indian Ocean.",
    inclusions: [
      "Return flights with airport taxes",
      "Return airport / resort transfers in air-conditioned coach",
      "7 Nights in Superior Ocean View Room",
      "All meals (Breakfast, Lunch, Dinner) & selected cocktails / drinks",
      "Free non-motorised water sports (kayaking, snorkelling, windsurfing)",
      "Daily resort entertainment & evening live shows"
    ],
    idealFor: "Couples, Families, Honeymooners"
  },
  {
    id: "pkg-kruger-safari",
    title: "Kruger Big 5 Luxury Safari Lodge",
    subtitle: "4 Nights Wild Bush Retreat with Game Drives",
    category: "local",
    destination: "Greater Kruger / Mpumalanga",
    duration: "4 Nights / 5 Days",
    priceZAR: 14800,
    priceNote: "per person sharing, self-drive or fly-in options available",
    badge: "Local SA Special",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    description: "Experience the magic of the African wild. Morning and sunset 4x4 open vehicle safari drives guided by expert rangers, fireside boma dinners under starry skies.",
    inclusions: [
      "4 Nights luxury thatched chalet accommodation",
      "All meals daily: breakfast, high tea & boma dinners",
      "Twice daily open-vehicle game drives with tracker & ranger",
      "Conservation levy & gate entry fees included",
      "Bush walk experience with qualified armed guide",
      "Sundowner drinks in the wilderness"
    ],
    idealFor: "Wildlife Lovers, Families, International Visitors"
  },
  {
    id: "pkg-zanzibar-beach",
    title: "Zanzibar White Sands & Spice Island",
    subtitle: "7 Nights Nungwi Beachfront Bliss",
    category: "island",
    destination: "Zanzibar, Tanzania",
    duration: "7 Nights / 8 Days",
    priceZAR: 18750,
    priceNote: "per person sharing, inclusive of flights & breakfast/dinner",
    badge: "Best Value Island",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    description: "Turquoise Indian Ocean waters, swaying palms, and fragrant Stone Town spice bazaars. Stay at an authentic Swahili-chic beach resort on the northern coast.",
    inclusions: [
      "Return flights to Zanzibar with airline taxes",
      "Return private airport to resort transfers",
      "7 Nights resort stay with pool & private beach access",
      "Breakfast and dinners included daily",
      "Stone Town & Spice Plantation guided day tour",
      "Sunset dhow cruise experience"
    ],
    idealFor: "Romance, Friends, Beach Relaxation"
  },
  {
    id: "pkg-mediterranean-cruise",
    title: "Mediterranean Jewels Luxury Cruise",
    subtitle: "7 Nights Italy, Greek Isles & Montenegro",
    category: "cruise",
    destination: "Mediterranean (Rome, Santorini, Mykonos, Kotor)",
    duration: "7 Nights Sailing",
    priceZAR: 26500,
    priceNote: "per person sharing, cabin accommodation + all meals & entertainment",
    badge: "Bucket List Cruise",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=80",
    description: "Unpack once and wake up in a new iconic European port every morning. From ancient Roman ruins to whitewashed Santorini cliffs and vibrant Mykonos nightlife.",
    inclusions: [
      "7 Nights onboard luxury cruise liner in selected stateroom",
      "Full board gourmet dining across all main restaurants & buffets",
      "World-class theatre productions, live music & onboard lounges",
      "Port taxes, luggage handling and service gratuities",
      "Use of resort pools, whirlpools, gym & sundecks",
      "Flight connections & pre-cruise hotel packaging arranged by Cathy"
    ],
    idealFor: "Couples, Milestone Celebrations, Groups"
  },
  {
    id: "pkg-cape-garden-route",
    title: "Cape Town, Winelands & Garden Route",
    subtitle: "8 Nights Iconic Scenic Coastal Roadtrip",
    category: "local",
    destination: "Western Cape & Garden Route",
    duration: "8 Nights / 9 Days",
    priceZAR: 16200,
    priceNote: "per person sharing, includes car hire & boutique stays",
    badge: "Signature SA Tour",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80",
    description: "Explore the Mother City's Table Mountain, Stellenbosch & Franschhoek wine valleys, Hermanus whale watching, and Knysna lagoon.",
    inclusions: [
      "8 Days unlimited mileage car rental with super cover insurance",
      "3 Nights Cape Town waterfront area 4-star boutique hotel",
      "2 Nights Franschhoek wine valley country estate",
      "3 Nights Knysna Lagoon / Plettenberg Bay coastal lodge",
      "Daily gourmet farm breakfasts",
      "Winelands cellar tour & curated tasting voucher"
    ],
    idealFor: "Couples, Road-trippers, Food & Wine Enthusiasts"
  },
  {
    id: "pkg-bali-escape",
    title: "Bali Tropical Villa & Cultural Ubud",
    subtitle: "10 Nights Seminyak Beach & Emerald Rice Terraces",
    category: "international",
    destination: "Bali, Indonesia",
    duration: "10 Nights / 11 Days",
    priceZAR: 24800,
    priceNote: "per person sharing, flights + private villa stays",
    badge: "Exotic Escape",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    description: "Combine coastal sunsets in vibrant Seminyak with serene jungle retreats, waterfalls, and sacred temples in Ubud.",
    inclusions: [
      "Return international flights from South Africa",
      "5 Nights private pool villa in Seminyak",
      "5 Nights rainforest retreat resort in Ubud",
      "Private driver and air-conditioned transfers throughout",
      "Balinese massage spa treatment for two",
      "Day tour to Tegalalang rice terraces & Tanah Lot temple"
    ],
    idealFor: "Couples, Wellness Seekers, Honeymoons"
  },
  {
    id: "pkg-alps-ski",
    title: "European Alps Ski & Snowboard Week",
    subtitle: "7 Nights Alpine Chalet with Ski Passes",
    category: "adventure",
    destination: "Austrian / French Alps",
    duration: "7 Nights / 8 Days",
    priceZAR: 34500,
    priceNote: "per person sharing, complete ski package",
    badge: "Winter Thrill",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1200&q=80",
    description: "Crisp alpine powder, heated mountain chalets, legendary après-ski, and breathtaking panoramic slopes for all skill levels.",
    inclusions: [
      "Return flights to Zurich / Geneva / Munich",
      "Airport to mountain resort transfers",
      "7 Nights cozy mountain lodge accommodation",
      "6-Day full region ski lift pass",
      "Ski or snowboard equipment rental hire",
      "Breakfast and 4-course alpine dinners daily"
    ],
    idealFor: "Adventure Travelers, Groups, Winter Enthusiasts"
  },
  {
    id: "pkg-dubai-desert",
    title: "Dubai Glamour & Desert Safari",
    subtitle: "5 Nights Ultra-Modern Skyline & Dunes",
    category: "international",
    destination: "Dubai, UAE",
    duration: "5 Nights / 6 Days",
    priceZAR: 19900,
    priceNote: "per person sharing, flights + luxury stay",
    badge: "City & Desert",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    description: "Marvel at the Burj Khalifa, indulge in world-class shopping, and race across red sand dunes in a 4x4 safari with traditional Bedouin BBQ feast.",
    inclusions: [
      "Return flights on Emirates or partner carriers",
      "5 Nights in a 4-Star or 5-Star downtown hotel",
      "Daily breakfast buffet",
      "Red dune 4x4 desert safari with dune bashing, camel ride & BBQ",
      "Marina dhow dinner cruise",
      "Burj Khalifa observation deck admission ticket"
    ],
    idealFor: "Shopping, Families, Short Luxury Getaways"
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

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah & David Van Der Merwe",
    location: "Cape Town",
    tripType: "Honeymoon Package",
    destination: "Mauritius All-Inclusive",
    rating: 5,
    comment: "Cathy made our honeymoon completely seamless from start to finish! With 21 years in the business, she knew exactly which resort had the best quiet beach for couples. When our connecting flight was delayed, she had it sorted before we even landed. We won't book a holiday through anyone else.",
    date: "February 2026",
    verified: true
  },
  {
    id: "test-2",
    name: "Mark & Leanne Pietersen",
    location: "Somerset West",
    tripType: "Family Holiday (2 Adults, 2 Kids)",
    destination: "Kruger Safari & Mpumalanga",
    rating: 5,
    comment: "Booking for a family with two energetic kids can be stressful, but Infinity Club Holidays handled flights, car hire, and a child-friendly safari lodge that the kids will remember forever. Outstanding personal attention and genuine care.",
    date: "January 2026",
    verified: true
  },
  {
    id: "test-3",
    name: "Johan Du Plessis",
    location: "Strand, Western Cape",
    tripType: "Anniversary Cruise",
    destination: "Mediterranean MSC Cruise",
    rating: 5,
    comment: "I walked into Cathy's office with an idea and a budget. She curated an unbelievable European cruise with flights and 2 nights in Rome. Cathy's advice saved us thousands compared to booking online yourself. Top class travel agent!",
    date: "November 2025",
    verified: true
  },
  {
    id: "test-4",
    name: "Candice Naidoo",
    location: "Johannesburg",
    tripType: "Girls Island Getaway",
    destination: "Zanzibar White Sands",
    rating: 5,
    comment: "Endless travel possibilities is the truth! Cathy recommended Zanzibar for our 30th birthday trip and it exceeded all expectations. The resort, the excursions, the peace of mind knowing Cathy was a WhatsApp away — 10/10 service!",
    date: "October 2025",
    verified: true
  }
];

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
