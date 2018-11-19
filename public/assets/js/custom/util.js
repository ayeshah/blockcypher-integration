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

function showError(error_data){

  modal_html='<p style="color:red;">'+error_data.error+'</p>'

  $("#confirmationModal .modal-title").html('Error');
  $("#confirmationModal .modal-body").html(modal_html);
  $("#confirmationModal .modal-footer").empty();
  $("#confirmationModal").modal('show');
}
