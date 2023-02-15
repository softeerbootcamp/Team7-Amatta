export default class Maybe {
  constructor(value) {
    this.value = value;
  }

  static of(value) {
    return new Maybe(value);
  }

  map(fn) {
    return this.value ? Maybe.of(fn(this.value)) : this;
  }

  getOrElse(defaultValue) {
    return this.value || defaultValue;
  }
}
