const Sequelize = require('sequelize')
const db = require('../db')

const Request = db.define('request', {
    to: Sequelize.INTEGER
})

module.exports = Request
