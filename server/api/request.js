const router = require('express').Router()
const {Request, User, Friend} = require('../db/models')
module.exports = router

router.post('/send/:to', (req, res, next) => {
    Request.findOrCreate({
        where: {
            to: req.params.to,
            userId: req.user.id
        }
    })
        .then(request => res.json(request))
        .catch(next)
})

router.get('/', (req, res, next) => {
    Request.findAll({
        where: {userId: req.user.id}
    })
        .then(requests => res.json(requests))
        .catch(next)
})

router.get('/mine', (req, res, next) => {
    Request.findAll({
        where: {to: req.user.id},
        include: [User]
    })
        .then(requests => res.json(requests))
        .catch(next)
})

router.post('/accept', (req, res, next) => {
    console.log('HIT: ', req.body)
    Friend.findOrCreate({
        where: {userId: req.body.userId, friendId: req.body.friendId}
    })
        .then(friendship => {
            Friend.findOrCreate({
                where: {userId: req.body.friendId, friendId: req.body.userId}
            })
                .then(friendship2 => {
                    Request.destroy({
                        where: {to: req.body.userId, userId: req.body.friendId}
                    })
                    .then(() => res.json('done'))
                })
        })
})

