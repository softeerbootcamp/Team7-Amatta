import '@/styles/global.scss';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
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

const firebaseConfig = {
  apiKey: 'AIzaSyCsLBsvozvTnYlDH-5cS0A8X_AjV5o4jjM',
  authDomain: 'amatta-4934f.firebaseapp.com',
  projectId: 'amatta-4934f',
  storageBucket: 'amatta-4934f.appspot.com',
  messagingSenderId: '196308516589',
  appId: '1:196308516589:web:64545440aa5021e8a496e4',
  measurementId: 'G-4JBCQPF50K',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
  console.log('foreground', payload);
  const option = {
    body: payload.notification.body,
  };
  return new Notification(payload.notification.title, option);
});
