var User = require('./example');

var testUsers = {
  'mark@facebook.com': {name: 'Mark Zuckerberg'},
  'bill@microsoft.com': {name: 'Bill Gates'},
  'jeff@amazon.com': {name: 'Jeff Bezos'},
  'fred@fedex.com': {name: 'Fred Smith'},
}

function create(users, fn) {
  var total = Object.keys(users).length;
  for(var i in users) {
    (function(email, data) {
      var user = new User(email, data);
      user.save(function(err) {
        if(err) return err;
        --total || fn()
      });

    })(i, users[i])
  }
}

function hydrate(users, fn) {
  var total = Object.keys(users).length;

  for(var key in users) {
    (function(email) {
      User.find(email, function(err, user) {
        if(err) return err;
        users[email] = user;
        --total || fn(email)
      })

    })(key)
  }
}
create(testUsers, function() {
  console.log('all users created');
  hydrate(testUsers, function(email) {

    console.log('-------------', email)
    testUsers[email].follow('jeff@amazon.com', function(err) {
      if(err) return err
      testUsers['jeff@amazon.com'].getFollowers(function(err, doc) {
        console.log(doc)

        process.exit()
      })
    })
  })
})