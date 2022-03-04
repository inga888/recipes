const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const { checkUser, checkProtection } = require('../middlewares/allMiddleWares');

router
  .route('/signup')
  .get((req, res) => res.render('signup'))
  .post(async (req, res) => {
    const { username, email, password: pass } = req.body;
    console.log(req.body);
    try {
      const saltRounds = 10;
      const password = await bcrypt.hash(pass, saltRounds);
      const user = await User.create({ username, email, password });
      req.session.userName = user.username;
      req.session.userEmail = user.email;
      req.session.userId = user.id;
      // res.redirect(`/users/profile/${user.id}`);
      res.render('index');
    } catch (error) {
      res.render('signup', {
        message1: 'User with such email already exists',
        error: {},
      });
    }
  });

router
  .route('/signin')
  .get((req, res) => res.render('signin'))
  .post(async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.render('signup', {
          message: 'Please signup',
          error: {},
        });
      }
      const isValidPassword = await bcrypt.compare(req.body.password, user.password);
      if (isValidPassword) {
        req.session.userName = user.username;
        req.session.userEmail = user.email;
        req.session.userId = user.id;
        res.redirect(`/users/profile/${user.id}`);
      }
    } catch (error) {
      res.render('signin', {
        message: 'Please try to enter valid email address or password',
        error: {},
      });
    }
  });

// router.get('/profile/:id', checkUser, checkProtection, async (req, res) => {
//   const userId = Number(req.params.id);
//   // const myItems = await Item.findAll({ where: { user_id: userId }, raw: true });
//   const myItems = await Item.findAll({
//     include: { model: Condition },
//     raw: true,
//   });
//   console.log(myItems)
//   res.render('profile', { myItems, Condition });
// });

// router.delete("/profile/:cardId", async (req, res) => {
//   const { cardId } = req.params;
//   console.log(req.params);
//   try {
//     await Item.destroy({ where: { id: +cardId } });
//     res.sendStatus(200);
//   } catch (error) {
//     res.sendStatus(418);
//   }
// });

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('userCookie');
  res.redirect('/');
});

module.exports = router;
