import { $ } from '@/utils';
import { generateElement } from '@/utils';

const newVerifyButton = () => {
  const newVerifyButtonTemplate = `
    <button type="button" class="verify-button">인증번호</button>
  `;

  return newVerifyButtonTemplate;
  // console.log(emailInput);
};

const emailVerifyButton = () => {
  const emailInput = $.qs('#email-input-section');
  emailInput;
};

const verification = () => {
  const verifyButton = $.qs('#');
  console.log(verifyButton);
};

export default newVerifyButton;
