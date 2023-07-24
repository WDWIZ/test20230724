const express = require('express');
const app = express();

const siteData = {
    "msg" : null
};

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.render('index.ejs', siteData));

app.listen(PORT, () => console.log(`Server Listening on ${PORT}`));