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
var monkey = require('stdout-monkey');

var stdout = monkey(function(str, enc, cb){
  str = 'I want more bananas!'
})

console.log('Hey, stop it!');
// -> I want more bananas!
```

## why

You don't want to spam `stdout` for testing. You want to `batch` data or you want to transform data before it reaches `stdout`.

### api

`require('stdout-monkey')([callback])`

Each call to the monkey returns a *monkeypatched* version of `stdout` disabling it by default. Instead the given `callback` is called. The returned monkey instance has the following methods.

 - `patch`: patch `process.stdout.write`
 - `listen`: patch `process.stdout.write` without interfering.
 - `restore`: unpatch `process.stdout.write` leaving it fresh as a daisy.
 - `write` : original `process.stdout.write`
 - `log` : the normal `console.log` function

All methods are chainable.

### monkey instance properties

The `monkey`, has a `state` property indicating if `process.stdout.write` was `patched` or if the `monkey` used the `restore` or `listen` methods.

NOTE: the `state` is not changed when calling the `log` or `write` methods.

### inspirated and based on

 - [a gist](https://gist.github.com/pguillory/729616)
 - [a modified version](https://gist.github.com/stringparser/b539b8cfd5769542037d)

## test

    npm test

### license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/stdout-monkey.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)
