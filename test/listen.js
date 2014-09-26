
'use strict';

var monkey = require('../.');
var should = require('should');

module.exports = function(){

  it('should listen to `stdout` output', function(){
    var output = '', text = 'should listen to change `stdout`';

    var stdout = monkey(function(str){
      output += str;
    }).listen();

    process.stdout.write(text);
    should(output).containEql(text);
    stdout.restore();
  });

  it('should not be able to change `stdout` output', function(){
    var output = '', text = '      you cannot change this';

    var stdout = monkey(function(str){
      output = 'banana!!';
      str = 'banana!!';
    }).listen();

    console.log(text);
    should(output).match(/^banana!!$/);
    stdout.restore();
  });
};
