'use strict'

var koa = require('koa')
var xss = require('xss')


var app = koa()

app.use(function *() {
  var echo = this.query.echo
  var snippet1 = '<!DOCTYPE html><html><head><title>回声机</title></head><body><span style="color:#ff6600; border:1px solid #ddd;">'
  var snippet2 = '</span></body></html>'

  if (!echo) {
    this.body = snippet1 + '哔哔哔！我听不到你！' + snippet2
  }
  else {
    echo = xss(echo)

    // 对输入的内容做一些必要的安全过滤
    this.body = snippet1 + echo + snippet2
  }
})

app.listen(3000)

console.log('成功启动服务，端口是 3000')

