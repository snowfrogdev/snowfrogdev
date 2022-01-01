export abstract class Option<T> {
  constructor(protected value: T) { }
  
  isSome(): this is Some<T> {
    return this instanceof Some;
  }

  isNone(): this is None { 
    return !this.isSome();
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
