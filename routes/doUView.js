var User = require('../models/user');
var Post = require('../models/post');
function DoViewByName(req, res) {
  // 检查用户名是否存在
  User.get(req.params.name, function(err, user) {
    var page = req.query.p ? parseInt(req.query.p) : 1;
    if (!user) {
      // 用户名不存在
      return res.redirect('/');
    }
    Post.getTen(user.name, page, function(err, posts, total) {
      if(err) {
        posts = [];
      }
      res.render('userAllArticles', {
        title: user.name,
        user: req.session.user,
        posts: posts,
        page: page,
        isFirstPage: (page - 1) == 0,
        isLastPage: ((page -1 ) * 10 + posts.length) == total,
        success: req.flash('success').toString(),
        error: req.flash('error').toString(),
        pathname: ''
      });
    });

  });
}

module.exports = DoViewByName;
