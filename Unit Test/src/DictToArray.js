DictToArray = function(){
    
    this.ConvertDictionaryToObjectArray = function (dict, name, value) {
    
    var arrayObj = [];
    var i = 0; 
    if (dict != null) {
        for (var key in dict) {
            if (this.IsFunctionType(dict, key)) {
                continue;
            }
            var temp = new Object();
            temp[name] = key;
            temp[value] = dict[key];
            arrayObj[i++] = temp;
        }
    }
    return arrayObj;
    }
}

module.exports = DictToArray;

