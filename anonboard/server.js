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

app.get('/getposts/:id', (req, res) => {
  console.log(req.params.id);
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
  res.send(posts);
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