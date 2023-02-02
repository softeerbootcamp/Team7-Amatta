import './styles/main.scss';
import { setScreenSize } from './utils';
import { showSignup } from './views/signupView';

window.addEventListener('resize', setScreenSize);

const loginBtn = document.querySelector('.login-button');
if (loginBtn instanceof HTMLElement) {
  //   loginBtn.addEventListener('click', showHeader);
  loginBtn.addEventListener('click', showSignup);
}
