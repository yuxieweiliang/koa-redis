var Koa = require('koa');
var redis = require('redis');
var client = redis.createClient();    // 创建客户端实例

client.select(2);                     // 选择一个数据库
var app = new Koa();

client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
//  -> row  key                 value
//  -> 0    "hashtest 1"        "some value"
//  -> 1    "hashtest 2"        "some other value"

app.listen(8080);