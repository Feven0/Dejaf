// Small eyebrow label used above section headings for an editorial, consistent rhythm.
export default function Kicker({ children, dark = false, center = true }) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
      <span className="h-px w-8 bg-gold-500" />
      <p className={`font-serif italic text-base tracking-wide ${dark ? 'text-gold-400' : 'text-accent-600'}`}>
        {children}
      </p>
      <span className="h-px w-8 bg-gold-500" />
    </div>
  );
}
