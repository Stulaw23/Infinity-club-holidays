import { 
  Plane, 
  Hotel, 
  Luggage, 
  Ship, 
  Sparkles, 
  Heart, 
  Users, 
  Mountain, 
  Car, 
  Compass, 
  Globe, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { SERVICES_DATA } from '../data/travelData';
import { TravelService } from '../types';

interface ServicesSectionProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export default function ServicesSection({ onOpenQuoteModal }: ServicesSectionProps) {
  const getIcon = (iconName: string) => {
    const props = { className: "w-6 h-6" };
    switch (iconName) {
      case 'Plane': return <Plane {...props} className="w-6 h-6 text-sky-600" />;
      case 'Hotel': return <Hotel {...props} className="w-6 h-6 text-teal-600" />;
      case 'Luggage': return <Luggage {...props} className="w-6 h-6 text-sky-700" />;
      case 'Ship': return <Ship {...props} className="w-6 h-6 text-cyan-600" />;
      case 'Sparkles': return <Sparkles {...props} className="w-6 h-6 text-amber-500" />;
      case 'Heart': return <Heart {...props} className="w-6 h-6 text-rose-500" />;
      case 'Users': return <Users {...props} className="w-6 h-6 text-emerald-600" />;
      case 'Mountain': return <Mountain {...props} className="w-6 h-6 text-sky-600" />;
      case 'Car': return <Car {...props} className="w-6 h-6 text-teal-700" />;
      case 'Compass': return <Compass {...props} className="w-6 h-6 text-teal-600" />;
      case 'Globe': return <Globe {...props} className="w-6 h-6 text-sky-600" />;
      case 'Briefcase': return <Briefcase {...props} className="w-6 h-6 text-slate-700" />;
      default: return <Sparkles {...props} className="w-6 h-6 text-sky-600" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            <span>Comprehensive Travel Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
            Our Products & Services
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            From single domestic flight bookings and car rentals to complex multi-country honeymoons, ski excursions, and family safari packages — we manage every element with 21 years of care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service: TravelService) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon & Title */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-outfit leading-tight group-hover:text-sky-600 transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Bullet Features */}
                <div className="space-y-1.5 mb-4 pt-2 border-t border-slate-100">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-400">
                  {service.popularFor}
                </span>
                <button
                  onClick={() => onOpenQuoteModal(service.title)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors group-hover:translate-x-0.5 cursor-pointer"
                >
                  <span>Enquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate & Leisure Callout (Clean Modern Card on White) */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold font-outfit text-slate-900">
              &ldquo;For all your leisure and corporate business needs&rdquo;
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Need corporate business flights, car rentals, executive accommodation, or team conference travel? We handle accounts with dedicated prompt invoices and itinerary coordination.
            </p>
          </div>
          <button
            onClick={() => onOpenQuoteModal('Corporate & Leisure Travel')}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider transition-all shrink-0 shadow-sm cursor-pointer"
          >
            Corporate Enquiry
          </button>
        </div>

      </div>
    </section>
  );
}
