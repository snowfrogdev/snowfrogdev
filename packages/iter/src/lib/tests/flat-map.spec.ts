import { Iter } from '../internal';

describe('Iter', () => {
  it('flatMap()', () => {
    const words = ['alpha', 'beta', 'gamma'];

    const merged = Iter.from(words)
      .flatMap(word => word.split(''))
      .toArray()
      .join('');    

    expect(merged).toEqual("alphabetagamma");
  });
});
