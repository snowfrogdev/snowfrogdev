import { None, Option, Some } from '@snowfrog/option';
import { Iter } from './internal';

export class ChainIter<A extends Iter<T>, B extends Iter<T>, T> extends Iter<T> {
  private a: Option<A>;
  private b: Option<B>;
  constructor(a: A, b: B) {
    super();
    this.a = new Some(a);
    this.b = new Some(b);
  }

  next(): Option<T> {
    const result = this.fuse('a', () => this.a.unwrap().next());
    if (result.isNone()) return this.maybe('b', () => this.b.unwrap().next());
    return result;
  }

  *[Symbol.iterator](): Iterator<T> {
    let item = this.next();
    while (item.isSome()) {
      yield item.unwrap();
      item = this.next();
    }
  }

  private fuse(iter: 'a' | 'b', callback: () => Option<T>): Option<T> {
    if (this[iter].isSome()) {
      const result = callback();
      if (result.isNone()) {
        this[iter] = new None();
        return new None();
      }
      return result;
    }

    return new None();
  }

  private maybe(iter: 'a' | 'b', callback: () => Option<T>): Option<T> {
    if (this[iter].isSome()) return callback();
    return new None();
  }
}
