import { useState } from 'react';
import { newsletterApi } from '../api/resources';
import Reveal from './Reveal';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const res = await newsletterApi.subscribe(email);
      setStatus({ state: 'success', message: res.message });
      setEmail('');
    } catch (err) {
      setStatus({ state: 'error', message: err.response?.data?.message || 'Something went wrong.' });
    }
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <Reveal>
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-800 to-primary-900 rounded-3xl px-6 sm:px-12 py-12 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gold-500/20 blur-3xl pointer-events-none" />
          <div className="relative">
            <h3 className="font-heading font-bold text-white text-2xl mb-2">Subscribe for updates from DEJAF</h3>
            <p className="text-primary-200">New training programs, events, and insights — straight to your inbox.</p>
          </div>
          <form onSubmit={handleSubmit} className="relative flex w-full md:w-auto gap-3">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 md:w-64 border border-white/20 bg-white/10 text-white placeholder:text-primary-300 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
            <button
              type="submit"
              disabled={status.state === 'loading'}
              className="bg-gradient-to-r from-gold-400 to-accent-500 disabled:opacity-60 text-primary-900 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap shadow-lg shadow-gold-500/20 hover:shadow-xl hover:shadow-gold-500/30 transition-shadow"
            >
              {status.state === 'loading' ? 'Sending...' : 'Subscribe'}
            </button>
          </form>
        </div>
        {status.message && (
          <p className={`mt-3 text-sm text-center ${status.state === 'error' ? 'text-red-600' : 'text-leaf-600'}`}>
            {status.message}
          </p>
        )}
      </Reveal>
    </section>
  );
}
