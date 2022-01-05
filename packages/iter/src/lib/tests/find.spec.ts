import { Iter } from '../internal';

describe('Iter', () => {
  it('find()', () => {
    const arr = [1, 3, 9, 27, 103, 14, 11];
    expect(
      Iter.from(arr)
        .find((x) => (x & 1) === 0)
        .unwrap()
    ).toBe(14);

    expect(
      Iter.from(arr)
        .find((x) => x % 3 === 0)
        .unwrap()
    ).toBe(3);

    expect(
      Iter.from(arr)
        .find((x) => x % 12 === 0)
        .isNone()
    ).toBe(true);
  });
});
