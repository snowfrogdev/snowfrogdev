import { None, Option } from '@snowfrog/option';
import { Iter } from './internal';

export class FlattenIter<I extends Iter<T>, T extends Iterable<U>, U> extends Iter<U> {
  private inner: Iter<U>;
  constructor(private iter: I) {
    super();
    this.inner = Iter.from(iter.next().unwrap());
  }

  next(): Option<U> {
    let item = this.inner.next();
    while (item.isNone()) {
      const nextInner = this.iter.next();
      if (nextInner.isNone()) return new None();
      this.inner = Iter.from(nextInner.unwrap());
      item = this.inner.next();
    }
    return item;
  }

  *[Symbol.iterator](): Iterator<U> {
    let item = this.next();
    while (item.isSome()) {
      yield item.unwrap();
      item = this.next();
    }
  }
}
