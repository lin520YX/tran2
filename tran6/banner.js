(function () {
    var inner = utils.firstChild($('banner'))
    var innerLi = utils.getChildren($('banner'), 'ul')[0];
    var count=0;
    var imgList=inner.getElementsByTagName('img');
    var jsonData = null;
    var b_li=innerLi.getElementsByTagName('li');
    var bannerLeft=$('banner').getElementsByTagName('a')[0];
    var bannerRight=$('banner').getElementsByTagName('a')[1];


    ~function () {
        var xhr = new XMLHttpRequest;
        xhr.open('get', 'banner.txt?_=' + Math.random(), false)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)) {
                console.log(xhr.responseText)
                jsonData = utils.jsonParse(xhr.responseText)
            }
        };
        xhr.send(null)
    }()
    ~function () {
        var str = '';
        var liStr = '';
        if (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                str += '<div><img src="" trueImg="' + jsonData[i]['img'] + '"/></div>'
                i == 0 ? liStr += '<li class="bg"></li>' : liStr += '<li ></li>'
            }
            str += '<div><img src="" trueImg="' + jsonData[0]['img'] + '"/></div>'
        }
        inner.innerHTML = str;
        innerLi.innerHTML = liStr;
        count=jsonData.length+1
        utils.css(inner, 'width',  count * 1000)
    }()
    function lazyImg(){
        for(var i=0;i<imgList.length;i++){
            ~function(i){
                var curImg=imgList[i]
                var oImg=new Image;
                oImg.src=curImg.getAttribute('trueImg');
                oImg.onload=function(){
                    curImg.src=this.src;
                    curImg.style.display='block';
                    animation(curImg,{opacity:1},500)
                    oImg=null;
                }
            }(i)
        }
    }
    var step=0;
    window.setTimeout(lazyImg,1000)
    var autoTimer=window.setInterval(autoMove,2000)
    function autoMove(){
        if(step>=(count-1)){
            step=0;
            inner.style.left=0
        }
        step++;
        animation(inner,{left:-step*1000},500);
        changTip()
    }
    function changTip(){
        var tempStep=step>b_li.length-1?0:step;
        for(var i=0;i<b_li.length;i++){
            var curLi=b_li[i];
            i===tempStep?utils.addClass(curLi,'bg'):utils.removeClass(curLi,'bg');
        }
    }
    $('banner').onmouseover=function(){
        window.clearInterval(autoTimer)
        bannerLeft.style.display='block';
        bannerRight.style.display='block';
    }
    $('banner').onmouseout=function(){
        autoTimer=window.setInterval(autoMove,2000)
        bannerLeft.style.display='none';
        bannerRight.style.display='none';
    }
    ~function(){
        for(var i=0;i<b_li.length;i++){
            (function(i){
                b_li[i].onclick=function(){
                    step=i;
                    changTip();
                    animation()
                    animation(inner,{left:-step*1000},500);
                }
            })(i)
        }
    }()
    bannerLeft.onclick=function(){
       autoMove()
    }
    bannerRight.onclick=function(){
        if(step<=0){
            step=count-1;
            utils.css(inner,'left',-step*1000)
        }
        step--;

        animation(inner,{left:-step*1000},500);
        changTip()
    }


})()