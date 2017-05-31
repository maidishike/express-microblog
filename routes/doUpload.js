var User = require('../models/user');

function DoUpload (req, res) {
  var username = req.body.name,
      avatar = req.files.avatar.name;
  User.upload(username, avatar, (err) => {
    if (err) {
      req.flash('error', err);
      return;
    }
    User.get(username, (err, user) => {
      if (err) {
        req.flash('error', err);
        return res.redirect('back');
      }
      req.session.user = user;
      req.flash('success', '上传成功');
      return res.redirect('back');
    });
  });
}

module.exports = DoUpload;
