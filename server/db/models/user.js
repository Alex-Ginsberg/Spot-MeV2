const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  name: Sequelize.STRING,
  SpotifyId: Sequelize.STRING,
  accessToken: Sequelize.STRING,
  proPic: Sequelize.STRING,
  refreshToken: Sequelize.STRING,
  artist1Name: Sequelize.STRING,
  artist2Name: Sequelize.STRING,
  artist3Name: Sequelize.STRING,
  artist1Pic: Sequelize.STRING,
  artist2Pic: Sequelize.STRING,
  artist3Pic: Sequelize.STRING,
  artist1Url: Sequelize.STRING,
  artist2Url: Sequelize.STRING,
  artist3Url: Sequelize.STRING,
})

module.exports = User


