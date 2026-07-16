import { useEffect, useState } from 'react';
import { newsletterApi } from '../../api/resources';

export default function SubscribersAdmin() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    newsletterApi.list().then(setSubscribers).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function remove(id) {
    if (!confirm('Remove this subscriber?')) return;
    await newsletterApi.remove(id);
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-800 mb-6">Newsletter Subscribers</h1>

      <div className="bg-white border border-primary-100 rounded-xl shadow-sm overflow-x-auto">
        {loading ? (
          <p className="p-6 text-primary-500">Loading...</p>
        ) : subscribers.length === 0 ? (
          <p className="p-6 text-primary-500">No subscribers yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-primary-50 text-primary-700 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Subscribed</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s._id} className="border-t border-primary-100">
                  <td className="px-4 py-3 text-primary-700">{s.email}</td>
                  <td className="px-4 py-3 text-primary-500">{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => remove(s._id)} className="text-red-500 hover:text-red-700 font-medium">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
