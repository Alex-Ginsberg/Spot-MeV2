const router = require('express').Router()
const {Message, User} = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
    Message.findAll({
        where: {chatId: req.params.id},
        include: [User]
    })
        .then(messages => res.json(messages))
        .catch(next)
})

router.post('/', (req, res, next) => {
    console.log('BODYYYYYY: ', req.body)
    Message.create({
        body: req.body.body,
        userId: req.body.userId,
        chatId: req.body.chatId
    })
        .then(message => res.json(message))
        .catch(next)
})
