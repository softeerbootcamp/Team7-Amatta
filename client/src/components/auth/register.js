import { inputForm, notification } from '@/components/common';
import { regiseterUser, verificateEmail } from '@/apis/auth';
import { navigate } from '@/core/router';
import { INPUT } from '@/constants/constant';
import { EventMonad, timer, $ } from '@/utils';
import { _ } from '@/utils/customFx';

const register = () => {
  const REGISTER_INPUT_TYPE = ['userName', 'email', 'verificationCode', 'tel', 'password'];
  const emailReg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const codeReg = /^[0-9]{6}$/i;

  let userData = {
    name: 'softeer',
    email: 'softeer@hyundai.com',
    verificationCode: '123456',
    phoneNumber: '010-1234-5678',
    password: 'softeer',
    passwordCheck: 'softeer',
  };

  const registerTemp = `
    <h1>환영합니다!</h1>
    <h4>Amatta 가입하기</h4>
    <h5>기프티콘을 효율적으로 관리해보세요.</h5>
  `;

  // 데모용
  const setInput = (fragment) => {
    $.qs('#user-name-input', fragment).value = userData.name;
    $.qs('#email-input', fragment).value = userData.email;
    $.qs('#verification-code-input', fragment).value = userData.verificationCode;
    $.qs('#phone-input', fragment).value = userData.phoneNumber;
    $.qs('#password-input', fragment).value = userData.password;
    $.qs('#password-check-input', fragment).value = userData.passwordCheck;
    $.qs('.auth-button', fragment).classList.add('active');

    const formTarget = $.qs('#verification-code-input-section', fragment);
    formTarget.classList.add('visible');

    const buttonTargets = $.qsa('button', fragment);
    buttonTargets.forEach((button) => (button.disabled = false));

    const buttonTarget = $.qs('.confirm-button', fragment);
    $.on('click', () => {
      closeCodeForm(formTarget)();
      formTarget.style.display = 'none';
    })(buttonTarget);
  };

  const setUserData = (userData, target) => {
    const newUserData = { ...userData };
    const dataType = _.getDataset(target, 'data-input');
    newUserData[dataType] = target.value;

    return newUserData;
  };

  const handleChange = EventMonad.of(({ target }) => {
    if (!target.validity.valid) return;
    const updatedUserData = setUserData(userData, target);
    userData = updatedUserData;
  });

  const closeCodeForm = (target) => () => target.classList.remove('visible');

  const addCodeForm = (e) => {
    const formTarget = $.qs('#verification-code-input-section');
    const buttonTarget = $.qs('.confirm-button');

    e.target.innerHTML = '재인증';
    formTarget.classList.add('visible');
    timer(180, '#verification-code-input-section', closeCodeForm(formTarget));

    $.on('click', () => closeCodeForm(formTarget)())(buttonTarget);
    return $.qs('#root');
  };

  const changeButtonStatus = (type, isValidate) => {
    const buttonTarget = $.qs(type);
    buttonTarget.disabled = !isValidate;
  };

  const changeVisibility = EventMonad.of(({ target }) => {
    const inputTarget = target.closest('.input-section').querySelector('input');

    if (target.src.includes('open')) {
      target.src = target.src.replace('open', 'close');
      inputTarget.type = 'password';
    } else {
      target.src = target.src.replace('close', 'open');
      inputTarget.type = 'text';
    }
  });

  const navigateHome = EventMonad.of(() => navigate('/'));
  const checkEmail = async (e, data) => {
    await verificateEmail(data);
    addCodeForm(e);
  };

  const putAutoHyphen = (target) => {
    target.value = target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(\-{1,2})$/g, '');
  };

  const checkPassword = (target) => {
    if (userData.password !== userData.passwordCheck) return target.classList.add('invalid');
    target.classList.remove('invalid');
  };

  const testValidation = ({ target }, type, reg) => {
    if (target.type === 'tel') return putAutoHyphen(target);
    if (type === 'passwordCheck') return checkPassword(target);
    const isValidate = reg.test(target.value);

    changeButtonStatus(type, isValidate);
  };

  const handleClickSubmitButton = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    const { name, email, password, phoneNumber } = userData;
    const data = { name, email, password, phoneNumber };

    await navigate('/card');
    await regiseterUser(data);
    notification('회원가입에 성공하였습니다.', 'register')();
  };

  const addInputForm = (fragment) => (input) => inputForm({ ...input, target: fragment })();
  const registerInputs = ({ type }) => REGISTER_INPUT_TYPE.includes(type);

  // prettier-ignore
  const composedEvents = 
    handleChange
      .chain(e => changeVisibility.map(me => [e, me]))
      .chain(em => navigateHome.map(ke => [...em, ke]));

  // prettier-ignore
  const handleChangeInput = (target) => 
    _.pipe(
      $.find('.auth-article'),
      $.on('input', composedEvents.value[0]))(target);

  // prettier-ignore
  const handleClickEye = (target) =>
    _.pipe(
      $.findAll('.eye-icon'),
      _.map((f) => $.on('click', composedEvents.value[1])(f)))(target);

  // prettier-ignore
  const validateEmail = (target) =>
    _.pipe(
      $.find('#email-input'),
      $.on('input', (e) => testValidation(e, '.verify-button', emailReg)))(target);

  // prettier-ignore
  const validatePhone = (target) =>
    _.pipe(
      $.find('#phone-input'),
      $.on('input', (e) => testValidation(e, '.phone', emailReg)))(target);

  // prettier-ignore
  const validatePassword = (target) => 
    _.pipe(
      $.find('#password-check-input'),
      $.on('input', (e) => testValidation(e, 'passwordCheck', codeReg)))(target);

  // prettier-ignore
  const sendVerificationCode = (fragment) =>
      _.go(
        fragment,
        $.find('.verify-button'),
        $.on('click',  (e) => checkEmail(e, userData.email)));

  // prettier-ignore
  const validateCode = (target) => 
    _.pipe(
      $.find('#verification-code-input'),
      $.on('input', (e) => testValidation(e, '.confirm-button', codeReg)))(target);

  // prettier-ignore
  const submitData = (target) => 
    _.pipe(
      $.find('.auth-button'),
      $.on('click', (e) => handleClickSubmitButton(e)))(target);

  // prettier-ignore
  const renderInput = (target) =>
    _.go(
      INPUT,
      _.filter((input) => REGISTER_INPUT_TYPE.includes(input.type)),
      _.map((input) => inputForm({ ...input, target})()))

  // prettier-ignore
  const appendInputForm = (fragment) => 
      _.go(
        INPUT,
        _.filter(registerInputs),
        _.map(addInputForm(fragment)),
        _.flatOne);

  // prettier-ignore
  const renderText = (textData) =>
    _.go(
      textData,
      $.el,
      $.prepend($.qs('.auth-form-section')));

  // prettier-ignore
  const render = () => 
      _.go(
        INPUT,
        renderInput,
        ([f]) => f,
        _.tap(
          () => registerTemp,
          $.el,
          $.prepend($.qs('.auth-form-section'))));

  // prettier-ignore
  const appendRegister = (fragment) =>
    _.go(
      fragment,
      $.find('.auth-form-section'),
      $.insert(registerTemp),
      appendInputForm,
      () => handleChangeInput(fragment),
      () => handleClickEye(fragment),
      () => validateEmail(fragment),
      () => validatePhone(fragment),
      () => validatePassword(fragment),
      () => sendVerificationCode(fragment),
      () => validateCode(fragment),
      () => submitData(fragment),
      () => setInput(fragment),
      () => fragment);

  return appendRegister;
};

export default register;
