// A soft SVG wave to transition between two differently-colored sections,
// used instead of a hard rectangular color cut for a more "designed" flow.
// `flip` mirrors the curve vertically so it can cap either the top or bottom of a section.
export default function SectionDivider({ fill = '#ffffff', flip = false, className = '' }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 80" className="w-full h-12 sm:h-16" preserveAspectRatio="none">
        <path
          d="M0,32 C240,80 480,0 720,24 C960,48 1200,88 1440,32 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
