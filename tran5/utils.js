// chengjiande baba
var utils = (function () {
    var flag = window.getComputedStyle;
    function listToArray(arg) {
        if (flag) {
            return [].slice.call(arg)
        } else {
            var ary = [];
            for (var i = 0; i < arg.length; i++) {
                ary[i] = arg[i]
            }
            return ary;
        }
    }
    function jsonParse(arg) {
        return flag ? JSON.parse(arg) : eval('(' + arg + ')');
    }
    function win(attr, value) {
        if (typeof value == 'undefined') {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = document.body[attr] = value;
    }
    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var par = curEle.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf('MSIE 8') == -1) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent
        }
        return {
            left: l,
            top: t
        }
    }
    function getCss(curEle, attr) {
        var val = null, reg = null;
        if (flag) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr == 'opacity') {
                val = curEle.currentStyle['filter'];
                reg = /^alpha\(opacity[=:](\d)\)$/g
                return reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^[+-]?\d+(\.\d+)?(px|pt|rem|em)/gi;
        return reg.test(val) ? parseFloat(val) : val;
    }
    function getChildren(curEle, tagName) {
        var ary = [];
        if (flag) {
            ary = this.listToArray(curEle.children)
        }
        // ie
        else {
            // childNodes 元素的子节点集合：
            var nodeList = curEle.childNodes;
            for (var i = 0; i < nodeList.length; i++) {
                if (nodeList[i].nodeType == 1) {
                    ary.push(nodeList[i])
                }
            }
           
        }
        if (typeof tagName == 'string') {
            for (var k = 0; k < ary.length; k++) {
                var cur = ary[k]
                if (cur.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    ary.splice(k, 1);//方法向/从数组中添加/删除项目，然后返回被删除的项目。
                }
            }
        }
        return ary;
    }
    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var res = curEle.priviousSibling;//上一个兄弟节点
        while (res && res.nodeType == 1) {
            res = res.priviousSibling
        }
        return res;
    }
    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var res = curEle.nextSibling;//上一个兄弟节点
        while (res && res.nodeType == 1) {
            res = res.nextSibling
        }
        return res;
    }
    function prevAll(curEle) {
        var ary = [];
        var cur = this.prev(curEle)
        while (cur) {
            ary.unshift(cur)
            cur = this.prev(cur)
        }
        return ary;
    }
    function nextAll(curEle) {
        var ary = [];
        var cur = this.next(curEle)
        while (cur) {
            ary.push(cur)
            cur = this.next(cur)
        }
        return ary;
    }
    // 左右两个兄弟节点
    function sibling(curEle) {
        var ary = [];
        return ary.push(this.prev(curEle) || []).push(this.next(curEle) || [])
    }
    // 所有的兄弟节点
    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle))
    }
    function index(curEle) {
        return this.prevAll(curEle).length;
    }
    function firstChild(curEle) {
        return this.getChildren(curEle).length > 0 ? this.getChildren(curEle)[0] : null;
    }
    function lastChild(curEle) {
        return this.getChildren(curEle).length > 0 ? this.getChildren(curEle)[this.getChildren(curEle).length] : null;
    }
    function appendChild(parent, newEle) {
        parent.appendChild(newEle)
    }
    function prepend(parent, newEle) {
        var firstChild = this.firstChild(parent);
        if (firstChild) {
            parent.insertBefore(newEle)
        } else {
            parent.appendChild(newEle);
        }
    }
    // 追加到。。。元素之前
    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle);
    }
    //追加到。。。之后
    function insertAfter(newEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertAfter(newEle);
        } else {
            oldEle.parentNode.appendChild(newEle)
        }
    }
    function hasClass(curEle, cName) {
       
        var cName = cName.replace(/(^\s+)|(\s+$)/, '');
        var reg = new RegExp('(^|\\s+)' + cName + '(|\\s+$)')
        console.log(curEle)
        return reg.test(curEle.className) ? true : false;
    }
    function addClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^\s+)|(\s+$)/, '').split(/\s+/g)
        for (var i = 0; i < aryClass.length; i++) {
            if (!hasClass(curEle, aryClass[i])) {
                return curEle.className += '' + aryClass[i];
            }
        }
    }
    function removeClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^\s+)|(\s+$)/, '').split(/\s+/g)

        for (var i = 0; i < aryClass.length; i++) {
            var reg = new RegExp('(^|\\s+)' + aryClass[i] + '(|\\s+$)');
            if (hasClass(curEle, aryClass[i])) {
                return curEle.className = curEle.className.replace(reg, '').replace(/\s+/g, '').replace(/(^\s+)|(\s+$)/, '');
            }
        }
    }
    function getByClass(curEle, strClass) {
        var curEle = curEle || document;
        if (flag) {
            return curEle.getElementsByClassName(strClass)
        }
        var strArray = strClass.replace(/(^\s+)|(\s+$)/, '').spilt('');
        var nodeList = document.getElementsByTagName('*');
        var ary = [];
        for (var i = 0; i < nodeList.length; i++) {
            var cur = nodeList[i];
            var b = true;
            for (var j = 0; j < strArray.length; j++) {
                var reg = new RegExp('(^|\\s+)' + strArray[j] + '(|\\s+$)');
                if (!reg.test(cur.className)) {
                    b = false;
                    break;//结束循环 跳出strArray循环体
                }
            }
            if (b) {
                ary.push(cur)
            }
        }
        return ary
    }
    function setCss(curEle, attr, value) {
        if (attr == 'float') {
            curEle.style.styleFloat = value;
            curEle.style.cssFloat = value;
            return;
        }
        if (attr == 'opacity') {
            curEle.style.opacity = value;
            curEle.style.fliter = 'alpha(opacity=' + value * 100 + ')';
            return;
        }
        var reg = /(width|height|top|left|right|bottom|((margin|padding)(top|left|right|bottom)))/gi;
        if (reg.test(attr)) {
            val = parseFloat(value) + 'px';
        }
        curEle.style[attr] = val;
    }
    // 使用Object.prototype.toString.call 来检测对象类型
    function setGroupCss(curEle, obj) {
        if (Object.prototype.toString.call(obj) == '[object Object]') {
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    this.setCss(curEle, attr, obj[attr])
                }
            }
        }
    }
    function css(curEle) {
        var arg2 = arguments[1];
        if (typeof arg2 === 'string') {
            var arg3 = arguments[2];
            if (typeof arg3 == 'undefined') {
                return this.getCss(curEle, arg2);
            } else {
                return this.setCss(curEle, arg2, arg3)
            }
        }
    }
    return {
        listToArray: listToArray,
        jsonParse: jsonParse,
        win: win,
        offset: offset,
        getCss: getCss,
        getChildren: getChildren,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        appendChild: appendChild,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getByClass: getByClass,
        setCss: setCss,
        setGroupCss: setGroupCss,
        css: css
    }
})()