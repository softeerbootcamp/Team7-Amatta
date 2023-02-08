/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
import { NotFound } from '@/pages';
import { _ } from '@/utils/customFx';

const routes = [];

const findRoute = (path) =>
  routes.find(({ path: routePath }) => routePath === path) || {
    component: NotFound,
  };

// prettier-ignore
const render = ({ component }) => {
  const temp = component();
  return temp instanceof Promise 
          ? temp.then((targets) => addNavigateEvent(targets))
          : temp;
}

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
  (path, data = {}) =>
    _.go(
      path,
      setData(data),
      findRoute,
      render);

const addNavigateEvent = (targets) => {
  _.isIterable(targets) && targets.forEach((target) => onClickNavigateButton(target));
  !_.isIterable(targets) && onClickNavigateButton(targets);
};

const link = (event) => {
  const closestTarget = _.findClosest(event.target, '[data-link]');
  if (!closestTarget) return;
  const path = _.getDataset(closestTarget, 'data-link');

  event.preventDefault();
  navigate(path);
};

const onClickNavigateButton = (target) => target.addEventListener('click', link);

window.addEventListener('popstate', reRender);
window.addEventListener('DOMContentLoaded', reRender);

export { navigate, routes, addNavigateEvent };
