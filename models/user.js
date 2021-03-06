const mongodb = require('./db');

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
  this.avatar = user.avatar;
}

module.exports = User;

// 存储用户信息
User.prototype.save = function (callback) {
  // 存入的用户信息数据
  var user = {
    name: this.name,
    password: this.password,
    email: this.email,
    avatar: this.avatar
  };

  // 打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err); //返回错误信息
    }

    // 读取 users 集合
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err); // 返回错误信息
      }

      // 将用户插入到users集合
      collection.insert(user, {safe: true}, function(err, user) {
        mongodb.close();
        if (err) {
          return callback(err); // 返回错误信息
        }
        callback(null, user); // 成功 err为null 并返回存储后的用户文档
      });
    });
  });
};

User.get = function(name, callback) {
  // 打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    // 读取 users 集合
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err); // 返回错误信息
      }

      // 查找用户名(name键)值为name的一个文档

      collection.findOne({
        name: name
      }, function(err, user) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, user); //成功
      });
    });

  });
};

// 更新用户头像
User.upload = function(name, avatar, callback) {
 mongodb.open(function(err, db) {
   if (err) {
     return callback(err);
   }
   db.collection('users', function(err, collection) {
     if (err) {
       mongodb.close();
       return callback(err);
     }
     collection.update({
       'name': name
     }, {
       $set: {'avatar': avatar}
     }, (err) => {
       mongodb.close();
       if (err) {
         return callback(err);
       }
       callback(null);
     })
   });
 })
}

// 修改用户密码
User.changePwd = (name, newPwd, callback) => {
  mongodb.open((err, db) => {
    if (err) {
      return callback(err)
    }
    db.collection('users', (err, collection) => {
      collection.update({
        'name': name
      }, {
        $set: {'password': newPwd}
      }, (err) => {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null)
      });
    });
  })
};
