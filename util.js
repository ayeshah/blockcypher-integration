
exports.get_missing_keys = function (jsonObject,keys){

  
  var missing_keys = [];
  for(var i in keys){
    key = keys[i];

    if (!(key in jsonObject))
      missing_keys.push(key);
  }

  console.log("missing_keys",missing_keys);

  return missing_keys;
};

// module.exports = util;
