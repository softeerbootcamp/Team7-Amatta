import { InputForm } from '@/components/common';

interface InputProps {
  type: string;
  name: string;
  label: string;
  required: boolean;
}

const emailReg =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const registerTemplate = (inputs: InputProps[]) => {
  return inputs.map((input) => InputForm(input)).join('');
};

export default registerTemplate;
