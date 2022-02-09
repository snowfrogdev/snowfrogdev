import { None, Some } from '@snowfrog/option';
import { from } from '../internal';

describe('Iter', () => {
  it('from() for Array', () => {
    const arr = [1, 2, 3];
    const iter = from(arr);

    expect(iter.next()).toEqual(new Some(1));
    expect(iter.next()).toEqual(new Some(2));
    expect(iter.next()).toEqual(new Some(3));
    expect(iter.next()).toEqual(new None());
  });

  it('from() for Set', () => {
    const set = new Set([1, 2, 3]);
    const iter = from(set);

    expect(iter.next()).toEqual(new Some(1));
    expect(iter.next()).toEqual(new Some(2));
    expect(iter.next()).toEqual(new Some(3));
    expect(iter.next()).toEqual(new None());
  });

  it('from() for Map', () => {
    const map = new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]);
    const iter = from(map);

    expect(iter.next()).toEqual(new Some([1, 'one']));
    expect(iter.next()).toEqual(new Some([2, 'two']));
    expect(iter.next()).toEqual(new Some([3, 'three']));
    expect(iter.next()).toEqual(new None());
  });

  it('from() for String', () => {
    const iter = from('hello');

    expect(iter.next()).toEqual(new Some('h'));
    expect(iter.next()).toEqual(new Some('e'));
    expect(iter.next()).toEqual(new Some('l'));
    expect(iter.next()).toEqual(new Some('l'));
    expect(iter.next()).toEqual(new Some('o'));
    expect(iter.next()).toEqual(new None());
  });

  it('from() for TypeArray', () => {
    const arr = new Int8Array([1, 2, 3]);
    const iter = from(arr);

    expect(iter.next()).toEqual(new Some(1));
    expect(iter.next()).toEqual(new Some(2));
    expect(iter.next()).toEqual(new Some(3));
    expect(iter.next()).toEqual(new None());
  });
});
