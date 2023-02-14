import { inputForm } from '@/components/common';
import { loginU } from '@/apis/auth';
import { navigate } from '@/core/router';
import { INPUT } from '@/constants/constant';
import { EventMonad } from '@/utils/monad';
import { timer, $ } from '@/utils';
import { _ } from '@/utils/customFx';

const login = () => {
  const LOGIN_INPUT_TYPE = ['email', 'password'];

  let userData = {
    email: '',
    password: '',
  };

  const loginTemp = `
    <h4>로그인</h4>
  `;

  const setUserData = (userData, target) => {
    const newUserData = { ...userData };
    const dataType = _.getDataset(target, 'data-input');
    newUserData[dataType] = target.value;

    return newUserData;
  };

  // const handleChange = EventMonad.of(({ target }) => {
  //   if (!target.validity.valid) return;

  //   const updatedUserData = setUserData(userData, target);
  //   userData = updatedUserData;
  //   console.log(userData);
  // });

  const handleChange = ({ target }) => {
    if (!target.validity.valid) return;

    const updatedUserData = setUserData(userData, target);
    userData = updatedUserData;
  };

  const submitData = (e) => {
    e.stopPropagation();
    e.preventDefault();

    navigate('/card');
    loginU(userData);
  };
  // prettier-ignore
  // const composedEvents =
  //   handleChange

  // prettier-ignore
  const handleSubmitData = (target) => 
    _.pipe(
      $.find('.auth-button'),
      $.on('click', submitData))(target);

  // prettier-ignore
  const handleChangeInput = (target) => 
    _.pipe(
      $.find('#root'),
      $.on('input', handleChange))(target);

  // prettier-ignore
  const loginInput = (target) =>
    _.go(
      INPUT,
      _.filter((input) => LOGIN_INPUT_TYPE.includes(input.dataType)),
      _.map((input) => inputForm({ ...input, target})()));

  // prettier-ignore
  const appendLogin = (fragment) => 
    _.go(
      fragment,
      $.find('.auth-form-section'),
      $.insert(loginTemp),
      $.find('.auth-form'),
      loginInput,
      () => handleChangeInput(document),
      () => handleSubmitData(fragment),
      () => fragment);

  return appendLogin;
};

export default login;
