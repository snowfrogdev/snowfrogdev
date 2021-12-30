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
});
