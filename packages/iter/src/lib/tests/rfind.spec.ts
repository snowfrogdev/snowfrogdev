import { None, Some } from '@snowfrog/option';
import { Iter } from '../internal';

describe('DoubleEndedIter', () => {
  it('rfind(), basic usage', () => {
    const arr = [1, 2, 3];

    expect(Iter.from(arr).rfind((x) => x === 2)).toEqual(new Some(2));
    expect(Iter.from(arr).rfind((x) => x === 5)).toEqual(new None());
  });

  it('rfind(), stopping at first true', () => {
    const arr = [1, 2, 3];

    const iter = Iter.from(arr);

    expect(iter.rfind((x) => x === 2)).toEqual(new Some(2));
    expect(iter.nextBack()).toEqual(new Some(1));
  });
});
