import '@/styles/global.scss';
import { setScreenSize } from '@/utils';
import { navigateHome, navigateAuth, navigateMain, initiatePostPage } from '@/pages';
import { routes, navigate } from '@/core/router';

routes.push(
  { path: '/', component: navigateHome },
  { path: '/register', component: navigateAuth },
  { path: '/login', component: navigateAuth },
  { path: '/card', component: navigateMain },
  { path: '/post', component: initiatePostPage },
);

const path = window.location.pathname;

navigate(path);

window.addEventListener('resize', setScreenSize);
