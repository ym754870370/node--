var http = require('http');

var fs = require('fs');

var request = require('request');

http
  .createServer(function(req, res){

    // 只读，未用到管道模式
    // fs.readFile('11.png', function(err, data){
    //   if (err) {
    //     res.end('file not exist!');
    //   }
    //   else {
    //     res.writeHeader(200, {'Context-Type': 'text/html'});
    //     res.end(data)
    //   }
    // })


      //本地
    // fs.createReadStream('./stream_copy_logo.png').pipe(response)

    request('http://www.imooc.com/static/img/index/logo.png').pipe(res);
  })
  .listen(8090);