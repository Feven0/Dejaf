import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import GradientOrbs from './GradientOrbs';

const AUTOPLAY_MS = 7000;

export default function HeroSlider({ settings }) {
  const slides = [
    {
      eyebrow: settings?.tagline || 'Your Capability Building Partner',
      title: 'Building people, insight, and strategy for lasting success',
      text:
        settings?.heroText ||
        'DEJAF Training and Consultancy helps organizations build the people, insight, and strategy needed to succeed in a fast-changing market.',
      cta: { label: 'Explore Training', to: '/training' },
      gradient: 'from-primary-900 via-primary-800 to-primary-700',
    },
    {
      eyebrow: 'Research-Driven',
      title: 'Uncover the opportunities your market is hiding',
      text: 'Our research and consultancy team turns raw market data into strategies you can act on with confidence.',
      cta: { label: 'See Our Services', to: '/services' },
      gradient: 'from-accent-900 via-primary-800 to-primary-900',
    },
    {
      eyebrow: 'Built to Last',
      title: 'Capacity building that outlives the workshop',
      text: 'We design programs for sustainable growth — equipping teams and institutions to keep improving long after we leave.',
      cta: { label: 'Book a Consultation', to: '/contact' },
      gradient: 'from-primary-900 via-accent-900 to-primary-800',
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[index];

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${slide.gradient} text-white transition-colors duration-1000`}>
      <GradientOrbs variant="dark" />
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 70%, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32 grid md:grid-cols-2 gap-10 items-center min-h-[560px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-gold-500" />
              <p className="font-serif italic text-gold-400 text-base tracking-wide">{slide.eyebrow}</p>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold font-heading leading-[1.05] tracking-tight mb-6">
              {slide.title}
            </h1>
            <p className="text-primary-100/90 mb-9 leading-relaxed max-w-lg text-lg">{slide.text}</p>
            <div className="flex flex-wrap gap-4">
              <Button to={slide.cta.to} variant="primary">
                {slide.cta.label}
                <span aria-hidden="true">&rarr;</span>
              </Button>
              <Button to="/contact" variant="outline">
                Book Now
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="hidden md:flex justify-center relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="absolute w-72 h-72 rounded-full bg-gold-500/20 blur-3xl animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[26rem] h-[26rem] rounded-full border border-white/10 animate-spin-slow" />
          </div>
          <motion.div
            className="relative glass-panel rounded-2xl p-8 shadow-2xl animate-float"
          >
            <img src="/logo.jpg" alt="DEJAF" className="w-full max-w-xs rounded-xl bg-white p-6 shadow-xl" />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative flex justify-center gap-3 pb-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-1 w-10 rounded-full bg-white/25 overflow-hidden"
          >
            {i === index && (
              <motion.span
                key={index}
                className="absolute inset-y-0 left-0 bg-gold-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
