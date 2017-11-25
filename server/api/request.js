const router = require('express').Router()
const {Request, User} = require('../db/models')
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

