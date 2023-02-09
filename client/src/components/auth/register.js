import { inputForm } from '@/components/common';
import { INPUT } from '@/constants/constant';
import { $ } from '@/utils';
import { _, L } from '@/utils/customFx';

// const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const register = (props) => {
  // const {} = props;

  const registerTemp = `
    ${_.go(L.filter((input) => input.type !== 'verificationCode', INPUT))}
  `;

  //prettier-ignore
  const render = () =>
    _.go(
      registerTemp,
      $.el,
      $.prepend(`${target}`));
};

export default register;
