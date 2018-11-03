const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');

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

passport.use (
  new SpotifyStrategy (
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: 'http://localhost:8080/auth/spotify/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
        return done(err, user);
      });
    }
  )
);

app.get('/auth/spotify', passport.authenticate('spotify'), function(req, res) {
  //redirect to spotify authentication
});

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/dashboard');
  }
);

server = app.listen(8080);
console.log('Express listening port: 8080');
