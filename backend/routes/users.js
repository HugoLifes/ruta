var express = require('express');
var router = express.Router();
var mysql = require('mysql');


  var conection = mysql.createConnection({
      host : 'localhost',
      user: 'root',
      password: '',
      database: 'users'
  })

router.post('/', function(req, res, next) {
  res.send({message: res.body.username});
});

module.exports = router;
