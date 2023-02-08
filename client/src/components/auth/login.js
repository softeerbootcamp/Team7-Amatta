import { InputForm } from '@/components/common/index';

const loginTemplate = (inputs) => inputs.map((input) => InputForm(input)).join('');

export default loginTemplate;
