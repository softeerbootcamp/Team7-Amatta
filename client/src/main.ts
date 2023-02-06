import './styles/main.scss';
import { setScreenSize } from './utils';
import { HomePage, AuthPage } from './pages';
import { routes, navigate } from './core/router';

routes.push(
  { path: '/', component: HomePage },
  { path: '/register', component: AuthPage }
);

navigate(window.location.pathname);

window.addEventListener('resize', setScreenSize);
