/**
 * 依赖模块
 */
const redis = require('redis');

/**
 * 模块导出
 */
module.exports = User;

/**
 * 创建客户端
 */
const client = redis.createClient();

/**
 * 用户模型
 * @param id
 * @param data
 * @constructor
 */
function User(id, data) {
  this.id = id;
  this.data = data;
}

User.prototype = {
  save: function(fn) {
    if(!this.id) {
      this.id = String(Math.random()).substr(3)
    }
    client.hmset('user:' + this.id + ':data', this.data, fn);
  },
  follow: function(user_id, fn) {
    client.multi()
      // user_id 是粉丝的id   this.id 是当前用户的id
      .sadd('user:' + user_id + ':followers', this.id)
      .sadd('user:' + this.id + ':follows', user_id)
      .exec(fn);
  },
  getFollowers: function(fn) {

    client.smembers('user:' + this.id + ':followers', fn);
  },
  getFollows: function(fn) {
    client.smembers('user:' + this.id + 'follow', fn);
  },
  getFriends: function(fn) {
    client.sinter('user:' + this.id + ':followers', 'user:' + this.id + ':followers', fn);
  }
}

User.find = function(id, fn) {
  client.hgetall('user:' + id + ':data', function(err, obj) {
    if(err) {
      return fn(err)
    }
    fn(null, new User(id, obj));
  })
}


