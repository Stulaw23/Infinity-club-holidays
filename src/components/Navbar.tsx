import { useState, useEffect } from 'react';
import { Phone, Menu, X, Calendar, MapPin, Sparkles } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { BUSINESS_INFO } from '../data/travelData';

interface NavbarProps {
  onOpenQuoteModal: (initialPackageTitle?: string) => void;
}

export default function Navbar({ onOpenQuoteModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Holiday Specials', href: '#packages' },
    { label: 'Our Services', href: '#services' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Why Choose Us', href: '#experience' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header id="top" className="sticky top-0 z-40 w-full bg-white">
      {/* Top Utility Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Location & Industry badge */}
          <div className="flex items-center gap-3 text-slate-300 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Strand, Western Cape</span>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-purple-300 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>21 Years of Travel Excellence</span>
            </span>
          </div>

          {/* Direct Phone Line */}
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <a
              href={`tel:${BUSINESS_INFO.phoneTel}`}
              className="inline-flex items-center gap-1.5 text-white hover:text-cyan-300 font-semibold transition-colors"
              title="Call Infinity Club Holidays"
            >
              <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{BUSINESS_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Clean Flexbox: Logo (left), Links (center), Primary CTA (right) */}
      <nav
        className={`w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5'
            : 'bg-white py-3.5 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* 1. Brand Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center shrink-0 cursor-pointer group"
            aria-label="Infinity Club Holidays - Return to top"
          >
            <BrandLogo size="md" />
          </a>

          {/* 2. Desktop Nav Links (Evenly distributed center) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* 3. Primary CTA Button (Right) */}
          <div className="hidden md:flex items-center shrink-0">
            <button
              onClick={() => onOpenQuoteModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-800 shadow-md shadow-purple-600/25 hover:shadow-lg hover:shadow-purple-600/35 transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan My Holiday</span>
            </button>
          </div>

          {/* Mobile Actions: CTA + Hamburger */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-sm active:scale-95 transition-all"
            >
              Plan Trip
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuoteModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-700 shadow-md transition-all active:scale-98"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Plan My Holiday / Get Quote</span>
                </button>
                <a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-purple-600" />
                  <span>Call {BUSINESS_INFO.phoneFormatted}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
