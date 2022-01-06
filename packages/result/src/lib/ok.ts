import { Err, Result } from './internal';

/**
 * A type alias for a successful [[Result]].
 */
export class Ok<T> extends Result<T, never> {
  constructor(private value: T) {
    super();
  }

  isOk(): this is Ok<T> {
    return true;
  }

  isErr(): this is Err<never> {
    return false;
  }

  map<U, E>(f: (value: T) => U): Result<U, E> {
    return new Ok(f(this.value));
  }

  mapOr<U>(defaultValue: U, f: (value: T) => U): U {
    return f(this.value);
  }

  mapOrElse<U, E>(defaultFunc: (e: E) => U, f: (value: T) => U): U {
    return f(this.value);
  }

  mapErr<F, E>(f: (e: E) => F): Result<T, F> {
    return new Ok(this.value);
  }

  and<U, E>(res: Result<U, E>): Result<U, E> {
    return res;
  }

  andThen<U, E>(f: (value: T) => Result<U, E>): Result<U, E> {
    return f(this.value);
  }

  or<F>(res: Result<T, F>): Result<T, F> {
    return new Ok(this.value);
  }

  orElse<F, E>(f: (err: E) => Result<T, F>): Result<T, F> {
    return new Ok(this.value);
  }

  unwrapOr(defaultValue: T): T {
    return this.value;
  }

  unwrapOrElse<E>(f: (err: E) => T): T {
    return this.value;
  }

  expect(message: string): T {
    return this.value;
  }

  unwrap(): T {
    return this.value;
  }

  expectErr<E>(message: string): E {
    throw new Error(`${message}: ${this.value}`);
  }

  unwrapErr<E>(): E {
    throw new Error(`called \`Result.unwrapErr()\` on an \`Ok\` value: ${this.value}`);
  }
}
