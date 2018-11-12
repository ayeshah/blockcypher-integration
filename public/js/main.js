/* eslint-env jquery, browser */
$(document).ready(() => {

  // Place JavaScript code here...
  $("#get-balance-form").submit(function(event){

    var serializedFormArray = $( this ).serializeArray();
    var requestData = formSerializeArrToJson(serializedFormArray);
    console.log( requestData );

    // clear the fields
    $("#testnet-address").text(data.address);
    $("#testnet-bal").text(data.balance);

    ajaxPost('/get_balance',JSON.stringify(requestData), function(data){

      console.log(data);

      $("#testnet-address").text(data.address);
      $("#testnet-bal").text(data.balance);

    },
    function(error){
      // TODO: error handling and displaying the error message
      console.log(error);
    });


    event.preventDefault();
  })

});

function formSerializeArrToJson(formSerializeArr){
 var jsonObj = {};
 jQuery.map( formSerializeArr, function( n, i ) {
     jsonObj[n.name] = n.value;
 });

 return jsonObj;
}

function ajaxPost(url,data,successFn, errorFn){
  $.ajax({
    method: "POST",
    url: url,
    dataType: 'json',
    contentType: 'application/json',
    data: data,
    error: errorFn,
    success: successFn
  });
}

function ajaxGet(url,successFn,errorFn){
  $.ajax({
    method: "GET",
    url: url,
    dataType: 'json',
    error: errorFn,
    success: successFn
  });
}
