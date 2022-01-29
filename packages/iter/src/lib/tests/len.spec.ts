import { Iter } from '../internal';

describe('DoubleEndedIter', () => {
  it('len()', () => {
    const arr = [1, 2, 3];

    const iter = Iter.from(arr);

    expect(iter.len()).toEqual(3);
    iter.next();
    expect(iter.len()).toEqual(2);
    iter.nextBack();
    expect(iter.len()).toEqual(1);
    iter.next();
    expect(iter.len()).toEqual(0);
  });
});
