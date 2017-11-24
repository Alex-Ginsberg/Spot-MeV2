const router = require('express').Router()
const {Song} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
    Song.findOrCreate({
        where: {
            name: req.body.name,
            externalUrl: req.body.externalUrl,
            spotifyId: req.body.spotifyId,
            previewUrl: req.body.previewUrl,
            uri: req.body.uri,
            artist: req.body.artist,
            image: req.body.image,
            chatId: req.body.chatId,
        }
    })
        .then(newSong => res.json(newSong))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Song.findAll({
        where: {chatId: req.params.id}
    })
        .then(songs => res.json(songs))
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    Song.findOne({
        where: {id: req.params.id}
    })
        .then(song => {
            song.update({likes: song.likes + 1})
            res.json(song) 
        })
        .catch(next)
})
