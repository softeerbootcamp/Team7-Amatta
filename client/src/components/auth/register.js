import { inputForm } from '@/components/common';
import { regiseterUser } from '@/apis/auth';
import { navigate } from '@/core/router';
import { INPUT } from '@/constants/constant';
import { timer, $ } from '@/utils';
import { _ } from '@/utils/customFx';

const register = () => {
  const REGISTER_INPUT_TYPE = ['userName', 'email', 'verificationCode', 'tel', 'password'];
  const emailReg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const codeReg = /^[0-9]{6}$/i;

  let userData = {
    name: '',
    email: '',
    verificationCode: '',
    phoneNumber: '',
    password: '',
    passwordCheck: '',
  };

  const registerTemp = `
    <h1>환영합니다!</h1>
    <h4>Amatta 가입하기</h4>
    <h5>기프티콘을 효율적으로 관리해보세요.</h5>
  `;

  const setUserData = ({ target }, targets) => {
    const dataType = _.getDataset(target, 'data-input');
    const newUserData = { ...userData };

    if (!target.validity.valid) return;

    newUserData[dataType] = target.value;
    userData = newUserData;
    checkValidateAll(targets);

    return userData;
  };

  const checkValidateAll = (targets) => {
    const $target = $.qs('.auth-button').classList;

    if (![...targets].every((target) => target.validity.valid)) return $target.remove('active');
    if (userData.password !== userData.passwordCheck) return $target.remove('active');

    $target.add('active');
  };

  const closeCodeForm = (target) => () => target.classList.remove('visible');

  const addCodeForm = (e, resolve) => {
    const formTarget = $.qs('#verification-code-input-section');
    const buttonTarget = $.qs('.confirm-button');

    e.target.innerHTML = '재인증';
    formTarget.classList.add('visible');
    timer(180, '#verification-code-input-section', closeCodeForm(formTarget));

    $.on('click', () => closeCodeForm(formTarget)())(buttonTarget);
    resolve(() => $.qs('#root'));
  };

  const changeButtonStatus = (type, isValidate) => {
    const buttonTarget = $.qs(type);
    buttonTarget.disabled = !isValidate;
  };

  const changeVisibility = ({ target }) => {
    const inputTarget = target.closest('.input-section').querySelector('input');

    if (target.src.includes('open')) {
      target.src = target.src.replace('open', 'close');
      inputTarget.type = 'password';
    } else {
      target.src = target.src.replace('close', 'open');
      inputTarget.type = 'text';
    }
  };

  const putAutoHyphen = (target) => {
    target.value = target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(\-{1,2})$/g, '');
  };

  const testValidation = ({ target }, type, reg) => {
    if (target.type === 'tel') return putAutoHyphen(target);
    const isValidate = reg.test(target.value);

    changeButtonStatus(type, isValidate);
  };

  const handleClickSubmitButton = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    const { name, email, password, phoneNumber } = userData;
    const data = { name, email, password, phoneNumber };

    navigate('/card');
    await regiseterUser(data);
  };

  // prettier-ignore
  const handleChangeInput = (target) => 
    _.pipe(
      $.findAll('.text-input'),
      (targets) => _.map((f) => $.on('input', (e) => setUserData(e, targets))(f), targets),
      ([f]) => f)(target);

  // prettier-ignore
  const handleClickGoBack = (target) => 
    _.pipe(
      $.find('.left-arrow-button'),
      $.on('click', () => navigate('/')))(target);

  // prettier-ignore
  const handleClickEye = (target) => 
    _.pipe(
      $.findAll('.eye-icon'),
      (targets) => _.map((f) => $.on('click', changeVisibility)(f), targets),
      ([f]) => f)(target);

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
  const sendVerificationCode = () =>
    new Promise((resolve) =>
      _.go(
        $.qs('.verify-button'),
        $.on('click', (e) => addCodeForm(e, resolve))));

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
  const render = () =>
    new Promise(resolve =>
      _.go(
        INPUT,
        _.filter((input) => REGISTER_INPUT_TYPE.includes(input.type)),
        _.map((input) => inputForm({ ...input, target: '.auth-form' })),
        _.map(f => f()),
        ([f]) => f,
        _.tap(
          () => registerTemp,
          $.el,
          $.prepend($.qs('.auth-form-section'))),
        resolve));

  // prettier-ignore
  const appendRegister = () =>
    _.go(
      render(),
      handleChangeInput,
      handleClickGoBack,
      handleClickEye,
      validateEmail,
      validatePhone,
      sendVerificationCode(),
      validateCode,
      submitData);

  return appendRegister;
};

export default register;
