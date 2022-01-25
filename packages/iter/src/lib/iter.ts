import { None, Option, Some } from '@snowfrog/option';
import { Err, Ok, Result } from '@snowfrog/result';
import { FilterIter, MapIter, ToIter, SkipIter, ChainIter, EnumerateIter, FlattenIter } from './internal';

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

  chain(other: Iter<T>): ChainIter<this, Iter<T>, T> {
    return new ChainIter(this, other);
  }

  enumerate(): EnumerateIter<this, T> {
    return new EnumerateIter(this);
  }

  all(f: (x: T) => boolean): boolean {
    for (const item of this) {
      if (!f(item)) return false;
    }
    return true;
  }

  position(predicate: (x: T) => boolean): Option<number> {
    let i = 0;
    for (const item of this) {
      if (predicate(item)) {
        return new Some(i);
      }
      i++;
    }
    return new None();
  }

  flatten<T extends Iterable<U>, U = T extends Iterable<infer U> ? U : never>(this: Iter<T>): FlattenIter<Iter<T>, T, U> {
    return new FlattenIter(this);
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


function unwrap<T extends Iterable<U>, U>(iter: Iterable<T>): U {
  return [...[...iter][0]][0];
}

unwrap([[1,2,3],[4,5,6]]);