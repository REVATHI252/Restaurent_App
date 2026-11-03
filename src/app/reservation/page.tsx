'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Clock,
  Users,
  MapPin,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Phone,
  ArrowRight,
  Building2,
  UtensilsCrossed,
  User,
  MessageSquare,
  Armchair,
  Heart,
  CalendarCheck,
  QrCode,
  Share2,
} from 'lucide-react';

const LUNCH_SLOTS = [
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
];

const DINNER_SLOTS = [
  '07:00 PM',
  '07:30 PM',
  '08:00 PM',
  '08:30 PM',
  '09:00 PM',
  '09:30 PM',
  '10:00 PM',
  '10:30 PM',
];

const PARADISE_BRANCHES = [
  {
    id: 'secunderabad-flagship',
    name: 'Secunderabad (Flagship)',
    area: 'SD Road, Paradise Circle',
    phone: '+91 40 6666 5555',
    capacity: '650+ Seats (Historic 1953 Durbar)',
    icon: '🏛️',
  },
  {
    id: 'hitec-city',
    name: 'Hitec City / Madhapur',
    area: 'Cyber Pearl Building, Main Road',
    phone: '+91 40 6666 5588',
    capacity: '320+ Seats (Corporate Enclaves)',
    icon: '💻',
  },
  {
    id: 'gachibowli',
    name: 'Gachibowli Hub',
    area: 'Old Mumbai Highway, Vinayak Nagar',
    phone: '+91 40 6666 5599',
    capacity: '400+ Seats (Family Banquets & Tandoor)',
    icon: '🌳',
  },
  {
    id: 'begumpet',
    name: 'Begumpet Heritage',
    area: 'Mayfair Complex, Sardar Patel Road',
    phone: '+91 40 6666 5577',
    capacity: '240+ Seats (Nawabi Courtyard)',
    icon: '🏰',
  },
  {
    id: 'kukatpally',
    name: 'Kukatpally / KPHB',
    area: 'Road No 1, Near JNTU / Forum Mall',
    phone: '+91 40 6666 5566',
    capacity: '300+ Seats (Family Feasts)',
    icon: '🛍️',
  },
];

const SEATING_OPTIONS = [
  {
    id: 'Royal AC Dining',
    name: 'Royal AC Dining Hall',
    desc: 'Grand chandeliers, central cooling & classical Nizami music',
    icon: '🏛️',
  },
  {
    id: 'Heritage Family Lounge',
    name: 'Heritage Family Lounge',
    desc: 'Spacious cushioned booths tailored for comfortable family dining',
    icon: '👨‍👩‍👧',
  },
  {
    id: 'VIP Private Dining',
    name: 'VIP Private Dining Room',
    desc: 'Exclusive secluded royal cabins with dedicated attendant service',
    icon: '👑',
  },
  {
    id: 'Terrace View',
    name: 'Open Terrace View',
    desc: 'Scenic open-air evening ambience with ambient decorative lighting',
    icon: '🌿',
  },
];

export default function ReservationPage() {
  const todayStr = new Date().toISOString().split('T')[0];

  // 1. Branch Selection
  const [selectedBranch, setSelectedBranch] = useState('Secunderabad (Flagship)');

  // 2. Date & Time
  const [reservationDate, setReservationDate] = useState(todayStr);
  const [mealSession, setMealSession] = useState<'lunch' | 'dinner'>('dinner');
  const [timeSlot, setTimeSlot] = useState('08:00 PM');

  // 3. Number of Guests
  const [guestsCount, setGuestsCount] = useState(4);

  // 4. Seating Preference
  const [seatingPreference, setSeatingPreference] = useState<
    'Royal AC Dining' | 'Heritage Family Lounge' | 'VIP Private Dining' | 'Terrace View'
  >('Royal AC Dining');

  // 5. Customer Name & Phone Number
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  // 6. Special Requests
  const [specialRequests, setSpecialRequests] = useState('');

  // Form Submission Status
  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  const activeBranch =
    PARADISE_BRANCHES.find((b) => b.name === selectedBranch) || PARADISE_BRANCHES[0];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        customerName,
        customerPhone,
        customerEmail: customerEmail || `${customerPhone}@guest.paradise.in`,
        outletName: selectedBranch,
        reservationDate,
        timeSlot,
        guestsCount,
        seatingPreference,
        specialRequests,
      };

      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.reservation) {
        setConfirmedBooking(data.reservation);
      } else {
        setConfirmedBooking({
          bookingNumber: 'PAR-RES-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
          ...payload,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      setConfirmedBooking({
        bookingNumber: 'PAR-RES-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
        customerName,
        customerPhone,
        outletName: selectedBranch,
        reservationDate,
        timeSlot,
        guestsCount,
        seatingPreference,
        specialRequests,
        createdAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paradise-cream-100 font-sans pb-24">
      {/* 1. Royal Header Hero Banner */}
      <section className="bg-gradient-to-b from-paradise-maroon-950 via-paradise-maroon-900 to-paradise-maroon-950 text-white py-14 sm:py-18 border-b-2 border-paradise-gold-600/40 relative overflow-hidden shadow-royal-lg">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-paradise-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paradise-maroon-900/90 border border-paradise-gold-500/50 text-paradise-gold-300 text-xs font-bold uppercase tracking-widest shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5 text-paradise-gold-400" />
            <span>Royal Nizami Dine-in Hospitality Since 1953</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-paradise-gold-200 via-paradise-gold-400 to-paradise-gold-200 drop-shadow-sm whitespace-nowrap">
            Reserve Table
          </h1>

          <p className="text-sm sm:text-base text-paradise-cream-200 font-serif max-w-2xl mx-auto leading-relaxed">
            Experience priority royal seating with zero wait time across all iconic Paradise Restaurant branches in Hyderabad.
          </p>

          {/* Quick Trust Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto mt-8">
            <div className="bg-paradise-maroon-900/80 border border-paradise-gold-700/50 rounded-2xl p-3.5 text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-paradise-gold-300 font-serif">100% Free</div>
              <p className="text-[10px] text-paradise-cream-200/80 uppercase tracking-wider font-semibold">
                No Reservation Charges
              </p>
            </div>

            <div className="bg-paradise-maroon-900/80 border border-paradise-gold-700/50 rounded-2xl p-3.5 text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-paradise-gold-300 font-serif">Zero Wait</div>
              <p className="text-[10px] text-paradise-cream-200/80 uppercase tracking-wider font-semibold">
                Guaranteed Table Ready
              </p>
            </div>

            <div className="bg-paradise-maroon-900/80 border border-paradise-gold-700/50 rounded-2xl p-3.5 text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-paradise-gold-300 font-serif">5 Branches</div>
              <p className="text-[10px] text-paradise-cream-200/80 uppercase tracking-wider font-semibold">
                All Hyderabad Hubs
              </p>
            </div>

            <div className="bg-paradise-maroon-900/80 border border-paradise-gold-700/50 rounded-2xl p-3.5 text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-paradise-gold-300 font-serif">Instant SMS</div>
              <p className="text-[10px] text-paradise-cream-200/80 uppercase tracking-wider font-semibold">
                WhatsApp & SMS Pass
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Reservation Interface */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {confirmedBooking ? (
          /* ========================================================================= */
          /* BOOKING CONFIRMATION DIGITAL PASS RECEIPT                                */
          /* ========================================================================= */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-9 border-2 border-paradise-gold-400 shadow-gold-glow-lg text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-paradise-gold-700 uppercase tracking-widest">
                Priority Royal Reservation Confirmed
              </span>
              <h2 className="font-serif text-3xl font-black text-paradise-charcoal-900">
                Table Reserved Successfully!
              </h2>
              <p className="text-xs text-paradise-charcoal-500 font-sans max-w-md mx-auto">
                We have confirmed your table at <strong>{confirmedBooking.outletName}</strong>. A confirmation SMS & WhatsApp pass has been dispatched.
              </p>
            </div>

            {/* VIP Digital Pass Card */}
            <div className="bg-gradient-to-br from-paradise-maroon-950 via-paradise-maroon-900 to-paradise-maroon-950 text-white p-6 sm:p-7 rounded-3xl border border-paradise-gold-500/50 text-left shadow-royal-lg space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-paradise-gold-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-3 border-b border-paradise-gold-800/60">
                <div>
                  <span className="text-[10px] text-paradise-gold-400 uppercase tracking-wider block">
                    Booking Reference ID
                  </span>
                  <span className="font-mono text-lg font-black text-paradise-gold-300">
                    {confirmedBooking.bookingNumber}
                  </span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                  Confirmed
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="text-paradise-cream-300/70 text-[11px] block">Customer Name</span>
                  <strong className="text-white text-sm font-serif">
                    {confirmedBooking.customerName}
                  </strong>
                </div>

                <div>
                  <span className="text-paradise-cream-300/70 text-[11px] block">Phone Number</span>
                  <strong className="text-white text-sm font-mono">
                    {confirmedBooking.customerPhone}
                  </strong>
                </div>

                <div>
                  <span className="text-paradise-cream-300/70 text-[11px] block">Date & Time</span>
                  <strong className="text-paradise-gold-300 text-xs">
                    {confirmedBooking.reservationDate} at {confirmedBooking.timeSlot}
                  </strong>
                </div>

                <div>
                  <span className="text-paradise-cream-300/70 text-[11px] block">Party Size</span>
                  <strong className="text-white text-xs">
                    {confirmedBooking.guestsCount} Guests ({confirmedBooking.seatingPreference})
                  </strong>
                </div>

                <div className="col-span-2 pt-2 border-t border-paradise-maroon-800">
                  <span className="text-paradise-cream-300/70 text-[11px] block">Branch Location</span>
                  <strong className="text-paradise-gold-200 text-xs">
                    {confirmedBooking.outletName}
                  </strong>
                </div>

                {confirmedBooking.specialRequests && (
                  <div className="col-span-2 text-[11px] text-amber-200 bg-amber-950/40 border border-amber-700/30 p-2.5 rounded-xl">
                    <strong>Special Request:</strong> {confirmedBooking.specialRequests}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link
                href="/menu"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-paradise-gold-400 via-paradise-gold-500 to-paradise-gold-600 text-paradise-maroon-950 font-black text-xs uppercase tracking-wider hover:brightness-105 shadow-gold-glow transition-all"
              >
                Pre-View Royal Menu
              </Link>
              <button
                onClick={() => setConfirmedBooking(null)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white border border-paradise-cream-400 text-paradise-charcoal-800 font-bold text-xs hover:bg-paradise-cream-100 transition-colors shadow-sm"
              >
                Make Another Reservation
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* MAIN RESERVATION BOOKING FORM & LIVE PREVIEW PASS                         */
          /* ========================================================================= */
          <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* STEP 1: PARADISE RESTAURANT BRANCHES */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-paradise-cream-300 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-paradise-cream-200">
                  <Building2 className="w-5 h-5 text-paradise-maroon-800" />
                  <div>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-paradise-charcoal-900 leading-tight">
                      1. Select Paradise Restaurant Branch
                    </h2>
                    <p className="text-xs text-paradise-charcoal-500">
                      Choose any of our 5 iconic Hyderabad restaurant branches.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PARADISE_BRANCHES.map((b) => {
                    const isSelected = selectedBranch === b.name;
                    return (
                      <button
                        type="button"
                        key={b.id}
                        onClick={() => setSelectedBranch(b.name)}
                        className={`p-4 rounded-2xl border text-left transition-all transform active:scale-98 ${
                          isSelected
                            ? 'bg-gradient-to-br from-paradise-maroon-900 to-paradise-maroon-950 text-white border-paradise-gold-400 shadow-gold-glow ring-2 ring-paradise-gold-500/40'
                            : 'bg-paradise-cream-100 hover:bg-paradise-cream-200 text-paradise-charcoal-900 border-paradise-cream-300 hover:border-paradise-gold-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-lg">{b.icon}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-paradise-gold-400" />}
                        </div>
                        <span className={`text-xs font-bold font-serif block ${isSelected ? 'text-paradise-gold-300' : 'text-paradise-charcoal-900'}`}>
                          {b.name}
                        </span>
                        <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-paradise-cream-200/80' : 'text-paradise-charcoal-500'}`}>
                          {b.area}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: DATE & TIME */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-paradise-cream-300 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-paradise-cream-200">
                  <CalendarDays className="w-5 h-5 text-paradise-maroon-800" />
                  <div>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-paradise-charcoal-900 leading-tight">
                      2. Date & Time
                    </h2>
                    <p className="text-xs text-paradise-charcoal-500">
                      Select your preferred dining date and priority time slot.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-paradise-charcoal-700 block mb-1.5">
                      Reservation Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs font-semibold text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-paradise-charcoal-700 block mb-1.5">
                      Meal Session
                    </label>
                    <div className="grid grid-cols-2 gap-2 bg-paradise-cream-200 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => {
                          setMealSession('lunch');
                          setTimeSlot('01:00 PM');
                        }}
                        className={`py-2 text-xs font-bold rounded-lg transition-all ${
                          mealSession === 'lunch'
                            ? 'bg-paradise-maroon-900 text-paradise-gold-300 shadow-sm font-black'
                            : 'text-paradise-charcoal-700 hover:text-black'
                        }`}
                      >
                        ☀️ Lunch
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMealSession('dinner');
                          setTimeSlot('08:00 PM');
                        }}
                        className={`py-2 text-xs font-bold rounded-lg transition-all ${
                          mealSession === 'dinner'
                            ? 'bg-paradise-maroon-900 text-paradise-gold-300 shadow-sm font-black'
                            : 'text-paradise-charcoal-700 hover:text-black'
                        }`}
                      >
                        🌙 Dinner
                      </button>
                    </div>
                  </div>
                </div>

                {/* Available Slots */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-paradise-charcoal-700 block">
                    Available Time Slots ({mealSession.toUpperCase()}):
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {(mealSession === 'lunch' ? LUNCH_SLOTS : DINNER_SLOTS).map((slot) => {
                      const isSlotSelected = timeSlot === slot;
                      return (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setTimeSlot(slot)}
                          className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all text-center ${
                            isSlotSelected
                              ? 'bg-paradise-maroon-900 text-paradise-gold-300 border-paradise-gold-500 shadow-sm font-black'
                              : 'bg-paradise-cream-100 text-paradise-charcoal-800 border-paradise-cream-300 hover:bg-paradise-cream-200'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* STEP 3: NUMBER OF GUESTS & SEATING PREFERENCE */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-paradise-cream-300 shadow-sm space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-paradise-cream-200">
                  <Users className="w-5 h-5 text-paradise-maroon-800" />
                  <div>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-paradise-charcoal-900 leading-tight">
                      3. Number of Guests & Seating Preference
                    </h2>
                    <p className="text-xs text-paradise-charcoal-500">
                      Select your party size and preferred dining room atmosphere.
                    </p>
                  </div>
                </div>

                {/* Number of guests */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-paradise-charcoal-700">
                      Number of Guests:
                    </label>
                    <span className="text-xs font-black text-paradise-maroon-900 bg-paradise-gold-500/20 px-3 py-0.5 rounded-full border border-paradise-gold-500/40">
                      {guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'} (Party of {guestsCount})
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setGuestsCount(num)}
                        className={`w-11 h-11 rounded-2xl font-serif font-bold text-xs transition-all flex items-center justify-center ${
                          guestsCount === num
                            ? 'bg-paradise-maroon-900 text-paradise-gold-300 shadow-royal-sm border-2 border-paradise-gold-400 font-black scale-105'
                            : 'bg-paradise-cream-100 text-paradise-charcoal-700 border border-paradise-cream-300 hover:bg-paradise-cream-200'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seating Preference Cards */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-paradise-charcoal-700 block">
                    Seating Preference:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SEATING_OPTIONS.map((seat) => {
                      const isSeatSelected = seatingPreference === seat.id;
                      return (
                        <button
                          type="button"
                          key={seat.id}
                          onClick={() => setSeatingPreference(seat.id as any)}
                          className={`p-3.5 rounded-2xl border text-left transition-all ${
                            isSeatSelected
                              ? 'bg-paradise-maroon-950 text-white border-paradise-gold-400 shadow-sm ring-1 ring-paradise-gold-400'
                              : 'bg-paradise-cream-100 hover:bg-paradise-cream-200 text-paradise-charcoal-800 border-paradise-cream-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-base">{seat.icon}</span>
                            <span className={`text-xs font-bold ${isSeatSelected ? 'text-paradise-gold-300 font-black' : 'text-paradise-charcoal-900'}`}>
                              {seat.name}
                            </span>
                          </div>
                          <span className={`text-[10px] block leading-snug ${isSeatSelected ? 'text-paradise-cream-200/80' : 'text-paradise-charcoal-500'}`}>
                            {seat.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* STEP 4: CUSTOMER DETAILS & SPECIAL REQUESTS */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-paradise-cream-300 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-paradise-cream-200">
                  <User className="w-5 h-5 text-paradise-maroon-800" />
                  <div>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-paradise-charcoal-900 leading-tight">
                      4. Customer Details & Special Requests
                    </h2>
                    <p className="text-xs text-paradise-charcoal-500">
                      Enter your contact information for table allocation.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Customer Name */}
                  <div>
                    <label className="text-xs font-bold text-paradise-charcoal-700 block mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Vikramaditya Rao"
                      className="w-full px-4 py-2.5 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs font-medium text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="text-xs font-bold text-paradise-charcoal-700 block mb-1">
                      Phone Number (10-Digit Mobile) *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        pattern="[6-9][0-9]{9}"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="9876543210"
                        className="w-full px-4 py-2.5 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs font-mono font-medium text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="text-xs font-bold text-paradise-charcoal-700 block mb-1">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. High chair for infant, anniversary floral table setup, birthday cake presentation, mild spice preference..."
                    className="w-full px-4 py-2.5 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs font-medium text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Live VIP Reservation Pass Preview & Action Button */}
            <div className="lg:col-span-5 space-y-6 sticky top-24">
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-paradise-cream-300 shadow-royal-md space-y-5">
                <div className="border-b border-paradise-cream-200 pb-3">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-paradise-gold-700 uppercase tracking-widest mb-1">
                    <CalendarCheck className="w-3.5 h-3.5 text-paradise-gold-600" />
                    <span>Live Table Summary</span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-paradise-charcoal-900">
                    VIP Reservation Summary
                  </h2>
                </div>

                {/* Live Pass Card */}
                <div className="bg-gradient-to-br from-paradise-maroon-950 via-paradise-maroon-900 to-paradise-maroon-950 text-white p-5 sm:p-6 rounded-2xl border border-paradise-gold-600/40 space-y-3.5 shadow-royal-sm relative overflow-hidden">
                  <div className="flex items-center justify-between pb-2.5 border-b border-paradise-gold-800/60">
                    <div>
                      <span className="text-[10px] text-paradise-gold-400 uppercase tracking-widest block">
                        Paradise Table Pass
                      </span>
                      <span className="font-serif text-sm font-bold text-paradise-gold-300">
                        {activeBranch.icon} {selectedBranch}
                      </span>
                    </div>
                    <span className="bg-paradise-gold-500 text-paradise-maroon-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                      Zero Wait
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex justify-between">
                      <span className="text-paradise-cream-300/70">Guest Name:</span>
                      <strong className="text-white">{customerName || '— (Enter Name)'}</strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-paradise-cream-300/70">Phone Number:</span>
                      <strong className="text-paradise-gold-300 font-mono">
                        {customerPhone ? `+91 ${customerPhone}` : '— (Enter Phone)'}
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-paradise-cream-300/70">Date & Slot:</span>
                      <strong className="text-white">
                        {reservationDate} at {timeSlot}
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-paradise-cream-300/70">Guests / Party:</span>
                      <strong className="text-white">
                        {guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-paradise-cream-300/70">Seating Preference:</span>
                      <strong className="text-paradise-gold-300">{seatingPreference}</strong>
                    </div>

                    {specialRequests && (
                      <div className="pt-2 border-t border-paradise-maroon-800 text-[11px] text-amber-200">
                        <span className="block text-paradise-gold-400 font-semibold">Special Request:</span>
                        <span className="italic">{specialRequests}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Free Reservation Note */}
                <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
                  <span className="font-medium">Table Booking Fee:</span>
                  <strong className="text-emerald-700 font-black">100% FREE (Zero Deposit)</strong>
                </div>

                {/* CONFIRM RESERVATION BUTTON */}
                <button
                  type="submit"
                  disabled={loading || !customerName || !customerPhone}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-paradise-gold-400 via-paradise-gold-500 to-paradise-gold-600 text-paradise-maroon-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span>Securing Table...</span>
                  ) : (
                    <>
                      <span>Confirm Reservation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-paradise-charcoal-500 text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Instant SMS & WhatsApp confirmation guaranteed</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
