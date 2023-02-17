import { AUTH } from '@/constants/constant';
import { register, login } from '@/components/auth';
import { header } from '@/components/common';
import { _ } from '@/utils/customFx';
import { $ } from '@/utils';

const AuthPage = {};

AuthPage.temp = `
    <article class="auth-article">
      <section class="auth-form-section">
        <form class="input-section">
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
    AuthPage.temp,
    $.el);
// prettier-ignore
const navigateAuth = (path) => {
    _.go(
      path,
      AuthPage.makeFragment,
      AuthPage.appendComponent(path)(),
      $.replace($.qs('#root')));

      header({color: 'white', label:`${AUTH[path.replace('/', '')]}`, path:'/' })();
    }
// () => AuthPage.renderComponent(),
// ([f]) => f());

export default navigateAuth;
