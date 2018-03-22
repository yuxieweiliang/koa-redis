var Koa = require('koa');
var redis = require('redis');
var client = redis.createClient();    // 创建客户端实例
client.select(2);                     // 选择一个数据库

var app = new Koa();

const STRING_01 = 'string 01'
const STRING_02 = 'string 02'
const STRING_03 = 'string 03'
const STRING_04 = 'string 04'
const STRING_05 = 'string 05'

// 注意: client默认是异步callback方式调用;
client.set("string_01", STRING_01, function (err, status) {
  if (err) throw err;
  console.log(status); // true
});
// 可以不使用回调，这个会覆盖上面hello的值
client.set("string_02", STRING_02);
client.set("string_03", STRING_03);
client.set("string_04", STRING_04);
client.set("string_05", STRING_05);

// 获取一个 string
client.get("string_01", function(err, doc) {
  console.log(doc);
})

client.get("string_02", function(err, doc) {
  console.log(doc);
})

client.set(["string_04", 'STRING_05'], function(err, reply){});

client.get("string_04", function(err, doc) {
  console.log(doc);
})

// var option={host: "172.19.65.240", db:1};

app.use(async function(ctx, next) {
  ctx.body = 'session.count';

})


app.listen(8080);