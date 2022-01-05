import { None, Option, Some } from '@snowfrog/option';
import { FilterIter, MapIter } from './internal';

export abstract class Iter<T> implements Iterable<T> {
  abstract next(): Option<T>;
  abstract [Symbol.iterator](): Iterator<T>;

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
