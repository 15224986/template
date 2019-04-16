/* 
 * 浏览器全屏显示
 */
WidgetFun.prototype.requestFullScreen = function (element) {
    // 判断各种浏览器，找到正确的方法
    var requestMethod = element.requestFullScreen || //W3C
        element.webkitRequestFullScreen || //Chrome等
        element.mozRequestFullScreen || //FireFox
        element.msRequestFullScreen; //IE11
    if (requestMethod) {
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
};
/* 
 * 浏览器退出全屏显示
 */
WidgetFun.prototype.exitFullScreen = function () {
    // 判断各种浏览器，找到正确的方法
    var exitMethod = document.exitFullscreen || //W3C
        document.mozCancelFullScreen || //Chrome等
        document.webkitExitFullscreen || //FireFox
        document.msExitFullscreen || //IE11
        document.cancelFullScreen ||
        document.webkitCancelFullScreen;
    
    if (exitMethod) {
        exitMethod.call(document);
    } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
};