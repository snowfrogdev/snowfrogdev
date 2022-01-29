import { None, Option, Some } from '@snowfrog/option';
import { ArrayIter, Iter, RevIter } from './internal';

export abstract class DoubleEndedIter<T> extends Iter<T> {
  abstract nextBack(): Option<T>;

  static from<T>(array: T[]): DoubleEndedIter<T> {
    return ArrayIter.from(array);
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
}
