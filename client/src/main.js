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

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('../service-worker.js')
//       .then((reg) => {
//         console.log('Service worker registered!!!!!!!.', reg);
//       })
//       .catch((error) => {
//         console.log('Service worker registration failed:', error);
//       });
//   });
// }

navigator.serviceWorker.register('../firebase-messaging-sw.js').then((res) => {
  onMessage(messaging, (payload) => {
    const option = {
      body: payload.notification.body,
      icon: payload.notification.icon,
      badge: 'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/logo/logo-pink.png',
      vibrate: [2000, 2000, 2000],
      sound: 'https://amatta-sound.s3.ap-northeast-2.amazonaws.com/logo/push.mp3',
      link: payload.fcmOptions.link,
    };
    res.showNotification(payload.notification.title, option);
  });
});
