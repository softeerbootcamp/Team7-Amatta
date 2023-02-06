import { each, curry, isArray } from '@fxts/core';

// type Element = HTMLElement;
// type Selector = string;
// type Event = string;
// type DomType = {
//   qs: (sel: Selector, parent?: Element) => Element;
//   qsa: (sel: Selector, parent?: Element) => NodeListOf<Element>;
//   find: (sel: Selector) => (parent?: Element) => Element;
//   findAll: (sel: Selector) => (parent?: Element) => NodeListOf<Element>;
//   el: (html: string) => Element;
//   append: (parent: Element) => (child: Element) => void;
//   closest: (sel: Selector) => (el: Element) => Element;
//   remove: (el: Element) => void;
//   on: (
//     event: Event
//   ) => (f: (event: Event) => void) => (els: Element | Element[]) => void;
//   addClass: (name: string) => (el: Element) => void;
// };

const $: any = {};

$.qs = (sel: any, parent = document) => parent.querySelector(sel);
$.qsa = (sel: any, parent = document) => parent.querySelectorAll(sel);

$.find = curry($.qs);
$.findAll = curry($.qsa);

$.el = (html: any) => {
  const template = document.createElement('template');
  template.innerHTML = html;

  return template.content;
};

$.append = curry((parent, child) => {
  parent.replaceChildren(child);

  return parent;
});

$.closest = curry((sel, el) => el.closest(sel));

$.remove = (el: any) => el.parentNode.removeChild(el);

$.on = (event: any, f: any) => (els: any) => {
  console.log(event, f, els);
  return each(
    (el) => el.addEventListener(event, f),
    isArray(els) ? els : [els]
  );
};

$.addClass = curry((name, el) => el.classList.add(name));

export default $;
