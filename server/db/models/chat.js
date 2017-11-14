const Sequelize = require('sequelize')
const db = require('../db')

const Chat = db.define('chat', {
  name: Sequelize.STRING,
  externalUrl: Sequelize.STRING,
  playlistId: Sequelize.STRING,
  likesNeeded: Sequelize.INTEGER
})

module.exports = Chat
