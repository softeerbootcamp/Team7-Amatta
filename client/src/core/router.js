/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
import { NotFound } from '@/pages/index';
import { _ } from '@/utils/customFx';

const routes = [];

const findRoute = (path) =>
  routes.find(({ path: routePath }) => routePath === path) || {
    component: NotFound,
  };

const render = ({ component }) => {
  component() instanceof Promise
    ? component().then((target) => onClickNavigateButton(target))
    : component();
};

// prettier-ignore
const reRender = () => 
      _.go(
        findRoute(window.location.pathname),
        render);

const pushState = (path, data) => window.history.pushState(data, '', path);

const navigate = (path, data = {}) => {
  pushState(path, data);
  return path;
};

const init = (path) => _.go(path, navigate, findRoute, render);

const onClickNavigateButton = (target) => {
  target.addEventListener('click', (event) => {
    const closestTarget = event.target.closest('[data-link]');
    if (!closestTarget) return;

    event.preventDefault();

    const path = closestTarget.getAttribute('data-link');

    init(path);
  });
};

window.addEventListener('popstate', reRender);
window.addEventListener('DOMContentLoaded', reRender);

export { init, routes };
