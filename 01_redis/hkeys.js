var Koa = require('koa');
var redis = require('redis');
var client = redis.createClient();    // 创建客户端实例

client.select(2);                     // 选择一个数据库
var app = new Koa();

// 这个是用来取值的。
client.hkeys("hash key", function (err, replies) {
  console.log(replies.length + " replies:", replies);
  replies.forEach(function (reply, i) {
    console.log("    " + i + ": " + reply);
  });
  client.quit();
});

app.listen(8080);