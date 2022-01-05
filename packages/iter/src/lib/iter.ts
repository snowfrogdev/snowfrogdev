import { None, Option, Some } from '@snowfrog/option';

export class Iter<T> implements Iterable<T> {
  private constructor(private iterator: Iterator<T>) {}
  static from<T>(iterable: Iterable<T>): Iter<T> {
    return new Iter(iterable[Symbol.iterator]());
  }

  [Symbol.iterator](): Iterator<T> {
    return this.iterator;
  }

  next(): Option<T> {
    const { done, value } = this.iterator.next();
    return done ? new None() : new Some(value);
  }

  toArray(): T[] {
    return [...this];
  }

  toSet(): Set<T> {
    return new Set(this);
  }
}
