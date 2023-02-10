import { SERVER_URL } from '@/constants/constant';
import { addNavigateEvent } from '@/core/router';
import { _ } from '@/utils/customFx';
import { $ } from '@/utils';

const HomePage = {};
const logoUrl = `${SERVER_URL.IMG}logo/logo-white.png`;

HomePage.temp = `
  <main class="home-main">
    <section class="home-section">
      <img class="logo-white" src="${logoUrl}" alt="amatta-logo" />
      <section class="home-button-section">
        <button class="login-button" data-link='/'>로그인</button>
        <button class="signup-button" data-link='/register'>회원가입</button>
      </section>
    </section>
  </main>
`;

// prettier-ignore
HomePage.render = () =>
    _.go(
      HomePage.temp,
      $.el,
      $.replace($.qs('#root')));

// prettier-ignore
const navigateHome = () => 
    _.go(
      HomePage.render(),
      $.findAll('[data-link]'),
      addNavigateEvent);

export default navigateHome;
