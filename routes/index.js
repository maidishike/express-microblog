var express = require('express');
const crypto = require('crypto');
const url = require('url');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var doReg = require('./doReg');
var doLogin = require('./doLogin');
var doLogout = require('./doLogout');
var doPost = require('./doPost');
var doUpload = require('./doUpload');
var doUView = require('./doUView');
var DoTView = require('./doTView');
var doDelete = require('./doDelete');
var doEdit = require('./doEdit');
var doComment =  require('./doComment');
var userInfo =  require('./users');
/* GET home page. */

router.get('/', function(req, res, next) {
  var pathname = url.parse(req.url).pathname;
  var page = req.query.p ? parseInt(req.query.p) : 1;
  Post.getTen(null, page, function(err, posts, total) {
    if (err) {
      posts = [];
    }
    res.render('index', {
      title: '首页',
      user: req.session.user,
      posts: posts,
      page: page,
      isFirstPage: (page - 1) == 0,
      isLastPage: ((page -1 ) * 10 + posts.length) == total,
      success: req.flash('success').toString(),
      error: req.flash('error').toString(),
      pathname: pathname
    });
  })

});

router.get('/reg', checkNotLogin);
router.get('/reg', function(req, res) {
  var pathname = url.parse(req.url).pathname;
  res.render('reg', {
    title: '注册',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString(),
    pathname: pathname
  });
});

// router.post('/reg', checkLogin);
router.post('/reg', doReg);

router.get('/login', checkNotLogin);
router.get('/login', function(req, res) {
  var pathname = url.parse(req.url).pathname;
  res.render('login', {
    title: '登录',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString(),
    pathname: pathname
  });
});

// router.post('/login', checkNotLogin);
router.post('/login', doLogin);

router.get('/post', checkLogin);
router.get('/post', function(req, res) {
  var pathname = url.parse(req.url).pathname;
  res.render('post', {
    title: '发表',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString(),
    pathname: pathname
  });
});

router.post('/post', checkLogin);
router.post('/post', doPost);

router.get('/logout', checkLogin);
router.get('/logout', doLogout);

// 上传页面
router.get('/upload', checkLogin)
router.get('/upload', function(req, res) {
  res.render('upload', {
    title: '上传图片',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.post('/upload', doUpload);

// 获取用户信息
router.get('/u/:name', userInfo.doViewUserInfo);

// 查看该作者的所有博客
router.get('/u/:name/articles', doUView);

// 查看用户所有评论


// 查看某篇博客
router.get('/u/:name/:day/:title', DoTView)


// 编辑某篇文章
router.get('/edit/:name/:day/:title', checkLogin);
router.get('/edit/:name/:day/:title', doEdit.DoEdit);

// 编辑某篇文章
router.post('/edit/:name/:day/:title', checkLogin);
router.post('/edit/:name/:day/:title', doEdit.DoUpdate);
// 删除某篇文章
router.get('/remove/:name/:day/:title', checkLogin);
router.get('/remove/:name/:day/:title', doDelete);

// 新增评论
router.post('/u/:name/:day/:title', doComment);

// 修改密码
router.get('/changePwd', (req, res) => {
  res.render('change-pwd', {
    title: '修改密码',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString(),
    pathname: ''
  });
});

// 判断是否登录
function checkLogin (req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

// 判断是否已经登录
function checkNotLogin (req, res, next) {
  if (req.session.user) {
    return res.redirect('back'); // 返回之前的页面
  }
  next();
}
module.exports = router;
