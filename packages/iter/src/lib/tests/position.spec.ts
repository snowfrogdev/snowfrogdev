import { None, Some } from '@snowfrog/option';
import { from } from '../internal';

describe('Iter', () => {
  it('position(), basic usage', () => {
    const arr = [1, 2, 3];

    expect(from(arr).position((x) => x === 2)).toEqual(new Some(1));
    expect(from(arr).position((x) => x === 5)).toEqual(new None());
  });

  it('position(), stopping at the first `true`', () => {
    const arr = [1, 2, 3, 4];

    const iter = from(arr);

    expect(iter.position((x) => x >= 2)).toEqual(new Some(1));
    expect(iter.next()).toEqual(new Some(3));
    expect(iter.position((x) => x === 4)).toEqual(new Some(0));
  });
});
