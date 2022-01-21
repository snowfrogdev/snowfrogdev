import { None, Some } from '@snowfrog/option';
import { Iter } from '../internal';

describe('Iter', () => {
  it('enumerate()', () => {
    const arr = ['a', 'b', "c"];

    const iter = Iter.from(arr).enumerate();

    expect(iter.next()).toEqual(new Some([0, 'a']));
    expect(iter.next()).toEqual(new Some([1, 'b']));
    expect(iter.next()).toEqual(new Some([2, 'c']));
    expect(iter.next()).toEqual(new None());
  });
});
