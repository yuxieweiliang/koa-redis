var Koa = require('koa');
var redis = require('redis');
var client = redis.createClient();    // 创建客户端实例
client.select(2);                     // 选择一个数据库


var app = new Koa();
client.set("hello", "world", function (err, status) {
  if (err) throw err;
  console.log(status); // true
});
// 可以不使用回调，这个会覆盖上面hello的值
client.set("hello", "worlds");

app.listen(8080);