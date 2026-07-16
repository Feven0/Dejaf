import ResourceManager from '../ResourceManager';
import { statsApi } from '../../api/resources';

const fields = [
  { name: 'label', label: 'Label', type: 'text', required: true },
  { name: 'value', label: 'Value', type: 'number', required: true },
  { name: 'suffix', label: 'Suffix', type: 'text' },
  { name: 'icon', label: 'Icon key', type: 'select', options: ['academic-cap', 'chart-bar', 'light-bulb', 'trending-up', 'users', 'search', 'flag', 'check-circle', 'support', 'certificate', 'compass'] },
  { name: 'color', label: 'Icon color', type: 'select', options: ['gold', 'leaf', 'accent', 'primary'] },
  { name: 'order', label: 'Order', type: 'number' },
];

export default function StatsAdmin() {
  return <ResourceManager title="Manage Stats" api={statsApi} fields={fields} />;
}
