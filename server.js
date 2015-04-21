var express = require('express')
 var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var Twit = require('twit');
var app = express();
var http = require('http');
var swig = require('swig');


var app = new express();
var server = http.createServer(app);
var io = require('socket.io').listen(server); 
server.listen(8080);
console.log("Listening on port 8080");

// view engine setup
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Twitter details
var T = new Twit({
    consumer_key:         'wt6J7qeS259efs0s57NDXM6Cb'
  , consumer_secret:      'yfmAUG8bu1ZsgN5FsKK47GF3uDbyrVuQmSw8XV8pnv78DahINl'
  , access_token:         '1896793015-h4WyM5gAt3kr63At0esUsEiTDLltgdcGPwvyIjl'
  , access_token_secret:  'XnTtSNZlFxoMFxtcQdEHaNIKqEtScveGyHJaek6NjOMcL'
});



// routing
var twitterWatchList = [];
app.get('/tweets/:tword',function(req,res)
{
  var trackword = req.param('tword');
	twitterWatchList.push(trackword);
	res.redirect('/getTweets');
});

app.get('/getTweets', function (req, res) {
res.render('liveTweets.html');
io.sockets.on('connection', function (socket) {
//console.log(socket.connection);
  console.log('Connected');
});

 var stream = T.stream('statuses/filter', { track: twitterWatchList, language: 'en' })

  stream.on('tweet', function (tweet) {

    io.sockets.emit('stream',tweet);
    

  });
});


app.get('/',function(req,res)
{
  res.render('homePage-sports');
});

app.get('/entertainment',function(req,res)
{
  res.render('homePage-entertainment');
});

app.get('/world',function(req,res)
{
  res.render('homePage-world');
});

app.get('/technology',function(req,res)
{
  res.render('homePage-technology');
});



