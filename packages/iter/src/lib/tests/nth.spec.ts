import { None, Some } from '@snowfrog/option';
import { Iter } from '../internal';

describe('Iter', () => {
  it('nth() multiple times does not rewind the iterator', () => {
    const arr = [1, 2, 3];

    const iter = Iter.from(arr);

    expect(iter.nth(1)).toEqual(new Some(2));
    expect(iter.nth(1)).toEqual(new None());
  });

  it('nth() returning `None` if there are less than `n + 1` elements', () => {
    const arr = [1, 2, 3];

    const iter = Iter.from(arr);

    expect(iter.nth(10)).toEqual(new None());
  });
});
