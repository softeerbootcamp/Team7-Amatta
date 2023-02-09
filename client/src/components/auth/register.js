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
      () => $.find('.verify-button')(),
      $.on('click', addCodeForm));

  return appendRegister;
};

export default register;
