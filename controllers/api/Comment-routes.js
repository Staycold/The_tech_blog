// do a loggedIn check// do a loggedIn check
const router = require("express").Router()
const Comment = require("../../models/Comment")
const withAuth = require('../../utils/auth')


router.get('/', async (req, res) => {
    try {
      const commentData = await Comment.findAll();
      if (!commentData) {
        res.status(404).json({ message: 'No Comment with this id!' });
        return;
      }
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const commentData = await Comment.findByPk(req.params.id);
      if (!commentData) {
        res.status(404).json({ message: 'No comment can be found!' });
        return;
      }
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/:id', async (req, res) => {
      try {
          const commentData = await Comment.create({
              content: req.body.content,
              user_id: 1,
              // user_id: req.session.user_id,
              post_id:req.params.id 
          })
          res.status(200).json({message: "Everything went well!"})
      } catch (err) {
        res.status(500).json(err);
      }
  })


//   NOT DONE YET!!!
  router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update({
        
            content: req.body.content,
           
        })
        res.status(200).json({message: "Everything went well!"})
    } catch (err) {
      res.status(500).json(err);
    }
})


// NOT DONE YET!!!!!!!!!!!!!!!
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
          where:{
            id:req.params.id
          }
           
        })
        res.status(200).json({message: "Everything went well!"})
    } catch (err) {
      res.status(500).json(err);
    }
})

module.exports = router;