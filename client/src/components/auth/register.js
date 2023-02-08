import { inputForm } from '@/components/common';

// const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const registerTemplate = (inputs) => inputs.map((input) => inputForm(input)).join('');

export default registerTemplate;
