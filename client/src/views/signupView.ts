import { homeMain } from './headerView';

export function showSignup() {
  if (homeMain instanceof HTMLElement) {
    homeMain.style.backgroundColor = 'white';

    homeMain.innerHTML = `
            <article class = 'register-article'>
                <section class = 'register-header-section'>
                    <img class='small-logo-mint' src='https://amatta-icons.s3.ap-northeast-2.amazonaws.com/logo/logo-mint+.png' alt='small-logo-mint' />
                    <div class='register-words'> 회원가입 </div>
                </section>
                <section class='register-form-section'>
                    <form>
                        <label for='email-input'> 이메일
                        <input type='text' name='email-input'/>
                    </form>
                </section>
            </article>

        `;
  }
}
