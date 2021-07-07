// do a loggedIn check
const router = require("express").Router()
const Post = require("../../models/Post")
const withAuth = require('../../utils/auth')


router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll();
      if (!postData) {
        res.status(404).json({ message: 'No Post with this id!' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id);
      if (!postData) {
        res.status(404).json({ message: 'No post can be found!' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
      try {
          const postData = await Post.create({
              title: req.body.title,
              content: req.body.content,
              user_id: 1
              // user_id: req.session.user_id 
          })
          res.status(200).json({message: "Everything went well!"})
      } catch (err) {

      }
  })


//   NOT DONE YET!!!
  router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            content: req.body.content,
           
        })
        res.status(200).json({message: "Everything went well!"})
    } catch (err) {
        
    }
})


// NOT DONE YET!!!!!!!!!!!!!!!
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
          where:{
            id:req.params.id
          }
           
        })
        res.status(200).json({message: "Everything went well!"})
    } catch (err) {
        
    }
})

module.exports = router;