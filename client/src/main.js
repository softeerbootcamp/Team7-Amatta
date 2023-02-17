// import '@/styles/global.scss';
// import { setScreenSize } from '@/utils';
// import { navigateHome, navigateAuth, navigateMain, navigatePost } from '@/pages';
// import { routes, navigate } from '@/core/router';

// routes.push(
//   { path: '/', component: navigateHome },
//   { path: '/register', component: navigateAuth },
//   { path: '/login', component: navigateAuth },
//   { path: '/card', component: navigateMain },
//   { path: '/post', component: navigatePost },
// );

// const path = window.location.pathname;

// navigate(path);

// window.addEventListener('resize', setScreenSize);
import axios from 'axios';
const baseURL = "http://localhost:8080/";
const client = axios.create({baseURL});
client.defaults.withCredentials = true;
client.get('user/join/exist/email', {params: {email: "ktykty0722@naver.com"}})
// client.get('cookie')
// const data = {
//   email: 'amatta@amatta.com',
//   password: 'amatta',
// };
// client.post('user/login', data);