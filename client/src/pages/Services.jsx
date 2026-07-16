import { useEffect, useState } from 'react';
import { servicesApi } from '../api/resources';
import ServiceCard from '../components/ServiceCard';
import Reveal from '../components/Reveal';
import { StaggerGroup, StaggerItem } from '../components/StaggerGroup';
import PageHero from '../components/PageHero';
import Button from '../components/Button';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    servicesApi.list().then(setServices).catch(() => {});
  }, []);

  return (
    <div>
      <PageHero
        title="Our Services"
        description="Research, consultancy, and capacity building alongside our training programs — one partner for the full journey."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((s) => (
            <StaggerItem key={s._id}>
              <ServiceCard title={s.title} description={s.description} icon={s.icon} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="relative overflow-hidden bg-gradient-to-br from-primary-800 to-primary-900 rounded-3xl p-10 text-center">
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-gold-500/20 blur-3xl pointer-events-none" />
          <h2 className="relative text-2xl font-heading font-bold text-white mb-3">Need a tailored engagement?</h2>
          <p className="relative text-primary-200 mb-8 max-w-xl mx-auto">
            Every organization is different. Tell us about your goals and we'll design a program around them.
          </p>
          <Button to="/contact" variant="gold" className="relative">
            Talk to Us
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
