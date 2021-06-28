const router = require('express').Router();
const api = require('./api');

const User = require('../models/User')


router.use('/api',api)




router.get('/', async (req, res) => {
  const userData = await User.findByPk(1, {raw: true});
  // TODO: Render template with Sequelize data
  console.log(userData)

  res.render('homepage', userData);
});

module.exports = router;