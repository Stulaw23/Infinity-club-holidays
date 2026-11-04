import { useState } from 'react';
import { MapPin, Calendar, Sparkles, ArrowRight, Compass } from 'lucide-react';
import { DESTINATIONS_SPOTLIGHT } from '../data/travelData';
import { DestinationSpotlight } from '../types';

interface DestinationsGalleryProps {
  onOpenQuoteModal: (destinationName?: string) => void;
}

export default function DestinationsGallery({ onOpenQuoteModal }: DestinationsGalleryProps) {
  const [filter, setFilter] = useState<'all' | 'local' | 'international'>('all');

  const filteredDestinations = DESTINATIONS_SPOTLIGHT.filter((dest) => {
    if (filter === 'all') return true;
    return dest.category === filter;
  });

  return (
    <section id="destinations" className="py-16 sm:py-20 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            <span>Destination Inspiration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
            Where Will Your Next Adventure Begin?
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            From the wild African savannah and pristine Cape beaches to exotic spice islands and cobblestone European alleys, explore our hand-picked favorites.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              All Destinations
            </button>
            <button
              onClick={() => setFilter('local')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === 'local'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              Local South Africa
            </button>
            <button
              onClick={() => setFilter('international')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === 'international'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              International Gems
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest: DestinationSpotlight) => (
            <div
              key={dest.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo with zoom effect */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-slate-900 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    {dest.category === 'local' ? '🇿🇦 South Africa' : '✈️ International'}
                  </div>

                  {/* Title & Region */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-teal-300 font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{dest.region}</span>
                    </div>
                    <h3 className="text-xl font-bold font-outfit text-white leading-tight">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-xs text-slate-600 italic mb-4">
                    &ldquo;{dest.tagline}&rdquo;
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Calendar className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span><strong>Best Season:</strong> {dest.bestTimeToVisit}</span>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Signature Highlights
                    </div>
                    {dest.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <Sparkles className="w-3 h-3 text-teal-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenQuoteModal(dest.name)}
                  className="w-full py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer"
                >
                  <span>Plan a Trip to {dest.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
