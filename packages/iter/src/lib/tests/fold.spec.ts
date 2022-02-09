import { from } from '../internal';

describe('Iter', () => {
  it('fold(), basic usage', () => {
    const arr = [1, 2, 3];

    const sum = from(arr).fold(0, (acc, x) => acc + x);

    expect(sum).toBe(6);
  });

  it('fold(), left-associative', () => {
    const numbers = [1, 2, 3, 4, 5];

    const zero = "0";

    const result = from(numbers).fold(zero, (acc, x) => `(${acc} + ${x})`);

    expect(result).toBe('(((((0 + 1) + 2) + 3) + 4) + 5)');
  });
});
