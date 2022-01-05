import { None, Some } from '@snowfrog/option';
import { Iter } from '../internal';

describe('Iter', () => {
  it('map()', () => {
    const arr = [1, 2, 3];

    const iter = Iter.from(arr).map((x) => x * 2);

    expect(iter.next()).toEqual(new Some(2));
    expect(iter.next()).toEqual(new Some(4));
    expect(iter.next()).toEqual(new Some(6));
    expect(iter.next()).toEqual(new None());
  });
});
