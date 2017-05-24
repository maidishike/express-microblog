var User = require('../models/user');
var Post = require('../models/post');

function DoViewByTitle (req, res) {
  var params = req.params;
  User.get(req.params.name, function(err, user) {
    console.log(req.params);
    if (!user) {
       return res.redirect('/');
    }
    Post.getOne(params.name, params.day, params.title, function(err, post) {
      res.render('article', {
        title: post.title,
        user: req.session.user,
        post: post,
        success: req.flash('success').toString(),
        error: req.flash('error').toString(),
        pathname: ''
      });
    });
  });
}
module.exports = DoViewByTitle;
