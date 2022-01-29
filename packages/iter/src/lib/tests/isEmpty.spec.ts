import { None, Some } from '@snowfrog/option';
import { Iter } from '../internal';

describe('DoubleEndedIter', () => {
  it('isEmpty()', () => {
    const oneElement = Iter.once(0);
    expect(oneElement.isEmpty()).toBe(false);

    expect(oneElement.next()).toEqual(new Some(0));
    expect(oneElement.isEmpty()).toBe(true);

    expect(oneElement.next()).toEqual(new None());
  });
});
