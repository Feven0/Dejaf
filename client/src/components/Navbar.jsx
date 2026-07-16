import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/training', label: 'Training' },
  { to: '/services', label: 'Services' },
  { to: '/vacancies', label: 'Vacancy Announcement' },
  { to: '/contact', label: 'Contact' },
];

function isLinkActive(pathname, to) {
  return to === '/' ? pathname === '/' : pathname.startsWith(to);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b transition-shadow duration-300 ${
        scrolled ? 'border-primary-100 shadow-md' : 'border-transparent shadow-none'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.jpg" alt="DEJAF Training and Consultancy" className="h-10 w-auto rounded" />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const active = isLinkActive(pathname, link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  active ? 'text-accent-600' : 'text-primary-800 hover:text-accent-500'
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-gold-500 to-accent-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <Button to="/contact" variant="primary" className="!px-5 !py-2 text-sm">
            Book Now
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-primary-800"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-1 border-t border-primary-100">
          {links.map((link) => {
            const active = isLinkActive(pathname, link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  active ? 'text-accent-600 bg-accent-50' : 'text-primary-800 hover:text-accent-500'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-block text-center bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold px-4 py-2 rounded-full"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
