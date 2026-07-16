import { motion } from 'framer-motion';
import Icon from './Icon';

export default function ServiceCard({ title, description, icon }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative bg-white rounded-2xl p-6 h-full border border-primary-100 shadow-sm hover:shadow-2xl hover:shadow-accent-500/10 transition-shadow duration-300"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent-500/5 via-transparent to-gold-500/5 pointer-events-none" />
      <div className="relative w-12 h-12 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-white transition-all duration-300">
        <Icon name={icon} />
      </div>
      <h3 className="relative text-lg font-heading font-semibold text-primary-800 mb-2">{title}</h3>
      <p className="relative text-sm text-primary-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
