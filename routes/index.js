var express = require('express');
var router = express.Router();

bcypher = require('blockcypher');
// connecting to bitcoin testnet network using token
var bcapi = new bcypher('btc','main','c5cb15c6e5fc400b9abfbada947c4d93');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/homepage',function(req,res,next){
  res.render('homepage',{ title:'Blockchain Explorer'});
});

router.post('/get_balance',function(req,res,next){

  console.log("data received",req.body);

  var address = req.body.address
  console.log("address",address)

  bcapi.getAddrBal(address,{},function(err,data){
    if (err !== null) {
      console.log(err);
      next(err); // Pass errors to Express.

    } else {
      console.log(data);
      res.send(data);

    }

  });

});

function printResponse(err, data) {
  if (err !== null) {
    console.log(err);

  } else {
    console.log(data);
  }
}




module.exports = router;
