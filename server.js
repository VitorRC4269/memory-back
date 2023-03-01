const express = require('express');
const keys = require('./config/keys.js');

// parse application/x-www-form-urlencoded
const app = express();

// Setting up DB
const mongoose = require('mongoose');
mongoose.connect(keys.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });


// Setup database models
require('./model/Account');



app.get('/account', async (req, res) => {

    const {username, password} = req.query;
});

app.listen(keys.port, () => {
    console.log("Listening on " + keys.port);
});