import { inputForm } from '@/components/common/index';

const loginTemplate = (inputs) => inputs.map((input) => inputForm(input)).join('');

export default loginTemplate;
