import { SERVER_URL, AUTH } from '@/constants/constant';
import { register, login } from '@/components/auth';
import { L, _ } from '@/utils/customFx';
import { $ } from '@/utils';

const AuthPage = {};
const LEFT_ARROW_URL = `${SERVER_URL.IMG}icon/left-arrow.svg`;

AuthPage.path = window.location.pathname.replace('/', '');
AuthPage.type = () => AUTH[`${AuthPage.path}`];

AuthPage.temp = `
    <article class="auth-article">
      <section class="white-header-section">
        <img class="left-arrow-button" src="${LEFT_ARROW_URL}" alt="left-arrow-button" /> 
        <h4 class="auth-type">${AuthPage.type()}</h4>
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
AuthPage.renderComponent = () =>
  _.go(
    [register, login],
    L.filter((component) => component.name === AuthPage.path),
    _.take(1));

// prettier-ignore
AuthPage.render = () => new Promise(resolve => 
  _.go(
    AuthPage.temp, 
    $.el, 
    $.replace($.qs('#root')),
    resolve,
));

// prettier-ignore
const navigateAuth = async () =>
    _.go(
      await AuthPage.render(),
      register());
// () => AuthPage.renderComponent(),
// ([f]) => f());

export default navigateAuth;
