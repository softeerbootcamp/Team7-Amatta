import './styles/main.scss';
import { setScreenSize } from './utils';
import { HomePage, AuthPage } from './pages';
import { routes, navigate } from './core/router';

routes.push(
  { path: '/', component: HomePage },
  { path: '/auth', component: AuthPage }
);

navigate(window.location.pathname, window.history.state);

window.addEventListener('resize', setScreenSize);
