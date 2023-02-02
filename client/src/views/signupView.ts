import { homeMain } from './headerView';

export function showSignup() {
  if (homeMain instanceof HTMLElement) {
    homeMain.style.backgroundColor = 'white';

    homeMain.innerHTML = `
            <article class = 'signup-article'>
              <img class='small-logo-pink' src='https://amatta-icons.s3.ap-northeast-2.amazonaws.com/logo/logo-pink.png' alt='small-logo-pink' />
              <section class='signup-form-section'>
                  <form>
                      <label for='email-input' class='input-label'> 이메일 <br>
                      <input type='text' class='text-input' name='email-input'/> <br>
                      <label for='phone-input' class='input-label'> 전화번호 <br>
                      <input type='text' class='text-input' name='phone-input'/> <br>
                      <label for='password-input' class='input-label'> 비밀번호 <br>
                      <input type='text' class='text-input' name='password-input'/> <br>
                      <label for='password-check-input' class='input-label'> 비밀번호 확인 <br>
                      <input type='text' class='text-input' name='password-check-input'/>

                      <div class='signup-button-container'>
                        <input type='submit' class='auth-button' id='signup-button' name='signup-button' value='회원가입' />
                        <input type='submit' class='auth-button' id='cancel-button' name='cancel-button' value='취소' />
                      </div>
                  </form>
              </section>
            </article>
        `;
  }
}
