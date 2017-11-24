const Sequelize = require('sequelize')
const db = require('../db')

const User = require('./user')
const Chat = require('./chat')
const Message = require('./message')
const Song = require('./song')

const Friend = db.define('friend', {})

User.hasMany(Chat)
Chat.belongsTo(User)

User.hasMany(Message)
Message.belongsTo(User)
Chat.hasMany(Message)

Chat.hasMany(Song)
Song.belongsTo(Song)

User.belongsToMany(User, { through: Friend, as: 'friends'})

module.exports = {
  User,
  Chat,
  Friend,
  Message,
  Song
}
