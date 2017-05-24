var User = require('../models/user');
var Post = require('../models/post');
function DoViewByName(req, res) {
  // 检查用户名是否存在
  User.get(req.params.name, function(err, user) {
    if (!user) {
      // 用户名不存在
      return res.redirect('/');
    }
    Post.getAll(user.name, function(err, posts) {
      if(err) {
        posts = [];
      }
      res.render('user', {
        title: user.name,
        user: req.session.user,
        posts: posts,
        success: req.flash('success').toString(),
        error: req.flash('error').toString(),
        pathname: ''
      });
    });

  });
}

module.exports = DoViewByName;
