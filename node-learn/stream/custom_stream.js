var stream = require('stream');
var util = require('util');//工具类

function ReadStream(){
  stream.Readable.call(this);
}

util.inherits(ReadStream, stream.Readable);

ReadStream.prototype._read = function(){
  this.push('I ');
  this.push('Love ');
  this.push('yang ming');
  this.push(null);
}

function WritStream(){
  stream.Writable.call(this);
  this._cashed = new Buffer('');
}

util.inherits(WritStream, stream.Writable)

WritStream.prototype._write = function(chunk, encode, cb){
  console.log(chunk.toString());
  cb();
}

function TransformStream(){
  stream.Transform.call(this);
}

util.inherits(TransformStream, stream.Transform);//前者继承，后者被继承

TransformStream.prototype._transform = function(chunk, encode, cb){
  this.push(chunk);
  cb();
}

TransformStream.prototype._flush = function(cb){
  this.push("Yang Ming");
  cb();
}


var rs = new ReadStream();
var ws = new WritStream();
var ts = new TransformStream();


rs.pipe(ts).pipe(ws);







