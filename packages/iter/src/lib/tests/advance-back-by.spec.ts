import { Some } from '@snowfrog/option';
import { Err, Ok } from '@snowfrog/result';
import { Iter } from '../internal';

describe('DoubleEndedIter', () => {
  it('advanceBackBy()', () => {
    const iter = Iter.from([3, 4, 5, 6]);
    expect(iter.advanceBackBy(2)).toEqual(new Ok([]));
    expect(iter.nextBack()).toEqual(new Some(4));
    expect(iter.advanceBackBy(0)).toEqual(new Ok([]));
    expect(iter.advanceBackBy(100)).toEqual(new Err(1));
  });
});
