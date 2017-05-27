const mongodb = require('./db');

function Comment (name, day, title, comment) {
  this.name = name;
  this.day = day;
  this.title = title;
  this.comment = comment;
}

module.exports = Comment;

Comment.prototype.save = function(callback) {
  var name = this.name,
      day = this.day,
      title = this.title,
      comment = this.comment;

  // 打开数据库
  mongodb.open((err, db) => {
    if (err) {
      return callback(err);
    }
    db.collection('posts', (err, collection) => {
      if (err) {
        mongodb.close();
        return callback(err)
      }

      // 通过用户名、时间、标题查找文档，并且把一条留言对象添加到comments数组里
      collection.update({
        name: name,
        'time.day': day,
        title: title
      }, {
        $push: {'comments': comment}
      }, (err) => {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
}
