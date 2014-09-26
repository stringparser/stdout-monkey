'use strict';

var stdout = require('./.');

var monkey = stdout(function(str, enc, cb){
  this.log('I want more bananas!');
});

console.log('Hey, stop it!');
