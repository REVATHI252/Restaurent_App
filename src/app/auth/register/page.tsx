'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Lock, Mail, User, Phone, AlertCircle, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(name, email, password, phone);
    if (result.success) {
      router.push('/menu');
    } else {
      setError(result.error || 'Registration failed. Please check your inputs.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-paradise-cream-100">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-paradise-cream-300 shadow-royal-md">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-paradise-gold-400 to-paradise-gold-700 p-0.5 mx-auto flex items-center justify-center shadow-gold-glow">
            <div className="w-full h-full bg-paradise-maroon-900 rounded-full flex flex-col items-center justify-center">
              <span className="font-serif font-black text-paradise-gold-400 text-xl">P</span>
            </div>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-paradise-charcoal-900">
            Create Royal Account
          </h2>
          <p className="text-xs text-paradise-charcoal-500 font-sans">
            Join the Paradise family for seamless orders, saved addresses, and express delivery.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-paradise-charcoal-600 block mb-1">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nawab Mir Osman"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500 font-medium"
              />
              <User className="w-4 h-4 text-paradise-charcoal-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-paradise-charcoal-600 block mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500 font-medium"
              />
              <Mail className="w-4 h-4 text-paradise-charcoal-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-paradise-charcoal-600 block mb-1">
              10-Digit Mobile Phone (Optional)
            </label>
            <div className="relative">
              <input
                type="tel"
                pattern="[6-9][0-9]{9}"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500 font-medium"
              />
              <Phone className="w-4 h-4 text-paradise-charcoal-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-paradise-charcoal-600 block mb-1">
              Password (6+ characters) *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500 font-medium"
              />
              <Lock className="w-4 h-4 text-paradise-charcoal-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-paradise-gold-500 via-paradise-gold-600 to-paradise-gold-700 text-paradise-maroon-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow hover:shadow-gold-glow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-paradise-cream-200 text-center">
          <p className="text-xs text-paradise-charcoal-500">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="font-bold text-paradise-maroon-900 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
