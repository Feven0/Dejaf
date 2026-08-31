import Icon from './Icon';

const palettes = [
  { text: 'text-accent-600', bg: 'bg-accent-500/10' },
  { text: 'text-primary-800', bg: 'bg-primary-500/10' },
  { text: 'text-leaf-600', bg: 'bg-leaf-500/10' },
  { text: 'text-gold-600', bg: 'bg-gold-500/10' },
];

// Distinct original abstract logomarks for the seeded fictional demo companies. Any other
// client (i.e. a real one added later without an uploaded logo) falls back to a plain
// monogram badge below, rather than reusing one of these specific marks.
const marksByName = {
  'Horizon Bank': 'mark-horizon',
  'Meridian Insurance': 'mark-shield',
  'Highland Microfinance': 'mark-peaks',
  'Sunrise Capital': 'mark-gem',
};

// Deterministic palette pick from the client name, so the same client always renders
// in the same color across the (duplicated) marquee rows.
function paletteFor(name) {
  const hash = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return palettes[hash % palettes.length];
}

// Renders the real uploaded logo image when present; otherwise falls back to a generic
// icon-mark + wordmark lockup built from real DOM/SVG (so it always uses our loaded Poppins
// font/colors, unlike a baked-in placeholder image which can't access page-level web fonts).
// These marks are original abstract shapes, not a recreation of any real company's logo —
// swap in the real file via /admin/clients when ready.
export default function ClientLogo({ name, logoUrl, className = 'h-10 sm:h-12' }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={name}
        className={`${className} w-auto opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 object-contain`}
      />
    );
  }

  const palette = paletteFor(name);
  const markIcon = marksByName[name];

  return (
    <span className="inline-flex items-center gap-3 opacity-90 group-hover:opacity-100 transition-all duration-300">
      <span
        className={`w-10 h-10 sm:w-14 sm:h-14 shrink-0 rounded-full flex items-center justify-center font-heading font-bold text-base sm:text-xl ${palette.bg} ${palette.text}`}
      >
        {markIcon ? <Icon name={markIcon} className="w-5 h-5 sm:w-7 sm:h-7" /> : name.trim()[0]}
      </span>
      <span className={`font-heading font-bold text-lg sm:text-2xl whitespace-nowrap ${palette.text}`}>{name}</span>
    </span>
  );
}
