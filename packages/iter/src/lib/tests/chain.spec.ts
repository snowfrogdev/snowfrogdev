import { None, Some } from '@snowfrog/option';
import { Iter } from '../internal';

describe('Iter', () => {
  it('chain()', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];

    const iter = Iter.from(arr1).chain(Iter.from(arr2));

    expect(iter.next()).toEqual(new Some(1));
    expect(iter.next()).toEqual(new Some(2));
    expect(iter.next()).toEqual(new Some(3));
    expect(iter.next()).toEqual(new Some(4));
    expect(iter.next()).toEqual(new Some(5));
    expect(iter.next()).toEqual(new Some(6));
    expect(iter.next()).toEqual(new None());
  });
});
