import { None, Some } from '@snowfrog/option';
import { ToIter } from '../internal';

describe('Iter', () => {
  it('map()', () => {
    const arr = [1, 2, 3];

    const iter = ToIter.from(arr).map((x) => x * 2);

    expect(iter.next()).toEqual(new Some(2));
    expect(iter.next()).toEqual(new Some(4));
    expect(iter.next()).toEqual(new Some(6));
    expect(iter.next()).toEqual(new None());
  });
});
