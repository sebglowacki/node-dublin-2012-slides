var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var server = http.createServer(app);
var io = require('socket.io').listen(server);


var events = require('events');
var util = require('util');

// The Thing That Emits Event
Eventer = function(){
  events.EventEmitter.call(this);
  this.sendCmd = function(cmd){
     this.emit(cmd);
  };
};
util.inherits(Eventer, events.EventEmitter);


// The thing that drives the two.
var eventer = new Eventer();

io.sockets.on('connection', function (socket) {
  
  eventer.on('next', function() {
      socket.emit('cmd', 'next');  
  });

  eventer.on('prev', function() {
      socket.emit('cmd', 'prev');  
  });

  eventer.on('start', function() {
    socket.emit('cmd', 'start');
  });

});

app.get('/', function(req, res){
  res.render('index', { title: 'Node Dublin 2012' });
});

app.get('/controller', function(req, res) {
  res.render('controller', { title: 'Node Dublin 2012 Demo Controller' });
});

app.post('/controller', function(req, res) {
  eventer.sendCmd(req.body.cmd);
  res.send(200);
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

