const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const programRoutes = require('./routes/programRoutes');
const contactRoutes = require('./routes/contactRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');
const makeCrudRouter = require('./routes/crudRoutes');

const Service = require('./models/Service');
const ValueProp = require('./models/ValueProp');
const Stat = require('./models/Stat');
const Client = require('./models/Client');
const Vacancy = require('./models/Vacancy');
const Faq = require('./models/Faq');

const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// CLIENT_URL may be a single origin or a comma-separated list (e.g. while migrating to a
// custom domain, both the vercel.app URL and the new domain need to keep working).
const allowedOrigins = (process.env.CLIENT_URL || '*').split(',').map((o) => o.trim());
app.use(
  cors({
    origin: allowedOrigins.includes('*') ? '*' : allowedOrigins,
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/newsletter', subscriberRoutes);

app.use('/api/services', makeCrudRouter(Service));
app.use('/api/value-props', makeCrudRouter(ValueProp));
app.use('/api/stats', makeCrudRouter(Stat));
app.use('/api/clients', makeCrudRouter(Client));
app.use('/api/vacancies', makeCrudRouter(Vacancy, { defaultSort: '-deadline' }));
app.use('/api/faqs', makeCrudRouter(Faq));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
