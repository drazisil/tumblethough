var oauth = require('oauth')
var consumer

function init () {
  consumer = new oauth.OAuth(
    'http://www.tumblr.com/oauth/request_token',
    'http://www.tumblr.com/oauth/access_token',
    process.env.TUMBLR_API_CONSUMER_KEY,
    process.env.TUMBLR_API_SECRET_KEY,
    '1.0A',
    'http://localhost:3000/auth/callback',
    'HMAC-SHA1'
  )
}

/*  var tumblr = require('tumblr.js');
  var client = tumblr.createClient({
    consumer_key: process.env.TUMBLR_API_CONSUMER_KEY,
    consumer_secret: process.env.TUMBLR_API_SECRET_KEY,
    token: 'WjsNKk6xUEHBMi8ciiKMy4Eg9MQoWgcoCUP3znyXZV8Tuu3gKr',
    token_secret: 'CEqINBqiOpz2cFjLHAUE80HHK4ozxSCilc4SPF0YQFayz57Jdb'
  })

  // Show user's blog names
  client.userInfo(function(err, data) {
    if (err) {
      console.log(err)
    }
    data.user.blogs.forEach(function(blog) {
      console.log(blog.name);
    })
  })
}
*/
module.exports = {
  init: init,
  consumer: consumer
}
