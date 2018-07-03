~function(){
    var obj={
        Linear:function(t, d, c, b) {
            return t / d * c + b
        }
    }
    function move(curEle,targetObj,duration){
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
                return;
               }
               for(var key in change){
                var curLeft=obj.Linear(time,duration,change[key],begin[key])
                var curTop=obj.Linear(time,duration,change[key],begin[key])
               }
               utils.setGroupCss(curEle,{
                    left:curLeft,
                    top:curTop
                })
        },10)
    }
    window.animation=move;
}()