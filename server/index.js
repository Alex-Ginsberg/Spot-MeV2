const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express()
const appKey = require('../secrets').appKey
const appSecret = require('../secrets').appSecret
const socketio = require('socket.io')
const User = require('./db/models/user')
const SpotifyStrategy = require('passport-spotify').Strategy;
module.exports = app

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => done(null, user))
    .catch(done))

    passport.use(new SpotifyStrategy({
      clientID: process.env.appKey || appKey,
      clientSecret: process.env.appSecret || appSecret,
      callbackURL: 'http://localhost:8080/callback'
      },
      function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
          console.log('Profile: ', profile)
    
          User.findOrCreate({
            where: {
              SpotifyId: profile.id
            },
            defaults: {
              name: profile.displayName,
              SpotifyId: profile.id,
              accessToken: accessToken,
              proPic: profile.photos[0],
              refreshToken: refreshToken
            }
          })
          .spread(function (user) {
            console.log('MAKING USER: ', user)  
            done(null, user);
          })
          .catch(done);
          // return done(null, profile);
        });
      }));

    // FOR DEPLOYED VERSION
    // passport.use(new SpotifyStrategy({
    //   clientID: process.env.appKey || appKey,
    //   clientSecret: process.env.appSecret || appSecret,
    //   callbackURL: 'https://spot-mev2.herokuapp.com/callback'
    //   },
    //   function(accessToken, refreshToken, profile, done) {
    //     // asynchronous verification, for effect...
    //     process.nextTick(function () {
    //       console.log('Profile: ', profile)
    
    //       User.findOrCreate({
    //         where: {
    //           SpotifyId: profile.id
    //         },
    //         defaults: {
    //           name: profile.displayName,
    //           SpotifyId: profile.id,
    //           accessToken: accessToken,
    //           proPic: profile.photos[0],
    //           refreshToken: refreshToken
    //         }
    //       })
    //       .spread(function (user) {
    //         console.log('MAKING USER: ', user)  
    //         done(null, user);
    //       })
    //       .catch(done);
    //       // return done(null, profile);
    //     });
    //   }));
    

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())

  // session middleware with passport
  app.use(session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
  app.get('/auth/spotify',
    passport.authenticate('spotify', {scope: [ 'user-read-email','playlist-modify-private', 'playlist-modify-public'], showDialog: true}),
    function(req, res){
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  });

  app.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('IN CALLBACK: ')
    res.redirect('/profile');
  });
  app.use('/api', require('./api'))
  app.use('/auth', require('./auth'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  .use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync({force: false})

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  sessionStore.sync()
    .then(syncDb)
    .then(createApp)
    .then(startListening)
} else {
  createApp()
}
