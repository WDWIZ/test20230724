const express = require('express');
const fs = require('fs');
const socket = require('socket.io');
const http = require('http');

const app = express();
const httpServer = http.createServer(app);
const io = socket(httpServer);

app.set('view engine', 'ejs');
app.use(express.static('./public'));

const PORT = process.env.PORT || 3000;

let siteData = {
    "msg" : null
}

httpServer.listen(PORT, (req, res) => {
    console.log(`Server Listening on ${PORT} `);
});

const txtURL = './text.txt';
const dataURL = './log.txt';

let data = fs.readFileSync(dataURL, 'utf-8');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req, res) => {
    const txt = fs.readFileSync(txtURL).toString();
    siteData.msg = txt;
    
    res.send(siteData.msg);
});

io.sockets.on('connection', (socket) => {
    socket.on('new_message', (query) => {
        siteData.msg = query.msg;
        newMessage();

        io.emit('message', query.msg);
    });
});

function newMessage(){
    const currentTime = new Date();
    data += `${currentTime} : ${siteData.msg}\n`;

    fs.writeFileSync(txtURL, siteData.msg);
    fs.writeFileSync(dataURL, data);
}