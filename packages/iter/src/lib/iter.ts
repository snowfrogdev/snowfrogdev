import { Option } from '@snowfrog/option';

export interface Iter<T> extends Iterable<T> {
  count(): number;
  fold<B>(init: B, f: (acc: B, item: T) => B): B;
  next(): Option<T>;
}

/* export abstract class Iter<T> implements Iterable<T> {
  abstract next(): Option<T>;
  abstract [Symbol.iterator](): Iterator<T>;

  static from<T>(array: T[]): DoubleEndedIter<T>;
  static from<T>(iterable: Iterable<T>): Iter<T>;
  static from<T>(iterable: Iterable<T> | T[]): Iter<T> | DoubleEndedIter<T> {
    if (iterable instanceof Array) return DoubleEndedIter.from(iterable as T[]);
    return new ToIter(iterable);
  }

  static once<T>(value: T): DoubleEndedIter<T> {
    return Iter.from([value]);
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

  all(f: (x: T) => boolean): boolean {
    for (const item of this) {
      if (!f(item)) return false;
    }
    return true;
  }

  any(f: (x: T) => boolean): boolean {
    for (const item of this) {
      if (f(item)) return true;
    }
    return false;
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
