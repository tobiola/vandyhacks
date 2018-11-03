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

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, cache-control');
  return next();
});

app.get('/', function(req, res) {
  res.render('pages/index');
});


server = app.listen(8080);
console.log('Express listening port: 8080');
