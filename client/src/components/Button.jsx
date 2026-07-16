import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const variants = {
  primary:
    'bg-accent-500 text-white shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40 hover:bg-accent-600',
  outline: 'border border-white/30 text-white hover:border-white hover:bg-white/10',
  outlineDark: 'border border-primary-200 text-primary-800 hover:border-primary-400 hover:bg-primary-50',
  gold: 'bg-gradient-to-r from-gold-400 to-accent-500 text-primary-900 font-bold shadow-lg shadow-gold-500/30 hover:shadow-xl hover:shadow-gold-500/40',
};

// Shared CTA primitive: spring hover/tap lift for a tactile, "premium" feel.
export default function Button({ to, href, onClick, type = 'button', variant = 'primary', className = '', children }) {
  const classes = `inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-shadow duration-300 ${variants[variant] || variants.primary} ${className}`;
  const motionProps = {
    whileHover: { scale: 1.045, y: -2 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  };

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...motionProps}>
      {children}
    </motion.button>
  );
}
