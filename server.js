const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 1337})
const clients = new Array();


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

wss.on('connection', handleConnection);

function sendLoop (message) {
    console.log("Sending...");
    for (c in clients) {
        clients[c].send(message);
    }
}

console.log('Wss is up');