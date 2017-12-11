const router = require('express').Router()
const User = require('../db/models/user')
const axios = require('axios')
const refresh = require('spotify-refresh')
const appKey = require('../../secrets').appKey
const appSecret = require('../../secrets').appSecret
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.get('/refresh', (req, res, next) => {
  refresh(req.user.refreshToken, appKey, appSecret, (err, res, body) => {
    console.log('RESRESHING')
    if (err) return
    const token = body.access_token
    console.log(token)
    User.update(
      {accessToken: token},
      {where: {id: req.user.id}}
    )
  })
})


