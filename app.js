  
/**
 * Module dependencies
 */
process.env.DBSTRING = process.env.DBSTRING_DEV;

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  exec = require('child_process').exec;

var app = module.exports = express();

var MINUTE_IN_MILLIS = 60 * 1000;

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3400);
app.set('views', __dirname + '/components');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'components')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(__dirname + '/public'));
app.use('/static_bower', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/bower_components'));
app.use('/test', express.static(__dirname + '/test'));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}

/**
 * Routes
 */

 var callback = function() {
   // noop
 };

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:component/:name', routes.partials);

// Personnel
app.post('/api/issuesByComponent', function(req, res) {
  api.issuesByComponent(req, res);
});

app.get('/api/totalClosedStoryPoints', function(req, res) {
  api.totalClosedStoryPoints(req, res);
});

// redirect all others to the index (HTML5 history)
// app.get('*', routes.index);

// function updateHg() {
//   console.log();
//   console.log('Updating mercurial repo...');
//   exec('hg pull -u', {
//     cwd: __dirname
//   }, function(error, stdout, stderr) {
//     if (error) {
//       console.log(error);
//       console.log(stderr);
//     } else {
//       console.log(stdout);
//       console.log('Update Complete!');
//     }
//   });
// }

// setInterval(updateHg, 10 * MINUTE_IN_MILLIS);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

