const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const session = require('express-session');
const SpotifyWebApi = require('spotify-web-api-node');

spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
});

require('dotenv').config();

app.set('view engine', 'ejs');


app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSIONSECRET,
  resave: false,
  saveUninitialized: true,
//  cookie: { secure: true }
}));
/*
app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIEKEY],
  maxAge: 7 * 24 * 60 * 1000
}));
*/
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, cache-control');
  return next();
});

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/dashboard', function(req, res) {
  console.log(req.session.passport.user);
  console.log(req.user);
  console.log(req.cookies);
spotifyApi.getMe()
          .then(function(data) {
                      console.log('Some information about the authenticated user', data.body);
                    }, function(err) {
                                console.log('Something went wrong!', err);
                              });

  spotifyApi.getMySavedTracks({

  }).then(function(data) {
    console.log(data);

  }, function(err) {
    console.log(err); 
  });

  res.render('pages/index', {
    
  });
});

passport.serializeUser(function(user, done) {
  console.log('he');
  done(null, user);
});


passport.deserializeUser(function(user, done) {
  console.log('ho');
  done(null, user);
});

passport.use (
  new SpotifyStrategy (
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: 'http://localhost:8080/auth/spotify/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      return done(null, profile);
      /* User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
        return done(err, user);
      });*/
    }
  )
);

app.get('/auth/spotify', passport.authenticate('spotify'), function(req, res) {
  //redirect to spotify authentication
});

app.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/dashboard');
  }
);

server = app.listen(8080);
console.log('Express listening port: 8080');
