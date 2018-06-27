var utils={
    listToArray:function listToArray(arg) {
        var ary=[];
        try{
            ary=Array.prototype.slice.call(arg)
        }catch (e){
            for(var i=0;i<ary.length;i++){
                ary.push(ary[i])
            }
        }
        return ary
    },
    JsonParse:function jsonParse(str){
            return 'JSON' in window?JSON.parse(str):eval('('+str+')');
    }
}