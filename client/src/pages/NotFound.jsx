import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-primary-800 mb-4">404</h1>
      <p className="text-primary-600 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-md font-semibold transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
