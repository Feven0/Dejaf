// Infinite auto-scrolling row, built by duplicating children and animating via CSS keyframes (index.css).
// Pauses on hover so users can look at (or click) a logo. `reverse` runs the track right-to-left,
// used to make a second row scroll opposite the first for a fuller "wall of logos" effect.
export default function Marquee({ items, renderItem, reverse = false, gap = 'gap-12' }) {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={`${reverse ? 'marquee-track-reverse' : 'marquee-track'} flex w-max ${gap} items-center`}>
        {[...items, ...items].map((item, i) => (
          <div key={i} className="shrink-0">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
