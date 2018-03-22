var Koa = require('koa');
var Router = require('koa-router');
var redis = require('./redis');

// 注意: client默认是异步callback方式调用;
// store.client是经过了co-redis包装,返回Promise, 在koa里面用yield异步编程比较方便

var app = new Koa();
const router = new Router();
app.keys = ['keys', 'keykeys'];
// var option={host: "172.19.65.240", db:1};

router.get('/', async function(ctx, next) {
  ctx.session.count = ctx.session.count || 0;
  ctx.session.count++;
  ctx.body = ctx.session.count;
})

var store = redis(app)

app.use(router.routes())
app.listen(8080);