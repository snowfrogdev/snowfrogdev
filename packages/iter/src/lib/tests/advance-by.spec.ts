import { Some } from '@snowfrog/option';
import { Err, Ok } from '@snowfrog/result';
import { from } from '../internal';

describe('Iter', () => {
  it('advanceBy()', () => {
    const arr = [1, 2, 3, 4];

    const iter = from(arr);

    expect(iter.advanceBy(2)).toEqual(new Ok([]));
    expect(iter.next()).toEqual(new Some(3));
    expect(iter.advanceBy(0)).toEqual(new Ok([]));
    expect(iter.advanceBy(100)).toEqual(new Err(1));
  });
});
