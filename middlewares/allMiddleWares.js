const addToLocals = (req, res, next) => {
  res.locals.userId = req.session?.userId;
  res.locals.userName = req.session?.userName;
  next();
};

const checkUser = (req, res, next) => {
  if (req.session.userName) {
    next();
  } else {
    res.redirect('/users/signin');
  }
};

const checkProtection = async (req, res, next) => {
  if (Number(req.session.userId) === Number(req.params.id)) {
    next();
  } else {
    res.redirect(`/users/profile/${req.session.userId}`);
  }
};

module.exports = {
  addToLocals,
  checkUser,
  checkProtection,
};
