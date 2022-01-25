import { Option } from '@snowfrog/option';
import { Iter } from './internal';

export class FlatMapIter<
  I extends Iter<T>,
  T,
  U extends Iterable<V>,
  V = U extends Iterable<infer V> ? V : never
> extends Iter<V> {
  private inner: Iter<V>;  
  constructor(private iter: I, private f: (item: T) => U) {
    super();
    this.inner = iter.map(f).flatten();
  }

  next(): Option<V> {
    return this.inner.next();
  }

  *[Symbol.iterator](): Iterator<V> {
    let item = this.next();
    while (item.isSome()) {
      yield item.unwrap();
      item = this.next();
    }
  }
}
