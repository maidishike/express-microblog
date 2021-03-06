const User = require('../models/user');

function doViewUserInfo (req, res) {
  var username = req.params.name;
  User.get(username, (err, user) => {
  });
  res.render('user', {
    title: username + '的文章',
    user: req.session.user,
    username: username,
    success: req.flash('success').toString(),
    error: req.flash('error').toString(),
    pathname: ''
  });
}

module.exports = {
  doViewUserInfo
}
