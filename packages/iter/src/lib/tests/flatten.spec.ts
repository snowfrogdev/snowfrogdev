import { Iter } from '../internal';

describe('Iter', () => {
  it('flatten(), basic usage', () => {
    const data = [[1, 2, 3], [5, 6]];
    const flattened = Iter.from(data).flatten().toArray();
    
    expect(flattened).toEqual([1, 2, 3, 5, 6]);
  });

  it('flatten(), Mapping and then flattening', () => {
    const words = ["alpha", "beta", "gamma"];
    const merged = Iter.from(words)
      .map(word => word.split(""))
      .flatten()
      .toArray()
      .join("");

    expect(merged).toEqual("alphabetagamma");
  });

  it('flatten(), Only removes one level of nesting at a time', () => {
    const d3 = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]];
    
    const d2 = Iter.from(d3).flatten().toArray();
    expect(d2).toEqual([[1, 2], [3, 4], [5, 6], [7, 8]]);

    const d1 = Iter.from(d3).flatten().flatten().toArray();
    expect(d1).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
