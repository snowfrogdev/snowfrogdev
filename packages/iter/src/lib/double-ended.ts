import { None, Option, Some } from '@snowfrog/option';
import { Err, Ok, Result } from '@snowfrog/result';
import { ArrayIter, Iter, RevIter } from './internal';

export abstract class DoubleEndedIter<T> extends Iter<T> {
  abstract nextBack(): Option<T>;
  abstract len(): number;
  static from<T>(array: T[]): DoubleEndedIter<T> {
    return ArrayIter.from(array);
  }

  advanceBackBy(n: number): Result<never[], number> {
    for (let i = 0; i < n; i++) {
      if (this.nextBack().isNone()) return new Err(i);
    }

    return new Ok([]);
  }

  isEmpty(): boolean {
    return this.len() === 0;
  }

  rev(): RevIter<this, T> {
    return new RevIter(this);
  }

  rfold<B>(init: B, f: (acc: B, item: T) => B): B {
    let acc = init;
    let item = this.nextBack();
    while (item.isSome()) {
      acc = f(acc, item.unwrap());
      item = this.nextBack();
    }
    return acc;
  }

  rfind(predicate: (item: T) => boolean): Option<T> {
    let item = this.nextBack();
    while (item.isSome()) {
      const unwrapped = item.unwrap();
      if (predicate(unwrapped)) {
        return new Some(unwrapped);
      }
      item = this.nextBack();
    }

    return new None();
  }

  rposition(predicate: (item: T) => boolean): Option<number> {
    let i = this.len();
    let item = this.nextBack();
    while (item.isSome()) {
      i = i - 1;
      if (predicate(item.unwrap())) {
        return new Some(i);
      }
      item = this.nextBack();
    }

    return new None();
  }
}
