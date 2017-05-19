var Post = require('../models/post');

function DoPost (req, res) {
  var curUser = req.session.user,
      post = new Post(curUser.name, req.body.title, req.body.post);

  post.save(function(err) {
    if (err) {
      return res.redirect('/');
    }
    res.redirect('/');
  });
}

module.exports = DoPost;
