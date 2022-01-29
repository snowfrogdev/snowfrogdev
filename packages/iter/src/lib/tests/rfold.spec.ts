import { None, Some } from '@snowfrog/option';
import { Iter } from '../internal';

describe('DoubleEndedIter', () => {
  it('rfold(), basic usage', () => {
    const arr = [1, 2, 3];

    const sum = Iter.from(arr).rfold(0, (acc, x) => acc + x);

    expect(sum).toBe(6);
  });

  it('rfold(), right-associative', () => {
    const numbers = [1, 2, 3, 4, 5];

    const zero = '0';

    const result = Iter.from(numbers).rfold(zero, (acc, x) => `(${x} + ${acc})`);

    expect(result).toBe('(1 + (2 + (3 + (4 + (5 + 0)))))');
  });
});
