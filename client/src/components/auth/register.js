import { inputForm } from '@/components/common';
import { INPUT } from '@/constants/constant';
import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const register = () => {
  const REGISTER_INPUT_TYPE = ['email', 'tel', 'password', 'passwordCheck'];

  const addCodeForm = (e, resolve) => {
    const newForm = _.find(({ type }) => type === 'verificationCode', INPUT);

    newForm.target = '.auth-form';
    inputForm(newForm)();
    resolve(() => $.qs('#root'));
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
    const codeReg = /^[0-9]{6}$/i;
    if (codeReg.test(target.value)) {
      disableConfirmButton();
    }
  };

  // prettier-ignore
  const validateEmail = (target) =>
    _.pipe(
      $.find('#email-input'),
      $.on('input', testValidEmail))(target);

  // prettier-ignore
  const sendVerificationCode = () =>
    new Promise((resolve) =>
      _.go(
        $.qs('.verify-button'),
        $.on('click', (e) => addCodeForm(e, resolve))));

  // prettier-ignore
  const validateCode = (target) => 
    _.pipe(
      $.find('#verification-code'),
      $.on('input', testValidCode))(target);

  // prettier-ignore
  const render = () =>
    new Promise(resolve =>
      _.go(
        INPUT,
        _.filter((input) => REGISTER_INPUT_TYPE.includes(input.type)),
        _.map((input) => inputForm({ ...input, target: '.auth-form' })),
        _.map(f => f()),
        ([f]) => f,
        resolve));

  // prettier-ignore
  const appendRegister = () =>
    _.go(
      render(),
      validateEmail,
      sendVerificationCode(),
      validateCode);

  return appendRegister;
};

export default register;
