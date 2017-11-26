const router = require('express').Router()
const {Friend, User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Friend.findAll({
        where: {userId: req.user.id},
        attributes: ['friendId']
    })
        .then(friends => {
            const idArray = []
            for (let i = 0; i < friends.length; i++) {
                idArray.push(friends[i].friendId)
            }
            return idArray
        })
        .then(idArray => {
            User.findAll({
                where: {id: {in: idArray}}
            })
                .then(finalFriends => res.json(finalFriends))
        })
        .catch(next)
})
