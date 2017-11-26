const router = require('express').Router()
const {Chat, UserChat, User} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
    Chat.findOrCreate({
        where: {
            name: req.body.name,
            externalUrl: req.body.externalUrl,
            playlistId: req.body.playlistId,
            likesNeeded: req.body.likesNeeded,
            admin: req.user.SpotifyId,
            userId: req.body.userId
        }
    })
    .spread((chat, created) => {
        UserChat.findOrCreate({
            where: {
                userId: req.user.id,
                chatId: chat.id
            }
        })
        .then(() => res.json(chat))   
    })
    .catch(next)
})

router.get('/members/:id', (req, res, next) => {
    User.findAll({
        include: [{
            model: Chat,
        }],
        where: {'$chats.id$': req.params.id},
    })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/', (req, res, next) => {
    Chat.findAll({
        include: [{
            model: User,
        }],
        where: {'$users.id$': req.user.id}
    })
    .then(chats => res.json(chats))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Chat.findOne({
        where: {id: req.params.id},
    })
    .then(chat => {
        User.findOne({
            where: {id: chat.userId}
        })
            .then(user => {
                res.json([chat, user])
            })       
    })
})

router.post('/add', (req, res, next) => {
    UserChat.findOrCreate({
        where: {
            userId: req.body.userId,
            chatId: req.body.chatId
        }
    })
        .then(() => res.json('done'))
})
