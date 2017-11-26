const Sequelize = require('sequelize')
const db = require('../db')

const Song = db.define('song', {
    name: Sequelize.STRING,
    externalUrl: Sequelize.STRING,
    spotifyId: Sequelize.STRING,
    previewUrl: Sequelize.STRING,
    likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    uri: Sequelize.STRING,
    artist: Sequelize.STRING,
    image: Sequelize.STRING
})
  
module.exports = Song
