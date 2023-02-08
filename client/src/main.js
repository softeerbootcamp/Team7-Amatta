import '@/styles/style.scss';
import { setScreenSize } from '@/utils/index';
import { navigateHome, navigateAuth, navigateMain } from '@/pages/index';
import { routes, init } from '@/core/router';

routes.push(
  { path: '/', component: navigateHome },
  { path: '/register', component: navigateAuth },
  { path: '/card', component: navigateMain },
);
const path = window.location.pathname;

init(path);

window.addEventListener('resize', setScreenSize);
