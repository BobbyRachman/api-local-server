var express         = require('express');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');
var cors            = require('cors');
var fs              = require('fs')
const con           = require('./config/db')
var rfs             = require('rotating-file-stream');
var path            = require('path');
var AppRouter       = require('./app/index')
var app             = express();

app.use(logger('dev'));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// simple route
app.get("/", (req, res) => {
    res.json({code : 200, message: "Welcome Egogo API for Local Server." });
});
app.get("/api", (req, res) => {
  res.json({code : 200, message: "Welcome Egogo API for Local Server." });
});

// Routes
app.use('/',AppRouter);


// set port
const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;