import ResourceManager from '../ResourceManager';
import { faqsApi } from '../../api/resources';

const fields = [
  { name: 'question', label: 'Question', type: 'text', required: true },
  { name: 'answer', label: 'Answer', type: 'textarea', required: true },
  { name: 'order', label: 'Order', type: 'number' },
];

export default function FaqAdmin() {
  return <ResourceManager title="Manage FAQs" api={faqsApi} fields={fields} />;
}
