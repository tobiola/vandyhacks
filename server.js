//const SpotifyStrategy = require('passport-spotify').Strategy;
//
//passport.use (
//  new SpotifyStrategy (
//    {
//      clientID: client_id,
//      clientSecret: client_secret,
//      callbackURL: 'http://localhost:8888/auth/spotify/callback'
//    },
//    function(accessToken, refreshToken, expires_in, profile, done) {
//      User.findOrCreate({ spotifyId: profile.id },
//        return done(err, user);
//      });
//    }
//  )
//);
//
//app.get('/auth/spotify', passport.authenticate('spotify'), function(req, res) {
//
//});
//
//app.get(
//  '/auth/spotify/callback',
//  passport.authenticate('spotify', { failureRedirect: '/login' }),
//  function(req, res) {
//    res.redirect('/');
//  }
//);

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, cache-control");
  return next();
});

var port = process.env.PORT || 8080;
var router = express.Router();

router.use(function(req, res, next) {
  next();
});

router.route("/")
  .get(function(req, res) {
    res.send("Hello");
  });

server = app.listen(port);
console.log("Express listening port: %d in %s mode.", port, app.settings.env);
