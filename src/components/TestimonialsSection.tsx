import { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, CheckCircle2, MessageCircle, X, PenLine, Heart, Facebook } from 'lucide-react';
import { TESTIMONIALS_DATA, BUSINESS_INFO } from '../data/travelData';
import { Testimonial } from '../types';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      // Ensure any legacy mock reviews from prior iterations are wiped clean
      localStorage.removeItem('infinity_club_reviews');
      const saved = localStorage.getItem('infinity_club_client_reviews_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // ignore
    }
    return [];
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Review submission state
  const [authorName, setAuthorName] = useState('');
  const [tripType, setTripType] = useState('Honeymoon / Couples');
  const [destination, setDestination] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('infinity_club_client_reviews_v2', JSON.stringify(testimonials));
    } catch (e) {
      // ignore
    }
  }, [testimonials]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      name: authorName.trim(),
      location: 'South Africa',
      tripType,
      destination: destination.trim() || 'Custom Holiday',
      rating,
      comment: reviewText.trim(),
      date: 'Just Now',
      verified: true
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setSubmittedMessage(true);

    setTimeout(() => {
      setSubmittedMessage(false);
      setModalOpen(false);
      setAuthorName('');
      setReviewText('');
      setDestination('');
    }, 2400);
  };

  const sendReviewViaWhatsApp = () => {
    const text = `Hi Cathy! Here is my review for Infinity Club Holidays:\n\nName: ${authorName || 'A Happy Client'}\nTrip: ${tripType} to ${destination || 'Our Holiday'}\nRating: ${'⭐'.repeat(rating)}\n\n"${reviewText || 'Thank you Cathy for your wonderful travel service!'}"`;
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="testimonials" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
              <MessageSquareQuote className="w-3.5 h-3.5 text-purple-600" />
              <span>Client Experiences & Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
              Have You Traveled With Cathy?
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              With 21 years of personal travel consulting, every holiday is crafted with dedicated care. If Cathy helped plan your flight, safari, cruise, or island getaway, we would love to hear your feedback!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95"
            >
              <PenLine className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                "Hi Cathy! I'd like to share my holiday feedback and review for Infinity Club Holidays."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Review on WhatsApp</span>
            </a>
            <a
              href={BUSINESS_INFO.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all shadow-sm"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              <span>Facebook Page</span>
            </a>
          </div>
        </div>

        {/* Display Testimonials or Invitation Banner */}
        {testimonials.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-purple-50 via-slate-50 to-cyan-50 border border-purple-100 text-center max-w-4xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-md text-purple-600 flex items-center justify-center mx-auto mb-4 border border-purple-100">
              <Heart className="w-7 h-7 text-purple-600 fill-purple-100" />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-outfit">
              Share Your Holiday Story
            </h3>
            
            <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Did Cathy coordinate your flights, recommend that perfect Mauritius resort, or handle your safari transfers? Your genuine review helps other South African travelers book with total peace of mind.
            </p>

            <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <PenLine className="w-4 h-4" />
                <span>Leave a Review</span>
              </button>
              
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                  "Hi Cathy! Here is my review of our recent trip planned with Infinity Club Holidays: "
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send to Cathy on WhatsApp</span>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-purple-200/60 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Verified Personal Travel Agent
              </span>
              <span>•</span>
              <span>21 Years of Hands-On Industry Care</span>
              <span>•</span>
              <span>Strand, Western Cape & Nationwide</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Rating stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Comment quote */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                    &ldquo;{test.comment}&rdquo;
                  </p>
                </div>

                {/* Author info */}
                <div className="pt-4 border-t border-slate-200/70">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-outfit">
                        {test.name}
                      </h4>
                      <span className="text-[11px] text-slate-500 block">
                        {test.location} • {test.destination}
                      </span>
                    </div>
                    {test.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-[10px] text-purple-600 font-medium">
                    {test.tripType} ({test.date})
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Write a review modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
              
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500"
                aria-label="Close review modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h3 className="text-xl font-bold font-outfit text-slate-900">
                  Share Your Travel Experience
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Did Cathy help plan your holiday? We would love to hear your feedback and feature your review!
                </p>
              </div>

              {submittedMessage ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Thank You For Your Review!
                  </h4>
                  <p className="text-xs text-slate-600">
                    Your testimonial has been submitted. Cathy and the Infinity Club Holidays team appreciate your support!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div>
                    <label htmlFor="review-author" className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      id="review-author"
                      type="text"
                      required
                      placeholder="e.g. David & Lisa Botha"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="review-trip-type" className="block text-xs font-bold text-slate-700 mb-1">
                        Trip Type
                      </label>
                      <select
                        id="review-trip-type"
                        value={tripType}
                        onChange={(e) => setTripType(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                      >
                        <option value="Honeymoon">Honeymoon</option>
                        <option value="Family Holiday">Family Holiday</option>
                        <option value="Island Getaway">Island Getaway</option>
                        <option value="Cruise">Cruise</option>
                        <option value="Safari">Safari / Local SA</option>
                        <option value="International Trip">International Trip</option>
                        <option value="Ski Holiday">Ski Holiday</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="review-destination" className="block text-xs font-bold text-slate-700 mb-1">
                        Destination
                      </label>
                      <input
                        id="review-destination"
                        type="text"
                        placeholder="e.g. Mauritius / Kruger"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="block text-xs font-bold text-slate-700 mb-1">
                      Rating
                    </div>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          aria-label={`Rate ${star} out of 5 stars`}
                          onClick={() => setRating(star)}
                          className="p-1 focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-slate-500 font-semibold ml-2">
                        {rating} out of 5 stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="review-text" className="block text-xs font-bold text-slate-700 mb-1">
                      Your Review / Experience *
                    </label>
                    <textarea
                      id="review-text"
                      required
                      rows={4}
                      placeholder="How did Cathy assist with your flights, hotels, or holiday planning? What was your highlight?"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                    >
                      Post Review
                    </button>
                    <button
                      type="button"
                      onClick={sendReviewViaWhatsApp}
                      className="w-full sm:w-auto py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
