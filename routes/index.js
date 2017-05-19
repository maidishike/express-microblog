var express = require('express');
const crypto = require('crypto');
var router = express.Router();
var User = require('../models/user');
var doReg = require('./doReg');
var doLogin = require('./doLogin');
var doLogout = require('./doLogout');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '首页',
    user: req.session.user
  });
});
router.get('/reg', function(req, res) {
  res.render('reg', {
    title: '注册',
    user: req.session.user
  });
});

router.post('/reg', doReg);

router.get('/login', function(req, res) {
  res.render('login', {
    title: '登录',
    user: req.session.user
  });
});
router.post('/login', doLogin);
router.get('/post', function(req, res) {
  res.render('post', {title: '发表'});
});
router.post('/post', function(req, res) {
});

router.get('/logout', doLogout);

module.exports = router;
