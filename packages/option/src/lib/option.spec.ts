import { Some, None } from './option';

describe('Option', () => {
  it.each([
    [new Some(2), true],
    [new None(), false]
  ])('isSome', (sut, result) => {
    expect(sut.isSome()).toBe(result);
  });
});
