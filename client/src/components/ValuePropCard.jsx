import { motion } from 'framer-motion';
import Icon from './Icon';

const colorClasses = {
  gold: 'bg-gold-500/10 text-gold-600 ring-gold-500/20 group-hover:bg-gold-500 group-hover:text-white',
  leaf: 'bg-leaf-500/10 text-leaf-600 ring-leaf-500/20 group-hover:bg-leaf-500 group-hover:text-white',
  accent: 'bg-accent-500/10 text-accent-600 ring-accent-500/20 group-hover:bg-accent-500 group-hover:text-white',
  primary: 'bg-primary-800/10 text-primary-700 ring-primary-500/20 group-hover:bg-primary-800 group-hover:text-white',
};

export default function ValuePropCard({ title, description, icon, color = 'gold' }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="group flex gap-4">
      <div
        className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center ring-1 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${
          colorClasses[color] || colorClasses.gold
        }`}
      >
        <Icon name={icon} className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-heading font-semibold text-primary-800 mb-1">{title}</h4>
        <p className="text-sm text-primary-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
