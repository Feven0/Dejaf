import { useEffect, useState } from 'react';
import { uploadApi } from '../api/resources';

const emptyFromFields = (fields) =>
  fields.reduce((acc, f) => ({ ...acc, [f.name]: f.type === 'checkbox' ? false : '' }), {});

// Generic list + create/edit form for simple flat CMS resources (services, value props,
// stats, clients, vacancies, programs). Each page passes its own `api` and `fields` config.
export default function ResourceManager({ title, api, fields, renderExtraColumns }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyFromFields(fields));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);

  function load() {
    setLoading(true);
    api
      .list()
      .then(setItems)
      .catch(() => setError('Failed to load data'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startEdit(item) {
    setEditingId(item._id);
    const next = {};
    fields.forEach((f) => {
      next[f.name] = f.type === 'date' && item[f.name] ? item[f.name].slice(0, 10) : item[f.name] ?? (f.type === 'checkbox' ? false : '');
    });
    setForm(next);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyFromFields(fields));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form };
      fields.forEach((f) => {
        if (f.type === 'number') payload[f.name] = Number(payload[f.name]) || 0;
      });
      if (editingId) {
        await api.update(editingId, payload);
      } else {
        await api.create(payload);
      }
      cancelEdit();
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this item? This cannot be undone.')) return;
    await api.remove(id);
    load();
  }

  async function handleImageUpload(fieldName, file) {
    if (!file) return;
    setUploadingField(fieldName);
    setError('');
    try {
      const { url } = await uploadApi.upload(file);
      setForm((prev) => ({ ...prev, [fieldName]: url }));
    } catch (err) {
      setError(err.response?.data?.message || 'Image upload failed');
    } finally {
      setUploadingField(null);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-800 mb-6">{title}</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-primary-100 rounded-xl p-6 mb-8 shadow-sm">
        <h2 className="font-semibold text-primary-800 mb-4">{editingId ? 'Edit item' : 'Add new item'}</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {fields.map((f) => (
            <div key={f.name} className={f.type === 'textarea' || f.type === 'image' ? 'sm:col-span-2' : ''}>
              <label className="block text-sm font-medium text-primary-700 mb-1">{f.label}</label>
              {f.type === 'image' ? (
                <div className="flex items-center gap-4">
                  {form[f.name] && (
                    <img src={form[f.name]} alt="" className="w-16 h-16 object-contain rounded-md border border-primary-200 bg-white shrink-0" />
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      onChange={(e) => handleImageUpload(f.name, e.target.files?.[0])}
                      className="w-full text-sm text-primary-600 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-accent-50 file:text-accent-600 file:text-sm file:font-semibold hover:file:bg-accent-100"
                    />
                    {uploadingField === f.name && <p className="text-xs text-primary-500 mt-1">Uploading...</p>}
                    <input
                      type="text"
                      placeholder="Or paste an image URL"
                      value={form[f.name] ?? ''}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      className="w-full mt-2 border border-primary-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400"
                    />
                  </div>
                </div>
              ) : f.type === 'textarea' ? (
                <textarea
                  required={f.required}
                  rows={3}
                  value={form[f.name] ?? ''}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full border border-primary-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              ) : f.type === 'select' ? (
                <select
                  required={f.required}
                  value={form[f.name] ?? ''}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full border border-primary-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400"
                >
                  <option value="">Select...</option>
                  {f.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : f.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  checked={!!form[f.name]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })}
                  className="h-5 w-5"
                />
              ) : (
                <input
                  required={f.required}
                  type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                  value={form[f.name] ?? ''}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full border border-primary-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              )}
            </div>
          ))}
        </div>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-accent-500 hover:bg-accent-600 disabled:opacity-60 text-white px-5 py-2 rounded-md text-sm font-semibold"
          >
            {saving ? 'Saving...' : editingId ? 'Update' : 'Add'}
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
        ) : items.length === 0 ? (
          <p className="p-6 text-primary-500">No items yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-primary-50 text-primary-700 text-left">
              <tr>
                {fields.slice(0, 3).map((f) => (
                  <th key={f.name} className="px-4 py-3 font-semibold">{f.label}</th>
                ))}
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-primary-100">
                  {fields.slice(0, 3).map((f) => (
                    <td key={f.name} className="px-4 py-3 text-primary-700 max-w-xs truncate">
                      {f.type === 'checkbox' ? (
                        item[f.name] ? 'Yes' : 'No'
                      ) : f.type === 'image' ? (
                        item[f.name] ? (
                          <img src={item[f.name]} alt="" className="h-8 w-auto object-contain" />
                        ) : (
                          '—'
                        )
                      ) : (
                        String(item[f.name] ?? '')
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => startEdit(item)} className="text-primary-600 hover:text-accent-600 font-medium">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700 font-medium">
                      Delete
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
