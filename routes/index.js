var express = require('express');
var router = express.Router();

router.get('/ping', function(req, res, next) {
  res.status(200).json('Server working');
});

module.exports = router;
