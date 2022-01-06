import { Option, None } from './internal';

/**
 * A `Some` is an [[`Option`]] that contains a value.
 */
export class Some<T> extends Option<T> {
  constructor(private value: T) {
    super();
  }

  isSome(): this is Some<T> {
    return true;
  }

  isNone(): this is None {
    return false;
  }

  expect(message: string): T {
    return this.value;
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOr(defaultValue: T): T {
    return this.value;
  }

  unwrapOrElse(fn: () => T): T {
    return this.value;
  }

  map<U>(f: (value: T) => U): Option<U> {
    return new Some(f(this.value));
  }

  mapOr<U>(defaultValue: U, f: (value: T) => U): U {
    return f(this.value);
  }

  mapOrElse<U>(defaultFunc: () => U, f: (value: T) => U): U {
    return f(this.value);
  }

  and<U>(optB: Option<U>): Option<U> {
    return optB;
  }

  andThen<U>(fn: (value: T) => Option<U>): Option<U> {
    return fn(this.value);
  }

  filter(predicate: (value: T) => boolean): Option<T> {
    if (predicate(this.value)) return new Some(this.value);
    return new None();
  }

  or(optB: Option<T>): Option<T> {
    return new Some(this.value);
  }

  orElse(fn: () => Option<T>): Option<T> {
    return new Some(this.value);
  }

  xor(optB: Option<T>): Option<T> {
    if (optB.isNone()) return new Some(this.value);
    return new None();
  }

  zip<U>(other: Option<U>): Option<[T, U]> {
    if (other.isSome()) return new Some([this.value, other.value]);
    return new None();
  }

  zipWith<U, R>(other: Option<U>, fn: (a: T, b: U) => R): Option<R> {
    if (other.isSome()) return new Some(fn(this.value, other.value));
    return new None();
  }
}
