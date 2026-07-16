import ResourceManager from '../ResourceManager';
import { servicesApi } from '../../api/resources';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'icon', label: 'Icon key', type: 'select', options: ['academic-cap', 'chart-bar', 'light-bulb', 'trending-up', 'users', 'search', 'flag', 'check-circle', 'support'] },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'order', label: 'Order', type: 'number' },
];

export default function ServicesAdmin() {
  return <ResourceManager title="Manage Services" api={servicesApi} fields={fields} />;
}
