var fs = require('fs');

var readStream = fs.createReadStream('stream_copy_logo.js');

var writeStream = fs.createWriteStream('stream_copy_logo3.js');

readStream
  .on('data', function(chunk){
    if (writeStream.write(chunk) === false) {//这个判断中的语句也参与执行吗？是的
      console.log('still cached');
      readStream.pause();
    }
  })

  .on('end', function(){
    writeStream.end();
  })

writeStream.on('drain', function(){//drain资源已经耗尽，就是已经全部写入
  console.log('data drain');
  readStream.resume();
})

