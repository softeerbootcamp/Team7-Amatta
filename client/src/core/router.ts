import { NotFound } from '@/pages';

type Route = {
  path: string;
  component: () => DocumentFragment;
};

const routes: Route[] = [];
const rootElement = document.querySelector('#root');
if (!rootElement) throw new Error('#root Error');

const findRoute = (path: string) =>
  routes.find(({ path: routePath }) => routePath === path) || {
    component: NotFound,
  };

const render = async (path = window.location.pathname) => {
  const { component } = findRoute(path);
  console.log(component());
  return rootElement.replaceChildren(component());
};

const navigate = async (path: string, data?: {}) => {
  window.history.pushState(data, '', path);
  await render(path);
};

const onClickNavigateButton = (target: HTMLElement, data?: {}) => {
  target.addEventListener('click', (event: MouseEvent) => {
    const closestTarget = (event.target as HTMLInputElement)?.closest(
      '[data-link]'
    );
    if (!closestTarget) return;

    event.preventDefault();

    const path = closestTarget.getAttribute('data-link')!;
    navigate(path, data);
  });
};

window.addEventListener('popstate', () => render());
window.addEventListener('DOMContentLoaded', () => render());

export { onClickNavigateButton, navigate, findRoute, render, routes };
