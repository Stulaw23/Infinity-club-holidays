import { useState, useEffect } from 'react';
import { X, Send, MessageCircle, Calendar, Users, MapPin, Sparkles, CheckCircle2, Phone, Mail, HelpCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';
import { QuoteRequest } from '../types';

interface QuotePlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageTitle?: string;
  initialCategory?: string;
}

export default function QuotePlannerModal({
  isOpen,
  onClose,
  initialPackageTitle = '',
  initialCategory = ''
}: QuotePlannerModalProps) {
  const [formData, setFormData] = useState<QuoteRequest>({
    fullName: '',
    phone: '',
    email: '',
    preferredContact: 'whatsapp',
    destinationType: 'island',
    destinationDetail: initialPackageTitle || '',
    departureCity: 'Cape Town (CPT)',
    travelDates: '',
    flexibleDates: true,
    durationNights: '7 Nights',
    adults: 2,
    children: 0,
    childrenAges: '',
    budgetPerPerson: 'R15,000 - R25,000',
    tripStyle: ['Beach & Relaxation'],
    additionalNotes: '',
    selectedPackageTitle: initialPackageTitle || ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialPackageTitle) {
      setFormData((prev) => ({
        ...prev,
        selectedPackageTitle: initialPackageTitle,
        destinationDetail: initialPackageTitle
      }));
    }
  }, [initialPackageTitle]);

  if (!isOpen) return null;

  const handleTripStyleToggle = (style: string) => {
    setFormData((prev) => {
      const exists = prev.tripStyle.includes(style);
      return {
        ...prev,
        tripStyle: exists
          ? prev.tripStyle.filter((s) => s !== style)
          : [...prev.tripStyle, style]
      };
    });
  };

  const generateWhatsAppMessage = () => {
    return `*TRAVEL ENQUIRY - Infinity Club Holidays*\n` +
      `--------------------------------\n` +
      `*Name:* ${formData.fullName || 'Not provided'}\n` +
      `*Contact:* ${formData.phone || 'N/A'} | ${formData.email || 'N/A'}\n` +
      `*Preferred:* ${formData.preferredContact.toUpperCase()}\n` +
      `*Holiday / Destination:* ${formData.destinationDetail || formData.destinationType}\n` +
      `*Departure City:* ${formData.departureCity}\n` +
      `*Dates:* ${formData.travelDates || 'Flexible'} (${formData.durationNights})\n` +
      `*Travelers:* ${formData.adults} Adults${formData.children > 0 ? `, ${formData.children} Children (Ages: ${formData.childrenAges || 'N/A'})` : ''}\n` +
      `*Budget Est:* ${formData.budgetPerPerson} per person\n` +
      `*Trip Style:* ${formData.tripStyle.join(', ') || 'Tailor-made'}\n` +
      (formData.additionalNotes ? `*Notes:* ${formData.additionalNotes}\n` : '') +
      `--------------------------------\n` +
      `Looking forward to your personalised travel proposal!`;
  };

  const handleSendViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = generateWhatsAppMessage();
    const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  const handleSubmitDirect = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-cyan-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>21 Years Experience • 100% Free Custom Quotes</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit">
            Plan My Holiday / Request a Quote
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-lg">
            Tell Cathy about your dream holiday and budget. We will personally research, package, and present the best options.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-outfit text-slate-900">
              Enquiry Received!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.fullName || 'friend'}</strong>! Cathy Lawrence from Infinity Club Holidays is reviewing your travel requirements and will be in touch promptly.
            </p>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="font-bold text-purple-900">Need an instant response?</div>
              <p className="text-slate-600">
                You can chat directly with Cathy right now on WhatsApp or call her during office hours (Mon-Fri 8am-6pm).
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Open In WhatsApp</span>
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {BUSINESS_INFO.phoneFormatted}</span>
                </a>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendViaWhatsApp} className="p-6 sm:p-8 max-h-[72vh] overflow-y-auto space-y-6">
            
            {/* Step 1: Destination & Holiday Type */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>1. Where Would You Like To Go?</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="planner-destination-type" className="block text-xs font-semibold text-slate-700 mb-1">
                    Destination Category
                  </label>
                  <select
                    id="planner-destination-type"
                    value={formData.destinationType}
                    onChange={(e) => setFormData({ ...formData, destinationType: e.target.value as any })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  >
                    <option value="island">Tropical Island (Mauritius / Zanzibar / Maldives)</option>
                    <option value="local-sa">Local South Africa (Kruger / Cape / Garden Route)</option>
                    <option value="cruise">Ocean or River Cruise</option>
                    <option value="international">Europe, UK, USA or Asia</option>
                    <option value="ski">Ski & Snow Holidays (Alps)</option>
                    <option value="unsure">Not sure yet (Need Recommendations)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="planner-destination-detail" className="block text-xs font-semibold text-slate-700 mb-1">
                    Specific Destination / Package (Optional)
                  </label>
                  <input
                    id="planner-destination-detail"
                    type="text"
                    placeholder="e.g. Mauritius All-Inclusive or Kruger Safari"
                    value={formData.destinationDetail}
                    onChange={(e) => setFormData({ ...formData, destinationDetail: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Dates & Travelers */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>2. Dates & Travel Party</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="planner-departure-city" className="block text-xs font-semibold text-slate-700 mb-1">
                    Departure Airport / City
                  </label>
                  <select
                    id="planner-departure-city"
                    value={formData.departureCity}
                    onChange={(e) => setFormData({ ...formData, departureCity: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  >
                    <option value="Cape Town (CPT)">Cape Town (CPT)</option>
                    <option value="Johannesburg (JNB)">Johannesburg (JNB / OR Tambo)</option>
                    <option value="Durban (DUR)">Durban (King Shaka)</option>
                    <option value="George (GRJ)">George (GRJ)</option>
                    <option value="Port Elizabeth (PLZ)">Gqeberha / Port Elizabeth</option>
                    <option value="No Flights Needed (Ground Only)">No Flights Needed (Self-Drive)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="planner-travel-dates" className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Dates / Month
                  </label>
                  <input
                    id="planner-travel-dates"
                    type="text"
                    placeholder="e.g. Dec 2026 or Easter Holidays"
                    value={formData.travelDates}
                    onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="planner-duration-nights" className="block text-xs font-semibold text-slate-700 mb-1">
                    Duration
                  </label>
                  <select
                    id="planner-duration-nights"
                    value={formData.durationNights}
                    onChange={(e) => setFormData({ ...formData, durationNights: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  >
                    <option value="Weekend / 3 Nights">Weekend / 3 Nights</option>
                    <option value="5 Nights">5 Nights</option>
                    <option value="7 Nights (1 Week)">7 Nights (1 Week)</option>
                    <option value="10 to 14 Nights">10 to 14 Nights</option>
                    <option value="14+ Nights">14+ Nights</option>
                  </select>
                </div>
              </div>

              {/* Adults & Kids count */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <label htmlFor="planner-adults" className="block text-xs font-semibold text-slate-700 mb-1">
                    Adults (12+ yrs)
                  </label>
                  <input
                    id="planner-adults"
                    type="number"
                    min={1}
                    max={30}
                    value={formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) || 1 })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="planner-children" className="block text-xs font-semibold text-slate-700 mb-1">
                    Children (Under 12)
                  </label>
                  <input
                    id="planner-children"
                    type="number"
                    min={0}
                    max={15}
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="planner-children-ages" className="block text-xs font-semibold text-slate-700 mb-1">
                    Children Ages (for resort rates)
                  </label>
                  <input
                    id="planner-children-ages"
                    type="text"
                    placeholder="e.g. 4, 8"
                    disabled={formData.children === 0}
                    value={formData.childrenAges}
                    onChange={(e) => setFormData({ ...formData, childrenAges: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Holiday Style & Budget */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>3. Style & Budget Preference</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Trip Style Preferences (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Beach & Relaxation',
                    'All-Inclusive',
                    'Honeymoon / Romance',
                    'Family Friendly',
                    'Safari & Wildlife',
                    'Luxury & 5-Star',
                    'Sightseeing & Culture',
                    'Adventure & Ski',
                    'Cruise'
                  ].map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => handleTripStyleToggle(style)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        formData.tripStyle.includes(style)
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {formData.tripStyle.includes(style) && '✓ '}
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="planner-budget-range" className="block text-xs font-semibold text-slate-700 mb-1">
                  Estimated Budget Range Per Person
                </label>
                <select
                  id="planner-budget-range"
                  value={formData.budgetPerPerson}
                  onChange={(e) => setFormData({ ...formData, budgetPerPerson: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  <option value="Under R12,000">Affordable / Under R12,000</option>
                  <option value="R12,000 - R20,000">R12,000 - R20,000</option>
                  <option value="R20,000 - R35,000">R20,000 - R35,000</option>
                  <option value="R35,000 - R50,000">R35,000 - R50,000</option>
                  <option value="R50,000+ Luxury">R50,000+ Luxury & Milestone</option>
                  <option value="Help me determine budget">Help me determine best budget</option>
                </select>
              </div>
            </div>

            {/* Step 4: Contact Details */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>4. Your Contact Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="planner-fullname" className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="planner-fullname"
                    type="text"
                    required
                    placeholder="e.g. Cathy Botha"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="planner-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="planner-phone"
                    type="tel"
                    required
                    placeholder="e.g. 082 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="planner-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="planner-email"
                    type="email"
                    placeholder="e.g. yourname@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="planner-preferred-contact" className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Contact Method
                  </label>
                  <select
                    id="planner-preferred-contact"
                    value={formData.preferredContact}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as any })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  >
                    <option value="whatsapp">WhatsApp (Fastest response)</option>
                    <option value="call">Phone Call</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="planner-additional-notes" className="block text-xs font-semibold text-slate-700 mb-1">
                  Additional Notes or Special Wishes (Optional)
                </label>
                <textarea
                  id="planner-additional-notes"
                  rows={2}
                  placeholder="Tell us about special occasions (anniversary, honeymoon), flight preferences, or must-have activities..."
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Directly via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitDirect}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-purple-600/20"
              >
                <Send className="w-4 h-4" />
                <span>Submit Enquiry Form</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              🔒 Your contact information is kept strictly confidential and only used by Infinity Club Holidays to prepare your travel quote.
            </p>

          </form>
        )}

      </div>
    </div>
  );
}
