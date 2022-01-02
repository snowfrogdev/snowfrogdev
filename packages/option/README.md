# @snowfrog/option

Type-safe optional value representation.

## Install

```bash
npm install @snowfrog/option
```

## Usage

`Option<T>` is an abstract class that represents an optional value:
every `Option` is either `Some` and contains a value, or `None`
and does not. `Option` types can have a number of uses:

- Initial values
- Return values for function that are not defined over their entire input range (partial functions)
- Return value for otherwise reporting simple errors, where `None` is returned on error
- Optional properties of an object
- Optional function arguments

## Method overview

`Option` provides a wide variety of different methods.

```ts
import { Some, None, Option } from '@snowfrog/option';

let something: Option<number> = new Some(10);
let nothing: Option<number> = new None();

// The `isSome` and `isNone` methods do what they say.
expect(something.isSome() && !something.isNone()).toBe(true);
expect(nothing.isNone() && !nothing.isSome()).toBe(true);

// `map` consumes the `Option` and produces another.
something = something.map((x) => x + 1);
nothing = nothing.map((x) => x - 1);

// Use `andThen` to continue the computation.
const somethingDifferent: Option<boolean> = something.andThen((x) => new Some(x === 11));

// Use `orElse` to handle the None.
const somethingFromNothing = nothing.orElse((x) => new Some(x + 20));

// Return the contents with `unwrap`.
const finalSomething = somethingDifferent.unwrap();
```

### Querying the variant

The `isSome` and `isNone` methods return `true` if the `Option` is `Some` or `None`, respectively.

### Extracting the contained value

These methods extract the contained value in an `Option<T>` when it is the `Some` variant.
If the `Option` is `None`:

- `expect` throws with a provided custom message
- `unwrap` throws with a generic message
- `unwrapOr` returns the provided default value
- `unwrapOrElse` returns the result of evaluating the provided function  

### Transforming contained values

These methods transform the `Somme` variant:

- `filter` calls the provided predicate function on the contained value `t` if the `Option` is
`Some(t)`, and returns `Some(t)` if the function returns `true`; otherwise, returns `None`
- `map` transforms `Option<T>>` to `Option<U>` by applying the provided function to the contained value of `Some` and leaving `None` values unchanged

These methods transform `Option<T>` to a value of a possibly different type `U`:

- `mapOr` applies the provided function to the contained value of `Some` and returns the provided
default value if the `Option` is `None`
- `mapOrElse` applies the provided function to the contained value of `Some`, or returns the
result of evaluating the provided fallback function if the `Option` is `None`

These methods combine the `Some` variants of two `Option` values;

- `zip` returns `Some([s, o])` if `this` is `Some(s)` and the provided `Option` is `Some(o)`;
otherwise, returns `None`
- `zipWith` calls the provided function `fn` and returns `Some(fn(s, o))` if `this` is `Some(s)` and the provided `Option` value is `Some(o)`; otherwise, returns `None`

### Boolean operatiors

These methods treat the `Option` as a boolean value, where `Some` acts like `true` and `None` acts
like `false`. There are two categories of these methods: ones that take an `Option` as input,
and ones that take a function as input (to be lazily evaluated).

The `and`, `or`, and `xor` methods take another `Option` as input, and produce an `Option` as
output. Only the `and` method can produce an `Option<U>` value having a different
inner type `U` than `Option<T>`.

| method  | this    | input     | output    |
|---------|---------|-----------|-----------|
| `and` | `None`    | (ignored) | `None`    |
| `and` | `Some(x)` | `None`    | `None`    |
| `and` | `Some(x)` | `Some(y)` | `Some(y)` |
| `or`  | `None`    | `None`    | `None`    |
| `or`  | `None`    | `Some(y)` | `Some(y)` |
| `or`  | `Some(x)` | (ignored) | `Some(x)` |
| `xor` | `None`    | `None`    | `None`    |
| `xor` | `None`    | `Some(y)` | `Some(y)` |
| `xor` | `Some(x)` | `None`    | `Some(x)` |
| `xor` | `Some(x)` | `Some(y)` | `None`    |

The `andThen` and `orElse` methods take a function as input, and only evaluate the function when
they need to produce a new value. Only the `andThen` method can produce an `Option<U>` value
having a different inner type `U` than `Option<T>`.

| method    | this      | function input | function result | output    |
|-----------|-----------|----------------|-----------------|-----------|
| `andThen` | `None`    | (not provided) | (not evaluated) | `None`    |
| `andThen` | `Some(x)` | `x`            | `None`          | `None`    |
| `andThen` | `Some(x)` | `x`            | `Some(y)`       | `Some(y)` |
| `orElse`  | `None`    | (not provided) | `None`          | `None`    |
| `orElse`  | `None`    | (not provided) | `Some(y)`       | `Some(y)` |
| `orElse`  | `Some(x)` | (not provided) | (not evaluated) | `Some(x)` |

## Example

```ts
enum Kingdom {
  Plant,
  Animal,
}

class Thing {
  constructor(public kingdom: Kingdom, public size: number, public name: string) {}
}

// A list of data to search through.
const allTheBigThings = [
    new Thing(Kingdom.Plant, 250, "redwood"),
    new Thing(Kingdom.Plant, 230, "noble fir"),
    new Thing(Kingdom.Plant, 229, "sugar pine"),
    new Thing(Kingdom.Animal, 25, "blue whale"),
    new Thing(Kingdom.Animal, 19, "fin whale"),
    new Thing(Kingdom.Animal, 15, "north pacific right whale"),
];

// We're going to search for the name of the biggest animal,
// but to start with we've just got `None`.
let nameOfBiggestAnimal: Option<string> = new None();
let sizeOfBiggestAnimal = 0;
for (const bigThing of allTheBigThings) {
  if (bigThing.kingdom === Kingdom.Animal && bigThing.size > sizeOfBiggestAnimal) {
    sizeOfBiggestAnimal = bigThing.size;
    nameOfBiggestAnimal = new Some(bigThing.name);
  }
}

const message = nameOfBiggestAnimal.mapOr("There are no aminals 😢", (name) => `The biggest animal is ${name}`);
console.log(message)
```

## Documentation

https://snowfrogdev.github.io/snowfrogdev/option/

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
