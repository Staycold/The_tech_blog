// do a loggedIn check
const router = require("express").Router()
const Post = require("../../models/Post")
const withAuth = require('../../utils/auth')


router.get('/', async (req, res) => {
    try {
      const userData = await Post.findAll();
      if (!userData) {
        res.status(404).json({ message: 'No Post with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const postData = await User.findByPk(req.params.id);
      if (!postData) {
        res.status(404).json({ message: 'No user with this id!' });
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
              user_id: req.session.user_id 
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
            user_id: req.session.user_id 
        })
        res.status(200).json({message: "Everything went well!"})
    } catch (err) {
        
    }
})


// NOT DONE YET!!!!!!!!!!!!!!!
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id 
        })
        res.status(200).json({message: "Everything went well!"})
    } catch (err) {
        
    }
})

module.exports = router;