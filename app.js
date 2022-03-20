var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var http = require('http');

let {isConnected} = require('./dbhandler/initDB');


var app = express();

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
}

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);

require('./socket/init').init(server);


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

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

module.exports = server;
