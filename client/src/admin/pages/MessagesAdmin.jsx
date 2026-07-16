import { useEffect, useState } from 'react';
import { contactApi } from '../../api/resources';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    contactApi.list().then(setMessages).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function toggleRead(msg) {
    await contactApi.markRead(msg._id, !msg.isRead);
    load();
  }

  async function remove(id) {
    if (!confirm('Delete this message?')) return;
    await contactApi.remove(id);
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-800 mb-6">Contact Messages</h1>

      {loading ? (
        <p className="text-primary-500">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-primary-500">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`bg-white border rounded-xl p-5 shadow-sm ${m.isRead ? 'border-primary-100' : 'border-accent-400'}`}
            >
              <div className="flex flex-wrap justify-between gap-2 mb-2">
                <div>
                  <span className="font-semibold text-primary-800">{m.name}</span>
                  <span className="text-primary-500 text-sm ml-2">{m.email}</span>
                  {m.phone && <span className="text-primary-500 text-sm ml-2">{m.phone}</span>}
                </div>
                <span className="text-xs text-primary-400">{new Date(m.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-primary-700 mb-3">{m.message}</p>
              <div className="flex gap-4 text-sm">
                <button onClick={() => toggleRead(m)} className="text-primary-600 hover:text-accent-600 font-medium">
                  Mark as {m.isRead ? 'unread' : 'read'}
                </button>
                <button onClick={() => remove(m._id)} className="text-red-500 hover:text-red-700 font-medium">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
