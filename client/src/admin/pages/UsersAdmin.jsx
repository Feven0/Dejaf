import { useEffect, useState } from 'react';
import { usersApi } from '../../api/resources';
import { useAuth } from '../../context/AuthContext';

const emptyForm = { name: '', email: '', password: '', role: 'editor' };

export default function UsersAdmin() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    usersApi.list().then(setUsers).finally(() => setLoading(false));
  }

  useEffect(load, []);

  function startEdit(u) {
    setEditingId(u._id);
    setForm({ name: u.name, email: u.email, password: '', role: u.role });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        const payload = { name: form.name, email: form.email, role: form.role };
        if (form.password) payload.password = form.password;
        await usersApi.update(editingId, payload);
      } else {
        if (!form.password) {
          setError('Password is required for a new user');
          return;
        }
        await usersApi.create(form);
      }
      cancelEdit();
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save user');
    }
  }

  async function remove(id) {
    if (!confirm('Delete this user?')) return;
    await usersApi.remove(id);
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-800 mb-6">Manage Users</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-primary-100 rounded-xl p-6 mb-8 shadow-sm max-w-xl">
        <h2 className="font-semibold text-primary-800 mb-4">{editingId ? 'Edit user' : 'Add new user'}</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-primary-200 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-primary-200 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">
              Password {editingId && <span className="text-primary-400">(leave blank to keep current)</span>}
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-primary-200 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full border border-primary-200 rounded-md px-3 py-2 text-sm"
            >
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-md text-sm font-semibold">
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="px-5 py-2 rounded-md text-sm font-semibold border border-primary-200 text-primary-700">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white border border-primary-100 rounded-xl shadow-sm overflow-x-auto">
        {loading ? (
          <p className="p-6 text-primary-500">Loading...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-primary-50 text-primary-700 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-primary-100">
                  <td className="px-4 py-3 text-primary-700">{u.name}</td>
                  <td className="px-4 py-3 text-primary-700">{u.email}</td>
                  <td className="px-4 py-3 text-primary-700 capitalize">{u.role}</td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => startEdit(u)} className="text-primary-600 hover:text-accent-600 font-medium">
                      Edit
                    </button>
                    {u._id !== currentUser?.id && (
                      <button onClick={() => remove(u._id)} className="text-red-500 hover:text-red-700 font-medium">
                        Delete
                      </button>
                    )}
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
