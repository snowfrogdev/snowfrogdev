import { None, Option, Some } from '@snowfrog/option';
import { Filter } from './internal';

export class Iter<T> implements Iterable<T> {
  protected constructor(private iterator: Iterator<T>) {}
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

  count(): number { 
    let count = 0;
    for (const _ of this) {
      count++;
    }
    return count;
  }

  find(predicate: (item: T) => boolean): Option<T> {
    for (const item of this) {
      if (predicate(item)) {
        return new Some(item);
      }
    }
    return new None();
  }

  filter<P extends (item: T) => boolean>(predicate: P): Filter<this, T> {
    return new Filter(this, predicate);
  }

  toArray(): T[] {
    return [...this];
  }

  toSet(): Set<T> {
    return new Set(this);
  }

  toMap<K, V>(this: Iter<[K, V]>): Map<K, V> {
    return new Map(this);
  }
}
