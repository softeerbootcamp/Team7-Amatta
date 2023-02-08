/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
import { NotFound } from '@/pages/index';
import { _ } from '@/utils/customFx';

const routes = [];

const findRoute = (path) =>
  routes.find(({ path: routePath }) => routePath === path) || {
    component: NotFound,
  };

// prettier-ignore
const render = ({ component }) =>
  component() instanceof Promise 
    ? component().then((targets) => addNavigateEvent(targets))
    : component();

// prettier-ignore
const reRender = () => 
  _.go(
    findRoute(window.location.pathname),
    render);

const pushState = (path, data) => window.history.pushState(data, '', path);

const navigate = (data) => (path) => {
  pushState(path, data);
  return path;
};

// prettier-ignore
const init = 
  (path, data = {}) =>
    _.go(
      path, navigate(data),
      findRoute,
      render);

const isIterable = (a) => a !== null && !!a[Symbol.iterator];

const addNavigateEvent = (targets) => {
  isIterable(targets) && targets.forEach((target) => onClickNavigateButton(target));
  !isIterable(targets) && onClickNavigateButton(targets);
};

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
