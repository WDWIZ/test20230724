const express = require('express');
const home = require('./routes/home');
const app = express();

app.use(express.json());
app.use("/home", home);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
});