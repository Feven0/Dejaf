import { useEffect, useState } from 'react';
import { dashboardApi } from '../../api/resources';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    dashboardApi.summary().then(setSummary).catch(() => {});
  }, []);

  const cards = [
    { label: 'Training Programs', value: summary?.programCount },
    { label: 'Open Vacancies', value: summary?.openVacancyCount },
    { label: 'Unread Messages', value: summary?.unreadMessageCount },
    { label: 'Admin Users', value: summary?.userCount },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-800 mb-2">Welcome, {user?.name}</h1>
      <p className="text-primary-500 mb-8">Here's a quick overview of the DEJAF site content.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border border-primary-100 rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-primary-800">{c.value ?? '—'}</div>
            <div className="text-sm text-primary-500 mt-1">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
