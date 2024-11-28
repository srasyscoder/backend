var express = require('express');
var router = express.Router();
//const enrollmentModel = require('../models/enrollment.model')


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send('respond with a resource');
});


module.exports = router;
