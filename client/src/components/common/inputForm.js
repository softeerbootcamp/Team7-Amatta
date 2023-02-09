import { verify } from '@/components/auth';
import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const inputForm = (props) => {
  const { type, name, label, required, target, placeHolder = '' } = props;

  const inputFormTemplate = `
    <label for="${name}" class="input-label" id="${name}">
      ${label}
    </label>
    <section class="input-section" id="${name}-section">
      <input type="${type}" class="text-input" id="${name}" name="${name}" required="${required}" placeholder="${placeHolder}" />
      ${type === 'email' ? verify() : ''}
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
