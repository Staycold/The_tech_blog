const withAuth = require('../utils/auth')
const router = require('express').Router()
const { Post, User, Comment } = require('../models')



router.get('/', async (req, res) => {
    const userData = await User.findByPk(1, {plain: true});
   
    console.log(userData)
  
    res.render('homepage', userData);
  });


  router.get('/login', async (req, res) => {
    
  
    res.render('login');
  });

  router.get('/postcreate', async (req, res) => {
    
  
    res.render('postcreate');
  });


  router.get('/postview/:id', async (req, res) => {
      try {
        const postData = await Post.findByPk(req.params.id,{
          include:{
            model:Comment,
            attributes: ['content'],
          }});

          
          const comments = postData.comments.map((comment) => comment.get({ plain: true }));

          const post = postData.get({plain: true});

        console.log(postData.content)
        res.render('postview', {post,comments});
    }
    catch (err) {
        res.render('error', err)
    }
  
    
  });

  module.exports = router;