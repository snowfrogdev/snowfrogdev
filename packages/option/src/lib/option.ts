/**
 * Option is an abstract class that represents an optional value:
 * every `Option` is either [[`Some`]] and contains a value, or [[`None`]]
 * and does not.
 *
 * @typeParam T The type of the value contained in the `Option`.
 */
export abstract class Option<T> {
  /**
   * Returns `true` if the option is a [[`Some`]] value.
   */
  abstract isSome(): this is Some<T>;

  /**
   * Returns `true` if the option is a [[`None`]] value.
   */
  abstract isNone(): this is None;

  /**
   * Returns the contained [[`Some`]] value.
   *
   * # Throws
   *
   * Throws if the value is a [[`None`]] with a custome error message
   * provided by the `errorMessage` parameter.
   *
   * # Examples
   *
   * ```ts
   * const x = new Some("value");
   * expect(x.expect("fruits are healthy")).toBe("value");
   *
   * const x = new None();
   * x.expect("fruits are healthy"); // throws with "fruits are healthy"
   * ```
   */
  abstract expect(message: string): T;

  /**
   * Returns the contained [[`Some`]] value.
   *
   * Because this function may throw, its use is generally discouraged.
   * Instead, handle the [[`None`]] case explicitly,
   * or call [[`unwrapOr`]] or [[`unwrapOrElse`]].
   *
   * # Throws
   *
   * Throws if the value is a [[`None`]].
   *
   * # Examples
   *
   * ```ts
   * const x = new Some("air");
   * expect(x.unwrap()).toBe("air");
   *
   * const x = new None();
   * x.unwrap(); // throws an Error
   * ```
   */
  abstract unwrap(): T;

  /**
   * Returns the contained [[`Some`]] value or a provided default.
   *
   * Arguments passed to `unwrapOr` are eagerly evaluated; if you are passing
   * the result of a function call, it is recommended to use [[`unwrapOrElse`]],
   * which is lazily evaluated.
   *
   * # Examples
   *
   * ```ts
   * expect(new Some("car").unwrapOr("bike")).toBe("car");
   * expect(new None().unwrapOr("bike")).toBe("bike");
   * ```
   */
  abstract unwrapOr(defaultValue: T): T;

  /**
   * Returns the contained [[`Some`]] value or computes it from a provided function.
   *
   * # Examples
   *
   * ```ts
   * expect(new Some(4).unwrapOrElse(() => 2 * 10)).toBe(4);
   * expect(new None().unwrapOrElse(() => 2 * 10)).toBe(20);
   * ```
   */
  abstract unwrapOrElse(fn: () => T): T;

  /**
   * Maps an `Option<T>` to an `Option<U>` by applying a function to a contained value.
   *
   * # Examples
   *
   * Converts an `Option<string> into an `Option<number>`:
   *
   * ```ts
   * const maybeSomeString = new Some ("Hello, World!");
   * const maybeSomeLength = maybeSomeString.map(s => s.length);
   *
   * expect (maybeSomeLength).toEqual(new Some(13));
   * ```
   */
  abstract map<U>(f: (value: T) => U): Option<U>;

  /**
   * Returns the provided default result (if none),
   * or applies a function to the contained value (if any).
   *
   * Arguments passed to `mapOr` are eagerly evaluated; if you are passing
   * the result of a function call, it is recommended to use [[`mapOrElse`]],
   * which is lazily evaluated.
   *
   * # Examples
   *
   * ```ts
   * const x = new Some("foo");
   * expect(x.mapOr(42, s => s.length)).toBe(3);
   *
   * const x = new None();
   * expect(x.mapOr(42, s => s.length)).toBe(42);
   * ```
   */
  abstract mapOr<U>(defaultValue: U, f: (value: T) => U): U;

  /**
   * Computes a default function result (if none), or
   * applies a different function to the contained value (if any).
   *
   * # Examples
   *
   * ```ts
   * const x = new Some("foo");
   * expect(x.mapOrElse(() => 2 * 21, s => s.length)).toBe(3);
   *
   * const x = new None();
   * expect(x.mapOrElse(() => 2 * 21, s => s.length)).toBe(42);
   * ```
   */
  abstract mapOrElse<U>(defaultFunc: () => U, f: (value: T) => U): U;

  /**
   * Returns [[`None`]] if the option is a [[`None`]], otherwise returns `optB`.
   *
   * # Examples
   *
   * ```ts
   * const x = new Some(2);
   * const y = new None();
   * expect(x.and(y)).toEqual(new None());
   *
   * const x = new None();
   * const y = new Some("foo");
   * expect(x.and(y)).toEqual(new None());
   *
   * const x = new Some(2);
   * const y = new Some("foo");
   * expect(x.and(y)).toEqual(new Some("foo"));
   *
   * const x = new None();
   * const y = new None();
   * expect(x.and(y)).toEqual(new None());
   * ```
   */
  abstract and<U>(optB: Option<U>): Option<U>;

  /**
   * Returns [[`None`]] if the option is a [[`None`]], otherwise calls `fn` with the
   * wrapped value and returns the result.
   *
   * Some languages call this operation flatMap.
   *
   * # Examples
   *
   * ```ts
   * const sq = (x: number) => new Some(x * x);
   * const nope = (x: number) => new None();
   *
   * expect(new Some(2).andThen(sq).andThen(sq)).toEqual(new Some(16));
   * expect(new Some(2).andThen(sq).andThen(nope)).toEqual(new None());
   * expect(new Some(2).andThen(nope).andThen(sq)).toEqual(new None());
   * expect(new None().andThen(sq).andThen(sq)).toEqual(new None());
   * ```
   */
  abstract andThen<U>(fn: (value: T) => Option<U>): Option<U>;

  /**
   * Returns [[`None`]] if the option is a [[`None`]], otherwise calls `predicate`
   * with the wrapped value and returns:
   *
   * - `Some(t)` if `predicate` returns `true` (where `t` is the wrapped value), and
   * - [[`None`]] if `predicate` returns `false`.
   *
   * # Examples
   *
   * ```ts
   * const isEven = (x: number) => x % 2 === 0;
   *
   * expect(new None().filter(isEven)).toEqual(new None());
   * expect(new Some(3).filter(isEven)).toEqual(new None());
   * expect(new Some(4).filter(isEven)).toEqual(new Some(4));
   * ```
   */
  abstract filter(predicate: (value: T) => boolean): Option<T>;

  /**
   * Returns the option if it contains a value, otherwise returns `optB`.
   *
   * Arguments passed to `or` are eagerly evaluated; if you are passing the
   * result of a function call, it is recommended to use [[`orElse`]], which is
   * lazily evaluated.
   *
   * # Examples
   *
   * ```ts
   * const x = new Some(2);
   * const y = new None();
   * expect(x.or(y)).toEqual(new Some(2));
   *
   * const x = new None();
   * const y = new Some(100);
   * expect(x.or(y)).toEqual(new Some(100));
   *
   * const x = new Some(2);
   * const y = new Some(100);
   * expect(x.or(y)).toEqual(new Some(2));
   *
   * const x = new None();
   * const y = new None();
   * expect(x.or(y)).toEqual(new None());
   * ```
   */
  abstract or(optB: Option<T>): Option<T>;

  /**
   * Returns the option if it contains a value, otherwise calls `fn` and
   * returns the result.
   *
   * # Examples
   *
   * ```ts
   * const nobody = () => new None();
   * const vikings = () => new Some("vikings");
   *
   * expect(new Some("barbarians").orElse(vikings)).toEqual(new Some("barbarians"));
   * expect(new None().orElse(vikings)).toEqual(new Some("vikings"));
   * expect(new None().orElse(nobody)).toEqual(new None());
   * ```
   */
  abstract orElse(fn: () => Option<T>): Option<T>;

  /**
   * Returns [[`Some`]] if exactly one of `this`, `optB` is [[`Some`]], otherwise
   * returns [[`None`]].
   *
   * # Examples
   *
   * ```ts
   * const x = new Some(2);
   * const y = new None();
   * expect(x.xor(y)).toEqual(new Some(2));
   *
   * const x = new None();
   * const y = new Some(2);
   * expect(x.xor(y)).toEqual(new Some(2));
   *
   * const x = new Some(2);
   * const y = new Some(2);
   * expect(x.xor(y)).toEqual(new None());
   *
   * const x = new None();
   * const y = new None();
   * expect(x.xor(y)).toEqual(new None());
   * ```
   */
  abstract xor(optB: Option<T>): Option<T>;

  /**
   * Zips `this` with another `Option`.
   *
   * If `this` is `Some(s)` and `other` is `Some(o)`, this method returns `Some([s, o])`.
   * Otherwise, it returns `None`.
   *
   * # Examples
   *
   * ```ts
   * const x = new Some(1);
   * const y = new Some("hi");
   * const z = new None();
   *
   * expect(x.zip(y)).toEqual(new Some([1, "hi"]));
   * expect(x.zip(z)).toEqual(new None());
   * ```
   */
  abstract zip<U>(other: Option<U>): Option<[T, U]>;

  /**
   * Zips `this` and another `Option` with function `fn`.
   *
   * If `this` is `Some(s)` and `other` is `Some(o)`, this method returns `Some(fn([s, o]))`.
   * Otherwise, it returns `None`.
   *
   * # Examples
   *
   * ```ts
   * const x = new Some(17.5);
   * const y = new Some(42.7);
   * const point = (x: number, y: number) => ({ x, y });
   *
   * expect(x.zipWith(y, point)).toEqual(new Some({ x: 17.5, y: 42.7 }));
   * expect(x.zipWith(new None(), point)).toEqual(new None());
   * ```
   */
  abstract zipWith<U, R>(other: Option<U>, fn: (a: T, b: U) => R): Option<R>;
}

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
