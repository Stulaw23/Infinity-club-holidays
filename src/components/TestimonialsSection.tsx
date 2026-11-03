import { useState, useEffect, useRef } from 'react';
import {
  Star,
  MessageSquareQuote,
  CheckCircle2,
  Send,
  Sparkles,
  MapPin,
  Compass,
  Calendar,
  X,
} from 'lucide-react';
import { ReviewData } from '../types';

/**
 * Database integration function ready to connect to:
 * - Firebase Cloud Firestore (e.g., addDoc(collection(db, 'reviews'), reviewData))
 * - Google Sheets API
 * - REST API / Express backend route
 *
 * Currently simulates the async persistence layer before updating local client state.
 */
export async function saveReviewToDatabase(reviewData: ReviewData): Promise<boolean> {
  // Simulates an async backend or Firestore round-trip
  await new Promise((resolve) => setTimeout(resolve, 300));
  return true;
}

export default function TestimonialsSection() {
  // 1. Dynamic state to store submitted reviews locally & sync with localStorage
  const [reviews, setReviews] = useState<ReviewData[]>(() => {
    try {
      // Purge any legacy mock review storage keys
      localStorage.removeItem('infinity_club_client_reviews_v3');
      localStorage.removeItem('infinity_club_client_reviews_v4');
      localStorage.removeItem('infinity_club_guest_reviews_v5');
      localStorage.removeItem('infinity_club_direct_reviews_v6');

      const saved = localStorage.getItem('infinity_club_guest_reviews_v7');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Sync reviews state to browser localStorage
  useEffect(() => {
    try {
      localStorage.setItem('infinity_club_guest_reviews_v7', JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  // Form input fields matching ReviewData
  const [fullName, setFullName] = useState('');
  const [holidayType, setHolidayType] = useState('Holiday Package');
  const [destination, setDestination] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  // UI status states
  const [errors, setErrors] = useState<{ fullName?: string; feedback?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; feedback?: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (minimum 2 characters)';
    }
    if (!feedback.trim() || feedback.trim().length < 10) {
      newErrors.feedback = 'Please share your experience (minimum 10 characters)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const formattedDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const newReview: ReviewData = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      fullName: fullName.trim(),
      holidayType: holidayType || 'Holiday Package',
      destination: destination.trim() || 'Custom Getaway',
      rating,
      feedback: feedback.trim(),
      date: formattedDate,
    };

    try {
      // Call async database function ready for Firebase / API connection
      await saveReviewToDatabase(newReview);

      // Append new review object to state array (reverse chronological order - newest first)
      setReviews((prev) => [newReview, ...prev]);

      // Clear the form inputs
      setFullName('');
      setHolidayType('Holiday Package');
      setDestination('');
      setFeedback('');
      setRating(5);
      setHoverRating(0);

      // Briefly show toast / notification: "Thank you! Your review has been published."
      setShowToast(true);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      toastTimeoutRef.current = setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-50/70 border-t border-slate-200/80 relative">
      {/* Toast Notification */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-emerald-500/40 flex items-center gap-3.5 animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs sm:text-sm font-medium text-slate-100">
            Thank you! Your review has been published.
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-xs">
            <MessageSquareQuote className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>Client Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
            Guest Reviews &amp; Feedback
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We value direct feedback from every traveler who books with Infinity Club Holidays. Share your thoughts or read genuine reflections from past journeys.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column (7 cols): Brand & Welcome Section + Beach Image + Dynamic "Guest Experiences" Feed */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col">
            <div>
              {/* Brand Header */}
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 mb-3">
                <Compass className="w-3.5 h-3.5 text-purple-600" />
                <span>Infinity Club Holidays</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit text-slate-900 tracking-tight">
                Tell Us About Your Journey
              </h3>

              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                At Infinity Club Holidays, we are dedicated to crafting unforgettable travel experiences. Whether you have recently returned from a custom getaway or a packaged holiday, we would love to hear about your experience. Your feedback helps us continue to deliver exceptional service.
              </p>

              {/* High-Resolution Tropical Beach Resort Visual */}
              <div className="mt-6 overflow-hidden rounded-2xl shadow-md border border-slate-200 relative group">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
                  alt="Tropical luxury beach resort with turquoise water and palm trees"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex items-end p-4 sm:p-5">
                  <div className="text-white">
                    <span className="text-xs uppercase tracking-wider font-semibold text-cyan-300">
                      Endless Travel Possibilities
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5">
                      Tailored holidays, flights, and island escapes crafted with 21 years of expertise.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Reviews Feed (Directly Below the Beach Image) */}
            <div className="mt-8 pt-6 border-t border-slate-200/90">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquareQuote className="w-4 h-4 text-purple-600" />
                  <h4 className="text-base sm:text-lg font-bold font-outfit text-slate-900 tracking-tight">
                    Guest Experiences
                  </h4>
                </div>
                {reviews.length > 0 && (
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                    {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                  </span>
                )}
              </div>

              {/* Initial State (Empty) vs Active State (Cards in reverse chronological order) */}
              {reviews.length === 0 ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center">
                  <p className="text-xs sm:text-sm text-slate-500 font-medium italic">
                    No reviews yet — be the first to share your experience above.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200/90 hover:border-purple-200 transition-all duration-200 shadow-xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h5 className="font-bold text-slate-900 font-outfit text-sm sm:text-base">
                            {rev.fullName}
                          </h5>
                          <div className="flex flex-wrap items-center gap-2 text-slate-500 text-xs mt-0.5">
                            {rev.destination && (
                              <span className="inline-flex items-center gap-1 font-semibold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-md text-[11px]">
                                <MapPin className="w-3 h-3 text-purple-600" />
                                {rev.destination}
                              </span>
                            )}
                            {rev.holidayType && (
                              <span className="text-slate-500 text-[11px] font-medium">
                                • {rev.holidayType}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <div className="flex text-amber-400" aria-label={`${rev.rating} out of 5 stars`}>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < rev.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'fill-slate-200 text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                          {rev.date && (
                            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {rev.date}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal italic">
                        &ldquo;{rev.feedback}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column (5 cols): Streamlined "Share Your Experience" Form */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Client Feedback</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white tracking-tight">
                Share Your Experience
              </h3>
              
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Traveled with us? Tell us about your experience.
              </p>

              {/* Inline Published Success Alert */}
              {showToast && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-xs text-emerald-200 flex items-center gap-2.5 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Thank you! Your review has been published.</span>
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="mt-6 space-y-4">
                {/* 1. Full Name * */}
                <div>
                  <label htmlFor="review-fullname" className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="review-fullname"
                    type="text"
                    required
                    placeholder="e.g., Sarah Jenkins"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700/80 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder:text-slate-500 transition-all shadow-inner"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* 2. Holiday Type (dropdown) & 3. Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="review-holiday-type" className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Holiday Type
                    </label>
                    <select
                      id="review-holiday-type"
                      value={holidayType}
                      onChange={(e) => setHolidayType(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-3 rounded-xl bg-slate-800/90 border border-slate-700/80 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all shadow-inner"
                    >
                      <option value="Holiday Package">Holiday Package</option>
                      <option value="Island Getaway">Island Getaway</option>
                      <option value="European Tour">European Tour</option>
                      <option value="Safari / Wildlife">Safari / Wildlife</option>
                      <option value="Ocean Cruise">Ocean Cruise</option>
                      <option value="Custom Itinerary">Custom Itinerary</option>
                      <option value="Flights & Hotels">Flights & Hotels</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="review-destination" className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Destination
                    </label>
                    <input
                      id="review-destination"
                      type="text"
                      placeholder="e.g., Mauritius, Italy"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700/80 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder:text-slate-500 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* 4. Star Rating * */}
                <div>
                  <div className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Star Rating *
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        aria-label={`Select ${star} stars`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none transition-transform hover:scale-115 active:scale-95 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= (hoverRating || rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-600 hover:text-slate-400'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-300 ml-2">
                      {hoverRating || rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* 5. Your Experience & Feedback * */}
                <div>
                  <label htmlFor="review-feedback" className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Your Experience &amp; Feedback *
                  </label>
                  <textarea
                    id="review-feedback"
                    required
                    rows={4}
                    placeholder="Share details about your trip, accommodation, or booking service..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full text-xs sm:text-sm p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder:text-slate-500 leading-relaxed transition-all shadow-inner"
                  />
                  {errors.feedback && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.feedback}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>SUBMITTING...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SUBMIT REVIEW</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-400 text-center font-normal">
                  ✨ Direct client submission.
                </p>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
