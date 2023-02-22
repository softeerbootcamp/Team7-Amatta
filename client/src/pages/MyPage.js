import { header } from '@/components/common';
import { INPUT } from '@/constants/constant';
import { navigate } from '@/core/router';
import { _ } from '@/utils/customFx';
import { $ } from '@/utils';
import { getUserInfo, changePassword } from '@/apis/user';
import { inputForm, notification } from '@/components/common';

const MYPAGE_INPUT_TYPE = ['userName', 'tel', 'email', 'password'];
const addInputForm = (fragment) => (input) => inputForm({ ...input, target: fragment })();
const userPageInputs = ({ type }) => MYPAGE_INPUT_TYPE.includes(type);

const MyPage = {};

MyPage.temp = `
    <article class="auth-article">
      <section class="auth-form-section">
        <form class="input-section">
          <div class="auth-button-container">
            <input type="submit" class="auth-button" name="auth-button" value="완료" />
          </div>
        </form>
      </section>
    </article>
  `;

//데모용
const setInput = (target) => {
  target.classList.add('active');
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

const clickEyeEvent = (targets) =>
  targets.forEach((element) => element.addEventListener('click', (e) => changeVisibility(e)));

// prettier-ignore
const setInputValue = async () =>{
  const userData = await getUserInfo();
  console.log(userData);

  const changeColor = (type, target) => {
    type === 'input' 
    ? target.style.borderBottom = '1px solid #92b8b1'
    : target.style.color = '#92b8b1'
  }

  const inputs = $.qsa('.text-input');
  inputs.forEach(element => {
    changeColor('input', element);
  });

  const labels = $.qsa('.input-label');
  labels.forEach(element => {
    changeColor('label', element);
  })

  const userName = $.qs('#user-name-input');
  userName.value = userData.name;
  userName.disabled = true;

  const email = $.qs('#email-input');
  email.value = userData.email;
  email.disabled = true;

  const phoneNumber = $.qs('#phone-input');
  phoneNumber.value = userData.phonenumber;
  phoneNumber.disabled = true;

  const verifyButton = $.qs('.verify-button');
  verifyButton.remove();

  
  handleSubmitData();
}

const submitData = async () => {
  const password = $.qs('#password-input');

  if (password.value === $.qs('#password-check-input').value) {
    changePassword({ password: password.value });
    mainpageEvent();
  }
};

const mainpageEvent = () => navigate('/card');

// prettier-ignore
const handleSubmitData = () => 
  _.go(
    $.qs('.auth-button'), 
    $.on('click', submitData));

// prettier-ignore
const appendInputForm = (fragment) => 
  _.go(
    INPUT,
    _.filter(userPageInputs),
    ([passwordCheck, password, email, tel, userName]) => [passwordCheck, password, email, tel, userName],
    _.map(addInputForm(fragment)),
    _.flatOne);

// prettier-ignore
const navigateMyPage = () => {
  _.go(
    MyPage.temp,
    $.el,
    $.replace($.qs('#root')),
    appendInputForm,
    () => setInputValue(),
    () => $.qsa('.eye-icon'),
    clickEyeEvent,
    () => $.qs('.auth-button'),
    setInput);

    header({color: 'white', label:'마이페이지', path:'/card' })();
}

export default navigateMyPage;

// {
//   type: 'password',
//   name: 'new-password-input',
//   label: '비밀번호 변경(영문, 숫자, 특수문자)',
//   required: true,
//   dataType: 'password',
// },
// {
//   type: 'password',
//   name: 'new-password-check-input',
//   label: '비밀번호 확인을 위해 한번 더 입력해주세요.',
//   required: true,
//   dataType: 'passwordCheck',
// },
