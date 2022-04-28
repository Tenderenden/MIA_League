var request = require('request'); // "Request" library

var client_id = '4e7eb63f652c4dc080b385e1f2741f96'; // Your client id
var client_secret = ''; // Your secret
var redirect_url = 'https://localhost:8081';

var authOptions = {
    url:'https://api.spotify.com/authorize',
    headers: {
        'Authorisation' : 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    qs: {
        'client_id' : client_id,
        'response_type' : 'code',
        'redirect_uri' : redirect_url
    },
    json: true
};

request.post(authOptions, function(error, response, body) {
    if(error){
        console.log("err");
    }
    else{
        console.log(response.body);
    }
});