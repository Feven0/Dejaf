// Minimal inline icon set so the CMS can store a simple keyword (e.g. "users", "flag")
// instead of depending on an external icon package.
const paths = {
  'academic-cap': 'M12 3l9 4.5-9 4.5-9-4.5 9-4.5zM4.5 9.75v4.5c0 1.5 3 3.75 7.5 3.75s7.5-2.25 7.5-3.75v-4.5',
  'chart-bar': 'M4 19V10m5 9V4m5 15v-7m5 7V7',
  'light-bulb': 'M9 18h6M10 21h4M12 3a6 6 0 00-3 11.2c.4.3.6.8.6 1.3v.5h4.8v-.5c0-.5.2-1 .6-1.3A6 6 0 0012 3z',
  'trending-up': 'M3 17l6-6 4 4 8-8M21 7v6h-6',
  users: 'M17 20a4 4 0 00-8 0M5 20a4 4 0 018-0M9 8a3 3 0 106 0 3 3 0 00-6 0z',
  search: 'M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z',
  flag: 'M5 21V4m0 0h11l-2 4 2 4H5',
  'check-circle': 'M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z',
  support: 'M12 17v.5M12 7a3 3 0 100 6 3 3 0 000-6zm-7 5a7 7 0 1114 0 7 7 0 01-14 0z',
  certificate: 'M12 3l9 4.5-9 4.5-9-4.5 9-4.5zM7 12.5V17l5 3 5-3v-4.5',
  briefcase: 'M4 7h16v12H4V7zm4 0V5a2 2 0 012-2h4a2 2 0 012 2v2',
  compass: 'M12 21a9 9 0 100-18 9 9 0 000 18zm3-13l-4 2-2 4 4-2 2-4z',
  'arrow-right': 'M4 12h16m-6-6l6 6-6 6',
  'chevron-down': 'M6 9l6 6 6-6',
  phone: 'M4 5c0-1 1-2 2-2h2l2 5-2 1c1 3 3 5 6 6l1-2 5 2v2c0 1-1 2-2 2-9 0-16-7-16-16z',
  mail: 'M4 6h16v12H4V6zm0 0l8 7 8-7',
  'map-pin': 'M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11zm0-9a2 2 0 100-4 2 2 0 000 4z',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zm0-14v5l3 3',
  facebook: 'M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H8v3h3v6h3v-6h3l1-3h-4V9z',
  linkedin: 'M4 9h3v11H4V9zm1.5-5a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zM11 9h3v1.5c.6-1 1.7-1.7 3-1.7 2.5 0 4 1.7 4 5V20h-3v-5.5c0-1.4-.5-2.5-2-2.5s-2.2 1.1-2.2 2.5V20h-3V9z',
  telegram: 'M21 4L3 11.5l6 2 2 6 3-4 4.5 3.5L21 4zM9.5 13.5l9-6.5-7 7v4.5',
  // Generic abstract logomarks for placeholder client cards — original shapes,
  // not modeled on any real company's trademark.
  'mark-horizon': 'M3 17h18M7 17a5 5 0 0110 0',
  'mark-shield': 'M12 3l7 3v5c0 5-3.2 8.2-7 9-3.8-.8-7-4-7-9V6l7-3z',
  'mark-peaks': 'M3 18l4.5-8 3.5 5 2.5-3.5L19 18H3z',
  'mark-gem': 'M6 3h12l3 5-9 13L3 8l3-5zM3 8h18M9 3l-2 5 5 13 5-13-2-5',
};

// These icons are designed as solid glyphs (brand marks) rather than open line-art,
// so they render filled instead of stroked.
const filledIcons = new Set(['facebook', 'linkedin', 'telegram']);

export default function Icon({ name, className = 'w-6 h-6' }) {
  const d = paths[name] || paths['check-circle'];
  if (filledIcons.has(name)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d={d} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
