import { SERVER_URL } from '@/constants/constant';
import { generateElement } from '@/utils';

const HomePage = () => {
  const logoUrl = `${SERVER_URL.IMG}logo/logo-white.png`;

  const homeTemplate = generateElement(`
    <main class="home-main">
      <section class="home-section">
        <img class="logo-white" src="${logoUrl}" alt="amatta-logo" />
        <section class="home-button-section">
          <a class="login-button" href='/'>로그인</a>
          <a class="auth-button" href='/register'>회원가입</a>
        </section>
      </section>
    </main>
  `);

  return homeTemplate;
};

export default HomePage;
