var Koa = require('koa');
var redis = require('redis');
var client = redis.createClient();    // 创建客户端实例
client.select(2);                     // 选择一个数据库


var app = new Koa();

// 注意: client默认是异步callback方式调用;
client.set("hello", "world", function (err, status) {
  if (err) throw err;
  console.log(status); // true
});
// 可以不使用回调，这个会覆盖上面hello的值
client.set("hello", "worlds");

client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
//  -> row  key                 value
//  -> 0    "hashtest 1"        "some value"
//  -> 1    "hashtest 2"        "some other value"

client.hkeys("hash key", function (err, replies) {
  console.log(replies.length + " replies:", replies);
  replies.forEach(function (reply, i) {
    console.log("    " + i + ": " + reply);
  });
  client.quit();
});

// 这种是键值对
client.hmset("hash", { f: "rex", steg: "asaurus" }, function (err, status) {
  if (err) throw err;
  console.log(status); // true
});
//  -> row  key     value
//  -> 0    f       rex
//  -> 1    steg    asaurus
client.get('all' ,function(err, replies) {
  console.log(replies);
})






// Support for transactions
console.log("Transfer from checking to savings.");

app.keys = ['keys', 'keykeys'];
// var option={host: "172.19.65.240", db:1};

app.use(async function(ctx, next) {
  ctx.body = 'session.count';

})


app.listen(8080);