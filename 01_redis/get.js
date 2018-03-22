var Koa = require('koa');
var redis = require('redis');
var client = redis.createClient();    // 创建客户端实例
client.select(2);                     // 选择一个数据库


var app = new Koa();
client.get("string", function(err, reply) {
  // reply is null when the key is missing
  console.log(reply);
});

app.listen(8080);