# stdout-monkey [<img alt="progressed.io" src="http://progressed.io/bar/99" align="right"/>](https://github.com/fehmicansaglam/progressed.io)

[<img alt="build" src="http://img.shields.io/travis/stringparser/stdout-monkey/master.svg?style=flat-square" align="left"/>](https://travis-ci.org/stringparser/stdout-monkey/builds)
[<img alt="NPM version" src="http://img.shields.io/npm/v/stdout-monkey.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/stdout-monkey)
<br><br>

Monkeypatch for stdout with knobs. For testing purposes, or other things.
<br>

## install

    npm install stdout-monkey

## example

```js
var stdout = require('stdout-monkey');

var monkey = stdout(function(str, enc, cb){
  this.log('I want more bananas!');
})

console.log('Hey, stop it!');
// -> I want more bananas!
```

## why

You don't want to spam `stdout` for testing. You want to `batch` data or you want to transform data before it reaches `stdout`.

### api

`require('stdout-monkey')([callback])`

Each call to the monkey returns a *monkeypatched* version of `stdout` disabling it by default. Instead the given `callback` is called. The returned monkey instance has the following methods.

Below when I write `stdout` I really want to write `process.stdout.write`.

#### `monkey.patch([callback])`

Default method returned from the module.
Patch `stdout` and disable it. Use the given callback instead.

Returns the `monkey` instance.

#### `monkey.restore([data], [enc], [cb])`

Restore `stdout`s and `console.log`s is what I'm saying. Optionaly write something.

#### `monkey.listen([callback])`

`stdout` is patched only to include the `callback` after the `write`. `stdout` will work as normal, and you can "spy" what is written.

The arguments passed to the `callback` are the [same of `stdout`](http://nodejs.org/api/stream.html#stream_class_stream_writable). `this` is set to the `monkey` instance.

#### `monkey.write(data, [enc], [cb])`

use the original `process.stdout.write` even if it was patched.

#### `monkey.log([arguments])`

use `console.log` function even if `stdout` was patched.

<hr>

All above methods are chainable.

### monkey instance properties

The `monkey` has a `state` property indicating if `process.stdout.write` was `patched` or if he used the `restore` or `listen` methods.

NOTE: the `state` is not changed when calling the `log` or `write` methods.

### inspirated and based on

 - [a gist](https://gist.github.com/pguillory/729616)
 - [a modified version of the gist](https://gist.github.com/stringparser/b539b8cfd5769542037d)

## test

    npm test

### license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/stdout-monkey.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)
