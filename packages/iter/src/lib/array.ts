import { None, Some, Option } from '@snowfrog/option';
import { DoubleEndedIter } from './internal';

export class ArrayIter<T> extends DoubleEndedIter<T> {
  private headIndex = 0;
  private tailIndex: number;
  private constructor(private array: T[]) {
    super();
    this.tailIndex = array.length - 1;
  }
  static from<T>(array: T[]): ArrayIter<T> {
    return new ArrayIter(array);
  }

  *[Symbol.iterator](): Iterator<T> {
    while (this.headIndex <= this.tailIndex) {
      yield this.array[this.headIndex++];
    }
  }

  next(): Option<T> {
    if (this.headIndex > this.tailIndex) return new None();
    return new Some(this.array[this.headIndex++]);
  }

  nextBack(): Option<T> {
    if (this.headIndex > this.tailIndex) return new None();
    return new Some(this.array[this.tailIndex--]);
  }

  len(): number {
    return this.tailIndex - this.headIndex + 1;
  }
}
