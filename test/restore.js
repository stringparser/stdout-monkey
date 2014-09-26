'use strict';

var monkey = require('../.');
var should = require('should');

module.exports = function(){

  it('should restore `stdout` output', function(){
    var output = null, text = 'should restore `stdout`';

    var stdout = monkey(function(str){
      output += str;
    }).restore();

    process.stdout.write(text);
    should(output).equal(null);
    stdout.restore();
  });
};
