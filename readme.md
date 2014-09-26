# callsite-tracker [<img alt="progressed.io" src="http://progressed.io/bar/99" align="right"/>](https://github.com/fehmicansaglam/progressed.io)

[<img alt="build" src="http://img.shields.io/travis/stringparser/callsite-tracker/master.svg?style=flat-square" align="left"/>](https://travis-ci.org/stringparser/callsite-tracker/builds)
[<img alt="NPM version" src="http://img.shields.io/npm/v/callsite-tracker.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/callsite-tracker)
<br><br>

[V8 stacktrace API](https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi)-based information tool.
<br>

## install

    npm install callsite-tracker

## example

```js
var tracker = require('callsite-tracker');

describe('tracker', function (){

  it('should give me info!', function origin(){

    tracked = tracker(3, origin);
    should(tracked.module).be('mocha');
    console.log(tracked);
  })
})
// Of course! this is a mocha test file!
// its just to illustrate things better.
```

which will output

```js
{ [Function: tracker]
  module: 'mocha',
  scope: 'mocha/lib',
  path: '/home/jcm/npm/lib/node_modules/mocha/lib/runner.js',
  isCore: false,
  isNative: false,
  site:
   [ { receiver: [Object], fun: [Function: callFn], pos: 5274 },
     { receiver: [Object], fun: [Function], pos: 5169 },
     { receiver: [Object], fun: [Function], pos: 7711 } ] }
```

### documentation

`var tracker = require('callsite-tracker')([frames, origin])`

 - `frames` if specified should be an `integer` bigger than `0` or `Infinity`.
 - `origin` if specified should be a function.
 - if no arguments, the default number of `frames` is `2` so the `origin` is the module itself. The returned stack is sliced by one.

The instance returned can walk through the recorded stack on a simple manner

```js
var tracker = require('callsite-tracker');
var tracked = tracker(3);  // <- creates the `tracker` instance

tracked    // looks the same as the above output given
tracked(1) // will move to the second element of the sites array
           // and get the same information overriding
           // whatever value the properties had
```

### tracker properties

Each tracker instance has attached the stack trace with the callsites. I called each "step" of the `stack` a frame. So if you had

```bash
callFn (/home/jcm/npm/lib/node_modules/mocha/lib/runnable.js:249:21)
Test.Runnable.run (/home/jcm/npm/lib/node_modules/mocha/lib/runnable.js:242:7)
Runner.runTest (/home/jcm/npm/lib/node_modules/mocha/lib/runner.js:373:10)
```
each line represents in my head a `callsite` frame. The first frame would be
that of the `caller`.

 - `module`: the module from which that frame comes from.
 - `scope` : the module's module (thats why is called scope you know).
 - `path`  : `__filename` of the frame.
 - `isCore` : was the `module` a `node`'s core module?
 - `isNative` : was a native `v8` module?
 - `site` : an array of callsites.


All `tracker.site` elements are callsites so they have their own `api`. Go and see the [avaliable methods](https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi) of the V8 stack trace api like:
 - `getLineNumber`
 - `getFileName`
 - `getEvalOrigin`
 - etc.

on that link.

## why

You want to know stuff.

By default two frames are recorded, though you can even lower it to one providing a function from which start.

### inspirated and based on

It serves for the same use cases implemented on this cool modules

 - [visionmedia `callsite`](https://github.com/visionmedia/callsite)
 - [sindresorhus `callsites`](https://github.com/sindresorhus/callsites)

I've been using those a lot.

## test

    npm test

### license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/callsite-tracker.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)
