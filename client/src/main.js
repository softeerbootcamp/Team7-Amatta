import '@/styles/style.scss';
import { setScreenSize } from '@/utils';
import { navigateHome, navigateAuth, navigateMain } from '@/pages';
import { routes, navigate } from '@/core/router';

routes.push(
  { path: '/', component: navigateHome },
  { path: '/register', component: navigateAuth },
  { path: '/card', component: navigateMain },
);
const path = window.location.pathname;

navigate(path);

window.addEventListener('resize', setScreenSize);
