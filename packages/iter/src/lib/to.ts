import { None, Option, Some } from '@snowfrog/option';
import { Iter } from './internal';

export class ToIter<T> extends Iter<T> {
  private iterator: Iterator<T>;
  constructor(iterable: Iterable<T>) {
    super();
    this.iterator = iterable[Symbol.iterator]();
  }

  [Symbol.iterator](): Iterator<T> {
    return this.iterator;
  }

  next(): Option<T> {
    const { done, value } = this.iterator.next();
    return done ? new None() : new Some(value);
  }
}
