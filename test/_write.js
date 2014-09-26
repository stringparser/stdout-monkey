
'use strict';

var monkey = require('../.');
var should = require('should');

module.exports = function(){

  it('should provide output to `stdout`', function(){
    var output = '', text = 'should listen to change `stdout`';

    var stdout = monkey(function(str){
      output += str;
    }).listen();

    stdout.write(text);
    should(output).not.containEql(text);
    stdout.restore();
  });

  it('should not call the callback', function(){
    var output = '', text = '      you cannot change this';

    var stdout = monkey(function(str){
      output = 'banana!!';
      str = 'banana!!';
    }).listen();

    stdout.write(text);
    should(output).not.match(/^banana!!$/);
    stdout.restore();
  });
};
