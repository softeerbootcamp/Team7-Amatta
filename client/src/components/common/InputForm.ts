interface InputProps {
  type: string;
  name: string;
  label: string;
  required: boolean;
}

const InputForm = (props: InputProps) => {
  const { type, name, label, required } = props;

  const inputFormTemplate = `
    <label for="${name}" class="input-label">
      ${label}
    </label>
    <input type="${type}" class="text-input" name="${name}" required="${required}" />
  `;

  return inputFormTemplate;
};

export default InputForm;
