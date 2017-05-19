// 退出登录

function DoLogout (req, res) {
  req.session.user = null;
  req.flash('success', '退出成功');
  res.redirect('/');
}

module.exports = DoLogout;
