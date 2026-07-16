import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { settingsApi, servicesApi } from '../api/resources';
import Icon from './Icon';

const socialLinks = [
  { key: 'facebookUrl', icon: 'facebook', label: 'Facebook' },
  { key: 'linkedinUrl', icon: 'linkedin', label: 'LinkedIn' },
  { key: 'telegramUrl', icon: 'telegram', label: 'Telegram' },
];

export default function Footer() {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    settingsApi.get().then(setSettings).catch(() => {});
    servicesApi.list().then(setServices).catch(() => {});
  }, []);

  const year = new Date().getFullYear();
  const activeSocials = socialLinks.filter((s) => settings?.[s.key]);

  return (
    <footer className="relative bg-gradient-to-b from-primary-800 to-primary-900 text-primary-100 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 flex items-center justify-between flex-wrap gap-6">
        <img src="/logo.jpg" alt="DEJAF Training and Consultancy" className="h-10 w-auto rounded bg-white p-1" />
        {activeSocials.length > 0 && (
          <div className="flex gap-3">
            {activeSocials.map((s) => (
              <a
                key={s.key}
                href={settings[s.key]}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-primary-100 hover:bg-gold-500 hover:text-primary-900 hover:scale-110 transition-all duration-200"
              >
                <Icon name={s.icon} className="w-4 h-4" />
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h4 className="font-heading font-bold text-white mb-3 text-lg">
            About <span className="text-gold-500">DEJAF</span>
          </h4>
          <span className="block w-10 h-1 bg-gradient-to-r from-gold-500 to-accent-500 rounded-full mb-4" />
          <p className="text-sm text-primary-200 leading-relaxed">
            {settings?.aboutText ||
              'DEJAF Training and Consultancy is a capacity-building organization dedicated to strengthening people and institutions across the region.'}
          </p>
        </div>

        <div>
          <h4 className="font-heading font-bold text-white mb-3 text-lg">
            Our <span className="text-gold-500">Services</span>
          </h4>
          <span className="block w-10 h-1 bg-gradient-to-r from-gold-500 to-accent-500 rounded-full mb-4" />
          <ul className="space-y-2 text-sm text-primary-200">
            {services.length > 0 ? (
              services.map((s) => (
                <li key={s._id}>
                  <Link to="/services" className="hover:text-accent-400 transition-colors">{s.title}</Link>
                </li>
              ))
            ) : (
              <>
                <li><Link to="/services" className="hover:text-accent-400 transition-colors">Training</Link></li>
                <li><Link to="/services" className="hover:text-accent-400 transition-colors">Research</Link></li>
                <li><Link to="/services" className="hover:text-accent-400 transition-colors">Consultancy</Link></li>
                <li><Link to="/services" className="hover:text-accent-400 transition-colors">Capacity Building</Link></li>
              </>
            )}
            <li><Link to="/vacancies" className="hover:text-accent-400 transition-colors">Vacancy Announcement</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-white mb-3 text-lg">Contact</h4>
          <span className="block w-10 h-1 bg-gradient-to-r from-gold-500 to-accent-500 rounded-full mb-4" />
          <ul className="space-y-3 text-sm text-primary-200">
            <li className="flex items-start gap-3">
              <Icon name="phone" className="w-4 h-4 mt-0.5 text-accent-400 shrink-0" />
              {settings?.phone || '+251 900 000 000'}
            </li>
            <li className="flex items-start gap-3">
              <Icon name="mail" className="w-4 h-4 mt-0.5 text-accent-400 shrink-0" />
              {settings?.email || 'info@dejaf.com'}
            </li>
            <li className="flex items-start gap-3">
              <Icon name="map-pin" className="w-4 h-4 mt-0.5 text-accent-400 shrink-0" />
              {settings?.address || 'Addis Ababa, Ethiopia'}
            </li>
            <li className="flex items-start gap-3">
              <Icon name="clock" className="w-4 h-4 mt-0.5 text-accent-400 shrink-0" />
              <span className="whitespace-pre-line">
                {settings?.hours || 'Mon–Fri: 8:00 AM – 5:00 PM\nSat: 8:00 AM – 12:00 PM'}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-300">
          <span>&copy; {year} DEJAF Training and Consultancy. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-primary-100 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary-100 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
