var express = require('express'),
  app = express(),
  port = process.env.PORT || 4040,
  mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('./config'),
  User = require('./api/models/userModel'), //created model loading here
  User = require('./api/models/settingModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/moneyhitz'); 
//MongoClient.connect('mongodb://admin:password@localhost:27017/db', function (err, db) {});  connect with username and password


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(function(req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, x-http-method-override');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', ' Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.use(function(req, res, next){
  var token = req.body.token || req.param('token') || req.headers['x-access-token'];
  
  if (req.url === '/login' || req.url === '/forgot_password' || req.url == '/email_verify' || req.url == '/users') {
    next();
  } else {
    if(token){

      jwt.verify(token, config.secret, function(err, decoded){
        
        if(err){
          
          res.status(403).send({success: false, message: "failed to authenticate"});

        } else {
          
          req.decoded = decoded;
          next();

        }
      });
    } else if(req.method != 'OPTIONS') {
        res.status(403).send({success: false, message: "token required"});
    } else {
        next();
    }
  }
});


var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);