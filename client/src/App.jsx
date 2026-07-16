import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import Training from './pages/Training';
import Services from './pages/Services';
import Vacancies from './pages/Vacancies';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './admin/pages/Dashboard';
import ProgramsAdmin from './admin/pages/ProgramsAdmin';
import ServicesAdmin from './admin/pages/ServicesAdmin';
import ValuePropsAdmin from './admin/pages/ValuePropsAdmin';
import StatsAdmin from './admin/pages/StatsAdmin';
import ClientsAdmin from './admin/pages/ClientsAdmin';
import VacanciesAdmin from './admin/pages/VacanciesAdmin';
import MessagesAdmin from './admin/pages/MessagesAdmin';
import SettingsAdmin from './admin/pages/SettingsAdmin';
import UsersAdmin from './admin/pages/UsersAdmin';
import FaqAdmin from './admin/pages/FaqAdmin';
import SubscribersAdmin from './admin/pages/SubscribersAdmin';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/training" element={<Training />} />
        <Route path="/services" element={<Services />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<ProtectedRoute roles={['admin', 'editor']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="programs" element={<ProgramsAdmin />} />
          <Route path="services" element={<ServicesAdmin />} />
          <Route path="value-props" element={<ValuePropsAdmin />} />
          <Route path="stats" element={<StatsAdmin />} />
          <Route path="clients" element={<ClientsAdmin />} />
          <Route path="vacancies" element={<VacanciesAdmin />} />
          <Route path="messages" element={<MessagesAdmin />} />
          <Route path="faqs" element={<FaqAdmin />} />
          <Route path="subscribers" element={<SubscribersAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />

          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="users" element={<UsersAdmin />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
