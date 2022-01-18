import { None, Option, Some } from '@snowfrog/option';
import { Err, Ok, Result } from '@snowfrog/result';
import { FilterIter, MapIter, ToIter, SkipIter } from './internal';

export abstract class Iter<T> implements Iterable<T> {
  abstract next(): Option<T>;
  abstract [Symbol.iterator](): Iterator<T>;

  static from<T>(iterable: Iterable<T>): Iter<T> {
    return ToIter.from(iterable);
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

  map<B>(f: (item: T) => B): MapIter<this, T, B> {
    return new MapIter(this, f);
  }

  filter<P extends (item: T) => boolean>(predicate: P): FilterIter<this, T> {
    return new FilterIter(this, predicate);
  }

  skip(n: number): SkipIter<this, T> {
    return new SkipIter(this, n);
  }

  nth(n: number): Option<T> {
    if (this.advanceBy(n).isErr()) return new None();
    return this.next();
  }

  advanceBy(n: number): Result<never[], number> {
    for (let i = 0; i < n; i++) {
      if (this.next().isNone()) return new Err(i);
    }

    return new Ok([]);
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
