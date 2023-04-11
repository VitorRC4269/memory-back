const express = require('express');
const keys = require('./config/keys.js');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


const cors = require('cors');
app.use(cors({
    origin: '*'
}));


// Setting up DB
const mongoose = require('mongoose');
mongoose.connect(keys.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});

// Setup database models
require('./model/Account');
require('./model/Score');
require('./model/Session');
// Setup the routes
require('./routes/authenticationRoutes')(app);
require('./routes/scoreRoutes')(app);

const port = process.env.PORT || 13756
app.listen(port, () => {
    console.log("Listening on " + keys.port);


    //var data = Date(Date.now().toLocaleString('pt-br'));
   // console.log(Date.now().toLocaleString('pt-br'));
});