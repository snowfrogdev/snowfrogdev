import { Option } from '@snowfrog/option';
import { Iter } from './internal';

export class FilterIter<I extends Iter<T>, T> extends Iter<T> {
  constructor(private iter: I, private predicate: (item: T) => boolean) {
    super();
  }
  next(): Option<T> {
    return this.iter.find(this.predicate);
  }

  *[Symbol.iterator](): Iterator<T> {
    let item = this.next();
    while (item.isSome()) {
      yield item.unwrap();
      item = this.next();
    }
  }
}
