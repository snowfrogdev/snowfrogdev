import { Ok, Result } from './internal';

/**
 * A type alias for a failed [[Result]].
 */
export class Err<E> extends Result<never, E> {
  constructor(private value: E) {
    super();
  }

  isOk(): this is Ok<never> {
    return false;
  }

  isErr(): this is Err<E> {
    return true;
  }

  map<U, T>(f: (value: T) => U): Result<U, E> {
    return new Err(this.value);
  }

  mapOr<U, T>(defaultValue: U, f: (value: T) => U): U {
    return defaultValue;
  }

  mapOrElse<U, T>(defaultFunc: (e: E) => U, f: (value: T) => U): U {
    return defaultFunc(this.value);
  }

  mapErr<F, T>(f: (e: E) => F): Result<T, F> {
    return new Err(f(this.value));
  }

  and<U>(res: Result<U, E>): Result<U, E> {
    return new Err(this.value as E);
  }

  andThen<U, T>(f: (value: T) => Result<U, E>): Result<U, E> {
    return new Err(this.value);
  }

  or<F, T>(res: Result<T, F>): Result<T, F> {
    return res;
  }

  orElse<F, T>(f: (err: E) => Result<T, F>): Result<T, F> {
    return f(this.value as E);
  }

  unwrapOr<T>(defaultValue: T): T {
    return defaultValue;
  }

  unwrapOrElse<T>(f: (err: E) => T): T {
    return f(this.value);
  }

  expect<T>(message: string): T {
    throw new Error(`${message}: ${this.value}`);
  }

  unwrap<T>(): T {
    throw new Error(`called \`Result.unwrap()\` on an \`Err\` value: "${this.value as E}"`);
  }

  expectErr(message: string): E {
    return this.value;
  }

  unwrapErr(): E {
    return this.value;
  }
}
