import { Iter } from '../internal';

describe('Iter', () => {
  it('filter()', () => {
    const iter = Iter.from([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(iter.filter((x) => x % 2 === 0).count()).toBe(5);
  });
});
