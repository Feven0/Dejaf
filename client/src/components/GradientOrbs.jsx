// Soft blurred gradient blobs for depth behind hero/dark sections. Pure CSS, no images.
// `variant="dark"` (default) suits navy/gradient backgrounds; "light" suits pale sections.
export default function GradientOrbs({ variant = 'dark', className = '' }) {
  const palette =
    variant === 'dark'
      ? ['bg-accent-500/30', 'bg-gold-500/20', 'bg-primary-400/20']
      : ['bg-accent-200/40', 'bg-gold-400/30', 'bg-primary-200/40'];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl animate-float ${palette[0]}`} />
      <div
        className={`absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full blur-3xl animate-float ${palette[1]}`}
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className={`absolute -bottom-32 left-1/3 w-80 h-80 rounded-full blur-3xl animate-float ${palette[2]}`}
        style={{ animationDelay: '3s' }}
      />
      <div className="grain-overlay" />
    </div>
  );
}
