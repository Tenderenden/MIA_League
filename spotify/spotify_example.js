/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

 var request = require('request'); // "Request" library

 var client_id = '4e7eb63f652c4dc080b385e1f2741f96'; // Your client id
 var client_secret = '8b7dd875ddfb4a29a05cee3b182ac6b7'; // Your secret
 
 // your application requests authorization
 var authOptions = {
   url: 'https://accounts.spotify.com/api/token',
   headers: {
     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
   },
   form: {
     grant_type: 'client_credentials'
   },
   json: true
 };
 
 request.post(authOptions, function(error, response, body) {
   if (!error && response.statusCode === 200) {
 
     // use the access token to access the Spotify Web API
     var token = body.access_token;
     var options = {
       url: 'https://api.spotify.com/v1/me/playlists',
       headers: {
         'Authorization': 'Bearer ' + token,
         'Content-Type': 'application/json'
       },
       qs: {
           'limit' : 50
       },
       json: true
     };
     request.get(options, function(error, response, body) {
         console.log(body);
     });
   }
 });