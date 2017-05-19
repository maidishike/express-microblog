// 登录
const crypto = require('crypto');
var User = require('../models/user');

function DoLogin (req, res) {
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');

  // 检查用户是否存在
  User.get(req.body.name, function(err, user) {
    if (!user) {
      req.flash('error', '用户不存在');
      return res.direct('/login'); //用户不存在
    }

    // 检查密码是否一致
    if (user.password != password) {
      req.flash('error', '密码错误');
      return res.redirect('/login'); // 密码错误
    }

    // 用户名密码都匹配

    req.session.user = user;
    req.flash('success', '登录成功');
    res.redirect('/');
  });
}

module.exports = DoLogin;
