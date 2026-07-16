import Reveal from './Reveal';
import Button from './Button';

// Full-bleed photo banner with a dark overlay and a bold statement — a visual palate-cleanser
// between sections, mirroring the reference site's dark photo band before the stats bar.
export default function StatementBanner() {
  return (
    <section className="relative h-[420px] sm:h-[480px] overflow-hidden">
      <img
        src="https://picsum.photos/id/1078/1600/700"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-900/80 to-primary-900/40" />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
        <Reveal className="max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white leading-tight mb-6">
            Gain a competitive edge with the latest research, expert guidance, and practical training.
          </h2>
          <Button to="/services" variant="gold">
            Explore Our Services <span aria-hidden="true">&rarr;</span>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
