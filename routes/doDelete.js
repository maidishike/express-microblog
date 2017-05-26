const Post = require('../models/post');

function DoDelete (req, res) {
  var curUser = req.session.user;
  Post.remove(curUser.name, req.params.day, req.params.title, (err) => {
    if (err) {
      req.flash('error', err);
      res.send({'bool':false, 'msg': err})
      // return res.redirect('back');
    }
    req.flash('success', '删除成功');
    res.send({'bool':true, 'msg': '删除成功'})
    // res.redirect('/');
  });
}

module.exports = DoDelete;
