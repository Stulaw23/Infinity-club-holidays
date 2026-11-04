import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Instagram,
  Facebook,
  RotateCcw
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';

export default function ContactSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [refNumber, setRefNumber] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
  }>({});

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const validateForm = () => {
    const newErrors: {
      name?: string;
      phone?: string;
      email?: string;
      message?: string;
    } = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your full name (at least 2 characters).';
    }

    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || digitsOnly.length < 8) {
      newErrors.phone = 'Please provide a valid phone or WhatsApp number (at least 9 digits).';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email address (e.g. name@domain.com).';
      }
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a brief message of at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuickForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const generatedRef = `ICH-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setRefNumber(generatedRef);
      setFormSent(true);
    }, 600);
  };

  const handleResetForm = () => {
    setFormSent(false);
    setRefNumber('');
    setFormData({ name: '', phone: '', email: '', message: '' });
    setErrors({});
  };

  const whatsappDirectUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hi Cathy! I'm contacting you from the Infinity Club Holidays website to ask about your travel planning services."
  )}`;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "25 Edison street Longlands Strand 7140 South Africa"
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white text-slate-900 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageCircle className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>Contact &amp; Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit tracking-tight text-slate-900">
            We Are Ready To Plan Your Next Getaway
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Have questions about a holiday package, flights, or a tailor-made cruise? Reach out via WhatsApp, phone, email, or send us a quick inquiry below.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Location (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-sky-100/80 text-sky-700 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    Phone &amp; WhatsApp Direct Line
                  </div>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneTel}`}
                    className="text-lg font-bold text-slate-900 hover:text-sky-600 transition-colors block mt-0.5"
                  >
                    {BUSINESS_INFO.phoneFormatted}
                  </a>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Personal Travel Specialist • Strand Office
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col gap-2 shrink-0">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => copyToClipboard(BUSINESS_INFO.phone, 'phone')}
                  className="px-3 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-medium transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  {copiedField === 'phone' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === 'phone' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-teal-100/80 text-teal-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    Email Address
                  </div>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-sm sm:text-base font-bold text-slate-900 hover:text-sky-600 transition-colors block mt-0.5 break-all"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Itineraries &amp; booking enquiries
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col gap-2 shrink-0">
                <button
                  onClick={() => copyToClipboard(BUSINESS_INFO.email, 'email')}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'email' ? 'Copied' : 'Copy Email'}</span>
                </button>
              </div>
            </div>

            {/* Address Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-sky-100/80 text-sky-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Business Address
                    </div>
                    <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                      {BUSINESS_INFO.address.street}
                    </div>
                    <div className="text-xs text-slate-600">
                      {BUSINESS_INFO.address.suburb}, {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.postalCode}
                    </div>
                    <div className="text-xs text-slate-500">
                      {BUSINESS_INFO.address.province}, South Africa
                    </div>
                  </div>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-all shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>

            {/* Opening Hours Widget */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-100/80 text-teal-700">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  Operating &amp; Business Hours
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <div className="text-slate-500 font-medium">Mon to Fri</div>
                  <div className="text-slate-900 font-bold mt-0.5">8:00 AM – 6:00 PM</div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <div className="text-slate-500 font-medium">Saturdays</div>
                  <div className="text-slate-900 font-bold mt-0.5">9:00 AM – 12:00 PM</div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <div className="text-slate-500 font-medium">Sundays &amp; Holidays</div>
                  <div className="text-slate-500 font-bold mt-0.5">Closed</div>
                </div>
              </div>
            </div>

            {/* Social media */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-sky-800 font-bold">
                  Connect on Social Media
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Follow us for holiday promotions and travel inspiration
                </div>
              </div>
              
              <div className="flex items-center gap-2.5">
                <a
                  href={BUSINESS_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
                <a
                  href={BUSINESS_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Travel Inquiry Form with Complete Validation & Confirmation (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Inquiry Submission</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold font-outfit text-slate-900 mb-1.5">
              Send a Travel Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              Tell us about your desired destination, traveler count, and timeframe. We review your request and contact you directly with tailored recommendations.
            </p>

            {formSent ? (
              <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-slate-900 font-outfit">
                    Inquiry Received Successfully!
                  </h4>
                  <p className="text-xs text-sky-700 font-mono mt-1 font-semibold">
                    Reference #{refNumber}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="text-slate-700">
                    <strong className="text-slate-900">Traveler:</strong> {formData.name}
                  </div>
                  <div className="text-slate-700">
                    <strong className="text-slate-900">Contact:</strong> {formData.phone} {formData.email ? `• ${formData.email}` : ''}
                  </div>
                  <div className="text-slate-700">
                    <strong className="text-slate-900">Inquiry Details:</strong> {formData.message}
                  </div>
                </div>

                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Cathy Lawrence has received your travel inquiry and will be in touch with personalized pricing and options.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Hi Cathy! I submitted inquiry ref #${refNumber} on the Infinity Club Holidays website: "${formData.message}"`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Copy to WhatsApp</span>
                  </a>

                  <button
                    onClick={handleResetForm}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuickForm} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="e.g. Michael van der Berg"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white placeholder:text-slate-400 transition-all"
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="e.g. 084 123 4567"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white placeholder:text-slate-400 transition-all"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="e.g. yourname@domain.co.za"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white placeholder:text-slate-400 transition-all"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1">
                    Trip Wishlist or Question *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Where are you planning to go? What dates, number of travelers, or budget do you have in mind?"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white placeholder:text-slate-400 leading-relaxed transition-all"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Form Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm shadow-sky-600/20 active:scale-98 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Travel Inquiry</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Hi Cathy! My name is ${formData.name || 'a website visitor'}. ${formData.message || 'I would like to inquire about booking a holiday.'}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>

                <p className="text-[11px] text-slate-500 text-center">
                  🔒 Strictly confidential. No marketing spam. Direct personal travel support.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
