import { Option } from '@snowfrog/option';
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
    while(item.isSome()) {
      acc = f(acc, item.unwrap());
      item = this.nextBack();
    }
    return acc;
  }
}
