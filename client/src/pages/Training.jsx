import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { programsApi } from '../api/resources';
import ProgramCard from '../components/ProgramCard';
import { StaggerGroup, StaggerItem } from '../components/StaggerGroup';
import PageHero from '../components/PageHero';

export default function Training() {
  const [searchParams] = useSearchParams();
  const [programs, setPrograms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fromUrl = searchParams.get('category');
    if (fromUrl) setActiveCategory(fromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    programsApi.categories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = activeCategory === 'All' ? {} : { category: activeCategory };
    programsApi
      .list(params)
      .then(setPrograms)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div>
      <PageHero
        title="Training Programs"
        description="Practical, sector-tailored training spanning leadership, financial services, HR, marketing, and technology."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-10">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat ? 'text-white' : 'text-primary-700 hover:text-accent-600'
              }`}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 bg-accent-500 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {activeCategory !== cat && <span className="absolute inset-0 bg-primary-50 rounded-full -z-10" />}
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-primary-500">Loading programs...</p>
        ) : programs.length === 0 ? (
          <p className="text-primary-500">No programs found in this category yet.</p>
        ) : (
          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p) => (
              <StaggerItem key={p._id}>
                <ProgramCard program={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </div>
  );
}
