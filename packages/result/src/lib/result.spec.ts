import { Err, Ok } from './result';

describe('Result<T, E>', () => {
  it.each([
    [new Ok(1), true],
    [new Err(1), false],
  ])('isOK()', (sut, result) => {
    expect(sut.isOk()).toBe(result);
  });

  it.each([
    [new Ok(1), false],
    [new Err(1), true],
  ])('isErr()', (sut, result) => {
    expect(sut.isErr()).toBe(result);
  });
});
