const express = require('express');
const fs = require('fs');
const socket = require('socket.io');
const http = require('http');

const app = express();
const PORT = 3000 || process.env.PORT;

const httpServer = http.createServer(app);
const io = socket(httpServer);

let siteData = {
    "msg" : null
};

app.set('view engine', 'ejs');
app.use(express.static('./public'));

httpServer.listen(PORT, (req, res) => {
    console.log(`Server Listening on ${PORT} `);
});

const txtURL = './text.txt';
const dataURL = './log.txt';

let data = fs.readFileSync(dataURL, 'utf-8');

app.get('/', (req, res) => {
    const txt = fs.readFileSync(txtURL).toString();
    siteData.msg = txt;
    
    res.render('index.ejs', siteData);
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