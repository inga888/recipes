const express = require('express');

const router = express.Router();

/* GET home page. */
router
  .route('/')
  .get((req, res) => {
  // res.render('index', { title: 'Express' });
    res.render('index');
  })
  // .post( async (req, res) => {
  //   try {
  //     console.log(req.body);
  //     res.json(userId);
  //   // res.redirect(`/users/profile/${userId}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

module.exports = router;
