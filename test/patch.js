'use strict';

var monkey = require('../.');
var should = require('should');

module.exports = function(){

  it('should disable `stdout`', function(){
    var output = '', text = 'should disable `stdout`';

    var stdout = monkey(function(str){
      output += str;
    });

    console.log(text);

    should(output).containEql(text);
    stdout.restore();
  });
};
