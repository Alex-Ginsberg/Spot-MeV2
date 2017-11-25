const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/chat', require('./chat'))
router.use('/message', require('./message'))
router.use('/song', require('./song'))
router.use('/request', require('./request'))
router.use('/friends', require('./friends'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
