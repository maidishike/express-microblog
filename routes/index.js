var express = require('express');
const crypto = require('crypto');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var doReg = require('./doReg');
var doLogin = require('./doLogin');
var doLogout = require('./doLogout');
var doPost = require('./doPost');
/* GET home page. */
router.get('/', function(req, res, next) {
  Post.get(null, function(err, posts) {
    if (err) {
      posts = [];
    }
    res.render('index', {
      title: '首页',
      user: req.session.user,
      posts: posts
    });
  })

});

router.get('/reg', checkNotLogin)
router.get('/reg', function(req, res) {
  res.render('reg', {
    title: '注册',
    user: req.session.user
  });
});

router.post('/reg', checkNotLogin);
router.post('/reg', doReg);

router.get('/login', checkNotLogin);
router.get('/login', function(req, res) {
  res.render('login', {
    title: '登录',
    user: req.session.user
  });
});

router.post('/login', checkNotLogin);
router.post('/login', doLogin);

router.get('/post', checkLogin);
router.get('/post', function(req, res) {
  res.render('post', {
    title: '发表',
    user: req.session.user
  });
});

router.post('/post', checkLogin);
router.post('/post', doPost);

router.get('/logout', checkLogin);
router.get('/logout', doLogout);

// 判断是否登录
function checkLogin (req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  }
  next();
}

// 判断是否已经登录
function checkNotLogin (req, res, next) {
  if (req.session.user) {
    res.redirect('back'); // 返回之前的页面
  }
  next();
}
module.exports = router;
