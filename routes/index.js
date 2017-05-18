var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
});
router.get('/reg', function(req, res) {
  res.render('reg', {'title': '注册'});
});
router.post('/reg', function(res, req) {
});
router.get('/login', function(res, req) {
  res.render('login', {title: '登录'});
});
router.get('/post', function(req, res) {
  res.render('post', {title: '发表'});
});
router.post('/post', function(req, res) {
});
router.get('/logout', function(req, res) {
});

module.exports = router;
