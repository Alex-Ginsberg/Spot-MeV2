const Sequelize = require('sequelize')
const db = require('../db')

const User = require('./user')
const Chat = require('./chat')

const Friend = db.define('friend', {})

User.belongsToMany(User, { through: Friend, as: 'friends'})

module.exports = {
  User,
  Chat,
  Friend
}
