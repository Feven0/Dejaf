import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-primary-400">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <span className="text-primary-300">/</span>}
          {item.to ? (
            <Link to={item.to} className="hover:text-accent-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-primary-700 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
