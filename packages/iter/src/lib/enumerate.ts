import { None, Option, Some } from '@snowfrog/option';
import { Iter } from './internal';

export class EnumerateIter<I extends Iter<T>, T> extends Iter<[number, T]> {
  private _count = 0;
  constructor(private iter: I) {
    super();
  }
  next(): Option<[number, T]> {
    const a = this.iter.next();
    if (a.isNone()) return new None();
    const i = this._count;
    this._count += 1;
    return new Some([i, a.unwrap()]);
  }

  *[Symbol.iterator](): Iterator<[number, T]> {
    let item = this.next();
    while (item.isSome()) {
      yield item.unwrap();
      item = this.next();
    }
  }
}
