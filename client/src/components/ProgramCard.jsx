import { motion } from 'framer-motion';
import Icon from './Icon';

export default function ProgramCard({ program }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group bg-white rounded-2xl border border-primary-100 shadow-sm hover:shadow-2xl hover:shadow-primary-800/10 transition-shadow duration-300 overflow-hidden h-full flex flex-col"
    >
      <div className="h-36 bg-gradient-to-br from-primary-800 to-primary-600 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-500/40 to-transparent" />
        {program.image ? (
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <Icon name="academic-cap" className="relative w-12 h-12 text-white/40 group-hover:text-white/70 group-hover:scale-110 transition-all duration-500" />
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="inline-block text-xs font-semibold uppercase tracking-wide text-accent-600 bg-accent-50 px-2 py-1 rounded-full mb-2 self-start">
          {program.category}
        </span>
        <h3 className="font-heading font-semibold text-primary-800 mb-2 group-hover:text-accent-600 transition-colors">
          {program.title}
        </h3>
        <p className="text-sm text-primary-600 mb-3 line-clamp-3">{program.description}</p>
        <div className="flex items-center gap-3 text-xs text-primary-500 mt-auto">
          {program.duration && <span>{program.duration}</span>}
          {program.format && <span>&middot; {program.format}</span>}
        </div>
      </div>
    </motion.div>
  );
}
