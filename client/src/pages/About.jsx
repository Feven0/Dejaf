import { useEffect, useState } from 'react';
import { settingsApi, statsApi } from '../api/resources';
import Reveal from '../components/Reveal';
import { StaggerGroup, StaggerItem } from '../components/StaggerGroup';
import PageHero from '../components/PageHero';
import ZigzagSection from '../components/ZigzagSection';
import StatIconCard from '../components/StatIconCard';
import Icon from '../components/Icon';

const values = [
  { name: 'Practical', description: 'We ground every program in real-world application, not theory alone.' },
  { name: 'Integrity', description: 'We are accountable for our commitments and the results we deliver.' },
  { name: 'Excellence', description: 'We hold our training, research, and consultancy work to a high standard.' },
  { name: 'Collaboration', description: 'We work as a true partner with every client, not just a vendor.' },
  { name: 'Impact', description: 'We measure success by the change we help create, not sessions delivered.' },
  { name: 'Adaptability', description: 'We evolve our methods and tools to match a fast-changing market.' },
];

const offerings = [
  { icon: 'briefcase', label: 'Workspace & Event Hosting', color: 'accent' },
  { icon: 'trending-up', label: 'Entrepreneur & SME Support', color: 'leaf' },
  { icon: 'compass', label: 'Digital Tools & Resource Center', color: 'gold' },
  { icon: 'users', label: 'Employment & Onboarding Support', color: 'primary' },
  { icon: 'flag', label: 'Executive Coaching', color: 'accent' },
  { icon: 'certificate', label: 'Custom Curriculum Development', color: 'gold' },
];

const offeringIconClasses = {
  gold: 'text-gold-600 bg-gold-500/10',
  leaf: 'text-leaf-600 bg-leaf-500/10',
  accent: 'text-accent-600 bg-accent-500/10',
  primary: 'text-primary-700 bg-primary-500/10',
};

export default function About() {
  const [settings, setSettings] = useState(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    settingsApi.get().then(setSettings).catch(() => {});
    statsApi.list().then(setStats).catch(() => {});
  }, []);

  return (
    <div>
      <PageHero title="About Us" crumbLabel="About Us" />

      {/* Founding story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <Reveal className="grid md:grid-cols-2 gap-10 md:gap-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-primary-800 leading-tight">
            Navigating change with insight, building capability that lasts
          </h2>
          <p className="text-primary-600 leading-relaxed text-lg">
            {settings?.foundingText ||
              'DEJAF Training and Consultancy was founded to close the gap between the training organizations could access and the skills their teams actually needed on the job. We started with a handful of in-house workshops and have since grown into a full capability-building partner, combining training, research, and consultancy under one roof.'}
          </p>
        </Reveal>
      </section>

      {/* Signature visual break */}
      <section className="relative h-56 sm:h-72 bg-gradient-to-br from-primary-800 via-primary-700 to-accent-800 overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 70%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <img src="/logo.jpg" alt="DEJAF" className="relative h-20 sm:h-24 w-auto rounded-xl bg-white p-4 shadow-2xl" />
      </section>

      {/* What makes us special */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-primary-800 mb-4">What Makes Us Special?</h2>
          <p className="text-primary-600 max-w-2xl mx-auto">
            At DEJAF, we stand out by offering unique, hands-on capability-building services. Here's what sets us apart.
          </p>
        </Reveal>
      </section>

      {/* Zigzag storytelling */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20 sm:space-y-28 pb-20 sm:pb-28">
        <ZigzagSection
          eyebrow="Who We Are"
          title="A team grounded in real sector experience"
          text={
            settings?.whoWeAreText ||
            'At the core of DEJAF is a team of experienced trainers, researchers, and consultants who bring real sector experience into every session. Our facilitators have worked inside the institutions we now train, which means our programs are grounded in practice, not just theory.'
          }
          icon="users"
          color="accent"
        />
        <ZigzagSection
          eyebrow="What We Do"
          title="Capability-building, not just courses"
          text={
            settings?.whatWeDoText ||
            'DEJAF is not just a training provider; we design capability-building solutions that strengthen how organizations operate. Through structured courses, applied research, and hands-on advisory work, we help clients close skill gaps and act on opportunities with confidence.'
          }
          icon="light-bulb"
          color="gold"
          reverse
        />
        <ZigzagSection
          eyebrow="How We Work"
          title="Programs built around your challenge"
          text={
            settings?.howWeWorkText ||
            "We start every engagement by understanding the client's real challenge, then build a program around it rather than offering a one-size-fits-all course. Our approach is collaborative and iterative — we adapt content and delivery format as we learn what works for each organization."
          }
          icon="compass"
          color="leaf"
        />
      </section>

      {/* Stats */}
      {stats.length > 0 && (
        <section className="bg-primary-50 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s) => (
                <StaggerItem key={s._id}>
                  <StatIconCard label={s.label} value={s.value} suffix={s.suffix} icon={s.icon} color={s.color} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      {/* Vision / Mission */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid md:grid-cols-2 gap-14">
        <Reveal direction="left">
          <h3 className="text-xl font-heading font-bold text-primary-800 mb-3">Vision</h3>
          <p className="text-primary-600 leading-relaxed">
            {settings?.visionText ||
              'To be the leading capability-building partner for organizations across Ethiopia and the wider region.'}
          </p>
        </Reveal>
        <Reveal direction="right" delay={0.1}>
          <h3 className="text-xl font-heading font-bold text-primary-800 mb-3">Mission</h3>
          <p className="text-primary-600 leading-relaxed">
            {settings?.missionText ||
              'To empower organizations and professionals with the skills, insight, and strategy they need to achieve lasting success.'}
          </p>
        </Reveal>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <Reveal>
          <h3 className="text-xl font-heading font-bold text-primary-800 mb-6">DEJAF Values</h3>
        </Reveal>
        <StaggerGroup className="space-y-4">
          {values.map((v) => (
            <StaggerItem key={v.name}>
              <p className="text-primary-600 leading-relaxed">
                <span className="font-heading font-semibold text-primary-800">{v.name}:</span> {v.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Additional offerings */}
      <section className="bg-primary-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 divide-y sm:divide-y-0 divide-primary-100">
            {offerings.map((o) => (
              <StaggerItem key={o.label}>
                <div className="flex items-center gap-4 pt-4 sm:pt-0">
                  <span className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${offeringIconClasses[o.color]}`}>
                    <Icon name={o.icon} className="w-6 h-6" />
                  </span>
                  <h4 className="font-heading font-semibold text-primary-800">{o.label}</h4>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </div>
  );
}
