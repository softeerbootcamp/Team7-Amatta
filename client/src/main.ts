import './styles/main.scss';
import { setScreenSize } from './utils';
import { HomePage, AuthPage, NotFound } from './pages';

interface Route {
  path: string;
  component: () => DocumentFragment;
}

const routes: Route[] = [
  { path: '/', component: HomePage },
  { path: '/register', component: AuthPage },
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

const signUpButton = document.querySelector('.signup-button');

signUpButton?.addEventListener('click', (event) => {
  if (
    !(signUpButton instanceof HTMLElement) ||
    !event.target ||
    !(event.target instanceof HTMLElement)
  )
    return;

  const target = event.target;
  const path = target.getAttribute('href')!;

  navigate(path);
  event.preventDefault();
});

window.addEventListener('popstate', () => render());
window.addEventListener('DOMContentLoaded', () => render());
window.addEventListener('resize', setScreenSize);
