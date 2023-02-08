import { InputForm } from '@/components/common/index';

// const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const registerTemplate = (inputs) => inputs.map((input) => InputForm(input)).join('');

export default registerTemplate;
