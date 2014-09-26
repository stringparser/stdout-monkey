'use strict';

var type = require('utils-type');

var scope = process.stdout;
var write = process.stdout.write;

module.exports = monkey;

function monkey(callback){

  callback = type(callback).function || function(){ };

  return ({
    patch : function(data, enc, cb){
      var self = this;
      process.stdout.write = function(str, enc, cb){
        callback.call(self, str, enc, cb);
      };
      return cb ? this.write(data, enc, cb) : this;
    },
    restore : function(data, cb){
      process.stdout.write = write;
      return cb ? this.write(data, undefined, cb) : this;
    },
    listen : function(){
      var self = this;
      process.stdout.write = function(str, enc, cb){
        write.call(scope, str, enc, cb);
        callback.call(self, str, enc, cb);
      };
      return this;
    },
    log : function (/* arguments */){

      this.restore();
      var args = arguments;
      var len = args.length;

      if( typeof args[len-1] === 'string' ){
        args[len-1] = args[len-1].trim();
      }
      console.log.apply(console, args);

      return this.patch();
    },
    write : function(str, enc, cb){
      write.call(scope, str, enc, cb);
      return this;
    }
  }).patch();
}
