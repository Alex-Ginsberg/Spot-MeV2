const router = require('express').Router()
const {Request} = require('../db/models')
module.exports = router

router.post('/:to', (req, res, next) => {
    Request.findOrCreate({
        where: {
            from: req.body.id,
            userId: req.params.to
        }
    })
        .then(request => res.json(request))
        .catch(next)
})

router.get('/', (req, res, next) => {
    Request.findAll({
        where: {from: req.user.id}
    })
        .then(requests => res.json(requests))
        .catch(next)
})

