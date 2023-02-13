import { inputForm } from '@/components/common';

const login = (inputs) => inputs.map((input) => inputForm(input)).join('');

export default login;
