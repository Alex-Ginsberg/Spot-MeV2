const Sequelize = require('sequelize')
const db = require('../db')

const Request = db.define('request', {
    from: Sequelize.INTEGER
})

module.exports = Request
