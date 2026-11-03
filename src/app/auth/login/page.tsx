'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      router.push('/menu');
    } else {
      setError(result.error || 'Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  const handleDemoUser = () => {
    setEmail('nizam@paradisefoodcourt.in');
    setPassword('Nizam@1953');
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
            Welcome to Paradise
          </h2>
          <p className="text-xs text-paradise-charcoal-500 font-sans">
            Sign in to access your royal orders and swift checkout.
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
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nizam@paradisefoodcourt.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-paradise-cream-100 border border-paradise-cream-300 text-xs text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500 font-medium"
              />
              <Mail className="w-4 h-4 text-paradise-charcoal-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-paradise-charcoal-600 block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
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
            {loading ? 'Authenticating...' : 'Sign In to Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Quick Filler */}
        <div className="pt-2 border-t border-paradise-cream-200 text-center space-y-3">
          <button
            type="button"
            onClick={handleDemoUser}
            className="text-[11px] font-bold text-paradise-maroon-800 hover:text-paradise-gold-700 underline"
          >
            ⚡ Click here to auto-fill Demo Guest Account
          </button>

          <p className="text-xs text-paradise-charcoal-500">
            Don't have a Paradise account?{' '}
            <Link
              href="/auth/register"
              className="font-bold text-paradise-maroon-900 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
