import { None, Some } from '@snowfrog/option';
import { Err, Ok } from '@snowfrog/result';
import { Iter } from '../internal';

describe('ChainDoubleEndedIter', () => {
  it('advanceBackBy()', () => {
    const iter = Iter.from([1, 2, 3]).chain(Iter.from([4, 5, 6]));
    expect(iter.advanceBackBy(3)).toEqual(new Ok([]));
    expect(iter.nextBack()).toEqual(new Some(3));
    expect(iter.advanceBackBy(0)).toEqual(new Ok([]));
    expect(iter.advanceBackBy(100)).toEqual(new Err(2));
  });

  it('nthBack()', () => {
    const iter = Iter.from([1, 2, 3]).chain(Iter.from([4, 5, 6]));
    expect(iter.advanceBackBy(3)).toEqual(new Ok([]));
    expect(iter.nextBack()).toEqual(new Some(3));
    expect(iter.advanceBackBy(0)).toEqual(new Ok([]));
    expect(iter.advanceBackBy(100)).toEqual(new Err(2));
  });

  it('rfold(), basic usage', () => {
    const iter = Iter.from([1, 2, 3]).chain(Iter.from([4, 5, 6]));

    const sum = iter.rfold(0, (acc, x) => acc + x);

    expect(sum).toBe(21);
  });

  it('rfold(), right-associative', () => {
    const iter = Iter.from([1, 2, 3]).chain(Iter.from([4, 5]));

    const zero = '0';

    const result = iter.rfold(zero, (acc, x) => `(${x} + ${acc})`);

    expect(result).toBe('(1 + (2 + (3 + (4 + (5 + 0)))))');
  });

  it('rfind(), basic usage', () => {
    const iter = Iter.from([1, 2, 3]).chain(Iter.from([4, 5, 6]));

    expect(iter.rfind((x) => x === 2)).toEqual(new Some(2));
    expect(iter.rfind((x) => x === 7)).toEqual(new None());
  });

  it('rfind(), stopping at first true', () => {
    const iter = Iter.from([1, 2, 3]).chain(Iter.from([4, 5, 6]));

    expect(iter.rfind((x) => x === 4)).toEqual(new Some(4));
    expect(iter.nextBack()).toEqual(new Some(3));
  });
});
