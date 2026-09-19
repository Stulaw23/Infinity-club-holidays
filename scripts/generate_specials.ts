import fs from 'fs';
import path from 'path';

interface SpecialData {
  filename: string;
  localPhoto: string;
  brand: 'contiki' | 'costsaver' | 'trafalgar' | 'insight';
  brandLabel: string;
  accentColor: string;
  bgGradient: string;
  title: string;
  titleColor: string;
  subtitle: string;
  price: string;
  inclusions: string[];
  terms: string;
}

const specials: SpecialData[] = [
  {
    filename: 'special-contiki-european-discovery.svg',
    localPhoto: 'contiki-european-discovery.jpg',
    brand: 'contiki',
    brandLabel: 'CONTIKI',
    accentColor: '#bbf7d0',
    bgGradient: '#000000',
    title: 'European Discovery',
    titleColor: '#ccff00',
    subtitle: "The one that gives you a taste of Europe's finest in under 2 weeks, with upgraded accommodation too.",
    price: 'NOW FROM R53,795* pp',
    inclusions: [
      '11 Breakfasts, 1 Lunch, 3 Dinners',
      '9 Included Experiences',
      'Expert Trip Manager & Local Guides',
      'All Internal Transport & Accomodation'
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026."
  },
  {
    filename: 'special-costsaver-britain-ireland-delight.svg',
    localPhoto: 'costsaver-britain-ireland-delight.jpg',
    brand: 'costsaver',
    brandLabel: 'costsaver.',
    accentColor: '#38bdf8',
    bgGradient: '#1e40af',
    title: 'BRITAIN AND IRELAND DELIGHT',
    titleColor: '#ffffff',
    subtitle: '10-Day Britain and Ireland Tour to Glasgow, Dublin & Cardiff',
    price: 'NOW FROM R35,820* pp',
    inclusions: [
      '10 Days, 5 Countries, 18 Cities',
      '9 Nights Accommodation',
      '9 Breakfasts, 2 Dinners'
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026."
  },
  {
    filename: 'special-costsaver-italian-scene.svg',
    localPhoto: 'costsaver-italian-scene.jpg',
    brand: 'costsaver',
    brandLabel: 'costsaver.',
    accentColor: '#38bdf8',
    bgGradient: '#1e40af',
    title: 'ITALIAN SCENE',
    titleColor: '#ffffff',
    subtitle: '10-Day Italy Tour of Rome, Venice, Italian Lakes, Pisa and Florence',
    price: 'NOW FROM R35,145* pp',
    inclusions: [
      '10 Days, 2 Countries, 11 Cities',
      '9 Nights Accommodation',
      '9 Breakfasts, 3 Dinners'
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026."
  },
  {
    filename: 'special-contiki-thai-island-hopper-west.svg',
    localPhoto: 'contiki-thai-island-hopper-west.jpg',
    brand: 'contiki',
    brandLabel: 'CONTIKI',
    accentColor: '#bbf7d0',
    bgGradient: '#000000',
    title: 'Thai Island Hopper West',
    titleColor: '#ccff00',
    subtitle: "Emerald bays. Andaman sunsets. Island hopping Thailand's west through Phuket, Phi Phi and Krabi.",
    price: 'NOW FROM R13,995 pp',
    inclusions: [
      '7 Breakfasts, 2 Dinners',
      '4 Included Experiences',
      'Expert Trip Manager & Local Guides',
      'All Internal Transport & Accomodation'
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026."
  },
  {
    filename: 'special-contiki-thai-island-hopper-east.svg',
    localPhoto: 'contiki-thai-island-hopper-east.jpg',
    brand: 'contiki',
    brandLabel: 'CONTIKI',
    accentColor: '#bbf7d0',
    bgGradient: '#000000',
    title: 'Thai Island Hopper East',
    titleColor: '#ccff00',
    subtitle: 'Island hopping through the Gulf of Thailand: Koh Samui, Pha Ngan and Koh Tao.',
    price: 'NOW FROM R15,500* pp',
    inclusions: [
      '8 Breakfasts, 2 Dinners',
      '3 Included Experiences',
      'Expert Trip Manager & Local Guides',
      'All Internal Transport & Accomodation'
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026."
  },
  {
    filename: 'special-costsaver-european-accent.svg',
    localPhoto: 'costsaver-european-accent.jpg',
    brand: 'costsaver',
    brandLabel: 'costsaver.',
    accentColor: '#38bdf8',
    bgGradient: '#1e40af',
    title: 'EUROPEAN ACCENT',
    titleColor: '#ffffff',
    subtitle: '15-Day Europe Tour from Amsterdam to Paris via Rome',
    price: 'NOW FROM R54,720* pp',
    inclusions: [
      '15 Days, 7 Countries, 15 Cities',
      '14 Nights Accommodation',
      '14 Breakfasts, 4 Dinners'
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026."
  },
  {
    filename: 'special-costsaver-jewels-of-italy.svg',
    localPhoto: 'costsaver-jewels-of-italy.jpg',
    brand: 'costsaver',
    brandLabel: 'costsaver.',
    accentColor: '#38bdf8',
    bgGradient: '#1e40af',
    title: 'JEWELS OF ITALY',
    titleColor: '#ffffff',
    subtitle: 'One-Week Italy Tour to Rome, Florence and Venice',
    price: 'NOW FROM R25,920* pp',
    inclusions: [
      '7 Days, 2 Countries, 6 Cities',
      '6 Nights Accommodation',
      '6 Breakfasts, 2 Dinners'
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026."
  },
  {
    filename: 'special-trafalgar-imperial-europe.svg',
    localPhoto: 'trafalgar-imperial-europe.jpg',
    brand: 'trafalgar',
    brandLabel: 'TRAFALGAR',
    accentColor: '#fecdd3',
    bgGradient: '#e11d48',
    title: 'Imperial Europe',
    titleColor: '#ffffff',
    subtitle: '10-Day Europe Tour of Germany, Czech Republic, Hungary and Austria',
    price: 'NOW FROM R48,690* pp',
    inclusions: [
      '10 Days, 5 Countries, 8 Cities',
      '9 Nights Accommodation',
      '9 Breakfasts, 4 Dinners'
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026."
  },
  {
    filename: 'special-trafalgar-best-of-turkey.svg',
    localPhoto: 'trafalgar-best-of-turkey.jpg',
    brand: 'trafalgar',
    brandLabel: 'TRAFALGAR',
    accentColor: '#fecdd3',
    bgGradient: '#e11d48',
    title: 'Best of Turkey',
    titleColor: '#ffffff',
    subtitle: '14-Day Turkey Tour of Istanbul, Gallipoli, Pamukkale and Cappadocia',
    price: 'NOW FROM R53,550* pp',
    inclusions: [
      '14 Days, 1 Country, 16 Cities',
      '13 Nights Accommodation',
      '13 Breakfasts, 1 Lunch, 10 Dinners'
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026."
  },
  {
    filename: 'special-trafalgar-best-of-the-danube.svg',
    localPhoto: 'trafalgar-best-of-the-danube.jpg',
    brand: 'trafalgar',
    brandLabel: 'TRAFALGAR RIVER CRUISES',
    accentColor: '#fecdd3',
    bgGradient: '#e11d48',
    title: 'Best of the Danube',
    titleColor: '#ffffff',
    subtitle: 'Danube River Cruise Visiting Budapest, Bratislava, Vienna, Linz & Passau',
    price: 'NOW FROM R41,300* pp',
    inclusions: [
      '8 Days, 4 Countries, 6 Cities',
      '7 Breakfasts, 6 Lunches, 7 Dinners'
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026."
  },
  {
    filename: 'special-insight-vacations-easy-pace-italy.svg',
    localPhoto: 'insight-vacations-easy-pace-italy.jpg',
    brand: 'insight',
    brandLabel: 'INSIGHT VACATIONS',
    accentColor: '#93c5fd',
    bgGradient: '#0b1329',
    title: 'EASY PACE ITALY',
    titleColor: '#ffffff',
    subtitle: 'From the Vatican to Venice: See the Best of Italy on this 10-Day Guided Tour',
    price: 'NOW FROM R82,260* pp',
    inclusions: [
      '10 Days, 2 Countries, 6 Cities',
      '9 Nights Accommodation',
      '9 Breakfasts, 1 Lunch, 4 Dinners'
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026."
  },
  {
    filename: 'special-insight-vacations-highlights-of-poland.svg',
    localPhoto: 'insight-vacations-highlights-of-poland.jpg',
    brand: 'insight',
    brandLabel: 'INSIGHT VACATIONS',
    accentColor: '#93c5fd',
    bgGradient: '#0b1329',
    title: 'HIGHLIGHTS OF POLAND',
    titleColor: '#ffffff',
    subtitle: "Explore Poland's Rich Heritage, Culinary Delights & Local Traditions on a 10-Day Guided Tour",
    price: 'NOW FROM R47,160* pp',
    inclusions: [
      '10 Days, 1 Country, 10 Cities',
      '9 Nights Accommodation',
      '9 Breakfasts, 4 Dinners'
    ],
    terms: "*T&C's apply, excludes flights, travel on selected dates in 2027. Book by 30 Sep 2026."
  }
];

const outputDir = path.join(process.cwd(), 'public', 'assets', 'specials');
const photosDir = path.join(outputDir, 'photos');

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

for (const item of specials) {
  const brandHeaderBg =
    item.brand === 'contiki'
      ? '#000000'
      : item.brand === 'costsaver'
      ? '#1e3a8a'
      : item.brand === 'trafalgar'
      ? '#e11d48'
      : '#0a1128';

  const brandHeaderColor = '#ffffff';

  // Read local photo as base64
  const photoPath = path.join(photosDir, item.localPhoto);
  let photoDataUri = '';
  if (fs.existsSync(photoPath)) {
    const photoB64 = fs.readFileSync(photoPath).toString('base64');
    photoDataUri = `data:image/jpeg;base64,${photoB64}`;
  }

  const bulletPointsSvg = item.inclusions
    .map(
      (inc, idx) => `
      <g transform="translate(60, ${820 + idx * 36})">
        <circle cx="8" cy="8" r="4" fill="${item.accentColor}" />
        <text x="26" y="14" fill="#f8fafc" font-family="'Outfit', sans-serif" font-size="22" font-weight="500">${escapeXml(inc)}</text>
      </g>`
    )
    .join('');

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1066" width="100%" height="100%">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&amp;display=swap');
    </style>
    <clipPath id="photoClip">
      <rect x="0" y="70" width="800" height="490" />
    </clipPath>
    <linearGradient id="photoFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="60%" stop-color="transparent" />
      <stop offset="100%" stop-color="${item.bgGradient}" />
    </linearGradient>
  </defs>

  <!-- Top Brand Banner -->
  <rect x="0" y="0" width="800" height="70" fill="${brandHeaderBg}" />
  <text x="400" y="47" fill="${brandHeaderColor}" font-family="'Outfit', sans-serif" font-size="34" font-weight="900" text-anchor="middle" letter-spacing="2">${escapeXml(item.brandLabel.toUpperCase())}</text>

  <!-- Destination Photo with Embedded Base64 Image -->
  <g clip-path="url(#photoClip)">
    <rect x="0" y="70" width="800" height="490" fill="#1e293b" />
    <image href="${photoDataUri}" x="0" y="70" width="800" height="490" preserveAspectRatio="xMidYMid slice" />
    <rect x="0" y="70" width="800" height="490" fill="url(#photoFade)" />
  </g>

  <!-- Circle 'LAST CHANCE TO BOOK & SAVE' Badge -->
  <g transform="translate(670, 210)">
    <circle cx="0" cy="0" r="92" fill="#ffffff" stroke="#1e293b" stroke-width="3" />
    <text x="0" y="-30" fill="#0f172a" font-family="'Outfit', sans-serif" font-size="22" font-weight="900" text-anchor="middle" letter-spacing="1">LAST</text>
    <text x="0" y="-2" fill="#0f172a" font-family="'Outfit', sans-serif" font-size="22" font-weight="900" text-anchor="middle" letter-spacing="1">CHANCE</text>
    <text x="0" y="26" fill="#0f172a" font-family="'Outfit', sans-serif" font-size="18" font-weight="800" text-anchor="middle" letter-spacing="1">TO BOOK</text>
    <text x="0" y="54" fill="#0f172a" font-family="'Outfit', sans-serif" font-size="24" font-weight="900" text-anchor="middle" letter-spacing="1">&amp; SAVE</text>
  </g>

  <!-- Lower Offer Container -->
  <rect x="0" y="560" width="800" height="506" fill="${item.bgGradient}" />

  <!-- Headline -->
  <text x="60" y="630" fill="${item.titleColor}" font-family="'Outfit', sans-serif" font-size="44" font-weight="900" letter-spacing="-0.5">${escapeXml(item.title)}</text>

  <!-- Subtitle -->
  <text x="60" y="675" fill="#f1f5f9" font-family="'Outfit', sans-serif" font-size="21" font-weight="400" width="680">${escapeXml(item.subtitle)}</text>

  <!-- Price Tag -->
  <text x="60" y="745" fill="#ffffff" font-family="'Outfit', sans-serif" font-size="34" font-weight="900" letter-spacing="0.5">${escapeXml(item.price)}</text>

  <!-- Divider -->
  <line x1="60" y1="785" x2="740" y2="785" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5" />

  <!-- Inclusions -->
  ${bulletPointsSvg}

  <!-- Footnote T&C -->
  <text x="60" y="1025" fill="#cbd5e1" font-family="'Outfit', sans-serif" font-size="14" font-weight="400">${escapeXml(item.terms)}</text>
</svg>`;

  fs.writeFileSync(path.join(outputDir, item.filename), svgContent);
  console.log(`Generated self-contained flyer with embedded photo: ${item.filename}`);
}

console.log('All 12 promotional flyers re-generated with embedded photos successfully!');
