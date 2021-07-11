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
              user_id: req.session.user_id 
          })
          res.status(200).json({message: "Everything went well!"})
      } catch (err) {
        res.status(500).json({message: err})
      }
  })


//   NOT DONE YET!!!
  router.put('/:id', async (req, res) => {
    console.log(`before the try`)
    try {
      console.log(`inside the try`)
        const postData = await Post.update({
            title: req.body.title,
            content: req.body.content
        },
        {
          where:{
            id:req.params.id
          }
        })
    
        res.status(200).json({message: "Everything went well!"})
    } catch (err) {
        res.status(500).json({message: err})
    }
})


// NOT DONE YET!!!!!!!!!!!!!!!
router.delete('/:id', async (req, res) => {
console.log(`before the try`)
    try {
console.log(`inside the try`)
        const postData = await Post.destroy({
          where:{
            id:req.params.id
          }
           
        })
        res.status(200).json({message: "Everything went well!"})
    } catch (err) {
      res.status(500).json({message: err})
    }
})

module.exports = router;