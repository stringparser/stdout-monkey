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

Below when I write `stdout` I really want to write `process.stdout.write`.

```
var monkey = require('stdout-monkey')([callback])
```

Calling the module with a function returns a *monkeypatched* `stdout` disabled by default. Instead the arguments are passed to the given `callback`. 

Note: that is not really accurate since the `object` is not a `writable` stream.

#### monkey.patch([callback])

Default method returned from the module. Patch `stdout` and disable it. Use the given callback instead.
Returns the `monkey` instance.

#### monkey.restore([data], [enc], [cb])

Restore `stdout`. Optionaly write something.

#### monkey.listen([callback])

Patch `stdout` but only to include the `callback`. `stdout` will work as normal, you can *spy* but not *modify* what is written.

#### monkey.write(data, [enc], [cb])

Use the original `process.stdout.write` even if it was patched.

#### monkey.log([arguments])

Use `console.log` even if `stdout` was patched.

<hr>

All above methods are chainable.

### properties

The `monkey` has a `state` property indicating if `process.stdout.write` was `patched` or if he used the `restore` or `listen` methods.

NOTE: the `state` is not changed when calling the `log` or `write` methods.

## test

    npm test

### inspirated and based on

 - [a gist](https://gist.github.com/pguillory/729616)
 - [a modified version of the gist](https://gist.github.com/stringparser/b539b8cfd5769542037d)

### todo

 - [ ] make the `monkey` a `through` stream.

### license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/stdout-monkey.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)
