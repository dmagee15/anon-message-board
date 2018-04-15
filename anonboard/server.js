// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').load();

// Get our API routes
//const api = require('./server/routes/api');

const app = express();

mongoose.connect(process.env.MONGO_URI);
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

  Topic.findOne({id:req.params.id}, function(err, topic){
    if(err) throw err;
    res.send(topic);
  });
});

app.post('/submitpost', (req, res) => {
  Topic.findOne({id:req.body.id}, function(err, topic){
    if(err) throw err;

    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);

    var isnewuser = true;
    var username = adjectiveList[Math.floor(Math.random()*50)]+nounList[Math.floor(Math.random()*50)]+Math.floor(Math.random()*100);
    var newuser = {};
    newuser[ip] = username;
    var userslength = topic.users.length;
    for(var x=0;x<userslength;x++){
      if(topic.users[x].hasOwnProperty(ip)){
        username = topic.users[x][ip];
        isnewuser = false;
        x = userslength;
      }
    }

    var time = new Date();
	  var hours = ""+time.getHours();
	  hours = (hours.length==1)?"0"+hours:hours;
	  var minutes = ""+time.getMinutes();
	  minutes = (minutes.length==1)?"0"+minutes:minutes;
    var date = hours+":"+minutes;

    var postcontent = req.body.content.replace(/\r?\n/g, '<br />');
    var newpost = {
      user: username,
      content: req.body.content,
      date: date
    }

    if(isnewuser){
      Topic.findOneAndUpdate({id:req.body.id}, { $push: { 'users': newuser, 'posts': newpost }, $set: { 'lastpost': date }, $inc: { 'numposts':1 } })
      .exec(function (err, result) {
        if(err) throw err;
        res.send(result);
      });
    }
    else{
      Topic.findOneAndUpdate({id:req.body.id}, { $push: { 'posts': newpost }, $set: { 'lastpost': date }, $inc: { 'numposts':1 } })
      .exec(function (err, result) {
        if(err) throw err;
        res.send(result);
      });
    }

    });
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