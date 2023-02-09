import { SERVER_URL } from '@/constants/constant';
import { register } from '@/components/auth';
import { _ } from '@/utils/customFx';
import { $ } from '@/utils';

const AuthPage = {};
const leftArrowUrl = `${SERVER_URL.IMG}icon/left-arrow.svg`;

AuthPage.temp = `
    <article class="auth-article">
      <section class="white-header-section">
        <img class="left-arrow-button" src="${leftArrowUrl}" alt="left-arrow-button" /> 
        <h4 class="auth-type">회원가입</h4>
      </section>
      <section class="auth-form-section">
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
