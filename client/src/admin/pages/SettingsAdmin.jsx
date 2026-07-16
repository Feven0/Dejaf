import { useEffect, useState } from 'react';
import { settingsApi } from '../../api/resources';

const fields = [
  { name: 'orgName', label: 'Organization Name' },
  { name: 'tagline', label: 'Tagline' },
  { name: 'heroText', label: 'Homepage Hero Text', textarea: true },
  { name: 'aboutText', label: 'About Us Intro Text', textarea: true },
  { name: 'foundingText', label: 'Founding Story (About page)', textarea: true },
  { name: 'whoWeAreText', label: '"Who We Are" Text (About page)', textarea: true },
  { name: 'whatWeDoText', label: '"What We Do" Text (About page)', textarea: true },
  { name: 'howWeWorkText', label: '"How We Work" Text (About page)', textarea: true },
  { name: 'missionText', label: 'Mission Statement', textarea: true },
  { name: 'visionText', label: 'Vision Statement', textarea: true },
  { name: 'phone', label: 'Phone' },
  { name: 'email', label: 'Email' },
  { name: 'address', label: 'Address' },
  { name: 'hours', label: 'Working Hours', textarea: true },
  { name: 'facebookUrl', label: 'Facebook URL' },
  { name: 'linkedinUrl', label: 'LinkedIn URL' },
  { name: 'telegramUrl', label: 'Telegram URL' },
];

export default function SettingsAdmin() {
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    settingsApi.get().then(setForm);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'saving', message: '' });
    try {
      const saved = await settingsApi.update(form);
      setForm(saved);
      setStatus({ state: 'success', message: 'Settings saved.' });
    } catch (err) {
      setStatus({ state: 'error', message: err.response?.data?.message || 'Failed to save' });
    }
  }

  if (!form) return <p className="text-primary-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-800 mb-6">Site Settings</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-primary-100 rounded-xl p-6 shadow-sm max-w-3xl">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {fields.map((f) => (
            <div key={f.name} className={f.textarea ? 'sm:col-span-2' : ''}>
              <label className="block text-sm font-medium text-primary-700 mb-1">{f.label}</label>
              {f.textarea ? (
                <textarea
                  rows={3}
                  value={form[f.name] ?? ''}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full border border-primary-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              ) : (
                <input
                  value={form[f.name] ?? ''}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full border border-primary-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              )}
            </div>
          ))}
        </div>

        {status.message && (
          <p className={`text-sm mb-3 ${status.state === 'error' ? 'text-red-600' : 'text-green-600'}`}>{status.message}</p>
        )}

        <button
          type="submit"
          disabled={status.state === 'saving'}
          className="bg-accent-500 hover:bg-accent-600 disabled:opacity-60 text-white px-5 py-2 rounded-md text-sm font-semibold"
        >
          {status.state === 'saving' ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
