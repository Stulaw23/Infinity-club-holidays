import { Sparkles, Check, X, MessageCircle, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import BusinessCardPreview from './BusinessCardPreview';
import { BUSINESS_INFO } from '../data/travelData';

interface AboutExperienceProps {
  onOpenQuoteModal: () => void;
}

export default function AboutExperience({ onOpenQuoteModal }: AboutExperienceProps) {
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hi Cathy! I'm contacting you from the Infinity Club Holidays website and would love some travel assistance."
  )}`;

  return (
    <section id="experience" className="py-16 sm:py-20 bg-white text-slate-900 relative border-t border-slate-100">
      {/* Anchor targets for smooth scrolling and backward compatibility */}
      <span id="why-choose-us" className="absolute -top-24" />
      <span id="about-founder" className="absolute -top-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
            21 Years of Travel Excellence &amp; Personal Care
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            No call centers, no generic algorithms. Cathy Lawrence works directly with you to craft seamless journeys tailored to your budget and travel dreams.
          </p>
        </div>

        {/* 2-Column Philosophy & Business Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit text-slate-900 tracking-tight">
                No One-Size-Fits-All Approach. Your Holiday, Your Budget.
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Over the past 21 years, the travel world has changed dramatically, but one thing remains constant: travelers want genuine peace of mind. We take the time to listen to what you love doing, who you are traveling with, and what budget you have in mind.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether it is knowing which Mauritius resort has calm waters for young toddlers, securing an ocean-view cabin on a Mediterranean cruise, or organizing a reliable 4x4 self-drive through the Kruger, our real-world knowledge saves you time, money, and costly mistakes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Honest advice on best seasons & weather',
                'Pre-arranged flight, hotel & transfer bundles',
                'No hidden fees or unexpected extras',
                'Direct WhatsApp contact if schedules change',
                'Assistance with special requests & dietary needs',
                'Leisure getaways & corporate business travel'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-200">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenQuoteModal}
                className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md shadow-sky-600/20 cursor-pointer active:scale-95"
              >
                Start Planning With Us
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Directly</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="text-center mb-3">
              <span className="text-xs uppercase tracking-widest text-sky-700 font-bold">
                Meet Your Dedicated Travel Consultant
              </span>
            </div>
            <BusinessCardPreview />
            <div className="mt-3 text-center text-xs text-slate-500">
              📍 Based in Strand, Western Cape • Arranging travel worldwide
            </div>
          </div>
        </div>

        {/* Comparison: Online Booking Engines vs Infinity Club Holidays */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold font-outfit text-slate-900">
              The Infinity Club Difference
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Why travellers across South Africa trust our personal service over booking alone online
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DIY Column */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <X className="w-5 h-5 shrink-0" />
                <span>DIY Online Booking Engines</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>Hours spent endlessly scrolling reviews and comparing disjointed flight times.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>Hidden taxes, resort fees, baggage charges, and transfer traps in fine print.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>When a flight is cancelled or delayed, you wait on hold with an overseas call center.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>Generic rooms with no advocacy for upgrades or special celebrations.</span>
                </li>
              </ul>
            </div>

            {/* Infinity Club Holidays Column */}
            <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
                <Check className="w-5 h-5 text-teal-600 shrink-0" />
                <span>Infinity Club Holidays</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>21 years of vetted knowledge: we only recommend places and airlines we trust.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>Clear, all-inclusive pricing with flights, transfers, accommodation, and guidance bundled.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>Direct WhatsApp contact with your personal agent before, during, and after travel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>Personalized perks for honeymoons, birthdays, anniversaries, and family rooms.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
