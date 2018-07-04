(function () {
    var inner = utils.firstChild($('banner'))
    var innerLi = utils.getChildren($('banner'), 'ul')[0];
    console.log(innerLi)
    var imgList=inner.getElementsByTagName('img');
    var jsonData = null;
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
        }
        inner.innerHTML = str;
        innerLi.innerHTML = liStr;
        utils.css(inner, 'width', jsonData.length * 1000)
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
                }
            }(i)
        }
    }
    window.setTimeout(lazyImg,1000)
})()