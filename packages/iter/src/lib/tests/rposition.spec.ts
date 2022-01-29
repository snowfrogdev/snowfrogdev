import { None, Some } from '@snowfrog/option';
import { Iter } from '../internal';

describe('DoubleEndedIter', () => {
  it('rposition(), basic usage', () => {
    const arr = [1, 2, 3];

    expect(Iter.from(arr).rposition((x) => x === 3)).toEqual(new Some(2));
    expect(Iter.from(arr).rposition((x) => x === 5)).toEqual(new None());
  });

  it('rposition(), stopping at the first `true`', () => {
    const arr = [1, 2, 3];

    const iter = Iter.from(arr);

    expect(iter.rposition((x) => x === 2)).toEqual(new Some(1));
    expect(iter.next()).toEqual(new Some(1));
  });
});
