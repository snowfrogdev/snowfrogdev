/**
 * Option is an abstract class that represents an optional value:
 * every `Option` is either [[`Some`]] and contains a value, or [[`None`]]
 * and does not.
 *
 * @typeParam T The type of the value contained in the `Option`.
 */
export abstract class Option<T> {
  /**
   * @ignore
   */
  protected value: T;

  /**
   * @ignore
   */
  constructor(value: T) {
    this.value = value;
  }

  /**
   * Returns `true` if the option is a [[`Some`]] value.
   */
  isSome(): this is Some<T> {
    return this instanceof Some;
  }

  /**
   * Returns `true` if the option is a [[`None`]] value.
   */
  isNone(): this is None {
    return !this.isSome();
  }

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
  expect(message: string): T {
    if (this.isNone()) throw new Error(message);
    return (<Some<T>>this).value;
  }

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
  unwrap(): T {
    if (this.isNone()) throw new Error(`called \`Option.unwrap()\` on a \`None\` value`);
    return (<Some<T>>this).value;
  }

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
  unwrapOr(defaultValue: T): T {
    return this.isNone() ? defaultValue : (<Some<T>>this).value;
  }

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
  unwrapOrElse(fn: () => T): T {
    return this.isNone() ? fn() : (<Some<T>>this).value;
  }

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
  map<U>(f: (value: T) => U): Option<U> {
    return this.isNone() ? new None() : new Some(f((<Some<T>>this).value));
  }

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
  mapOr<U>(defaultValue: U, f: (value: T) => U): U {
    return this.isNone() ? defaultValue : f((<Some<T>>this).value);
  }

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
  mapOrElse<U>(defaultFunc: () => U, f: (value: T) => U): U {
    return this.isNone() ? defaultFunc() : f((<Some<T>>this).value);
  }

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
  and<U>(optB: Option<U>): Option<U> {
    return this.isNone() ? new None() : optB;
  }

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
  andThen<U>(fn: (value: T) => Option<U>): Option<U> {
    return this.isNone() ? new None() : fn((<Some<T>>this).value);
  }

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
  filter(predicate: (value: T) => boolean): Option<T> {
    if (this.isNone()) return new None();
    if (predicate((<Some<T>>this).value)) return new Some((<Some<T>>this).value);
    return new None();
  }

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
  or(optB: Option<T>): Option<T> {
    return this.isNone() ? optB : new Some((<Some<T>>this).value);
  }

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
  orElse(fn: () => Option<T>): Option<T> {
    return this.isNone() ? fn() : new Some((<Some<T>>this).value);
  }

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
  xor(optB: Option<T>): Option<T> {
    if (this.isSome() && optB.isNone()) return new Some(this.value);
    if (this.isNone() && optB.isSome()) return new Some(optB.value);
    return new None();
  }

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
  zip<U>(other: Option<U>): Option<[T, U]> {
    if (this.isSome() && other.isSome()) return new Some([this.value, other.value]);
    return new None();
  }
}

/**
 * A `Some` is an [[`Option`]] that contains a value.
 */
export class Some<T> extends Option<T> {
  constructor(value: T) {
    super(value);
  }
}

/**
 * A `None` is an [[`Option`]] that does not contain a value.
 */
export class None extends Option<any> {
  constructor() {
    super(null);
  }
}
