const _ = {};
const L = {};

const nop = Symbol('nop');
const makeString = (iter) => _.reduce((a, b) => `${a}${b}`, iter);
const goPromise = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
const head = (iter) => goPromise(_.take(1, iter), ([h]) => h);

const reducePromise = (acc, a, f) =>
  a instanceof Promise
    ? a.then(
        (a) => f(acc, a),
        (e) => (e === nop ? acc : Promise.reject(e)),
      )
    : f(acc, a);

_.curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

_.map = _.curry(_.pipe(L.map, _.takeAll));
_.filter = _.curry(_.pipe(L.filter, _.takeAll));

L.map = _.curry(function* (f, iter) {
  for (const a of iter) {
    yield goPromise(a, f);
  }
});
L.filter = _.curry(function* (f, iter) {
  for (const a of iter) {
    const b = goPromise(a, f);
    if (b instanceof Promise) yield b.then((b) => (b ? a : Promise.reject(nop)));
    else if (b) yield a;
  }
});

_.reduce = _.curry((f, acc, iter) => {
  if (!iter) return _.reduce(f, head((iter = acc[Symbol.iterator]())), iter);

  iter = iter[Symbol.iterator]();
  return goPromise(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      acc = reducePromise(acc, cur.value, f);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});
_.go = (...args) => _.reduce((a, f) => f(a), args);
_.pipe =
  (f, ...fs) =>
  (...as) =>
    _.go(f(...as), ...fs);

_.takeAll = _.take(Infinity);
_.take = _.curry((l, iter) => {
  const res = [];
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) {
        return a
          .then((a) => ((res.push(a), res).length === l ? res : recur()))
          .catch((e) => (e === nop ? recur() : Promise.reject(e)));
      }
      res.push(a);
      if (res.length === l) return res;
    }
    return res;
  })();
});

_.find = _.curry((f, iter) => _.go(iter, L.filter(f), _.take(1), ([a]) => a));
_.strMap = _.curry(_.pipe(_.map, makeString));
_.tap =
  (f, ...fs) =>
  (a, ...as) =>
    _.go(_.reduce(_.go, f(a, ...as), fs), () => a);

_.isIterable = (a) => a !== null && !!a[Symbol.iterator];
_.getDataset = (target, dataset) => target.getAttribute(dataset);
_.findClosest = (target, dataset) => target.closest(dataset);

export { L, _ };
