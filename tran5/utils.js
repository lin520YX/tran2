var utils=(function(){
    var flag= window.getComputedStyle;
    function listToArray(arg){
        if(flag){
            return [].slice.call(arg)
        }else{
            var ary=[];
            for(var i=0;i<arg.length;i++){
                ary[i]=arg[i]
            }
            return ary;
        }
    }
    function jsonParse(arg){
        return flag?JSON.parse(arg):eval('('+arg+')');
    }
    function win(attr,value){
        if(typeof value=='undefined'){
            return document.documentElement[attr]||document.body[attr];
        }
        document.documentElement[attr]=document.body[attr]=value;
    }
    function offset(curEle){
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        var par=curEle.offsetParent;
        while(par){
            if(navigator.userAgent.indexOf('MSIE 8')==-1){
                l+=par.clientLeft;
                t+=par.clientTop;
            }
            l+=par.offsetLeft;
            t+=par.offsetTop;
            par=par.offsetParent
        }
        return {
            left:l,
            top:t
        }
    }
    function getCss(curEle,attr){
        var val=null,reg=null;
        if(flag){
            val=window.getComputedStyle(curEle,null)[attr];
        }else{
            if(attr=='opacity'){
                val=curEle.currentStyle['filter'];
                reg=/^alpha\(opacity[=:](\d)\)$/g
                return reg.test(val)?reg.exec(val)[1]/100:1;
            }else{
                val=curEle.currentStyle[attr];
            }
        }
        reg=/^[+-]?\d+(\.\d+)?(px|pt|rem|em)/gi;
        return reg.test(val)?parseFloat(val):val;
    }
    function getChildren(curEle,tagName){
        var ary=[];
        if(flag){
            ary= [].slice.call(curEle.children);
        }
        // ie
       
        // childNodes 元素的子节点集合：
        var nodeList=curEle.childNodes;
        for(var i=0;i<nodeList.length;i++){
            if(nodeList[i].nodeType==1){
                ary.push(nodeList[i])
            }
        }
        if(typeof tagName =='string'){
            for(var k=0;k<ary.length;k++){
                var cur=ary[k]
                if(cur.nodeName.toLowerCase()==tagName.toLowerCase()){
                    ary.splice(k,1);//方法向/从数组中添加/删除项目，然后返回被删除的项目。
                }
            }
        }
        return ary;
    }
    return {
        listToArray:listToArray,
        jsonParse:jsonParse,
        win:win,
        offset:offset,
        getCss:getCss,
        getChildren:getChildren
    }
})()