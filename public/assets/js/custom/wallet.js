

bitcoin_address = ''
unsigned_transaction = {}

function get_balance(){

  // var serializedFormArray = $( this ).serializeArray();
  // var requestData = formSerializeArrToJson(serializedFormArray);
  // console.log( requestData );

  // clear the fields
  $("#testnet-address").text("");
  $("#testnet-bal").text("");

  bitcoin_address = $("[name='bitcoin-address']").val();
  var requestData = { address: bitcoin_address };

  ajaxPost('/blockcypher/get_balance',JSON.stringify(requestData), function(data){

    console.log(data);

    $("#testnet-address").text(data.address);
    $("#testnet-bal").text(data.balance);

  },
  function(error){
    // TODO: error handling and displaying the error message
    console.log(error);
    showError(error);
  });



}

function generate_address(){
  ajaxGet('/blockcypher/generate_address',function(data){

    var modal_html =
    '<div>'+
      '<p> Please save the following details offline. Make sure to keep your keys secure</p>'+
      '<div>'+'<b>Address</b>: '+data.address+'</div>'+
      '<div>'+'<b>Public Key</b>: '+data.public+'</div>'+
      '<div>'+'<b>Private Key</b>: '+data.private+'</div>'+
      '<div>'+'<b>Wif</b>: '+data.wif+'</div>'+
    '</div>';
    $("#confirmationModal .modal-body").html(modal_html);
    $("#confirmationModal .modal-footer").empty();
    $("#confirmationModal").modal('show');

    bitcoin_address = data.address;
    $("[name='bitcoin-address']").val(data.address);

  },function(error){
    showError(error);
  });
}


//creates an unsigned transaction using sender address, recipient address and the amount
function create_transaction(){

  var data_sent = {
    input_address: bitcoin_address,
    output_address:$("[name='recipient-bitcoin-address']").val(),
    value: parseInt($("[name='amount']").val())
  };

  unsigned_transaction={}
  ajaxPost('/blockcypher/create_transaction',JSON.stringify(data_sent), function(response){
      unsigned_transaction = response;
      $("#tosign-data").text(unsigned_transaction.tosign[0]);
      $("#step-2").removeAttr('hidden');


  },function(error){
    showError(error);
  });
}

function tx_signed(){
    $("#step-3").removeAttr('hidden');

}

//posts the signed transaction
function post_transaction(){
  signed_transacion = unsigned_transaction;
  signed_transacion['signatures'] = [$("[name='signed-data']").val()];
  signed_transacion['pubkeys'] = [$("[name='public-key']").val()];

  ajaxPost('/blockcypher/post_transaction',JSON.stringify(signed_transacion),function(response){

    modal_html = '<p>Transaction id has been posted:'+response['tx']['hash']+'</p>';
    $("#confirmationModal .modal-body").html(modal_html);
    $("#confirmationModal .modal-footer").empty();
    $("#confirmationModal").modal('show');

  },function(error){
    showError(error);
  })
}
