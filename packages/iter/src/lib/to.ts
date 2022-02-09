import { None, Option, Some } from '@snowfrog/option';
import { Err, Ok, Result } from '@snowfrog/result';
import { Iter } from './internal';

type Constructor<T> = new (...args: any[]) => T;
type AbstractConstructor<T = Record<string, unknown>> = abstract new (...args: any[]) => T;

export type IterCtor<T> = Constructor<Iter<T>>;

export function mixinIter<T, B extends AbstractConstructor<Record<string, any>>>(base: B): IterCtor<T> & B;
export function mixinIter<T, B extends Constructor<Record<string, any>>>(base: B): IterCtor<T> & B {
  return class extends base {
    next(): Option<T> {
      throw new Error('next() is not implemented and needs to be overridden');
    }

    [Symbol.iterator](): Iterator<T> {
      throw new Error('[Symbol.iterator] is not implemented and needs to be overridden');
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

    advanceBy(n: number): Result<never[], number> {
      for (let i = 0; i < n; i++) {
        if (this.next().isNone()) return new Err(i);
      }

      return new Ok([]);
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

    fold<B>(init: B, f: (acc: B, item: T) => B): B {
      let acc = init;
      for (const item of this) {
        acc = f(acc, item);
      }
      return acc;
    }

    last(): Option<T> {
      return this.fold(new None() as Option<T>, (_: Option<T>, x: T) => new Some(x));
    }

    nth(n: number): Option<T> {
      if (this.advanceBy(n).isErr()) return new None();
      return this.next();
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

    reduce(f: (acc: T, item: T) => T): Option<T> {
      const first = this.next();
      if (first.isNone()) return new None();
      return new Some(this.fold(first.unwrap(), f));
    }

    toArray(): T[] {
      return [...this];
    }

    toMap<K, V>(this: Iter<[K, V]>): Map<K, V> {
      return new Map(this);
    }

    toSet(): Set<T> {
      return new Set(this);
    }
  };
}
