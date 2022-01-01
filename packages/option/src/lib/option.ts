export abstract class Option<T> {
  constructor(protected value: T) { }
  
  isSome(): boolean {
    return this instanceof Some;
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
