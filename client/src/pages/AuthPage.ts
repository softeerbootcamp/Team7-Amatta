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

  const authTemplate = generateElement(`
    <article class="signup-article">
      <img class="small-logo-pink" src="${logoUrl}" alt="small-logo-pink" />
      <section class="signup-form-section">
        <form>
          ${inputs.map((input) => InputForm(input)).join('')}
          <div class="signup-button-container">
            <input type="submit" class="auth-button" id="signup-button" name="signup-button" value="회원가입" />
            <input type="reset" class="auth-button" id="cancel-button" name="cancel-button" value="취소" />
          </div>
        </form>
      </section>
    </article>
  `);

  return authTemplate;
};

export default AuthPage;
