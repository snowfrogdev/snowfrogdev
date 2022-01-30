import { None, Some } from '@snowfrog/option';
import { Iter } from '../internal';

describe('DoubleEndedIter', () => {
  it('nthBack(), basic usage', () => {
    const arr = [1, 2, 3];
    expect(Iter.from(arr).nthBack(2)).toEqual(new Some(1));
  });

  it('nthBack(), calling multiple times does not rewind the iterator', () => {
    const arr = [1, 2, 3];
    const iter = Iter.from(arr);
    expect(iter.nthBack(1)).toEqual(new Some(2));
    expect(iter.nthBack(1)).toEqual(new None());
  })

  it('nthBack() returning `None` if there are less than `n + 1` elements', () => {
    const arr = [1, 2, 3];
    expect(Iter.from(arr).nthBack(10)).toEqual(new None());
  });
});
