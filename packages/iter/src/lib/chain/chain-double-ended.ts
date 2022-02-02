import { Err, Ok, Result } from '@snowfrog/result';
import { None, Option, Some } from '@snowfrog/option';
import { ChainIter, DoubleEndedIter, RevIter } from '../internal';

export class ChainDoubleEndedIter<A extends DoubleEndedIter<T>, B extends DoubleEndedIter<T>, T>
  extends ChainIter<A, B, T>
  implements DoubleEndedIter<T>
{
  constructor(a: A, b: B) {
    super(a, b);
  }

  nextBack(): Option<T> {
    const result = this.fuse('b', () => this.b.unwrap().nextBack());
    if (result.isNone()) return this.maybe('a', () => this.a.unwrap().nextBack());
    return result;
  }

  len(): number {
    const a: number = this.a.mapOr(0, (iter) => iter.len());
    const b: number = this.b.mapOr(0, (iter) => iter.len());
    return a + b;
  }

  advanceBackBy(n: number): Result<never[], number> {
    for (let i = 0; i < n; i++) {
      if (this.nextBack().isNone()) return new Err(i);
    }

    return new Ok([]);
  }

  isEmpty(): boolean {
    return this.len() === 0;
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

  rposition(predicate: (item: T) => boolean): Option<number> {
    let i = this.len();
    let item = this.nextBack();
    while (item.isSome()) {
      i = i - 1;
      if (predicate(item.unwrap())) {
        return new Some(i);
      }
      item = this.nextBack();
    }

    return new None();
  }

  nthBack(n: number): Option<T> {
    if (this.advanceBackBy(n).isErr()) return new None();
    return this.nextBack();
  }
}
