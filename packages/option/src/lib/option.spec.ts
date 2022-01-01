import { Err, Ok } from '@snowfrog/result';
import { None, Some } from './option';

describe('Option<T>', () => {
  it.each([
    [new Some(2), true],
    [new None(), false],
  ])('isSome()', (sut, result) => {
    expect(sut.isSome()).toBe(result);
  });

  it.each([
    [new Some(2), false],
    [new None(), true],
  ])('isNone()', (sut, result) => {
    expect(sut.isNone()).toBe(result);
  });

  it('expect() when Some', () => {
    const sut = new Some('value');
    expect(sut.expect('fruits are healthy')).toBe('value');
  });

  it('expect() when None', () => {
    const sut = new None();
    expect(() => sut.expect('fruits are healthy')).toThrowError('fruits are healthy');
  });

  it('unwrap() when Some', () => {
    const sut = new Some('air');
    expect(sut.unwrap()).toBe('air');
  });

  it('unwrap() when None', () => {
    const sut = new None();
    expect(() => sut.unwrap()).toThrowError('called `Option.unwrap()` on a `None` value');
  });

  it.each([
    [new Some('car'), 'car'],
    [new None(), 'bike'],
  ])('unwrapOr()', (sut, result) => {
    expect(sut.unwrapOr('bike')).toBe(result);
  });

  it.each([
    [new Some(4), 4],
    [new None(), 20],
  ])('unwrapOrElse()', (sut, result) => {
    expect(sut.unwrapOrElse(() => 2 * 10)).toBe(result);
  });

  it('map()', () => {
    const maybeSomeString = new Some('Hello, World!');
    const maybeSomeLength = maybeSomeString.map((s) => s.length);
    expect(maybeSomeLength).toEqual(new Some(13));
  });

  it.each([
    [new Some('foo'), 3],
    [new None(), 42],
  ])('mapOr()', (sut, result) => {
    expect(sut.mapOr(42, (str) => str.length)).toBe(result);
  });

  it.each([
    [new Some('foo'), 3],
    [new None(), 42],
  ])('mapOrElse()', (sut, result) => {
    expect(
      sut.mapOrElse(
        () => 2 * 21,
        (str) => str.length
      )
    ).toBe(result);
  });

  it.each([
    [new Some('foo'), new Ok('foo')],
    [new None(), new Err(0)],
  ])('okOr()', (sut, result) => {
    expect(sut.okOr(0)).toEqual(result);
  });

   it.each([
     [new Some('foo'), new Ok('foo')],
     [new None(), new Err(0)],
   ])('okOrElse()', (sut, result) => {
     expect(sut.okOrElse(() => 0)).toEqual(result);
   });
  
  // TODO: Implement Option.iter() once the Iterator library is available

  it.each([
    [new Some(2), new None, new None()],
    [new None(), new Some('foo'), new None()],
    [new Some(2), new Some('foo'), new Some('foo')],
    [new None(), new None(), new None()],
  ])('and()', (sut, other, result) => {
    expect(sut.and(other)).toEqual(result);
  });
});
