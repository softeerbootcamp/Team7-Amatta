import { SERVER_URL, AUTH } from '@/constants/constant';
import { register, login } from '@/components/auth';
import { _ } from '@/utils/customFx';
import { $ } from '@/utils';

const AuthPage = {};
const LEFT_ARROW_URL = `${SERVER_URL.IMG}icon/left-arrow.svg`;

AuthPage.temp = (path) => `
    <article class="auth-article">
      <section class="white-header-section">
        <img class="left-arrow-button" src="${LEFT_ARROW_URL}" alt="left-arrow-button" /> 
        <h4 class="header-label">${AUTH[path.replace('/', '')]}</h4>
      </section>
      <section class="auth-form-section">
        <form class="auth-form">
          <div class="auth-button-container">
            <input type="submit" class="auth-button" name="auth-button" value="완료" />
          </div>
        </form>
    </article>
  `;

// prettier-ignore
AuthPage.appendComponent = (path) => (fragment) =>
  _.go(
    ['register', 'login'],
    _.filter((type) => type === path.replace('/', '')),
    ([f]) => {if(f === 'register') return register(fragment); return login(fragment)});
// _.take(1),
// (type) => AuthPage.type[type]);

// prettier-ignore
AuthPage.makeFragment = (path) => 
  _.go(
    path,
    AuthPage.temp,
    $.el);
// prettier-ignore
const navigateAuth = (path) =>
    _.go(
      path,
      AuthPage.makeFragment,
      AuthPage.appendComponent(path)(),
      $.replace($.qs('#root')));
// () => AuthPage.renderComponent(),
// ([f]) => f());

export default navigateAuth;
