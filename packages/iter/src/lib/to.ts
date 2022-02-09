import { None, Option, Some } from '@snowfrog/option';
import { Iter } from './internal';

export type Constructor<T> = new (...args: any[]) => T;
export type AbstractConstructor<T = Record<string, unknown>> = abstract new (...args: any[]) => T;

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

    fold<B>(init: B, f: (acc: B, item: T) => B): B {
      let acc = init;
      for (const item of this) {
        acc = f(acc, item);
      }
      return acc;
    }
  };
}

/* export class ToIter<T> implements Iter<T> {
  private iterator: Iterator<T>;
  constructor(iterable: Iterable<T>) {
    this.iterator = iterable[Symbol.iterator]();
  }

  [Symbol.iterator](): Iterator<T> {
    return this.iterator;
  }

  next(): Option<T> {
    const { done, value } = this.iterator.next();
    return done ? new None() : new Some(value);
  }
} */
