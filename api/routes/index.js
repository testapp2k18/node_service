var express = require('express');
var router = express.Router();
var config = require('../../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Money Hitz App', logo: config.__image_url+'/logo.png' });
});



module.exports = router;
