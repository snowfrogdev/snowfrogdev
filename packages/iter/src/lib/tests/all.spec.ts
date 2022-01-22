import { Some } from '@snowfrog/option';
import { Iter } from '../internal';

describe('Iter', () => {
  it('all() basic usage', () => {
    const arr = [1, 2, 3];

    expect(Iter.from(arr).all((x) => x > 0)).toBe(true);
    expect(Iter.from(arr).all((x) => x > 2)).toBe(false);
  });

  it('all() stopping at the first `false`', () => {
    const arr = [1, 2, 3];

    const iter = Iter.from(arr);

    expect(iter.all((x) => x !== 2)).toBe(false);
    expect(iter.next()).toEqual(new Some(3));
  });
});
