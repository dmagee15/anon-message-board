// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
//const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
//app.use('/api', api);
app.get('/gettopiclist', (req, res) => {
  var topiclist = [
    {title: 'What is the meaning of life?', numposts: 7, lastpost: '11:37'},
    {title: 'How many eggs are in a dozen?', numposts: 9, lastpost: '12:13'},
    {title: 'Question about the movie Interstellar', numposts: 15, lastpost: '7:17'},
    {title: 'How often do solar eclipses happen?', numposts: 3, lastpost: '12:37'},
    {title: 'How many species of animals are there?', numposts: 10, lastpost: '4:30'},
    {title: "I'm going to teach myself piano. Any Advice?", numposts: 17, lastpost: '4:35'},
    {title: "Just made the best sauce I’ve ever made on accident", numposts: 12, lastpost: '5:37'}
  ];
  res.send(topiclist);
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