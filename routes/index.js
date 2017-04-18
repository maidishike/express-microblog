var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/reg', function(req, res, next){
  res.render('reg', {title: "立即注册"});
});

module.exports = router;
