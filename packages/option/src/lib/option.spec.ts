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
    const maybeSomeLength = maybeSomeString.map(s => s.length);
    expect(maybeSomeLength).toEqual(new Some(13));
  });
});
