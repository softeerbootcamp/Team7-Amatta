import '@/styles/main.scss';
import { setScreenSize } from '@/utils/index';
import { navigateHome, navigateAuth } from '@/pages/index';
import { routes, init } from '@/core/router';

routes.push(
  { path: '/', component: navigateHome },
  { path: '/register', component: navigateAuth },
);
const path = window.location.pathname;

init(path);

window.addEventListener('resize', setScreenSize);
