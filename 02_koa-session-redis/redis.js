/**
 * Created by xueyufei on 2018/3/8.
 */
var redis = require('redis');
var session = require('koa-session-redis');
var redisStore = require('koa-redis');

var client = redis.createClient();
client.on("error", function (err) {
  console.log("Error " + err);
});

var options = {
  client: client,
  db: 2
};

var store = redisStore(options);

module.exports = function(app) {
  app.use(session({
    store: store
  }));

  return store.client
}


