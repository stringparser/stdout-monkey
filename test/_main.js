'use strict';

process.env.NODE_ENV = 'test';

var fs = require('fs');
var path = require('path');

var testFiles = fs.readdirSync('./test');

var projectName = require('../package').name;
describe(projectName, function(){
  testFiles.slice(1).forEach(function(name){
    name = path.basename(name, path.extname(name));
    describe(name, function(){
      require('./'+name)();
    });
  });
});
