const crypto = require('crypto');
const User = require('../models/user');
function ChangePwd (req, res) {
  res.render('change-pwd', {
    title: '修改密码',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString(),
    pathname: ''
  });
}

function DoChangePwd (req, res) {
  var curUser = req.session.user,
      name = curUser.name,
      password = curUser.password;
  var md5 = crypto.createHash('md5'),
      oldPwd = md5.update(req.body.password).digest('hex'),
      md5_new = crypto.createHash('md5'),
      newPwd = md5_new.update(req.body.newPwd).digest('hex');
  if (password != oldPwd) {
    req.flash('error', '原密码错误');
    return res.redirect('back');
  }
  User.changePwd(name, newPwd, (err) => {
    if (err) {
      req.flash('error', err);
      return res.redirect('back');
    }
    req.session.user = null;
    req.flash('success', '修改成功');
    return res.redirect('/login');
  });
}

module.exports = {
  ChangePwd,
  DoChangePwd
};
