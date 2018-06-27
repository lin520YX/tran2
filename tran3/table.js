var oTab = document.getElementById('tab');
var tHead = oTab.tHead;
var oThs = tHead.rows[0].cells;
var tbody = oTab.tBodies[0];
var oRows = tbody.rows;
var data = null

// 1获取数据
function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data.txt', false)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            var val = xhr.responseText;
            data = utils.JsonParse(val);
            bind.call(null, data)
        }
    }
    xhr.send(null)
}

getData();

function bind(str) {
    var frg = document.createDocumentFragment()
    for (var i = 0; i < str.length; i++) {
        var cur = str[i]
        var oTr = document.createElement('tr');
        for (var attr in cur) {
            var oTd = document.createElement('td');
            if (attr === 'sex') {
                oTd.innerHTML = cur[attr] === 0 ? '男' : '女'
            } else {
                oTd.innerHTML = cur[attr]

            }
            oTr.appendChild(oTd)
        }
        frg.appendChild(oTr)
    }
    tbody.appendChild(frg)
    frg = null;
}

function changeBg() {
    for (var i = 0; i < oRows.length; i++) {
        oRows[i].className = i % 2 === 1 ? 'bg' : '';
    }
}

changeBg();

function sort() {
    var ary=utils.listToArray(oRows);
    ary.sort(function(a,b){
        return parseFloat(a.cells[1].innerHTML)-parseFloat(b.cells[1].innerHTML)
    })
    var frg=document.createDocumentFragment()
    for(var i=0;i<ary.length;i++){
        frg.appendChild(ary[i])
    }
    tbody.appendChild(frg)
    frg=null;
}
oThs[1].onclick=function(){
    sort();
    changeBg();
}