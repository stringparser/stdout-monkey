
'use strict';

var monkey = require('../.');
var should = require('should');

module.exports = function(){

  it('should be usable as console.log', function(){
    var output = '', text = 'noope, you can\'t do anything';

    var stdout = monkey(function(str){
      output += 'bunga, bunga, bunga' + str;
    }).patch();

    stdout.log(text);
    should(output).containEql('');

    stdout.restore();
  });

  it('should not use the callback with `stdout`', function(){
    var output = '', text = '    noope, you can\'t do anything';

    var stdout = monkey(function(str){
      output += 'bunga, bunga, bunga' + str;
    }).patch();

    stdout.log(text);
    should(output).not.containEql('bunga, bunga, bunga');

    stdout.restore();
  });
};
