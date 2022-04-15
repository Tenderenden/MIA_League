const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 1337})
const clients = new Map();

wss.on('connection', (ws) =>{
    console.log("New connection!");
})

wss.on('close', () => {
    clients.delete(ws);
})

console.log('Wss is up');