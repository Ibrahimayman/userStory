/**
 * Created by Ibrahim Ayman on 12/07/2017.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require("morgan"),
    mongoose = require("mongoose"),
    config = require("./config");

mongoose.connect(config.database, (err) => {
    if (err) return err;
    console.log("connected to Db");
});

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var ApiRoutes = require("./routes/api");
app.use('/api', ApiRoutes);

app.listen(config.port, (err) => {
    if (err) return err;
    console.log("App Running on Port : " + config.port);
});


