var Koa = require('koa');
var redis = require('redis');
var client = redis.createClient();    // 创建客户端实例
client.select(2);                     // 选择一个数据库

var app = new Koa();

// 一次只能添加一个
client.hset("hash key", "hashtest 1", "some value5",  redis.print);
// 用来获取hash类型
client.hkeys("hash key", function (err, replies) {
  if(replies) {
    console.log(replies.length + " replies:", replies);
    replies.forEach(function (reply, i) {
      console.log("    " + i + ": " + reply);
    });
  }
  client.quit();
});

// 一次可以添加多个
client.hmset("hosts", "mjr", "1", "another", "23", "home", "1234");
client.hgetall("hosts", function (err, obj) {
  console.dir(obj);
});


// var option={host: "172.19.65.240", db:1};

app.use(async function(ctx, next) {
  ctx.body = 'session.count';

})


app.listen(8080);