var express = require('express')
var oauth = require('oauth')
var http = require('http')
var tumblr = require('tumblr.js')

var app = express()

app.set('port', process.env.PORT || 3000)

/**
 * These four variables will be needed to use tumblr.js
 */
var tumblrConsumerKey = process.env.TUMBLR_API_CONSUMER_KEY
var tumblrConsumerSecret = process.env.TUMBLR_API_SECRET_KEY
var tumblrOauthAccessToken
var tumblrOauthAccessTokenSecret

// Temporary request tokens
var oauthRequestToken
var oauthRequestTokenSecret

/**
 * This object will be used for OAuth
 **/
var consumer = new oauth.OAuth(
  'http://www.tumblr.com/oauth/request_token',
  'http://www.tumblr.com/oauth/access_token',
  tumblrConsumerKey,
  tumblrConsumerSecret,
  '1.0A',
  'http://localhost:3000/auth/callback',
  'HMAC-SHA1'
)

app.get('/', function (req, res) {
  if (!tumblrOauthAccessToken || !tumblrOauthAccessTokenSecret) {
    res.redirect('/auth/request')
  }
  res.send('You are logged in and ready to go')
})

app.get('/auth/request', function (req, res) {
  consumer.getOAuthRequestToken(function (error, oauthToken, oauthTokenSecret) {
    if (error) {
      res.send('Error getting OAuth request token: ' + error, 500)
    } else {
      oauthRequestToken = oauthToken
      oauthRequestTokenSecret = oauthTokenSecret

      res.redirect('http://www.tumblr.com/oauth/authorize?oauth_token=' + oauthRequestToken)
    }
  })
})

app.get('/auth/callback', function (req, res) {
  consumer.getOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, req.query.oauth_verifier, function (error, _oauthAccessToken, _oauthAccessTokenSecret) {
    if (error) {
      res.send('Error getting OAuth access token: ' + error, 500)
    } else {
      tumblrOauthAccessToken = _oauthAccessToken
      tumblrOauthAccessTokenSecret = _oauthAccessTokenSecret

      res.send('You are signed in. <a href=\'/test\'/>Test</a>')
    }
  })
})

app.get('/test', function (req, res) {
  if (!tumblrOauthAccessToken || !tumblrOauthAccessTokenSecret) {
    res.redirect('/auth/request')
  }

  var client = tumblr.createClient({
    consumer_key: tumblrConsumerKey,
    consumer_secret: tumblrConsumerSecret,
    token: tumblrOauthAccessToken,
    token_secret: tumblrOauthAccessTokenSecret
  })

  client.userLikes(function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
