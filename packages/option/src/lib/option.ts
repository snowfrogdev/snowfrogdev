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
