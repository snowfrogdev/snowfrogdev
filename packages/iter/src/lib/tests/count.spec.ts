import { Iter } from '../internal';

describe('Iter', () => {
  it.each([
    [[1, 2, 3], 3],
    [[...Array(10).keys()], 10],
    [[...Array(100).keys()], 100],
    [[...Array(1000).keys()], 1000],
  ])('count()', (arr, expected) => {
    const iter = Iter.from(arr);
    expect(iter.count()).toBe(expected);
  });
});
