export abstract class Option<T> {
  constructor(protected value: T) {}

  isSome(): this is Some<T> {
    return this instanceof Some;
  }

  isNone(): this is None {
    return !this.isSome();
  }

  expect(message: string): T {
    if (this.isNone()) throw new Error(message);
    return (<Some<T>>this).value;
  }

  unwrap(): T {
    if (this.isNone()) throw new Error(`called \`Option.unwrap()\` on a \`None\` value`);
    return (<Some<T>>this).value;
  }

  unwrapOr(defaultValue: T): T {
    return this.isNone() ? defaultValue : (<Some<T>>this).value;
  }

  unwrapOrElse(fn: () => T): T {
    return this.isNone() ? fn() : (<Some<T>>this).value;
  }

  map<U>(f: (value: T) => U): Option<U> {
    return this.isNone() ? new None() : new Some(f((<Some<T>>this).value));
  }

  mapOr<U>(defaultValue: U, f: (value: T) => U): U {
    return this.isNone() ? defaultValue : f((<Some<T>>this).value);
  }

  mapOrElse<U>(defaultFunc: () => U, f: (value: T) => U): U {
    return this.isNone() ? defaultFunc() : f((<Some<T>>this).value);
  }

  and<U>(optB: Option<U>): Option<U> {
    return this.isNone() ? new None() : optB;
  }

  andThen<U>(fn: (value: T) => Option<U>): Option<U> {
    return this.isNone() ? new None() : fn((<Some<T>>this).value);
  }

  filter(predicate: (value: T) => boolean): Option<T> {
    if (this.isNone()) return new None();
    if (predicate((<Some<T>>this).value)) return new Some((<Some<T>>this).value);
    return new None();
  }

  or(optB: Option<T>): Option<T> {
    return this.isNone() ? optB : new Some((<Some<T>>this).value);
  }

  orElse(fn: () => Option<T>): Option<T> {
    return this.isNone() ? fn() : new Some((<Some<T>>this).value);
  }

  xor(optB: Option<T>): Option<T> {
    if (this.isSome() && optB.isNone()) return new Some(this.value);
    if (this.isNone() && optB.isSome()) return new Some(optB.value);
    return new None();
  }

  zip<U>(other: Option<U>): Option<[T, U]> {
    if (this.isSome() && other.isSome()) return new Some([this.value, other.value]);
    return new None();
  }
}

export class Some<T> extends Option<T> {
  constructor(value: T) {
    super(value);
  }
}

export class None extends Option<any> {
  constructor() {
    super(null);
  }
}
