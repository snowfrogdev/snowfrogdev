import { from } from '../internal';

describe('Iter', () => {
  it('forEach()', () => {
    const data = [0, 1, 2, 3, 4];
    const result: number[] = [];
    from(data)
      .map(x => x * 2 + 1)
      .forEach(x => result.push(x));
    
    expect(result).toEqual([1, 3, 5, 7, 9]);
  });
});
