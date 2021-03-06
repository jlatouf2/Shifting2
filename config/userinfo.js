var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserStuff = new mongoose.Schema({
  email: {
    type: String,
    trim: true
  },
  firstname: {
    type: String,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  }
});


//authenticate input against database
UserStuff.statics.authenticate = function (email, password, callback) {
  UserStuff.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}


/*
//authenticate input against database
UserStuff.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserStuff.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});
*/

//hashing a password before saving it to the database
UserStuff.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


UserStuff.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.passwordConf, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.passwordConf = hash;
    next();
  })
});

var User = mongoose.model('userinfo', UserStuff);
module.exports = User;
