import { None, Some } from '@snowfrog/option';
import { Iter } from '../internal';

describe('Iter', () => {
  it('skip()', () => {
    const arr = [1, 2, 3];

    const iter = Iter.from(arr).skip(2);

    expect(iter.next()).toEqual(new Some(3));
    expect(iter.next()).toEqual(new None());
  });
});
