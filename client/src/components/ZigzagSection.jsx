import Reveal from './Reveal';
import Icon from './Icon';

const colorClasses = {
  gold: 'from-gold-400/20 to-gold-500/5 text-gold-600',
  leaf: 'from-leaf-400/20 to-leaf-500/5 text-leaf-600',
  accent: 'from-accent-400/20 to-accent-500/5 text-accent-600',
  primary: 'from-primary-400/20 to-primary-500/5 text-primary-700',
};

// Alternating image/text storytelling block (Who we are / What we do / How we work).
// Pass a real `image` URL when available; otherwise falls back to a soft gradient panel
// with an icon. Height is capped so this never dominates the viewport on wide screens.
export default function ZigzagSection({ eyebrow, title, text, icon, image, color = 'gold', reverse = false }) {
  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <Reveal direction={reverse ? 'right' : 'left'} className={reverse ? 'md:order-2' : 'md:order-1'}>
        <p className="text-accent-600 font-semibold uppercase text-xs tracking-[0.2em] mb-3">{eyebrow}</p>
        <h3 className="text-2xl sm:text-3xl font-bold font-heading text-primary-800 mb-4">{title}</h3>
        <p className="text-primary-600 leading-relaxed text-lg">{text}</p>
      </Reveal>
      <Reveal direction={reverse ? 'left' : 'right'} delay={0.1} className={reverse ? 'md:order-1' : 'md:order-2'}>
        <div className="relative aspect-[4/3] max-h-80 sm:max-h-96 rounded-3xl overflow-hidden border border-primary-100">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${colorClasses[color] || colorClasses.gold} flex items-center justify-center relative`}
            >
              <Icon name={icon} className="w-24 h-24 opacity-80" />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-white/40 blur-2xl" />
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
