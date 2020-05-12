var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.signalMsger = req.flash('signalMsger').toString();
  res.render('index', { title: 'Express Rainbow Sky' });
});




module.exports = router;
