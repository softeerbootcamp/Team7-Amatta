import { verify, confirm } from '@/components/auth';
import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const inputForm = (props) => {
  const {
    type,
    name,
    label,
    required,
    target,
    maxlength = 20,
    pattern = null,
    dataType = '',
    placeholder = ' ',
  } = props;

  const inputFormTemplate = `
    <section class="input-section" id="${name}-section">
      <input type="${type}" class="text-input" id="${name}" ${pattern && `pattern="${pattern}"`}
        name="${name}" required="${required}" placeholder="${placeholder}" data-input="${dataType}" maxlength=${maxlength}/>
      <label for="${name}" class="input-label">
        ${label}
      </label>
      ${type === 'email' ? verify() : ''}
      ${type === 'verificationCode' ? confirm() : ''}
    </section>
  `;

  // prettier-ignore
  const render = () =>
    _.go(
      inputFormTemplate,
      $.el,
      $.prepend($.qs(`${target}`)));

  // prettier-ignore
  const appendForm = () =>
  _.go(
    render());

  return appendForm;
};

export default inputForm;
