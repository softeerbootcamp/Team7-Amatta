import { newVerifyButton } from '@/components/auth';
const inputForm = (props) => {
  const { type, name, label, required } = props;

  const inputFormTemplate = `
    <label for="${name}" class="input-label" id="${name}">
      ${label}
    </label>
    <section class="input section" id="${name}-section">
      <input type="${type}" class="text-input" id="${name}" name="${name}" required="${required}" />
      ${type === 'email' ? newVerifyButton() : ''}
    </section>
  `;

  return inputFormTemplate;
};

export default inputForm;
