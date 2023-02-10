import { SERVER_URL } from '@/constants/constant';
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

  const eyeIconUrl = `${SERVER_URL.IMG}icon/eye-close.svg`;

  const inputFormTemplate = `
    <section class="input-section" id="${name}-section">
      <input type="${type}" class="text-input" id="${name}" ${pattern && `pattern="${pattern}"`} 
        name="${name}" required="${required}" placeholder="${placeholder}" data-input="${dataType}" autocomplete="off" maxlength=${maxlength}/>
      <label for="${name}" class="input-label">
        ${label}
      </label>
      ${type === 'email' ? verify() : ''}
      ${type === 'verificationCode' ? confirm() : ''}
      ${type === 'password' ? `<img src="${eyeIconUrl}" class="eye-icon"/>` : ''}
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
