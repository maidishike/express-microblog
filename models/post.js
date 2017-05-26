const mongodb = require('./db');
const markdown = require('markdown').markdown;

function Post (name, title, post) {
  this.name = name;
  this.title = title;
  this.post = post;
}

module.exports = Post;

// 保存数据
Post.prototype.save = function(callback) {
  var date = new Date();

  // 存储各种时间格式，方便以后拓展
  var time = {
    date: date,
    year: date.getFullYear(),
    month: date.getFullYear() + '-' + (date.getMonth() + 1),
    day: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    minute: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  }

  // 要存入数据库的文档
  var post = {
    name: this.name,
    time: time,
    title: this.title,
    post: this.post,
    comments: [] // 评论留言
  }

  // 打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }

    // 读取数据集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // 插入数据
      collection.insert(post, {safe: true}, function(err) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
      })
    });
  });
}

// 读取文章及其他相关内容
Post.getAll = function(name, callback) {
  // 打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }

    // 读取post集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }

      var query = {};
      if (name) {
        query.name = name;
      }
      collection.find(query).sort({
        time: -1
      }).toArray(function(err, docs) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        docs.forEach(function(doc) {
          doc.post = markdown.toHTML(doc.post);
        });
        callback(null, docs);
      });
    });
  });
};

Post.getOne = function(name, day, title, callback) {
  // 打开数据库
  mongodb.open(function(err, db) {
    if(err){
      return callback(err);
    }
    // 读取post集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // 根据用户名，日期，文章名称进行查询
      collection.findOne({
        name: name,
        "time.day": day,
        title: title
      }, function(err, doc) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        // 解析markdown为html
        if (doc != null) {
          doc.post = markdown.toHTML(doc.post);
          doc.comments.forEach(function(comment) {
            comment.content = markdown.toHTML(comment.content);
          });
        }
        callback(null, doc); // 返回查询的一篇文章
      });
    });
  });
};

// 查看一篇文章
Post.edit = function(name, day, title, callback) {
  mongodb.open((err, db) => {
    if (err) {
      return callback(err);
    }
    // 读取post集合
    db.collection('posts', (err, collection) => {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.findOne({
        name: name,
        'time.day': day,
        title: title
      }, (err, doc) => {
        mongodb.close();
        if (err) {
          return callback(err)
        }
        callback(null, doc)
      });
    });
  });
}

// 更新一篇文章
Post.update = function(name, day, title, post, callback) {
  // 打开数据库
  mongodb.open((err, db) => {
    if (err) {
      return callback(err);
    }
    db.collection('posts', (err, collection) => {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // 读取posts
      collection.update({
        name: name,
        'time.day': day,
        title: title
      }, {
        $set: {'post': post}
      }, (err) => {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        console.log(3);
        callback(null);
      });
    });
  })
}

// 删除一篇文章
Post.remove = function(name, day, title, callback) {
  mongodb.open((err, db) => {
    if (err) {
      return callback(err);
    }
    // 读取post集合
    db.collection('posts', (err, collection) => {
      if (err) {
        mongodb.close();
        return callback(err);
      }

      // 根据用户名、日期和标题查找并删除一篇文章
      collection.remove({
        name: name,
        'time.day': day,
        title: title
      }, {w: 1}, (err) => {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
}
