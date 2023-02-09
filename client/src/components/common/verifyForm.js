import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const verifyForm = () => {
  const newVerifyFormTemp = `
  <section class="input-section" id="verify-input-section">
    <input type="text" class="text-input" placeholder="인증번호 6자리를 입력하세요." />
  </section>
  `;

  //const verityButton = $.qs('.verify-button');

  const f = () => {
    const verifyInput = $.qs('#email-input-section');
    verifyInput.insertAdjacentHTML('afterbegin', verifyForm());
  };

  // prettier-ignore
  const render = () =>
    _.go(
      newVerifyFormTemp,
      $.el);
  // $.replace('~~'));

  // prettier-ignore
  const appendForm = () =>
    _.go(
      render(),
      $.find('.verify-button'),
      $.on('click', f));

  return appendForm;
};

export default verifyForm;
