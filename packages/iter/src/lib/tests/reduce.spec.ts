import { None, Some, Option } from '@snowfrog/option';
import { Iter } from '../internal';

describe('Iter', () => {
  it('reduce(),', () => {
    const findMax = (iter: Iter<number>): Option<number> => {
      return iter.reduce((acc, item) => acc >= item ? acc : item);
    }
    const a: number[] = [10, 20, 5, -23, 0];
    const b: number[] = [];
  
    expect(findMax(Iter.from(a))).toEqual(new Some(20));
    expect(findMax(Iter.from(b))).toEqual(new None());
  });
});
