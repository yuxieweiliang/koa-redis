var Koa = require('koa');
var redis = require('redis');
var client = redis.createClient();    // 创建客户端实例
client.select(2);                     // 选择一个数据库


var app = new Koa();

client.sadd("bigset", "a member");
client.sadd("bigset", "another member");


// 不起作用，因为sadd用于创建集合
client.sadd("string", 'string--', function(err, reply) {
  // reply is null when the key is missing
  console.log(reply);
});

client.sadd("string:01", 'string111', function(err, reply) {
  // reply is null when the key is missing
  console.log(reply);
});

client.sadd("string:01:03", 'strings33', function(err, reply) {
  // reply is null when the key is missing
  console.log(reply);
});


app.listen(8080);