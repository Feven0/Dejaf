import Icon from './Icon';
import AnimatedCounter from './AnimatedCounter';

const colorClasses = {
  gold: 'text-gold-600',
  leaf: 'text-leaf-600',
  accent: 'text-accent-600',
  primary: 'text-primary-700',
};

export default function StatIconCard({ label, value, suffix, icon, color = 'gold' }) {
  return (
    <div className="bg-white rounded-2xl border border-primary-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 text-center">
      <div className={`mx-auto mb-4 w-14 h-14 rounded-full flex items-center justify-center bg-primary-50 ${colorClasses[color] || colorClasses.gold}`}>
        <Icon name={icon} className="w-7 h-7" />
      </div>
      <div className={`text-3xl font-bold font-heading mb-1 ${colorClasses[color] || colorClasses.gold}`}>
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <p className="text-primary-600 text-sm">{label}</p>
    </div>
  );
}
