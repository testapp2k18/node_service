var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000,
  mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('./config'),
  User = require('./api/models/userModel'), //created model loading here
  User = require('./api/models/settingModel'), //created model loading here
  bodyParser = require('body-parser');
  path = require('path');

/* MONGO DATABASE CONNECTION */
/*mongoose.Promise = require('bluebird');
var options = { useMongoClient: true };
var connectionString = "mongodb://" + config.database.username + ":" + config.database.password + "@" + config.database.host + ":" + config.database.port + "/" + config.database.dbName + "?authSource=" + config.database.authDb
mongoose.connect(connectionString, options);*/

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true }); 

/* URL PERSING */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(function(req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });


/* STATIC FOLDER ACCESS FOR IMAGE */
app.use(express.static('assets'));


/* ACCESS TOKEN VERIFICATON */
app.use(function(req, res, next) {
  var token = req.body.token || req.param('token') || req.headers['x-access-token'];

  if (
        req.url == '/' 
        || req.url == '/login' 
        || req.url == '/forgot_password' 
        || req.url == '/email_verify' 
        || req.url == '/users'
      ) {
    next();
  } else {
    if (token) {

      jwt.verify(token, config.secret, function(err, decoded) {

        if (err) {

          res.status(403).send({ success: false, message: "failed to authenticate" });

        } else {

          req.decoded = decoded;
          next();

        }
      });
    } else if (req.method != 'OPTIONS') {
      res.status(403).send({ success: false, message: "token required" });
    } else {
      next();
    }
  }
});

/* CROS DOMAIN SETUP */
app.use(function (req, res, next) {

  /* Website you wish to allow to connect */
  res.setHeader('Access-Control-Allow-Origin', '*');

  /* Request methods you wish to allow */
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, x-http-method-override');

  /* Request headers you wish to allow */
  res.setHeader('Access-Control-Allow-Headers', ' Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');

  /* Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions) */
  res.setHeader('Access-Control-Allow-Credentials', true);

  /* Pass to next layer of middleware */
  next();
});

/* VIEW ENGINE SETUP */
app.set('views', path.join(__dirname, 'api/views'));
app.set('view engine', 'ejs');
var index = require('./api/routes/index');
app.use('/', index);


/* IMPORTING ROUTE */
var routes = require('./api/routes/routes'); 

/* REGISTER THE ROUTE */
routes(app); 

/* RUN THE SERVICE */
app.listen(config.port);
console.log('Downtime.NYC RESTful API server started on: ' + config.port);