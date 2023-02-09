import { _ } from '@/utils/customFx';

const $ = {};

$.qs = (sel, parent = document) => parent.querySelector(sel);
$.qsa = (sel, parent = document) => parent.querySelectorAll(sel);

$.find = _.curry($.qs);
$.findAll = _.curry($.qsa);

$.el = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html;

  return template.content;
};

$.replace = _.curry((parent, child) => {
  parent.replaceChildren(child);

  return parent;
});

$.closest = _.curry((sel, el) => el.closest(sel));

$.remove = (el) => el.parentNode.removeChild(el);

$.on = (event, f) => (target) => target.addEventListener(event, f);

export default $;
