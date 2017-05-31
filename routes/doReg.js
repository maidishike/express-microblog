// 注册
const crypto = require('crypto');
var User = require('../models/user');

function DoReg (req, res) {
  var name = req.body.name,
      password = req.body.password,
      password_re = req.body['password-repeat'];

  // 检验用户两次输入的密码是否一致
  if (password_re != password) {
    req.flash('error', '两次输入的密码不一致');
    return res.redirect('/reg'); //返回注册页
  };

  // 生成密码的md5值
  var md5 = crypto.createHash('md5');
      password = md5.update(req.body.password).digest('hex');

  var newUser = new User({
    name: req.body.name,
    password: password,
    email: req.body.email,
    avatar: 'user-icon.png'
  });

  // 检查用户是否存在
  User.get(newUser.name, function(err, user) {
    if (err) {
      req.flash('error', err);
      return res.send({'bool': false, 'error': err});
    };
    if (user) {
      req.flash('error', '用户已经存在');
      return res.send({'bool': false, 'error': '用户已经存在'});
    }

    // 如果不存在则新增用户
    newUser.save(function(err, user) {
      if (err) {
        req.flash('error', err);
        return res.send({'bool': false, 'error': err});
      }
      req.session.user = user[0]; //用户信息存入session中
      req.flash('success', '注册成功');
      return res.send({'bool': true, 'msg': '注册成功'}); // 注册成功
    });
  });
}

module.exports = DoReg;
