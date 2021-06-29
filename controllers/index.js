const router = require('express').Router();
const api = require('./api');
const homeRoutes = require('./home-routes')
const User = require('../models/User')


router.use('/api',api)
router.use('/', homeRoutes)




module.exports = router;