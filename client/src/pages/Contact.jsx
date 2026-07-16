import { useEffect, useState } from 'react';
import { contactApi, settingsApi } from '../api/resources';
import Reveal from '../components/Reveal';
import { StaggerGroup, StaggerItem } from '../components/StaggerGroup';
import PageHero from '../components/PageHero';
import Icon from '../components/Icon';
import Button from '../components/Button';

const initialForm = { name: '', email: '', message: '' };

export default function Contact() {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    settingsApi.get().then(setSettings).catch(() => {});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const res = await contactApi.submit(form);
      setStatus({ state: 'success', message: res.message });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        state: 'error',
        message: err.response?.data?.message || 'Something went wrong. Please try again.',
      });
    }
  }

  const address = settings?.address || 'Bole Road, Addis Ababa, Ethiopia';
  const phone = settings?.phone || '+251 900 000 000';
  const email = settings?.email || 'info@dejaf.com';
  const hours = settings?.hours || 'Mon–Fri: 8:00 AM – 5:00 PM, Sat: 8:00 AM – 12:00 PM';
  const [weekday, saturday] = hours.split(',').map((s) => s.trim());

  const infoCards = [
    { icon: 'map-pin', color: 'primary', title: 'Address', lines: [address] },
    { icon: 'users', color: 'leaf', title: 'Contact Info', lines: [`Mobile: ${phone}`, `Mail: ${email}`] },
    { icon: 'clock', color: 'gold', title: 'Work Timer', lines: [weekday, saturday].filter(Boolean) },
  ];

  const iconColorClasses = {
    gold: 'text-gold-600 bg-gold-500/10',
    leaf: 'text-leaf-600 bg-leaf-500/10',
    accent: 'text-accent-600 bg-accent-500/10',
    primary: 'text-primary-700 bg-primary-500/10',
  };

  return (
    <div>
      <PageHero title="Contact Us" crumbLabel="Contact" />

      {/* Info cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <StaggerGroup className="grid sm:grid-cols-3 gap-6">
          {infoCards.map((c) => (
            <StaggerItem key={c.title}>
              <div className="bg-white rounded-2xl border border-primary-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-8 text-center h-full">
                <div className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center ${iconColorClasses[c.color]}`}>
                  <Icon name={c.icon} className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-primary-800 text-lg mb-3">{c.title}</h3>
                {c.lines.map((line) => (
                  <p key={line} className="text-primary-600 text-sm">{line}</p>
                ))}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Send a message */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <Reveal className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-primary-800 mb-3">Send a Message</h2>
          <p className="text-primary-600">Fill the form below so we can get to know you and your needs better.</p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          <Reveal direction="left" className="min-h-[320px] rounded-2xl overflow-hidden border border-primary-100 shadow-sm">
            <iframe
              title="DEJAF location"
              className="w-full h-full min-h-[320px]"
              loading="lazy"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=m&z=13&output=embed&iwloc=near`}
            />
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-primary-50/70 border border-transparent rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:bg-white"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-primary-50/70 border border-transparent rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:bg-white"
              />
              <textarea
                required
                rows={5}
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-primary-50/70 border border-transparent rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:bg-white"
              />

              {status.state === 'success' && <p className="text-leaf-600 text-sm">{status.message}</p>}
              {status.state === 'error' && <p className="text-red-600 text-sm">{status.message}</p>}

              <Button
                type="submit"
                variant="gold"
                className={status.state === 'loading' ? 'opacity-60 pointer-events-none' : ''}
              >
                {status.state === 'loading' ? 'Sending...' : 'Submit'}
              </Button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
