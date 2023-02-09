/* eslint-disable no-param-reassign */
/* eslint-disable no-cond-assign */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
const _ = {};
const L = {};

const makeString = (iter) => _.reduce((a, b) => `${a}${b}`, iter);

_.curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

L.map = _.curry(function* (f, iter) {
  for (const a of iter) {
    yield f(a);
  }
});

L.filter = _.curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

_.reduce = _.curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    acc = f(acc, a);
  }
  return acc;
});

_.go = (...args) => _.reduce((a, f) => f(a), args);

_.pipe =
  (f, ...fs) =>
  (...as) =>
    _.go(f(...as), ...fs);

_.take = _.curry((l, iter) => {
  const res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
});

_.takeAll = _.take(Infinity);

_.map = _.curry(_.pipe(L.map, _.takeAll));

_.filter = _.curry(_.pipe(L.filter, _.takeAll));

_.find = _.curry((f, iter) => _.go(iter, L.filter(f), _.take(1), ([a]) => a));

_.strMap = _.curry(_.pipe(_.map, makeString));

_.isIterable = (a) => a !== null && !!a[Symbol.iterator];

_.getDataset = (target, dataset) => target.getAttribute(dataset);
_.findClosest = (target, dataset) => target.closest(dataset);


export { L, _ };
