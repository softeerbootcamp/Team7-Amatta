import '@/styles/style.scss';
import { setScreenSize } from '@/utils';
import { navigateHome, navigateAuth, navigateMain, navigatePost } from '@/pages';
import { routes, navigate } from '@/core/router';
import { _ } from '@/utils/customFx';
// import client from '@/apis/client';

routes.push(
  { path: '/', component: navigateHome },
  { path: '/register', component: navigateAuth },
  { path: '/card', component: navigateMain },
  { path: '/post', component: navigatePost },
);
const path = window.location.pathname;

navigate(path);

window.addEventListener('resize', setScreenSize);

// client.get('cookie');

const test = async () => 'test';
const test2 = async () => 'test2';

const start = async () => {
  _.go(await test(), console.log, test2, console.log);
};

// start();
