import { Iter, IterCtor, mixinIter } from './internal';
import { None, Option, Some } from '@snowfrog/option';

const ToIterBase: IterCtor<any> = mixinIter(class {});

class ToIter<T> extends ToIterBase implements Iter<T> {
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

export function from<T>(iterable: Iterable<T>): Iter<T> {
  return new ToIter(iterable);
}
