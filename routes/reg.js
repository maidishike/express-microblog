var express = require('express');
var router = express.Router();

router.get('/reg', function(req, res, next){
  // res.render('reg', {title: "立即注册"});
  res.send('sdfdfds')
});

module.exports = router;
