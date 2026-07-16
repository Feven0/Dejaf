import { NavLink, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/programs', label: 'Training Programs' },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/value-props', label: 'Value Propositions' },
  { to: '/admin/stats', label: 'Stats' },
  { to: '/admin/clients', label: 'Client Logos' },
  { to: '/admin/vacancies', label: 'Vacancies' },
  { to: '/admin/faqs', label: 'FAQs' },
  { to: '/admin/messages', label: 'Contact Messages' },
  { to: '/admin/subscribers', label: 'Newsletter Subscribers' },
  { to: '/admin/settings', label: 'Site Settings' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-accent-500 text-white' : 'text-primary-100 hover:bg-primary-700'
    }`;

  return (
    <div className="min-h-screen flex bg-primary-50">
      <aside className="w-64 shrink-0 bg-primary-800 flex flex-col">
        <div className="p-4 border-b border-primary-700">
          <img src="/logo.jpg" alt="DEJAF" className="h-9 w-auto rounded bg-white p-1" />
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          {user?.role === 'admin' && (
            <NavLink to="/admin/users" className={linkClass}>
              Users
            </NavLink>
          )}
        </nav>
        <div className="p-4 border-t border-primary-700">
          <p className="text-primary-200 text-xs mb-2">
            Signed in as <span className="text-white font-medium">{user?.name}</span> ({user?.role})
          </p>
          <button onClick={logout} className="text-sm text-gold-500 hover:text-gold-400 font-medium">
            Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-primary-100 px-6 py-3 flex justify-between items-center">
          <span className="text-sm text-primary-500">DEJAF Content Management</span>
          <Link to="/" target="_blank" className="text-sm text-accent-600 hover:underline">
            View site &rarr;
          </Link>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
