import { SERVER_URL } from '@/constants/constant';
import { loginTemplate, register } from '@/components/auth';
import { _ } from '@/utils/customFx';
import { $ } from '@/utils';

const AuthPage = {};
const logoUrl = `${SERVER_URL.IMG}logo/logo-pink.png`;
const mintLogoUrl = `${SERVER_URL.IMG}logo/logo-mint.png`;
const backIconUrl = `${SERVER_URL.IMG}icon/left-arrow.svg`;

AuthPage.temp = `
  <article class="auth-article">
    <section class="white-header-section">
      <img class="back-button" src="${backIconUrl}" alt="back-button" /> 
      <section class="logo-section">
        <img class="small-logo-mint" src="${mintLogoUrl}" alt="small-logo-mint" />
      </section>
    </section>
    <section class="auth-form-section">
      <h1 class="auth-text">${'회원가입'}</h1>
      <form class="auth-form">
        <div class="auth-button-container">
          <input type="submit" class="auth-button" name="auth-button" value="완료" />
        </div>
      </form>
    </section>
  </article>
`;

// prettier-ignore
AuthPage.render = () =>
  _.go(
    AuthPage.temp, 
    $.el, 
    $.replace($.qs('#root')),
    register({target: '.auth-form'}));

// prettier-ignore
const navigateAuth = () =>
    _.go(
      AuthPage.render());

export default navigateAuth;
