var fs = require('fs');//fs文件系统模块
var source = fs.readFileSync('./11.png');

fs.writeFileSync('stream_copy_logo.png',source);