import { from } from '../internal';

describe('Iter', () => {
  it('to Array using spread operator', () => {
    const iter = from([1, 2, 3]);
    const arr = [...iter];

    expect(arr).toBeInstanceOf(Array);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('to Array using Iter.toArray()', () => {
    const iter = from([1, 2, 3]);
    const arr = iter.toArray();

    expect(arr).toBeInstanceOf(Array);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('to Set using Set constructor', () => {
    const iter = from([1, 2, 3]);

    const expected = new Set();
    expected.add(1);
    expected.add(2);
    expected.add(3);

    const set = new Set(iter);

    expect(set).toBeInstanceOf(Set);
    expect(set).toEqual(expected);
  });

  it('to Set using Iter.toSet()', () => {
    const iter = from([1, 2, 3]);

    const expected = new Set();
    expected.add(1);
    expected.add(2);
    expected.add(3);

    const set = iter.toSet();

    expect(set).toBeInstanceOf(Set);
    expect(set).toEqual(expected);
  });

  it('to Map using Map constructor', () => {
    const iter = from<[number, string]>([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]);

    const expected = new Map();
    expected.set(1, 'one');
    expected.set(2, 'two');
    expected.set(3, 'three');

    const map = new Map(iter);

    expect(map).toBeInstanceOf(Map);
    expect(map).toEqual(expected);
  });

  it('to Map using Iter.toMap()', () => {
    const iter = from<[number, string]>([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]);

    const expected = new Map();
    expected.set(1, 'one');
    expected.set(2, 'two');
    expected.set(3, 'three');

    const map = iter.toMap();

    expect(map).toBeInstanceOf(Map);
    expect(map).toEqual(expected);
  });
});
