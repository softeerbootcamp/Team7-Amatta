import { inputForm } from '@/components/common';
import { INPUT } from '@/constants/constant';
import { $ } from '@/utils';
import { _, L } from '@/utils/customFx';

// const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const register = (props) => {
  const { target } = props;

  const addCodeForm = () => {
    const a = _.filter((input) => input.type === 'verificationCode', INPUT);
    a[0].target = '.auth-form';

    inputForm(...a)();
  };
  // const verifyEmail = () =>

  const registerTemp = `
    ${_.map((input) => inputForm({ ...input, target: '.auth-form' }), INPUT)}
  `;

  const te = new Promise((resolve) => resolve(_.map((input) => inputForm({ ...input, target: '.auth-form' })())));

  //prettier-ignore
  const render = () =>
    _.go(
      registerTemp,
      $.el,
      $.prepend($.qs(`${target}`)));

  //prettier-ignore
  const appendRegister = async () =>
  _.go(
    INPUT,
    await te,
    () => $.qs('.verify-button'),
    $.on('click', addCodeForm));

  return appendRegister;
};

export default register;
