'use strict';

angular.module('myApp').factory('AuthService' ,
  function ($rootScope, $http, $location) {

        $rootScope.lineups2 = ['Jarred', 'Jacob', 'Johna!'];
        $rootScope.storesAvailable = ['BestBuy', 'Kmart', 'Target', 'Zehrs'];
        $rootScope.peopleLine = ['Marcus', 'Dom', 'Brain'];
        $rootScope.lineNumber = [1, 2, 3];


        return ({
          loginExample2: loginExample2,
          RegisterExample: RegisterExample,
          RegisterExample4: RegisterExample4,
          LoginExample3: LoginExample3,
          logout: logout,
          confirm: confirm
        });



    function loginExample2(email, password){

        console.log('email' + email);
        console.log('password' + password);

        $http.post('/login', {email : email, password : password} )
           .success(function( data) {
              console.log (data);
              $location.path('/profile');

              console.log(data.user.local);
              console.log(data.user.local.email);
              console.log(data.user.local.password);

              $rootScope.userdata = data;
              //Its refered to as local because its stored in the database as local:
              $rootScope.userInfo= data.user.local;

              $rootScope.userEmail = data.user.local.email;

              $rootScope.userPassword = data.user.local.password;


              }, function(posts) {});

    }


    function RegisterExample(email, password, fname, lname){

          console.log('firstname' + email);
          console.log('lastname' + password);

            $http.post('/signup', {email : email, password : password } )
            .success(function( data) {
              console.log (data);
              $location.path('/profile');
              console.log(data.user.local);
              console.log(data.user.local.email);
              console.log(data.user.local.password);

              $rootScope.userdata = data;

              $rootScope.userName = data.user.local;
              console.log('This is the username in $rootScope: ' + $scope.userName);

              }, function(posts) {});

    }





    function RegisterExample4(fname, lname, email, password,  passwordConf){
          console.log('fname: ' + fname);
          console.log('lname: ' + lname);
          console.log('email: ' + email);
          console.log('password: ' + password);
          console.log('passwordConf: ' + passwordConf);

            $http.post('/signup22', { fname: fname, lname: lname, email : email, password : password, passwordConf: passwordConf } )
            .success(function( data) {
              console.log (data);
              $location.path('/profile');
              console.log(data.user_id);

              console.log(data.firstname);
              console.log(data.email);
              console.log(data.password);

              $rootScope.userdata = data;
              //Its refered to as local because its stored in the database as local:
            //  $rootScope.fullName= "data[0].firstname " + "data[0].lastname";

              $rootScope.fullName= data.firstname +" "+ data.lastname;

              $rootScope.userid= data._id;

              $rootScope.userEmail = data.email;

              $rootScope.userPassword = data.password;

              console.log('This is the userddname in $rootScope: ' + $rootScope.userName);

              }, function(posts) {});

    }


    function LoginExample3(email, password){
      console.log('email: ' + email);
      console.log('password: ' + password);


      $http.post('/login22999', {email : email, password : password} )
         .success(function( data) {
            console.log (data);

            console.log(data[0].firstname);
            console.log(data[0].email);
            console.log(data[0].password);

            $rootScope.userdata = data;
            //Its refered to as local because its stored in the database as local:
            $rootScope.fullName= data[0].firstname +" "+ data[0].lastname;

            $rootScope.userid= data[0]._id;

            $rootScope.userEmail = data[0].email;

            $rootScope.userPassword = data[0].password;

            $location.path('/profile');

            }, function(posts) {});
}


    function logout() {

          //  console.log("THIS IS USERDATA: " + $scope.userdata);

            $rootScope.userdata = null;

            $rootScope.useremail = null;
            $rootScope.username = null;
            $rootScope.userid = null;
            $rootScope.usertoken = null;

            $rootScope.userEmail = null;
            $rootScope.fullName = null;
            $rootScope.userid = null;
            $rootScope.userPassword = null;

            $http.get('/logout')
              // handle success
              .success(function (data) {
                console.log('LOGGED OUT!');
              })
              // handle error
              .error(function (data) {
                console.log('NOT LOGGED OUT!');

              });

            //console.log("THIS IS USERDATA AFTER ITS DELETED: " + $scope.userdata);

            $location.path('/home');


    }


  function confirm() {

      $http.get('/confirm-login')
      .success(function (data) {
                    if (data) {

              console.log("FFFFFFFFFFFFFFFFFFFFFFF"+data.username);
              console.log(data);

              $rootScope.userdata = data;

              $rootScope.useremail = data.facebook.email;
              $rootScope.fullName = data.facebook.name;
              $rootScope.userid = data.facebook.id;
              $rootScope.usertoken = data.facebook.token;

              console.log("email"+data.facebook.email);
              console.log("token"+data.facebook.token);

                  }
              else {
                console.log("Not logged in yet!");
              }
                          });
      }



//  $scope.lineups2.push('Dog');


$rootScope.chats = [{
  id: 0,
  name: 'Ben Sparrow',
  lastText: 'You on your way?',
  face: 'img/ben.png',
  distance: 20
}, {
  id: 1,
  name: 'Max Lynx',
  lastText: 'Hey, it\'s me',
  face: 'img/max.png',
  distance: 40
}, {
  id: 2,
  name: 'Adam Bradleyson',
  lastText: 'I should buy a boat',
  face: 'img/adam.jpg',
  distance: 30
}, {
  id: 3,
  name: 'Perry Governor',
  lastText: 'Look at my mukluks!',
  face: 'img/perry.png',
  distance: 10
}, {
  id: 4,
  name: 'Mike Harrington',
  lastText: 'This is wicked good ice cream.',
  face: 'img/mike.png',
  distance: 50
}];


    $rootScope.grabStorename = 'Walmart';

    var People = [
      {
        name: "Joe Watkins",
        position: "UX Developer",
        skills: "HTML CSS Javascript"
      },
      {
        name: "Jen Smithers",
        position: "Dev Ops",
        skills: "Alien Server Technology"
      },
      {
        name: "Paul Anderson",
        position: "Designer",
        skills: "UI & UX Design"
      },
      {
        name: "Samantha Barton",
        position: "Javascript Ninja",
        skills: "All things JS"
      }
    ];

    return People;
});
