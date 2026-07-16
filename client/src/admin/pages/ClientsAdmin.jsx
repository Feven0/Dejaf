import ResourceManager from '../ResourceManager';
import { clientsApi } from '../../api/resources';

const fields = [
  { name: 'name', label: 'Client Name', type: 'text', required: true },
  { name: 'logoUrl', label: 'Logo (optional — shows a styled name placeholder until uploaded)', type: 'image' },
  { name: 'order', label: 'Order', type: 'number' },
];

export default function ClientsAdmin() {
  return <ResourceManager title="Manage Client Logos" api={clientsApi} fields={fields} />;
}
