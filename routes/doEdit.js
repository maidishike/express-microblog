const Post = require('../models/post');

// 查看文章
function DoEdit (req, res) {
  var curUser = req.session.user;
  Post.edit(curUser.name, req.params.day, req.params.title, (err, post) =>{
    if (err) {
      req.flash('err', err);
      console.log(err);
      return res.redirect('back');
    }
    if (post == null) {
    return res.redirect('back');
    }
    res.render('edit', {
      title: '编辑',
      post: post,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString(),
      pathname: ''
    })
  });
}

// 更新文章
function DoUpdate (req, res) {
  var curUser = req.session.user;
  Post.update(curUser.name, req.params.day, req.params.title, req.body.post, (err) =>{
    var url = encodeURI('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title);
    if (err) {
      req.flash('error', err);
      return res.redirect(url);
    }
    req.flash('success', '修改成功');
    res.redirect(url);
  });
}
module.exports = {
  DoEdit,
  DoUpdate
}
