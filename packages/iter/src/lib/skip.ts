import { Option } from '@snowfrog/option';
import { Iter } from './internal';

export class SkipIter<I extends Iter<T>, T> extends Iter<T> {
  constructor(private iter: I, private n: number) {
    super();
  }
  next(): Option<T> {
    if (this.n > 0) {
      this.iter.nth(this.n - 1);
    }
    return this.iter.next();
  }

  *[Symbol.iterator](): Iterator<T> {
    let item = this.next();
    while (item.isSome()) {
      yield item.unwrap();
      item = this.next();
    }
  }
}
