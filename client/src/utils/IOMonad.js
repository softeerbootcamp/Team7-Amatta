export default class IO {
  constructor(effect) {
    if (typeof effect !== 'function') throw new Error('함수 아님!');

    this.effect = effect;
  }

  static of(effect) {
    return new IO(effect);
  }

  map(fn) {
    return new IO(() => fn(this.effect()));
  }

  chain(fn) {
    return new IO(() => fn(this.effect()).effect());
  }

  run() {
    return this.effect();
  }
}
