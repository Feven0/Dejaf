import AnimatedCounter from './AnimatedCounter';

export default function StatCounter({ label, value, suffix }) {
  return (
    <div className="text-center px-4 relative">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gold-500/10 blur-2xl" />
      <div className="relative text-4xl sm:text-5xl font-serif font-semibold text-white tracking-tight">
        <AnimatedCounter value={value} />
        <span className="text-gradient-gold">{suffix}</span>
      </div>
      <div className="relative text-xs sm:text-sm text-primary-200 mt-2 uppercase tracking-[0.15em]">{label}</div>
    </div>
  );
}
