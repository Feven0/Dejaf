import { Link } from 'react-router-dom';
import Icon from './Icon';

const items = [
  { icon: 'academic-cap', label: 'Training Programs', to: '/training' },
  { icon: 'check-circle', label: 'Certified Courses', to: '/training' },
  { icon: 'flag', label: 'Discover DEJAF', to: '/about' },
];

export default function QuickLinksStrip() {
  return (
    <div className="bg-primary-800 border-t border-primary-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3">
        {items.map((item, i) => (
          <Link
            key={item.label}
            to={item.to}
            className={`group flex items-center gap-4 px-6 py-6 hover:bg-primary-700 transition-colors ${
              i > 0 ? 'sm:border-l border-primary-700' : ''
            }`}
          >
            <span className="w-10 h-10 shrink-0 rounded-lg bg-gold-500/15 text-gold-500 flex items-center justify-center">
              <Icon name={item.icon} className="w-5 h-5" />
            </span>
            <span className="font-heading font-semibold text-white">{item.label}</span>
            <span className="ml-auto text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
