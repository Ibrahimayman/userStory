/**
 * Created by Ibrahim Ayman on 12/07/2017.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require("morgan"),
    mongoose = require("mongoose"),
    path = require('path'),
    ejs = require("ejs"),
    config = require("./config");

mongoose.connect(config.database, (err) => {
    if (err) return err;
    console.log("connected to Db");
});

var app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var ApiRoutes = require("./routes/api");
app.use('/api', ApiRoutes);


app.get("*", (req, res) => {
    res.sendFile('index.html', {root: __dirname + '/public/app/views'});
});

app.listen(config.port, (err) => {
    if (err) return err;
    console.log("App Running on Port : " + config.port);
});


