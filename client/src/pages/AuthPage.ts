import { SERVER_URL } from '@/constants/constant';
import { generateElement } from '@/utils';
import { loginTemplate, registerTemplate } from '@/components/auth';

const AuthPage = () => {
  const logoUrl = `${SERVER_URL.IMG}logo/logo-pink.png`;
  const { componentName } = window.history.state;

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

  const status = () => {
    if (componentName === 'register') {
      return registerTemplate(inputs);
    } else if (componentName === 'login') {
      const loginInputs = [inputs[0], inputs[3]];

      return loginTemplate(loginInputs);
    }

    return;
  };

  const authTemplate = generateElement(`
    <article class="auth-article">
      <img class="small-logo-pink" src="${logoUrl}" alt="small-logo-pink" />
      <section class="auth-form-section">
        <form>
          ${status()}
          <div class="auth-button-container">
            <input type="submit" class="auth-button" name="auth-button" value="완료" />
          </div>
        </form>
      </section>
    </article>
  `);

  return authTemplate;
};

export default AuthPage;
