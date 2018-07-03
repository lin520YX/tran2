~function(){
    var obj={
        Linear:function(t, d, c, b) {
            return t / d * c + b
        }
    }
    function move(curEle,targetObj,duration,cb){
        window.clearInterval(curEle.timer)
        var begin={},change={};
        for(var attr in targetObj){
            if(targetObj.hasOwnProperty(attr)){
                begin[attr]=utils.css(curEle,attr);
                change[attr]=targetObj[attr]-begin[attr]
            }
        }
        var time=0;
        curEle.timer=setInterval(()=>{
            time+=10;
            if(time>=duration){
                utils.setGroupCss(curEle,targetObj)
                window.clearInterval(curEle.timer);
                cb&&cb()
                return;
               }
               for(var key in change){
                var cur=obj.Linear(time,duration,change[key],begin[key])
                utils.css(curEle,key,cur)
               }
              
                
        },10)
    }
    window.animation=move;
}()