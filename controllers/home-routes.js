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
        serializedPost.isOwner = (serializedPost.user_id === req.session.user_id);

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
  

  router.get('/postview/:id', withAuth, async (req, res) => { 
    console.log(`before the try`)
    try {
      console.log(`inside the try`)
      // Get all comments
      const commentData = await Comment.findAll({
        where:{
          post_id: req.params.id
        },
          include:{
          model:Post,
          attributes: ['title', 'content'],
        },
        include:{
          model:User,
          attributes: ['name'],
        }
      });
      const postData = await Post.findByPk( req.params.id)
      
      // Serialize data
      const comments = commentData.map((comment) => comment.get({ plain: true }));
      const post = postData.get({ plain: true });
    
      post.isOwner= (req.session.user_id === post.user_id)

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


  router.get('/dashboard/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where:{
          user_id: req.params.id
        }});
  
     
     
      const userPosts = postData.map((userPost) => userPost.get({ plain: true }));
  
      res.render('dashboard', { 
      userPosts:userPosts,
      userId:req.session.user_id,
       userData:req.session.userData,
        logged_in:req.session.logged_in
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });



  router.get('/editpost/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const post = postData.get({ plain: true });

      res.render('editpost', {
        post:post, 
        userId:req.session.user_id,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });



  module.exports = router;