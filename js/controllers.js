angular.module('myApp').controller('firstController', ['$scope', '$location', '$http', '$rootScope', 'AuthService',
function($scope, $location, $http,   $rootScope, AuthService) {

    $scope.myStyle = {
      "background-color" : "coral"
    }




    $scope.submitForm = function(isValid) {

  // check to make sure the form is completely valid
  if (isValid) {
    alert('our form is amazing');
  }

};


    $scope.loginModal = function(){
    console.log("clicked");
      $("#myModal").modal("show");

    }

      $scope.email = "jlatouf23333@gmail.com"
      $scope.password = "jarredl"

    $scope.ServiceFunction5 = function () {
      console.log("clicked22");
      AuthService.LoginExample3($scope.email, $scope.password);
    };





        console.log($scope.lineups2);
        $scope.lineups2.push('Dog');


        console.log("THIS IS USERDATA AFTER ITS DELETED: " + $scope.userdata);

          //   $http.post('postedinfo', { username : $scope.SendUserData2, body: $scope.SendUserData3});


            $scope.socketData = function(){

            socket.emit('clientEvent', 'Sent an event from the client!');
          console.log("Pressed")
          }


              //Logout Function:

              $scope.logoutFunction = function(){
                AuthService.logout();

                }


      }]);






angular.module('myApp').controller('ExampleController', ['$scope', '$location', '$http', 'AuthService',
function($scope, $location, $http, AuthService) {

  /*
  1) could redirect to a seperate angular login controller and PAGE
  2) so in the facebook callback after success: it redirects to confirm page then goes to profile:
  ex:    1) res.redirect('/#/confirm');
         2) goes to profile page
  */

        //THIS CONFIRMS THE LOGIN FOR FACEBOOK
          AuthService.confirm();

//    $scope.authFacebook = function() { window.location="http://localhost:3000/facebook" }




          //ADD NAMES TO PAGE
              $scope.fname = function(){
                console.log($scope.firstname);
                console.log($scope.lastname);

                }


        //THIS PASSES JSON BACK AND FORTH
            myObj = { "name":"John", "age":30, "car":null };

              $scope.orangeData = function(){

                    $http.post('/orange', myObj   ).success(function( data)
                   {
                     console.log("Data is returned: " + data);
                     console.log("Data is returned name:: " + data.name);
                     $scope.countries = data;

                 }, function(posts) {});
                }




        //THIS PASSES JSON BACK AND SHOWS ON TABLE
                $scope.dateGrab = function(){
                      console.log("clicked!");
                      $http.post('/findDate').success(function(data)
                     {
                       console.log(data[0]._id);
                       console.log(data[0].username);
                       console.log(data[0].password);
                       console.log(data[0].date);

                       $scope.countries = data;



                       $scope._id = data[0]._id;
                       $scope.username = data[0].username;
                       $scope.password= data[0].password;
                       $scope.date = data[0].date;



                    }, function(posts) {});
                  }



                  //$http.post('/login', {username : $scope.username, password: $scope.password }).success(function( data)
                  //	 { console.log (data); }, function(posts) {});

        //THIS PASSES JSON BACK AND SHOWS ON TABLE
              $scope.bob = function(){
                  console.log('Clicked!');

                      $http.post('/red', {email : $scope.firstname }).success(function( data)
                     { console.log (data); }, function(posts) {});

                  }


        //THIS PASSES JSON BACK AND SHOWS ON TABLE

                  $scope.postedUsername = function() {

                      console.log('button pressed');

                    $http.post('/user/posted', {
                      username : $scope.SendUserData,
                      body : $scope.SendUserData4,
                    }).success(function() {
                      console.log('Post success');

                    }).error(function() {
                      console.log('Post failure');
                    });
                    $scope.SendUserData = '';

                  };



    }]);




angular.module('myApp').controller('ContactController', ['$scope', '$location', '$http', '$rootScope', 'AuthService',
function($scope, $location, $http, $rootScope, AuthService) {

  $scope.fname = "Jarred";
  $scope.lname = "Latouf";
  $scope.email = "jlatouf2@gmail.com";
  $scope.password = "jarredl";
  $scope.passwordConf = "jarredl";


  /* LOCATION DATA  */
    var x = document.getElementById("demo");

    $scope.getLocation = function() {
  //  function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    }

    /* LOCATION DATA  */



      // -d '{"email": "jarredl", "password": "paassword2"}' \

          //THIS WILL ADD THE CONTACTS LIST TO THE TABL

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

          $scope.countries = People


          // AuthService.loginExample($scope.loginForm.username, $scope.loginForm.password)

          //THESE PASS TO SERVICES.JS
          $scope.ServiceFunction2 = function () {
            AuthService.loginExample2($scope.firstname,   $scope.lastnamE);
          };

          $scope.ServiceFunction3 = function () {
            AuthService.RegisterExample($scope.firstname,   $scope.lastname);
          };


          $scope.ServiceFunction4 = function () {
            AuthService.RegisterExample4($scope.fname, $scope.lname, $scope.email, $scope.password, $scope.passwordConf);
          };


/*
          $scope.ServiceFunction5 = function () {
            console.log("clicked22");
            AuthService.LoginExample3($scope.email, $scope.password);
          };
*/

    }]);



angular.module('myApp').controller('ProfileController', ['$scope', '$location', '$http', '$rootScope', 'AuthService',
function($scope, $location, $http, $rootScope, AuthService) {


//THIS CONFIRMS THE LOGIN FOR FACEBOOK
  AuthService.confirm();


        console.log($scope.userid);

      /*
      You can use following urls to obtain different sizes of profile images. Please make sure to add Facebook id to url.

      Large size photo https://graph.facebook.com/{facebookId}/picture?type=large

      Medium size photo https://graph.facebook.com/{facebookId}/picture?type=normal

      Small size photo https://graph.facebook.com/{facebookId}/picture?type=small

      Square photo https://graph.facebook.com/{facebookId}/picture?type=square



      //  http://graph.facebook.com/" +profile.id+ "/picture?type=square
      var bob = "http://graph.facebook.com/" +$scope.userid+ "/picture?type=square";
      console.log("This is the data that I am goign to pass: "+ bob);


        //THIS WAS POSTED IN APP UNTIL I TOOK IT OUT
      //https://graph.facebook.com/{facebookId}/picture?type=large&w‌​idth=720&height=720
      var bob2 = "https://graph.facebook.com/" +$scope.userid+ "/picture?type=large&w‌​idth=150&height=200";
      console.log("This is the data that I am goign to pass: "+ bob2);


      $scope.black = bob;
      console.log($scope.black);


      $scope.black2 = bob2;
      console.log($scope.black2);


      */


        /*
        if ($scope.userdata == null) {
          $location.path('/home');

        }
        */

        console.log($scope.userdata);

  }]);


angular.module('myApp').controller('addController', ['$scope', '$location', '$http', '$rootScope', 'AuthService',
function($scope, $location, $http, $rootScope, AuthService) {




  }]);


angular.module('myApp').controller('StorenamesController', ['$scope', '$location', '$http', '$rootScope', 'AuthService',
function($scope, $location, $http, $rootScope, AuthService) {

          /*
          1) when you add a store: you have to add the Adminpassword
          2) when you select a store: you have to check if usertoken that logged in person has
             is in the storelocation table.

             1) when you add a line: you have to add the Adminpassword
             2) when yo uselect a store: you have to check if usertoken that logged in person has
                is in the storelocation table.

          */



              //    $("#myModal").modal("show");

              $http.post('/storeName', {postal: $scope.postal }).success(function( data)
                   {
               console.log("Data is returned: " + data);
               console.log("Data is returned name:: " + data[0]._id);
               console.log("Data is returned name:: " + data[0].store);

               $scope.countries = data;

                  }, function(posts) {});



                  $scope.optionsModal = function(){
                    console.log("clicked");
                      $("#optionsModal").modal("show");

                    }

                  $scope.deleteMode = function(){
                      console.log("clicked");
                      //  $("#optionsModal").modal("show");
                        $rootScope.deleteButton = true;
                    }


            $scope.getStores = function(){
                console.log('clicked');
                    $http.post('/storeName', {email : $scope.firstname }).success(function( data)
                   {
                     console.log("Data is returned: " + data);
                     console.log("Data is returned name:: " + data[0]._id);
                     console.log("Data is returned name:: " + data[0].store);

                     $scope.countries = data;

                 }, function(posts) {});

              }


            $scope.addStore1 = function(){
              console.log($scope.postal);
              console.log($scope.storeName);
              console.log($scope.latitude);
              console.log($scope.longitude);

              console.log("UserToken: "+ $scope.usertoken);

              if ( $scope.storeName == undefined) {
                console.log('Please enter a name');
                  } else{
                    $http.post('/addStore', {store : $scope.storeName, postal: $scope.postal, latitude: $scope.latitude,
                      longitude: $scope.longitude, Adminpassword: $scope.usertoken }).success(function( data)
                   {
                     console.log("Data is returned: " + data);
                    //    var successful = true;
                        $rootScope.successful = true;
                  //   $scope.countries = data;
                  $scope.countries.push(data)
                //  this.arrayText.push(text);
                $scope.storeName = '';
                setTimeout(function(){ stopSuccessBar(); }, 3000);

                 }, function(posts) {});
               }

              }


              function stopSuccessBar () {
                setTimeout(function() {
                    $(".alert").alert('close');
                }, 2000);

                $rootScope.successful = false;

              };


                  /*
              NOTE: THIS IS NOT CONNECTED YET
                $scope.deleteStore = function(){
            console.log('clicked');
                        $http.post('/deleteStore', {store : $scope.storeName} ).success(function( data)
                       {
                         console.log("Data is returned: " + data);

                         //$scope.countries = data;

                     }, function(posts) {});

                  }
                */



                $(document).ready(function () {

                // wire up button click
                $('#go').click(function () {
                  // test for presence of geolocation
                  if(navigator && navigator.geolocation) {
                    // make the request for the user's position
                    navigator.geolocation.getCurrentPosition(geo_success, geo_error);
                  } else {
                    // use MaxMind IP to location API fallback
                    printAddress(geoip_latitude(), geoip_longitude(), true);
                  }
                });
              });


              function geo_success(position) {
                printAddress(position.coords.latitude, position.coords.longitude);
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);

                $rootScope.latitude = position.coords.latitude;
                $rootScope.longitude = position.coords.longitude;

              }

              function geo_error(err) {
                // instead of displaying an error, fall back to MaxMind IP to location library
              //  printAddress(geoip_latitude(), geoip_longitude(), true);
              console.log('DID NOT WORK!');
              }

              // use Google Maps API to reverse geocode our location
              function printAddress(latitude, longitude, isMaxMind) {
                  // set up the Geocoder object
                  var geocoder = new google.maps.Geocoder();

                  // turn coordinates into an object
                  var yourLocation = new google.maps.LatLng(latitude, longitude);

                  // find out info about our location
                  geocoder.geocode({ 'latLng': yourLocation }, function (results, status) {
                  if(status == google.maps.GeocoderStatus.OK) {
                    if(results[0]) {
                      $('#results').fadeOut(function() {
                      // $(this).html('<p><b>Abracadabra!</b> My guess is:</p><p><em>' + results[0].formatted_address + '</em></p>').fadeIn();

                        $(this).html('<p><b>Abracadabra!</b> This is postal code:</p><p><em>' + results[0].address_components[6].long_name + '</em></p>').fadeIn();
                            console.log(results[0]);
                            console.log(results[0].address_components[6].long_name);

                            console.log(results);
                            console.log(results[2].address_components);
                            console.log('This is the correct postal code' + results[2].address_components[0].long_name);
                            //SAVES POSTAL CODE TO PASS TO DB.
                           $rootScope.postal = results[0].address_components[6].long_name;

                      })
                    } else {
                      error('Google did not return any results.');
                    }
                  } else {
                    error("Reverse Geocoding failed due to: " + status);
                  }
                });

                // if we used MaxMind for location, add attribution link
                if(isMaxMind) {
                  $('body').append('<p><a href="http://www.maxmind.com" target="_blank">IP to Location Service Provided by MaxMind</a></p>');
                }
              }

              function error(msg) {
                alert(msg);
              }






            var x = document.getElementById("demo");

            x.innerHTML = "Geolocaiton data will not be recorded if Store Added";

            $scope.getLocation = function() {
          //  function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                } else {
                    x.innerHTML = "Geolocation is not supported by this browser.";
                }
            }


            function showPosition(position) {
                x.innerHTML = "Latitude: " + position.coords.latitude +
                "<br>Longitude: " + position.coords.longitude  ;

                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
                console.log(position);

            }



        console.log('this worked');
        console.log($scope.storesAvailable);

        console.log("This is the saved name: "+ $scope.loginName);





              $scope.addStore = function(name) {
                var bob = $scope.storeName;
                console.log(bob);

                //EATHER OF THESE TWO IDEAS WILL WORK!
              //  $rootScope.loginName = bob;
              $rootScope.storesAvailable.push(bob);

              }


              $scope.deleteName = function(name) {

                console.log("name is: "+name);
              //  console.log($scope.postal);
                  $scope.storeName2 = name;
                  console.log($scope.storeName2);

                console.log("UserToken: "+ $scope.usertoken);

                $http.post('/deleteselectedStore', {store : $scope.storeName2 }).success(function( data)
               {
                 console.log("Data is returned: " + data);


                 console.log(data);
                $scope.countries = data;


              //      $rootScope.successful = true;
              //$scope.countries.push(data)
          //    $scope.countries.pop($scope.storeName2)
            //  console.log($scope.storeName2);

             }, function(posts) {});

          };




          /*
          You have to use $index to get the right number:
                //This one actually works!!
              $scope.removeName = function(name) {
                  var i = $scope.lineups2.indexOf(name);


                  $scope.lineups2.splice(name, 1);
                  console.log($scope.lineups2);

                };
          */


            //Grabs Storename to pass to next page
        	$scope.grabStuff = function(names){

        			$rootScope.grabStorename = names;
        			console.log ("Name of Store variable: " + $scope.grabStorename);

              //CHECK IF USERTOKEN IS EQUAL TO USERTOKEN IN DB TABLE WITH SELECTED STORENAME
              // IF Usertoken = kjdsosifj39303kk is in storelocation table where Store = Kmart

              $http.post('/checkStoreAdmin', {store : $scope.grabStorename, Adminpassword: $scope.usertoken }).success(function( data)
                 {
                   console.log("Data is returned: " + data);
                   console.log("Data is returned: " + data._id);
                   console.log("Data is returned: " + data[0]._id);



                //   IN THIS CASE THE DATA IS RETURNED SUCCESSFULLY BUT HAVE TO DIFF BETWEEN
                //NON DATA: []  AND DATA []
                //   $scope.countries = data;


            /*
            if(array.length > 0)
            var from = [];
            if(typeof from[0] !== undefined) {
              //...
            }
            */
               }, function(posts) {});


        		};




    }]);

angular.module('myApp').controller('StorelinesController', ['$scope', '$location', '$http', '$rootScope', 'AuthService',
function($scope, $location, $http, $rootScope, AuthService) {


//*****I have to make AddLine1 add adminpassword, then I have to pass the checkLineAdmin
//when I press on Line just like store.
//    $("#myModal").modal("show");





            console.log($scope.grabStorename);

            //THIS GETS THE DATA FROM THE DB TO UPDATE THE PAGE:

              $http.post('/numberofLines', {store: $scope.grabStorename}).success(function( data)
               {
               console.log("Data issdfsfsfsd returned: " + data);
               console.log("Data is returned: " + data._id);
               console.log(data.length);
                $rootScope.numberLines= data.length
                 console.log("number of lines: "+$scope.numberLines);

                 $scope.countries = data;
                 //THIS WILL ALLOW THE TABLE TO BE EMPTY
                 if ($scope.numberLines == 0) {
                   $rootScope.numberLinesZero = true;
                   console.log('data length is 0');
                 } else if($scope.numberLines > 0) {
                   $rootScope.numberLinesZero = false;

                 }

               }, function(posts) {});




               $scope.optionsModal2 = function(){
                 console.log("clicked");
                   $("#optionsModal2").modal("show");

                 }

                //STARTS DELETE MODE:
               $scope.deleteMode = function(){
                   console.log("clicked");
                   //  $("#optionsModal").modal("show");
                     $rootScope.deleteButton = true;
                 }


               //Opens the Line Model:

               $scope.addLineMOdal = function(){
                   $("#myLineModal").modal("show");

               }


               //ADDS THE NEW LINE AND UPDATES THE PAGE IN ONE SHOT:

               $scope.addLinetoDB = function(){
                     console.log($scope.grabStorename);
                     console.log("UserToken: "+ $scope.usertoken);
                     console.log("Number of Lines: "+ $scope.numberLines);
                     //GETS THE NUMBER OF LINES AND ADDS ONE FOR DATABASE
                       var bob= $scope.numberLines + 1;

                       console.log("New Line Number: "+ bob);

                     if ( $scope.grabStorename == undefined) {
                       console.log('Please get store name!');
                         } else{
                           $http.post('/addLinetoTable', {store : $scope.grabStorename, line: bob, Adminpassword: $scope.usertoken })
                           .success(function( data)
                          {
                                console.log("Data is returned: " + data);
                                $scope.countries = data;

                                 //THIS INPUTS THE NEW LINENUMBER TO rootScope
                                $rootScope.numberLines = $scope.numberLines + 1;
                        }, function(posts) {});
                      }
                 }

                 /*  - HAVE 5 NUMBERED BUTTONS: 1,2,3,4,5
                     - THEN EACH ONE REPRESENTS A NUMBER AND PASS THAT TO rootScope
                     - SO THAT IT PUSHES TO 1 FCN INSTEAD OF 5.

                  */

           $scope.addLine1 = function(){
             $rootScope.numberLinesZero = false;

                 if ( $scope.grabStorename == undefined) {
                   console.log('Please get store name!');
                     } else{
                       $http.post('/addLine1', {store : $scope.grabStorename, line: 1, Adminpassword: $scope.usertoken })
                       .success(function( data)
                      {
                        console.log(data);
                          //    THIS ADD SUCCESS BAR:
                          $rootScope.successful = true;
                      //    $scope.countries = data;
                          //  $scope.countries = {line: 0};

                          $scope.countries.push(data)

                      //  setTimeout(function(){ alert("Hello"); }, 3000);

                        setTimeout(function(){ stopSuccessBar(); }, 3000);

                    }, function(posts) {});
                  }
             }


             function stopSuccessBar () {
               setTimeout(function() {
                   $(".alert").alert('close');
               }, 2000);

               $rootScope.successful = false;

             };


             $scope.addLine2 = function(){

                   if ( $scope.grabStorename == undefined) {
                     console.log('Please get store name!');
                       } else{
                         $http.post('/addLine2', {store : $scope.grabStorename, line: 2, Adminpassword: $scope.usertoken })
                         .success(function( data)
                        {
                            console.log(data);

                            $rootScope.successful = true;

                              //    $scope.countries = data;

                              $scope.countries.push(data)

                              setTimeout(function(){ stopSuccessBar(); }, 3000);

                      }, function(posts) {});
                    }
               }


               $scope.addLine3 = function(){

                     if ( $scope.grabStorename == undefined) {
                       console.log('Please get store name!');
                         } else{
                           $http.post('/addLine3', {store : $scope.grabStorename, line: 3, Adminpassword: $scope.usertoken })
                           .success(function( data)
                          {

                            console.log(data);

                            $rootScope.successful = true;

                              //    $scope.countries = data;


                              $scope.countries.push(data)

                              setTimeout(function(){ stopSuccessBar(); }, 3000);

                        }, function(posts) {});
                      }
                 }


                 $scope.addLine4 = function(){

                       if ( $scope.grabStorename == undefined) {
                         console.log('Please get store name!');
                           } else{
                             $http.post('/addLine4', {store : $scope.grabStorename, line: 4, Adminpassword: $scope.usertoken })
                             .success(function( data)
                            {
                              console.log(data);
                              $rootScope.successful = true;

                              //      $scope.countries = data;
                              $scope.countries.push(data)

                              setTimeout(function(){ stopSuccessBar(); }, 3000);

                          }, function(posts) {});
                        }
                   }


                   $scope.addLine5 = function(){

                         if ( $scope.grabStorename == undefined) {
                           console.log('Please get store name!');
                             } else{
                               $http.post('/addLine5', {store : $scope.grabStorename, line: 5, Adminpassword: $scope.usertoken })
                               .success(function( data)
                              {
                                console.log(data);
                                $rootScope.successful = true;

                                //      $scope.countries = data;
                                $scope.countries.push(data)

                                setTimeout(function(){ stopSuccessBar(); }, 3000);

                            }, function(posts) {});
                          }
                     }




//List of 1 to 5 buttons, that checks backend for the number pressed

            $scope.grabLine = function(names){
        				console.log("Line Number " + names);

        			$rootScope.grabLineNumber = names;
        			console.log ("Name of Store variable: " + $scope.grabLineNumber);
        			//THEREFORE USE $scope.grabLineIn to pass the vaariable to the next page:
        		};




              $scope.deleteLine = function(name) {

                console.log("line is: "+name);
              //  console.log($scope.postal);
                  console.log($scope.grabStorename);

                console.log("UserToken: "+ $scope.usertoken);

                $http.post('/deleteselectedLine', {line : name }).success(function( data)
               {
                 console.log("Data is returned: " + data);


                 console.log(data);
                $scope.countries = data;

                 }, function(posts) {});

              };




            //Grabs Storename to pass to next page
        	$scope.checkLineAdminFcn = function(names){

            $rootScope.grabLineNumber = names;
            console.log ("Name of Store variable: " + $scope.grabLineNumber);

              $http.post('/checkLineAdmin', {store : $scope.grabStorename, line: $scope.grabLineNumber, Adminpassword: $scope.usertoken }).success(function( data)
                 {
                   console.log("Data is returned: " + data);
                   console.log("Data is returned: " + data._id);
                   console.log("Data is returned: " + data[0]._id);
               }, function(posts) {});
        		};


      }]);

angular.module('myApp').controller('PeoplelineController', ['$scope', '$location', '$http', '$rootScope', 'AuthService',
function($scope, $location, $http, $rootScope, AuthService) {


                $http.post('/peopleNames').success(function(data)
                   {
                       console.log("Data is returned: " + data);
                       console.log("Data is returned name:: " + data[0]._id);
                       console.log("Data is returned name:: " + data.email);

                     $scope.people = data;

                   }, function(posts) {});


                $scope.getNames = function(){
                    console.log('clicked');
                        $http.post('/peopleNames').success(function( data)
                       {
                         console.log("Data is returned: " + data);
                         console.log("Data is returned name:: " + data[0]._id);
                         console.log("Data is returned name:: " + data.email);

                         $scope.people = data;

                     }, function(posts) {});

                  }


                //The checkpeoplefcn has to use checklinefcn b/c the person who created the line has the
                //power to delete the people in it.
                //ALSO THE PERSON WHO MADE THE STORE, SHOULD HAVE THIS POWER TOO, BUT NOT YET......

                  //Grabs Storename to pass to next page
                $scope.checkPeopleFcn = function(names){

                  $rootScope.grabPersonName = names;
                  console.log ("Name of Store variable: " + $scope.grabLineNumber);
                  console.log ("Name of Person in line: " + $scope.grabPersonName);

                    $http.post('/checkPeopleAdmin', {store : $scope.grabStorename, line: $scope.grabLineNumber, Adminpassword: $scope.usertoken }).success(function( data)
                       {
                         console.log("Data is returned: " + data);
                         console.log("Data is returned: " + data._id);
                         console.log("Data is returned: " + data[0]._id);
                     }, function(posts) {});
                  };





        }]);


angular.module('myApp').controller('Profile2Controller', ['$scope', '$location', '$http', '$rootScope', 'AuthService',
function($scope, $location, $http, $rootScope, AuthService) {

      console.log("Person's name is: "+ $scope.grabPersonName);


            /*
            I COULD USE SCOPE TO PASS USERNAME TO THIS PAGE THEN GRAB ALL THE INFO about
            THE USER WHEN THIS PAGE LOADS....

            */


                $http.post('/peopleNames').success(function(data)
                   {
                       console.log("Data is returned: " + data);
                       console.log("Data is returned name:: " + data[0]._id);
                       console.log("Data is returned name:: " + data.email);

                     $scope.people = data;

                   }, function(posts) {});


                $scope.getNames = function(){
                    console.log('clicked');
                        $http.post('/peopleNames').success(function( data)
                       {
                         console.log("Data is returned: " + data);
                         console.log("Data is returned name:: " + data[0]._id);
                         console.log("Data is returned name:: " + data.email);

                         $scope.people = data;

                     }, function(posts) {});

                  }


          //The checkpeoplefcn has to use checklinefcn b/c the person who created the line has the
          //power to delete the people in it.
          //ALSO THE PERSON WHO MADE THE STORE, SHOULD HAVE THIS POWER TOO, BUT NOT YET......

                  //Grabs Storename to pass to next page
                $scope.checkPeopleFcn = function(names){

                  $rootScope.grabLineNumber = names;
                  console.log ("Name of Store variable: " + $scope.grabLineNumber);

                    $http.post('/checkPeopleAdmin', {store : $scope.grabStorename, line: $scope.grabLineNumber, Adminpassword: $scope.usertoken }).success(function( data)
                       {
                         console.log("Data is returned: " + data);
                         console.log("Data is returned: " + data._id);
                         console.log("Data is returned: " + data[0]._id);
                     }, function(posts) {});
                  };


        }]);


angular.module('myApp').controller('Peopleline2Controller', ['$scope', '$location', '$http', '$rootScope', 'AuthService',
function($scope, $location, $http, $rootScope, AuthService) {

        //This looks for the localname with email=dan:
        //NOTE: YOU CAN USE TIMESTAMPS TO ADD THE PEOPLE TO THE LINES,
        //THIS WILL CORRECTLY ALLOW YOU TO ARRANGE THEM IN ORDER, AND IF ANY USER IS
        //DELETED, IT WILL KEEP THE ORDER OF PEOPLE CORRECTLY
        /*
        1) Add New Database, Add some names to db
        2) Use Http to get names from db
        3)

        TO TRACK POSIITON: IN PEOPLELINE2 PAGE:
        1) HAVE POSITION TRACKING [AND MAYBE PAGE REFRESH TO UPDATE ALL PEOPLE using
            DEVICE IN DB] REFRESH EVERY MINUTE.

        */

          /*
        //GET PEOPLE FROM USER DATABASE:
        $http.post('/peopleNames3').success(function(data)
           {
               console.log("Data is returned: " + data);
               console.log("Data is returned name:: " + data[0]._id);
               console.log("Data is returned name:: " + data.email);

             $scope.people = data;

           }, function(posts) {});
            */

           /* ----------GET PEOPLE FROM PEOPLELINE DATABASE -------------- */

           $http.post('/getPeoplefromDB').success(function(data)
              {
                  console.log("Data is returned: " + data);
            //      console.log("Data is returned name:: " + data[0]._id);
              //    console.log("Data is returned name:: " + data.email);

                $scope.people = data;

              }, function(posts) {});




            /* ----------LOCATION FUNCTION -------------- */

         var x = document.getElementById("demo");
         var y = document.getElementById("demo2");

              x.innerHTML = "Geolocaiton data will not be recorded if Store Added";
              y.innerHTML = "Geolocaiton data will not be recorded if Store Added";

              $scope.getLocation = function() {
            //  function getLocation() {
                  if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(showPosition);
                  } else {
                      x.innerHTML = "Geolocation is not supported by this browser.";
                  }
              }



              function showPosition(position) {
                  x.innerHTML = "Latitude: " + position.coords.latitude +
                  "<br>Longitude: " + position.coords.longitude  ;

                  console.log(position.coords.latitude);
                  console.log(position.coords.longitude);
                  console.log(position);

              }



              $scope.positionInfo = "Please check location data!"

              $scope.location = function(){
                console.log('worked');
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition2);

                } else {
                    $scope.location = "Geolocation is not supported by this browser.";
                }

              };

              function showPosition2(position) {
                if (position != 0) {
                $rootScope.latitude = position.coords.latitude;
                $rootScope.longitude = position.coords.longitude;
                    }
                x.innerHTML = "Latitude: " + position.coords.latitude +
                "<br>Longitude: " + position.coords.longitude  ;

                y.innerHTML = "Latitude: " + position.coords.latitude +
                "<br>Longitude: " + position.coords.longitude  ;

                  console.log(position.coords.latitude);
                  console.log(position.coords.longitude);
                  console.log(position);

              }


/*
              $scope.addPeopletoDB = function(){

                $http.post('/peoplelineInfo', {store : $scope.grabStorename, line: $scope.grabLineNumber,
                  Adminpassword: $scope.usertoken }).success(function( data)

                   {
                       console.log("Data is returned: " + data);
                     //  console.log("Data is returned name:: " + data[0]._id);
                       console.log("Data is returned name:: " + data.email);

                   //  $scope.people = data;
                   $scope.people.push(data)

                   }, function(posts) {});

                }

*/

           //TIMESTAMPS
           $scope.addPeopletoDB = function(){

             $http.post('/peoplelineInfo', {store : $scope.grabStorename, line: $scope.grabLineNumber,
               email: $scope.useremail, fullname: $scope.fullName,  longitude: $scope.longitude,
               latitude: $scope.latitude, distance: $scope.distance,
               Adminpassword: $scope.usertoken }).success(function( data)

                {
                    console.log("Data is returned: " + data);
                  //  console.log("Data is returned name:: " + data[0]._id);
                    console.log("Data is returned name:: " + data.email);

                //  $scope.people = data;
                $scope.people.push(data)

                }, function(posts) {});

             }



           /* ----------DELETE MODE -------------- */

          $scope.deleteMode = function(){
              console.log("clicked");
              //  $("#optionsModal").modal("show");
                $rootScope.deleteButton = true;
            }

            /* ----------DELETE MODE -------------- */

           $scope.exitDeleteMode = function(){
               console.log("clicked");
               //  $("#optionsModal").modal("show");
                 $rootScope.deleteButton = false;
             }


            /* ----------OPTIONS MODAL -------------- */

           $scope.optionsModa22 = function(){
             console.log("clicked");
               $("#optionsModa22").modal("show");

             }

             /* ----------ADDYOURSELF MODAL -------------- */

             $scope.AddYourselfModal= function(){
               console.log("clicked");
                 $("#AddYourselfModal").modal("show");

               }

               /* ----------POSITION BUTTON! -------------- */


               $scope.positionButton = function(){
                   console.log("clicked");
                   //  $("#optionsModal").modal("show");
                     $rootScope.numberLinesZero = false;
                 }


                 /* ----------DISPLACEMENT BUTTON! -------------- */


                 $scope.displacementButton = function(){
                     console.log("clicked");
                     //  $("#optionsModal").modal("show");
                       $rootScope.numberLinesZero = true;
                   }



        $scope.getNames = function(){
            console.log('clicked');
                $http.post('/peopleNames').success(function( data)
               {
                 console.log("Data is returned: " + data);
                 console.log("Data is returned name:: " + data[0]._id);
                 console.log("Data is returned name:: " + data.email);

                 $scope.people = data;

             }, function(posts) {});

          }



              /* ----------DELETE PEOPLE FUNCITON -------------- */

              $scope.deletePeople = function(name) {

                console.log("line is: "+name);
              //  console.log($scope.postal);
                  console.log($scope.grabStorename);

                console.log("UserToken: "+ $scope.usertoken);

                $http.post('/deletePeopleLine', {line : name }).success(function( data)
               {
                 console.log("Data is returned: " + data);


                 console.log(data);
                $scope.countries = data;

                 }, function(posts) {});

              };


              //The checkpeoplefcn has to use checklinefcn b/c the person who created the line has the
              //power to delete the people in it.
              //ALSO THE PERSON WHO MADE THE STORE, SHOULD HAVE THIS POWER TOO, BUT NOT YET......

            //Grabs Storename to pass to next page
            $scope.checkPeopleFcn = function(names){

                $rootScope.grabPersonName = names;
                console.log ("Name of Store variable: " + $scope.grabLineNumber);
                console.log ("Name of Person in line: " + $scope.grabPersonName);

                  $http.post('/checkPeopleAdmin', {store : $scope.grabStorename,
                line: $scope.grabLineNumber, Adminpassword: $scope.usertoken })
                .success(function( data)
                 {
                   console.log("Data is returned: " + data);
                   console.log("Data is returned: " + data._id);
                   console.log("Data is returned: " + data[0]._id);
               }, function(posts) {});
            };

    }]);
