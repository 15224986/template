// js 判断IE浏览器类型
WidgetFun.prototype.Browser = function () {
    var isIE6 = /msie 6/i.test(navigator.userAgent);
    var isIE7 = /msie 7/i.test(navigator.userAgent);
    var isIE8 = /msie 8/i.test(navigator.userAgent);
    var isIE9 = /msie 9/i.test(navigator.userAgent);
    var isIE = /msie/i.test(navigator.userAgent);
    return {
        msie:isIE,
        version:function(){
            switch(true){
                case isIE6:return 6;
                case isIE7:return 7;
                case isIE8:return 8;
                case isIE9:return 9;
            }
        }()
    };
}();
// js 判断浏览器类型
WidgetFun.prototype.BrowserType = function (val) {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
    if (isIE){
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7){
            return "IE7";
        }else if(fIEVersion == 8){
            return "IE8";
        }else if(fIEVersion == 9){
             return "IE9";
        }else if(fIEVersion == 10){
            return "IE10";
        }else if(fIEVersion == 11){
            return "IE11";
        }else{
            return "0";
        }//IE版本过低
    }else{
        if (isFF) {
            return "Firefox";
        }
        if (isOpera) {
            return "Opera";
        }
        if (isSafari) {
            return "Safari";
        }
        if (isChrome) {
            return "Chrome";
        }
        if (isEdge) {
            return "Edge";
        }    
    }
};
// js 判断浏览器是不是高级浏览器，并获取浏览器前缀
WidgetFun.prototype.prefixfn = function (val) {
    if (navigator.userAgent.toLowerCase().indexOf('applewebkit/') > -1) {
        return '-webkit-';
    }
    if (navigator.userAgent.indexOf("Firefox")>0) {
        return '-moz-';
    }
    if (!! window.opera &&  window.opera.version) {
        return '-o-';
    }
    if (/msie/i.test(navigator.userAgent)) {
        return '-ms-';
    }
    return false;
};
