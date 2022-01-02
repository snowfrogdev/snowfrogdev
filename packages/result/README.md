# @snowfrog/result

Type-safe error handling without exceptions.

## Install

```bash
npm install @snowfrog/result
```

## Usage

Errors are a fact of life in software development. In JavaScript, errors are usually thrown using the `throw` keyword
and this approach makes sense when something bad happens in your code and there's nothing you can do about it.
This most commonly occurs when a bug of some kind has been detected and it's not clear to the programmer how to handle
the error.

Most errors, though, aren't serious enough to require the program to stop entirely. Sometimes, when a function fails,
it's for a reason that you can easily interpret and respond to. That's where `Result` comes in. It makes handling these
common errors type-safe and explicit.

`Result<T, E>` is a type that represents a value that may or may not have succeeded. It's an abstract class with the
implementations,`Ok<T>`, representing success and containing a value, and `Err<E>`, representing an error and
containing an error value.

Functions should return `Result` whenever errors are expected and recoverable.

## Method overview

`Result` comes with some convenience methods.

```ts
import { Ok, Err, Result} from '@snowfrog/result';

let goodResult: Result<number, number> = new Ok(10);
let badResult: Result<number, number> = new Err(10);

// The `isOk` and `isErr` methods do what they say.
expect(goodResult.isOk() && !goodResult.isErr()).toBe(true);
expect(badResult.isErr() && !badResult.isOk()).toBe(true);

// `map` consumes the `Result` and produces another.
goodResult = goodResult.map((x) => x + 1);
badResult = badResult.map((x) => x - 1);

// Use `andThen` to continue the computation.
const evenBetterResult: Result<boolean, number> = goodResult.andThen((x) => new Ok(x === 11));

// Use `orElse` to handle the error.
badResult = badResult.orElse((x) => new Ok(x + 20));

// Return the contents with `unwrap`.
const finalAwesomeResult = evenBetterResult.unwrap();
```

### Querying the variant

The `isOk` and `isErr` methods return `true` if the `Result` is `Ok` or `Err`, respectively.

### Extracting contained values

These methods extract the contained value in a `Result<T, E>` when it is the `Ok` variant.
If the `Result` is `Err`:

- `expect` throws with a provided custom message
- `unwrap` throws with a generic message
- `unwrapOr` returns the provided default value
- `unwrapOrElse` returns the result of evaluating the provided function

The throwing methods `expect` and `unwrap` rely on `E`'s `toString()` implementation.

These methods extract the contained value in a `Result<T, E>` when it is the `Err` variant.
They use `T`'s `toString()` implementation. If the `Result` is `Ok`:

- `expectErr` throws with a provided custom message
- `unwrapErr` throws with a generic message

### Transforming contained values

This method transforms the contained value of the `Ok` variant:

- `map` transforms `Result<T, E>` into `Result<U, E>` by applying the provided function to the contained value of `Ok`
and leaving `Err` values unchanged
  
This method transforms the contained value of the `Err` variant:

- `mapErr` transforms `Result<T, E>` into `Result<T, F>` by applying the provided function to the contained value of `Err`
and leaving `Ok` values unchanged

These methods transform a `Result<T, E>` into a value of a possibly different type `U`:

- `mapOr` applies the provided function to the contained value of `Ok`, or returns the provided default value if the
`Result` is `Err`
- `mapOrElse` applies the provided function to the contained value of `Ok`, or applies the provided default fallback
function to the contained value of `Err`

### Boolean operators

These methods treat the `Result` as a boolean value, where `Ok` acts like true and `Err` acts like false. There are two categories of these methods: ones that take a `Result` as input, and ones that take a function as input (to be lazily evaluated).

The `and` and `or` methods take another `Result` as input, and produce a `Result` as output. The `and` method can produce a `Result<U, E>` value having a different inner type `U` than `Result<T, E>`. The `or` method can produce a `Result<T, F>` value having a different error type `F` than `Result<T, E>`.

| method  | this   | input     | output   |
|---------|--------|-----------|----------|
| `and` | `Err(e)` | (ignored) | `Err(e)` |
| `and` | `Ok(x)`  | `Err(d)`  | `Err(d)` |
| `and` | `Ok(x)`  | `Ok(y)`   | `Ok(y)`  |
| `or`  | `Err(e)` | `Err(d)`  | `Err(d)` |
| `or`  | `Err(e)` | `Ok(y)`   | `Ok(y)`  |
| `or`  | `Ok(x)`  | (ignored) | `Ok(x)`  |

The `andThen` and `orElse` methods take a function as input, and only evaluate the function when they need to
produce a new value. The `andThen` method can produce a `Result<U, E>` value having a different inner type `U` than `Result<T, E>`. The `orElse` method can produce a `Result<T, F>` value having a different error type `F` than `Result<T, E>`.

| method    | this     | function input | function result | output   |
|-----------|----------|----------------|-----------------|----------|
| `andThen` | `Err(e)` | (not provided) | (not evaluated) | `Err(e)` |
| `andThen` | `Ok(x)`  | `x`            | `Err(d)`        | `Err(d)` |
| `andThen` | `Ok(x)`  | `x`            | `Ok(y)`         | `Ok(y)`  |
| `orElse`  | `Err(e)` | `e`            | `Err(d)`        | `Err(d)` |
| `orElse`  | `Err(e)` | `e`            | `Ok(y)`         | `Ok(y)`  |
| `orElse`  | `Ok(x)`  | (not provided) | (not evaluated) | `Ok(x)`  |

## API Documentation

https://snowfrogdev.github.io/snowfrogdev/result/

## License

MIT License

Copyright (c) 2022 Philippe Vaillancourt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
