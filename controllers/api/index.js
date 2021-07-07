const router = require('express').Router()
const user = require('./User-routes')
const post = require('./Post-routes')
const comment = require('./Comment-routes')

router.use('/user', user)
router.use('/post', post)
router.use('/comment', comment)


module.exports = router