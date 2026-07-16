import Reveal from './Reveal';
import Kicker from './Kicker';
import Icon from './Icon';
import { StaggerGroup, StaggerItem } from './StaggerGroup';

const photos = [
  'https://picsum.photos/id/3/500/500',
  'https://picsum.photos/id/4/500/500',
  'https://picsum.photos/id/6/500/500',
  'https://picsum.photos/id/36/500/500',
];

const checklist = [
  {
    title: 'Increase your productivity',
    description: 'We partner with you to streamline processes and improve workflows through research-backed solutions.',
  },
  {
    title: 'Enhance innovation',
    description: 'Work with us to identify and capitalize on new opportunities for growth based on research and market trends.',
  },
  {
    title: 'Improve employee engagement',
    description: 'Participate in our training and development programs, equipping your team with the skills to thrive.',
  },
  {
    title: "Unlock your organization's full potential",
    description: 'Partner with us on a tailored plan for lasting success, built on strategic planning and capacity building.',
  },
];

// Mirrors the reference site's "Experience the Evolution of your Business" section:
// a photo grid paired with a benefit checklist, introducing what partnering with DEJAF looks like.
export default function EvolutionSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <StaggerGroup className="grid grid-cols-2 gap-4">
          {photos.map((src, i) => (
            <StaggerItem key={src} className={i % 2 === 1 ? 'mt-8' : ''}>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg shadow-primary-900/10 border border-primary-100">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div>
          <Reveal>
            <Kicker center={false}>How We Help</Kicker>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-primary-800 mb-5">
              Experience the Evolution of Your Organization
            </h2>
            <p className="text-primary-600 leading-relaxed mb-8">
              DEJAF, backed by real sector experience, helps you build the people, insight, and strategy
              needed to compete. Partner with us, and let's:
            </p>
          </Reveal>

          <StaggerGroup className="space-y-6">
            {checklist.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex gap-4">
                  <span className="w-8 h-8 shrink-0 rounded-full bg-leaf-500/10 text-leaf-600 flex items-center justify-center mt-0.5">
                    <Icon name="check-circle" className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-heading font-semibold text-primary-800 mb-1">{item.title}</h4>
                    <p className="text-sm text-primary-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
