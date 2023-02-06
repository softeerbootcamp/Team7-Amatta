import { SERVER_URL } from '@/constants/constant';
import { generateElement } from '@/utils';
import { InputForm } from '@/components/common';

const AuthPage = () => {
  const logoUrl = `${SERVER_URL.IMG}logo/logo-pink.png`;

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

  const { pageName, buttonType } = window.history.state;

  const status = () => {
    if (pageName === 'register') {
      return inputs.map((input) => InputForm(input)).join('');
    } else if (pageName === 'login') {
      const loginInputs = [inputs[0], inputs[2]];
      return loginInputs.map((input) => InputForm(input)).join('');
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
            <input type="submit" class="auth-button" name="auth-button" value="${buttonType}" />
            <input type="reset" class="auth-button" name="cancel-button" value="취소" />
          </div>
        </form>
      </section>
    </article>
  `);

  return authTemplate;
};

export default AuthPage;
