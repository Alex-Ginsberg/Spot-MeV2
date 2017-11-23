const router = require('express').Router()
const {Message} = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
    Message.findAll({
        where: {chatId: req.params.id}
    })
        .then(messages => res.json(messages))
        .catch(next)
})
