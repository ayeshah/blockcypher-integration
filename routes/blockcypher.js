var express = require('express');
var router = express.Router();
var util = require('../util');

bcypher = require('blockcypher');
// connecting to bitcoin testnet network using token
var bcapi = new bcypher('btc','test3','c5cb15c6e5fc400b9abfbada947c4d93');

router.post('/get_balance',function(req,res,next){

  console.log("data received",req.body);

  var address = req.body.address
  console.log("address",address)

  bcapi.getAddrBal(address,{},function (err,data){
    if (err !== null) {
      console.log(err);
      next(err); // Pass errors to Express.

    } else {
      console.log(data);
      res.send(data);
    }

  });

});

router.get('/generate_wallet_address',function(req,res,next){

  bcapi.genAddr({},function(err,data){

    if (err !== null) {
      console.log(err);
      next(err); // Pass errors to Express.

    } else {
      console.log(data);
      res.send(data);
    }

  });
});

router.post('/create_transaction',function(req,res,next){

  var required_fields = ["input_address","output_address","value"];
  var data_received = req.body;
  console.log("data_received",data_received);
  console.log("typeof(data_received)",typeof(data_received));

  if(data_received == null)
    res.send(500, {error:"No data received"});

  var missing_keys = util.get_missing_keys(data_received,required_fields);
  if(missing_keys.length == 0){

    //all inputs are provided, continue processing
    transaction = {
      inputs:[{addresses:[data_received.input_address]}],
      outputs:[{addresses:[data_received.output_address],value:data_received.value}],
      includeToSignTx:true
    };
    bcapi.newTX(transaction,function(err,data){
      printResponse(err,data);

      if(err!=null){
        res.status(500).send({error:"Error creating transaction"});
      }
      else{
        res.send(data)
      }

    });
  }

  else{
    res.status(500).send({ error: "Please specify all input parameters" , missing_keys:missing_keys});

  }

})

router.post('/post_transaction',function(req,res,next){

    var data_received = req.body;
    signed_transacion = {
      tx: data_received.tx,
      tosign:data_received.tosign,
      signatures:data_received.signatures,
      pubkeys:data_received.pubkeys
    };
    bcapi.sendTX(signed_transacion,function(err,data){
      printResponse(err,data);
      if(err!=null){
        res.status(500).send({error:"Error posting transaction"});
      }
      else{
        res.send(data)
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
