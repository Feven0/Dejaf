import Breadcrumb from './Breadcrumb';

// Flat page-title banner used on every inner page (About, Training, Services, Vacancies, Contact),
// matching the reference site's pattern: a compact dark title bar + accent rule, then a breadcrumb
// row — distinct from the big animated hero slider reserved for the homepage only.
export default function PageHero({ title, crumbLabel, description }) {
  return (
    <>
      <section className="bg-primary-900 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <span className="w-1 h-10 sm:h-12 bg-gold-500 rounded-full shrink-0" />
            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white">{title}</h1>
          </div>
          {description && <p className="text-primary-300 mt-4 max-w-2xl">{description}</p>}
        </div>
      </section>
      <div className="border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: crumbLabel || title }]} />
        </div>
      </div>
    </>
  );
}
