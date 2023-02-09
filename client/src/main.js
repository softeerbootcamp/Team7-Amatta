import '@/styles/style.scss';
import { setScreenSize } from '@/utils';
import { navigateHome, navigateAuth, navigateMain, navigatePost } from '@/pages';
import { routes, navigate } from '@/core/router';
import client from '@/apis/client';

routes.push(
  { path: '/', component: navigateHome },
  { path: '/register', component: navigateAuth },
  { path: '/card', component: navigateMain },
  { path: '/post', component: navigatePost },
);
const path = window.location.pathname;

navigate(path);

window.addEventListener('resize', setScreenSize);

// client.post('user/login', { email: 'aa@naver.com', password: '1234' });
