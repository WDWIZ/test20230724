const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extend : false}))

const PORT = process.env.PORT || 3000;

let siteData = {
    "msg" : null
}

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

app.post('/submit', (req, res) => {
    const msg = Object.keys(req.body)[0];

    siteData.msg = msg;
    saveLog();
    res.send(msg);
});

function saveLog(){
    const currentTime = new Date();
    data += `${currentTime} : ${siteData.msg}\n`;

    fs.writeFileSync(txtURL, siteData.msg);
    fs.writeFileSync(dataURL, data);
}

app.listen(PORT, () => console.log(`Server Listening on ${PORT}`));
