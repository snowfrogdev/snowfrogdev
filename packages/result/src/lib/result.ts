export abstract class Result<T, E> {
  isOk(): this is Ok<T> { 
    return this instanceof Ok;
  }
}

export class Ok<T> extends Result<T, unknown> {
  constructor(private value: T) {super()}
}

export class Err<E> extends Result<unknown, E> { 
  constructor(private error: E) {super()}
}

