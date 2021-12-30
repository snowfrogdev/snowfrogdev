export abstract class Result<T, E> {
  constructor(protected value: T | E) {}

  isOk(): this is Ok<T> {
    return this instanceof Ok;
  }

  isErr(): this is Err<E> {
    return !this.isOk();
  }

  contains(value: T): boolean {
    return this.isOk() && this.value === value;
  }

  containsErr(err: E): boolean {
    return this.isErr() && this.value === err;
  }
}

export class Ok<T> extends Result<T, unknown> {
  constructor(value: T) {
    super(value);
  }
}

export class Err<E> extends Result<unknown, E> {
  constructor(value: E) {
    super(value);
  }
}
