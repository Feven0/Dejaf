import { useEffect, useState } from 'react';
import {
  servicesApi,
  valuePropsApi,
  statsApi,
  clientsApi,
  programsApi,
  settingsApi,
  faqsApi,
} from '../api/resources';
import ServiceCard from '../components/ServiceCard';
import ValuePropCard from '../components/ValuePropCard';
import StatCounter from '../components/StatCounter';
import ProgramCard from '../components/ProgramCard';
import HeroSlider from '../components/HeroSlider';
import QuickLinksStrip from '../components/QuickLinksStrip';
import CategoryGrid from '../components/CategoryGrid';
import FaqAccordion from '../components/FaqAccordion';
import NewsletterSignup from '../components/NewsletterSignup';
import Marquee from '../components/Marquee';
import ClientLogo from '../components/ClientLogo';
import Reveal from '../components/Reveal';
import Kicker from '../components/Kicker';
import Button from '../components/Button';
import GradientOrbs from '../components/GradientOrbs';
import EvolutionSection from '../components/EvolutionSection';
import StatementBanner from '../components/StatementBanner';
import { StaggerGroup, StaggerItem } from '../components/StaggerGroup';

export default function Home() {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [valueProps, setValueProps] = useState([]);
  const [stats, setStats] = useState([]);
  const [clients, setClients] = useState([]);
  const [featuredPrograms, setFeaturedPrograms] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    settingsApi.get().then(setSettings).catch(() => {});
    servicesApi.list().then(setServices).catch(() => {});
    valuePropsApi.list().then(setValueProps).catch(() => {});
    statsApi.list().then(setStats).catch(() => {});
    clientsApi.list().then(setClients).catch(() => {});
    programsApi.list({ featured: 'true' }).then(setFeaturedPrograms).catch(() => {});
    faqsApi.list().then(setFaqs).catch(() => {});
  }, []);

  return (
    <div>
      <HeroSlider settings={settings} />
      <QuickLinksStrip />

      <EvolutionSection />

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Kicker>What We Do</Kicker>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-primary-800">
              Four Ways We Build Capability
            </h2>
          </div>
        </Reveal>
        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <StaggerItem key={s._id}>
              <ServiceCard title={s.title} description={s.description} icon={s.icon} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Value props */}
      <section className="bg-primary-50 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Kicker>Why DEJAF</Kicker>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-primary-800">
                Why Organizations Choose Us
              </h2>
            </div>
          </Reveal>
          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {valueProps.map((v) => (
              <StaggerItem key={v._id}>
                <ValuePropCard title={v.title} description={v.description} icon={v.icon} color={v.color} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <StatementBanner />

      {/* Stats */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-20 overflow-hidden">
        <GradientOrbs variant="dark" />
        <Reveal className="relative max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-y-8 lg:divide-x lg:divide-white/10">
          {stats.map((s) => (
            <StatCounter key={s._id} label={s.label} value={s.value} suffix={s.suffix} />
          ))}
        </Reveal>
      </section>

      {/* Featured programs */}
      {featuredPrograms.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <Kicker center={false}>Popular Trainings</Kicker>
                <h2 className="text-3xl sm:text-4xl font-bold font-heading text-primary-800">Featured Programs</h2>
              </div>
              <Button to="/training" variant="outlineDark" className="!py-2 !px-5 text-sm hidden sm:inline-flex">
                View all &rarr;
              </Button>
            </div>
          </Reveal>
          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPrograms.slice(0, 4).map((p) => (
              <StaggerItem key={p._id}>
                <ProgramCard program={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      )}

      <CategoryGrid />

      {/* Clients */}
      {clients.length > 0 && (
        <section className="relative bg-white py-24 overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <Reveal>
              <div className="text-center mb-16">
                <Kicker>Who We Work With</Kicker>
                <h2 className="text-3xl sm:text-5xl font-bold font-heading text-primary-800 mb-4">
                  Trusted by Leading Organizations
                </h2>
                <p className="text-primary-600 max-w-xl mx-auto text-lg">
                  {(() => {
                    const clientStat = stats.find((s) => /client/i.test(s.label));
                    return clientStat
                      ? `Proud to partner with ${clientStat.value}${clientStat.suffix || ''} banks, insurers, and growing businesses across Ethiopia.`
                      : "Proud to partner with banks, insurers, and growing businesses across Ethiopia.";
                  })()}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="relative space-y-6">
            <Marquee
              items={clients}
              gap="gap-8"
              renderItem={(c) => (
                <div className="group bg-white rounded-2xl border border-primary-100 shadow-md px-8 py-6 flex items-center justify-center hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-500/10 hover:border-accent-200 transition-all duration-300">
                  <ClientLogo name={c.name} logoUrl={c.logoUrl} />
                </div>
              )}
            />
            <Marquee
              items={[...clients].reverse()}
              reverse
              gap="gap-8"
              renderItem={(c) => (
                <div className="group bg-white rounded-2xl border border-primary-100 shadow-md px-8 py-6 flex items-center justify-center hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-500/10 hover:border-accent-200 transition-all duration-300">
                  <ClientLogo name={c.name} logoUrl={c.logoUrl} />
                </div>
              )}
            />
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-20 overflow-hidden">
          <GradientOrbs variant="dark" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            <Reveal>
              <div className="text-center mb-12">
                <Kicker dark>Got Questions?</Kicker>
                <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">Frequently Asked Questions</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqAccordion faqs={faqs} dark />
            </Reveal>
          </div>
        </section>
      )}

      <NewsletterSignup />

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
        <Reveal>
          <Kicker>Let's Talk</Kicker>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-primary-800 mb-4">
            Ready to build your team's capability?
          </h2>
          <p className="text-primary-600 mb-9 text-lg">
            Get in touch and let's design a program that fits your organization.
          </p>
          <Button to="/contact" variant="gold">
            Contact Us <span aria-hidden="true">&rarr;</span>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
