import { Ok, Err } from "./result";

describe('Result<T, E>', () => {
  it.each([
    [new Ok(1), true],
    [new Err(1), false],
  ])('isOK()', (sut, result) => {
    expect(sut.isOk()).toBe(result);
  });
});
