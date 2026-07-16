import { useEffect, useState } from 'react';
import { vacanciesApi } from '../api/resources';
import { StaggerGroup, StaggerItem } from '../components/StaggerGroup';
import PageHero from '../components/PageHero';

function formatDate(d) {
  return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Vacancies() {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    vacanciesApi.list().then(setVacancies).catch(() => {});
  }, []);

  const openVacancies = vacancies.filter((v) => v.isOpen);

  return (
    <div>
      <PageHero
        title="Vacancy Announcement"
        crumbLabel="Vacancy Announcement"
        description="Join the DEJAF team and help organizations build lasting capability."
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        {openVacancies.length === 0 ? (
          <p className="text-primary-500 text-center">There are no open positions at this time. Please check back soon.</p>
        ) : (
          <StaggerGroup className="space-y-6">
            {openVacancies.map((v) => (
              <StaggerItem key={v._id}>
                <div className="group bg-white border border-primary-100 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:shadow-accent-500/10 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h2 className="text-lg font-heading font-semibold text-primary-800 group-hover:text-accent-600 transition-colors">
                      {v.title}
                    </h2>
                    <span className="text-xs font-semibold uppercase tracking-wide text-accent-600 bg-accent-50 px-3 py-1 rounded-full">
                      Deadline: {formatDate(v.deadline)}
                    </span>
                  </div>
                  <p className="text-primary-600 mb-3 leading-relaxed">{v.description}</p>
                  <p className="text-sm text-primary-500">Location: {v.location}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </div>
  );
}
