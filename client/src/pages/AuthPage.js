import SERVER_URL from '@/constants/constant';
import { loginTemplate, registerTemplate } from '@/components/auth/index';
import { $ } from '@/utils/index';
import { _ } from '@/utils/customFx';

const AuthPage = {};
const logoUrl = `${SERVER_URL.IMG}logo/logo-pink.png`;
const mintLogoUrl = `${SERVER_URL.IMG}logo/logo-mint+.png`;
const backIconUrl = `${SERVER_URL.IMG}icon/back.svg`;

const inputs = [
  {
    type: 'email',
    name: 'email-input',
    label: '이메일',
    required: true,
  },
  {
    type: 'tel',
    name: 'phone-input',
    label: '전화번호',
    required: true,
  },
  {
    type: 'verificationCode',
    name: 'verification-code',
    label: '인증번호',
    required: true,
  },
  {
    type: 'password',
    name: 'password-input',
    label: '비밀번호',
    required: true,
  },
  {
    type: 'password',
    name: 'password-check-input',
    label: '비밀번호 확인',
    required: true,
  },
];

const status = (componentName) => {
  if (componentName === 'register') {
    const signupInputs = [inputs[0], inputs[1], inputs[3], inputs[4]];

    // return registerTemplate(inputs);
    return registerTemplate(signupInputs);
  }
  if (componentName === 'login') {
    const loginInputs = [inputs[0], inputs[3]];

    return loginTemplate(loginInputs);
  }

  return 0;
};

AuthPage.temp = `
  <article class="auth-article">
    <section class="back-header-section">
      <img class="back-button" src="${backIconUrl}" alt="back-button" /> 
      <section class="logo-section">
        <img class="small-logo-mint" src="${mintLogoUrl}" alt="small-logo-mint" />
      </section>
    </section>
    <section class="auth-form-section">
      <form>
        ${status('register')}
        <div class="auth-button-container">
          <input type="submit" class="auth-button" name="auth-button" value="완료" />
        </div>
      </form>
    </section>
  </article>
`;

// prettier-ignore
const navigateAuth = () =>
  new Promise((resolve) =>
    _.go(
      AuthPage.temp, 
      $.el, 
      $.replace($.qs('#root')),
      () =>resolve($.qs('.auth-button'))));

export default navigateAuth;
