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

  map<U>(op: (value: T) => U): Result<U, E> {
    if (this.isOk()) {
      return new Ok(op(this.value as T));
    }
    return new Err((<Err<E>>this).value as E);
  }
}

export class Ok<T> extends Result<T, any> {
  constructor(value: T) {
    super(value);
  }
}

export class Err<E> extends Result<any, E> {
  constructor(value: E) {
    super(value);
  }
}
