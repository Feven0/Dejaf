import ResourceManager from '../ResourceManager';
import { programsApi } from '../../api/resources';

const CATEGORIES = [
  'Leadership',
  'Banking, Insurance & Microfinance',
  'HR Management',
  'Marketing & Customer Service',
  'Tech & Innovation',
];

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'category', label: 'Category', type: 'select', options: CATEGORIES, required: true },
  { name: 'duration', label: 'Duration', type: 'text' },
  { name: 'format', label: 'Format', type: 'text' },
  { name: 'image', label: 'Image', type: 'image' },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'featured', label: 'Featured on homepage?', type: 'checkbox' },
  { name: 'order', label: 'Order', type: 'number' },
];

export default function ProgramsAdmin() {
  return <ResourceManager title="Manage Training Programs" api={programsApi} fields={fields} />;
}
