import { inputForm } from '@/components/common';
import { INPUT } from '@/constants/constant';
import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const register = () => {
  const addCodeForm = () => {
    const newForm = _.find(({ type }) => type === 'verificationCode', INPUT);

    newForm.target = '.auth-form';
    inputForm(newForm)();
  };

  const disableVerifyButton = () => {
    const verifyButton = $.qs('.verify-button');
    verifyButton.disabled = false;
  };

  const disableConfirmButton = () => {
    const confirmButton = $.qs('.confirm-button');
    confirmButton.disabled = false;
  };

  const testValidEmail = ({ target }) => {
    const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (emailReg.test(target.value)) {
      disableVerifyButton();
    }
  };

  const testValidCode = ({ target }) => {
    console.log(1);

    const codeReg = /^[0-9]{6}$/i;
    if (codeReg.test(target.value)) {
      console.log(2);
      disableConfirmButton();
    }
  };

  // prettier-ignore
  const render = () =>
    new Promise(resolve =>
      _.go(
        INPUT,
        _.filter((input) => input.type !== 'verificationCode'),
        _.map((input) => inputForm({ ...input, target: '.auth-form' })()),
        resolve));

  // prettier-ignore
  const appendRegister = async () =>
    _.go(
      await render(),
      () => $.qs('#email-input'),
      $.on('input', testValidEmail),
      () => $.find('.verify-button')(),
      $.on('click', await addCodeForm),
      () => console.log(22),
      () => $.qs('#verification-code-input'),
      $.on('input', testValidCode));

  return appendRegister;
};

export default register;
