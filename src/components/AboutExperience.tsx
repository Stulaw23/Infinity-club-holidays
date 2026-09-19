import { Award, HeartHandshake, ShieldCheck, PhoneCall, Sparkles, Check, X, MessageCircle } from 'lucide-react';
import BusinessCardPreview from './BusinessCardPreview';
import { BUSINESS_INFO, WHY_CHOOSE_US_POINTS } from '../data/travelData';

interface AboutExperienceProps {
  onOpenQuoteModal: () => void;
}

export default function AboutExperience({ onOpenQuoteModal }: AboutExperienceProps) {
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hi Cathy! I'd love to chat with you regarding planning a holiday."
  )}`;

  return (
    <section id="experience" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>21 Years In The Travel Industry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit tracking-tight">
            Why 21 Years of Experience Matters
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            You are not simply booking a flight or hotel on a faceless algorithm. You are getting the personal guidance, negotiated rates, and caring assistance of Cathy Lawrence — an experienced travel professional dedicated to your holiday from start to finish.
          </p>
        </div>

        {/* 2-Column Story & Business Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: The Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-outfit text-white">
                No One-Size-Fits-All Approach. Your Holiday, Your Budget.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Over the past 21 years, the travel world has changed dramatically, but one thing remains constant: travelers want genuine peace of mind. We take the time to listen to what you love doing, who you are traveling with, and what budget you have in mind.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether it is knowing which Mauritius resort has calm waters for young toddlers, securing an ocean-view cabin on a Mediterranean cruise, or organizing a reliable 4x4 self-drive through the Kruger, our real-world knowledge saves you time, money, and costly mistakes.
              </p>
            </div>

            {/* Quick Benefits Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Honest advice on best seasons & weather',
                'Pre-arranged flight, hotel & transfer bundles',
                'No hidden fees or unexpected extras',
                'Direct WhatsApp contact if schedules change',
                'Assistance with special requests & dietary needs',
                'Leisure getaways & corporate business travel'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Quote CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenQuoteModal}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-purple-600/30"
              >
                Start Planning With Cathy
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Cathy Directly</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Digital Business Card */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="text-center mb-3">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
                Meet Your Travel Specialist
              </span>
            </div>
            <BusinessCardPreview />
            <div className="mt-3 text-center text-xs text-slate-400">
              📍 Based in Strand, Western Cape • Arranging travel worldwide
            </div>
          </div>

        </div>

        {/* Comparison: Online Booking Engines vs Infinity Club Holidays */}
        <div className="mt-16 rounded-3xl bg-slate-950/80 border border-slate-800 p-6 sm:p-8 lg:p-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white">
              The Infinity Club Difference
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Why travellers across South Africa trust Cathy Lawrence over booking alone online
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Anonymous Online Engine */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <X className="w-5 h-5 shrink-0" />
                <span>DIY Online Booking Engines</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-400">
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

            {/* Infinity Club Holidays */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 via-purple-900/20 to-slate-900 border border-purple-500/40 space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <Check className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>Infinity Club Holidays with Cathy</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>21 years of vetted knowledge: we only recommend places and airlines we trust.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Clear, all-inclusive pricing with flights, transfers, accommodation, and guidance bundled.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Direct WhatsApp contact with your personal agent before, during, and after travel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
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
