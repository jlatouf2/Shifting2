//var express = require('express');
//var app = express();
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;
var fs = require('fs');
var Store   = require('./config/storelocation');
var Storeline = require('./config/storeline.js')
var Track = require('./config/trackPosition.js')

var PeopleLine = require('./config/peopleline.js')
var UserStuff = require('./config/userinfo.js');

app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.json());

// required for passport
//app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret

app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



      // 1) ADD REQUIRE MONGOOSE:
      var mongoose = require('mongoose');

      // 2) CONNECT MONGOOSE
      mongoose.connect('mongodb://localhost/myappANG' , { useMongoClient: true });
      //  mongoose.connect('mongodb://localhost/advisorDemoTestDB', { useMongoClient: true })

      // 3) SIMPLE CHECK TO SEE IF CONNECTED TO DB
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function() {
        // we're connected!
        console.log('Connected to DB!');
      });

      //sdfsd
      //This allows the code to work [ie. This is like the code is written in here.]
      require('./config/passport')(passport); // pass passport for configuration

      require('./routes/routes.js')(app, passport);







      //THIS IS THE SOCKET.IO CODE:

      io.on('connection', function(socket){
       io.sockets.emit('broadcast',{ description:' clients connected!'});


      //Use socket.on the get something from front end:
       socket.on('clientEvent', function () {
      console.log('worked')
                   });


      socket.on('passInfo', function () {
      console.log('this worked!')
      socket.emit('passInfoBack', { description: 'A custom event named testerEvent!'});
      //	socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
        });


      });


      //curl -X POST  http://localhost:3000/userData
      //curl -X POST -H 'Content-Type: application/json' -d '{"email":"davidwalshr","password":"fsomethingt", "username": "John", "passwordConf": "Bobbyt"}' http://localhost:3000/userData


      app.post('/signup22', function (req, res, next) {
        console.log('worked');

            if (req.body.password !== req.body.passwordConf) {
                var err = new Error('Passwords do not match.');
                err.status = 400;
                res.send("passwords dont match");
                return next(err);
              }

            if (req.body.email &&
              req.body.fname &&
              req.body.lname &&
              req.body.password &&
              req.body.passwordConf) {


              var userData = {
                email: req.body.email,
                firstname: req.body.fname,
                lastname: req.body.lname,
                password: req.body.password,
                passwordConf: req.body.passwordConf,
              }
              //use schema.create to insert data into the db
              UserStuff.create(userData, function (err, user) {
                if (err) {
                  return next(err)
                } else {
                  res.send(user)
                //  return res.redirect('/profile');
                }
              });


            }

      });

      /************NOTE: LOGIN FUNCTION: ******************/

      //curl -X POST  http://localhost:3000/login22999
//curl -X POST -H 'Content-Type: application/json' -d '{"email":"jlatouf23333@gmail.com", "password":"jarredl"}' http://localhost:3000/login22999
      app.post('/login22999', function (req, res,  next) {
        var password;
        console.log("email: " + req.body.email);
        console.log("password: " + req.body.password);

          UserStuff.find({email: req.body.email}
            ,function(err, user) {
              if (err)  {return next(err)}

            if (!user) { res.status(201).json(posts)}
            //console.log(user[0].password);
            console.log("Database Password: " + user[0].password);

/*
            if (user[0].password == req.body.password ) {
              console.log('correct');
            }  else {
              console.log('Wrong');
            }
*/
console.log("Password: " + req.body.password);

              let hash = req.body.password;
              // Store hash in database
            //  console.log(hash);

            /*    NOTE:   THIS IS A WEIRD FUNCTION, YOU HAVE TO JUST
              HAVE TO PLAY WITH IT!!!!!
            */


              // Load hash from your password DB.
              bcrypt.compare(hash, user[0].password, function(err, result) {
                if (result === true) {
                  console.log("passwords  match");

                res.send(user);
               } else {
                // Passwords don't match
                console.log("passwords dont match");
              //  res.send(user);
              }
            });



            })
      })

//              res.status(201).json(posts)

      //curl -X POST  http://localhost:3000/login22
      //curl -X POST -H 'Content-Type: application/json' -d '{"email":"davidwalshr","password":"fsomethingt", "username": "John", "passwordConf": "Bobbyt"}' http://localhost:3000/login22
      var bcrypt = require('bcrypt');


/*




bcrypt.compare(req.body.password, user[0].password, function (err, result) {
  if (result === true) {
    console.log("blue");
    res.send(user);
    //  res.redirect('/');

    return next(null, user);

  } else {
    console.log("white");
    return next();
    process.exit();


    }
  })


app.post('/login22', function (req, res, err, next) {
  console.log('walking1');
  console.log(req.body.email);
  console.log(req.body.password);

  if (req.body.email &&
    req.body.password) {
      console.log('walking2');



      UserStuff.find({  })
        .exec(function (err, password, user) {

          res.send(posts)


             //res.json(201, post)
          console.log(posts);
          console.log('worked')

      });



  }
});

TAKE ALL THE DATA AND PUT IT INSIDE A FUNCTION
-ADD THE FINDONE (EMAIL) INTO IT...


if (user) {
    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
} else {



if (err)
    return done(err);

// if no user is found, return the message
if (!user)
    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

// if the user is found but the password is wrong
if (!user.validPassword(password))
    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

// all is well, return successful user
return done(null, user);


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

*/


        //curl -X POST localhost:3000/blue


        //curl -X GET localhost:3000/findDate
        //curl -X POST -i -H "Content-type: application/json" -c cookies.txt -X POST http://localhost:3000/api/posts -d '
        //curl -v -H "Content-Type: application/json" -X POST --data "{\"username\":\"dickeyxxx\", \"body\":\"node rules!\"}" localhost:3000/api/posts
        //grunt curl -X POST localhost:3000/blue
        //curl -X POST -H 'Content-Type: application/json' -d '{"email":"davidwalsh","password":"something"}' http://localhost:3000/signup

        //curl -X POST -F 'username=davidwalsh22' -F 'password=something' http://localhost:3000/signup
        //curl -X POST -F 'email=davidwalsh' -F 'password=something' http://localhost:3000/login


        //curl -X POST -F 'username=davidwalsh' http://localhost:3000/posted



        //STORELOCATION DATA:

        //curl -X POST -H 'Content-Type: application/json' -d '{"store":"Zehrs"}' http://localhost:3000/storePostalcode

        app.post('/addStore', function (req, res, next) {
                  var store = new Store({
                  store: req.body.store,
                  postal: req.body.postal,
                  latitude: req.body.latitude,
                  longitude: req.body.longitude,

                  Adminpassword: req.body.Adminpassword

                  })

                  store.save(function (err, post) {
                    if (err) { return next(err) }
                   res.json(201, post)
                console.log(post);
                console.log('worked')
                })
        })

        //Adds an additional line to the the front end table:
        app.post('/addLinetoTable', function (req, res, next) {
          var storeline = new Storeline({
            store: req.body.store,
            line: req.body.line,
            Adminpassword: req.body.Adminpassword

            })

            storeline.save(function (err, post) {
              if (err) { return next(err) }

//SENDS THE DATA BACK SO THAT IT CAN UPDATE THE TABLE IN ONE FLOW:
          Storeline.find( )
            .exec(function(err, posts) {
              if (err) { return next(err) }

          res.send(posts)


             //res.json(201, post)
          console.log(posts);
          console.log('worked')
          })
        })
      })



    //  userModel.count({name: "sam"}).exec(); //if you are using promise


      //curl -X POST  http://localhost:3000/addLine1
/*
TestModel.find({$and: [{_id: id}, {name: 'foo'}]}, function (err, doc){
    //
});

*/

//THIS WORKED!!

    app.post('/addLine1', function (req, res, next) {

            Storeline.count({ $and: [{store: req.body.store}, {line:1}]}   )
              .exec(function(err, count) {
                  if (err) { return next(err) }

               console.log( "Number of users:", count );
              if (count == 1) {
                console.log('fcn ended b/c its in table');
            } else {

          //THIS WILL RUN IF THE VALUE OF 1 IS NOT IN DB:

                var storeline = new Storeline({
                store: req.body.store,
                line: req.body.line,
                Adminpassword: req.body.Adminpassword

                })

                storeline.save(function (err, post) {
                  if (err) { return next(err) }
              res.send(post)

            })

          }

    })
  })




  app.post('/addLine2', function (req, res, next) {

      Storeline.count({$and: [{store: req.body.store}, {line:2}]})
        .exec(function(err, count) {
            if (err) { return next(err) }

           console.log( "Number of users:", count );
          if (count == 1) {
            console.log('fcn ended b/c its in table');
        } else {

          //THIS WILL RUN IF THE VALUE OF 1 IS NOT IN DB:

          var storeline = new Storeline({
          store: req.body.store,
          line: req.body.line,
          Adminpassword: req.body.Adminpassword

          })

          storeline.save(function (err, post) {
            if (err) { return next(err) }
        res.send(post)

      })

    }

  })
})



app.post('/addLine3', function (req, res, next) {

        Storeline.count({$and: [{store: req.body.store}, {line:3}]})
        .exec(function(err, count) {
          if (err) { return next(err) }

         console.log( "Number of users:", count );
        if (count == 1) {
          console.log('fcn ended b/c its in table');
          } else {

        //THIS WILL RUN IF THE VALUE OF 1 IS NOT IN DB:

          var storeline = new Storeline({
          store: req.body.store,
          line: req.body.line,
          Adminpassword: req.body.Adminpassword

          })

          storeline.save(function (err, post) {
            if (err) { return next(err) }
        res.send(post)

      })

      }

  })
})



app.post('/addLine4', function (req, res, next) {

      Storeline.count({$and: [{store: req.body.store}, {line:4}]})
      .exec(function(err, count) {
      if (err) { return next(err) }

       console.log( "Number of users:", count );
      if (count == 1) {
        console.log('fcn ended b/c its in table');
    } else {


        var storeline = new Storeline({
        store: req.body.store,
        line: req.body.line,
        Adminpassword: req.body.Adminpassword

        })

        storeline.save(function (err, post) {
          if (err) { return next(err) }
      res.send(post)

    })

    }

  })
})



app.post('/addLine5', function (req, res, next) {

      Storeline.count({$and: [{store: req.body.store}, {line:5}]})
      .exec(function(err, count) {
      if (err) { return next(err) }

         console.log( "Number of users:", count );
        if (count == 1) {
          console.log('fcn ended b/c its in table');
        } else {

          //THIS WILL RUN IF THE VALUE OF 1 IS NOT IN DB:

        var storeline = new Storeline({
        store: req.body.store,
        line: req.body.line,
        Adminpassword: req.body.Adminpassword

        })

        storeline.save(function (err, post) {
          if (err) { return next(err) }
      res.send(post)

    })

    }

  })
})




/*
      app.post('/addLinetoTable', function (req, res, next) {


      Storeline.count({}, function( err, count){
          console.log( "Number of users:", count );
      })
        THEN ADD THE COUNT TO THE LINE VARIABLE AND IT MIGHT WORK!
        var storeline = new Storeline({
          store: req.body.store,
          line: req.body.line,
          Adminpassword: req.body.Adminpassword

          })

          storeline.save(function (err, post) {
            if (err) { return next(err) }
        Storeline.find( )
          .exec(function(err, posts) {
            if (err) { return next(err) }

        res.send(posts)


           //res.json(201, post)
        console.log(posts);
        console.log('worked')
        })
      })
    })
*/


        //curl -X POST  http://localhost:3000/storeName

        app.post('/storeName', function (req, res, next) {
            Store.find( {postal: req.body.postal})
              .exec(function(err, posts) {
                if (err) { return next(err) }
                   var black = JSON.stringify(posts);

            res.send(posts)
            console.log("Data is returned name:: " + posts[0]._id);
            console.log("Data is returned name:: " + posts[0].store);
            console.log("Data is returned name:: " + posts._id);

            //res.json(posts)
            	console.log(black );
            	console.log(posts );

              })
        })



//Find line where $Adminpassword = Adminpassword
    app.post('/checkLineAdmin', function (req, res, next) {
      var bob = req.body.store;
      var bob2 = req.body.Adminpassword;

      console.log("Store: "+ bob);
      console.log("Admin: "+ bob2);

      if(bob2 !== undefined) {
//            Store.find( {store: req.body.store}).where({Adminpassword: bob})
//  THIS WORKS, ITS JUST THAT WHEN YOU DONT HAVE TOKEN [ITS SET TO NULL WHEN NOT LOGGED IN]
//IT MATCHES THE QUEREY B/C IT FINDS A OBJECT WITH THE STORE NAME AND TOKEN=NULL
        Store.find( {store: req.body.store, Adminpassword: req.body.Adminpassword})
          .exec(function(err, posts) {
            if (err) { return next(err) }
            //   var black = JSON.stringify(posts);

        res.send(posts)
        console.log("kdsjflksdj!");

          console.log(posts );
//Either passes no data back: store that doesn't have Adminpassword or passes store with Adminpassword
          })
      } else{
        console.log("Adminpassword was equal to undefined so query did not run!");
      }
    })



//Find $store where $Adminpassword = Adminpassword
        app.post('/checkStoreAdmin', function (req, res, next) {
          var bob = req.body.store;
          var bob2 = req.body.Adminpassword;

          console.log("Store: "+ bob);
          console.log("Admin: "+ bob2);

          if(bob2 !== undefined) {
//            Store.find( {store: req.body.store}).where({Adminpassword: bob})
//  THIS WORKS, ITS JUST THAT WHEN YOU DONT HAVE TOKEN [ITS SET TO NULL WHEN NOT LOGGED IN]
//IT MATCHES THE QUEREY B/C IT FINDS A OBJECT WITH THE STORE NAME AND TOKEN=NULL
            Store.find( {store: req.body.store, Adminpassword: req.body.Adminpassword})
              .exec(function(err, posts) {
                if (err) { return next(err) }
                //   var black = JSON.stringify(posts);

            res.send(posts)

              console.log(posts );
//Either passes no data back: store that doesn't have Adminpassword or passes store with Adminpassword
              })
          } else{
            console.log("Adminpassword was equal to undefined so query did not run!");
          }
        })



        //Find $store where $Adminpassword = Adminpassword
          app.post('/checkPeopleAdmin', function (req, res, next) {
            var bob = req.body.store;
            var bob2 = req.body.Adminpassword;

            console.log("Store: "+ bob);
            console.log("Admin: "+ bob2);

            if(bob2 !== undefined) {

              Store.find( {store: req.body.store, Adminpassword: req.body.Adminpassword})
                .exec(function(err, posts) {
                  if (err) { return next(err) }

              res.send(posts)
                console.log(posts);

                })
            } else{
              console.log("Adminpassword was equal to undefined so query did not run!");
            }
          })





      //      COUNT THE TOTAL NUMBER OF LINES IN DB:
      //curl -X POST  http://localhost:3000/numberofLines

          app.post('/numberofLines', function (req, res, next) {
                /*
                Storeline.count({store: 'Bestbuy'}, function( err, count){
                    console.log( "Number of users:", count );
                })
                */

                Storeline.find({store: req.body.store}, function( err, count){
                    console.log( "Number of users:", count );
                    res.send(count)

                  })


            })


        //curl -X POST  http://localhost:3000/peopleNames

        app.post('/peopleNames', function (req, res, next) {
            User.find()
              .exec(function(err, posts) {
                if (err) { return next(err) }
               res.send(posts)
            //    console.log("Data is returned name:: " + posts[0]._id);
            	console.log(posts );

              })
        })

//req.body.store

//curl -X POST  http://localhost:3000/peopleNames2

        app.post('/peopleNames2', function (req, res, next) {
            User.find({"local.email": "dan"})
              .exec(function(err, posts) {
                if (err) {

              res.send(posts)
           //    console.log("Data is returned name:: " + posts[0]._id);
             console.log(posts );

            //  return next(err)
            }
               res.send(posts)
            //    console.log("Data is returned name:: " + posts[0]._id);
              console.log(posts );

              })
        })


        app.post('/peopleNames3', function (req, res, next) {
            User.find()
              .exec(function(err, posts) {
                if (err) {

              res.send(posts)
           //    console.log("Data is returned name:: " + posts[0]._id);
             console.log(posts );

            //  return next(err)
            }
               res.send(posts)
            //    console.log("Data is returned name:: " + posts[0]._id);
              console.log(posts );

              })
        })





        //curl -X POST  http://localhost:3000/checkStore

        app.post('/checkStore', function (req, res, next) {
            Store.find({store: 'Bestbuy'})

              .exec(function(err, posts) {
                if (err) { return next(err) }
                   var black = JSON.stringify(posts);

            res.send(posts)
            	console.log(posts );

              })
        })



        //curl -X POST  http://localhost:3000/deleteStore

        app.post('/deleteStore', function (req, res, next) {
          //  Store.remove ({ store: req.body.store})
        //Info.remove ({ name : "Jacob Latouf22"})
        Store.remove ({ store: "Black"})

          .sort('-date')
          .exec(function(err, posts) {
            if (err) { return next(err) }
            //   var black = JSON.stringify(posts);

      //  res.send(black)
        //res.json(posts)
        	console.log(posts );

          })
        })

        //curl -X POST  http://localhost:3000/deleteStore

        app.post('/deleteselectedStore', function (req, res, next) {
              //  Store.remove ({ store: req.body.store})
            //Info.remove ({ name : "Jacob Latouf22"})
                  /*
                var bob = req.body.store;
                var bob2 = req.body.Adminpassword;

                console.log("Store: "+ bob);
                console.log("Admin: "+ bob2);

                if(bob2 !== undefined) {
                Store.find( {store: req.body.store, Adminpassword: req.body.Adminpassword})

                    Store.remove ({ store: req.body.store})
                      .exec(function(err, posts) {
                  if (err) { return next(err) }
                  //   var black = JSON.stringify(posts);

                  //res.send(black)
                  //res.json(posts)
                console.log(posts );

                      })


                Track.find()
                 // .sort('-date')
                  .exec(function(err, posts) {
                    if (err) { return next(err) }
                    res.send(posts)
                  console.log(posts );

                  })


                  */

              //CHECK TO SEE IF THE ADMIN IS VALID:

              Store.remove({store: req.body.store}, function(err,removed) {

                    //res.send(black)
                    //res.json(posts)
                  console.log("Worked" );
                  //res.send(removed)


                  Store.find()
                   // .sort('-date')
                  .exec(function(err, posts) {
                  if (err) { return next(err) }
                  res.send(posts)
                  console.log(posts);

                    })


              });

        })




        //curl -X POST  http://localhost:3000/deleteStore

        app.post('/deleteselectedLine', function (req, res, next) {
              //CHECK TO SEE IF THE ADMIN IS VALID:

              Storeline.remove({line: req.body.line}, function(err,removed) {
                  console.log("Worked" );

                  Storeline.find()
                   // .sort('-date')
                  .exec(function(err, posts) {
                  if (err) { return next(err) }
                  res.send(posts)
                  console.log(posts);

                    })
              });

        })


        //curl -X POST  http://localhost:3000/poststoreinfo


        app.post('/poststoreinfo', function (req, res, next) {
          var storeline = new Storeline({
        			    post_id: '1',
        			    linein: 'Line1',
        				line1 : '1',
        				line2 : '0',
        				line3 : '0',
        				store: 'Walmart'


          })
          storeline.save(function (err, post) {
            if (err) { return next(err) }


        res.status(201).json(post);
        	console.log(post);

// res.json(status, obj): Use res.status(status).json(obj)
//res.status(400).json(json_response);

          })
        })






        //MONGODB INFO

      // grab the things we need
      var mongoose = require('mongoose');
      var Schema = mongoose.Schema;

      // create a schema
      var userSchema = new Schema({
        name: String,
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        admin: Boolean,
        location: String,
        date: { type: Date },

        meta: {
          age: Number,
          website: String
        },
        created_at: Date,
        updated_at: Date
      });


      // the schema is useless so far
      // we need to create a model using it
      var Usertwo = mongoose.model('Usertwo', userSchema);


      var User   = require('./config/user');

      //curl -X POST localhost:3000/poststoreinfo

      app.post('/poststoreinfo', function (req, res, next) {
        var newUser2 = Usertwo({
          name: 'Jacob Bobby44444',
          username: 'Jacob4343343',
          password: 'password15',
          date: '12/10/1990',
          admin: false
        });

        newUser2.save(function (err, post) {
          if (err) {
         return next(err) ;
      }
          //res.json(201, post);
      	console.log(post);

        });
      });




          //FACEBOOK LOGIN

      app.get('/auth/facebook', passport.authenticate('facebook', {scope:'email'}));


      app.get('/auth/facebook/callback',
              passport.authenticate('facebook', { failureRedirect: '/#/login' }),
              function(req, res, user) {

              //    user = req.data
                //  console.log("THIS IS THE DATA THAT WAS SENT BACK............................." + user)
                //res.json(201, user);

                user : req.user // get the user out of session and pass to template
      sess=req.session;
      sess.data=req.user;
      console.log("THIS IS THE USER STUFF"  + sess);
      console.log("THIS IS THE USER STUFF"  + sess.data);
      console.log("THIS IS THE USER _id"  + sess.data.facebook._id);
      console.log("THIS IS THE USER email"  + sess.data.facebook.email);
      console.log("THIS IS THE USER TOKEN"  + sess.data.facebook.token);
      console.log("THIS IS THE USER PHOTOS"  + sess.data.facebook.photos);


                  res.redirect('/#/examples');
              //    app.get('/confirm-login');


              });


              /*
               * to coordinate facebook login with regular login using passport (determine if use is logged in already)
               * just make sure that facebook login button checks for something like userId or name before going to the
               * href ="facebook/login" part of the link.....
               * THIS WILL WORK!
               */

      passport.use(new FacebookStrategy({
                  clientID: '1508673329451547',
                  clientSecret: 'c42fb352fa1a185823ddd34f6267551c',
                  callbackURL: "http://localhost:3000/auth/facebook/callback",
                  profileFields: ['id', 'displayName', 'link',  'photos', 'emails']

              },
              function(accessToken, refreshToken, profile, done) {
                  process.nextTick(function () {
                //     User.findOne({'facebook.id' : profile.id, 'facebook.name' : profile.name, 'facebook.email' : profile.email}, function (err, user) {
               User.findOne({'facebook.email' : profile.emails[0].value}, function (err, user) {

                      //    console.log(profile);
                        console.log(profile.emails[0].value);

                          if (err) return done(err);
                             console.log('ERROR');

                          if (user) {
                            console.log('FOUND');
                            console.log(user);

                           return   done(null, user);
                      //     console.log("this is newUser: " + newUser)

                          } else {
                            console.log('NEW');

                              var newUser = new User();

                            //  newUser.username = profile.emails[0].value;
                              newUser.facebook.token = accessToken;
                              //newUser.facebookprofileUrl = profile.profileUrl;
                              newUser.facebook.email = profile.emails[0].value;
                              newUser.facebook.id = profile.id;
                              newUser.facebook.name = profile.displayName;
                      //        newUser.facebook.name = profile.displayName;
                              newUser.facebook.photos = profile.photos;
                              newUser.facebook.password = profile.password;
                              console.log('PASSWORD' + profile.password)

                              newUser.facebook.img = "http://graph.facebook.com/" +profile.id+ "/picture?type=square";

                                  //DONT HAVE TO SAVE AS IMAGE, IT JUST NEEDS TO BE A STRING:
                          //    var imgPath = '/Users/jarredlatouf/Desktop/Ang/img/Me.jpg';
                              var faceImage =  "http://graph.facebook.com/" +profile.id+ "/picture?type=square";

                            // newUser.facebook.img.data = fs.readFileSync(faceImage);
                          //   newUser.facebook.img.contentType = 'image/png';

                            //  newUser.firstname =profile.name.givenName;
                            //  newUser.lastname=profile.name.familyName;
                                             console.log('ACCESSTOKEN' + accessToken)
                                         console.log('EMAIL' + profile.emails[0].value)
                                         console.log('NAME' + profile.displayName)
                                         console.log('ID' + profile.id)
                                         console.log('PHOTOS1' + profile.photos[0])
                                      //   console.log('PHOTOS2' + profile[0].photos)
                                         console.log('PHOTOS3' + profile.photos[0].value)


                                            var bob = JSON.stringify(profile.photos)
                                                console.log("changed into JSON: " + bob);
                                                console.log("changed into JSON: " + bob.value);
                                                var black =  "http://graph.facebook.com/" +profile.id+ "/picture?type=square";
                                                console.log('PHOTOS3 were OK: ' + black)

            	  /*

                http://graph.facebook.com/" + facebookId + "/picture?type=square For instance: http://graph.facebook.com/67563683055/picture?type=square


            	   * IF SOMETHING IS WRONG: TURN ALL newUser back to user
            	   */
                                 newUser.save(function(err) {
                              if (err)
                                  throw err;

                              // if successful, return the new user
                              return done(null, newUser);

                          });
                          }
                      });
                  });
              }
          ));


          app.get('/confirm-login', function (req, res) {
          	user = req.user
          	res.send(user);

            });


              //LOGOUT

      app.get('/logout', function(req, res, sess) {
            req.logout();
            sess.destroy
            //       delete req.sess; // delete the password from the session
          //  req.sess = user;  //refresh the session value
          console.log("THIS IS THE USER STUFF"  + sess.data);
            var data;
              res.send(data)
          //  res.redirect('/');
        });



          //DATABASE POSTS

      //curl -X POST localhost:3000/posted
      app.post('/posted', function (req, res, next) {
        var post = new User({
          email: 'jlatouf2',
          password: 'password'
        })
        post.save(function (err, post) {
          if (err) { return next(err) }
          res.json(201, post)
        })
      })


      //curl -X POST localhost:3000/findStuff01

      app.post('/findStuff01', function (req, res, next) {
        // get all the users
        User.find({}, function(err, users) {
          if (err) throw err;

          // object of all the users
          console.log(users);
        });
      });

      //curl -X POST localhost:3000/postname

      app.post('/postname', function (req, res, next) {
        var newUser2 = Usertwo({
          name: 'Johna',
          username: 'Britt',
          password: 'pass',
          date: '12/10/1991',
          admin: false
        });

        newUser2.save(function (err, post) {
          if (err) {
         return next(err) ;
      }
          //res.json(201, post);
      	console.log(post);

        });
      });


      //curl -X POST localhost:3000/findDate

      app.post('/findDate', function (req, res, next) {
      //  Post.find({username: 'DeclanProud'}

        Usertwo.find({date: '12/10/1990'}, function(err, users) {
          if (err) throw err;

          // object of all the users
          console.log(users);

          res.send(users);
      //    res.json(201, post)

        });
      });

      /*
      app.post('/findDate23', function (req, res, next) {
          //  Post.find({username: 'DeclanProud'}
          //  console.log(req.body.date);
            Usertwo.find({date: {$gt : '12/10/1993'}}, function(err, users) {
          //    User2.find({ "LatestMark": {$gt : '12/10/1993'} function(err, users) {

            if (err) throw err;

            // object of all the users
            console.log(users);
          });
      });

      */



      app.get('/getCords', function (req, res, next) {
          Track.find()
           // .sort('-date')
            .exec(function(err, posts) {
              if (err) { return next(err) }
              res.send(posts)
          	console.log(posts );

            })
      })



      app.post('/postCoordinates', function (req, res, next) {
            var track = new Track({
            username: req.body.username,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            distance: req.body.distance,
          //  email: req.body.email,

            })
            track.save(function (err, post) {
              if (err) { return next(err) }
              res.json(201, post)
          console.log('worked')
            })
      })



      //EXAMPLE PAGE POSTS
      app.post('/blue', function(req, res, data) {
          console.log('Works');
          console.log(data);

          myObj = { "name":"John", "age":30, "car":null };
          res.send(myObj);
          //res.send(myObj.name);
      });

      //curl -X POST -H 'Content-Type: application/json' -d '{"email":"davidwalsh","password":"something"}' http://localhost:3000/red
      //This obtains the $scope.firstname:
      app.post('/red', function(req, res, data) {
          console.log(bob1 = req.body.email);
          console.log(bob2 = req.body.password);

          res.send(req.body.email);
          //res.send(myObj.name);
      });


      app.post('/orange', function(req, res, name) {
            //So you can send full JSON Data to backend and it will work, but has to be processed right.
          console.log("This is request object: " + req.body.name);
          myObj = { "name":"John", "age":30, "car":null };
          console.log("This is name: " + myObj.name);

          res.send(myObj);
      });


      // example schema
      var schema = new Schema({
          img: { data: Buffer, contentType: String }
      });

      // our model
      var A = mongoose.model('A', schema);



      //curl -X POST localhost:3000/peoplelineInfo

      app.post('/peoplelineInfo', function (req, res, next) {
        var newUser2 = PeopleLine({
          email : req.body.email,
          line: req.body.line,
          position: req.body.position,
          store: req.body.store,
          fullname : req.body.fullName,
          longitude: req.body.longitude,
          latitude: req.body.latitude,
          distance: req.body.distance

        });


        newUser2.save(function (err, post) {
          if (err) {
         return next(err) ;
      }
          //res.json(201, post);
      res.send(post);

      	console.log(post);

        });
      });


      app.post('/getPeoplefromDB', function (req, res, next) {
          PeopleLine.find()
           // .sort('-date')
            .exec(function(err, posts) {
              if (err) { return next(err) }
              res.send(posts)
          	console.log(posts );

            })
      })



      app.post('/peopleNames4', function (req, res, next) {
          UserStuff.find()
            .exec(function(err, posts) {
              if (err) {

            res.send(posts)
         //    console.log("Data is returned name:: " + posts[0]._id);
           console.log(posts );

          //  return next(err)
          }
             res.send(posts)
          //    console.log("Data is returned name:: " + posts[0]._id);
            console.log(posts );

            })
      })


      //curl -X POST localhost:3000/imageStuff

      app.post('/imageStuff', function(req, res, name) {
        var imgPath = '/Users/jarredlatouf/Desktop/Ang/img/Me.jpg';

          // store an img in binary in mongo
          var a = new A;
          a.img.data = fs.readFileSync(imgPath);
          a.img.contentType = 'image/png';
          a.save(function (err, a) {
            if (err) throw err;
          });
      });




      //curl -X POST  http://localhost:3000/deleteStore

      app.post('/deletePeopleLine', function (req, res, next) {
            //CHECK TO SEE IF THE ADMIN IS VALID:

            Storeline.remove({line: req.body.line}, function(err,removed) {
                console.log("Worked" );

                Storeline.find()
                 // .sort('-date')
                .exec(function(err, posts) {
                if (err) { return next(err) }
                res.send(posts)
                console.log(posts);

                  })
            });

      })



      //curl -X POST localhost:3000/imageGet2


      app.post('/imageGet2', function (req, res, next) {
/*
        var imgPath = '/Users/jarredlatouf/Desktop/Ang/img/Me.jpg';

        var a = new A;
        a.img.data = fs.readFileSync(imgPath);
        a.img.contentType = 'image/png';

        console.log('PHOTOS3' + profile.photos[0].value)

*/
        A.find()
        .exec(function(err, posts) {
          if (err) return next(err);
        //  res.contentType(doc.img.contentType);
        //  res.send(doc.img.data);
          console.log(posts);
          console.log(posts[0]._id);
          console.log(posts[0].img);
          console.log(posts[0].img.contentType);
          console.log(posts[0].img.data);

          //console.log(posts.img.contentType);

      //    console.log('PHOTOS3' + profile.photos[0].value)

        });
      });



      //SERVER INFORMATION
      app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '/client/index.html'));
      });

      http.listen(3000, function () {
        console.log('Example app listening on port 3000!');
      });
