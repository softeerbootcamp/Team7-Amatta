import { inputForm } from '@/components/common';

const loginTemplate = (inputs) => inputs.map((input) => inputForm(input)).join('');

export default loginTemplate;
