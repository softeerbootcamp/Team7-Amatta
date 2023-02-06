import { NotFound } from '@/pages';

interface Route {
  path: string;
  component: () => DocumentFragment;
}
const routes: Route[] = [];
const rootElement = document.querySelector('#root');
if (!rootElement) throw new Error('#root Error');

const findRoute = (path: string) =>
  routes.find(({ path: routePath }) => routePath === path) || {
    component: NotFound,
  };

const render = (path = window.location.pathname) => {
  const { component } = findRoute(path);
  rootElement.replaceChildren(component());
};

const navigate = (path: string, data = {}) => {
  window.history.pushState(data, '', path);
  render(path);
};

const onClickNavigateButton = (target: HTMLElement) => {
  target.addEventListener('click', (event: MouseEvent) => {
    const closestTarget = (event.target as HTMLInputElement).closest(
      '[data-link]'
    );
    if (!closestTarget) return;

    event.preventDefault();

    const path = closestTarget.getAttribute('data-link')!;
    navigate(path);
  });
};

window.addEventListener('popstate', () => render());
window.addEventListener('DOMContentLoaded', () => render());

export { onClickNavigateButton, navigate, findRoute, render, routes };
