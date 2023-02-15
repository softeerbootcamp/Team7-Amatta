export default class EventMonad {
  constructor(value) {
    this.value = value;
  }

  static of(value) {
    return new EventMonad(value);
  }

  map(fn) {
    return EventMonad.of(fn(this.value));
  }

  chain(fn) {
    return fn(this.value);
  }
}
