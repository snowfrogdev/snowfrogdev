import { None, Some, Option } from "@snowfrog/option";

export class Iter<T> implements Iterable<T> {
  private constructor(private iterator: Iterator<T>) {};
  static from<T>(iterable: Iterable<T>): Iter<T> {
    return new Iter(iterable[Symbol.iterator]());
  }

  next(): Option<T> {
    const { done, value } = this.iterator.next();
    return done ? new None() : new Some(value);	
  };

  [Symbol.iterator](): Iterator<T> { 
    return this.iterator;
  }
}
