import { Link } from 'react-router-dom';
import { StaggerGroup, StaggerItem } from './StaggerGroup';
import Reveal from './Reveal';
import Kicker from './Kicker';

const categories = [
  { name: 'Leadership', blurb: 'Elevate leadership skills with our focused development programs.' },
  { name: 'Banking, Insurance & Microfinance', blurb: 'Specialized training tailored for financial-sector professionals.' },
  { name: 'HR Management', blurb: 'Explore modern HR strategies with specialized, practical training.' },
  { name: 'Marketing & Customer Service', blurb: 'Elevate skills in marketing, communication, and customer service.' },
  { name: 'Tech & Innovation', blurb: 'Stay ahead with technology and innovation-focused programs.' },
];

export default function CategoryGrid() {
  return (
    <section className="bg-primary-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Kicker>Explore by Category</Kicker>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-primary-800 mb-3">
              Professional Development Programs
            </h2>
            <p className="text-primary-600">Empower your career growth with specialized training across industries.</p>
          </div>
        </Reveal>

        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          {categories.map((cat, i) => (
            <StaggerItem key={cat.name}>
              <Link
                to={`/training?category=${encodeURIComponent(cat.name)}`}
                className="group block bg-white rounded-2xl p-6 h-full border border-primary-100 shadow-sm hover:shadow-xl hover:shadow-accent-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="font-serif italic text-gold-600 text-sm">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-heading font-semibold text-lg text-primary-800 mt-2 mb-2 group-hover:text-accent-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-primary-600 text-sm leading-relaxed mb-4">{cat.blurb}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
