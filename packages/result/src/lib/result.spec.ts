import { Err, Ok } from './result';

describe('Result<T, E>', () => {
  it.each([
    [new Ok(-3), true],
    [new Err('Some error message'), false],
  ])('isOK()', (sut, result) => {
    expect(sut.isOk()).toBe(result);
  });

  it.each([
    [new Ok(-3), false],
    [new Err('Some error message'), true],
  ])('isErr()', (sut, result) => {
    expect(sut.isErr()).toBe(result);
  });

  it.each([
    [new Ok(2), true],
    [new Ok(3), false],
    [new Err('Some error message'), false],
  ])('contains()', (sut, result) => {
    expect(sut.contains(2)).toBe(result);
  });

  it.each([
    [new Ok(2), false],
    [new Err('Some error message'), true],
    [new Err('Some other error message'), false],
  ])('containsErr()', (sut, result) => {
    expect(sut.containsErr('Some error message')).toBe(result);
  });

  /* TODO: Implement Result.ok() and Result.err() once the Option<T> lib is done */

  it.each([
    [new Ok('foo'), 3],
    [new Err('bar'), 42],
  ])('mapOr()', (sut, result) => {
    expect(sut.mapOr(42, (str: string) => str.length)).toBe(result);
  });

  it.each([
    [new Ok('foo'), 3],
    [new Err('bar'), 42],
  ])('mapOrElse()', (sut, result) => {
    expect(
      sut.mapOrElse(
        (e) => 21 * 2,
        (str: string) => str.length
      )
    ).toBe(result);
  });

  /* TODO: Implement Result.iter() once the Iterator lib is done */

  it.each([
    [new Ok(2), new Err('late error'), new Err('late error')],
    [new Err('early error'), new Ok('foo'), new Err('early error')],
    [new Err('not a 2'), new Err('late error'), new Err('not a 2')],
    [new Ok(2), new Ok('different result type'), new Ok('different result type')],
  ])('and()', (sut, other, result) => {
    expect(sut.and(other)).toEqual(result);
  });

  const sq = (x: number) => new Ok(x * x);
  const err = (x: number) => new Err(x);
  it.each([
    [new Ok(2), sq, sq, new Ok(16)],
    [new Ok(2), sq, err, new Err(4)],
    [new Ok(2), err, sq, new Err(2)],
    [new Err(3), sq, sq, new Err(3)],
  ])('andThen()', (sut, f1, f2, result) => {
    expect(sut.andThen(f1).andThen(f2)).toEqual(result);
  });

  it.each([
    [new Ok(2), new Err('late error'), new Ok(2)],
    [new Err('early error'), new Ok(2), new Ok(2)],
    [new Err('not a 2'), new Err('late error'), new Err('late error')],
    [new Ok(2), new Ok(100), new Ok(2)],
  ])('or()', (sut, other, result) => {
    expect(sut.or(other)).toEqual(result);
  });

  it.each([
    [new Ok(2), sq, sq, new Ok(2)],
    [new Ok(2), err, sq, new Ok(2)],
    [new Err(3), sq, err, new Ok(9)],
    [new Err(3), err, err, new Err(3)],
  ])('orElse()', (sut, f1, f2, result) => {
    expect(sut.orElse(f1).orElse(f2)).toEqual(result);
  });
});
