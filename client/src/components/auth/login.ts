import { InputForm } from '@/components/common';

interface InputProps {
  type: string;
  name: string;
  label: string;
  required: boolean;
}

const loginTemplate = (inputs: InputProps[]) => {
  return inputs.map((input) => InputForm(input)).join('');
};

export default loginTemplate;
