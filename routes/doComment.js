// 评论
var Comment = require('../models/comment');
function DoComment (req, res) {
  var curUser = req.session.user,
      date = new Date(),
      time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  if(!curUser){
    req.flash('error', '未登录');
    res.redirect('/login');
  }else {
    var comment = {
      name: curUser.name,
      time: time,
      content: req.body.content
    }
    var newComment = new Comment(req.params.name, req.params.day, req.params.title, comment);
    newComment.save((err) => {
      if (err) {
        req.flash('error', err);
        return res.redirect('back');
      }
      req.flash('success', '评论成功');
      res.redirect('back');
    });
  }

}

module.exports = DoComment;
