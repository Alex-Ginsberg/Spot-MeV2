const router = require('express').Router()
const {Chat} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
    Chat.findOrCreate({
        where: {
            name: req.body.name,
            externalUrl: req.body.externalUrl,
            playlistId: req.body.playlistId,
            likesNeeded: req.body.likesNeeded,
            userId: req.body.userId
        }
    })
    .spread((user, created) => {
        res.json(user)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Chat.findAll({
        where: {
            userId: req.params.id
        }
    })
    .then(chats => res.json(chats))
})