var Post = require('../models/post');

function DoUpload (req, res) {
  res.redirect('/upload');
}

module.exports = DoUpload;
