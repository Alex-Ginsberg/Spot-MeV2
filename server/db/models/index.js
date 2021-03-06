const Sequelize = require('sequelize')
const db = require('../db')

const User = require('./user')
const Chat = require('./chat')
const Message = require('./message')
const Song = require('./song')
const Request = require('./requests')

const Friend = db.define('friend', {})
const Liker = db.define('liker', {})

const UserChat = db.define('user_chat', {})
User.belongsToMany(Chat, { through: UserChat })
Chat.belongsToMany(User, { through: UserChat })
Chat.belongsTo(User)

User.hasMany(Message)
Message.belongsTo(User)
Chat.hasMany(Message)

Chat.hasMany(Song)
Song.belongsTo(Song)

User.hasMany(Request)
Request.belongsTo(User)

User.belongsToMany(User, { through: Friend, as: 'friends'})

User.belongsToMany(Song, { through: Liker})
Song.belongsToMany(User, { through: Liker})


module.exports = {
  User,
  Chat,
  Friend,
  Message,
  Song,
  Liker,
  Request,
  UserChat
}
