import { Err, Ok } from './internal';

/**
 * Result is an abstract class that represents either success [[Ok]] or failure [[Err]].
 * See the [module documentation](https://snowfrogdev.github.io/snowfrogdev/result/) for details.
 *
 * @typeParam T The type of the success value.
 * @typeParam E The type of the failure value.
 */
export abstract class Result<T, E> {
  /**
   * Returns `true` if the result is [[Ok]], `false` otherwise.
   */
  abstract isOk(): this is Ok<T>;

  /**
   * Returns `true` if the result is [[Err]], `false` otherwise.
   */
  abstract isErr(): this is Err<E>;

  /**
   * Maps a `Result<T, E>` to a `Result<U, E>` by applying a function to a
   * contained [[Ok]] value, leaving an [[Err]] value untouched.
   *
   * This function can be used to compose the results of two functions.
   *
   * # Examples
   *
   * Print the number on each line of a string multiplied by two.
   *
   * ```ts
   * const lines = "1\n2\n3\n4\n";
   * const parse = (str: string): Result<number, typeof NaN> => {
   *   const num = parseInt(str, 10);
   *   return isNaN(num) ? new Err(num) : new Ok(num);
   * };
   *
   * for (const num of lines.split("\n")) {
   *   const result = parse(num).map(n => n * 2);
   *   if (result.isOk()) console.log(result.unwrap())
   * }
   * ```
   */
  abstract map<U>(f: (value: T) => U): Result<U, E>;

  /**
   * Returns the provided default value if the result is [[Err]], otherwise
   * applies the function `f` to the [[Ok]] value and returns the result.
   *
   * Arguments passed to `mapOr` are eagerly evaluated; if you are passing
   * the result of a function call, it is recommended to use [[mapOrElse]],
   * which is lazily evaluated.
   *
   * # Examples
   *
   * ```ts
   * const x = new Ok("foo");
   * expect(x.mapOr(42, str => str.length)).toBe(3);
   *
   * const y = new Err("bar");
   * expect(y.mapOr(42, str => str.length)).toBe(42);
   * ```
   */
  abstract mapOr<U>(defaultValue: U, f: (value: T) => U): U;

  /**
   * Maps a `Result<T, E>` to `U` by applying fallback function `defaultFunc` to
   * a contained [[Err]] value, or function `f` to a contained [[Ok]] value.
   *
   * This function can be used to unpack a successful result
   * while handling an error.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const k = 21;
   *
   * const x = new Ok("foo");
   * expect(x.mapOrElse(e => k * 2, str => str.length)).toBe(3);
   *
   * const y = new Err("bar");
   * expect(y.mapOrElse(e => k * 2, str => str.length)).toBe(42);
   * ```
   */
  abstract mapOrElse<U>(defaultFunc: (e: E) => U, f: (value: T) => U): U;

  /**
   * Maps a `Result<T, E>` to a `Result<T, F>` by applying a function to a
   * contained [[Err]] value, leaving an [[Ok]] value untouched.
   *
   * This function can be used to pass through a successful result while handling
   * an error.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const stringify = (x: number) => `error code: ${x}`;
   *
   * const x = new Ok(2);
   * expect(x.mapErr(stringify)).toEqual(new Ok(2));
   *
   * const y = new Err(13);
   * expect(y.mapErr(stringify)).toEqual(new Err("error code: 13"));
   * ```
   */
  abstract mapErr<F>(f: (e: E) => F): Result<T, F>;

  /**
   * Returns `res` if the result is [[Ok]], otherwise returns the [[Err]] value of `this`.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const x = new Ok(2);
   * const y = new Err("late error");
   * expect(x.and(y)).toEqual(new Err("late error"));
   *
   * const x = new Err("early error");
   * const y = new Ok("foo");
   * expect(x.and(y)).toEqual(new Err("early error"));
   *
   * const x = new Err("not a 2");
   * const y = new Err("late error");
   * expect(x.and(y)).toEqual(new Err("not a 2"));
   *
   * const x = new Ok(2);
   * const y = new Ok("different result type");
   * expect(x.and(y)).toEqual(new Ok("different result type"));
   * ```
   */
  abstract and<U>(res: Result<U, E>): Result<U, E>;

  /**
   * Calls `f` if the result is [[Ok]], otherwise returns the [[Err]] value of `this`.
   *
   * This function can be used for control flow based on `Result` values.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const sq = (x: number) => new Ok(x * x);
   * const err = (x: number) => new Err(x);
   *
   * expect(new Ok(2).andThen(sq).andThen(sq)).toEqual(new Ok(16));
   * expect(new Ok(2).andThen(sq).andThen(err)).toEqual(new Err(4));
   * expect(new Ok(2).andThen(err).andThen(sq)).toEqual(new Err(2));
   * expect(new Err(3).andThen(sq).andThen(sq)).toEqual(new Err(3));
   * ```
   */
  abstract andThen<U>(f: (value: T) => Result<U, E>): Result<U, E>;

  /**
   * Returns `res` if the result is [[Err]], otherwise returns the [[Ok]] value of `this`.
   *
   * Arguments passed to `or` are eagerly evaluated; if you are passing
   * the result of a function call, it is recommended to use [[orElse]], which is
   * lazily evaluated.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const x = new Ok(2);
   * const y = new Err("late error");
   * expect(x.or(y)).toEqual(new Ok(2));
   *
   * const x = new Err("early error");
   * const y = new Ok(2);
   * expect(x.or(y)).toEqual(new Ok(2));
   *
   * const x = new Err("not a 2");
   * const y = new Err("late error");
   * expect(x.or(y)).toEqual(new Err("late error"));
   *
   * const x = new Ok(2);
   * const y = new Ok("100");
   * expect(x.or(y)).toEqual(new Ok(2));
   * ```
   */
  abstract or<F>(res: Result<T, F>): Result<T, F>;

  /**
   * Calls `f` if the result is [[Err]], otherwise returns the [[Ok]] value of `this`.
   *
   * This function can be used for control flow based on result values.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const sq = (x: number) => new Ok(x * x);
   * const err = (x: number) => new Err(x);
   *
   * expect(new Ok(2).orElse(sq).orElse(sq)).toEqual(new Ok(2));
   * expect(new Ok(2).orElse(err).orElse(sq)).toEqual(new Ok(2));
   * expect(new Err(3).orElse(sq).orElse(err)).toEqual(new Ok(9));
   * expect(new Err(3).orElse(err).orElse(err)).toEqual(new Err(3));
   * ```
   */
  abstract orElse<F>(f: (err: E) => Result<T, F>): Result<T, F>;

  /**
   * Return the contained [[Ok]] value or a provided default.
   *
   * Arguments passed to `unwrapOr` are eagerly evaluated; if you are passing
   * the result of a function call, it is recommended to use [[unwrapOrElse]],
   * which is lazily evaluated.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const defaultValue = 2;
   * const x = new Ok(9);
   * expect(x.unwrapOr(defaultValue)).toBe(9);
   *
   * const x = new Err("error");
   * expect(x.unwrapOr(defaultValue)).toBe(defaultValue);
   * ```
   */
  abstract unwrapOr(defaultValue: T): T;

  /**
   * Returns the contained [[Ok]] value or computes it from a provided function.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const count = (x: string) => x.length;
   *
   * expect(new Ok(2).unwrapOrElse(count)).toBe(2);
   * expect(new Err("foo").unwrapOrElse(count)).toBe(3);
   * ```
   */
  abstract unwrapOrElse(f: (err: E) => T): T;

  /**
   * Returns the contained [[Ok]] value.
   *
   * # Throws
   *
   * Throws if the value is an [[Err]], with an error message including the
   * passed message, and the content of the [[Err]].
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const x = new Err("emergency failure");
   * x.expect("Testing expect"); // throws an error with `Testing expect: emergency failure`
   */
  abstract expect(message: string): T;

  /**
   * Returns the contained [[Ok]] value.
   *
   * Because this function may throw, its use is generally discouraged.
   * Instead, handle the [[Err]] case explicitly,
   * or call [[unwrapOr]] or [[unwrapOrElse]].
   *
   * # Throws
   *
   * Throws if the value is an [[Err]], with an error message provided by the
   * [[Err]]'s value.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const x = new Ok(2);
   * expect(x.unwrap()).toBe(2);
   *
   * const x = new Err("emergency failure");
   * x.unwrap(); // throws an Error with `emergency failure`
   * ```
   */
  abstract unwrap(): T;

  /**
   * Return the contained [[Err]] value.
   *
   * # Throws
   *
   * Throws if the value is an [[Ok]], with an error message including the
   * passed message, and the content of the [[Ok]].
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const x = new Ok(10);
   * x.expectErr("Testing expectErr"); // throws an error with `Testing expectErr: 10`
   * ```
   */
  abstract expectErr(message: string): E;

  /**
   * Return the contained [[Err]] value.
   *
   * # Throws
   *
   * Throws if the value is an [[Ok]], with a custom message
   * provided by the [[Ok]]'s value.
   *
   * # Examples
   *
   * ```ts
   * const x = new Ok(2);
   * x.unwrapErr(); // throws an error with `2`
   *
   * const x = new Err("emergency failure");
   * expect(x.unwrapErr()).toBe("emergency failure");
   * ```
   */
  abstract unwrapErr(): E;
}
