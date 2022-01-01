# @snowfrog/result

Type-safe error handling without exceptions.

## Install

```bash
npm install @snowfrog/result
```

## Error Handling

Errors are a fact of life in software development. In JavaScript, errors are usually thrown using the `throw` keyword
and this approach makes sense when something bad happens in your code and there's nothing you can do about it.
This most commonly occurs when a bug of some kind has been detected and it's not clear to the programmer how to handle
the error.

Most errors, though, aren't serious enough to require the program to stop entirely. Sometimes, when a function fails,
it's for a reason that you can easily interpret and respond to. That's where `Result` comes in. It makes handling these
common errors type-safe and explicit.

## Documentation

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
