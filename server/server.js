const express = require('express')

const app = express();


app.get('/', (req, res) => {
    console.log("Request");
    res.send('Hi');
});
app.listen(8080);