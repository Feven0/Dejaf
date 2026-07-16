import ResourceManager from '../ResourceManager';
import { valuePropsApi } from '../../api/resources';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'icon', label: 'Icon key', type: 'select', options: ['academic-cap', 'chart-bar', 'light-bulb', 'trending-up', 'users', 'search', 'flag', 'check-circle', 'support'] },
  { name: 'color', label: 'Icon color', type: 'select', options: ['gold', 'leaf', 'accent', 'primary'], required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'order', label: 'Order', type: 'number' },
];

export default function ValuePropsAdmin() {
  return <ResourceManager title="Manage Value Propositions" api={valuePropsApi} fields={fields} />;
}
