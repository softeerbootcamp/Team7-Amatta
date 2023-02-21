import { NotFound } from '@/pages';
import { _ } from '@/utils/customFx';

const routes = [];

const findRoute = (path) =>
  routes.find(({ path: routePath }) => routePath === path) || {
    component: NotFound,
  };

const render = ({ path, component }) => component(path);

// prettier-ignore
const reRender = () => 
  _.go(
    findRoute(window.location.pathname),
    render);

const pushState = (path, data) => window.history.pushState(data, '', path);

const setData = (data) => (path) => {
  pushState(path, data);

  return path;
};

// prettier-ignore
const navigate = 
  async (path, data = {}) =>
    _.go(
      path,
      setData(data),
      findRoute,
      render);

const addNavigateEvent = (targets) => {
  _.isIterable(targets)
    ? targets.forEach((target) => onClickNavigateButton(target))
    : onClickNavigateButton(targets);
};

const link = (event) => {
  const closestTarget = _.findClosest(event.target, '[data-link]');
  if (!closestTarget) return;
  const path = _.getDataset(closestTarget, 'data-link');

  event.preventDefault();
  navigate(`/${path}`);
};

const onClickNavigateButton = (target) => target.addEventListener('click', link);

window.addEventListener('popstate', reRender);
window.addEventListener('DOMContentLoaded', reRender);

export { navigate, routes, addNavigateEvent };
