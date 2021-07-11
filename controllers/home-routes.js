const withAuth = require('../utils/auth')
const router = require('express').Router()
const { Post, User, Comment } = require('../models')



router.get('/', async (req, res) => {
  
    try {
      // Get all Post data
      const postData = await Post.findAll({
        include:{
          model:User,
          attributes: ['name'],
        }
      });
      // const userData = await User.findByPk(1, {plain: true});
      // Serialize data
      const posts = postData.map((post) =>{
        let serializedPost = post.get({ plain: true});
        serializedPost.isOwner = (serializedPost.user_id == req.session.user_id);

        return serializedPost;
      });


     
      res.render('homepage', {
        posts:posts,
        userId:req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    }
  });


  router.get('/login', async (req, res) => {
    
  
    res.render('login');
  });

  router.get('/postcreate', async (req, res) => {
    
      res.render('postcreate', {
        userId:req.session.user_id,
        logged_in: req.session.logged_in});
    });
  
  

// This one or the next one?
  // router.get('/postview/:id', async (req, res) => {
  //     try {
  //       const postData = await Post.findByPk(req.params.id,{
  //         include:{
  //           model:Comment,
  //           attributes: ['content'],
  //         }});

          
  //         const comments = postData.comments.map((comment) => comment.get({ plain: true }));

  //         const post = postData.get({plain: true});

  //       console.log(postData.content)
  //       res.render('postview', {post,comments});
  //   }
  //   catch (err) {
  //       res.render('error', err)
  //   }
  
    
  // });

// probably a better way to get post
  router.get('/postview/:id', async (req, res) => { 
    try {
      // Get all comments
      const commentData = await Comment.findAll({
        where:{
          post_id: req.params.id
        },
          include:{
          model:Post,
          attributes: ['title', 'content'],
        }
      });
      const postData = await Post.findByPk( req.params.id)
      
      // Serialize data
      const comments = commentData.map((comment) => comment.get({ plain: true }));
      const post = postData.get({ plain: true });
  
      console.log(post)
      console.log(comments)
  
      res.render('postview', {
        comments:comments,
        post:post,
        userId:req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
  });

  module.exports = router;