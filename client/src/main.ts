import './styles/style.scss';
import { setScreenSize } from './utils';
import { HomePage, AuthPage, NotFound, MainPage } from './pages';

interface Route {
  path: string;
  component: () => DocumentFragment;
}

const routes: Route[] = [
  { path: '/', component: HomePage },
  { path: '/register', component: AuthPage },
  { path: '/card', component: MainPage },
];

const rootElement = document.querySelector('#root');

const findRoute = (path: string) =>
  routes.find(({ path: routePath }) => routePath === path) || {
    component: NotFound,
  };

const render = (path = window.location.pathname) => {
  const { component } = findRoute(path);
  rootElement && rootElement.replaceChildren(component());
};

const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  render(path);
};

navigate(window.location.pathname);

const signUpButton = document.querySelector('.auth-button');

signUpButton?.addEventListener('click', (event) => {
  if (
    !(signUpButton instanceof HTMLElement) ||
    !event.target ||
    !(event.target instanceof HTMLElement)
  )
    return;
  event.preventDefault();

  const target = event.target;
  const path = target.getAttribute('href')!;

  navigate(path);
});

window.addEventListener('popstate', () => render());
window.addEventListener('DOMContentLoaded', () => render());
window.addEventListener('resize', setScreenSize);
