import { None, Some } from '@snowfrog/option';
import { Iter } from '../internal';

describe('DoubleEndedIter', () => {
  it('rev()', () => {
    const arr = [1, 2, 3];

    const iter = Iter.from(arr).rev();

    expect(iter.next()).toEqual(new Some(3));
    expect(iter.next()).toEqual(new Some(2));
    expect(iter.next()).toEqual(new Some(1));
    expect(iter.next()).toEqual(new None());
  });
});
