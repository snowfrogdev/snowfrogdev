import { Option } from '@snowfrog/option';
import { DoubleEndedIter } from './internal';

export class RevIter<I extends DoubleEndedIter<T>, T> extends DoubleEndedIter<T> {
  constructor(private iter: I) {
    super();
  }

  next(): Option<T> {
    return this.iter.nextBack();
  }

  nextBack(): Option<T> {
    return this.iter.next();
  }

  *[Symbol.iterator](): Iterator<T> {
    let item = this.next();
    while (item.isSome()) {
      yield item.unwrap();
      item = this.next();
    }
  }

  len(): number {
    return this.iter.len();
  }
}
