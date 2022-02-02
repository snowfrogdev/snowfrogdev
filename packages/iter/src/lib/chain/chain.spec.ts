import { None, Some } from "@snowfrog/option";
import { Err, Ok } from "@snowfrog/result";
import { Iter } from "../internal";

describe('Chain', () => {
  it('count()', () => {
    const iter = Iter.from([1, 2, 3]);
    expect(iter.chain(Iter.from([4, 5, 6])).count()).toBe(6);
  });

  it('fold(), basic usage', () => {
    const iter = Iter.from([1, 2, 3]);
    expect(iter.chain(Iter.from([4, 5, 6])).fold(0, (acc, x) => acc + x)).toBe(21);
  });

  it('advanceBy()', () => {
    const iter = Iter.from([1, 2, 3]).chain(Iter.from([4, 5, 6]));
    expect(iter.advanceBy(3)).toEqual(new Ok([]));
    expect(iter.next()).toEqual(new Some(4));
    expect(iter.advanceBy(0)).toEqual(new Ok([]));
    expect(iter.advanceBy(100)).toEqual(new Err(2));
  })

  it('nth() multiple times does not rewind the iterator', () => {
    const iter = Iter.from([1, 2, 3]).chain(Iter.from([4, 5, 6]));

    expect(iter.nth(1)).toEqual(new Some(2));
    expect(iter.nth(1)).toEqual(new Some(4));
    expect(iter.nth(1)).toEqual(new Some(6));
    expect(iter.nth(1)).toEqual(new None());
  });

  it('nth() returning `None` if there are less than `n + 1` elements', () => {
    const iter = Iter.from([1, 2, 3]).chain(Iter.from([4, 5, 6]));

    expect(iter.nth(10)).toEqual(new None());
  });

  it('find()', () => {
    const a = [1, 3, 9, 27, 103, 14, 11];
    const b = [103, 14, 11];
    expect(
      Iter.from(a).chain(Iter.from(b))
        .find((x) => (x & 1) === 0)
        .unwrap()
    ).toBe(14);

    expect(
      Iter.from(a).chain(Iter.from(b))
        .find((x) => x % 3 === 0)
        .unwrap()
    ).toBe(3);

    expect(
      Iter.from(a).chain(Iter.from(b))
        .find((x) => x % 12 === 0)
        .isNone()
    ).toBe(true);
  });

  it('last()', () => {
    const a = [1, 2, 3];
    expect(Iter.from(a).chain(Iter.from([4, 5, 6])).last().unwrap()).toBe(6);

    const b = [1, 2, 3, 4, 5];
    expect(Iter.from(b).chain(Iter.from([6, 7, 8])).last().unwrap()).toBe(8);
  })
});
