  window.fbAsyncInit = function() {
     FB.init({
       appId      : '1443759342516721', // App ID
       channelURL : '//http://www.esterisco.com/tiago/loans/channel.html', // Channel File, not required so leave empty
       status     : true, // check login status
       cookie     : true, // enable cookies to allow the server to access the session
       oauth      : true, // enable OAuth 2.0
       xfbml      : false  // parse XFBML
     });
  };
  
  // logs the user in the application and facebook
  function login(){
    FB.getLoginStatus(function(r){
      if(r.status === 'connected'){
        console.log("Connected");
        FB.api('/me', function(response) {
          window.respo
        });
      }else{
        FB.login(function(response) {
          if(response.authResponse) {
              //if (response.perms)
                    console.log("Connected ");
          } else {
              // user is not logged in
          }
         },{scope:'email'}); // which data to access from user profile
      }
    });
  }

function logout() {
  FB.logout(function(response) {
        console.log("adeus");
    });
}

// Load the SDK Asynchronously
(function() {
   var e = document.createElement('script'); e.async = true;
   e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';                
   document.getElementById('fb-root').appendChild(e);
}());