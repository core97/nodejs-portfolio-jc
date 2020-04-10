const passport = require('passport');
const User = require('../models/User');

const login = (req, res, next) => {
  passport.authenticate('login', async (err, token) => {
    if (err || !token) {
      const error = new Error('There was an error login in');
      return next(error);
    }

    const user = await User.findOne({ email: req.body.email });

    res.status(200).json({
      user: {
       name: user.name,
       email: user.email,
       description: user.description,
       avatar: user.avatar 
      },
      token: `Bearer ${token}`,
    });
  })(req, res, next);
};

const register = (req, res, next) => {
  passport.authenticate('register', (err, user) => {
    if (err || !user) {
      const error = new Error('There was an error creating the user');
      return next(error);
    }

    login(req, res, next);
  })(req, res, next);
};

const isLoggedIn = (req, res, next) => {
  res.status(200).json('User is logged in');
};

module.exports = {
  register,
  login,
  isLoggedIn,
};
