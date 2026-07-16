import ResourceManager from '../ResourceManager';
import { vacanciesApi } from '../../api/resources';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'deadline', label: 'Deadline', type: 'date', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'isOpen', label: 'Open?', type: 'checkbox' },
];

export default function VacanciesAdmin() {
  return <ResourceManager title="Manage Vacancies" api={vacanciesApi} fields={fields} />;
}
