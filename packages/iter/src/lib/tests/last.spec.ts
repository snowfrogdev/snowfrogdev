import { Some } from '@snowfrog/option';
import { from } from '../internal';

describe('Iter', () => {
  it('last()', () => {
    const a = [1, 2, 3];
    expect(from(a).last()).toEqual(new Some(3));

    const b = [1, 2, 3, 4, 5];
    expect(from(b).last()).toEqual(new Some(5));
  });
});
