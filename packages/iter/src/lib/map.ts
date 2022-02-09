import { Option } from '@snowfrog/option';
import { Iter, IterCtor, mixinIter } from './internal';

const MapIterBase: IterCtor<any> = mixinIter(class {});

export class MapIter<I extends Iter<T>, T, B> extends MapIterBase {
  constructor(private iter: I, private f: (item: T) => B) {
    super();
  }

  next(): Option<B> {
    return this.iter.next().map(this.f);
  }

  *[Symbol.iterator](): Iterator<B> {
    let item = this.next();
    while (item.isSome()) {
      yield item.unwrap();
      item = this.next();
    }
  }
}
