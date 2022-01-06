import { Option, Some } from "./internal";


/**
 * A `None` is an [[`Option`]] that does not contain a value.
 */
export class None extends Option<never> {
  isSome(): this is Some<never> {
    return false;
  }

  isNone(): this is None {
    return true;
  }
  expect(message: string): never {
    throw new Error(message);
  }

  unwrap(): never {
    throw new Error(`called \`Option.unwrap()\` on a \`None\` value`);
  }

  unwrapOr<T>(defaultValue: T): T {
    return defaultValue;
  }

  unwrapOrElse<T>(fn: () => T): T {
    return fn();
  }

  map<T, U>(f: (value: T) => U): Option<U> {
    return new None();
  }

  mapOr<T, U>(defaultValue: U, f: (value: T) => U): U {
    return defaultValue;
  }

  mapOrElse<T, U>(defaultFunc: () => U, f: (value: T) => U): U {
    return defaultFunc();
  }

  and<U>(optB: Option<U>): Option<U> {
    return new None();
  }

  andThen<T, U>(fn: (value: T) => Option<U>): Option<U> {
    return new None();
  }

  filter<T>(predicate: (value: T) => boolean): Option<T> {
    return new None();
  }

  or<T>(optB: Option<T>): Option<T> {
    return optB;
  }

  orElse<T>(fn: () => Option<T>): Option<T> {
    return fn();
  }

  xor<T>(optB: Option<T>): Option<T> {
    if (optB.isSome()) return new Some(optB.unwrap());
    return new None();
  }

  zip<T, U>(other: Option<U>): Option<[T, U]> {
    return new None();
  }

  zipWith<T, U, R>(other: Option<U>, fn: (a: T, b: U) => R): Option<R> {
    return new None();
  }
}
