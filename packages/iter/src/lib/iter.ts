import { Option } from '@snowfrog/option';
import { Result } from '@snowfrog/result';

export interface Iter<T> extends Iterable<T> {
  advanceBy(n: number): Result<never[], number>;
  all(f: (x: T) => boolean): boolean;
  any(f: (x: T) => boolean): boolean;
  count(): number;
  find(predicate: (item: T) => boolean): Option<T>;
  fold<B>(init: B, f: (acc: B, item: T) => B): B;
  next(): Option<T>;
  nth(n: number): Option<T>;
}

/* export abstract class Iter<T> implements Iterable<T> {
  
  static once<T>(value: T): DoubleEndedIter<T> {
    return Iter.from([value]);
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

  chain<U extends DoubleEndedIter<T>, V extends DoubleEndedIter<T>>(this: U, other: V): ChainDoubleEndedIter<U, V, T>;
  chain(other: Iter<T>): ChainIter<this, Iter<T>, T>;
  chain(other: Iter<T> | DoubleEndedIter<T>): ChainIter<this, Iter<T>, T> {
    if (this.isDoubleEndendIter(this) && this.isDoubleEndendIter(other)) {
      return new ChainDoubleEndedIter(this, other as DoubleEndedIter<T>);
    }
    return new ChainIter(this, other);
  }

  enumerate(): EnumerateIter<this, T> {
    return new EnumerateIter(this);
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

  flatten<T extends Iterable<U>, U = T extends Iterable<infer U> ? U : never>(
    this: Iter<T>
  ): FlattenIter<Iter<T>, T, U> {
    return new FlattenIter(this);
  }

  flatMap<U>(f: (item: T) => Iterable<U>): FlatMapIter<this, T, Iterable<U>, U> {
    return new FlatMapIter(this, f);
  }

  forEach(f: (item: T) => void): void {
    for (const item of this) {
      f(item);
    }
  }

  fold<B>(init: B, f: (acc: B, item: T) => B): B {
    let acc = init;
    for (const item of this) {
      acc = f(acc, item);
    }
    return acc;
  }

  reduce(f: (acc: T, item: T) => T): Option<T> {
    const first = this.next();
    if (first.isNone()) return new None();
    return new Some(this.fold(first.unwrap(), f));
  }

  last(): Option<T> {
    return this.fold(new None() as Option<T>, (_: Option<T>, x: T) => new Some(x));
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

  private isDoubleEndendIter<T>(iter: Iter<T>): this is DoubleEndedIter<T> {
    const doubleEndedIterMethodNames = ['nextBack', 'advanceBackBy', 'nthBack', 'rfind'];
    return iter instanceof DoubleEndedIter || doubleEndedIterMethodNames.every((name) => name in iter);
  }
} */
