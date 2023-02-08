import SERVER_URL from '@/constants/constant';
import { $ } from '@/utils/index';
import { _ } from '@/utils/customFx';

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
const navigateHome = () =>
  new Promise((resolve) =>
    _.go(
      HomePage.temp, 
      $.el, 
      $.replace($.qs('#root')),
      () =>resolve($.qs('.signup-button'))));

export default navigateHome;
