var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage',{ title:'Blockchain Explorer'});
});

router.get('/homepage',function(req,res,next){
  res.render('homepage',{ title:'Blockchain Explorer'});
});


function printResponse(err, data) {
  if (err !== null) {
    console.log(err);

  } else {
    console.log(data);
  }
}




module.exports = router;
