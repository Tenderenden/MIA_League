const http = require('http');
const WebSocket = require('ws');
const port_http = 8080;
const port_wss = 1337;
const clients = new Array();


const ws_server = new WebSocket.Server({port: port_wss})
const http_server = http.createServer((req, res)=> {
    console.log("Http request found")
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    if(clients.length < 1) {
        res.end('No clients found');
    }
    else {
        res.end('Clients found');
    }
})

http_server.listen(port_http, () => {
    console.log('Server listen on port ${port_http}');
})


function handleConnection(client, request) {
    console.log("New connection");
    clients.push(client);


    function endClient(){
        //Client ends connection
        //Get his position in clients array and remove
        var position = clients.indexOf(client);
        clients.splice(position, 1);
        console.log("connection closed");
    }
    
    function clientResponse(data) {
        //Client sent message.
        //Print it out
        console.log(request.connection.remoteAdress + ': ' + data);
        // breadcast(request.connection.remoteAdress + ': ' + data);
    }
    
    //Set-up of client listeners
    client.on('message', clientResponse);
    client.on('close', endClient);
    setInterval(sendLoop, 5000, "mia");
}

function broadcast(data) {
    for (c in clients) {
        clients[c].send(JSON.stringify(data));
    }
}

ws_server.on('connection', handleConnection);

function sendLoop (message) {
    console.log("Sending...");
    for (c in clients) {
        clients[c].send(message);
    }
}

console.log('Wss is up');