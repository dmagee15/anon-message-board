// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Get our API routes
//const api = require('./server/routes/api');

const app = express();

mongoose.connect('mongodb://localhost:27017/anondb');
mongoose.Promise = global.Promise;

var Topic = require('./models/topic.js');

var adjectiveList = ['Arid','Bold','Cold','Cool','Dim','Dry','Frail','Evil','Good','Gross','Hot',
'High','Ill','Grown','Long','Healthy','Mild','Jaded','Junior','Kind','Lazy','Lonely','Meek','Moral',
'Nice','Mad','Open','Icy','Old','Poor','Oval','Rich','Ripe','Rude','Sad','Safe','Smart','Torn','Tall','Ugly','Weak',
'Warm','Wet','Zany','Key','Late','Neat','Oily','Able','Apt'];

var nounList = ['Cat','Dog','Car','Wall','Door','Rock','Dust','Can','Rain','Cloud','Sheet','Brush','Fire',
'Fan','Job','Knob','Mind','Key','Home','Store','Bag','Tire','Bean','Rice','Fruit','Sand','Phone','Shoe',
'Band','String','Flute','Book','Bar','Drink','Plate','Show','Cash','Frame','Tan','Trash','Bin','Bus','Bird',
'Egg','Test','Coda','Song','Cup','Tape','Circle'];

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
//app.use('/api', api);
app.get('/gettopiclist', (req, res) => {

  Topic.find({}, function(err,topics){
    if(err) throw err;
    res.send(topics.reverse());
  });
});

app.get('/getposts/:id', (req, res) => {
  var posts = [
    {user: 'WonderCrab372', content: 'To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.'},
    {user: 'FunnyAcorn129', content: 'To have more control over the exact string that can be matched by a route parameter, you can append a regular expression in parentheses'},
    {user: 'BlackVan783', content: 'You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there’s no reason to proceed with the current route.'},
    {user: 'SisterBeach112', content: 'More than one callback function can handle a route (make sure you specify the next object). For example'},
    {user: 'CircularOrange573', content: 'A combination of independent functions and arrays of functions can handle a route. For example'},
    {user: 'StraightHinge894', content: 'The methods on the response object (res) in the following table can send a response to the client, and terminate the request-response cycle. If none of these methods are called from a route handler, the client request will be left hanging.'},
    {user: 'HairyShrimp566', content: 'Because the path is specified at a single location, creating modular routes is helpful, as is reducing redundancy and typos. For more information about routes'},
    {user: 'WonderCrab372', content: 'Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.'},
    {user: 'FunnyAcorn129', content: 'Call the timeLog middleware function that is specific to the route.'}
  ];

  Topic.findOne({id:req.params.id}, function(err, topic){
    if(err) throw err;
    res.send(topic.posts);
  });
});

app.post('/submitpost', (req, res) => {
  var newpost = {
    user: '',
    content: ''
  }
  res.send(newpost);
});

app.post('/submittopic', (req, res) => {

  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);

  var username = adjectiveList[Math.floor(Math.random()*50)]+nounList[Math.floor(Math.random()*50)]+Math.floor(Math.random()*100);

  var newuser = {};
  newuser[ip] = username;
  var users = [newuser];

  var time = new Date();
	var hours = ""+time.getHours();
	hours = (hours.length==1)?"0"+hours:hours;
	var minutes = ""+time.getMinutes();
	minutes = (minutes.length==1)?"0"+minutes:minutes;
  var date = hours+":"+minutes;

  var firstpost = {
    user: username,
    content: req.body.content,
    date: date
  }

  Topic.find({}, function(err, topics){
    if(err) throw err;

    var newtopic = new Topic({
      title: req.body.title,
      id: topics.length+1,
      numposts: 1,
      lastpost: date,
      posts: [firstpost],
      users: users
    });
    newtopic.save();
    res.send(newtopic);
  });
  
});
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));