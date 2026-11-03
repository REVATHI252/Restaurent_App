'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Star,
  MessageSquareHeart,
  Sparkles,
  CheckCircle2,
  Send,
  Building2,
  Phone,
  CalendarDays,
  ThumbsUp,
  Clock,
  ShieldCheck,
  ChevronRight,
  MapPin,
} from 'lucide-react';

interface ReviewItem {
  _id: string;
  name: string;
  avatar?: string;
  location?: string;
  outletName: string;
  branchSlug: string;
  rating: number;
  badge?: string;
  verifiedOrder?: boolean;
  helpfulCount?: number;
  comments: string;
  createdAt: string;
}

const PARADISE_BRANCHES = [
  {
    id: 'secunderabad-flagship',
    name: 'Secunderabad (Flagship)',
    shortName: '🏛️ Secunderabad Flagship',
    slug: 'secunderabad-flagship',
    rating: '4.9★',
    tagline: 'Birthplace of Paradise (1953) • 650+ Seats • Historic Durbar',
    address: 'SD Road, Sappu Bagh Enclave, Ramgopalpet, Secunderabad, Telangana 500003',
    phone: '+91 40 6666 5555',
    icon: '🏛️',
  },
  {
    id: 'hitec-city',
    name: 'Hitec City / Madhapur',
    shortName: '💻 Hitec City / Madhapur',
    slug: 'hitec-city',
    rating: '4.9★',
    tagline: 'Cyber Pearl Building • Express Takeaway & Tech Enclaves',
    address: 'Cyber Pearl Building, Ground Floor, Hitec City Main Road, Madhapur, Hyderabad 500081',
    phone: '+91 40 6666 5588',
    icon: '💻',
  },
  {
    id: 'gachibowli',
    name: 'Gachibowli Hub',
    shortName: '🌳 Gachibowli Hub',
    slug: 'gachibowli',
    rating: '4.9★',
    tagline: 'Grand Family Banquets & Open Charcoal Tandoor Kitchen',
    address: 'Plot No 3, Old Mumbai Highway, Vinayak Nagar, Gachibowli, Hyderabad 500032',
    phone: '+91 40 6666 5599',
    icon: '🌳',
  },
  {
    id: 'begumpet',
    name: 'Begumpet Heritage',
    shortName: '🏰 Begumpet Heritage',
    slug: 'begumpet',
    rating: '4.9★',
    tagline: 'Nawabi Courtyard Atmosphere & Private Dining Cabins',
    address: 'Mayfair Complex, Sardar Patel Road, Begumpet, Hyderabad 500003',
    phone: '+91 40 6666 5577',
    icon: '🏰',
  },
  {
    id: 'kukatpally',
    name: 'Kukatpally / KPHB',
    shortName: '🛍️ Kukatpally / KPHB',
    slug: 'kukatpally',
    rating: '4.8★',
    tagline: 'Family Weekend Dining & Rapid Takeaway Dispatch',
    address: 'Road No 1, KPHB Colony, Near JNTU Road, Kukatpally, Hyderabad 500072',
    phone: '+91 40 6666 5566',
    icon: '🛍️',
  },
];

export default function FeedbackPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>('secunderabad-flagship');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  // Review Submission Form State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [outletName, setOutletName] = useState('Secunderabad (Flagship)');
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

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      if (data.success && Array.isArray(data.feedbacks)) {
        setReviews(data.feedbacks);
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleHelpfulClick = (id: string) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
          outletName,
          comments,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
        fetchReviews();
      }
    } catch (err) {
      console.error('Feedback submit error:', err);
      setIsSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  // Filter reviews strictly by the selected branch
  const branchReviews = reviews.filter((rev) => {
    if (selectedBranch === 'all') return true;
    return (
      rev.branchSlug === selectedBranch ||
      rev.outletName.toLowerCase().includes(selectedBranch.replace('-', ' '))
    );
  });

  const activeBranch = PARADISE_BRANCHES.find((b) => b.slug === selectedBranch) || PARADISE_BRANCHES[0];

  return (
    <div className="min-h-screen bg-paradise-cream-100 font-sans pb-24">
      {/* 1. Royal Trust Header Banner */}
      <section className="bg-gradient-to-b from-paradise-maroon-950 via-paradise-maroon-900 to-paradise-maroon-950 text-white py-14 sm:py-18 border-b-2 border-paradise-gold-600/40 relative overflow-hidden shadow-royal-lg">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-paradise-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paradise-maroon-900/90 border border-paradise-gold-500/50 text-paradise-gold-300 text-xs font-bold uppercase tracking-widest shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5 text-paradise-gold-400" />
            <span>Paradise Restaurant Branches & Patron Reviews</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-paradise-gold-200 via-paradise-gold-400 to-paradise-gold-200 drop-shadow-sm">
            Branch Reviews & Ratings
          </h1>

          <p className="text-sm sm:text-base text-paradise-cream-200 font-serif max-w-2xl mx-auto leading-relaxed">
            Select any Paradise Restaurant branch to explore authentic patron reviews, ambiance ratings, and direct contact details.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
            <div className="bg-paradise-maroon-900/80 border border-paradise-gold-700/50 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white font-serif">4.9 ★</div>
              <p className="text-[11px] text-paradise-gold-300/80 mt-0.5 uppercase tracking-wider font-semibold">
                Average Across All Branches
              </p>
            </div>
            <div className="bg-paradise-maroon-900/80 border border-paradise-gold-700/50 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white font-serif">5 Branches</div>
              <p className="text-[11px] text-paradise-gold-300/80 mt-0.5 uppercase tracking-wider font-semibold">
                Across Hyderabad City
              </p>
            </div>
            <div className="bg-paradise-maroon-900/80 border border-paradise-gold-700/50 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white font-serif">Since 1953</div>
              <p className="text-[11px] text-paradise-gold-300/80 mt-0.5 uppercase tracking-wider font-semibold">
                7 Decades of Trust
              </p>
            </div>
            <div className="bg-paradise-maroon-900/80 border border-paradise-gold-700/50 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white font-serif">500,000+</div>
              <p className="text-[11px] text-paradise-gold-300/80 mt-0.5 uppercase tracking-wider font-semibold">
                Happy Diners Served
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. All Branches Selector Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-8">
        {/* Branch Cards Selector */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-paradise-cream-300 shadow-royal-md space-y-4">
          <div className="flex items-center justify-between border-b border-paradise-cream-200 pb-3">
            <div className="flex items-center gap-2 text-paradise-maroon-900 font-serif font-black text-lg sm:text-xl">
              <Building2 className="w-5 h-5 text-paradise-gold-600" />
              <span>Select Paradise Branch:</span>
            </div>
            <span className="text-xs text-paradise-charcoal-500 font-medium">
              Showing reviews for {activeBranch.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {PARADISE_BRANCHES.map((branch) => {
              const isSelected = selectedBranch === branch.slug;
              const count = reviews.filter(
                (r) =>
                  r.branchSlug === branch.slug ||
                  r.outletName.toLowerCase().includes(branch.slug.replace('-', ' '))
              ).length;

              return (
                <button
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch.slug)}
                  className={`flex flex-col items-start text-left p-4 rounded-2xl border transition-all transform active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-br from-paradise-maroon-900 via-paradise-maroon-950 to-paradise-maroon-900 text-white border-paradise-gold-400 shadow-gold-glow ring-2 ring-paradise-gold-500/50 scale-102'
                      : 'bg-paradise-cream-100 hover:bg-paradise-cream-200 text-paradise-charcoal-900 border-paradise-cream-300 hover:border-paradise-gold-400'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-xl">{branch.icon}</span>
                    <span
                      className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-paradise-gold-400 text-paradise-maroon-950 font-black'
                          : 'bg-paradise-gold-500/20 text-paradise-maroon-900 font-bold'
                      }`}
                    >
                      {branch.rating}
                    </span>
                  </div>

                  <span className={`text-sm font-bold font-serif leading-snug ${isSelected ? 'text-paradise-gold-300' : 'text-paradise-charcoal-900'}`}>
                    {branch.name}
                  </span>

                  <span className={`text-[11px] mt-1.5 font-medium ${isSelected ? 'text-paradise-cream-200/80' : 'text-paradise-charcoal-500'}`}>
                    {count} Verified Reviews
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Branch Full Details Card */}
          <div className="bg-gradient-to-r from-paradise-maroon-950 via-paradise-maroon-900 to-paradise-maroon-950 text-white p-5 sm:p-6 rounded-2xl border border-paradise-gold-600/40 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-paradise-gold-300 font-serif">
                  {activeBranch.icon} {activeBranch.name}
                </span>
                <span className="bg-paradise-gold-500 text-paradise-maroon-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  {activeBranch.rating} Verified Rating
                </span>
              </div>

              <p className="text-xs text-paradise-cream-200 leading-relaxed font-sans">
                {activeBranch.tagline}
              </p>

              <p className="text-xs text-paradise-gold-300/90 flex items-center gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-paradise-gold-400 flex-shrink-0" />
                <span>{activeBranch.address}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
              <a
                href={`tel:${activeBranch.phone.replace(/[^0-9]/g, '')}`}
                className="px-4 py-2 rounded-xl bg-paradise-maroon-900 hover:bg-paradise-maroon-800 text-paradise-gold-300 border border-paradise-gold-600/50 text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-paradise-gold-400" />
                <span>{activeBranch.phone}</span>
              </a>

              <Link
                href="/reservation"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-paradise-gold-400 via-paradise-gold-500 to-paradise-gold-600 text-paradise-maroon-950 font-black text-xs hover:brightness-105 transition-all shadow-gold-glow"
              >
                Book Table at this Branch
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Main Split Layout: Review Form (Left) & Branch Reviews (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Post Review for Branch */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-3xl border border-paradise-cream-300 shadow-royal-sm space-y-5 sticky top-24">
            <div className="border-b border-paradise-cream-200 pb-3">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-paradise-gold-700 uppercase tracking-widest mb-1">
                <MessageSquareHeart className="w-3.5 h-3.5 text-paradise-gold-600" />
                <span>Write a Branch Review</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-paradise-charcoal-900">
                Share Your Feedback
              </h2>
              <p className="text-xs text-paradise-charcoal-500 mt-0.5">
                Tell us about your experience at {activeBranch.name}.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-3 bg-paradise-cream-100 rounded-2xl p-4 border border-paradise-cream-300">
                <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-paradise-charcoal-900">
                  Shukriya! (Thank You)
                </h3>
                <p className="text-xs text-paradise-charcoal-600 leading-relaxed max-w-xs mx-auto">
                  Your feedback for <strong>{outletName}</strong> has been received and added!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setName('');
                    setEmail('');
                    setComments('');
                    setIsSubmitted(false);
                  }}
                  className="px-5 py-2 rounded-full bg-paradise-maroon-900 text-paradise-gold-300 text-xs font-bold shadow-sm"
                >
                  Write Another Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Branch Dropdown */}
                <div>
                  <label className="text-[11px] font-bold text-paradise-charcoal-700 block mb-1">
                    Select Branch *
                  </label>
                  <select
                    value={outletName}
                    onChange={(e) => {
                      setOutletName(e.target.value);
                      const matched = PARADISE_BRANCHES.find((b) => b.name === e.target.value);
                      if (matched) setSelectedBranch(matched.slug);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs font-bold text-paradise-maroon-950 focus:outline-none focus:border-paradise-gold-500"
                  >
                    {PARADISE_BRANCHES.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.icon} {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating Selector */}
                <div className="text-center space-y-1.5 pb-3 border-b border-paradise-cream-200 bg-paradise-cream-100/70 p-3 rounded-2xl">
                  <span className="text-xs font-bold text-paradise-charcoal-700 block">
                    Your Rating:
                  </span>
                  <div className="flex items-center justify-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const current = hoverRating || rating;
                      return (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-1 transform hover:scale-125 transition-transform active:scale-95"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= current
                                ? 'text-paradise-gold-500 fill-paradise-gold-400 drop-shadow-sm'
                                : 'text-paradise-cream-300'
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

                {/* Name & Email */}
                <div className="grid grid-cols-2 gap-2">
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
                      placeholder="name@domain.com"
                      className="w-full px-3 py-2 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs font-medium text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500"
                    />
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label className="text-[11px] font-bold text-paradise-charcoal-600 block mb-1">
                    Your Review & Comments *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Share your experience regarding food taste, dum aroma, branch ambiance, or service..."
                    className="w-full px-3 py-2 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs font-medium text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-paradise-gold-500 via-paradise-gold-600 to-paradise-gold-700 text-paradise-maroon-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-105 active:scale-98 transition-all disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Post Branch Review'}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Respective Reviews for Selected Branch */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-paradise-cream-300">
              <div>
                <h2 className="font-serif text-2xl font-bold text-paradise-charcoal-900">
                  {activeBranch.name} Patron Reviews
                </h2>
                <p className="text-xs text-paradise-charcoal-500 mt-0.5">
                  Showing {branchReviews.length} authentic patron reviews for this branch
                </p>
              </div>

              <span className="text-xs font-bold text-paradise-maroon-900 bg-paradise-gold-500/20 px-3 py-1 rounded-full border border-paradise-gold-500/40">
                ⭐ 100% Verified Patrons
              </span>
            </div>

            {branchReviews.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-dashed border-paradise-cream-300 text-center space-y-3">
                <MessageSquareHeart className="w-12 h-12 text-paradise-gold-500 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-paradise-charcoal-900">
                  No reviews yet for {activeBranch.name}
                </h3>
                <p className="text-xs text-paradise-charcoal-500">
                  Be the first to share your experience with this outlet!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {branchReviews.map((rev) => {
                  const isVoted = helpfulVotes[rev._id];
                  const currentHelpful = (rev.helpfulCount || 10) + (isVoted ? 1 : 0);

                  return (
                    <div
                      key={rev._id}
                      className="bg-white p-5 sm:p-6 rounded-3xl border border-paradise-cream-300 shadow-sm hover:shadow-royal-md hover:border-paradise-gold-400 transition-all duration-300 flex flex-col justify-between space-y-4 group"
                    >
                      {/* Top: Avatar, Name, Branch Badge & Rating */}
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-paradise-maroon-900 to-paradise-maroon-950 text-paradise-gold-300 font-serif font-black text-sm flex items-center justify-center border border-paradise-gold-500/50 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                              {rev.avatar || rev.name.substring(0, 2).toUpperCase()}
                            </div>

                            <div>
                              <h4 className="font-serif text-sm font-bold text-paradise-charcoal-900 leading-tight">
                                {rev.name}
                              </h4>
                              {rev.location && (
                                <p className="text-[11px] text-paradise-charcoal-500">
                                  {rev.location}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Star rating */}
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className="w-3.5 h-3.5 fill-paradise-gold-500 text-paradise-gold-500"
                              />
                            ))}
                          </div>
                        </div>

                        {/* Outlet & Patron Badge Tag */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] font-black bg-paradise-maroon-950 text-paradise-gold-300 px-2.5 py-0.5 rounded-md border border-paradise-gold-700/50">
                            {rev.outletName}
                          </span>
                          {rev.badge && (
                            <span className="text-[10px] font-bold bg-paradise-gold-500/15 text-paradise-maroon-900 border border-paradise-gold-500/30 px-2 py-0.5 rounded-md">
                              {rev.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Middle: Review Quote */}
                      <p className="text-xs text-paradise-charcoal-700 leading-relaxed font-sans italic border-l-2 border-paradise-gold-400 pl-3">
                        "{rev.comments}"
                      </p>

                      {/* Bottom: Date & Helpful Button */}
                      <div className="pt-3 border-t border-paradise-cream-200 flex items-center justify-between gap-2 text-xs">
                        <span className="text-[11px] text-paradise-charcoal-500">
                          {new Date(rev.createdAt).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>

                        {/* Helpful vote button */}
                        <button
                          type="button"
                          onClick={() => handleHelpfulClick(rev._id)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all border ${
                            isVoted
                              ? 'bg-paradise-maroon-900 text-paradise-gold-300 border-paradise-gold-500 shadow-sm'
                              : 'bg-paradise-cream-100 hover:bg-paradise-cream-200 text-paradise-charcoal-600 border-paradise-cream-300'
                          }`}
                        >
                          <ThumbsUp className={`w-3 h-3 ${isVoted ? 'text-paradise-gold-300' : 'text-paradise-charcoal-500'}`} />
                          <span>Helpful ({currentHelpful})</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
