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
    return this.value;
  }

  unwrap(): T {
    if (this.isNone()) throw new Error(`called \`Option.unwrap()\` on a \`None\` value`);
    return this.value;
  }
}

export class Some<T> extends Option<T> {
  constructor(value: T) {
    super(value);
  }
}

export class None extends Option<null> {
  constructor() {
    super(null);
  }
}
