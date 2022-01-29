import { None, Some } from '@snowfrog/option';
import { Iter } from '../internal';

describe('Iter', () => {
  it('once(), basic usage', () => {
    const one = Iter.once(1);

    expect(one.next()).toEqual(new Some(1));
    expect(one.next()).toEqual(new None());
  });
});
