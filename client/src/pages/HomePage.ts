import { SERVER_URL } from '@/constants/constant';
import { generateElement } from '@/utils';

const HomePage = () => {
  const logoUrl = `${SERVER_URL.IMG}logo/logo-white.png`;

  const homeTemplate = generateElement(`
    <main class="home-main">
      <section class="home-section">
        <img class="logo-white" src="${logoUrl}" alt="amatta-logo" />
        <section class="home-button-section">
          <button class="login-button" data-link='/'>로그인</button>
          <button class="signup-button" data-link='/auth'>회원가입</button>
        </section>
      </section>
    </main>
  `);

  return homeTemplate;
};

export default HomePage;
