require('dotenv').config();
const bcrypt = require('bcryptjs');
const slugify = require('slugify');
const connectDB = require('../config/db');

const User = require('../models/User');
const Program = require('../models/Program');
const Service = require('../models/Service');
const ValueProp = require('../models/ValueProp');
const Stat = require('../models/Stat');
const Client = require('../models/Client');
const Vacancy = require('../models/Vacancy');
const SiteSettings = require('../models/SiteSettings');
const Faq = require('../models/Faq');

const services = [
  {
    title: 'Training',
    icon: 'academic-cap',
    description:
      'Practical, sector-tailored training that builds employee skill and confidence, from frontline staff to senior leadership.',
    order: 1,
  },
  {
    title: 'Research',
    icon: 'chart-bar',
    description:
      'Market and organizational research that reveals opportunities and gives clients the insight to act with confidence.',
    order: 2,
  },
  {
    title: 'Consultancy',
    icon: 'light-bulb',
    description:
      'Tailored strategies and hands-on advisory support to help organizations solve real operational and strategic challenges.',
    order: 3,
  },
  {
    title: 'Capacity Building',
    icon: 'trending-up',
    description:
      'Long-term programs that strengthen institutions and people for sustainable growth, not just one-off workshops.',
    order: 4,
  },
];

const valueProps = [
  {
    title: 'Empowering Staff',
    description: 'We equip employees with the practical skills they need to perform at a higher level.',
    icon: 'users',
    color: 'leaf',
    order: 1,
  },
  {
    title: 'Revealing Opportunity',
    description: 'Our research uncovers market opportunities clients can act on with confidence.',
    icon: 'search',
    color: 'gold',
    order: 2,
  },
  {
    title: 'Winning Strategy',
    description: 'We help leadership teams develop strategies that hold up in a competitive market.',
    icon: 'flag',
    color: 'accent',
    order: 3,
  },
  {
    title: 'Sustainable Growth',
    description: 'Our capacity-building programs are designed for lasting impact, not short-term fixes.',
    icon: 'trending-up',
    color: 'leaf',
    order: 4,
  },
  {
    title: 'Practical Solutions',
    description: 'Every engagement is grounded in real, applicable solutions rather than theory alone.',
    icon: 'check-circle',
    color: 'gold',
    order: 5,
  },
  {
    title: 'End-to-End Support',
    description: 'From diagnosis to delivery, we combine training, research, and consultancy under one partner.',
    icon: 'support',
    color: 'primary',
    order: 6,
  },
];

const faqs = [
  {
    question: 'What training do you offer?',
    answer:
      'We offer programs across leadership, banking & insurance, microfinance, HR, marketing & customer service, and technology & innovation — for individuals and organizations.',
    order: 1,
  },
  {
    question: 'Are the training programs tailored for individuals or companies?',
    answer:
      'Both. We run open enrollment courses for individuals and fully customized, in-house programs designed around a specific organization’s needs.',
    order: 2,
  },
  {
    question: 'Can DEJAF customize training programs based on specific needs?',
    answer:
      'Yes — every engagement starts with understanding your goals, and we adapt content, format, and duration to match your team and industry.',
    order: 3,
  },
  {
    question: 'Does the training suit individuals at all skill levels?',
    answer:
      'We design programs across skill levels, from foundational courses for new staff to advanced strategic programs for senior leaders.',
    order: 4,
  },
];

const stats = [
  { label: 'Programs Delivered', value: 120, suffix: '+', icon: 'academic-cap', color: 'accent', order: 1 },
  { label: 'Professionals Trained', value: 3200, suffix: '+', icon: 'users', color: 'gold', order: 2 },
  { label: 'Certified Trainers', value: 18, suffix: '+', icon: 'certificate', color: 'leaf', order: 3 },
  { label: 'Satisfied Clients', value: 40, suffix: '+', icon: 'flag', color: 'primary', order: 4 },
];

// Fictional placeholder companies (not real institutions) so the "Trusted by" section
// looks polished for demos without implying a partnership with any real, identifiable
// organization. No logoUrl yet — the client renders a generic logomark + wordmark until a
// real logo is uploaded via /admin/clients (see ClientLogo.jsx).
const clients = [
  { name: 'Horizon Bank', logoUrl: '', order: 1 },
  { name: 'Meridian Insurance', logoUrl: '', order: 2 },
  { name: 'Highland Microfinance', logoUrl: '', order: 3 },
  { name: 'Sunrise Capital', logoUrl: '', order: 4 },
];

// `image` uses specific hand-picked Picsum Photos IDs (architecture/desks/tech — no
// identifiable people, no API key/attribution required) so the cards look professional
// before real photos are uploaded via /admin/programs.
const programs = [
  {
    title: 'Foundations of Leadership',
    category: 'Leadership',
    description: 'Core leadership principles for new and aspiring managers, from delegation to decision-making.',
    duration: '3 days',
    format: 'In-person',
    image: 'https://picsum.photos/id/1076/600/400',
    featured: true,
    order: 1,
  },
  {
    title: 'Strategic Leadership for Senior Executives',
    category: 'Leadership',
    description: 'Advanced strategic thinking, change management, and organizational leadership for senior leaders.',
    duration: '5 days',
    format: 'In-person',
    image: 'https://picsum.photos/id/1048/600/400',
    featured: false,
    order: 2,
  },
  {
    title: 'Banking Operations & Risk Essentials',
    category: 'Banking, Insurance & Microfinance',
    description: 'A practical overview of core banking operations, credit risk, and regulatory compliance.',
    duration: '4 days',
    format: 'In-person',
    image: 'https://picsum.photos/id/249/600/400',
    featured: true,
    order: 3,
  },
  {
    title: 'Negotiation Skills for Banking Professionals',
    category: 'Banking, Insurance & Microfinance',
    description: 'Sharpen negotiation techniques for client relationships, credit terms, and vendor contracts.',
    duration: '2 days',
    format: 'In-person',
    image: 'https://picsum.photos/id/201/600/400',
    featured: true,
    order: 4,
  },
  {
    title: 'Microfinance Institution Management',
    category: 'Banking, Insurance & Microfinance',
    description: 'Best practices for managing microfinance operations, portfolio quality, and client outreach.',
    duration: '3 days',
    format: 'Hybrid',
    image: 'https://picsum.photos/id/20/600/400',
    featured: false,
    order: 5,
  },
  {
    title: 'Modern HR Management Practices',
    category: 'HR Management',
    description: 'Recruitment, performance management, and employee relations for today’s workplace.',
    duration: '3 days',
    format: 'In-person',
    image: 'https://picsum.photos/id/366/600/400',
    featured: false,
    order: 6,
  },
  {
    title: 'Workplace Culture Foundations',
    category: 'HR Management',
    description: 'Build a healthy, productive workplace culture through practical HR interventions.',
    duration: '2 days',
    format: 'In-person',
    image: 'https://picsum.photos/id/48/600/400',
    featured: true,
    order: 7,
  },
  {
    title: 'Effective Communication Skills',
    category: 'Marketing & Customer Service',
    description: 'Practical communication techniques for teams, client-facing staff, and managers.',
    duration: '2 days',
    format: 'In-person',
    image: 'https://picsum.photos/id/180/600/400',
    featured: true,
    order: 8,
  },
  {
    title: 'Customer Service Excellence',
    category: 'Marketing & Customer Service',
    description: 'Deliver consistent, high-quality customer experiences across every touchpoint.',
    duration: '2 days',
    format: 'In-person',
    image: 'https://picsum.photos/id/367/600/400',
    featured: false,
    order: 9,
  },
  {
    title: 'ESG for Financial Institutions',
    category: 'Tech & Innovation',
    description: 'Understand environmental, social, and governance principles and how to apply them operationally.',
    duration: '2 days',
    format: 'Hybrid',
    image: 'https://picsum.photos/id/60/600/400',
    featured: true,
    order: 10,
  },
  {
    title: 'Digital Transformation & Innovation',
    category: 'Tech & Innovation',
    description: 'A practical introduction to digital tools and innovation practices for traditional organizations.',
    duration: '3 days',
    format: 'Hybrid',
    image: 'https://picsum.photos/id/119/600/400',
    featured: false,
    order: 11,
  },
];

const vacancies = [
  {
    title: 'Training Coordinator',
    description:
      'Coordinate scheduling, logistics, and quality assurance for DEJAF training programs across client sites.',
    location: 'Addis Ababa',
    deadline: new Date(Date.UTC(2026, 7, 15)),
    isOpen: true,
  },
  {
    title: 'Research & Consultancy Associate',
    description:
      'Support market research engagements and consultancy projects for financial-sector clients.',
    location: 'Addis Ababa',
    deadline: new Date(Date.UTC(2026, 8, 1)),
    isOpen: true,
  },
];

async function seed() {
  await connectDB();

  const adminEmail = (process.env.SEED_ADMIN_EMAIL || 'admin@dejaf.com').toLowerCase();
  const existingAdmin = await User.findOne({ role: 'admin' });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!', 10);
    await User.create({
      name: process.env.SEED_ADMIN_NAME || 'DEJAF Admin',
      email: adminEmail,
      passwordHash,
      role: 'admin',
    });
    console.log(`Created default admin: ${adminEmail}`);
  } else {
    console.log('An admin user already exists, skipping admin creation.');
  }

  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log(`Seeded ${services.length} services`);

  await ValueProp.deleteMany({});
  await ValueProp.insertMany(valueProps);
  console.log(`Seeded ${valueProps.length} value propositions`);

  await Stat.deleteMany({});
  await Stat.insertMany(stats);
  console.log(`Seeded ${stats.length} stats`);

  await Client.deleteMany({});
  await Client.insertMany(clients);
  console.log(`Seeded ${clients.length} client logos`);

  await Program.deleteMany({});
  await Program.insertMany(
    programs.map((p) => ({ ...p, slug: slugify(p.title, { lower: true, strict: true }) }))
  );
  console.log(`Seeded ${programs.length} training programs`);

  await Vacancy.deleteMany({});
  await Vacancy.insertMany(vacancies);
  console.log(`Seeded ${vacancies.length} vacancies`);

  await Faq.deleteMany({});
  await Faq.insertMany(faqs);
  console.log(`Seeded ${faqs.length} FAQs`);

  const settings = await SiteSettings.getSingleton();
  Object.assign(settings, {
    orgName: 'DEJAF Training and Consultancy',
    tagline: 'Your Capability Building Partner',
    heroText:
      'DEJAF Training and Consultancy helps organizations build the people, insight, and strategy needed to succeed in a fast-changing market.',
    aboutText:
      'DEJAF Training and Consultancy is a capacity-building organization dedicated to strengthening people and institutions across Ethiopia’s financial and business sectors. We combine practical training, applied research, and hands-on consultancy to help our clients grow sustainably.',
    foundingText:
      'DEJAF Training and Consultancy was founded in 2021 by a group of finance and HR professionals who saw a gap between the training organizations could access and the skills their teams actually needed on the job. We started with a handful of in-house workshops for banking and insurance clients in Addis Ababa and have since grown into a full capability-building partner, combining training, research, and consultancy under one roof. Today DEJAF works with banks, insurers, microfinance institutions, and growing businesses across Ethiopia, and is governed by a board drawn from the finance, academic, and development sectors.',
    whoWeAreText:
      'At the core of DEJAF is a team of experienced trainers, researchers, and consultants who bring real sector experience into every session. Our facilitators have worked inside the institutions we now train, which means our programs are grounded in practice, not just theory.',
    whatWeDoText:
      'DEJAF is not just a training provider; we design capability-building solutions that strengthen how organizations operate. Through structured courses, applied research, and hands-on advisory work, we help clients close skill gaps and act on opportunities with confidence.',
    howWeWorkText:
      'We start every engagement by understanding the client\'s real challenge, then build a program around it rather than offering a one-size-fits-all course. Our approach is collaborative and iterative — we adapt content and delivery format as we learn what works for each organization.',
    missionText:
      'To empower organizations and professionals with the skills, insight, and strategy they need to achieve lasting success.',
    visionText:
      'To be the leading capability-building partner for organizations across Ethiopia and the wider region.',
    phone: '+251 900 000 000',
    email: 'info@dejaf.com',
    address: 'Bole Road, Addis Ababa, Ethiopia',
    hours: 'Mon–Fri: 8:00 AM – 5:00 PM, Sat: 8:00 AM – 12:00 PM',
  });
  await settings.save();
  console.log('Seeded site settings');

  console.log('\nSeed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
