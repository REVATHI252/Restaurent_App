'use client';

import React, { useState } from 'react';
import {
  Star,
  MessageSquareHeart,
  X,
  Sparkles,
  CheckCircle2,
  Send,
  Award,
  HeartHandshake,
} from 'lucide-react';

export function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('Food Quality');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [outletName, setOutletName] = useState('Secunderabad Flagship');
  const [favoriteDish, setFavoriteDish] = useState('Royal Mutton Dum Biryani');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ratingLabels: { [key: number]: string } = {
    1: 'Needs Improvement',
    2: 'Fair Experience',
    3: 'Good & Satisfactory',
    4: 'Very Good Taste & Service',
    5: '👑 Royal Nizam Excellence (5/5)',
  };

  const categories = [
    'Food Quality',
    'Packaging',
    'Delivery Speed',
    'Dine-in Experience',
    'General',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          rating,
          category,
          outletName,
          favoriteDish,
          comments,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error('Feedback submit error:', err);
      setIsSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setComments('');
    setIsSubmitted(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Feedback Trigger Pill */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-gradient-to-r from-paradise-maroon-900 to-paradise-maroon-950 text-paradise-gold-300 font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-full border-2 border-paradise-gold-500 shadow-royal-lg hover:shadow-gold-glow transition-all transform hover:-translate-y-1 active:scale-95"
      >
        <MessageSquareHeart className="w-4 h-4 text-paradise-gold-400 animate-bounce" />
        <span className="hidden sm:inline">Royal Feedback</span>
      </button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-paradise-charcoal-950/75 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-paradise-gold-400 z-10 animate-pulse-subtle">
            {/* Modal Header */}
            <div className="bg-paradise-maroon-900 p-6 text-white relative border-b border-paradise-gold-500/40">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-paradise-gold-300 hover:text-white p-1 rounded-full hover:bg-paradise-maroon-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-paradise-gold-400" />
                <span className="text-[10px] uppercase font-bold text-paradise-gold-300 tracking-widest">
                  Paradise Patron Experience
                </span>
              </div>
              <h2 className="font-serif text-2xl font-black text-white">
                Share Your Royal Feedback
              </h2>
              <p className="text-xs text-paradise-cream-300 mt-1">
                Help us preserve seven decades of Hyderabadi culinary perfection.
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-paradise-charcoal-900">
                    Shukriya! (Thank You)
                  </h3>
                  <p className="text-xs text-paradise-charcoal-600 max-w-xs mx-auto leading-relaxed">
                    Your valuable feedback has been received with Nizami royal gratitude. It guides our culinary masters every day.
                  </p>
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-full bg-paradise-maroon-900 text-paradise-gold-300 font-bold text-xs hover:bg-paradise-maroon-800 transition-all shadow-sm"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Star Rating */}
                  <div className="text-center space-y-2 pb-3 border-b border-paradise-cream-200">
                    <span className="text-xs font-bold text-paradise-charcoal-700 block">
                      How was your Biryani & Dining Experience?
                    </span>
                    <div className="flex items-center justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const current = hoverRating || rating;
                        return (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(null)}
                            className="p-1 transform hover:scale-125 transition-transform"
                          >
                            <Star
                              className={`w-7 h-7 ${
                                star <= current
                                  ? 'text-paradise-gold-500 fill-paradise-gold-400 drop-shadow-sm'
                                  : 'text-paradise-cream-400'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-xs font-serif font-bold text-paradise-maroon-900 block">
                      {ratingLabels[hoverRating || rating]}
                    </span>
                  </div>

                  {/* Category Pills */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-paradise-charcoal-600 block">
                      Feedback Focus:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((cat) => (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            category === cat
                              ? 'bg-paradise-maroon-900 text-paradise-gold-300 shadow-sm'
                              : 'bg-paradise-cream-100 text-paradise-charcoal-700 hover:bg-paradise-cream-200 border border-paradise-cream-300'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Outlet & Favorite Dish */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-paradise-charcoal-600 block mb-1">
                        Outlet Visited / Ordered From
                      </label>
                      <select
                        value={outletName}
                        onChange={(e) => setOutletName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs font-medium text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500"
                      >
                        <option value="Secunderabad Flagship">Secunderabad Flagship</option>
                        <option value="Hitec City / Madhapur">Hitec City / Madhapur</option>
                        <option value="Gachibowli Hub">Gachibowli Hub</option>
                        <option value="Begumpet">Begumpet</option>
                        <option value="Kukatpally">Kukatpally</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-paradise-charcoal-600 block mb-1">
                        Favorite Dish (Optional)
                      </label>
                      <input
                        type="text"
                        value={favoriteDish}
                        onChange={(e) => setFavoriteDish(e.target.value)}
                        placeholder="e.g. Royal Mutton Biryani"
                        className="w-full px-3 py-2 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs font-medium text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500"
                      />
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-paradise-charcoal-600 block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nawab Mir"
                        className="w-full px-3 py-2 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs font-medium text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-paradise-charcoal-600 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nawab@domain.com"
                        className="w-full px-3 py-2 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs font-medium text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500"
                      />
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <label className="text-[11px] font-bold text-paradise-charcoal-600 block mb-1">
                      Your Comments & Review *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Share your thoughts on taste, aroma, rice grain softness, or delivery speed..."
                      className="w-full px-3 py-2 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs font-medium text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-paradise-gold-500 via-paradise-gold-600 to-paradise-gold-700 text-paradise-maroon-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow hover:shadow-gold-glow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending Royal Feedback...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Royal Feedback</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FeedbackModal;
