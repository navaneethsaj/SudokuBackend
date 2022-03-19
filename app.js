var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

let {isConnected} = require('./dbhandler/initDB');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use((req, res, next)=>{
    if (isConnected()){
        next()
    }
})

app.use('/', indexRouter);

module.exports = app;
