import { None, Option, Some } from './option';

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
  ])('mapOr()', (sut: Option<string>, result) => {
    expect(sut.mapOr(42, (str) => str.length)).toBe(result);
  });

  it.each([
    [new Some('foo'), 3],
    [new None(), 42],
  ])('mapOrElse()', (sut: Option<string>, result) => {
    expect(
      sut.mapOrElse(
        () => 2 * 21,
        (str) => str.length
      )
    ).toBe(result);
  });

  it.each([
    [new Some(2), new None(), new None()],
    [new None(), new Some('foo'), new None()],
    [new Some(2), new Some('foo'), new Some('foo')],
    [new None(), new None(), new None()],
  ])('and()', (sut, other, result) => {
    expect(sut.and(other)).toEqual(result);
  });

  const sq = (x: number): Option<number> => new Some(x * x);
  const nope = (): Option<number> => new None();
  it.each([
    [new Some(2), sq, sq, new Some(16)],
    [new Some(2), sq, nope, new None()],
    [new Some(2), nope, sq, new None()],
    [new None(), sq, sq, new None()],
  ])('andThen()', (sut: Option<number>, f1, f2, result) => {
    expect(sut.andThen(f1).andThen(f2)).toEqual(result);
  });

  it.each([
    [new None(), new None()],
    [new Some(3), new None()],
    [new Some(4), new Some(4)],
  ])('filter()', (sut, result) => {
    const isEven = (x: number): boolean => x % 2 === 0;
    expect(sut.filter(isEven)).toEqual(result);
  });

  it.each([
    [new Some(2), new None(), new Some(2)],
    [new None(), new Some(100), new Some(100)],
    [new Some(2), new Some(100), new Some(2)],
    [new None(), new None(), new None()],
  ])('or()', (sut, optb, result) => {
    expect(sut.or(optb)).toEqual(result);
  });

  const nobody = (): Option<string> => new None();
  const vikings = (): Option<string> => new Some('vikings');
  it.each([
    [new Some('barbarians'), vikings, new Some('barbarians')],
    [new None(), vikings, new Some('vikings')],
    [new None(), nobody, new None()],
  ])('orElse()', (sut, func, result) => {
    expect(sut.orElse(func)).toEqual(result);
  });

  it.each([
    [new Some(2), new None(), new Some(2)],
    [new None(), new Some(2), new Some(2)],
    [new Some(2), new Some(2), new None()],
    [new None(), new None(), new None()],
  ])('xor()', (sut, optb, result) => {
    expect(sut.xor(optb)).toEqual(result);
  });

  it('zip()', () => {
    const x = new Some(1);
    const y = new Some('hi');
    const z = new None();

    expect(x.zip(y)).toEqual(new Some([1, 'hi']));
    expect(x.zip(z)).toEqual(new None());
  });

  it('zipWith()', () => {
    const x = new Some(17.5);
    const y = new Some(42.7);
    const point = (x: number, y: number) => ({ x, y });

    expect(x.zipWith(y, point)).toEqual(new Some({ x: 17.5, y: 42.7 }));
    expect(x.zipWith(new None(), point)).toEqual(new None());
  });
});
